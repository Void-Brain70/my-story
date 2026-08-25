# Docker & Docker Compose — সম্পূর্ণ গাইড
### Book 8 of 14 | Phase 3 | Week 17-20

---

## ভূমিকা | Introduction

**English:** Docker is a platform that packages applications into containers. A container includes everything the app needs to run — code, runtime, libraries. "It works on my machine" problem solved forever.

**বাংলা:** Docker application-কে container-এ package করে। Container-এ সব কিছু থাকে — code, runtime, library। "আমার machine-এ কাজ করে কিন্তু server-এ করে না" সমস্যার সমাধান।

---

## Chapter 1: Core Concepts — মূল ধারণা

### বাংলা ব্যাখ্যা

```
Virtual Machine vs Docker Container:

VM:
┌─────────────────┐
│   Application   │
│   Libraries     │
│   Guest OS      │  ← পুরো OS (GB সাইজ)
│─────────────────│
│   Hypervisor    │
│   Host OS       │
└─────────────────┘

Docker Container:
┌─────────────────┐
│   Application   │
│   Libraries     │  ← শুধু dependencies (MB সাইজ)
│─────────────────│
│  Docker Engine  │
│   Host OS       │
└─────────────────┘

Container:
✅ দ্রুত start (seconds, not minutes)
✅ কম resource usage
✅ Portable — যেকোনো জায়গায় চলে
✅ Isolated — একটি container অন্যকে affect করে না
```

### Key Terms | মূল পরিভাষা

| Term | বাংলা | মানে |
|------|-------|------|
| Image | ইমেজ | Template/Blueprint |
| Container | কন্টেইনার | Running instance of Image |
| Dockerfile | ডকারফাইল | Image তৈরির instructions |
| Registry | রেজিস্ট্রি | Image storage (Docker Hub) |
| Volume | ভলিউম | Persistent data storage |
| Network | নেটওয়ার্ক | Container communication |

---

## Chapter 2: Basic Docker Commands — বেসিক কমান্ড

```bash
# Image নামাও
docker pull nginx
docker pull php:8.3-fpm
docker pull node:20-alpine

# Image দেখো
docker images

# Container চালাও
docker run nginx                          # foreground
docker run -d nginx                       # background (detached)
docker run -d -p 8080:80 nginx           # port map করো
docker run -d --name my-nginx nginx      # নাম দাও

# Container দেখো
docker ps         # চলছে এমন
docker ps -a      # সব (stopped সহ)

# Container বন্ধ/শুরু করো
docker stop my-nginx
docker start my-nginx
docker restart my-nginx

# Container delete করো
docker rm my-nginx
docker rm -f my-nginx  # force stop + delete

# Container-এর ভেতরে ঢুকো
docker exec -it my-nginx bash
docker exec -it my-nginx sh   # bash না থাকলে

# Logs দেখো
docker logs my-nginx
docker logs -f my-nginx  # follow (real-time)

# Image delete করো
docker rmi nginx
docker image prune  # unused images সব delete
```

---

## Chapter 3: Dockerfile — ডকারফাইল

### Laravel App Dockerfile
```dockerfile
# base image
FROM php:8.3-fpm

# System dependencies ইনস্টল করো
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Composer ইনস্টল করো
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Working directory
WORKDIR /var/www

# Dependencies ইনস্টল করো (cache layer আলাদা রাখো)
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader

# Application code copy করো
COPY . .

# Autoloader generate করো
RUN composer dump-autoload --optimize

# Permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]
```

### NestJS App Dockerfile (Multi-stage)
```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Dependencies ইনস্টল করো
COPY package*.json ./
RUN npm ci

# Code copy এবং build করো
COPY . .
RUN npm run build

# Stage 2: Production image (ছোট)
FROM node:20-alpine AS production

WORKDIR /app

# শুধু production dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Build artifacts copy করো
COPY --from=builder /app/dist ./dist

# Non-root user ব্যবহার করো (security)
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001
USER nestjs

EXPOSE 3000
CMD ["node", "dist/main.js"]
```

### .dockerignore (গুরুত্বপূর্ণ!)
```
node_modules
.git
.env
dist
*.log
README.md
.DS_Store
```

---

## Chapter 4: Docker Compose — ডকার কম্পোজ

### বাংলা ব্যাখ্যা
Docker Compose দিয়ে একাধিক container একসাথে manage করা যায়। একটি YAML file-এ সব define করো।

