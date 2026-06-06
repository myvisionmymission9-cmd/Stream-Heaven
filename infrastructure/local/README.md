# Local Development — Stream Heaven Phase 1

> **Windows / step-by-step:** see [`docs/PHASE-1-SETUP-GUIDE.md`](../../docs/PHASE-1-SETUP-GUIDE.md) for PowerShell commands, smoke tests, and troubleshooting.

## Prerequisites

- Node.js 20+
- pnpm 9+
- Docker Desktop (for Postgres + Redis)

## Quick Start

### 1. Start infrastructure

```bash
pnpm docker:up
```

Starts **PostgreSQL 16** and **Redis 7** only. Services run on the host for hot reload.

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure env files

Copy each service `.env.example` to `.env`:

```bash
cp services/auth-service/.env.example services/auth-service/.env
cp services/api-gateway/.env.example services/api-gateway/.env
cp services/user-service/.env.example services/user-service/.env
cp services/realtime-gateway/.env.example services/realtime-gateway/.env
```

Ensure `JWT_ACCESS_SECRET` matches across auth-service, api-gateway, and realtime-gateway.

### 4. Run services (separate terminals)

```bash
pnpm dev:auth      # port 3001
pnpm dev:user      # port 3002
pnpm dev:gateway   # port 3000
pnpm dev:realtime  # port 3009
```

## Docker — full stack

Build and run all services in containers:

```bash
docker compose --profile services up --build
```

## Database migrations

Auth and user services use TypeORM. In development, `synchronize: true` auto-creates tables.

For explicit migrations:

```bash
pnpm --filter @stream-heaven/auth-service migration:run
pnpm --filter @stream-heaven/user-service migration:run
```

## Smoke test

```bash
# Health
curl http://localhost:3000/health/aggregate

# OTP flow (check auth-service logs for mock SMS code)
curl -X POST http://localhost:3000/v1/auth/otp/send \
  -H "Content-Type: application/json" \
  -H "X-App-Id: social" \
  -d '{"phone":"+919876543210"}'
```

## Ports

| Service | Port |
|---------|------|
| api-gateway | 3000 |
| auth-service | 3001 |
| user-service | 3002 |
| realtime-gateway | 3009 |
| PostgreSQL | 5432 |
| Redis | 6379 |
