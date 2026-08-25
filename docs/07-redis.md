# Redis Deep Dive — সম্পূর্ণ গাইড
### Book 7 of 14 | Phase 2 | Week 15-16

---

## ভূমিকা | Introduction

**English:** Redis is an in-memory data structure store used as a database, cache, and message broker. It's extremely fast because all data lives in RAM.

**বাংলা:** Redis হলো in-memory data store — database, cache এবং message broker হিসেবে কাজ করে। সব data RAM-এ থাকে তাই অত্যন্ত দ্রুত।

---

## Chapter 1: Data Structures — ডেটা স্ট্রাকচার

### String — স্ট্রিং
```redis
# সবচেয়ে সহজ — যেকোনো value store করা যায়
SET user:1:name "Anik Chandra"
GET user:1:name

# TTL সহ (3600 seconds = 1 hour)
SET session:abc123 "user_data" EX 3600
TTL session:abc123   # কতক্ষণ বাকি

# Increment/Decrement (counter)
SET page:views 0
INCR page:views      # 1
INCRBY page:views 5  # 6
DECR page:views      # 5

# JSON string হিসেবে
SET user:1 '{"name":"Anik","email":"anik@example.com"}'
GET user:1
```

### Hash — হ্যাশ
```redis
# Object-এর মতো — field:value pairs
HSET user:1 name "Anik" email "anik@example.com" age 25
HGET user:1 name
HGETALL user:1       # সব fields
HMGET user:1 name email  # নির্দিষ্ট fields

HINCRBY user:1 age 1  # age বাড়াও
HDEL user:1 age       # field delete করো
HEXISTS user:1 email  # আছে কিনা?

# সুবিধা: পুরো object reload না করে individual field update করা যায়
HSET user:1 last_login "2026-08-25"
```

### List — লিস্ট
```redis
# Ordered list, duplicate allowed
# Queue হিসেবে ব্যবহার (FIFO)
RPUSH notifications "New message"      # right এ যোগ করো
RPUSH notifications "New follower"
LPOP notifications                     # left থেকে নাও (Queue)

# Stack হিসেবে (LIFO)
LPUSH stack "item1"
LPOP stack

# Range দেখো
LRANGE notifications 0 -1   # সব
LRANGE notifications 0 9    # প্রথম 10টি
LLEN notifications           # length

# Blocking pop — queue empty হলে wait করো
BLPOP job-queue 30   # 30 seconds অপেক্ষা করো
```

### Set — সেট
```redis
# Unordered, unique values
SADD tags "php" "laravel" "vue" "nestjs"
SADD tags "php"  # duplicate — ignore হবে

SMEMBERS tags      # সব members
SISMEMBER tags "php"  # আছে কিনা?
SCARD tags         # count

# Set operations
SADD user:1:skills "php" "laravel" "vue"
SADD user:2:skills "php" "nestjs" "react"

SINTER user:1:skills user:2:skills   # common skills
SUNION user:1:skills user:2:skills   # সব skills
SDIFF user:1:skills user:2:skills    # user:1-এর unique skills
```

### Sorted Set — সর্টেড সেট
```redis
# Set + score (ranking এর জন্য)
ZADD leaderboard 1500 "Anik"
ZADD leaderboard 2000 "Rahim"
ZADD leaderboard 1800 "Karim"

# Rank দেখো (0-indexed)
ZRANK leaderboard "Anik"         # 0 (lowest)
ZREVRANK leaderboard "Anik"      # 2 (highest first)

# Range by rank
ZRANGE leaderboard 0 -1 WITHSCORES   # সব (ascending)
ZREVRANGE leaderboard 0 2 WITHSCORES  # Top 3

# Score update
ZINCRBY leaderboard 500 "Anik"   # Anik-এর score +500

# Real use: Rate limiting
ZADD rate:user:1 1724593200 "req1"
ZADD rate:user:1 1724593201 "req2"
# Remove old entries
ZREMRANGEBYSCORE rate:user:1 -inf (now-60)
# Count recent requests
ZCARD rate:user:1
```

---

## Chapter 2: TTL — টাইম টু লাইভ

### বাংলা ব্যাখ্যা
TTL মানে কতক্ষণ পরে data auto-delete হবে। Cache, session management-এ অপরিহার্য।

