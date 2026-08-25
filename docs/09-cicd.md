# CI/CD with GitHub Actions — সম্পূর্ণ গাইড
### Book 9 of 14 | Phase 3 | Week 21-22

---

## ভূমিকা | Introduction

**English:** CI/CD automates testing and deployment. Every time you push code, it automatically runs tests, builds, and deploys to production — no manual steps needed.

**বাংলা:** CI/CD testing এবং deployment স্বয়ংক্রিয় করে। Code push করলেই automatically test চলে, build হয় এবং deploy হয়।

```
CI (Continuous Integration):
Code Push → Test → Build → Report

CD (Continuous Deployment):
CI ✓ → Deploy to Staging → Deploy to Production
```

---

## Chapter 1: GitHub Actions Basics — মূল ধারণা

### বাংলা ব্যাখ্যা

```
Workflow: পুরো automation process
Job: একটি workflow-এর কাজের ধাপ (parallel চলতে পারে)
Step: একটি Job-এর একটি কাজ
Action: Reusable step (marketplace থেকে নেওয়া যায়)
Runner: যেখানে Job চলে (GitHub-এর server বা নিজের server)
```

```yaml
# .github/workflows/main.yml
# Workflow file structure

name: CI/CD Pipeline          # Workflow-এর নাম

on:                           # কখন চলবে?
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:                         # কি কি কাজ করবে
  test:                       # Job নাম
    runs-on: ubuntu-latest    # কোন OS-এ চলবে
    
    steps:                    # ধাপে ধাপে কাজ
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Run tests
        run: npm test
```

---

## Chapter 2: Laravel CI/CD Pipeline

```yaml
# .github/workflows/laravel.yml
name: Laravel CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  # ===== Job 1: Tests =====
  test:
    runs-on: ubuntu-latest
    
    services:
      # MySQL service
      mysql:
        image: mysql:8.0
        env:
          MYSQL_DATABASE: test_db
          MYSQL_USER: test_user
          MYSQL_PASSWORD: secret
          MYSQL_ROOT_PASSWORD: root
        ports:
          - 3306:3306
        options: --health-cmd="mysqladmin ping" --health-interval=10s

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'
          extensions: mbstring, pdo_mysql, redis
          coverage: xdebug

      - name: Cache Composer dependencies
        uses: actions/cache@v3
        with:
          path: vendor
          key: composer-${{ hashFiles('composer.lock') }}

      - name: Install dependencies
        run: composer install --prefer-dist --no-progress

      - name: Copy .env
        run: cp .env.testing .env

      - name: Generate app key
        run: php artisan key:generate

      - name: Run migrations
        run: php artisan migrate --force
        env:
          DB_HOST: 127.0.0.1
          DB_DATABASE: test_db
          DB_USERNAME: test_user
          DB_PASSWORD: secret

      - name: Run tests
        run: php artisan test --coverage --min=80
        env:
          DB_HOST: 127.0.0.1
          DB_DATABASE: test_db
          DB_USERNAME: test_user
          DB_PASSWORD: secret

  # ===== Job 2: Code Quality =====
  code-quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'

      - run: composer install

      - name: Run PHPStan (static analysis)
        run: vendor/bin/phpstan analyse

      - name: Run PHP CS Fixer
        run: vendor/bin/php-cs-fixer fix --dry-run --diff

  # ===== Job 3: Build Docker Image =====
  build:
    needs: [test, code-quality]  # test এবং code-quality পাস হলে
    if: github.ref == 'refs/heads/main'  # শুধু main branch-এ
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            anikchandra/myapp:latest
            anikchandra/myapp:${{ github.sha }}

  # ===== Job 4: Deploy =====
  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
      - name: Deploy to server
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            cd /var/www/myapp
            docker-compose pull
            docker-compose up -d --no-deps app
            docker-compose exec -T app php artisan migrate --force
            docker-compose exec -T app php artisan config:cache
            docker-compose exec -T app php artisan route:cache
```

---

## Chapter 3: NestJS CI/CD Pipeline

```yaml
# .github/workflows/nestjs.yml
name: NestJS CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: test_db
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
        ports:
          - 5432:5432
        options: --health-cmd pg_isready --health-interval 10s

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run type checking
        run: npx tsc --noEmit

      - name: Run unit tests
        run: npm run test
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db

      - name: Run e2e tests
        run: npm run test:e2e
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  build-and-deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4

      - name: Build Docker image
        run: |
          docker build -t ${{ secrets.DOCKER_USERNAME }}/nestjs-api:${{ github.sha }} .
          docker tag ${{ secrets.DOCKER_USERNAME }}/nestjs-api:${{ github.sha }} \
                     ${{ secrets.DOCKER_USERNAME }}/nestjs-api:latest

      - name: Push to Docker Hub
        run: |
          echo ${{ secrets.DOCKER_TOKEN }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push ${{ secrets.DOCKER_USERNAME }}/nestjs-api:${{ github.sha }}
          docker push ${{ secrets.DOCKER_USERNAME }}/nestjs-api:latest

      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            docker pull ${{ secrets.DOCKER_USERNAME }}/nestjs-api:latest
            docker stop nestjs-api || true
            docker rm nestjs-api || true
            docker run -d \
              --name nestjs-api \
              -p 3000:3000 \
              --env-file /var/www/.env \
              ${{ secrets.DOCKER_USERNAME }}/nestjs-api:latest
```

