# MongoDB Deep Dive — সম্পূর্ণ গাইড
### Book 4 of 14 | Phase 1 | Week 7-8

---

## ভূমিকা | Introduction

**English:** MongoDB is a document-oriented NoSQL database. Instead of tables and rows, it uses collections and documents (JSON-like objects). Great for flexible, schema-less data.

**বাংলা:** MongoDB হলো document-based NoSQL database। Table/row-এর বদলে collection এবং document (JSON-এর মতো) ব্যবহার করে। Flexible data-র জন্য আদর্শ।

---

## Chapter 1: Core Concepts — মূল ধারণা

### SQL vs MongoDB তুলনা

| SQL | MongoDB | বাংলা |
|-----|---------|-------|
| Database | Database | একই |
| Table | Collection | ডেটা রাখার জায়গা |
| Row | Document | একটি record |
| Column | Field | একটি data field |
| JOIN | $lookup | দুই collection মেলানো |
| Primary Key | _id | unique identifier |
| Index | Index | দ্রুত search |

```javascript
// SQL-এ
INSERT INTO users (name, email) VALUES ('Anik', 'anik@example.com');

// MongoDB-তে
db.users.insertOne({
    name: "Anik Chandra",
    email: "anik@example.com",
    skills: ["PHP", "Laravel", "Vue"],  // Array সরাসরি!
    address: {                           // Nested object!
        city: "Dhaka",
        country: "Bangladesh"
    },
    createdAt: new Date()
});
```

---

## Chapter 2: Schema Design — স্কিমা ডিজাইন

### Embedding vs Referencing | কোনটা বেছে নেবে?

#### Embedding — ভেতরে রাখা
```javascript
// ভালো যখন: ছোট related data, সবসময় একসাথে read করা হয়
{
    _id: ObjectId("..."),
    name: "Anik Chandra",
    email: "anik@example.com",
    // Address embed করা — সবসময় user-এর সাথে read হয়
    address: {
        street: "123 Main St",
        city: "Dhaka",
        country: "Bangladesh"
    },
    // Skills embed করা — ছোট array
    skills: ["PHP", "Laravel", "Vue", "NestJS"]
}
```

#### Referencing — আলাদা রাখা
```javascript
// User document
{
    _id: ObjectId("user123"),
    name: "Anik Chandra",
    email: "anik@example.com"
}

// Post document — user-কে reference করে
{
    _id: ObjectId("post456"),
    title: "Laravel Tips",
    content: "...",
    userId: ObjectId("user123"),  // reference
    createdAt: new Date()
}

// ভালো যখন: বড় related data, independently access করা হয়
```

### কোনটা বেছে নেবে? | Decision Guide

```
Embedding ব্যবহার করো যদি:
✅ Data সবসময় একসাথে read হয়
✅ Related data ছোট (array 100 elements-এর কম)
✅ 1-to-few relationship

Referencing ব্যবহার করো যদি:
✅ Data বড় হতে পারে (comments, orders)
✅ Data independently access করা হয়
✅ 1-to-many বা many-to-many relationship
✅ Data অনেক জায়গায় share হয়
```

---

## Chapter 3: CRUD Operations — ক্রুড অপারেশন

```javascript
// ===== INSERT =====
// একটি document
db.products.insertOne({
    name: "iPhone 15",
    price: 99000,
    category: "Electronics",
    stock: 50,
    tags: ["apple", "smartphone", "5g"]
});

// একাধিক document
db.products.insertMany([
    { name: "Samsung S24", price: 85000, category: "Electronics" },
    { name: "OnePlus 12", price: 70000, category: "Electronics" }
]);

// ===== READ =====
// সব products
db.products.find();

// একটি product
db.products.findOne({ name: "iPhone 15" });

// Filter দিয়ে
db.products.find({ category: "Electronics", price: { $lt: 90000 } });

// নির্দিষ্ট fields (projection)
db.products.find(
    { category: "Electronics" },
    { name: 1, price: 1, _id: 0 }  // 1=দেখাও, 0=লুকাও
);

// Sort, limit, skip
db.products.find()
    .sort({ price: -1 })   // -1 = descending
    .limit(10)
    .skip(20);

// ===== UPDATE =====
// একটি update
db.products.updateOne(
    { name: "iPhone 15" },
    { $set: { price: 95000, stock: 45 } }
);

// সব update
db.products.updateMany(
    { category: "Electronics" },
    { $inc: { stock: -5 } }  // stock 5 কমাও
);

// Upsert — না থাকলে insert, থাকলে update
db.products.updateOne(
    { sku: "IP15-256" },
    { $set: { name: "iPhone 15", price: 99000 } },
    { upsert: true }
);

// ===== DELETE =====
db.products.deleteOne({ name: "OnePlus 12" });
db.products.deleteMany({ stock: 0 });
```

