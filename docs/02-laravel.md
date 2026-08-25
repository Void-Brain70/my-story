# Laravel Deep Dive — সম্পূর্ণ গাইড
### Book 2 of 14 | Phase 1 | Week 3-4

---

## ভূমিকা | Introduction

**English:** Laravel is a PHP framework that makes building web applications elegant and fast. Going deep means understanding its core architecture, not just using its features.

**বাংলা:** Laravel হলো একটি PHP framework। এটি web application তৈরি করা সহজ ও দ্রুত করে। গভীরভাবে শেখা মানে শুধু ব্যবহার না, এর ভেতরের architecture বোঝা।

---

## Chapter 1: Service Container — সার্ভিস কন্টেইনার

### English Explanation
The Service Container is Laravel's most powerful feature. It manages class dependencies and performs dependency injection automatically.

### বাংলা ব্যাখ্যা
Service Container হলো Laravel-এর সবচেয়ে শক্তিশালী feature। এটি class-এর dependencies manage করে এবং automatic dependency injection করে।

```php
// সহজ উদাহরণ — Service Container ছাড়া
class UserController {
    public function __construct() {
        // নিজেই তৈরি করতে হচ্ছে — খারাপ পদ্ধতি
        $this->userService = new UserService(new UserRepository(new DB()));
    }
}

// Service Container দিয়ে — ভালো পদ্ধতি
class UserController {
    public function __construct(private UserService $userService) {
        // Laravel নিজেই UserService তৈরি করে দেবে
    }
}
```

### Container-এ Binding করা

```php
// AppServiceProvider.php
public function register(): void
{
    // Simple binding
    $this->app->bind(UserRepositoryInterface::class, UserRepository::class);

    // Singleton — একবার তৈরি হয়ে সবসময় same instance দেয়
    $this->app->singleton(PaymentGateway::class, function ($app) {
        return new StripeGateway(config('services.stripe.key'));
    });

    // Instance — নির্দিষ্ট object bind করা
    $this->app->instance(Config::class, new Config(['debug' => true]));
}
```

### কেন এটি গুরুত্বপূর্ণ?

**বাংলা:** Testing-এ সহজে mock করা যায়। Code loosely coupled থাকে। এক জায়গায় পরিবর্তন করলেই সব জায়গায় কাজ করে।

---

## Chapter 2: Facades — ফাসাড

### English Explanation
Facades provide a static interface to classes in the service container. They make code readable but underneath they use the container.

### বাংলা ব্যাখ্যা
Facade দেখতে static method-এর মতো কিন্তু ভেতরে Service Container ব্যবহার করে। এটি code পড়তে সহজ করে।

```php
// Facade ব্যবহার (সহজ দেখতে)
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

Cache::put('key', 'value', 3600);
$users = DB::table('users')->get();
Log::info('User logged in', ['user_id' => 1]);

// একই কাজ Dependency Injection দিয়ে
use Illuminate\Cache\Repository;
use Illuminate\Database\DatabaseManager;

class UserController {
    public function __construct(
        private Repository $cache,
        private DatabaseManager $db
    ) {}
    
    public function index() {
        return $this->cache->remember('users', 3600, function() {
            return $this->db->table('users')->get();
        });
    }
}
```

### Common Facades | সাধারণ Facade সমূহ

| Facade | কাজ |
|--------|-----|
| `Cache` | Data cache করা |
| `DB` | Database query |
| `Log` | Log লেখা |
| `Mail` | Email পাঠানো |
| `Queue` | Job queue-এ দেওয়া |
| `Storage` | File সংরক্ষণ |
| `Auth` | Authentication |
| `Route` | Routing |

---

## Chapter 3: Service Providers — সার্ভিস প্রোভাইডার

### English Explanation
Service Providers are the central place to configure and bootstrap all Laravel services. Every feature of Laravel is bootstrapped via a service provider.

