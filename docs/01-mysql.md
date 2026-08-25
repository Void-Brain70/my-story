# MySQL Deep Dive — সম্পূর্ণ গাইড
### Book 1 of 14 | Phase 1 | Week 1-2

---

## ভূমিকা | Introduction

**English:** MySQL is a relational database management system. It stores data in tables with rows and columns. Every serious backend developer must master MySQL deeply.

**বাংলা:** MySQL হলো একটি relational database। এটি data কে table-এ rows এবং columns আকারে সংরক্ষণ করে। প্রতিটি backend developer-কে MySQL ভালোভাবে জানতে হবে।

---

## Chapter 1: Indexes — ইনডেক্স

### English Explanation
An index is like a book's table of contents. Without an index, MySQL scans every row to find data (full table scan). With an index, it goes directly to the data — much faster.

### বাংলা ব্যাখ্যা
Index হলো বইয়ের সূচিপত্রের মতো। Index ছাড়া MySQL প্রতিটি row চেক করে (full table scan)। Index থাকলে সরাসরি data-তে যায় — অনেক দ্রুত।

### Types of Indexes | Index-এর প্রকার

| Type | ব্যবহার |
|------|---------|
| PRIMARY KEY | Unique identifier, auto index |
| UNIQUE | Duplicate নেই, index আছে |
| INDEX (Regular) | দ্রুত search-এর জন্য |
| FULLTEXT | Text search-এর জন্য |
| COMPOSITE | একাধিক column-এ index |

```sql
-- Single column index
CREATE INDEX idx_email ON users(email);

-- Composite index (name + age দিয়ে search করলে কাজ করবে)
CREATE INDEX idx_name_age ON users(name, age);

-- Unique index
CREATE UNIQUE INDEX idx_username ON users(username);

-- Full text index
CREATE FULLTEXT INDEX idx_content ON posts(title, content);
```

### কখন Index ব্যবহার করবে? | When to use Index?

**করবে (Do):**
- WHERE clause-এ যেসব column বেশি ব্যবহার হয়
- JOIN-এ যেসব column ব্যবহার হয়
- ORDER BY, GROUP BY column-এ

