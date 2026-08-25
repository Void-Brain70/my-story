# GraphQL & tRPC — সম্পূর্ণ গাইড
### Book 13 of 14 | Phase 4 | Week 29-30

---

## ভূমিকা | Introduction

**English:** GraphQL is a query language for APIs where the client specifies exactly what data it needs. tRPC is a type-safe RPC framework perfect for TypeScript monorepos.

**বাংলা:** GraphQL-এ client নিজে বলে কোন data দরকার — over/under fetching নেই। tRPC TypeScript-এ end-to-end type safety দেয়।

---

## Chapter 1: GraphQL vs REST

```
REST:
GET /users/1          → পুরো user object (অনেক field)
GET /users/1/posts    → আলাদা request
GET /users/1/friends  → আরেকটি request
(৩টি request, অনেক unnecessary data)

GraphQL:
POST /graphql
{
  user(id: 1) {
    name             # শুধু name চাই
    posts {
      title          # post-এর শুধু title
    }
    friends {
      name           # friend-এর শুধু name
    }
  }
}
(১টি request, ঠিক যা চাই তাই পাই)
```

---

## Chapter 2: GraphQL Basics — মূল ধারণা

### Schema Definition — স্কিমা

```graphql
# Type — data structure define করো
type User {
    id: ID!          # ! = required (null হবে না)
    name: String!
    email: String!
    age: Int
    posts: [Post!]!  # Post-এর list
    role: Role!
}

type Post {
    id: ID!
    title: String!
    content: String
    author: User!
    createdAt: String!
}

# Enum
enum Role {
    USER
    ADMIN
}

# Query — read operations
type Query {
    user(id: ID!): User
    users(page: Int, limit: Int): [User!]!
    post(id: ID!): Post
    posts(userId: ID): [Post!]!
}

# Mutation — write operations
type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
    createPost(input: CreatePostInput!): Post!
}

# Input types — mutation-এর parameters
input CreateUserInput {
    name: String!
    email: String!
    password: String!
}

input UpdateUserInput {
    name: String
    email: String
    age: Int
}

# Subscription — real-time
type Subscription {
    postCreated: Post!
    userUpdated(id: ID!): User!
}
```

---

## Chapter 3: GraphQL with NestJS — নেস্টজেএস

```bash
npm install @nestjs/graphql @nestjs/apollo @apollo/server graphql
```

```typescript
// app.module.ts
@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
            playground: true,
        }),
    ],
})
```

### Code-First Approach (NestJS style)

```typescript
// user.model.ts
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
    @Field(() => ID)
    id: number;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field(() => Int, { nullable: true })
    age?: number;

    @Field(() => [Post])
    posts: Post[];
}

@InputType()
export class CreateUserInput {
    @Field()
    @IsString()
    @MinLength(2)
    name: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MinLength(8)
    password: string;
}
```

```typescript
// user.resolver.ts
@Resolver(() => User)
export class UserResolver {
    constructor(
        private userService: UserService,
        private postService: PostService
    ) {}

    // Query
    @Query(() => User, { nullable: true })
    async user(@Args('id', { type: () => ID }) id: number): Promise<User | null> {
        return this.userService.findOne(id);
    }

    @Query(() => [User])
    async users(
        @Args('page', { defaultValue: 1 }) page: number,
        @Args('limit', { defaultValue: 10 }) limit: number
    ): Promise<User[]> {
        return this.userService.findAll(page, limit);
    }

    // Mutation
    @Mutation(() => User)
    @UseGuards(JwtAuthGuard)
    async createUser(@Args('input') input: CreateUserInput): Promise<User> {
        return this.userService.create(input);
    }

    @Mutation(() => User)
    @UseGuards(JwtAuthGuard)
    async updateUser(
        @Args('id', { type: () => ID }) id: number,
        @Args('input') input: UpdateUserInput,
        @CurrentUser() currentUser: User
    ): Promise<User> {
        if (currentUser.id !== id && currentUser.role !== 'ADMIN') {
            throw new ForbiddenException();
        }
        return this.userService.update(id, input);
    }

    // Field resolver — lazy load করো
    @ResolveField(() => [Post])
    async posts(@Parent() user: User): Promise<Post[]> {
        return this.postService.findByUserId(user.id);
    }
}
```

### Subscription — রিয়েল-টাইম

```typescript
@Resolver(() => Post)
export class PostResolver {
    constructor(
        private postService: PostService,
        @Inject(PUB_SUB) private pubSub: PubSub
    ) {}

    @Mutation(() => Post)
    async createPost(@Args('input') input: CreatePostInput): Promise<Post> {
        const post = await this.postService.create(input);
        
        // Subscriber-দের notify করো
        this.pubSub.publish('postCreated', { postCreated: post });
        
        return post;
    }

    @Subscription(() => Post)
    postCreated() {
        return this.pubSub.asyncIterator('postCreated');
    }
}
```

---

## Chapter 4: GraphQL Client (Vue 3 / Nuxt 3)

```bash
npm install @nuxtjs/apollo graphql
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
    modules: ['@nuxtjs/apollo'],
    apollo: {
        clients: {
            default: {
                httpEndpoint: 'http://localhost:3000/graphql',
                wsEndpoint: 'ws://localhost:3000/graphql',
            }
        }
    }
});
```

```typescript
// composables/useUsers.ts
const GET_USERS = gql`
    query GetUsers($page: Int, $limit: Int) {
        users(page: $page, limit: $limit) {
            id
            name
            email
            posts {
                id
                title
            }
        }
    }