### বাংলা ব্যাখ্যা
Service Provider হলো Laravel-এর সব কিছু শুরু হওয়ার জায়গা। তোমার নিজের services register করতে এখানে কাজ করো।

```php
// নিজের Service Provider তৈরি করো
// php artisan make:provider PaymentServiceProvider

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\PaymentService;
use App\Services\StripePaymentService;

class PaymentServiceProvider extends ServiceProvider
{
    // register() — Services bind করো
    public function register(): void
    {
        $this->app->singleton(PaymentService::class, function ($app) {
            return new StripePaymentService(
                apiKey: config('services.stripe.key'),
                webhook: config('services.stripe.webhook')
            );
        });
    }

    // boot() — Register হওয়ার পরে যা করতে চাও
    public function boot(): void
    {
        // Model observers, validators, etc.
        \App\Models\User::observe(\App\Observers\UserObserver::class);
    }
}
```

```php
// config/app.php এ register করো
'providers' => [
    // ...
    App\Providers\PaymentServiceProvider::class,
],
```

---

## Chapter 4: Repository Pattern — রিপোজিটরি প্যাটার্ন

### English Explanation
The Repository Pattern separates data access logic from business logic. Your controller doesn't care if data comes from MySQL, MongoDB, or an API.

### বাংলা ব্যাখ্যা
Repository Pattern data access logic-কে business logic থেকে আলাদা রাখে। Controller-এর জানার দরকার নেই data কোথা থেকে আসছে।

```php
// Interface তৈরি করো
namespace App\Repositories;

interface UserRepositoryInterface
{
    public function all(): Collection;
    public function find(int $id): ?User;
    public function create(array $data): User;
    public function update(int $id, array $data): User;
    public function delete(int $id): bool;
}
```

```php
// Implementation তৈরি করো
namespace App\Repositories;

use App\Models\User;

class UserRepository implements UserRepositoryInterface
{
    public function all(): Collection
    {
        return User::with(['posts', 'profile'])->get();
    }

    public function find(int $id): ?User
    {
        return User::with(['posts'])->find($id);
    }

    public function create(array $data): User
    {
        return User::create($data);
    }

    public function update(int $id, array $data): User
    {
        $user = User::findOrFail($id);
        $user->update($data);
        return $user->fresh();
    }

    public function delete(int $id): bool
    {
        return User::destroy($id) > 0;
    }
}
```

```php
// Controller-এ ব্যবহার করো
class UserController extends Controller
{
    public function __construct(
        private UserRepositoryInterface $users
    ) {}

    public function index()
    {
        return response()->json($this->users->all());
    }

    public function store(StoreUserRequest $request)
    {
        $user = $this->users->create($request->validated());
        return response()->json($user, 201);
    }
}
```

---

## Chapter 5: Queues & Jobs — কিউ এবং জব

### English Explanation
Queues allow you to defer time-consuming tasks (sending emails, processing images) to be executed in the background, improving response time.

### বাংলা ব্যাখ্যা
Queue দিয়ে ধীর কাজগুলো (email পাঠানো, image process করা) background-এ পাঠিয়ে দেওয়া যায়। User অপেক্ষা করে না।

```php
// Job তৈরি করো
// php artisan make:job SendWelcomeEmail

namespace App\Jobs;

use App\Models\User;
use App\Mail\WelcomeMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendWelcomeEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    // কতবার retry করবে
    public int $tries = 3;

    // কতক্ষণ পরে timeout হবে
    public int $timeout = 60;

    public function __construct(private User $user) {}

    public function handle(): void
    {
        Mail::to($this->user->email)
            ->send(new WelcomeMail($this->user));
    }

    // Failure হলে কি করবে
    public function failed(\Throwable $exception): void
    {
        Log::error('Welcome email failed', [
            'user_id' => $this->user->id,
            'error' => $exception->getMessage()
        ]);
    }
}
```