**করবে না (Don't):**
- ছোট table-এ (কম rows)
- যেসব column কমই search হয়
- খুব বেশি INSERT/UPDATE হয় এমন table-এ (slow হয়)

---

## Chapter 2: Foreign Keys — ফরেন কী

### English Explanation
A foreign key links two tables. It ensures data integrity — you cannot add a record that references a non-existent record in another table.

### বাংলা ব্যাখ্যা
Foreign key দুটি table-কে link করে। এটি data integrity নিশ্চিত করে — অন্য table-এ যে record নেই তা reference করা যাবে না।

```sql
-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Posts table (users table-এর সাথে সম্পর্ক)
CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraint
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE   -- user delete হলে posts-ও delete হবে
        ON UPDATE CASCADE   -- user id change হলে posts-ও update হবে
);
```

### ON DELETE Options | ON DELETE অপশন

| Option | মানে |
|--------|------|
| CASCADE | Parent delete হলে child-ও delete হবে |
| SET NULL | Parent delete হলে child-এর column NULL হবে |
| RESTRICT | Parent delete করতে দেবে না যদি child থাকে |
| NO ACTION | RESTRICT-এর মতোই |

---

## Chapter 3: Transactions — ট্রানজেকশন

### English Explanation
A transaction is a group of SQL statements that either ALL succeed or ALL fail. This is critical for financial operations.

### বাংলা ব্যাখ্যা
Transaction হলো SQL statements-এর একটি group যেটি হয় সব সফল হবে, না হয় সব fail হবে। Bank transfer-এর মতো কাজে এটি অত্যন্ত গুরুত্বপূর্ণ।

```sql
-- Bank transfer example
START TRANSACTION;

-- Anik-এর account থেকে 1000 টাকা কাটো
UPDATE accounts SET balance = balance - 1000 WHERE user_id = 1;

-- Rahim-এর account-এ 1000 টাকা যোগ করো
UPDATE accounts SET balance = balance + 1000 WHERE user_id = 2;

-- সব ঠিকঠাক হলে save করো
COMMIT;

-- কোনো error হলে সব undo করো
-- ROLLBACK;
```

### ACID Properties | ACID বৈশিষ্ট্য

| Property | বাংলা | মানে |
|----------|-------|------|
| **A**tomicity | পরমাণুতা | সব হবে অথবা কিছুই না |
| **C**onsistency | সামঞ্জস্য | Data সবসময় valid থাকবে |
| **I**solation | বিচ্ছিন্নতা | এক transaction অন্যকে affect করবে না |
| **D**urability | স্থায়িত্ব | COMMIT হলে data চিরতরে save থাকবে |

---

## Chapter 4: Complex JOINs — জটিল জয়েন

### English Explanation
JOINs combine rows from two or more tables based on a related column.

### বাংলা ব্যাখ্যা
JOIN দিয়ে দুই বা তার বেশি table-এর data একসাথে দেখা যায়।

```sql
-- Sample tables
-- users: id, name, email
-- posts: id, title, user_id
-- comments: id, content, post_id, user_id
-- categories: id, name
-- post_categories: post_id, category_id

-- INNER JOIN — শুধু match করা rows
SELECT u.name, p.title
FROM users u
INNER JOIN posts p ON u.id = p.user_id;

-- LEFT JOIN — সব users, post না থাকলেও
SELECT u.name, p.title
FROM users u
LEFT JOIN posts p ON u.id = p.user_id;

-- Multiple JOINs — তিনটি table একসাথে
SELECT u.name, p.title, c.content
FROM users u
INNER JOIN posts p ON u.id = p.user_id
LEFT JOIN comments c ON p.id = c.post_id
ORDER BY p.created_at DESC;

-- Complex: প্রতিটি user-এর post count
SELECT u.name, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.name
HAVING COUNT(p.id) > 0
ORDER BY post_count DESC;
```

---

## Chapter 5: Subqueries — সাবকোয়েরি

### বাংলা ব্যাখ্যা
Subquery হলো একটি query-এর ভেতরে আরেকটি query।

```sql
-- সবচেয়ে বেশি post করা user খুঁজো
SELECT name FROM users
WHERE id = (
    SELECT user_id FROM posts
    GROUP BY user_id
    ORDER BY COUNT(*) DESC
    LIMIT 1
);

-- যেসব user কখনো post করেনি
SELECT name FROM users
WHERE id NOT IN (
    SELECT DISTINCT user_id FROM posts
);

-- প্রতিটি post-এর comment count সহ
SELECT p.title,
    (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) as comment_count
FROM posts p;
```

---

## Chapter 6: Views — ভিউ

### বাংলা ব্যাখ্যা
View হলো একটি virtual table। Complex query-কে সহজ করতে view ব্যবহার করা হয়।

```sql
-- View তৈরি করো
CREATE VIEW user_post_summary AS
SELECT 
    u.id,
    u.name,
    u.email,
    COUNT(p.id) as total_posts,
    MAX(p.created_at) as last_post_date
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.name, u.email;

-- View ব্যবহার করো (সহজ!)
SELECT * FROM user_post_summary WHERE total_posts > 5;

-- View delete করো
DROP VIEW user_post_summary;
```

---

## Chapter 7: Stored Procedures — স্টোরড প্রসিডিউর

### বাংলা ব্যাখ্যা
Stored procedure হলো database-এ সংরক্ষিত SQL code। বারবার একই কাজ করতে হলে procedure তৈরি করো।

```sql
-- Procedure তৈরি
DELIMITER //
CREATE PROCEDURE GetUserPosts(IN userId INT)
BEGIN
    SELECT p.title, p.created_at, COUNT(c.id) as comments
    FROM posts p
    LEFT JOIN comments c ON p.id = c.post_id
    WHERE p.user_id = userId
    GROUP BY p.id
    ORDER BY p.created_at DESC;
END //
DELIMITER ;

-- Procedure call করো
CALL GetUserPosts(1);

-- Procedure delete করো
DROP PROCEDURE GetUserPosts;
```

---

## Chapter 8: Query Optimization with EXPLAIN

### বাংলা ব্যাখ্যা
EXPLAIN দিয়ে MySQL কিভাবে query চালাচ্ছে তা দেখা যায়। Slow query ঠিক করতে এটি ব্যবহার করো।

```sql
-- Query-এর আগে EXPLAIN লেখো
EXPLAIN SELECT u.name, p.title
FROM users u
INNER JOIN posts p ON u.id = p.user_id
WHERE u.email = 'anik@example.com';
```

### EXPLAIN Output বোঝো

| Column | মানে |
|--------|------|
| type | `ALL` = খারাপ (full scan), `ref` = ভালো, `const` = সেরা |
| rows | কতটি row scan হচ্ছে |
| key | কোন index ব্যবহার হচ্ছে |
| Extra | `Using filesort` বা `Using temporary` = সমস্যা আছে |

```sql
-- Index যোগ করার পর পার্থক্য দেখো
CREATE INDEX idx_email ON users(email);
EXPLAIN SELECT * FROM users WHERE email = 'anik@example.com';
-- type: ref, rows: 1 -- অনেক দ্রুত!
```

---

## Practice Project | অনুশীলন প্রকল্প

### Blog Database Schema তৈরি করো

```sql
-- সম্পূর্ণ Blog Database
CREATE DATABASE blog_db;
USE blog_db;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    user_id INT NOT NULL,
    status ENUM('draft', 'published') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_user_id (user_id)
);

CREATE TABLE post_categories (
    post_id INT,
    category_id INT,
    PRIMARY KEY (post_id, category_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## Quick Revision | দ্রুত পুনরালোচনা

- **Index** = দ্রুত search, WHERE/JOIN column-এ দাও
- **Foreign Key** = table-এর মধ্যে সম্পর্ক, data integrity
- **Transaction** = সব হবে অথবা কিছুই না (ACID)
- **JOIN** = একাধিক table-এর data একসাথে
- **Subquery** = query-এর ভেতরে query
- **View** = complex query-কে সহজ করে
- **Stored Procedure** = database-এ save করা code
- **EXPLAIN** = query performance দেখো

---

> **পরবর্তী বই:** [Book 2 — Laravel Deep Dive](02-laravel.md)
