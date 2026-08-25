# AWS & VPS Deployment — সম্পূর্ণ গাইড
### Book 10 of 14 | Phase 3 | Week 23-24

---

## ভূমিকা | Introduction

**English:** Deploying your application to a live server is a critical skill. We'll cover both DigitalOcean (simple VPS) and AWS basics (EC2, S3).

**বাংলা:** Application live server-এ deploy করা একটি অপরিহার্য দক্ষতা। DigitalOcean (সহজ VPS) এবং AWS basics (EC2, S3) দুটোই শিখবো।

---

## Chapter 1: DigitalOcean VPS Setup — ডিজিটালওশান সেটআপ

### বাংলা ব্যাখ্যা
DigitalOcean-এ Droplet হলো virtual server। AWS-এর চেয়ে সহজ এবং সস্তা — শুরু করার জন্য আদর্শ।

### Step 1: Droplet তৈরি করো
```
১. digitalocean.com-এ account খোলো
২. Create → Droplets
৩. Choose an image: Ubuntu 24.04 LTS
৪. Plan: Basic → Regular → $6/month (1GB RAM, 1 vCPU, 25GB SSD)
৫. Datacenter: Singapore (Bangladesh থেকে কাছে)
৬. Authentication: SSH Key (নিচে দেখো)
৭. Create Droplet
```

### Step 2: SSH Key তৈরি করো
```bash
# তোমার computer-এ
ssh-keygen -t ed25519 -C "anik@example.com"
# Enter করো (default path ঠিক আছে)

# Public key দেখো — DigitalOcean-এ এটা দিতে হবে
cat ~/.ssh/id_ed25519.pub
```

### Step 3: Server-এ Connect করো
```bash
ssh root@YOUR_DROPLET_IP
```

---

## Chapter 2: Server Initial Setup — সার্ভার প্রাথমিক সেটআপ

```bash
# System update করো
apt update && apt upgrade -y

# প্রয়োজনীয় packages
apt install -y curl wget git ufw fail2ban

# নতুন user তৈরি করো (root ব্যবহার না করা ভালো)
adduser deploy
usermod -aG sudo deploy

# deploy user-এ SSH key copy করো
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys

# এখন deploy user দিয়ে connect করো
ssh deploy@YOUR_DROPLET_IP
```

### Firewall Setup — ফায়ারওয়াল
```bash
# UFW (Uncomplicated Firewall)
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh        # port 22
ufw allow http       # port 80
ufw allow https      # port 443
ufw enable

# Status দেখো
ufw status
```

---

## Chapter 3: Docker Installation — ডকার ইনস্টলেশন

```bash
# Docker install করো (Ubuntu 24.04)
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# deploy user-কে docker group-এ যোগ করো
usermod -aG docker deploy

# Re-login করো
exit
ssh deploy@YOUR_DROPLET_IP

# Test করো
docker --version
docker run hello-world

# Docker Compose install করো
apt install docker-compose-plugin -y
docker compose version
```

---

## Chapter 4: Deploy Laravel App — লারাভেল ডিপ্লয়

```bash
# Application directory তৈরি করো
mkdir -p /var/www/myapp
cd /var/www/myapp

# .env file তৈরি করো
nano .env
# DB_HOST=mysql
# REDIS_HOST=redis
# ...

# docker-compose.prod.yml তৈরি করো
nano docker-compose.prod.yml
```

```yaml
# docker-compose.prod.yml (production)
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    depends_on:
      - app
    restart: always

  app:
    image: anikchandra/myapp:latest  # Docker Hub থেকে
    volumes:
      - .env:/var/www/.env
      - storage:/var/www/storage
    depends_on:
      - mysql
      - redis
    restart: always

  mysql:
    image: mysql:8.0
    env_file: .env
    volumes:
      - mysql-data:/var/lib/mysql
    restart: always

  redis:
    image: redis:alpine
    volumes:
      - redis-data:/data
    restart: always

  certbot:
    image: certbot/certbot
    volumes:
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot

volumes:
  mysql-data:
  redis-data:
  storage:
```

```bash
# Deploy করো
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d

# Setup করো
docker compose -f docker-compose.prod.yml exec app php artisan migrate --force
docker compose -f docker-compose.prod.yml exec app php artisan config:cache
```

---

## Chapter 5: SSL with Let's Encrypt — SSL সার্টিফিকেট

```bash
# Certbot দিয়ে SSL
# প্রথমে domain DNS → তোমার server IP point করো

# Certbot চালাও
docker compose -f docker-compose.prod.yml run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email anik@example.com \
  --agree-tos \
  --no-eff-email \
  -d yourdomain.com \
  -d www.yourdomain.com
```