```redis
# Set করার সময় TTL দাও
SET token:abc123 "user_id:1" EX 3600      # seconds
SET token:abc123 "user_id:1" PX 3600000   # milliseconds
SET token:abc123 "user_id:1" EXAT 1724596800  # Unix timestamp

# পরে TTL দাও
SET mykey "hello"
EXPIRE mykey 300        # 5 minutes পরে delete
PEXPIRE mykey 300000    # milliseconds

# TTL দেখো
TTL mykey     # remaining seconds (-1 = never, -2 = not exists)
PTTL mykey    # remaining milliseconds

# TTL সরাও (permanent করো)
PERSIST mykey

# Pattern: Session management
SET session:user:1 '{"cart": [], "wishlist": []}' EX 86400  # 24 hours
# User active থাকলে extend করো
EXPIRE session:user:1 86400
```

---

## Chapter 3: Pub/Sub — পাব/সাব

### বাংলা ব্যাখ্যা
Pub/Sub দিয়ে real-time messaging করা যায়। Publisher message পাঠায়, Subscriber শোনে।

```redis
# Subscribe (terminal 1)
SUBSCRIBE chat:room:1
SUBSCRIBE notifications:user:123

# Publish (terminal 2)
PUBLISH chat:room:1 "Hello everyone!"
PUBLISH notifications:user:123 "You have a new message"

# Pattern subscribe
PSUBSCRIBE notifications:*    # সব notifications channel শোনো
```

```typescript
// NestJS দিয়ে Pub/Sub
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class ChatGateway implements OnModuleInit {
    private publisher: Redis;
    private subscriber: Redis;

    async onModuleInit() {
        this.publisher = new Redis();
        this.subscriber = new Redis();

        await this.subscriber.subscribe('chat:room:1');
        
        this.subscriber.on('message', (channel, message) => {
            // Connected clients-এ broadcast করো
            this.server.to(channel).emit('message', JSON.parse(message));
        });
    }

    async sendMessage(roomId: string, message: any) {
        await this.publisher.publish(
            `chat:room:${roomId}`,
            JSON.stringify(message)
        );
    }
}
```

---

## Chapter 4: Redis with Laravel — লারাভেল

```php
// .env
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

// Cache
Cache::put('users', $users, 3600);
Cache::get('users');
Cache::forget('users');
Cache::remember('users', 3600, fn() => User::all());
Cache::rememberForever('settings', fn() => Setting::all());

// Tags দিয়ে group করো
Cache::tags(['users', 'api'])->put('users:list', $users, 3600);
Cache::tags('users')->flush();  // সব user cache delete

// Direct Redis commands
use Illuminate\Support\Facades\Redis;

Redis::set('key', 'value');
Redis::get('key');
Redis::del('key');
Redis::expire('key', 3600);
Redis::hset('user:1', 'name', 'Anik');
Redis::zadd('leaderboard', 1500, 'Anik');

// Pipeline — একসাথে অনেক commands
Redis::pipeline(function ($pipe) {
    $pipe->set('key1', 'value1');
    $pipe->set('key2', 'value2');
    $pipe->expire('key1', 3600);
    $pipe->expire('key2', 3600);
});
```

---

## Chapter 5: Redis with NestJS — নেস্টজেএস

```bash
npm install @nestjs-modules/ioredis ioredis
```

```typescript
// app.module.ts
@Module({
    imports: [
        RedisModule.forRoot({
            config: {
                host: 'localhost',
                port: 6379,
            }
        })
    ]
})

// Service
@Injectable()
export class CacheService {
    constructor(@InjectRedis() private redis: Redis) {}

    async get<T>(key: string): Promise<T | null> {
        const value = await this.redis.get(key);
        return value ? JSON.parse(value) : null;
    }

    async set(key: string, value: any, ttl?: number): Promise<void> {
        const serialized = JSON.stringify(value);
        if (ttl) {
            await this.redis.setex(key, ttl, serialized);
        } else {
            await this.redis.set(key, serialized);
        }
    }

    async del(key: string): Promise<void> {
        await this.redis.del(key);
    }

    async increment(key: string): Promise<number> {
        return this.redis.incr(key);
    }
}
```

---

