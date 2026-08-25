# Full-Stack Developer Study Plan 2026
### Anik Chandra — Personal Roadmap

---

## Phase 1 — Foundation Strengthening (Month 1-2)

### Week 1-2: MySQL Deep Dive
- [ ] Indexes, foreign keys, transactions, ACID properties
- [ ] Complex JOINs, subqueries, views, stored procedures
- [ ] Query optimization with `EXPLAIN`
- [ ] **Practice:** Build a blog DB schema, optimize slow queries

### Week 3-4: Laravel Deep
- [ ] Service Container, Facades, Service Providers
- [ ] Repository Pattern, Dependency Injection
- [ ] Queues & Jobs (Redis driver), Events & Listeners
- [ ] Laravel Sanctum/Passport for API auth
- [ ] **Practice:** Build a REST API with queue-based email sending

### Week 5-6: PostgreSQL
- [ ] Advanced indexing (GIN, GiST, partial indexes)
- [ ] Full-text search, JSON/JSONB columns
- [ ] Window functions, CTEs (`WITH` queries)
- [ ] Migrations from MySQL mindset to PostgreSQL
- [ ] **Practice:** Rebuild your MySQL project in PostgreSQL

### Week 7-8: MongoDB
- [ ] Schema design (embedding vs referencing)
- [ ] Aggregation pipeline
- [ ] Indexing in MongoDB
- [ ] When to use MongoDB vs SQL
- [ ] **Practice:** Build a product catalog with nested categories

---

## Phase 2 — Backend Mastery (Month 3-4)

### Week 9-10: NestJS Deep
- [ ] Guards, Interceptors, Pipes, Filters (custom ones)
- [ ] CQRS pattern with `@nestjs/cqrs`
- [ ] Microservices with TCP/Redis transport
- [ ] NestJS + Prisma ORM (modern alternative to TypeORM)
- [ ] **Practice:** Build a user management microservice

### Week 11-12: System Design Basics
- [ ] CAP theorem, consistency vs availability
- [ ] Horizontal vs vertical scaling
- [ ] Load balancers (concept + Nginx basics)
- [ ] Caching strategies (Redis — cache-aside, write-through)
- [ ] **Practice:** Design a URL shortener system on paper

### Week 13-14: System Design Intermediate
- [ ] Message queues — RabbitMQ or Redis Streams
- [ ] Database sharding and replication concepts
- [ ] Rate limiting patterns
- [ ] API Gateway concept
- [ ] **Practice:** Design a notification system (email + push)

### Week 15-16: Redis Deep
- [ ] Data structures (String, Hash, List, Set, Sorted Set)
- [ ] Redis as cache, session store, queue
- [ ] TTL, pub/sub, Lua scripting basics
- [ ] Use with Laravel (cache driver) and NestJS
- [ ] **Practice:** Add Redis caching to your Laravel API

---

## Phase 3 — DevOps & Cloud (Month 5-6)

### Week 17-18: Docker
- [ ] Images, containers, volumes, networks
- [ ] Write `Dockerfile` for Laravel app
- [ ] Write `Dockerfile` for NestJS app
- [ ] Multi-stage builds
- [ ] **Practice:** Dockerize one of your existing projects

### Week 19-20: Docker Compose
- [ ] Multi-container setup (app + db + redis + nginx)
- [ ] Environment variables with `.env`
- [ ] Docker Compose for dev vs production
- [ ] **Practice:** Full stack app with Compose (Laravel + MySQL + Redis + Nginx)

### Week 21-22: CI/CD with GitHub Actions
- [ ] Understand YAML workflow files
- [ ] Run tests on push
- [ ] Build Docker image and push to Docker Hub
- [ ] Auto-deploy on merge to main
- [ ] **Practice:** Set up CI/CD for one of your GitHub projects

### Week 23-24: AWS / VPS Basics
- [ ] DigitalOcean droplet setup (easier to start)
- [ ] Deploy Docker app on VPS with Nginx reverse proxy
- [ ] SSL with Let's Encrypt (Certbot)
- [ ] AWS: EC2 (virtual server), S3 (file storage), IAM basics
- [ ] **Practice:** Deploy your portfolio + one API to a live VPS

---

## Phase 4 — Advanced & Modern Skills (Month 7-8)

### Week 25-26: TypeScript Everywhere
- [ ] Types, interfaces, generics, utility types
- [ ] TypeScript with NestJS (already built-in)
- [ ] TypeScript with Vue 3 / Nuxt 3
- [ ] **Practice:** Rewrite a JS project in TypeScript

