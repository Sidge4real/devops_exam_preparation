# 📝 Simple Blog App – DevOps Exam Preparation

[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/) [![Traefik](https://img.shields.io/badge/traefik-%231F93FF.svg?style=for-the-badge&logo=traefik&logoColor=white)](https://traefik.io/) [![Node.js](https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) [![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)](https://nginx.org/) [![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

This is a **practice project** created in preparation for a **DevOps exam**. It demonstrates the deployment of a full-stack blog application using **Docker Compose** and **Traefik**, running locally over **HTTP**.

## 🎯 Features

- 🔄 **Containerized Architecture** with Docker Compose
- 🌐 **Reverse Proxy** with Traefik
- 🔒 **Basic Auth** protection for admin dashboard
- 📊 **PostgreSQL** database with volume persistence
- 🖥️ **Modern Frontend** using EJS templating
- 🛡️ **Admin Dashboard** for content management

## 🚀 Tech Stack

| Component | Technology | Description |
|-----------|------------|-------------|
| Backend API | Node.js | RESTful API service |
| Database | PostgreSQL | Data persistence |
| Frontend | EJS | Server-side rendering |
| Admin Panel | Nginx | Static file serving |
| Proxy | Traefik | HTTP routing & load balancing |

## 📁 Project Structure

```
.
├── api/              # Node.js backend (REST API)
├── frontend/         # EJS-based frontend
├── admin/            # Nginx static admin dashboard
├── .env              # Shared environment variables
├── docker-compose.yml # Container orchestration
└── etc/
    └── traefik/     # Traefik configuration
        └── traefik.yml
```

## 🛠️ Prerequisites

- Docker Engine (20.10.x or newer)
- Docker Compose v2.x
- Git
- Text editor for configuration

## ⚙️ Configuration

### Base Application Configuration

**Environment Variables (.env)**
```env
# Database Configuration
POSTGRES_HOST=db
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
DB_PORT=5432

# API Configuration
API_HOST=api
API_PORT=3000
```

### Traefik Authentication

**Basic Auth Credentials**
```env
TRAEFIK_AUTH_USER=<user>:<password>
```

**Generate New Encrypted Credentials**
```bash
docker run --rm httpd:2.4 htpasswd -nbB <username> <password>
```

## 🚀 Quick Start

### 1. Repository Setup
```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd <project-folder>
```

### 2. Host Configuration

**Add Local Domain Entries**
```bash
# For Linux/macOS: Add to /etc/hosts
# For Windows: Add to C:\Windows\System32\drivers\etc\hosts
127.0.0.1 base-app.localhost traefik.localhost
```

### 3. Launch Application
```bash
# Build and start all services
docker compose up --build
```

## 🌐 Access Points

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://base-app.localhost | Main blog interface |
| Admin Dashboard | http://base-app.localhost/admin | Content management |
| API | http://base-app.localhost/api/ | Backend API |
| Traefik Dashboard | http://traefik.localhost | Proxy monitoring |

## 🐳 Container Images

| Service | Image | Version |
|---------|-------|----------|
| API | node | 23.6 |
| Frontend | node | 23.6 |
| Admin | nginx | 1.27 |
| Database | postgres | 15.10 |
| Proxy | traefik | 3.3 |

## 🔍 Troubleshooting

### Diagnostic Commands

**View Service Logs**
```bash
# View logs for all services
docker compose logs

# View logs for specific service
docker compose logs [service-name]

# Follow log output
docker compose logs -f [service-name]
```

**Container Shell Access**
```bash
# Access container shell
docker exec -it <container-name> sh

# Access PostgreSQL container
docker exec -it db psql -U user -d mydatabase
```

### Common Issues

**Port Conflicts**
```bash
# Check if ports are in use (Windows)
netstat -ano | findstr :80
netstat -ano | findstr :5432
```

**DNS Resolution**
```bash
# Test DNS resolution
ping base-app.localhost
ping traefik.localhost
```

**Database Connection**
```bash
# Test database connection from API container
docker exec -it api node -e "const { Client } = require('pg'); const client = new Client(); client.connect()"
```

