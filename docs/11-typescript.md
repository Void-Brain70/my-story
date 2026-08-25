# TypeScript — সম্পূর্ণ গাইড
### Book 11 of 14 | Phase 4 | Week 25-26

---

## ভূমিকা | Introduction

**English:** TypeScript is JavaScript with types. It catches bugs at compile time (before running), makes code more readable, and enables better IDE support.

**বাংলা:** TypeScript হলো JavaScript-এর সাথে type। Code চালানোর আগেই bug ধরে। Code পড়তে সহজ এবং IDE support অনেক ভালো।

---

## Chapter 1: Basic Types — মূল টাইপ

```typescript
// Primitive types
let name: string = "Anik Chandra";
let age: number = 25;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// Type inference — TypeScript নিজেই বুঝতে পারে
let city = "Dhaka";        // TypeScript বুঝে: string
let count = 0;              // TypeScript বুঝে: number
// city = 123;             // Error! string-এ number দেওয়া যাবে না

// Any — সব type (যতটা সম্ভব এড়িয়ে চলো)
let data: any = "hello";
data = 123;   // কোনো error নেই — কিন্তু ভালো না

// Unknown — any-এর safe version
let input: unknown = getUserInput();
if (typeof input === 'string') {
    console.log(input.toUpperCase());  // এখন safe
}

// Never — কখনো return করে না
function throwError(message: string): never {
    throw new Error(message);
}
```

---

## Chapter 2: Arrays & Tuples — অ্যারে এবং টাপল

```typescript
// Arrays
let skills: string[] = ["PHP", "Laravel", "Vue"];
let numbers: number[] = [1, 2, 3, 4, 5];
let flags: Array<boolean> = [true, false, true];

// Mixed array (Union type)
let mixed: (string | number)[] = ["hello", 1, "world", 2];

// Tuple — নির্দিষ্ট structure
let coordinate: [number, number] = [23.8103, 90.4125];  // [lat, lng]
let person: [string, number, boolean] = ["Anik", 25, true];

// Named tuple (readable)
let point: [x: number, y: number] = [10, 20];
```

---

## Chapter 3: Objects & Interfaces — অবজেক্ট এবং ইন্টারফেস

```typescript
// Object type
let user: { name: string; email: string; age?: number } = {
    name: "Anik",
    email: "anik@example.com"
    // age optional
};

// Interface — reusable object type
interface User {
    id: number;
    name: string;
    email: string;
    age?: number;               // optional
    readonly createdAt: Date;   // শুধু read, write করা যাবে না
}

// Interface extend করো
interface AdminUser extends User {
    permissions: string[];
    role: 'admin' | 'superadmin';
}

const admin: AdminUser = {
    id: 1,
    name: "Anik",
    email: "anik@example.com",
    createdAt: new Date(),
    permissions: ["read", "write", "delete"],
    role: "admin"
};

// Interface for functions
interface Validator {
    (value: string): boolean;
}

const isEmail: Validator = (value) => /\S+@\S+\.\S+/.test(value);
```

---

## Chapter 4: Types (Type Alias) — টাইপ এলিয়াস

```typescript
// Type alias
type ID = number | string;
type Status = 'active' | 'inactive' | 'pending';
type Role = 'user' | 'admin' | 'superadmin';

// Object type
type Product = {
    id: number;
    name: string;
    price: number;
    status: Status;
};

// Union type
type StringOrNumber = string | number;

// Intersection type — দুটো type একসাথে
type Employee = User & {
    department: string;
    salary: number;
};

// Interface vs Type:
// Interface: extend করা যায়, class implement করতে পারে
// Type: union/intersection বেশি flexible
// Best practice: Object-এর জন্য Interface, বাকি সবের জন্য Type
```

---

## Chapter 5: Generics — জেনেরিক্স

### বাংলা ব্যাখ্যা
Generic হলো reusable type। যেকোনো type-এ কাজ করে কিন্তু type safety বজায় থাকে।

```typescript
// Generic function
function firstItem<T>(array: T[]): T | undefined {
    return array[0];
}

const firstNumber = firstItem([1, 2, 3]);    // number
const firstName = firstItem(["Anik", "Rahim"]); // string

// Generic interface
interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    meta?: {
        total: number;
        page: number;
        limit: number;
    };
}

// ব্যবহার
type UserResponse = ApiResponse<User>;
type UsersResponse = ApiResponse<User[]>;

const response: UsersResponse = {
    success: true,
    data: [{ id: 1, name: "Anik", email: "anik@example.com", createdAt: new Date() }],
    meta: { total: 100, page: 1, limit: 10 }
};

// Generic class
class Repository<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    find(predicate: (item: T) => boolean): T | undefined {
        return this.items.find(predicate);
    }

    getAll(): T[] {
        return [...this.items];
    }
}

const userRepo = new Repository<User>();
const productRepo = new Repository<Product>();
```

