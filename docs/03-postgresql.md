# PostgreSQL Deep Dive — সম্পূর্ণ গাইড
### Book 3 of 14 | Phase 1 | Week 5-6

---

## ভূমিকা | Introduction

**English:** PostgreSQL is the world's most advanced open-source relational database. It's more powerful than MySQL with better support for complex queries, JSON, and advanced indexing.

**বাংলা:** PostgreSQL হলো বিশ্বের সবচেয়ে advanced open-source relational database। MySQL-এর চেয়ে শক্তিশালী — complex query, JSON, এবং advanced indexing-এ অনেক এগিয়ে।

---

## Chapter 1: MySQL থেকে PostgreSQL-এ আসো

### মূল পার্থক্য | Key Differences

| বিষয় | MySQL | PostgreSQL |
|-------|-------|------------|
| Default string | VARCHAR | TEXT (unlimited) |
| Boolean | TINYINT(1) | BOOLEAN |
| Auto increment | AUTO_INCREMENT | SERIAL বা GENERATED ALWAYS |
| JSON | JSON | JSON + JSONB (indexable) |
| Array | নেই | আছে! |
| Full-text search | FULLTEXT INDEX | tsvector / tsquery |
| Case sensitivity | Case-insensitive | Case-sensitive (ILIKE লাগবে) |

```sql
-- MySQL
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    active TINYINT(1) DEFAULT 1
);

-- PostgreSQL equivalent
CREATE TABLE users (
    id SERIAL PRIMARY KEY,           -- অথবা BIGSERIAL বড় table-এর জন্য
    name TEXT NOT NULL,
    active BOOLEAN DEFAULT TRUE
);

-- Modern PostgreSQL (GENERATED ALWAYS)
CREATE TABLE products (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC(10, 2)
);
```

---

## Chapter 2: Advanced Indexing — উন্নত ইনডেক্স

### বাংলা ব্যাখ্যা
PostgreSQL-এ অনেক ধরনের index আছে। সঠিক index ব্যবহার করলে query অনেক দ্রুত হয়।

### B-Tree Index (Default)
```sql
-- সবচেয়ে সাধারণ — equality এবং range query-তে
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_created ON posts(created_at DESC);

-- Partial index — শুধু active users-এর index
CREATE INDEX idx_active_users ON users(email) WHERE active = TRUE;
-- এটি ছোট index, দ্রুত কাজ করে
```

### GIN Index — JSON এবং Array-এর জন্য
```sql
-- JSON column-এ GIN index
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT,
    attributes JSONB   -- JSONB = indexable, binary stored
);

CREATE INDEX idx_attributes ON products USING GIN(attributes);

-- এখন JSON-এর ভেতরে দ্রুত search হবে
SELECT * FROM products WHERE attributes @> '{"color": "red"}';
SELECT * FROM products WHERE attributes ? 'size';  -- key আছে কিনা
```

### GiST Index — Geometric এবং Full-text
```sql
-- Full-text search-এর জন্য
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT,
    search_vector TSVECTOR  -- pre-computed search vector
);

-- GiST index
CREATE INDEX idx_search ON articles USING GIN(search_vector);

-- Trigger দিয়ে auto-update
CREATE TRIGGER update_search_vector
BEFORE INSERT OR UPDATE ON articles
FOR EACH ROW EXECUTE FUNCTION
tsvector_update_trigger(search_vector, 'pg_catalog.english', 'title', 'content');

-- Search করো
SELECT title FROM articles
WHERE search_vector @@ plainto_tsquery('english', 'laravel tutorial');
```

### Composite Index
```sql
-- একাধিক column-এ index
CREATE INDEX idx_user_status ON posts(user_id, status);

-- এই query-তে কাজ করবে
SELECT * FROM posts WHERE user_id = 1 AND status = 'published';
SELECT * FROM posts WHERE user_id = 1;  -- এটাতেও কাজ করবে

-- এটাতে কাজ করবে না
SELECT * FROM posts WHERE status = 'published';  -- user_id ছাড়া
```

---

## Chapter 3: JSON/JSONB — জেসন কলাম