---

## Chapter 4: Secrets Management — সিক্রেট ম্যানেজমেন্ট

### বাংলা ব্যাখ্যা
Password, API key, SSH key — এগুলো কখনো code-এ রাখবে না। GitHub Secrets ব্যবহার করো।

```
GitHub Secrets কিভাবে যোগ করবে:
Repository → Settings → Secrets and variables → Actions → New repository secret

দরকারি secrets:
- DOCKER_USERNAME: তোমার Docker Hub username
- DOCKER_TOKEN: Docker Hub access token (Hub → Account Settings → Security)
- SERVER_HOST: তোমার server IP
- SERVER_USER: SSH username (ubuntu/root)
- SERVER_SSH_KEY: Private SSH key (cat ~/.ssh/id_rsa)
```

```yaml
# Secrets ব্যবহার করো
steps:
  - name: Use secret
    env:
      API_KEY: ${{ secrets.API_KEY }}
      DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
    run: |
      echo "Using secrets safely"
      # $API_KEY এখন available কিন্তু log-এ দেখাবে না
```

---

## Chapter 5: Environment-based Deployment

```yaml
# Staging এবং Production আলাদা
jobs:
  deploy-staging:
    if: github.ref == 'refs/heads/develop'
    environment: staging
    steps:
      - uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.STAGING_SERVER }}
          script: ./deploy.sh staging

  deploy-production:
    if: github.ref == 'refs/heads/main'
    environment: production    # Manual approval লাগবে
    steps:
      - uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.PROD_SERVER }}
          script: ./deploy.sh production
```

```bash
# deploy.sh script
#!/bin/bash
ENVIRONMENT=$1

echo "Deploying to $ENVIRONMENT..."

cd /var/www/myapp

# নতুন image pull করো
docker-compose pull

# Zero-downtime deploy
docker-compose up -d --no-deps --build app

# Health check
sleep 10
curl -f http://localhost/health || exit 1

# Cleanup
docker system prune -f

echo "Deploy to $ENVIRONMENT complete!"
```

---

## Chapter 6: Useful Workflow Patterns

### Scheduled Jobs
```yaml
on:
  schedule:
    - cron: '0 2 * * *'  # প্রতিদিন রাত ২টায়

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Database backup
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          script: |
            mysqldump -u root -p${{ secrets.DB_PASSWORD }} myapp > backup_$(date +%Y%m%d).sql
            gzip backup_$(date +%Y%m%d).sql
```

### Cache Dependencies
```yaml
- name: Cache node_modules
  uses: actions/cache@v3
  with:
    path: node_modules
    key: node-${{ hashFiles('package-lock.json') }}
    restore-keys: node-

- name: Cache vendor
  uses: actions/cache@v3
  with:
    path: vendor
    key: composer-${{ hashFiles('composer.lock') }}
```

### Slack Notification
```yaml
- name: Notify Slack on success
  if: success()
  uses: rtCamp/action-slack-notify@v2
  env:
    SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
    SLACK_MESSAGE: 'Deploy successful! :rocket:'
    SLACK_COLOR: good

- name: Notify Slack on failure
  if: failure()
  uses: rtCamp/action-slack-notify@v2
  env:
    SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
    SLACK_MESSAGE: 'Deploy failed! :x:'
    SLACK_COLOR: danger
```

---

## Practice Project | অনুশীলন প্রকল্প

### তোমার Project-এ CI/CD যোগ করো

```
ধাপ ১: .github/workflows/ folder তৈরি করো

ধাপ ২: test.yml তৈরি করো
   - PHP/Node setup
   - Dependencies install
   - Test run
   - Coverage report

ধাপ ৩: deploy.yml তৈরি করো
   - Docker build
   - Docker Hub push
   - Server deploy

ধাপ ৪: GitHub Secrets যোগ করো
   - DOCKER_USERNAME
   - DOCKER_TOKEN
   - SERVER_HOST
   - SERVER_SSH_KEY

ধাপ ৫: Test করো
   - Code push করো
   - GitHub Actions tab-এ দেখো
   - সব green হলে success!
```

---

## Quick Revision | দ্রুত পুনরালোচনা

- **Workflow** = automation process (YAML file)
- **Job** = workflow-এর একটি কাজের section
- **Step** = job-এর একটি ধাপ
- **Action** = reusable step (`uses:` দিয়ে)
- **Runner** = job যেখানে চলে (ubuntu-latest)
- **Secrets** = sensitive data safely store করো
- **needs:** = job dependency (এই job শেষে ওই job চলবে)
- **if:** = condition (branch check, success/failure)

---

> **আগের বই:** [Book 8 — Docker](08-docker.md) | **পরবর্তী বই:** [Book 10 — AWS & VPS](10-aws-vps.md)
