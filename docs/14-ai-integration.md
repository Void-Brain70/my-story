# AI Integration — সম্পূর্ণ গাইড
### Book 14 of 14 | Phase 4 | Week 31-32

---

## ভূমিকা | Introduction

**English:** AI integration is the hottest skill in 2026. You'll learn to call LLM APIs (Claude/OpenAI), build RAG pipelines, and store vector embeddings — giving your apps intelligence.

**বাংলা:** AI integration ২০২৬ সালের সবচেয়ে চাহিদাসম্পন্ন দক্ষতা। LLM API call করা, RAG pipeline তৈরি এবং vector embeddings store করা শিখবো।

---

## Chapter 1: LLM Basics — মূল ধারণা

### বাংলা ব্যাখ্যা

```
LLM (Large Language Model):
- Claude (Anthropic) — সবচেয়ে সহায়ক এবং নিরাপদ
- GPT-4 (OpenAI) — সবচেয়ে বেশি ব্যবহৃত
- Gemini (Google) — multimodal শক্তিশালী

Token:
- LLM text-কে "token" হিসেবে process করে
- ~4 characters = 1 token (roughly)
- 1000 tokens ≈ 750 words

Context Window:
- কতটুকু text একসাথে process করতে পারে
- Claude: 200K tokens (বিশাল!)
- GPT-4: 128K tokens

Temperature:
- 0 = deterministic (same input → same output)
- 0.7 = balanced (creativity + accuracy)
- 1.0 = more creative/random
```

---

## Chapter 2: Claude API — ক্লড এপিআই

### Laravel দিয়ে Claude API

```bash
composer require anthropic-php/client
```

```php
// config/services.php
'anthropic' => [
    'api_key' => env('ANTHROPIC_API_KEY'),
    'model' => env('ANTHROPIC_MODEL', 'claude-sonnet-4-6'),
],

// app/Services/ClaudeService.php
namespace App\Services;

use Anthropic\Anthropic;

class ClaudeService
{
    private $client;
    private string $model;

    public function __construct()
    {
        $this->client = Anthropic::client(config('services.anthropic.api_key'));
        $this->model = config('services.anthropic.model');
    }

    // Simple text generation
    public function chat(string $message, string $systemPrompt = ''): string
    {
        $response = $this->client->messages()->create([
            'model' => $this->model,
            'max_tokens' => 1024,
            'system' => $systemPrompt ?: 'You are a helpful assistant.',
            'messages' => [
                ['role' => 'user', 'content' => $message]
            ]
        ]);

        return $response->content[0]->text;
    }

    // Multi-turn conversation
    public function conversation(array $messages, string $systemPrompt = ''): string
    {
        $response = $this->client->messages()->create([
            'model' => $this->model,
            'max_tokens' => 2048,
            'system' => $systemPrompt,
            'messages' => $messages
        ]);

        return $response->content[0]->text;
    }

    // Streaming response
    public function stream(string $message): \Generator
    {
        $stream = $this->client->messages()->createStreamed([
            'model' => $this->model,
            'max_tokens' => 1024,
            'messages' => [
                ['role' => 'user', 'content' => $message]
            ]
        ]);

        foreach ($stream as $event) {
            if ($event->type === 'content_block_delta') {
                yield $event->delta->text;
            }
        }
    }
}
```

```php
// Controller
class ChatController extends Controller
{
    public function __construct(private ClaudeService $claude) {}

    public function chat(Request $request)
    {
        $response = $this->claude->chat($request->input('message'));
        return response()->json(['reply' => $response]);
    }

    // Streaming SSE
    public function stream(Request $request)
    {
        return response()->stream(function () use ($request) {
            foreach ($this->claude->stream($request->input('message')) as $chunk) {
                echo "data: " . json_encode(['text' => $chunk]) . "\n\n";
                ob_flush();
                flush();
            }
            echo "data: [DONE]\n\n";
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'Cache-Control' => 'no-cache',
        ]);
    }
}
```

---

## Chapter 3: OpenAI API — ওপেনএআই

### NestJS দিয়ে OpenAI

```bash
npm install openai
```

```typescript
// ai/ai.service.ts
import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    // Text generation
    async chat(message: string, systemPrompt?: string): Promise<string> {
        const response = await this.openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                ...(systemPrompt ? [{ role: 'system' as const, content: systemPrompt }] : []),
                { role: 'user', content: message }
            ],
            max_tokens: 1024,
            temperature: 0.7
        });

        return response.choices[0].message.content ?? '';
    }

    // Streaming
    async *chatStream(message: string): AsyncGenerator<string> {
        const stream = await this.openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: message }],
            stream: true
        });

        for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content;
            if (text) yield text;
        }
    }

    // Embeddings — text → vector
    async createEmbedding(text: string): Promise<number[]> {
        const response = await this.openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: text
        });

        return response.data[0].embedding;
    }

    // Image analysis (Vision)
    async analyzeImage(imageUrl: string, question: string): Promise<string> {
        const response = await this.openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{
                role: 'user',
                content: [
                    { type: 'image_url', image_url: { url: imageUrl } },
                    { type: 'text', text: question }
                ]
            }]
        });

        return response.choices[0].message.content ?? '';
    }
}
```