## Chapter 6: Redis Patterns — রেডিস প্যাটার্ন

### Rate Limiting with Redis
```typescript
@Injectable()
export class RateLimiterService {
    constructor(@InjectRedis() private redis: Redis) {}

    async isAllowed(userId: string, limit: number = 100): Promise<boolean> {
        const key = `rate:${userId}:${Math.floor(Date.now() / 60000)}`;
        
        const count = await this.redis.incr(key);
        
        if (count === 1) {
            await this.redis.expire(key, 60);  // 1 minute TTL
        }
        
        return count <= limit;
    }
}
```

### Session Management
```typescript
async createSession(userId: number, data: any): Promise<string> {
    const sessionId = crypto.randomUUID();
    
    await this.redis.setex(
        `session:${sessionId}`,
        86400,  // 24 hours
        JSON.stringify({ userId, ...data })
    );
    
    return sessionId;
}

async getSession(sessionId: string): Promise<any> {
    const data = await this.redis.get(`session:${sessionId}`);
    if (!data) return null;
    
    // Extend session on activity
    await this.redis.expire(`session:${sessionId}`, 86400);
    
    return JSON.parse(data);
}
```

### Leaderboard
```typescript
async updateScore(userId: string, score: number): Promise<void> {
    await this.redis.zadd('leaderboard', score, userId);
}

async getTopPlayers(count: number = 10): Promise<Array<{user: string, score: number}>> {
    const results = await this.redis.zrevrange('leaderboard', 0, count - 1, 'WITHSCORES');
    
    const players = [];
    for (let i = 0; i < results.length; i += 2) {
        players.push({ user: results[i], score: parseFloat(results[i + 1]) });
    }
    return players;
}

async getUserRank(userId: string): Promise<number | null> {
    const rank = await this.redis.zrevrank('leaderboard', userId);
    return rank !== null ? rank + 1 : null;  // 1-indexed
}
```

---

## Chapter 7: Redis Persistence — রেডিস পার্সিস্টেন্স

### বাংলা ব্যাখ্যা
Redis in-memory কিন্তু disk-এও save করা যায়।

```
RDB (Redis Database) — Snapshot
- নির্দিষ্ট সময় পরপর snapshot নেয়
- Fast restart
- কিছু data হারাতে পারে (last snapshot-এর পরের data)

AOF (Append Only File) — Log
- প্রতিটি operation log করে
- Slower কিন্তু বেশি safe
- Restart-এ সব replay করে

Production recommendation:
- AOF + RDB দুটোই চালাও
```

```redis
# redis.conf
# RDB
save 900 1      # 900 seconds-এ কমপক্ষে 1 change হলে save
save 300 10     # 300 seconds-এ কমপক্ষে 10 change হলে save
save 60 10000   # 60 seconds-এ কমপক্ষে 10000 change হলে save

# AOF
appendonly yes
appendfsync everysec  # প্রতি সেকেন্ডে sync
```

---

## Practice Project | অনুশীলন প্রকল্প

### Laravel API-তে Redis Caching যোগ করো

```
১. সব GET endpoints cache করো
   - user:list → 5 minutes
   - user:{id} → 1 hour
   - products → 10 minutes

২. Cache invalidation
   - User update হলে user cache clear
   - Product update হলে product cache clear

৩. Rate limiting
   - 100 requests/minute per user
   - 10 login attempts/minute per IP

৪. Session management
   - Redis-এ session store করো
   - 24 hours TTL

৫. Queue
   - Redis queue driver ব্যবহার করো
   - Email jobs queue-এ দাও
```

---

## Quick Revision | দ্রুত পুনরালোচনা

- **String** = simple value, counter, JSON
- **Hash** = object fields, partial update
- **List** = queue (RPUSH+LPOP), stack (LPUSH+LPOP)
- **Set** = unique values, set operations (union, intersection)
- **Sorted Set** = ranking/leaderboard, rate limiting
- **TTL** = auto-expire, cache এবং session-এ অপরিহার্য
- **Pub/Sub** = real-time messaging
- **Pipeline** = একসাথে অনেক commands, performance boost

---

> **আগের বই:** [Book 6 — System Design](06-system-design.md) | **পরবর্তী বই:** [Book 8 — Docker](08-docker.md)