```nginx
# SSL সহ Nginx config
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/public;
    
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    location ~ \.php$ {
        fastcgi_pass app:9000;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

```bash
# Auto-renew SSL (cron job)
crontab -e
# এটি যোগ করো:
0 0 * * 1 docker compose -f /var/www/myapp/docker-compose.prod.yml run --rm certbot renew
```

---

## Chapter 6: AWS Basics — এডব্লিউএস বেসিকস

### EC2 — Virtual Server

```
EC2 = Amazon-এর Virtual Server (DigitalOcean Droplet-এর মতো)

Free Tier:
- t2.micro: 1 vCPU, 1GB RAM — 12 মাস free
- Perfect for learning

Setup:
১. aws.amazon.com → EC2 → Launch Instance
২. AMI: Ubuntu Server 24.04 LTS
৩. Instance type: t2.micro (free tier)
৪. Key pair: Create new → Download .pem file
৫. Security Group:
   - SSH (22) — My IP
   - HTTP (80) — Anywhere
   - HTTPS (443) — Anywhere
৬. Launch
```

```bash
# .pem file দিয়ে connect করো
chmod 400 my-key.pem
ssh -i my-key.pem ubuntu@YOUR_EC2_IP

# এরপর DigitalOcean-এর মতোই setup করো
```

### S3 — File Storage

```
S3 = Amazon Simple Storage Service
File, image, video, backup store করার জন্য

Use cases:
- User uploaded files/images
- Static assets (CSS, JS, Images)
- Database backups
- Application logs
```

```bash
# AWS CLI install করো
pip install awscli
aws configure
# AWS Access Key ID: [enter]
# AWS Secret Access Key: [enter]
# Default region: ap-southeast-1 (Singapore)
# Default output format: json
```

```php
// Laravel দিয়ে S3 ব্যবহার করো
// .env
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_DEFAULT_REGION=ap-southeast-1
AWS_BUCKET=your-bucket-name
FILESYSTEM_DISK=s3

// Controller
use Illuminate\Support\Facades\Storage;

// File upload করো
$path = Storage::disk('s3')->put(
    'avatars/' . auth()->id(),
    $request->file('avatar')
);

// File URL পাও
$url = Storage::disk('s3')->url($path);

// File delete করো
Storage::disk('s3')->delete($path);
```

```typescript
// NestJS দিয়ে S3
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class StorageService {
    private s3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
    });

    async uploadFile(file: Buffer, key: string): Promise<string> {
        await this.s3.send(new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET,
            Key: key,
            Body: file,
            ContentType: 'image/jpeg'
        }));

        return `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${key}`;
    }
}
```

### IAM — পরিচয় ও অ্যাক্সেস ম্যানেজমেন্ট

```
IAM = Identity and Access Management
কে কি করতে পারবে তা নিয়ন্ত্রণ করে

Best Practices:
✅ Root account সবসময় MFA চালু রাখো
✅ Root account-এর API key তৈরি করো না
✅ আলাদা IAM user তৈরি করো
✅ Least privilege principle — শুধু দরকারি permission দাও

S3-এর জন্য IAM Policy:
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```

---

## Chapter 7: Server Monitoring — সার্ভার মনিটরিং

```bash
# Resource usage দেখো
htop                  # CPU, RAM
df -h                 # Disk usage
docker stats          # Container resource usage

# Logs দেখো
docker compose logs -f app
journalctl -u docker -f  # Docker daemon logs

# Disk পরিষ্কার করো
docker system prune -af
docker volume prune
```

---

## Practice Project | অনুশীলন প্রকল্প

### তোমার Portfolio + API Live Deploy করো

```
ধাপ ১: DigitalOcean-এ Droplet তৈরি করো ($6/month)

ধাপ ২: Server setup করো
- Ubuntu update
- Docker install
- Firewall configure

ধাপ ৩: Domain connect করো
- Domain কিনো (Namecheap ~$10/year)
- DNS → Droplet IP

ধাপ ৪: Portfolio deploy করো
- Nuxt.js build
- Nginx serve করো

ধাপ ৫: API deploy করো
- Laravel/NestJS Docker image
- docker-compose.prod.yml

ধাপ ৬: SSL চালু করো
- Let's Encrypt (বিনামূল্যে!)
- Auto-renew setup

ধাপ ৭: Portfolio-তে link যোগ করো
```

---

## Quick Revision | দ্রুত পুনরালোচনা

- **DigitalOcean Droplet** = সহজ VPS, শুরু করার জন্য আদর্শ
- **UFW** = Ubuntu firewall, port control করে
- **Let's Encrypt** = বিনামূল্যে SSL certificate
- **AWS EC2** = Amazon-এর virtual server (Free tier আছে)
- **AWS S3** = file/image storage, CDN হিসেবেও ব্যবহার হয়
- **AWS IAM** = permission management, least privilege principle
- **Certbot** = SSL auto-renew করে

---

> **আগের বই:** [Book 9 — CI/CD](09-cicd.md) | **পরবর্তী বই:** [Book 11 — TypeScript](11-typescript.md)