---

## Chapter 4: Query Operators — কোয়েরি অপারেটর

```javascript
// Comparison Operators
db.products.find({ price: { $gt: 50000 } });     // > 50000
db.products.find({ price: { $gte: 50000 } });    // >= 50000
db.products.find({ price: { $lt: 100000 } });    // < 100000
db.products.find({ price: { $lte: 100000 } });   // <= 100000
db.products.find({ price: { $ne: 99000 } });     // != 99000
db.products.find({ category: { $in: ["Electronics", "Mobile"] } }); // in list
db.products.find({ category: { $nin: ["Food"] } }); // not in list

// Logical Operators
db.products.find({
    $and: [
        { price: { $gt: 50000 } },
        { category: "Electronics" }
    ]
});

db.products.find({
    $or: [
        { price: { $lt: 30000 } },
        { category: "Budget" }
    ]
});

// Array Operators
db.products.find({ tags: "apple" });          // array-এ আছে
db.products.find({ tags: { $all: ["apple", "5g"] } }); // সব আছে
db.products.find({ tags: { $size: 3 } });    // array size = 3

// Element Operators
db.products.find({ discount: { $exists: true } });  // field আছে
db.products.find({ stock: { $type: "number" } });   // type check
```

---

## Chapter 5: Aggregation Pipeline — এগ্রিগেশন পাইপলাইন

### বাংলা ব্যাখ্যা
Aggregation pipeline হলো data process করার ধাপে ধাপে পদ্ধতি। SQL-এর GROUP BY, JOIN, HAVING-এর চেয়ে অনেক শক্তিশালী।

```javascript
// Pipeline stages: $match → $group → $sort → $project

// Example 1: Category অনুযায়ী total sales
db.orders.aggregate([
    // Stage 1: Filter করো
    { $match: { status: "completed" } },
    
    // Stage 2: Group করো
    { $group: {
        _id: "$category",
        totalSales: { $sum: "$amount" },
        avgAmount: { $avg: "$amount" },
        count: { $sum: 1 }
    }},
    
    // Stage 3: Sort করো
    { $sort: { totalSales: -1 } },
    
    // Stage 4: Limit করো
    { $limit: 5 }
]);

// Example 2: $lookup — JOIN-এর মতো
db.orders.aggregate([
    { $match: { status: "pending" } },
    
    // users collection-এর সাথে join
    { $lookup: {
        from: "users",           // join করার collection
        localField: "userId",    // orders-এর field
        foreignField: "_id",     // users-এর field
        as: "user"               // result-এর নাম
    }},
    
    // Array থেকে single object বানাও
    { $unwind: "$user" },
    
    // শুধু দরকারি fields
    { $project: {
        orderId: "$_id",
        "user.name": 1,
        "user.email": 1,
        amount: 1,
        _id: 0
    }}
]);

// Example 3: $unwind — Array প্রতিটি element আলাদা করো
db.products.aggregate([
    { $unwind: "$tags" },       // প্রতিটি tag আলাদা row হবে
    { $group: {
        _id: "$tags",
        count: { $sum: 1 }
    }},
    { $sort: { count: -1 } }
]);

// Example 4: Date-based analytics
db.orders.aggregate([
    { $group: {
        _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
        },
        totalRevenue: { $sum: "$amount" },
        orderCount: { $sum: 1 }
    }},
    { $sort: { "_id.year": -1, "_id.month": -1 } }
]);
```

---

## Chapter 6: Indexing in MongoDB — ইনডেক্স