### বাংলা ব্যাখ্যা
PostgreSQL-এ JSON বা JSONB column রেখে flexible data store করা যায়। MongoDB-র মতো কাজ করে কিন্তু relational database-এর শক্তি সহ।

```sql
-- Table তৈরি
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    profile JSONB,         -- JSONB ব্যবহার করো — দ্রুত এবং indexable
    settings JSONB DEFAULT '{}'
);

-- Data insert করো
INSERT INTO users (name, email, profile, settings) VALUES
('Anik Chandra', 'anik@example.com',
    '{"age": 25, "city": "Dhaka", "skills": ["PHP", "Laravel", "Vue"]}',
    '{"notifications": true, "theme": "dark"}'
);

-- JSON data read করো
SELECT 
    name,
    profile->>'city' as city,           -- Text value পাও
    profile->'age' as age,              -- JSON value পাও
    profile->'skills'->0 as first_skill -- Array element
FROM users;

-- JSON-এর ভেতরে search করো
SELECT * FROM users 
WHERE profile->>'city' = 'Dhaka';

-- Array-এ element আছে কিনা
SELECT * FROM users 
WHERE profile->'skills' ? 'Laravel';

-- Nested object match
SELECT * FROM users 
WHERE profile @> '{"city": "Dhaka"}';

-- JSON update করো
UPDATE users 
SET profile = profile || '{"phone": "01712345678"}'  -- merge
WHERE id = 1;

UPDATE users
SET settings = jsonb_set(settings, '{theme}', '"light"')
WHERE id = 1;
```

---

## Chapter 4: Window Functions — উইন্ডো ফাংশন

### English Explanation
Window functions perform calculations across a set of table rows related to the current row. They are more powerful than GROUP BY.

### বাংলা ব্যাখ্যা
Window function একটি row-এর সাথে সম্পর্কিত অন্যান্য rows-এর উপর calculation করে। GROUP BY-এর চেয়ে অনেক শক্তিশালী।

```sql
-- Sample data
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    salesperson TEXT,
    amount NUMERIC,
    sale_date DATE
);

-- ROW_NUMBER — প্রতিটি row-এর নম্বর
SELECT 
    salesperson,
    amount,
    ROW_NUMBER() OVER (ORDER BY amount DESC) as rank
FROM sales;

-- RANK — একই মানে একই rank (gap থাকে)
-- DENSE_RANK — একই মানে একই rank (gap নেই)
SELECT 
    salesperson,
    amount,
    RANK() OVER (ORDER BY amount DESC) as rank,
    DENSE_RANK() OVER (ORDER BY amount DESC) as dense_rank
FROM sales;

-- PARTITION BY — প্রতিটি salesperson-এর মধ্যে rank
SELECT 
    salesperson,
    sale_date,
    amount,
    RANK() OVER (
        PARTITION BY salesperson 
        ORDER BY amount DESC
    ) as rank_within_person,
    SUM(amount) OVER (
        PARTITION BY salesperson
    ) as total_by_person
FROM sales;

-- Running total — চলমান যোগফল
SELECT 
    sale_date,
    amount,
    SUM(amount) OVER (ORDER BY sale_date) as running_total
FROM sales;

-- LAG / LEAD — আগের বা পরের row-এর value
SELECT 
    sale_date,
    amount,
    LAG(amount) OVER (ORDER BY sale_date) as previous_amount,
    amount - LAG(amount) OVER (ORDER BY sale_date) as change
FROM sales;
```

---

## Chapter 5: CTEs (Common Table Expressions) — সিটিই

### বাংলা ব্যাখ্যা
CTE হলো query-এর ভেতরে named temporary result। Complex query-কে readable করে তোলে।

```sql
-- Simple CTE
WITH active_users AS (
    SELECT id, name, email
    FROM users
    WHERE active = TRUE
),
user_post_counts AS (
    SELECT user_id, COUNT(*) as post_count
    FROM posts
    GROUP BY user_id
)
SELECT 
    u.name,
    u.email,
    COALESCE(upc.post_count, 0) as posts
FROM active_users u
LEFT JOIN user_post_counts upc ON u.id = upc.user_id
ORDER BY posts DESC;
```

