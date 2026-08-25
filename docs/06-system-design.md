# System Design — সম্পূর্ণ গাইড
### Book 6 of 14 | Phase 2 | Week 11-14

---

## ভূমিকা | Introduction

**English:** System Design is about designing large-scale systems that are reliable, scalable, and maintainable. This is the most important skill for senior developer roles.

**বাংলা:** System Design মানে এমন system তৈরি করা যা বিশ্বস্ত, scalable এবং রক্ষণাবেক্ষণযোগ্য। Senior developer হতে হলে এটি সবচেয়ে গুরুত্বপূর্ণ।

---

## Chapter 1: CAP Theorem — ক্যাপ থিওরেম

### English Explanation
A distributed system can only guarantee 2 of these 3 properties at the same time: Consistency, Availability, Partition Tolerance.

### বাংলা ব্যাখ্যা
একটি distributed system একসাথে এই ৩টি বৈশিষ্ট্যের মধ্যে মাত্র ২টি নিশ্চিত করতে পারে।

| Property | বাংলা | মানে |
|----------|-------|------|
| **C**onsistency | সামঞ্জস্য | সব node-এ একই সময়ে একই data |
| **A**vailability | প্রাপ্যতা | সবসময় response পাবে (error না) |
| **P**artition Tolerance | বিভাজন সহিষ্ণুতা | Network failure হলেও চলবে |

```
Real examples:
CA (C + A) — Traditional RDBMS (MySQL, PostgreSQL)
  → Network split হলে থেমে যায়

CP (C + P) — MongoDB, Redis, HBase
  → Network split হলে কিছু requests fail করে
  → কিন্তু data সবসময় consistent

AP (A + P) — Cassandra, CouchDB, DynamoDB
  → সবসময় respond করে
  → কিন্তু data কিছুটা stale হতে পারে (eventual consistency)
```

### Practical Decision | কোনটা বেছে নেবে?

```
Banking, Payments → CP (data ভুল হওয়া যাবে না)
Social Media Feed → AP (old data দেখালে চলে, downtime চলে না)
E-commerce inventory → CP (stock নিয়ে ভুল চলে না)
Chat messages → AP (message একটু দেরিতে গেলে চলে)
```

---

## Chapter 2: Scaling — স্কেলিং

### Vertical Scaling | উল্লম্ব স্কেলিং
```
Server-এর power বাড়াও
RAM: 8GB → 32GB → 128GB
CPU: 4 core → 16 core → 64 core

সুবিধা: সহজ, code পরিবর্তন লাগে না
অসুবিধা: limit আছে, একটাই failure point, দামি
```

### Horizontal Scaling | অনুভূমিক স্কেলিং
```
আরো server যোগ করো
1 server → 5 servers → 100 servers

সুবিধা: unlimited scaling, fault tolerant
অসুবিধা: জটিল, load balancer লাগে, stateless হতে হয়
```

```
                    ┌─── Server 1 (PHP/NestJS)
User Request ──→ Load Balancer ──→ Server 2 (PHP/NestJS)
                    └─── Server 3 (PHP/NestJS)
                              ↓
                    ┌─── Primary DB ──→ Replica 1
                    └────────────────→ Replica 2
```

---

## Chapter 3: Load Balancer — লোড ব্যালান্সার

### বাংলা ব্যাখ্যা
Load Balancer অনেকগুলো server-এ traffic distribute করে। কোনো একটি server বেশি চাপ নেয় না।

### Load Balancing Algorithms
```
Round Robin:
Request 1 → Server 1
Request 2 → Server 2
Request 3 → Server 3
Request 4 → Server 1 (আবার শুরু)

Least Connections:
সবচেয়ে কম active connection আছে সে server-এ দাও

IP Hash:
একই user সবসময় একই server-এ যাবে (sticky sessions)

Weighted Round Robin:
শক্তিশালী server-কে বেশি request দাও
Server 1 (8 core): weight 3 → 3টি request
Server 2 (4 core): weight 1 → 1টি request
```

