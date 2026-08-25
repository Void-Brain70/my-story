# NestJS Deep Dive — সম্পূর্ণ গাইড
### Book 5 of 14 | Phase 2 | Week 9-10

---

## ভূমিকা | Introduction

**English:** NestJS is a progressive Node.js framework built with TypeScript. It uses decorators and modules heavily, inspired by Angular. It's perfect for building scalable server-side applications.

**বাংলা:** NestJS হলো TypeScript-এ তৈরি Node.js framework। Decorator এবং module ব্যবহার করে। Large-scale API তৈরির জন্য আদর্শ।

---

## Chapter 1: Guards — গার্ড

### English Explanation
Guards determine whether a request should be handled or not. They run before route handlers. Perfect for authentication and authorization.

### বাংলা ব্যাখ্যা
Guard ঠিক করে একটি request process হবে কিনা। Route handler-এর আগে চলে। Authentication ও authorization-এর জন্য আদর্শ।

```typescript
// JWT Auth Guard
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractToken(request);

        if (!token) {
            throw new UnauthorizedException('Token not found');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET
            });
            request['user'] = payload;  // request-এ user যোগ করো
            return true;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }
    }

    private extractToken(request: Request): string | null {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : null;
    }
}
```

```typescript
// Role-based Guard
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        // Decorator থেকে required roles পড়ো
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
        );

        if (!requiredRoles) return true;  // roles না থাকলে allow

        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some(role => user.roles?.includes(role));
    }
}
```

```typescript
// Custom Decorator তৈরি করো
import { SetMetadata } from '@nestjs/common';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
```

```typescript
// Controller-এ ব্যবহার করো
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
    @Get('users')
    @Roles('admin')
    getAllUsers() {
        return this.userService.findAll();
    }

    @Delete('users/:id')
    @Roles('admin', 'superadmin')
    deleteUser(@Param('id') id: string) {
        return this.userService.delete(id);
    }
}
```

---

## Chapter 2: Interceptors — ইন্টারসেপ্টর

### English Explanation
Interceptors can transform, extend, or completely override the response. They run before and after route handlers.

### বাংলা ব্যাখ্যা
Interceptor response-কে পরিবর্তন বা বাড়াতে পারে। Route handler-এর আগে ও পরে চলে।

```typescript
// Response Transform Interceptor — সব response wrap করো
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => ({
                success: true,
                data,
                timestamp: new Date().toISOString()
            }))
        );
    }
}

// Response:
// { success: true, data: {...}, timestamp: "2026-08-25T..." }
```

```typescript
// Logging Interceptor — কতক্ষণ লাগলো log করো
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const { method, url } = request;
        const start = Date.now();

        return next.handle().pipe(
            tap(() => {
                const duration = Date.now() - start;
                this.logger.log(`${method} ${url} — ${duration}ms`);
            })
        );
    }
}
```

```typescript
// Cache Interceptor — result cache করো
@Injectable()
export class CacheInterceptor implements NestInterceptor {
    private cache = new Map<string, any>();

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const key = request.url;

        if (this.cache.has(key)) {
            return of(this.cache.get(key));  // Cache থেকে দাও
        }

        return next.handle().pipe(
            tap(response => this.cache.set(key, response))
        );
    }
}
```

```typescript
// Global-এ apply করো (main.ts)
app.useGlobalInterceptors(new TransformInterceptor(), new LoggingInterceptor());

// Controller-এ apply করো
@Controller('products')
@UseInterceptors(CacheInterceptor)
export class ProductController {}
```

---

## Chapter 3: Pipes — পাইপ

### বাংলা ব্যাখ্যা
Pipe data transformation এবং validation করে। Input data সঠিক কিনা যাচাই করে।

```typescript
// Validation Pipe (সবচেয়ে বেশি ব্যবহৃত)
// main.ts
app.useGlobalPipes(new ValidationPipe({
    whitelist: true,        // Extra fields বাদ দাও
    forbidNonWhitelisted: true,  // Extra fields থাকলে error
    transform: true,        // Type automatically convert করো
    transformOptions: {
        enableImplicitConversion: true
    }
}));
```

```typescript
// DTO তৈরি করো
import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
    @IsString()
    @MinLength(2)
    name: string;

    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())  // lowercase করো
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsEnum(['user', 'admin'])
    @IsOptional()
    role?: string = 'user';
}
```

```typescript
// Custom Pipe — ParseIntPipe-এর মতো
@Injectable()
export class ParsePositiveIntPipe implements PipeTransform {
    transform(value: any): number {
        const num = parseInt(value);
        if (isNaN(num) || num <= 0) {
            throw new BadRequestException('Value must be a positive integer');
        }
        return num;
    }
}

// ব্যবহার
@Get(':id')
findOne(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.service.findOne(id);
}
```

---

## Chapter 4: Exception Filters — এক্সেপশন ফিল্টার

### বাংলা ব্যাখ্যা
Exception Filter error গুলো ধরে এবং সুন্দর response তৈরি করে।

```typescript
// Global Exception Filter
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException
            ? exception.getResponse()
            : 'Internal server error';

        response.status(status).json({
            success: false,
            statusCode: status,
            message,
            path: request.url,
            timestamp: new Date().toISOString()
        });
    }
}
```

---

## Chapter 5: CQRS Pattern — সিকিউআরএস প্যাটার্ন