### Recursive CTE — Category Tree
```sql
-- Category table (self-referencing)
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    parent_id INT REFERENCES categories(id)
);

-- Recursive CTE দিয়ে পুরো tree বের করো
WITH RECURSIVE category_tree AS (
    -- Base case: root categories (parent নেই)
    SELECT id, name, parent_id, 0 as level, name::TEXT as path
    FROM categories
    WHERE parent_id IS NULL
    
    UNION ALL
    
    -- Recursive case: children
    SELECT c.id, c.name, c.parent_id, ct.level + 1, 
           ct.path || ' > ' || c.name
    FROM categories c
    INNER JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT * FROM category_tree ORDER BY path;
```

---

## Chapter 6: Full-Text Search — ফুল টেক্সট সার্চ

### বাংলা ব্যাখ্যা
PostgreSQL-এ built-in full-text search আছে যা Elasticsearch-এর basic alternative হিসেবে কাজ করে।

```sql
-- tsvector এবং tsquery ব্যবহার করো
SELECT title, content
FROM articles
WHERE to_tsvector('english', title || ' ' || content) 
    @@ to_tsquery('english', 'laravel & tutorial');

-- Ranking সহ
SELECT 
    title,
    ts_rank(
        to_tsvector('english', content),
        to_tsquery('english', 'laravel')
    ) as relevance
FROM articles
WHERE to_tsvector('english', content) @@ to_tsquery('english', 'laravel')
ORDER BY relevance DESC;

-- Headline — matched text highlight করো
SELECT 
    title,
    ts_headline('english', content, to_tsquery('english', 'laravel'),
        'StartSel=<b>, StopSel=</b>, MaxWords=50'
    ) as highlighted
FROM articles
WHERE to_tsvector('english', content) @@ to_tsquery('english', 'laravel');
```

---

## Chapter 7: Laravel দিয়ে PostgreSQL ব্যবহার

```php
// .env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=myapp
DB_USERNAME=postgres
DB_PASSWORD=secret

// Migration — PostgreSQL specific
Schema::create('products', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->jsonb('attributes')->default('{}');  // JSONB
    $table->decimal('price', 10, 2);
    $table->timestamps();
    
    // GIN index for JSONB
    $table->index('attributes', null, 'gin');
});

// Query Builder দিয়ে JSONB query
$users = DB::table('users')
    ->whereJsonContains('profile->skills', 'Laravel')
    ->get();

// Raw PostgreSQL query
$result = DB::select("
    SELECT name, ts_rank(
        to_tsvector('english', content),
        to_tsquery('english', ?)
    ) as rank
    FROM articles
    WHERE to_tsvector('english', content) @@ to_tsquery('english', ?)
    ORDER BY rank DESC
", ['laravel', 'laravel']);
```

---

## Practice Project | অনুশীলন প্রকল্প

### MySQL Project কে PostgreSQL-এ রূপান্তর করো

```
১. .env-এ DB_CONNECTION=pgsql পরিবর্তন করো
২. Migration-এ MySQL-specific syntax ঠিক করো
   - AUTO_INCREMENT → SERIAL বা $table->id()
   - TINYINT(1) → boolean()
   - JSON → jsonb()
৩. JSONB column যোগ করো (user preferences, product attributes)
৪. Full-text search যোগ করো articles-এ
৫. Window function দিয়ে analytics query লেখো
```

---

## Quick Revision | দ্রুত পুনরালোচনা

- **JSONB** = JSON + binary, indexable, MySQL-এর JSON-এর চেয়ে শক্তিশালী
- **GIN index** = JSONB এবং full-text search-এর জন্য
- **GiST index** = Geometric data-র জন্য
- **Window Function** = ROW_NUMBER, RANK, LAG, SUM OVER — analytics-এর জন্য
- **CTE** = `WITH` দিয়ে complex query readable করা
- **Recursive CTE** = tree structure traverse করতে
- **Full-text search** = tsvector + tsquery, built-in search

---

> **আগের বই:** [Book 2 — Laravel](02-laravel.md) | **পরবর্তী বই:** [Book 4 — MongoDB](04-mongodb.md)
