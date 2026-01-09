# 🐳 Docker Configuration

This folder contains all Docker-related files for the micro-frontend monorepo.

## 📁 Files

| File | Description |
|------|-------------|
| `docker-compose.yml` | Orchestrates all BFF containers |
| `Dockerfile.shell` | Multi-stage build for Shell app |
| `Dockerfile.app1` | Multi-stage build for App1 (Dashboard) |
| `Dockerfile.app2` | Multi-stage build for App2 (Settings) |
| `.dockerignore` | Files to exclude from build context |

## 🏗️ Build Process

Each Dockerfile performs a **complete multi-stage build**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DOCKER BUILD STAGES                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Stage 1: frontend-builder                                                  │
│   ─────────────────────────                                                  │
│   • Installs npm dependencies                                                │
│   • Builds React + Vite frontend                                             │
│   • Output: /app/dist/apps/{app-name}                                        │
│                                                                              │
│   Stage 2: backend-builder                                                   │
│   ────────────────────────                                                   │
│   • Installs npm dependencies                                                │
│   • Builds TypeScript Express server                                         │
│   • Output: /app/dist (compiled JS)                                          │
│                                                                              │
│   Stage 3: production                                                        │
│   ───────────────────                                                        │
│   • Installs production dependencies only                                    │
│   • Copies built server from Stage 2                                         │
│   • Copies built frontend from Stage 1 → /app/public                         │
│   • Sets up health checks and security                                       │
│   • Final minimal image                                                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### From project root:

```bash
# Build all Docker images
npm run docker:build

# Start all containers
npm run docker:up

# View logs
npm run docker:logs

# Stop containers
npm run docker:down
```

### From docker folder:

```bash
cd docker

# Build all images
docker-compose build

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop and remove containers
docker-compose down
```

## 🌐 Access Points

| Service | URL | Description |
|---------|-----|-------------|
| Shell | http://localhost:8084 | Main application |
| App1 | http://localhost:8085 | Dashboard (direct access) |
| App2 | http://localhost:8086 | Settings (direct access) |

## 🔧 Build Individual Images

```bash
# Build only shell
docker-compose build shell

# Build only app1
docker-compose build app1

# Build only app2
docker-compose build app2
```

## 📊 Useful Commands

```bash
# Check running containers
docker ps

# Check container health
docker inspect --format='{{.State.Health.Status}}' shell-bff
docker inspect --format='{{.State.Health.Status}}' app1-bff
docker inspect --format='{{.State.Health.Status}}' app2-bff

# View container logs
docker logs shell-bff
docker logs app1-bff
docker logs app2-bff

# Enter container shell
docker exec -it shell-bff /bin/sh

# Remove all containers and images
docker-compose down --rmi all

# Prune unused Docker resources
docker system prune -a
```

## ⚙️ Environment Variables

Each container accepts these environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 8084/8085/8086 | Server port |
| `NODE_ENV` | production | Environment mode |
| `SERVE_STATIC` | true | Serve frontend files |
| `APP1_REMOTE_URL` | (shell only) | Module Fed URL for App1 |
| `APP2_REMOTE_URL` | (shell only) | Module Fed URL for App2 |
| `BACKEND_API_URL` | - | Main backend API URL |

## 🔒 Security Features

- Non-root user inside containers
- Health checks enabled
- Minimal Alpine-based images
- Production-only dependencies
- No source code in final image

## 🐛 Troubleshooting

### Build fails with "npm ci" error
```bash
# Clear Docker cache and rebuild
docker-compose build --no-cache
```

### Container exits immediately
```bash
# Check logs for errors
docker logs shell-bff

# Check if port is already in use
lsof -i :8084
```

### Frontend not loading
```bash
# Verify static files exist in container
docker exec -it shell-bff ls -la /app/public
```

### Health check failing
```bash
# Check if server is running
docker exec -it shell-bff wget -qO- http://localhost:8084/health
```