### Full Stack App — Laravel + MySQL + Redis + Nginx
```yaml
# docker-compose.yml
version: '3.8'

services:
  # Nginx — web server
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./docker/nginx/nginx.conf:/etc/nginx/conf.d/default.conf
      - ./:/var/www
    depends_on:
      - app
    networks:
      - app-network

  # Laravel App
  app:
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - ./:/var/www
      - ./docker/php/php.ini:/usr/local/etc/php/php.ini
    environment:
      - DB_HOST=mysql
      - REDIS_HOST=redis
    depends_on:
      mysql:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - app-network

  # MySQL
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: ${DB_DATABASE}
      MYSQL_USER: ${DB_USERNAME}
      MYSQL_PASSWORD: ${DB_PASSWORD}
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
    volumes:
      - mysql-data:/var/lib/mysql
      - ./docker/mysql/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "3306:3306"
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      timeout: 20s
      retries: 10
    networks:
      - app-network

  # Redis
  redis:
    image: redis:alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis-data:/data
    ports:
      - "6379:6379"
    networks:
      - app-network

  # Queue Worker
  queue:
    build:
      context: .
      dockerfile: Dockerfile
    command: php artisan queue:work redis --sleep=3 --tries=3
    volumes:
      - ./:/var/www
    depends_on:
      - mysql
      - redis
    networks:
      - app-network

  # Scheduler
  scheduler:
    build:
      context: .
      dockerfile: Dockerfile
    command: sh -c "while true; do php artisan schedule:run; sleep 60; done"
    volumes:
      - ./:/var/www
    depends_on:
      - mysql
      - redis
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  mysql-data:
  redis-data:
```

### Nginx Config
```nginx
# docker/nginx/nginx.conf
server {
    listen 80;
    server_name localhost;
    root /var/www/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass app:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

---

## Chapter 5: Docker Compose Commands — কমান্ড

```bash
# সব services চালাও
docker-compose up -d

# নির্দিষ্ট service চালাও
docker-compose up -d mysql redis

# Rebuild করে চালাও
docker-compose up -d --build

# বন্ধ করো
docker-compose down

# বন্ধ করো + data delete করো
docker-compose down -v

# Logs দেখো
docker-compose logs -f
docker-compose logs -f app

# নির্দিষ্ট service-এ ঢুকো
docker-compose exec app bash
docker-compose exec mysql mysql -u root -p

# Scale করো
docker-compose up -d --scale app=3

# Services status
docker-compose ps
```

---

## Chapter 6: NestJS Docker Compose
```yaml
version: '3.8'

services:
  api:
    build:
      context: .
      target: production
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - app-network

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - app-network

  redis:
    image: redis:alpine
    volumes:
      - redis-data:/data
    networks:
      - app-network

networks:
  app-network:

volumes:
  postgres-data:
  redis-data:
```

---

## Chapter 7: Dev vs Production — ডেভ বনাম প্রোডাকশন

```yaml
# docker-compose.dev.yml — Development
services:
  app:
    build:
      target: development  # dev stage
    volumes:
      - ./:/app            # Hot reload-এর জন্য code mount
    command: npm run start:dev
    environment:
      - NODE_ENV=development

# docker-compose.prod.yml — Production
services:
  app:
    build:
      target: production   # optimized build
    restart: always        # crash হলে auto restart
    environment:
      - NODE_ENV=production
    deploy:
      replicas: 3          # 3 instances
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

```bash
# Dev
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# Production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

---

## Practice Project | অনুশীলন প্রকল্প

### তোমার Laravel Project Dockerize করো

```bash
# ধাপ ১: Dockerfile তৈরি করো
touch Dockerfile
touch .dockerignore
mkdir -p docker/nginx docker/mysql docker/php

# ধাপ ২: docker-compose.yml তৈরি করো

# ধাপ ৩: .env.docker তৈরি করো
DB_HOST=mysql
REDIS_HOST=redis
DB_DATABASE=myapp
DB_USERNAME=myapp
DB_PASSWORD=secret123

# ধাপ ৪: চালাও
docker-compose up -d --build

# ধাপ ৫: Setup করো
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan migrate
docker-compose exec app php artisan db:seed

# ধাপ ৬: Test করো
curl http://localhost/api/users
```

---

## Quick Revision | দ্রুত পুনরালোচনা

- **Image** = template, `docker pull` দিয়ে নামাও
- **Container** = running image, `docker run` দিয়ে চালাও
- **Dockerfile** = নিজের image তৈরির recipe
- **Multi-stage build** = ছোট production image তৈরি
- **Docker Compose** = একাধিক container একসাথে manage
- **Volumes** = container-এর বাইরে data persistent রাখো
- **Networks** = containers নিজেদের মধ্যে communicate করে
- **depends_on** = service order নিশ্চিত করে

---

> **আগের বই:** [Book 7 — Redis](07-redis.md) | **পরবর্তী বই:** [Book 9 — CI/CD](09-cicd.md)