### Week 27-28: Vue 3 + Nuxt 3 Deep
- [ ] Composition API — `ref`, `reactive`, `computed`, `watch`
- [ ] Composables (custom hooks)
- [ ] SSR vs SSG vs ISR — when to use each
- [ ] Core Web Vitals optimization
- [ ] **Practice:** Rebuild/optimize your portfolio with these patterns

### Week 29-30: GraphQL + tRPC
- [ ] GraphQL basics — queries, mutations, subscriptions
- [ ] Apollo Server with NestJS
- [ ] tRPC for type-safe APIs (great with Nuxt)
- [ ] **Practice:** Build a small app with GraphQL API

### Week 31-32: AI Integration
- [ ] Call Claude API / OpenAI API from Laravel & NestJS
- [ ] Build a simple RAG pipeline (docs + embeddings + LLM)
- [ ] Store embeddings in PostgreSQL (pgvector)
- [ ] **Practice:** Add an AI chatbot to your portfolio or a project

---

## Phase 5 — Soft Skills & Portfolio (Ongoing)

### Portfolio (Every Month)
- [ ] Add 1 new project every 6-8 weeks
- [ ] Every project must have: live demo + GitHub + README
- [ ] Projects should show real problems solved

### GitHub Activity
- [ ] Commit daily, even small things
- [ ] Contribute to 1 open source project (Laravel/NestJS ecosystem)

### Technical Writing
- [ ] Write 1 article per month on dev.to or Hashnode
- [ ] Topics: things you just learned, problems you solved
- [ ] Build personal brand through consistent writing

### English Communication
- [ ] Write all commit messages, READMEs, and code comments in English
- [ ] Practice explaining your code out loud (interview prep)
- [ ] Follow English tech YouTube channels and podcasts

---

## Progress Tracker

| Phase | Topic | Status |
|-------|-------|--------|
| 1 | MySQL Deep Dive | Not Started |
| 1 | Laravel Deep | Not Started |
| 1 | PostgreSQL | Not Started |
| 1 | MongoDB | Not Started |
| 2 | NestJS Deep | Not Started |
| 2 | System Design Basics | Not Started |
| 2 | System Design Intermediate | Not Started |
| 2 | Redis Deep | Not Started |
| 3 | Docker | Not Started |
| 3 | Docker Compose | Not Started |
| 3 | CI/CD GitHub Actions | Not Started |
| 3 | AWS / VPS | Not Started |
| 4 | TypeScript | Not Started |
| 4 | Vue 3 + Nuxt 3 Deep | Not Started |
| 4 | GraphQL + tRPC | Not Started |
| 4 | AI Integration | Not Started |
| 5 | Portfolio | Ongoing |
| 5 | GitHub Activity | Ongoing |
| 5 | Technical Writing | Ongoing |
| 5 | English Communication | Ongoing |

---

## Best Resources

| Topic | Resource |
|-------|----------|
| System Design | ByteByteGo (YouTube), system-design-primer (GitHub) |
| Laravel | Laravel Docs + Laracasts |
| NestJS | Official NestJS Docs + Academind YouTube |
| Docker | TechWorld with Nana (YouTube) |
| PostgreSQL | PostgreSQL official docs + pgexercises.com |
| GitHub Actions | Official docs + GitHub Skills |
| AWS | AWS Free Tier + FreeCodeCamp YouTube |
| MongoDB | MongoDB University (free) |
| Redis | Redis University (free) |
| TypeScript | TypeScript Docs + Matt Pocock YouTube |
| GraphQL | Apollo Docs + Academind YouTube |
| AI/LLM | Anthropic Docs + DeepLearning.ai |

---

## Monthly Goals

### Month 1 (August 2026)
- [ ] Complete MySQL Deep Dive
- [ ] Complete Laravel Deep

### Month 2 (September 2026)
- [ ] Complete PostgreSQL
- [ ] Complete MongoDB

### Month 3 (October 2026)
- [ ] Complete NestJS Deep
- [ ] Complete System Design Basics

### Month 4 (November 2026)
- [ ] Complete System Design Intermediate
- [ ] Complete Redis Deep

### Month 5 (December 2026)
- [ ] Complete Docker
- [ ] Complete Docker Compose

### Month 6 (January 2027)
- [ ] Complete CI/CD GitHub Actions
- [ ] Complete AWS / VPS

### Month 7 (February 2027)
- [ ] Complete TypeScript
- [ ] Complete Vue 3 + Nuxt 3 Deep

### Month 8 (March 2027)
- [ ] Complete GraphQL + tRPC
- [ ] Complete AI Integration

---

> **Tip:** Update the Progress Tracker table and check off boxes as you complete each topic. Consistency beats speed — even 1-2 hours daily will get you through this roadmap.
