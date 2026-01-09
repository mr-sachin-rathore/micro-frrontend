# =============================================================================
# MicroFrontend Monorepo - Makefile
# =============================================================================
# This Makefile provides convenient commands for development, building,
# and deployment of the micro-frontend applications.
#
# Usage: make <target>
# Run 'make help' to see all available commands.
# =============================================================================

.PHONY: help setup install dev dev-all dev-frontends dev-backends \
        dev-shell dev-app1 dev-app2 dev-shell-bff dev-app1-bff dev-app2-bff \
        start start-all start-shell start-app1 start-app2 \
        local-start local-start-frontends \
        build build-all build-frontends build-backends \
        build-shell build-app1 build-app2 build-shell-bff build-app1-bff build-app2-bff \
        preview preview-all preview-shell preview-app1 preview-app2 \
        docker docker-build docker-up docker-down docker-logs docker-clean docker-rebuild \
        docker-build-shell docker-build-app1 docker-build-app2 \
        lint test clean clean-all

# Colors for terminal output
CYAN := \033[36m
GREEN := \033[32m
YELLOW := \033[33m
RED := \033[31m
NC := \033[0m # No Color

# =============================================================================
# HELP
# =============================================================================

help: ## Show this help message
	@echo ""
	@echo "$(CYAN)╔══════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║        MicroFrontend Monorepo - Available Commands               ║$(NC)"
	@echo "$(CYAN)╚══════════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(GREEN)Usage:$(NC) make $(YELLOW)<target>$(NC)"
	@echo ""
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z0-9_-]+:.*?##/ { printf "  $(YELLOW)%-20s$(NC) %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
	@echo ""

# =============================================================================
# SETUP & INSTALLATION
# =============================================================================

setup: ## 🚀 First-time setup - Install ALL dependencies automatically
	@echo ""
	@echo "$(CYAN)╔══════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║              Setting up MicroFrontend Monorepo                   ║$(NC)"
	@echo "$(CYAN)╚══════════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(CYAN)📦 Step 1/4: Installing root dependencies...$(NC)"
	npm install
	@echo ""
	@echo "$(CYAN)📦 Step 2/4: Installing Shell BFF dependencies...$(NC)"
	cd apps/shell/server && npm install
	@echo ""
	@echo "$(CYAN)📦 Step 3/4: Installing App1 BFF dependencies...$(NC)"
	cd apps/app1/server && npm install
	@echo ""
	@echo "$(CYAN)📦 Step 4/4: Installing App2 BFF dependencies...$(NC)"
	cd apps/app2/server && npm install
	@echo ""
	@echo "$(GREEN)╔══════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(GREEN)║                    Setup Complete! 🎉                             ║$(NC)"
	@echo "$(GREEN)╚══════════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(YELLOW)Quick Start Commands:$(NC)"
	@echo "  $(CYAN)make start$(NC)        - Start ALL apps (frontends + backends)"
	@echo "  $(CYAN)make start-shell$(NC)  - Start Shell (frontend + BFF)"
	@echo "  $(CYAN)make start-app1$(NC)   - Start App1 (frontend + BFF)"
	@echo "  $(CYAN)make start-app2$(NC)   - Start App2 (frontend + BFF)"
	@echo ""
	@echo "$(YELLOW)Or for Docker:$(NC)"
	@echo "  $(CYAN)make docker$(NC)       - Build and start Docker containers"
	@echo ""

install: ## Install all dependencies (root + BFF servers)
	@echo "$(CYAN)📦 Installing root dependencies...$(NC)"
	npm install
	@echo "$(CYAN)📦 Installing BFF server dependencies...$(NC)"
	npm run install:bff
	@echo "$(GREEN)✅ All dependencies installed!$(NC)"

install-root: ## Install only root dependencies
	@echo "$(CYAN)📦 Installing root dependencies...$(NC)"
	npm install

install-bff: ## Install BFF server dependencies
	@echo "$(CYAN)📦 Installing BFF dependencies...$(NC)"
	npm run install:bff

install-shell: ## Install Shell app dependencies (frontend + BFF)
	@echo "$(CYAN)📦 Installing Shell dependencies...$(NC)"
	cd apps/shell/server && npm install

install-app1: ## Install App1 dependencies (frontend + BFF)
	@echo "$(CYAN)📦 Installing App1 dependencies...$(NC)"
	cd apps/app1/server && npm install

install-app2: ## Install App2 dependencies (frontend + BFF)
	@echo "$(CYAN)📦 Installing App2 dependencies...$(NC)"
	cd apps/app2/server && npm install

# =============================================================================
# DEVELOPMENT - ALL APPS
# =============================================================================

dev: ## Start all apps (frontends + backends) for development
	@echo "$(CYAN)🚀 Starting all apps in development mode...$(NC)"
	@echo "$(YELLOW)Frontend URLs:$(NC)"
	@echo "  Shell:  http://localhost:5173"
	@echo "  App1:   http://localhost:5174"
	@echo "  App2:   http://localhost:5175"
	@echo "$(YELLOW)Backend URLs:$(NC)"
	@echo "  Shell BFF:  http://localhost:8084"
	@echo "  App1 BFF:   http://localhost:8085"
	@echo "  App2 BFF:   http://localhost:8086"
	@echo ""
	npm run dev

dev-all: dev ## Alias for 'dev'

dev-frontends: ## Start only frontend Vite dev servers
	@echo "$(CYAN)🎨 Starting frontend dev servers...$(NC)"
	npm run dev:frontends

dev-backends: ## Start only BFF backend servers
	@echo "$(CYAN)🖥️  Starting BFF servers...$(NC)"
	npm run dev:backends

# =============================================================================
# DEVELOPMENT - INDIVIDUAL APPS
# =============================================================================

dev-shell: ## Start Shell frontend only (port 5173)
	@echo "$(CYAN)🏠 Starting Shell frontend on http://localhost:5173$(NC)"
	npm run dev:shell

dev-app1: ## Start App1 frontend only (port 5174)
	@echo "$(CYAN)📊 Starting App1 (Dashboard) frontend on http://localhost:5174$(NC)"
	npm run dev:app1

dev-app2: ## Start App2 frontend only (port 5175)
	@echo "$(CYAN)⚙️  Starting App2 (Settings) frontend on http://localhost:5175$(NC)"
	npm run dev:app2

dev-shell-bff: ## Start Shell BFF server only (port 8084)
	@echo "$(CYAN)🖥️  Starting Shell BFF on http://localhost:8084$(NC)"
	npm run dev:shell-bff

dev-app1-bff: ## Start App1 BFF server only (port 8085)
	@echo "$(CYAN)🖥️  Starting App1 BFF on http://localhost:8085$(NC)"
	npm run dev:app1-bff

dev-app2-bff: ## Start App2 BFF server only (port 8086)
	@echo "$(CYAN)🖥️  Starting App2 BFF on http://localhost:8086$(NC)"
	npm run dev:app2-bff

# =============================================================================
# START - CONVENIENT APP LAUNCHERS
# =============================================================================

start: ## 🚀 Start ALL apps (frontends + backends)
	@echo ""
	@echo "$(CYAN)╔══════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║              Starting All MicroFrontend Apps                     ║$(NC)"
	@echo "$(CYAN)╚══════════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(YELLOW)Frontend URLs:$(NC)"
	@echo "  🏠 Shell:  http://localhost:5173"
	@echo "  📊 App1:   http://localhost:5174"
	@echo "  ⚙️  App2:   http://localhost:5175"
	@echo ""
	@echo "$(YELLOW)Backend URLs:$(NC)"
	@echo "  🖥️  Shell BFF:  http://localhost:8084"
	@echo "  🖥️  App1 BFF:   http://localhost:8085"
	@echo "  🖥️  App2 BFF:   http://localhost:8086"
	@echo ""
	npm run dev

start-all: start ## Alias for 'start'

start-shell: ## 🏠 Start Shell app (frontend + BFF)
	@echo ""
	@echo "$(CYAN)╔══════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║                    Starting Shell App                            ║$(NC)"
	@echo "$(CYAN)╚══════════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(YELLOW)URLs:$(NC)"
	@echo "  🎨 Frontend:  http://localhost:5173"
	@echo "  🖥️  Backend:   http://localhost:8084"
	@echo ""
	npx concurrently --kill-others \
		"npm run dev:shell" \
		"npm run dev:shell-bff"

start-app1: ## Start App1 Dashboard (frontend + BFF)
	@echo ""
	@echo "$(CYAN)╔══════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║                Starting App1 (Dashboard)                         ║$(NC)"
	@echo "$(CYAN)╚══════════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(YELLOW)URLs:$(NC)"
	@echo "  🎨 Frontend:  http://localhost:5174"
	@echo "  🖥️  Backend:   http://localhost:8085"
	@echo ""
	npx concurrently --kill-others \
		"npm run dev:app1" \
		"npm run dev:app1-bff"

start-app2: ## Start App2 Settings (frontend + BFF)
	@echo ""
	@echo "$(CYAN)╔══════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║                Starting App2 (Settings)                          ║$(NC)"
	@echo "$(CYAN)╚══════════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(YELLOW)URLs:$(NC)"
	@echo "  🎨 Frontend:  http://localhost:5175"
	@echo "  🖥️  Backend:   http://localhost:8086"
	@echo ""
	npx concurrently --kill-others \
		"npm run dev:app2" \
		"npm run dev:app2-bff"

start-frontends: ## Start all frontends only
	@echo "$(CYAN)🎨 Starting all frontend dev servers...$(NC)"
	npm run dev:frontends

start-backends: ## Start all BFF backends only
	@echo "$(CYAN)🖥️  Starting all BFF servers...$(NC)"
	npm run dev:backends

# =============================================================================
# LOCAL START (Build + Preview with Module Federation)
# =============================================================================

local-start: ## 🚀 Local start (build + serve with Module Federation)
	@echo ""
	@echo "$(CYAN)╔══════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║              Local Start (Build + Preview)                       ║$(NC)"
	@echo "$(CYAN)╚══════════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(YELLOW)⚠️  Note: This mode builds all apps first, then serves them.$(NC)"
	@echo "$(YELLOW)    Module Federation works but HMR is disabled.$(NC)"
	@echo ""
	@echo "$(CYAN)Step 1: Building all apps...$(NC)"
	npm run build:all
	@echo ""
	@echo "$(GREEN)✅ Build complete! Starting servers...$(NC)"
	@echo ""
	@echo "$(YELLOW)Frontend URLs:$(NC)"
	@echo "  🏠 Shell:  http://localhost:5173"
	@echo "  📊 App1:   http://localhost:5174"
	@echo "  ⚙️  App2:   http://localhost:5175"
	@echo ""
	@echo "$(YELLOW)Backend URLs:$(NC)"
	@echo "  🖥️  Shell BFF:  http://localhost:8084"
	@echo "  🖥️  App1 BFF:   http://localhost:8085"
	@echo "  🖥️  App2 BFF:   http://localhost:8086"
	@echo ""
	npm run mf:serve

local-start-frontends: ## Local start frontends only (no BFF)
	@echo "$(CYAN)🔗 Building and serving frontends...$(NC)"
	npm run mf:frontends

# =============================================================================
# BUILD - ALL
# =============================================================================

build: build-all ## Build all apps (frontends + backends)

build-all: ## Build all frontend and backend apps
	@echo "$(CYAN)🔨 Building all apps...$(NC)"
	npm run build:all
	npm run build:backends
	@echo "$(GREEN)✅ All builds complete!$(NC)"

build-frontends: ## Build all frontend apps
	@echo "$(CYAN)🎨 Building all frontends...$(NC)"
	npm run build:all
	@echo "$(GREEN)✅ Frontend builds complete!$(NC)"

build-backends: ## Build all BFF servers
	@echo "$(CYAN)🖥️  Building all BFF servers...$(NC)"
	npm run build:backends
	@echo "$(GREEN)✅ Backend builds complete!$(NC)"

# =============================================================================
# BUILD - INDIVIDUAL APPS
# =============================================================================

build-shell: ## Build Shell frontend
	@echo "$(CYAN)🏠 Building Shell frontend...$(NC)"
	npm run build:shell

build-app1: ## Build App1 frontend
	@echo "$(CYAN)📊 Building App1 frontend...$(NC)"
	npm run build:app1

build-app2: ## Build App2 frontend
	@echo "$(CYAN)⚙️  Building App2 frontend...$(NC)"
	npm run build:app2

build-shell-bff: ## Build Shell BFF server
	@echo "$(CYAN)🖥️  Building Shell BFF server...$(NC)"
	npm run build:shell-bff

build-app1-bff: ## Build App1 BFF server
	@echo "$(CYAN)🖥️  Building App1 BFF server...$(NC)"
	npm run build:app1-bff

build-app2-bff: ## Build App2 BFF server
	@echo "$(CYAN)🖥️  Building App2 BFF server...$(NC)"
	npm run build:app2-bff

# =============================================================================
# PREVIEW (Module Federation Mode)
# =============================================================================

preview: preview-all ## Preview all apps in production mode

preview-all: ## Build and preview all apps (Module Federation mode)
	@echo "$(CYAN)👁️  Building and previewing all apps...$(NC)"
	npm run mf:dev

preview-shell: ## Preview Shell app
	npm run preview:shell

preview-app1: ## Preview App1
	npm run preview:app1

preview-app2: ## Preview App2
	npm run preview:app2

# =============================================================================
# DOCKER - BUILD
# =============================================================================

docker: docker-build docker-up ## Build and start Docker containers

docker-build: ## Build all Docker images
	@echo "$(CYAN)🐳 Building Docker images...$(NC)"
	@echo "$(YELLOW)This includes frontend + backend builds inside Docker$(NC)"
	cd docker && docker-compose build
	@echo "$(GREEN)✅ Docker images built!$(NC)"

docker-build-shell: ## Build only Shell Docker image
	@echo "$(CYAN)🐳 Building Shell Docker image...$(NC)"
	cd docker && docker-compose build shell

docker-build-app1: ## Build only App1 Docker image
	@echo "$(CYAN)🐳 Building App1 Docker image...$(NC)"
	cd docker && docker-compose build app1

docker-build-app2: ## Build only App2 Docker image
	@echo "$(CYAN)🐳 Building App2 Docker image...$(NC)"
	cd docker && docker-compose build app2

docker-build-nocache: ## Build Docker images without cache
	@echo "$(CYAN)🐳 Building Docker images (no cache)...$(NC)"
	cd docker && docker-compose build --no-cache

# =============================================================================
# DOCKER - RUN
# =============================================================================

docker-up: ## Start Docker containers
	@echo "$(CYAN)🐳 Starting Docker containers...$(NC)"
	@echo "$(YELLOW)Access URLs:$(NC)"
	@echo "  Shell:  http://localhost:8084"
	@echo "  App1:   http://localhost:8085"
	@echo "  App2:   http://localhost:8086"
	@echo ""
	cd docker && docker-compose up

docker-up-d: ## Start Docker containers (detached mode)
	@echo "$(CYAN)🐳 Starting Docker containers (detached)...$(NC)"
	cd docker && docker-compose up -d
	@echo ""
	@echo "$(GREEN)✅ Containers started!$(NC)"
	@echo "$(YELLOW)Access URLs:$(NC)"
	@echo "  Shell:  http://localhost:8084"
	@echo "  App1:   http://localhost:8085"
	@echo "  App2:   http://localhost:8086"

docker-down: ## Stop Docker containers
	@echo "$(CYAN)🐳 Stopping Docker containers...$(NC)"
	cd docker && docker-compose down
	@echo "$(GREEN)✅ Containers stopped!$(NC)"

docker-restart: ## Restart Docker containers
	@echo "$(CYAN)🐳 Restarting Docker containers...$(NC)"
	cd docker && docker-compose restart

docker-logs: ## View Docker container logs
	cd docker && docker-compose logs -f

docker-logs-shell: ## View Shell container logs
	cd docker && docker-compose logs -f shell

docker-logs-app1: ## View App1 container logs
	cd docker && docker-compose logs -f app1

docker-logs-app2: ## View App2 container logs
	cd docker && docker-compose logs -f app2

# =============================================================================
# DOCKER - MANAGEMENT
# =============================================================================

docker-ps: ## List running Docker containers
	docker ps --filter "name=mf-shell-bff" --filter "name=mf-app1-bff" --filter "name=mf-app2-bff"

docker-clean: ## Stop and remove containers, networks, and images
	@echo "$(RED)🗑️  Cleaning up Docker resources...$(NC)"
	cd docker && docker-compose down --rmi all --volumes --remove-orphans
	@echo "$(GREEN)✅ Docker cleanup complete!$(NC)"

docker-rebuild: docker-clean docker-build docker-up ## Clean, rebuild, and start containers

docker-health: ## Check health of Docker containers
	@echo "$(CYAN)🏥 Checking container health...$(NC)"
	@docker inspect --format='Shell: {{.State.Health.Status}}' mf-shell-bff 2>/dev/null || echo "Shell: not running"
	@docker inspect --format='App1:  {{.State.Health.Status}}' mf-app1-bff 2>/dev/null || echo "App1:  not running"
	@docker inspect --format='App2:  {{.State.Health.Status}}' mf-app2-bff 2>/dev/null || echo "App2:  not running"

docker-shell-exec: ## Open shell in Shell container
	docker exec -it mf-shell-bff /bin/sh

docker-app1-exec: ## Open shell in App1 container
	docker exec -it mf-app1-bff /bin/sh

docker-app2-exec: ## Open shell in App2 container
	docker exec -it mf-app2-bff /bin/sh

# =============================================================================
# TESTING & LINTING
# =============================================================================

lint: ## Run linter on all projects
	@echo "$(CYAN)🔍 Running linter...$(NC)"
	npm run lint

test: ## Run tests on all projects
	@echo "$(CYAN)🧪 Running tests...$(NC)"
	npm run test

# =============================================================================
# CLEANUP
# =============================================================================

clean: ## Clean build artifacts
	@echo "$(CYAN)🧹 Cleaning build artifacts...$(NC)"
	rm -rf dist
	rm -rf apps/*/dist
	rm -rf apps/*/server/dist
	rm -rf .nx
	@echo "$(GREEN)✅ Clean complete!$(NC)"

clean-all: clean ## Clean everything including node_modules
	@echo "$(RED)🗑️  Removing node_modules...$(NC)"
	rm -rf node_modules
	rm -rf apps/*/node_modules
	rm -rf apps/*/server/node_modules
	rm -rf libs/*/node_modules
	npm run clean 2>/dev/null || true
	@echo "$(GREEN)✅ Full clean complete!$(NC)"

clean-docker: docker-clean ## Alias for docker-clean

# =============================================================================
# UTILITIES
# =============================================================================

status: ## Show status of all services
	@echo ""
	@echo "$(CYAN)╔══════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║                    Service Status                                 ║$(NC)"
	@echo "$(CYAN)╚══════════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(YELLOW)Checking ports...$(NC)"
	@echo ""
	@lsof -i :5173 > /dev/null 2>&1 && echo "$(GREEN)✅ Shell Frontend  (5173)  - Running$(NC)" || echo "$(RED)❌ Shell Frontend  (5173)  - Not running$(NC)"
	@lsof -i :5174 > /dev/null 2>&1 && echo "$(GREEN)✅ App1 Frontend   (5174)  - Running$(NC)" || echo "$(RED)❌ App1 Frontend   (5174)  - Not running$(NC)"
	@lsof -i :5175 > /dev/null 2>&1 && echo "$(GREEN)✅ App2 Frontend   (5175)  - Running$(NC)" || echo "$(RED)❌ App2 Frontend   (5175)  - Not running$(NC)"
	@lsof -i :8084 > /dev/null 2>&1 && echo "$(GREEN)✅ Shell BFF       (8084)  - Running$(NC)" || echo "$(RED)❌ Shell BFF       (8084)  - Not running$(NC)"
	@lsof -i :8085 > /dev/null 2>&1 && echo "$(GREEN)✅ App1 BFF        (8085)  - Running$(NC)" || echo "$(RED)❌ App1 BFF        (8085)  - Not running$(NC)"
	@lsof -i :8086 > /dev/null 2>&1 && echo "$(GREEN)✅ App2 BFF        (8086)  - Running$(NC)" || echo "$(RED)❌ App2 BFF        (8086)  - Not running$(NC)"
	@echo ""

health: ## Check health of BFF servers
	@echo "$(CYAN)🏥 Checking BFF health endpoints...$(NC)"
	@echo ""
	@curl -s http://localhost:8084/health > /dev/null 2>&1 && echo "$(GREEN)✅ Shell BFF (8084): Healthy$(NC)" || echo "$(RED)❌ Shell BFF (8084): Not responding$(NC)"
	@curl -s http://localhost:8085/health > /dev/null 2>&1 && echo "$(GREEN)✅ App1 BFF  (8085): Healthy$(NC)" || echo "$(RED)❌ App1 BFF  (8085): Not responding$(NC)"
	@curl -s http://localhost:8086/health > /dev/null 2>&1 && echo "$(GREEN)✅ App2 BFF  (8086): Healthy$(NC)" || echo "$(RED)❌ App2 BFF  (8086): Not responding$(NC)"
	@echo ""

kill-ports: ## Kill processes on development ports
	@echo "$(RED)🔪 Killing processes on development ports...$(NC)"
	-lsof -ti :5173 | xargs kill -9 2>/dev/null
	-lsof -ti :5174 | xargs kill -9 2>/dev/null
	-lsof -ti :5175 | xargs kill -9 2>/dev/null
	-lsof -ti :8084 | xargs kill -9 2>/dev/null
	-lsof -ti :8085 | xargs kill -9 2>/dev/null
	-lsof -ti :8086 | xargs kill -9 2>/dev/null
	@echo "$(GREEN)✅ Ports cleared!$(NC)"

# Default target
.DEFAULT_GOAL := help