### Nginx as Load Balancer
```nginx
upstream backend {
    server app1.example.com:3000 weight=3;
    server app2.example.com:3000 weight=1;
    server app3.example.com:3000 backup;  # শুধু অন্যরা fail হলে
}

server {
    listen 80;
    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## Chapter 4: Caching Strategies — ক্যাশিং কৌশল

### বাংলা ব্যাখ্যা
Cache হলো fast storage যেখানে frequently accessed data রাখা হয়। Database-এর উপর চাপ কমায়।

### Cache-Aside (Lazy Loading)
```
সবচেয়ে বেশি ব্যবহৃত pattern

১. Cache-এ আছে? → হ্যাঁ → Cache থেকে দাও (Cache Hit)
২. Cache-এ নেই? → DB থেকে নিয়ে Cache-এ রাখো → দাও (Cache Miss)
```

```php
// Laravel Example
public function getUser(int $id): User
{
    return Cache::remember("user:{$id}", 3600, function() use ($id) {
        return User::with('profile')->find($id);
    });
}

// User update হলে cache clear করো
public function updateUser(int $id, array $data): User
{
    $user = User::findOrFail($id)->update($data);
    Cache::forget("user:{$id}");
    return $user;
}
```

### Write-Through
```
Data write হলে Cache এবং DB একসাথে update হয়
সুবিধা: Cache সবসময় fresh
অসুবিধা: Write একটু slow
```

### Write-Behind (Write-Back)
```
প্রথমে Cache update, পরে DB update (async)
সুবিধা: Write অনেক দ্রুত
অসুবিধা: Cache fail হলে data হারাতে পারে
```

### Cache Eviction Policies
```
LRU (Least Recently Used): সবচেয়ে পুরোনো ব্যবহার করা বাদ
LFU (Least Frequently Used): সবচেয়ে কম ব্যবহার করা বাদ
TTL (Time To Live): নির্দিষ্ট সময় পরে auto-delete
```

---

## Chapter 5: Message Queues — মেসেজ কিউ

### বাংলা ব্যাখ্যা
Message Queue দুটি service-এর মধ্যে async communication করে। Producer message পাঠায়, Consumer পরে process করে।

```
Without Queue (Synchronous):
User → API → Email Service → Wait... → Response
                ↓ (Email service down হলে request fail)

With Queue (Asynchronous):
User → API → Queue → Instant Response ✓
                ↓ (Background)
         Email Service (process করো)
```

### RabbitMQ Concepts
```
Exchange: Message receive করে এবং route করে
Queue: Message store করে
Binding: Exchange এবং Queue-এর connection
```

```javascript
// Producer (NestJS)
@Injectable()
export class NotificationProducer {
    async sendEmailNotification(data: EmailDto): Promise<void> {
        await this.rabbitMQService.publish(
            'notifications',          // exchange
            'email.send',            // routing key
            Buffer.from(JSON.stringify(data))
        );
    }
}

// Consumer
@RabbitSubscribe({
    exchange: 'notifications',
    routingKey: 'email.send',
    queue: 'email-queue'
})
async handleEmailNotification(data: EmailDto): Promise<void> {
    await this.emailService.send(data);
}
```

### Redis Streams (Simpler alternative)
```typescript
// Producer
await redis.xadd('notifications', '*', 
    'type', 'email',
    'to', 'anik@example.com',
    'subject', 'Welcome!'
);

// Consumer
const messages = await redis.xreadgroup(
    'GROUP', 'email-workers', 'worker-1',
    'COUNT', 10,
    'STREAMS', 'notifications', '>'
);
```

---

## Chapter 6: Database Sharding — ডেটাবেজ শার্ডিং

### বাংলা ব্যাখ্যা
Sharding মানে data-কে ভাগ করে একাধিক database-এ রাখা। একটি database-এ সব রাখলে limit হয়ে যায়।

```
Horizontal Sharding (Row-based):
User 1-1M → Database 1
User 1M-2M → Database 2
User 2M-3M → Database 3