---

## Chapter 4: RAG Pipeline — রিট্রিভাল অগমেন্টেড জেনারেশন

### বাংলা ব্যাখ্যা
RAG মানে নিজের documents থেকে relevant information খুঁজে LLM-কে দেওয়া। LLM তারপর সেই তথ্য ব্যবহার করে উত্তর দেয়।

```
RAG Pipeline:
১. Documents load করো (PDF, docs, website)
২. Chunks-এ ভাগ করো (500-1000 tokens each)
৩. প্রতিটি chunk-এর embedding তৈরি করো (vector)
৪. Vector database-এ store করো
৫. User question আসলে:
   a. Question-এর embedding তৈরি করো
   b. Similar vectors খুঁজো (semantic search)
   c. Top-k chunks নাও
   d. LLM-কে context হিসেবে দাও
   e. LLM উত্তর দেয়
```

```
Without RAG:
User: "আমার order কোথায়?"
LLM: "আমি জানি না আপনার specific order সম্পর্কে"

With RAG:
User: "আমার order কোথায়?"
RAG: Order DB থেকে user-এর order details নিয়ে LLM-কে দেয়
LLM: "আপনার order #1234 বর্তমানে Dhaka-তে আছে, আগামীকাল deliver হবে"
```

---

## Chapter 5: Vector Embeddings with PostgreSQL (pgvector)

```sql
-- pgvector extension install করো
CREATE EXTENSION IF NOT EXISTS vector;

-- Documents table
CREATE TABLE documents (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    embedding vector(1536),   -- OpenAI embedding dimension
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Vector similarity index (HNSW — fast)
CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops);

-- Semantic search query
SELECT id, title, content,
       1 - (embedding <=> $1::vector) as similarity
FROM documents
WHERE 1 - (embedding <=> $1::vector) > 0.7  -- similarity threshold
ORDER BY embedding <=> $1::vector            -- closest first
LIMIT 5;
```

```typescript
// rag/rag.service.ts
@Injectable()
export class RagService {
    constructor(
        private aiService: AiService,
        private prisma: PrismaService
    ) {}

    // Document index করো
    async indexDocument(title: string, content: string): Promise<void> {
        // ১. Chunks তৈরি করো
        const chunks = this.chunkText(content, 500);

        // ২. প্রতিটি chunk-এর embedding তৈরি করো
        for (const chunk of chunks) {
            const embedding = await this.aiService.createEmbedding(chunk);

            // ৩. DB-তে save করো
            await this.prisma.$executeRaw`
                INSERT INTO documents (title, content, embedding)
                VALUES (${title}, ${chunk}, ${JSON.stringify(embedding)}::vector)
            `;
        }
    }

    // RAG-based question answering
    async answer(question: string): Promise<string> {
        // ১. Question-এর embedding তৈরি করো
        const questionEmbedding = await this.aiService.createEmbedding(question);

        // ২. Similar documents খুঁজো
        const similarDocs = await this.prisma.$queryRaw<Array<{title: string, content: string}>>`
            SELECT title, content,
                   1 - (embedding <=> ${JSON.stringify(questionEmbedding)}::vector) as similarity
            FROM documents
            ORDER BY embedding <=> ${JSON.stringify(questionEmbedding)}::vector
            LIMIT 5
        `;

        // ৩. Context তৈরি করো
        const context = similarDocs
            .map(doc => `${doc.title}:\n${doc.content}`)
            .join('\n\n---\n\n');

        // ৪. LLM-কে context সহ জিজ্ঞেস করো
        const prompt = `
Context information:
${context}

Based on the context above, answer this question:
${question}

If the answer is not in the context, say "I don't have information about this."
`;

        return this.aiService.chat(prompt);
    }

    private chunkText(text: string, maxTokens: number): string[] {
        const sentences = text.split(/[।.!?]/);
        const chunks: string[] = [];
        let currentChunk = '';

        for (const sentence of sentences) {
            if ((currentChunk + sentence).split(' ').length > maxTokens) {
                chunks.push(currentChunk.trim());
                currentChunk = sentence;
            } else {
                currentChunk += ' ' + sentence;
            }
        }

        if (currentChunk) chunks.push(currentChunk.trim());
        return chunks;
    }
}
```

---

## Chapter 6: AI Chatbot for Portfolio

```typescript
// portfolio chatbot — visitors-কে তোমার কাজ সম্পর্কে জানাও
const SYSTEM_PROMPT = `
You are Anik's portfolio assistant. Help visitors learn about Anik Chandra,
a Full-Stack Developer from Bangladesh.

About Anik:
- Skills: PHP, Laravel, NestJS, Vue 3, Nuxt 3, MySQL, PostgreSQL, Docker
- Location: Dhaka, Bangladesh
- Available for: Freelance projects, Full-time remote positions
- Contact: anik@example.com

