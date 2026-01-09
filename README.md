# 🚀 MicroFrontend Monorepo

A production-ready **NX Monorepo** with **Vite Module Federation** demonstrating micro-frontend architecture with shared Redux state and BFF (Backend-for-Frontend) servers.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Running Locally](#-running-locally)
- [Docker Deployment](#-docker-deployment)
- [API Reference](#-api-reference)
- [Available Scripts](#-available-scripts)
- [Development Guide](#-development-guide)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 Overview

This project demonstrates a **complete micro-frontend architecture** where multiple independent React applications work together as a unified system. Key highlights:

| Feature                   | Description                                       |
| ------------------------- | ------------------------------------------------- |
| 🏗️ **Module Federation**  | Share components and code at runtime between apps |
| 📦 **Shared Redux Store** | Single source of truth across all micro-frontends |
| 🖥️ **BFF Pattern**        | Each app has its own backend server               |
| 🐳 **Docker Ready**       | Production-ready containerization                 |
| ⚡ **Vite + HMR**         | Lightning-fast development experience             |
| 🎨 **Shared UI Library**  | Consistent design across apps                     |

---

## 🛠️ Tech Stack

### Frontend

| Technology        | Version | Purpose                 |
| ----------------- | ------- | ----------------------- |
| React             | 18.2.0  | UI Library              |
| TypeScript        | 5.3.3   | Type Safety             |
| Vite              | 5.0.10  | Build Tool & Dev Server |
| Module Federation | 1.3.5   | Micro-frontend Runtime  |
| Redux Toolkit     | 2.0.1   | State Management        |
| React Router      | 6.20.0  | Client-side Routing     |
| Tailwind CSS      | 3.4.0   | Styling                 |

### Backend (BFF Servers)

| Technology | Version | Purpose               |
| ---------- | ------- | --------------------- |
| Express    | 4.18.2  | Web Framework         |
| TypeScript | 5.3.3   | Type Safety           |
| CORS       | 2.8.5   | Cross-Origin Handling |
| Dotenv     | 16.3.1  | Environment Variables |
| TSX        | 4.7.0   | TypeScript Execution  |

### DevOps & Tools

| Technology     | Purpose                       |
| -------------- | ----------------------------- | ------------------- |
| NX             | 17.2.0                        | Monorepo Management |
| Docker         | Containerization              |
| Docker Compose | Multi-container Orchestration |
| ESLint         | Code Linting                  |
| Concurrently   | Parallel Script Execution     |

---

## 🏗️ Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BROWSER                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         SHELL (Host App)                             │    │
│  │                         localhost:5173                               │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │                    Shared Header (@shared/ui)                │    │    │
│  │  │            [Logo] [Breadcrumbs] [Theme Toggle] [User]        │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │  ┌──────────────┬──────────────────────────────────────────────┐    │    │
│  │  │              │                                               │    │    │
│  │  │  Left Nav    │  ┌─────────────────────────────────────────┐ │    │    │
│  │  │  (@shared/ui)│  │                                         │ │    │    │
│  │  │              │  │    REMOTE MICRO-FRONTENDS               │ │    │    │
│  │  │  • Home      │  │    (Loaded via Module Federation)       │ │    │    │
│  │  │  • Dashboard │  │                                         │ │    │    │
│  │  │  • Settings  │  │  ┌─────────────┐  ┌─────────────────┐   │ │    │    │
│  │  │              │  │  │   App1      │  │     App2        │   │ │    │    │
│  │  │              │  │  │  Dashboard  │  │    Settings     │   │ │    │    │
│  │  │              │  │  │  :5174      │  │     :5175       │   │ │    │    │
│  │  │              │  │  └─────────────┘  └─────────────────┘   │ │    │    │
│  │  │              │  │                                         │ │    │    │
│  │  │              │  └─────────────────────────────────────────┘ │    │    │
│  │  └──────────────┴──────────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    SHARED REDUX STORE (@shared/store)                │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────────┐  │    │
│  │  │  userSlice  │  │ themeSlice  │  │     navigationSlice         │  │    │
│  │  │  • id       │  │ • mode      │  │     • currentApp            │  │    │
│  │  │  • name     │  │   (light/   │  │     • breadcrumbs           │  │    │
│  │  │  • email    │  │    dark)    │  │     • sidebarCollapsed      │  │    │
│  │  │  • role     │  │             │  │                             │  │    │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Development Mode Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DEVELOPMENT MODE                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   FRONTEND (Vite Dev Servers with HMR)        BACKEND (BFF Servers)          │
│   ─────────────────────────────────           ──────────────────────         │
│                                                                              │
│   ┌─────────────────────┐                     ┌─────────────────────┐        │
│   │   Shell Frontend    │ ───── API ────────► │   Shell BFF         │        │
│   │   localhost:5173    │                     │   localhost:8084    │        │
│   │   (Host App)        │                     │   /api/auth/*       │        │
│   └─────────────────────┘                     │   /api/config       │        │
│            │                                  └─────────────────────┘        │
│            │ Module Federation                                               │
│            │ (remoteEntry.js)                                                │
│            ▼                                                                 │
│   ┌─────────────────────┐                     ┌─────────────────────┐        │
│   │   App1 Frontend     │ ───── API ────────► │   App1 BFF          │        │
│   │   localhost:5174    │                     │   localhost:8085    │        │
│   │   (Dashboard)       │                     │   /api/dashboard/*  │        │
│   └─────────────────────┘                     │   /api/user/*       │        │
│            │                                  └─────────────────────┘        │
│            │ Module Federation                                               │
│            │ (remoteEntry.js)                                                │
│            ▼                                                                 │
│   ┌─────────────────────┐                     ┌─────────────────────┐        │
│   │   App2 Frontend     │ ───── API ────────► │   App2 BFF          │        │
│   │   localhost:5175    │                     │   localhost:8086    │        │
│   │   (Settings)        │                     │   /api/settings/*   │        │
│   └─────────────────────┘                     └─────────────────────┘        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Production/Docker Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PRODUCTION MODE (Docker)                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                          Docker Network                                      │
│   ─────────────────────────────────────────────────────────────────────     │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                        Shell Container (:8084)                       │   │
│   │  ┌───────────────────────────────────────────────────────────────┐  │   │
│   │  │                     Express BFF Server                         │  │   │
│   │  │  • Serves static frontend files from /public                   │  │   │
│   │  │  • API routes: /api/auth/*, /api/config                        │  │   │
│   │  │  • SPA fallback for React Router                               │  │   │
│   │  │  • Module Federation: Loads remotes from App1 & App2           │  │   │
│   │  └───────────────────────────────────────────────────────────────┘  │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              │ HTTP (Module Federation)                      │
│                              ▼                                               │
│   ┌────────────────────────────────┐  ┌────────────────────────────────┐    │
│   │   App1 Container (:8085)       │  │   App2 Container (:8086)       │    │
│   │  ┌───────────────────────┐     │  │  ┌───────────────────────┐     │    │
│   │  │   Express BFF Server  │     │  │  │   Express BFF Server  │     │    │
│   │  │   • Static files      │     │  │  │   • Static files      │     │    │
│   │  │   • /api/dashboard/*  │     │  │  │   • /api/settings/*   │     │    │
│   │  │   • /api/user/*       │     │  │  │   • remoteEntry.js    │     │    │
│   │  │   • remoteEntry.js    │     │  │  └───────────────────────┘     │    │
│   │  └───────────────────────┘     │  │                                │    │
│   └────────────────────────────────┘  └────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
micro-fronend/
│
├── 📁 apps/                           # Applications
│   │
│   ├── 📁 shell/                      # 🏠 Host Application
│   │   ├── 📁 src/                    # React Frontend Source
│   │   │   ├── main.tsx               # Entry point
│   │   │   ├── App.tsx                # Root component with routes
│   │   │   └── components/            # Shell-specific components
│   │   │       ├── LoadingSpinner.tsx
│   │   │       ├── RemoteAppErrorBoundary.tsx
│   │   │       └── WelcomePage.tsx
│   │   ├── vite.config.ts             # Vite + Module Federation config
│   │   ├── project.json               # NX project config
│   │   ├── index.html                 # HTML entry
│   │   │
│   │   └── 📁 server/                 # 🖥️ Shell BFF Server
│   │       ├── 📁 src/
│   │       │   ├── main.ts            # Express server entry
│   │       │   ├── 📁 config/
│   │       │   │   └── env.ts         # Environment configuration
│   │       │   ├── 📁 routes/
│   │       │   │   ├── auth.routes.ts # /api/auth/* endpoints
│   │       │   │   └── config.routes.ts # /api/config endpoint
│   │       │   └── 📁 middleware/
│   │       │       ├── cors.ts        # CORS configuration
│   │       │       └── errorHandler.ts # Error handling
│   │       ├── 📁 public/             # Production frontend builds
│   │       ├── package.json           # Server dependencies
│   │       ├── tsconfig.json          # TypeScript config
│   │       ├── .env.development       # Dev environment vars
│   │       ├── .env.production        # Prod environment vars
│   │       └── project.json           # NX project config
│   │
│   ├── 📁 app1/                       # 📊 Dashboard Application
│   │   ├── 📁 src/
│   │   │   ├── App.tsx                # Exposed component
│   │   │   └── components/
│   │   │       ├── Dashboard.tsx      # Dashboard UI
│   │   │       └── UserStatsCard.tsx  # Stats display
│   │   ├── vite.config.ts             # Exposes: './App'
│   │   │
│   │   └── 📁 server/                 # 🖥️ App1 BFF Server
│   │       ├── 📁 src/
│   │       │   ├── main.ts
│   │       │   └── 📁 routes/
│   │       │       ├── dashboard.routes.ts # /api/dashboard/*
│   │       │       └── user.routes.ts      # /api/user/*
│   │       ├── Dockerfile
│   │       └── ...
│   │
│   └── 📁 app2/                       # ⚙️ Settings Application
│       ├── 📁 src/
│       │   ├── App.tsx                # Exposed component
│       │   └── components/
│       │       ├── SettingsForm.tsx   # Settings UI
│       │       └── ThemeSelector.tsx  # Theme picker
│       ├── vite.config.ts             # Exposes: './App'
│       │
│       └── 📁 server/                 # 🖥️ App2 BFF Server
│           ├── 📁 src/
│           │   ├── main.ts
│           │   └── 📁 routes/
│           │       └── settings.routes.ts # /api/settings/*
│           ├── Dockerfile
│           └── ...
│
├── 📁 libs/                           # Shared Libraries
│   │
│   ├── 📁 shared-ui/                  # 🎨 Shared UI Components
│   │   └── 📁 src/
│   │       ├── Header/Header.tsx      # App header with user info
│   │       ├── LeftNavigation/        # Sidebar navigation
│   │       └── index.ts               # Public exports
│   │
│   ├── 📁 shared-store/               # 📦 Redux Store
│   │   └── 📁 src/
│   │       ├── store.ts               # Store configuration
│   │       ├── hooks.ts               # useAppSelector, useAppDispatch
│   │       └── slices/
│   │           ├── userSlice.ts       # User state
│   │           ├── themeSlice.ts      # Theme state
│   │           └── navigationSlice.ts # Navigation state
│   │
│   ├── 📁 shared-types/               # 📝 TypeScript Types
│   │   └── 📁 src/
│   │       └── index.ts               # Shared interfaces
│   │
│   └── 📁 shared-api-client/          # 🔌 API Client Library
│       └── 📁 src/
│           ├── config.ts              # API base URLs
│           ├── httpClient.ts          # Fetch wrapper
│           ├── authApi.ts             # Auth endpoints
│           ├── dashboardApi.ts        # Dashboard endpoints
│           ├── settingsApi.ts         # Settings endpoints
│           └── index.ts               # Public exports
│
├── 📁 docker/                         # 🐳 Docker configuration
│   ├── docker-compose.yml             # Container orchestration
│   ├── Dockerfile.shell               # Shell app build
│   ├── Dockerfile.app1                # App1 build
│   ├── Dockerfile.app2                # App2 build
│   └── README.md                      # Docker documentation
│
├── 📄 .dockerignore                   # Docker build exclusions
├── 📄 Makefile                        # 🔧 All project commands
├── 📄 package.json                    # Root dependencies & scripts
├── 📄 nx.json                         # NX workspace config
├── 📄 tsconfig.base.json              # Base TypeScript config
├── 📄 tailwind.config.js              # Tailwind configuration
└── 📄 README.md                       # This file
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement    | Version  | Check Command              |
| -------------- | -------- | -------------------------- |
| Node.js        | ≥ 18.0.0 | `node --version`           |
| npm            | ≥ 9.0.0  | `npm --version`            |
| Docker         | Latest   | `docker --version`         |
| Docker Compose | Latest   | `docker-compose --version` |

### Installation

```bash
# 1. Navigate to project directory
cd micro-fronend

# 2. Install root dependencies
npm install

# 3. Install BFF server dependencies
npm run install:bff

# 4. Verify installation
npm run lint
```

---

## 💻 Running Locally

### ⚠️ Important: Two Development Modes

Due to Vite Module Federation limitations, there are **two development modes**:

| Mode         | Command            | Module Federation | HMR    | Use Case                |
| ------------ | ------------------ | ----------------- | ------ | ----------------------- |
| **Dev Mode** | `make start`       | ❌ Not working    | ✅ Yes | Develop individual apps |
| **Local**    | `make local-start` | ✅ Working        | ❌ No  | Test Module Federation  |

### Option 1: Module Federation Mode (Recommended for Testing)

Use this when you need to test **micro-frontends loading into the shell**:

```bash
# Using Makefile (recommended)
make local-start

# Or using npm
npm run mf:dev
```

This:

1. **Builds** all frontend apps (generates `remoteEntry.js`)
2. **Serves** them in preview mode
3. **Starts** all BFF servers

⚠️ **Note:** No HMR in this mode. Changes require rebuild.

### Option 2: Fast Development Mode (Individual Apps)

Use this for **fast development with HMR** when working on a single app:

```bash
# Start all apps (but Module Federation won't work between them)
make start

# Or start specific apps
make start-shell    # Shell + its BFF
make start-app1     # App1 + its BFF
make start-app2     # App2 + its BFF
```

| Service        | URL                   | Description          |
| -------------- | --------------------- | -------------------- |
| Shell Frontend | http://localhost:5173 | Main app (Vite HMR)  |
| Shell BFF      | http://localhost:8084 | Auth & Config API    |
| App1 Frontend  | http://localhost:5174 | Dashboard (Vite HMR) |
| App1 BFF       | http://localhost:8085 | Dashboard & User API |
| App2 Frontend  | http://localhost:5175 | Settings (Vite HMR)  |
| App2 BFF       | http://localhost:8086 | Settings API         |

### Option 3: Frontend Only

```bash
make start-frontends
# or
npm run dev:frontends
```

### Option 4: Backend Only

```bash
make start-backends
# or
npm run dev:backends
```

### Option 5: Individual Apps with HMR

```bash
# Start specific frontend only
make dev-shell   # Shell on :5173
make dev-app1    # App1 on :5174
make dev-app2    # App2 on :5175

# Start specific BFF only
make dev-shell-bff   # Shell BFF on :8084
make dev-app1-bff    # App1 BFF on :8085
make dev-app2-bff    # App2 BFF on :8086
```

### Verify Everything is Working

```bash
# Check BFF health endpoints
curl http://localhost:8084/health
curl http://localhost:8085/health
curl http://localhost:8086/health

# Check frontend
# Open http://localhost:5173 in browser
```

---

## 🐳 Docker Deployment

All Docker files are located in the `docker/` folder.

### 🚀 One-Command Build & Deploy

The Dockerfiles use **multi-stage builds** that automatically:

1. Build the React frontend app
2. Build the Node.js BFF server
3. Copy frontend bundle to server's public folder
4. Create optimized production image

**No manual steps required!** Just run:

```bash
# Build all Docker images (includes frontend + backend builds)
npm run docker:build

# Start all containers
npm run docker:up
```

### Build Process (Automatic)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DOCKER BUILD STAGES                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Stage 1: frontend-builder                                                  │
│   • npm ci (install dependencies)                                            │
│   • npx nx build {app} (build React + Vite)                                  │
│   • Output: /app/dist/apps/{app}                                             │
│                                                                              │
│   Stage 2: backend-builder                                                   │
│   • npm ci (install dependencies)                                            │
│   • npm run build (compile TypeScript)                                       │
│   • Output: /app/dist (compiled JS)                                          │
│                                                                              │
│   Stage 3: production                                                        │
│   • npm ci --only=production                                                 │
│   • COPY built server from Stage 2 → /app/dist                               │
│   • COPY built frontend from Stage 1 → /app/public                           │
│   • Final minimal image ready to run                                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Access the Application

| Service   | URL                   | Description        |
| --------- | --------------------- | ------------------ |
| Shell App | http://localhost:8084 | Main application   |
| App1      | http://localhost:8085 | Dashboard (direct) |
| App2      | http://localhost:8086 | Settings (direct)  |

### Docker Commands

```bash
# Build images
npm run docker:build

# Start containers
npm run docker:up

# View logs
npm run docker:logs

# Stop containers
npm run docker:down

# Build and start in one command
cd docker && docker-compose up --build

# Build specific service
cd docker && docker-compose build shell

# Remove containers and images
cd docker && docker-compose down --rmi all

# Check container health
docker inspect --format='{{.State.Health.Status}}' shell-bff
```

### One-Command Production Deploy

```bash
# Complete build and deploy script
npm run build:all && \
cp -r dist/apps/shell/* apps/shell/server/public/ && \
cp -r dist/apps/app1/* apps/app1/server/public/ && \
cp -r dist/apps/app2/* apps/app2/server/public/ && \
docker-compose up --build -d
```

---

## 📡 API Reference

### Shell BFF (Port 4000)

| Endpoint           | Method | Description      | Example Response                          |
| ------------------ | ------ | ---------------- | ----------------------------------------- |
| `/health`          | GET    | Health check     | `{"status":"ok","service":"shell-bff"}`   |
| `/api/auth/me`     | GET    | Get current user | `{"id":"1","name":"John","role":"admin"}` |
| `/api/auth/login`  | POST   | Login            | `{"success":true,"token":"..."}`          |
| `/api/auth/logout` | POST   | Logout           | `{"success":true}`                        |
| `/api/config`      | GET    | Get app config   | `{"remotes":{"app1":"...","app2":"..."}}` |

### App1 BFF (Port 4001)

| Endpoint                | Method | Description         | Example Response                            |
| ----------------------- | ------ | ------------------- | ------------------------------------------- |
| `/health`               | GET    | Health check        | `{"status":"ok","service":"app1-bff"}`      |
| `/api/dashboard/stats`  | GET    | Get dashboard stats | `{"totalUsers":1250,"revenue":45000}`       |
| `/api/dashboard/charts` | GET    | Get chart data      | `{"revenue":{"labels":[...],"data":[...]}}` |
| `/api/user/profile`     | GET    | Get user profile    | `{"id":"1","name":"John","email":"..."}`    |
| `/api/user/profile`     | PUT    | Update profile      | `{"success":true,"user":{...}}`             |

### App2 BFF (Port 4002)

| Endpoint              | Method | Description     | Example Response                          |
| --------------------- | ------ | --------------- | ----------------------------------------- |
| `/health`             | GET    | Health check    | `{"status":"ok","service":"app2-bff"}`    |
| `/api/settings/user`  | GET    | Get settings    | `{"theme":"light","notifications":{...}}` |
| `/api/settings/user`  | PUT    | Update settings | `{"success":true,"settings":{...}}`       |
| `/api/settings/theme` | PUT    | Update theme    | `{"success":true,"theme":"dark"}`         |

---

## 🔧 Makefile Commands

The project includes a **Makefile** for convenient command execution. Run `make help` to see all available commands.

### Quick Reference

| Command           | Description                                         |
| ----------------- | --------------------------------------------------- |
| `make help`       | Show all available commands                         |
| `make setup`      | 🚀 First-time setup (auto-install ALL dependencies) |
| `make start`      | Start all apps (frontends + backends)               |
| `make start-app1` | Start App1 only (frontend + BFF)                    |
| `make start-app2` | Start App2 only (frontend + BFF)                    |
| `make build`      | Build all apps                                      |
| `make docker`     | Build and start Docker containers                   |
| `make status`     | Show status of all services                         |
| `make clean`      | Clean build artifacts                               |

### Setup Commands

```bash
make setup            # Auto-install ALL dependencies (recommended for first-time)
make install          # Install all dependencies
make install-shell    # Install Shell dependencies only
make install-app1     # Install App1 dependencies only
make install-app2     # Install App2 dependencies only
```

### Start Commands (Recommended)

```bash
make start            # Start ALL apps (frontends + backends)
make start-shell      # Start Shell only (frontend + BFF)
make start-app1       # Start App1 only (frontend + BFF)
make start-app2       # Start App2 only (frontend + BFF)
make start-frontends  # Start all frontends only
make start-backends   # Start all backends only
```

### Development Commands (Individual)

```bash
make dev              # Start all apps (same as make start)
make dev-frontends    # Start only frontends
make dev-backends     # Start only BFF servers
make dev-shell        # Start Shell frontend only
make dev-app1         # Start App1 frontend only
make dev-app2         # Start App2 frontend only
make dev-shell-bff    # Start Shell BFF only
make dev-app1-bff     # Start App1 BFF only
make dev-app2-bff     # Start App2 BFF only
```

### Build Commands

```bash
make build            # Build all apps
make build-frontends  # Build all frontends
make build-backends   # Build all BFF servers
make build-shell      # Build Shell frontend
make build-app1       # Build App1 frontend
make build-app2       # Build App2 frontend
```

### Docker Commands

```bash
make docker           # Build and start containers
make docker-build     # Build Docker images
make docker-up        # Start containers
make docker-up-d      # Start containers (detached)
make docker-down      # Stop containers
make docker-logs      # View container logs
make docker-clean     # Remove containers and images
make docker-rebuild   # Clean, rebuild, and start
make docker-health    # Check container health
```

### Utility Commands

```bash
make status           # Show status of all services
make health           # Check health of BFF servers
make kill-ports       # Kill processes on dev ports
make clean            # Clean build artifacts
make clean-all        # Clean everything + node_modules
```

---

## 📜 Available Scripts (npm)

### Development

| Script                  | Description                       |
| ----------------------- | --------------------------------- |
| `npm run dev`           | Start ALL frontends + BFF servers |
| `npm run dev:frontends` | Start only Vite dev servers       |
| `npm run dev:backends`  | Start only BFF servers            |
| `npm run dev:shell`     | Start shell frontend only         |
| `npm run dev:app1`      | Start app1 frontend only          |
| `npm run dev:app2`      | Start app2 frontend only          |
| `npm run dev:shell-bff` | Start shell BFF only              |
| `npm run dev:app1-bff`  | Start app1 BFF only               |
| `npm run dev:app2-bff`  | Start app2 BFF only               |

### Build

| Script                   | Description             |
| ------------------------ | ----------------------- |
| `npm run build:all`      | Build all frontend apps |
| `npm run build:backends` | Build all BFF servers   |
| `npm run build:shell`    | Build shell frontend    |
| `npm run build:app1`     | Build app1 frontend     |
| `npm run build:app2`     | Build app2 frontend     |

### Docker

| Script                 | Description         |
| ---------------------- | ------------------- |
| `npm run docker:build` | Build Docker images |
| `npm run docker:up`    | Start containers    |
| `npm run docker:down`  | Stop containers     |

### Utilities

| Script                | Description                       |
| --------------------- | --------------------------------- |
| `npm run install:bff` | Install BFF dependencies          |
| `npm run mf:dev`      | Build + preview (Module Fed mode) |
| `npm run lint`        | Lint all projects                 |
| `npm run clean`       | Clean build artifacts             |

---

## 🛠️ Development Guide

### Using Shared Libraries

```typescript
// Import from shared UI
import { Header, LeftNavigation } from "@shared/ui";

// Import from shared store
import { useAppSelector, useAppDispatch, updateUser } from "@shared/store";

// Import from shared types
import { User, Theme } from "@shared/types";

// Import from API client
import { authApi, dashboardApi, settingsApi } from "@shared/api-client";
```

### State Sharing Example

```typescript
// In App1 (Dashboard)
import { useAppDispatch } from "@shared/store";
import { updateUser } from "@shared/store";

function Dashboard() {
  const dispatch = useAppDispatch();

  const handleUpdateProfile = () => {
    dispatch(updateUser({ name: "New Name" }));
    // This update is immediately visible in Shell's Header
    // and App2's Settings form!
  };
}
```

### API Client Example

```typescript
import { authApi, dashboardApi } from "@shared/api-client";

// Login
const { user, token } = await authApi.login("email@example.com", "password");

// Fetch dashboard data
const stats = await dashboardApi.getStats();
console.log(stats.totalUsers, stats.revenue);
```

---

## 🐛 Troubleshooting

### Common Issues

| Issue                   | Solution                             |
| ----------------------- | ------------------------------------ |
| Port already in use     | `lsof -i :5173` then `kill -9 <PID>` |
| BFF not starting        | Run `npm run install:bff` first      |
| Module Federation error | Ensure all apps are running          |
| CORS error              | Check BFF is running on correct port |
| Docker build fails      | Run `npm run build:all` first        |

### Useful Commands

```bash
# Check what's running on ports
lsof -i :5173 -i :5174 -i :5175 -i :8084 -i :8085 -i :8086

# Verify BFF servers
curl http://localhost:8084/health
curl http://localhost:8085/health
curl http://localhost:8086/health

# Check Docker container logs
docker-compose logs -f

# Clean everything and start fresh
npm run clean
npm install
npm run install:bff
npm run dev
```

---

## 🎉 Success Criteria

✅ `npm run dev` starts all 6 servers (3 frontends + 3 BFFs)  
✅ Navigate between apps without page reload  
✅ Shared Header and Navigation across all apps  
✅ Redux state updates visible across all apps instantly  
✅ BFF health endpoints return 200 OK  
✅ Docker containers build and run successfully  
✅ No TypeScript errors

---

## 📚 Resources

- [NX Documentation](https://nx.dev)
- [Vite Documentation](https://vitejs.dev)
- [Module Federation](https://github.com/originjs/vite-plugin-federation)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Express.js](https://expressjs.com)
- [Docker](https://docs.docker.com)

---

## 📄 License

MIT License - Feel free to use this as a starting point for your own micro-frontend projects!