### English Explanation
CQRS (Command Query Responsibility Segregation) separates read (Query) and write (Command) operations. Good for complex business logic.

### বাংলা ব্যাখ্যা
CQRS read (Query) এবং write (Command) আলাদা করে। জটিল business logic-এর জন্য উপযুক্ত।

```bash
npm install @nestjs/cqrs
```

```typescript
// Command — write operation
export class CreateUserCommand {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string
    ) {}
}

// Command Handler
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private userRepository: UserRepository,
        private eventBus: EventBus
    ) {}

    async execute(command: CreateUserCommand): Promise<User> {
        const user = await this.userRepository.create({
            name: command.name,
            email: command.email,
            password: await bcrypt.hash(command.password, 10)
        });

        // Event publish করো
        this.eventBus.publish(new UserCreatedEvent(user));

        return user;
    }
}
```

```typescript
// Query — read operation
export class GetUsersQuery {
    constructor(
        public readonly page: number = 1,
        public readonly limit: number = 10
    ) {}
}

// Query Handler
@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
    constructor(private userRepository: UserRepository) {}

    async execute(query: GetUsersQuery): Promise<PaginatedResult<User>> {
        return this.userRepository.findPaginated(query.page, query.limit);
    }
}
```

```typescript
// Event
export class UserCreatedEvent {
    constructor(public readonly user: User) {}
}

// Event Handler
@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
    constructor(private emailService: EmailService) {}

    async handle(event: UserCreatedEvent): Promise<void> {
        await this.emailService.sendWelcomeEmail(event.user);
    }
}
```

```typescript
// Controller-এ ব্যবহার করো
@Controller('users')
export class UserController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus
    ) {}

    @Get()
    findAll(@Query() query: PaginationDto) {
        return this.queryBus.execute(
            new GetUsersQuery(query.page, query.limit)
        );
    }

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.commandBus.execute(
            new CreateUserCommand(dto.name, dto.email, dto.password)
        );
    }
}
```

---

## Chapter 6: Microservices — মাইক্রোসার্ভিস

### বাংলা ব্যাখ্যা
NestJS-এ সহজেই microservices তৈরি করা যায়। TCP বা Redis দিয়ে services communicate করতে পারে।

```typescript
// Microservice (main.ts)
const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
        transport: Transport.REDIS,
        options: {
            host: 'localhost',
            port: 6379,
        },
    }
);
await app.listen();
```

```typescript
// Message Handler
@Controller()
export class UserController {
    @MessagePattern('get_user')
    async getUser(@Payload() data: { id: number }) {
        return this.userService.findOne(data.id);
    }

    @EventPattern('user_created')
    async handleUserCreated(@Payload() user: User) {
        await this.emailService.sendWelcome(user);
    }
}
```

```typescript
// Client (অন্য service থেকে call করো)
@Injectable()
export class ApiGatewayService {
    private userClient: ClientProxy;

    constructor(@InjectRedis() private redis: Redis) {
        this.userClient = ClientProxyFactory.create({
            transport: Transport.REDIS,
            options: { host: 'localhost', port: 6379 }
        });
    }

    async getUser(id: number) {
        return lastValueFrom(
            this.userClient.send('get_user', { id })
        );
    }
}
```

---

## Chapter 7: Prisma ORM — প্রিসমা

### বাংলা ব্যাখ্যা
Prisma হলো modern TypeScript ORM। TypeORM-এর চেয়ে type-safe এবং developer-friendly।

```bash
npm install prisma @prisma/client
npx prisma init
```

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int       @id @default(autoincrement())
  name      String
  email     String    @unique
  password  String
  role      Role      @default(USER)
  posts     Post[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())
}

enum Role {
  USER
  ADMIN
}
```

```typescript
// Prisma Service
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }
}

// Repository
@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {}

    async findAll(page: number, limit: number) {
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                skip: (page - 1) * limit,
                take: limit,
                include: { posts: true },
                orderBy: { createdAt: 'desc' }
            }),
            this.prisma.user.count()
        ]);

        return { users, total, page, limit };
    }

    async create(data: CreateUserDto) {
        return this.prisma.user.create({
            data: {
                ...data,
                password: await bcrypt.hash(data.password, 10)
            }
        });
    }
}
```

---

## Practice Project | অনুশীলন প্রকল্প

### User Management Microservice

```
Architecture:
├── api-gateway (NestJS HTTP)
│   ├── JWT Auth Guard
│   ├── Rate Limiting
│   └── Routes to microservices
├── user-service (NestJS Microservice)
│   ├── CQRS (Commands + Queries)
│   ├── Prisma + PostgreSQL
│   └── Redis transport
└── notification-service (NestJS Microservice)
    ├── Email notifications
    └── Event-driven
```

---

## Quick Revision | দ্রুত পুনরালোচনা

- **Guard** = request allow/reject করে (auth/roles)
- **Interceptor** = request/response transform করে (logging, cache)
- **Pipe** = data validate এবং transform করে
- **Exception Filter** = error সুন্দর করে return করে
- **CQRS** = read (Query) এবং write (Command) আলাদা
- **Microservices** = Redis/TCP দিয়ে services communicate করে
- **Prisma** = type-safe ORM, schema-first approach

---

> **আগের বই:** [Book 4 — MongoDB](04-mongodb.md) | **পরবর্তী বই:** [Book 6 — System Design](06-system-design.md)