---

## Chapter 6: Utility Types — ইউটিলিটি টাইপ

```typescript
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    age: number;
    role: Role;
}

// Partial — সব fields optional করো
type UpdateUserDto = Partial<User>;
// { id?: number; name?: string; email?: string; ... }

// Required — সব fields required করো
type RequiredUser = Required<Partial<User>>;

// Pick — কিছু fields নাও
type PublicUser = Pick<User, 'id' | 'name' | 'email'>;
// { id: number; name: string; email: string }

// Omit — কিছু fields বাদ দাও
type UserWithoutPassword = Omit<User, 'password'>;
// { id: number; name: string; email: string; age: number; role: Role }

// Readonly — সব fields readonly করো
type ImmutableUser = Readonly<User>;

// Record — key-value map
type UserMap = Record<number, User>;
// { [key: number]: User }

type RolePermissions = Record<Role, string[]>;
const permissions: RolePermissions = {
    user: ['read'],
    admin: ['read', 'write'],
    superadmin: ['read', 'write', 'delete']
};

// ReturnType — function-এর return type
function createUser(data: Partial<User>): User {
    return { id: Date.now(), ...data } as User;
}
type CreatedUser = ReturnType<typeof createUser>;  // User

// Parameters — function-এর parameters type
type CreateUserParams = Parameters<typeof createUser>;  // [Partial<User>]
```

---

## Chapter 7: TypeScript with Vue 3 & Nuxt 3

```typescript
// Composable with TypeScript
// composables/useUser.ts
import { ref, computed } from 'vue';

interface User {
    id: number;
    name: string;
    email: string;
}

export function useUser() {
    const user = ref<User | null>(null);
    const isLoggedIn = computed(() => user.value !== null);

    async function fetchUser(id: number): Promise<void> {
        const response = await $fetch<User>(`/api/users/${id}`);
        user.value = response;
    }

    function logout(): void {
        user.value = null;
    }

    return { user, isLoggedIn, fetchUser, logout };
}
```

```vue
<!-- Component with TypeScript -->
<script setup lang="ts">
import type { User } from '~/types';

interface Props {
    userId: number;
    showEmail?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    showEmail: false
});

const emit = defineEmits<{
    (e: 'update', user: User): void;
    (e: 'delete', id: number): void;
}>();

const { user, fetchUser } = useUser();

onMounted(async () => {
    await fetchUser(props.userId);
});

function handleUpdate(updatedUser: User): void {
    emit('update', updatedUser);
}
</script>
```

---

## Chapter 8: TypeScript with NestJS

```typescript
// DTO with class-validator
import { IsString, IsEmail, IsOptional, IsEnum, MinLength } from 'class-validator';
import { Exclude, Expose, Transform } from 'class-transformer';

export class CreateUserDto {
    @IsString()
    @MinLength(2)
    name: string;

    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsEnum(['user', 'admin'])
    @IsOptional()
    role?: 'user' | 'admin' = 'user';
}

// Response serialization
export class UserResponseDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    role: string;

    @Exclude()  // password hide করো
    password: string;

    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}
```

---

## Practice Project | অনুশীলন প্রকল্প

### JavaScript Project TypeScript-এ রূপান্তর করো

```bash
# ধাপ ১: TypeScript install করো
npm install typescript @types/node --save-dev
npx tsc --init

# tsconfig.json important settings
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "strict": true,           # সব strict checks চালু
    "noImplicitAny": true,    # any নিষিদ্ধ
    "strictNullChecks": true, # null check mandatory
    "outDir": "./dist",
    "rootDir": "./src"
  }
}

# ধাপ ২: .js → .ts rename করো
# ধাপ ৩: Type errors ঠিক করো
# ধাপ ৪: Interfaces ও Types যোগ করো
```

---

## Quick Revision | দ্রুত পুনরালোচনা

- **Types** = bug compile-time-এ ধরে
- **Interface** = object shape define করে, extend করা যায়
- **Type alias** = Union, Intersection-এর জন্য
- **Generics** = reusable type-safe code
- **Utility Types** = Partial, Pick, Omit, Record — রোজ কাজে লাগে
- **strict mode** = সবসময় চালু রাখো
- **never** = কখনো reach হওয়া উচিত না সেই branch
- **unknown** = any-এর safe version

---

> **আগের বই:** [Book 10 — AWS & VPS](10-aws-vps.md) | **পরবর্তী বই:** [Book 12 — Vue 3 & Nuxt 3](12-vue3-nuxt3.md)