Be friendly, concise, and helpful. If asked about something you don't know,
suggest contacting Anik directly.
`;

@Injectable()
export class PortfolioChatService {
    private conversations = new Map<string, Array<{ role: string; content: string }>>();

    async chat(sessionId: string, message: string): Promise<string> {
        const history = this.conversations.get(sessionId) ?? [];

        history.push({ role: 'user', content: message });

        const response = await this.aiService.conversation(history, SYSTEM_PROMPT);

        history.push({ role: 'assistant', content: response });
        this.conversations.set(sessionId, history.slice(-20)); // last 20 messages

        return response;
    }
}
```

```vue
<!-- Chatbot Component (Vue 3) -->
<script setup lang="ts">
const messages = ref<Array<{ role: 'user' | 'assistant'; text: string }>>([
    { role: 'assistant', text: 'আমি কিভাবে সাহায্য করতে পারি? Anik-এর কাজ বা skills সম্পর্কে জিজ্ঞেস করুন!' }
]);
const input = ref('');
const loading = ref(false);
const sessionId = crypto.randomUUID();

async function sendMessage() {
    if (!input.value.trim()) return;

    messages.value.push({ role: 'user', text: input.value });
    const userMessage = input.value;
    input.value = '';
    loading.value = true;

    try {
        const { reply } = await $fetch('/api/chat', {
            method: 'POST',
            body: { message: userMessage, sessionId }
        });
        messages.value.push({ role: 'assistant', text: reply });
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="chatbot">
        <div class="messages">
            <div v-for="msg in messages" :key="msg.text"
                 :class="['message', msg.role]">
                {{ msg.text }}
            </div>
            <div v-if="loading" class="typing">...</div>
        </div>
        <form @submit.prevent="sendMessage" class="input-area">
            <input v-model="input" placeholder="কিছু জিজ্ঞেস করুন..." />
            <button type="submit" :disabled="loading">Send</button>
        </form>
    </div>
</template>
```

---

## Chapter 7: AI Tools in Practice — ব্যবহারিক AI

### Use Cases for Full-Stack Developers

```
১. Code Review Assistant:
   "এই code-টা review করো এবং improvements বলো"

২. API Documentation Generator:
   Controller code → Auto-generate API docs

৩. SQL Query Generator:
   Natural language → SQL query

৪. Test Case Generator:
   Function code → Unit tests

৫. Translation Service:
   Bangla → English, English → Bangla

৬. Content Moderation:
   User-generated content filter করো

৭. Smart Search:
   Keyword search → Semantic search (RAG)
```

---

## Practice Project | অনুশীলন প্রকল্প

### Portfolio-তে AI Chatbot যোগ করো

```
ধাপ ১: Anthropic/OpenAI API key নিন (anthropic.com)

ধাপ ২: Backend API তৈরি করো (NestJS/Laravel)
   POST /api/chat
   Body: { message: string, sessionId: string }
   Response: { reply: string }

ধাপ ৩: Rate limiting যোগ করো
   - 20 messages per session
   - 100 requests per IP per day

ধাপ ৪: Portfolio-র Nuxt.js-এ chatbot component যোগ করো

ধাপ ৫: System prompt customize করো
   - তোমার skills, projects, experience
   - Contact information
   - Availability

ধাপ ৬: Deploy করো!
```

---

## Quick Revision | দ্রুত পুনরালোচনা

- **LLM** = Large Language Model, text generate করে
- **Token** = LLM-এর processing unit (~4 chars)
- **Temperature** = 0 (deterministic) থেকে 1 (creative)
- **Embedding** = text → numbers (vector) — similarity compare করতে
- **RAG** = নিজের data + LLM = intelligent assistant
- **pgvector** = PostgreSQL-এ vector store ও search
- **Streaming** = response chunks এ chunks এ দেখাও
- **System Prompt** = LLM-এর behavior define করো

---

## Congratulations! | অভিনন্দন!

তুমি সম্পূর্ণ Full-Stack Developer Roadmap 2026 শেষ করেছো!

```
✅ Book 1: MySQL Deep Dive
✅ Book 2: Laravel Deep
✅ Book 3: PostgreSQL
✅ Book 4: MongoDB
✅ Book 5: NestJS Deep
✅ Book 6: System Design
✅ Book 7: Redis
✅ Book 8: Docker & Compose
✅ Book 9: CI/CD GitHub Actions
✅ Book 10: AWS & VPS
✅ Book 11: TypeScript
✅ Book 12: Vue 3 & Nuxt 3
✅ Book 13: GraphQL & tRPC
✅ Book 14: AI Integration ← তুমি এখানে!
```

**পরবর্তী ধাপ:**
- Projects build করো
- GitHub-এ push করো
- Blog লেখো
- Job apply করো!

---

> **আগের বই:** [Book 13 — GraphQL](13-graphql.md) | **Study Plan-এ ফিরে যাও:** [STUDY_PLAN.md](../STUDY_PLAN.md)
