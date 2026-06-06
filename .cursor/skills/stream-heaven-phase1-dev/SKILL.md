---
name: stream-heaven-phase1-dev
description: >-
  Run Stream Heaven Phase 1 local setup on Windows — Docker Postgres/Redis,
  NestJS services, smoke test. Use when setting up backend, fixing gateway/auth
  errors, or running setup-phase1.ps1.
---

# Stream Heaven Phase 1 Local Dev

## When to use

- User asks to set up Phase 1, start backend, or run smoke tests
- Gateway/auth/user/realtime services need starting or debugging
- Docker, OTP, JWT, or port conflict issues on Windows

## Agent scope

Primary agent: `ai-agents/meta/local-dev-bootstrap-agent.md`

Supporting: `ai-agents/phase-1/auth-service-agent.md`, `profile-service-agent.md`, `api-gateway-bootstrap-agent.md`, `ai-agents/testing/integration-smoke-test-agent.md`

Read first: `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`, `docs/PHASE-1-SETUP-GUIDE.md`

## Steps

1. **Prerequisites** — Node 20+, Docker Desktop running, pnpm via `npx pnpm@9.15.0`
2. **Repo root** — `cd "C:\Users\admin\Desktop\Stream Heaven"`
3. **Full setup**:
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts/setup-phase1.ps1 -StartServices -RunSmokeTest
   ```
4. **Health check** — `Invoke-RestMethod http://127.0.0.1:3000/health/aggregate`
5. **Smoke test only**:
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts/smoke-test-phase1.ps1 -AuthLogPath logs/dev-auth.log
   ```

## Ports

| Service | Port |
|---------|------|
| API Gateway | 3000 |
| Auth | 3001 |
| User | 3002 |
| Realtime | 3009 |
| Postgres | 5432 |
| Redis | 6379 |

## Common fixes

- **Docker not running** — Start Docker Desktop; wait ~2 min
- **Gateway 504** — Auth/user still compiling; wait 3–5 min
- **OTP not in log** — Use `127.0.0.1` not `localhost` on Windows; read log with UTF-16 support (smoke script handles this)
- **JWT 401** — Align `JWT_ACCESS_SECRET` in auth, api-gateway, realtime `.env`
- **Rate limit** — Use different phone or clear Redis `sh:otp:rate:*`

## Validation

```powershell
node scripts/validate-agents.mjs
node scripts/test-golden-agents.mjs
```