```php
// Controller থেকে dispatch করো
class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create($request->validated());
        
        // Email queue-এ দাও — user অপেক্ষা করবে না
        SendWelcomeEmail::dispatch($user);
        
        // ৫ মিনিট পরে পাঠাও
        SendWelcomeEmail::dispatch($user)->delay(now()->addMinutes(5));
        
        return response()->json(['message' => 'Registration successful']);
    }
}
```

```bash
# Queue worker চালাও
php artisan queue:work redis

# Production-এ Supervisor দিয়ে চালাও
php artisan queue:work redis --sleep=3 --tries=3 --max-time=3600
```

---

## Chapter 6: Events & Listeners — ইভেন্ট এবং লিসেনার

### English Explanation
Events allow different parts of your app to communicate without being tightly coupled. When something happens, fire an event. Other parts listen and react.

### বাংলা ব্যাখ্যা
Event দিয়ে app-এর বিভিন্ন অংশ একে অপরের সাথে কথা বলতে পারে। কোনো কিছু ঘটলে event fire করো, অন্য অংশ শুনে কাজ করে।

```php
// Event তৈরি করো
// php artisan make:event UserRegistered

namespace App\Events;

use App\Models\User;
use Illuminate\Foundation\Events\Dispatchable;

class UserRegistered
{
    use Dispatchable;
    
    public function __construct(public readonly User $user) {}
}
```

```php
// Listener তৈরি করো
// php artisan make:listener SendWelcomeNotification

namespace App\Listeners;

use App\Events\UserRegistered;
use App\Jobs\SendWelcomeEmail;

class SendWelcomeNotification
{
    public function handle(UserRegistered $event): void
    {
        SendWelcomeEmail::dispatch($event->user);
    }
}
```

```php
// EventServiceProvider.php এ register করো
protected $listen = [
    UserRegistered::class => [
        SendWelcomeNotification::class,
        CreateUserProfile::class,
        AssignDefaultRole::class,
    ],
];
```

```php
// Event fire করো
event(new UserRegistered($user));
// অথবা
UserRegistered::dispatch($user);
```

---

## Chapter 7: Laravel Sanctum — API Authentication

### বাংলা ব্যাখ্যা
Sanctum দিয়ে API token-based authentication করা যায়। Mobile app বা SPA-র জন্য উপযুক্ত।

```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

```php
// User model-এ HasApiTokens যোগ করো
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
}
```

```php
// Auth Controller
class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }
}
```

```php
// routes/api.php
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn(Request $r) => $r->user());
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('posts', PostController::class);
});
```

---

## Practice Project | অনুশীলন প্রকল্প

### REST API with Queue-based Email

```
Goal: User register → Queue-তে email → Background-এ email যাবে

১. User registration API (Sanctum)
২. Registration-এ event fire করো
৩. Event listener-এ email job dispatch করো
৪. Redis queue-এ job যাবে
৫. Queue worker background-এ চলবে
৬. Email চলে যাবে
```

```bash
# Commands
php artisan make:model User -m
php artisan make:controller AuthController --api
php artisan make:event UserRegistered
php artisan make:listener SendWelcomeNotification --event=UserRegistered
php artisan make:job SendWelcomeEmail
php artisan make:mail WelcomeMail

# Run
php artisan serve
php artisan queue:work redis
```

---

## Quick Revision | দ্রুত পুনরালোচনা

- **Service Container** = dependency injection-এর জায়গা
- **Facades** = সহজ static-like interface, ভেতরে container
- **Service Provider** = সব কিছু register ও boot করার জায়গা
- **Repository Pattern** = data access আলাদা রাখো
- **Queue/Job** = ধীর কাজ background-এ পাঠাও
- **Event/Listener** = loose coupling দিয়ে communicate করো
- **Sanctum** = API token authentication

---

> **আগের বই:** [Book 1 — MySQL](01-mysql.md) | **পরবর্তী বই:** [Book 3 — PostgreSQL](03-postgresql.md)