```javascript
// Single field index
db.users.createIndex({ email: 1 });      // 1 = ascending
db.users.createIndex({ createdAt: -1 }); // -1 = descending

// Unique index
db.users.createIndex({ email: 1 }, { unique: true });

// Compound index
db.posts.createIndex({ userId: 1, createdAt: -1 });

// Text index — full-text search
db.articles.createIndex({ title: "text", content: "text" });

// Text search করো
db.articles.find({ $text: { $search: "laravel tutorial" } });

// Score সহ sort করো
db.articles.find(
    { $text: { $search: "laravel" } },
    { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } });

// TTL index — নির্দিষ্ট সময় পরে auto-delete
db.sessions.createIndex(
    { createdAt: 1 },
    { expireAfterSeconds: 3600 }  // 1 ঘন্টা পরে delete
);

// Existing indexes দেখো
db.users.getIndexes();

// Index delete করো
db.users.dropIndex("email_1");

// Query plan দেখো (EXPLAIN-এর মতো)
db.users.find({ email: "anik@example.com" }).explain("executionStats");
```

---

## Chapter 7: কখন MongoDB, কখন SQL?

### MongoDB ব্যবহার করো যখন
```
✅ Data structure বারবার পরিবর্তন হয়
✅ Hierarchical data (comments with replies)
✅ Product catalog (different attributes per product)
✅ Real-time analytics
✅ Content management systems
✅ User activity logs
```

### SQL ব্যবহার করো যখন
```
✅ Strong relationships between data (e-commerce orders)
✅ Complex transactions (banking, payments)
✅ Data integrity অত্যন্ত গুরুত্বপূর্ণ
✅ Complex JOIN queries দরকার
✅ Reporting এবং analytics (aggregations)
```

---

## Chapter 8: Laravel দিয়ে MongoDB

```bash
composer require mongodb/laravel-mongodb
```

```php
// config/database.php
'mongodb' => [
    'driver' => 'mongodb',
    'dsn' => env('MONGODB_URI', 'mongodb://localhost:27017'),
    'database' => env('MONGODB_DATABASE', 'myapp'),
],

// Model
use MongoDB\Laravel\Eloquent\Model;

class Product extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'products';
    
    protected $fillable = ['name', 'price', 'category', 'attributes'];
}

// Query
$products = Product::where('category', 'Electronics')
    ->where('price', '<', 90000)
    ->orderBy('price', 'desc')
    ->get();

// Aggregation
$sales = Order::raw(function($collection) {
    return $collection->aggregate([
        ['$match' => ['status' => 'completed']],
        ['$group' => [
            '_id' => '$category',
            'total' => ['$sum' => '$amount']
        ]],
        ['$sort' => ['total' => -1]]
    ]);
});
```

---

## Practice Project | অনুশীলন প্রকল্প

### Product Catalog তৈরি করো

```javascript
// Requirements:
// - বিভিন্ন category-র product (different attributes)
// - Electronics: brand, warranty, specs
// - Clothing: size, color, material
// - Food: expiry, weight, ingredients

// Collections:
// 1. products — main product data
// 2. categories — category tree (recursive)
// 3. reviews — product reviews (embedded or referenced?)

// Indexes:
// - category + price (compound)
// - name (text index for search)
// - sku (unique)

// Aggregations:
// - Top rated products by category
// - Price range distribution
// - Monthly sales report
```

---

## Quick Revision | দ্রুত পুনরালোচনা

- **Collection** = SQL-এর Table
- **Document** = SQL-এর Row, কিন্তু flexible (JSON)
- **Embedding** = related data একসাথে রাখো (ছোট, সবসময় একসাথে read)
- **Referencing** = আলাদা রাখো (বড়, independent)
- **Aggregation Pipeline** = complex data processing, stages দিয়ে
- **$lookup** = JOIN-এর মতো
- **$unwind** = array-কে আলাদা rows বানায়
- **Text Index** = full-text search
- **TTL Index** = auto-expire documents

---

> **আগের বই:** [Book 3 — PostgreSQL](03-postgresql.md) | **পরবর্তী বই:** [Book 5 — NestJS Deep](05-nestjs.md)