`;

const CREATE_USER = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            name
            email
        }
    }
`;

export function useUsers() {
    const { result, loading, error, refetch } = useQuery(GET_USERS, {
        page: 1,
        limit: 10
    });

    const users = computed(() => result.value?.users ?? []);

    const { mutate: createUser, loading: creating } = useMutation(CREATE_USER, {
        update(cache, { data: { createUser } }) {
            // Cache update করো
            const existing = cache.readQuery({ query: GET_USERS });
            cache.writeQuery({
                query: GET_USERS,
                data: {
                    users: [createUser, ...existing.users]
                }
            });
        }
    });

    return { users, loading, error, createUser, creating, refetch };
}
```

```vue
<!-- User subscription -->
<script setup lang="ts">
const POST_CREATED = gql`
    subscription PostCreated {
        postCreated {
            id
            title
            author {
                name
            }
        }
    }
`;

const { result } = useSubscription(POST_CREATED);
watchEffect(() => {
    if (result.value?.postCreated) {
        // New post toast দেখাও
        toast.success(`New post: ${result.value.postCreated.title}`);
    }
});
</script>
```

---

## Chapter 5: tRPC — টাইআরপিসি

### বাংলা ব্যাখ্যা
tRPC দিয়ে type-safe API call করা যায় GraphQL schema ছাড়াই। TypeScript type automatically share হয়।

```bash
npm install @trpc/server @trpc/client @trpc/vue-query
```

```typescript
// server/trpc/trpc.ts
import { initTRPC, TRPCError } from '@trpc/server';

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
    if (!ctx.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({ ctx: { ...ctx, user: ctx.user } });
});
```

```typescript
// server/trpc/routers/user.ts
import { z } from 'zod';

export const userRouter = router({
    // Query
    list: publicProcedure
        .input(z.object({ page: z.number().default(1), limit: z.number().default(10) }))
        .query(async ({ input }) => {
            return userService.findAll(input.page, input.limit);
        }),

    byId: publicProcedure
        .input(z.number())
        .query(async ({ input: id }) => {
            const user = await userService.findOne(id);
            if (!user) throw new TRPCError({ code: 'NOT_FOUND' });
            return user;
        }),

    // Mutation
    create: protectedProcedure
        .input(z.object({
            name: z.string().min(2),
            email: z.string().email(),
            password: z.string().min(8)
        }))
        .mutation(async ({ input }) => {
            return userService.create(input);
        }),

    update: protectedProcedure
        .input(z.object({
            id: z.number(),
            data: z.object({
                name: z.string().optional(),
                email: z.string().email().optional()
            })
        }))
        .mutation(async ({ input, ctx }) => {
            if (ctx.user.id !== input.id) {
                throw new TRPCError({ code: 'FORBIDDEN' });
            }
            return userService.update(input.id, input.data);
        })
});
```

```typescript
// Client-side (Vue 3 / Nuxt 3)
// plugins/trpc.ts
export default defineNuxtPlugin(() => {
    const client = createTRPCNuxtClient<AppRouter>({
        links: [
            httpBatchLink({ url: '/api/trpc' })
        ]
    });

    return { provide: { trpc: client } };
});

// Component
<script setup>
const { $trpc } = useNuxtApp();

// Query — type-safe!
const { data: users } = await $trpc.user.list.useQuery({ page: 1, limit: 10 });

// Mutation — type-safe!
const { mutate: createUser } = $trpc.user.create.useMutation();
await createUser({ name: 'Anik', email: 'anik@example.com', password: 'secret123' });
</script>
```

---

## Chapter 6: GraphQL vs tRPC — কোনটা বেছে নেবে?

```
GraphQL ব্যবহার করো যখন:
✅ Public API (mobile app, third-party)
✅ Multiple clients (web + mobile + desktop)
✅ Complex data fetching needs
✅ Real-time subscriptions দরকার

tRPC ব্যবহার করো যখন:
✅ Full-stack TypeScript (Next.js/Nuxt.js + NestJS)
✅ Internal API শুধু নিজের frontend-এর জন্য
✅ কম boilerplate চাও
✅ Schema define করতে চাও না
```

---

## Practice Project | অনুশীলন প্রকল্প

### GraphQL API তৈরি করো

```
Project: Simple Blog API

Schema:
- User (id, name, email, posts)
- Post (id, title, content, author, comments)
- Comment (id, content, author, post)

Queries:
- users, user(id)
- posts, post(id), postsByUser(userId)

Mutations:
- createUser, updateUser, deleteUser
- createPost, updatePost, deletePost
- addComment

Subscription:
- postCreated
- commentAdded(postId)

Test করো:
- Apollo Studio / Playground দিয়ে
- Fragment reuse করো
- N+1 problem সমাধান করো (DataLoader)
```

---

## Quick Revision | দ্রুত পুনরালোচনা

- **GraphQL** = client বলে কি data চাই, over-fetching নেই
- **Query** = read operation
- **Mutation** = write operation (create/update/delete)
- **Subscription** = real-time (WebSocket)
- **Resolver** = query/mutation handle করে
- **Field Resolver** = related data lazy load করে
- **tRPC** = TypeScript-only, schema-less, type-safe RPC
- **zod** = tRPC-এ input validation করে

---

> **আগের বই:** [Book 12 — Vue 3 & Nuxt 3](12-vue3-nuxt3.md) | **পরবর্তী বই:** [Book 14 — AI Integration](14-ai-integration.md)