Vertical Sharding (Column-based):
User profile → Database 1
User orders → Database 2
User activity → Database 3
```

### Sharding Strategies
```
Hash-based:
shard = user_id % 3
user_id=1 → shard 1
user_id=2 → shard 2
user_id=3 → shard 0

Range-based:
user_id 1-1000000 → Shard 1
user_id 1000001-2000000 → Shard 2

Directory-based:
একটি lookup table রাখো কোন data কোথায় আছে
```

---

## Chapter 7: Rate Limiting — রেট লিমিটিং

### বাংলা ব্যাখ্যা
Rate Limiting নির্দিষ্ট সময়ে কতটি request আসতে পারবে তা সীমিত করে। DDoS এবং abuse থেকে বাঁচায়।

```typescript
// NestJS Rate Limiting
npm install @nestjs/throttler

// app.module.ts
@Module({
    imports: [
        ThrottlerModule.forRoot([{
            ttl: 60000,   // 60 seconds
            limit: 100,   // 100 requests per 60 seconds
        }]),
    ],
})

// Controller-এ
@UseGuards(ThrottlerGuard)
@Controller('api')
export class ApiController {
    @Throttle({ default: { limit: 3, ttl: 60000 } })  // Stricter limit
    @Post('login')
    login(@Body() dto: LoginDto) { }
}
```

### Token Bucket Algorithm
```
Bucket capacity: 100 tokens
Refill rate: 10 tokens/second

Request আসলে → 1 token কাটো
Token 0 হলে → Rate limit hit → 429 error
```

---

## Chapter 8: System Design Practice — ডিজাইন অনুশীলন

### URL Shortener System Design

```
Requirements:
- URL shorten করো (bit.ly-র মতো)
- Short URL-এ click করলে redirect করো
- Analytics (click count, geography)

Design:

1. API:
   POST /shorten → { url: "...", short: "abc123" }
   GET /{code} → 302 Redirect

2. Short Code Generation:
   - Random 6 chars (a-z, A-Z, 0-9) = 62^6 = 56 billion combinations
   - অথবা Base62(id) — sequential

3. Database:
   CREATE TABLE urls (
       id BIGINT PRIMARY KEY,
       original_url TEXT NOT NULL,
       short_code VARCHAR(10) UNIQUE NOT NULL,
       created_at TIMESTAMP,
       expires_at TIMESTAMP,
       user_id INT
   );

4. Caching:
   Cache: short_code → original_url (Redis, TTL 1 hour)
   Cache miss → DB lookup → Cache update

5. Scaling:
   - Read heavy (redirect বেশি, create কম)
   - Redis cache short codes
   - Multiple app servers behind load balancer
   - Read replicas for analytics
```

### Notification System Design

```
Requirements:
- Email, SMS, Push notifications পাঠাও
- Millions of users

Design:
User Action → API → Message Queue → Notification Workers
                                          ↓
                              Email Service (SendGrid)
                              SMS Service (Twilio)
                              Push Service (FCM)

Components:
1. Notification API — receive requests
2. RabbitMQ/Redis — decouple producer/consumer
3. Worker pools — process by channel
4. Retry mechanism — failed messages retry
5. Dead letter queue — repeatedly failed messages
```

---

## Quick Revision | দ্রুত পুনরালোচনা

- **CAP Theorem** = C, A, P-এর মধ্যে ২টি choose করো
- **Vertical Scaling** = বড় server (limit আছে)
- **Horizontal Scaling** = বেশি server (unlimited, জটিল)
- **Load Balancer** = traffic distribute করে (Nginx)
- **Cache-Aside** = check cache → miss হলে DB → cache update
- **Message Queue** = async communication, decoupling
- **Sharding** = data ভাগ করে অনেক DB-তে রাখো
- **Rate Limiting** = abuse থেকে বাঁচাও

---

> **আগের বই:** [Book 5 — NestJS](05-nestjs.md) | **পরবর্তী বই:** [Book 7 — Redis](07-redis.md)
