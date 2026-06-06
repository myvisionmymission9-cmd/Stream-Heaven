# Stream Heaven â€” Phase 1 Local Setup (Windows 10 / PowerShell)

This guide walks you through running **Phase 1** on your machine: Postgres + Redis in Docker, four NestJS services on the host, then a smoke test (**OTP â†’ JWT â†’ profile â†’ Socket.IO**).

**Repo root** (use this folder in every terminal):

```powershell
cd "C:\Users\admin\Desktop\Stream Heaven"
```

---

## One-command setup

From repo root (PowerShell):

`powershell
powershell -ExecutionPolicy Bypass -File scripts/setup-phase1.ps1
`

Optional flags:

- -SkipInstall — skip pnpm install
- -SkipDocker — skip Docker (if Postgres/Redis already running)
- -StartServices — start auth, user, gateway, realtime in background (logs under logs/)
- -RunSmokeTest — run scripts/smoke-test-phase1.ps1 after setup (use with -StartServices and -AuthLogPath logs/dev-auth.log for mock OTP)

Smoke test only:

`powershell
powershell -ExecutionPolicy Bypass -File scripts/smoke-test-phase1.ps1 -AuthLogPath logs/dev-auth.log
`

---

## Prerequisites

| Tool | Version | Notes |
|------|---------|--------|
| **Git** | Any recent | Clone/pull the repo |
| **Node.js** | **20+** | Check: `node -v` (e.g. `v22.x`) |
| **pnpm** | **9+** | Repo pins `pnpm@9.15.0` â€” use Corepack or `npx` (see below) |
| **Docker Desktop** | Latest | Runs **PostgreSQL 16** and **Redis 7** only |

### Install pnpm (pick one)

**Option A â€” Corepack (recommended if you have Node 20+)**

```powershell
corepack enable
corepack prepare pnpm@9.15.0 --activate
pnpm -v
```

**Option B â€” No global install (always works)**

Prefix commands with:

```powershell
npx pnpm@9.15.0 install
npx pnpm@9.15.0 docker:up
```

Below, `pnpm` means whichever option you chose.

### Verify Docker

```powershell
docker --version
docker compose version
```

If you see *"docker is not recognized"*, install [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/), start it, wait until it says **Running**, then open a **new** PowerShell window.

---

## Ports and URLs

| Component | URL / port |
|-----------|------------|
| **API Gateway** (use this for HTTP smoke tests) | `http://localhost:3000` |
| Auth service (direct, optional) | `http://localhost:3001` |
| User service (direct, optional) | `http://localhost:3002` |
| Realtime / Socket.IO | `http://localhost:3009` |
| PostgreSQL | `localhost:5432` |
| Redis | `localhost:6379` |

**Socket.IO:** namespace `/presence`, path `/socket.io` â†’ connect to `http://localhost:3009/presence`.

---

## Step-by-step walkthrough

### 1. Install dependencies

From repo root:

```powershell
cd "C:\Users\admin\Desktop\Stream Heaven"
pnpm install
```

First run may take a few minutes.

---

### 2. Start Postgres and Redis

```powershell
pnpm docker:up
```

This runs: `docker compose up -d postgres redis`

**Check containers:**

```powershell
docker compose ps
```

Both `postgres` and `redis` should be **running**. On first start, `init-db.sql` creates databases `sh_auth` and `sh_user`.

**Stop later (optional):**

```powershell
pnpm docker:down
```

---

### 3. Copy environment files (Windows)

Copy each `.env.example` to `.env` in the same folder:

```powershell
Copy-Item "services\auth-service\.env.example" "services\auth-service\.env"
Copy-Item "services\api-gateway\.env.example" "services\api-gateway\.env"
Copy-Item "services\user-service\.env.example" "services\user-service\.env"
Copy-Item "services\realtime-gateway\.env.example" "services\realtime-gateway\.env"
```

#### JWT secrets (must match)

These three files **must use the same** `JWT_ACCESS_SECRET`:

- `services/auth-service/.env` â€” also `JWT_REFRESH_SECRET`
- `services/api-gateway/.env`
- `services/realtime-gateway/.env`

**First-time dev:** the values in `.env.example` already match â€” you can leave them as copied.

**Generate new secrets (optional)** â€” use the **same** access secret in all three files:

**PowerShell (32+ random chars):**

```powershell
function New-ShSecret { -join ((48..57)+(65..90)+(97..122) | Get-Random -Count 40 | ForEach-Object { [char]$_ }) }
$access  = New-ShSecret
$refresh = New-ShSecret
Write-Host "JWT_ACCESS_SECRET=$access"
Write-Host "JWT_REFRESH_SECRET=$refresh"
```

Paste `JWT_ACCESS_SECRET` into auth, api-gateway, and realtime `.env` files. Paste `JWT_REFRESH_SECRET` only into **auth-service** `.env`.

**OpenSSL (if installed):**

```powershell
openssl rand -base64 32
```

#### Other important variables (defaults from examples)

| Variable | Service | Purpose |
|----------|---------|---------|
| `DATABASE_URL` | auth, user | `localhost:5432` â€” users `sh_auth` / `sh_user` |
| `REDIS_URL` | all that need it | `redis://localhost:6379` |
| `AUTH_SERVICE_URL` | api-gateway | `http://localhost:3001` |
| `USER_SERVICE_URL` | api-gateway | `http://localhost:3002` |
| `SMS_PROVIDER` | auth | `mock` â€” OTP printed in **auth** terminal |
| `PHONE_ENCRYPTION_KEY` | auth | 32-byte hex (must match example unless you know why to change it) |
| `INTERNAL_SERVICE_TOKEN` | user | `dev-internal-token` (gateway forwards user id via headers) |

---

### 4. Run the four services (four terminals)

Open **four** PowerShell windows. In **each**, go to repo root, then run **one** command:

```text
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Terminal 1          â”‚ Terminal 2          â”‚
â”‚ pnpm dev:auth       â”‚ pnpm dev:user       â”‚
â”‚ (port 3001)         â”‚ (port 3002)         â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Terminal 3          â”‚ Terminal 4          â”‚
â”‚ pnpm dev:gateway    â”‚ pnpm dev:realtime   â”‚
â”‚ (port 3000)         â”‚ (port 3009)         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

| Terminal | Command | Wait for log line |
|----------|---------|-------------------|
| 1 | `pnpm dev:auth` | `auth-service listening on :3001` |
| 2 | `pnpm dev:user` | `user-service listening on :3002` |
| 3 | `pnpm dev:gateway` | `api-gateway listening on :3000` |
| 4 | `pnpm dev:realtime` | `realtime-gateway listening on :3009` |

**Order tip:** start **auth** and **user** before or with **gateway**; **realtime** can start anytime after Redis is up.

In development, TypeORM `synchronize: true` creates tables automatically â€” no manual migration needed for first run.

---

### 5. Smoke test: OTP â†’ JWT â†’ profile â†’ Socket.IO

Run these in a **fifth** PowerShell window (repo root not required).

#### 5a. Health check (all services up)

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/health/aggregate"
```

You should see aggregated status from auth, user, and related checks. If this fails, fix terminals/Docker before continuing.

#### 5b. Send OTP

Phone must be **E.164** (e.g. `+919876543210`).

```powershell
$phone = "+919876543210"
$sendBody = @{ phone = $phone } | ConvertTo-Json
$send = Invoke-RestMethod `
  -Uri "http://localhost:3000/v1/auth/otp/send" `
  -Method POST `
  -ContentType "application/json" `
  -Headers @{ "X-App-Id" = "social" } `
  -Body $sendBody

$send
$requestId = $send.requestId
```

Save `$requestId` â€” you need it for verify.

#### 5c. Find the mock OTP code

With `SMS_PROVIDER=mock`, the **auth-service terminal (Terminal 1)** logs something like:

```text
[MOCK SMS] OTP 482917 sent to +91******3210
```

Copy the **6-digit** code from that line.

#### 5d. Verify OTP â†’ get JWT

```powershell
$code = "482917"   # replace with the code from your log
$verifyBody = @{
  phone     = $phone
  code      = $code
  requestId = $requestId
} | ConvertTo-Json

$session = Invoke-RestMethod `
  -Uri "http://localhost:3000/v1/auth/otp/verify" `
  -Method POST `
  -ContentType "application/json" `
  -Headers @{ "X-App-Id" = "social" } `
  -Body $verifyBody

$session
$accessToken = $session.accessToken
```

Expected fields: `accessToken`, `refreshToken`, `expiresIn`, `tokenType`, `user` (with `userId`, `isNewUser`, etc.).

#### 5e. Get your profile (Bearer token)

```powershell
$profile = Invoke-RestMethod `
  -Uri "http://localhost:3000/v1/users/me" `
  -Headers @{ Authorization = "Bearer $accessToken" }

$profile
```

First call auto-creates a profile (`displayName`, `handle`, `apps`, etc.).

#### 5f. Socket.IO (optional)

Realtime listens on **3009**. Clients must send the **access** JWT (not refresh).

- **URL:** `http://localhost:3009/presence`
- **Path:** `/socket.io`
- **Auth:** `handshake.auth.token = <accessToken>` (or `Authorization: Bearer <accessToken>`)

**Browser quick check:** use a small HTML page or the Socket.IO client in your app; connection without a token is rejected.

**CLI (optional):** install `wscat` / use a Socket.IO client â€” raw WebSocket alone is awkward because Socket.IO uses its own protocol. Verifying HTTP steps (5aâ€“5e) is enough for Phase 1; realtime is confirmed when Terminal 4 stays up and accepts a authenticated client from your app.

**Ping event (after connected):** emit `client.ping` with `{ "ts": 1234567890 }` â†’ expect `server.pong`.

---

## curl equivalents (if you prefer)

```powershell
# Send OTP
curl.exe -X POST "http://localhost:3000/v1/auth/otp/send" `
  -H "Content-Type: application/json" `
  -H "X-App-Id: social" `
  -d "{\"phone\":\"+919876543210\"}"

# Verify (replace CODE and REQUEST_ID)
curl.exe -X POST "http://localhost:3000/v1/auth/otp/verify" `
  -H "Content-Type: application/json" `
  -H "X-App-Id: social" `
  -d "{\"phone\":\"+919876543210\",\"code\":\"123456\",\"requestId\":\"YOUR-REQUEST-ID\"}"

# Profile
curl.exe "http://localhost:3000/v1/users/me" `
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Troubleshooting

### `docker` is not recognized

- Install/start **Docker Desktop**.
- Ensure **WSL 2** backend is enabled if prompted.
- Close and reopen PowerShell after install.

### `pnpm` is not recognized

- Run `corepack enable` then `corepack prepare pnpm@9.15.0 --activate`, **or**
- Use `npx pnpm@9.15.0 <script>` for every command.

### Port already in use

Find what uses the port (example for 3000):

```powershell
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue |
  Select-Object LocalPort, OwningProcess

Get-Process -Id <OwningProcess>
```

Stop the other app, or change `PORT` in the service `.env` (and update gateway upstream URLs if you change auth/user ports).

### Gateway returns 401 on `/v1/users/me`

- Use **`accessToken`** from verify, not `refreshToken`.
- Header must be exactly: `Authorization: Bearer <token>`.
- Ensure gateway, auth, and realtime share the same `JWT_ACCESS_SECRET`.

### OTP verify fails (`invalid` / `expired`)

- Code expires after **300 seconds** (`OTP_TTL_SECONDS`).
- Max **3** wrong attempts (`OTP_MAX_ATTEMPTS`).
- `requestId` must be from the **latest** send for that phone.
- Phone in verify must **match** send exactly (same `+919876543210`).

### Database connection errors

- `pnpm docker:up` running? `docker compose ps` shows healthy postgres?
- `DATABASE_URL` uses `localhost` (not `postgres`) when services run on the host.
- Wait ~10s after first `docker:up` for init script to finish.

### JWT / auth errors after changing secrets

- Restart **all four** Node terminals after editing `.env`.
- Align `JWT_ACCESS_SECRET` in auth, api-gateway, and realtime.

### Rate limit on OTP send

- Default **5 requests per hour** per phone (`OTP_RATE_LIMIT_PER_HOUR`).
- Use a different phone number or wait / clear Redis keys in dev.

---

## Reference: root scripts

From `package.json`:

| Script | What it does |
|--------|----------------|
| `pnpm install` | Install monorepo dependencies |
| `pnpm docker:up` | `docker compose up -d postgres redis` |
| `pnpm docker:down` | Stop compose stack |
| `pnpm dev:auth` | Auth service â†’ **3001** |
| `pnpm dev:user` | User service â†’ **3002** |
| `pnpm dev:gateway` | API gateway â†’ **3000** |
| `pnpm dev:realtime` | Realtime gateway â†’ **3009** |

---

## Next steps

- **Phase 2a (Flutter app):** [`PHASE-2A-FLUTTER-GUIDE.md`](PHASE-2A-FLUTTER-GUIDE.md) — `powershell -ExecutionPolicy Bypass -File scripts/setup-phase2a.ps1`
- Realtime smoke: `pnpm smoke:realtime` (JWT → Socket.IO ping/pong)
- Shorter infra notes: [`infrastructure/local/README.md`](../infrastructure/local/README.md)
- Full Dockerized stack: `pnpm docker:services` or `docker compose --profile services up --build`
- Migrations (optional): `pnpm --filter @stream-heaven/auth-service migration:run`

---

## Last automated run

| Field | Value |
|-------|--------|
| **Date (UTC)** | 2026-05-30 |
| **Runner** | `scripts/setup-phase1.ps1 -StartServices -RunSmokeTest` (+ manual recovery steps) |
| **Prerequisites** | Node v22.22.0, npm 11.13.0, Docker 29.5.2 |
| **Docker** | Started via Docker Desktop (`C:\Program Files\Docker\Docker\Docker Desktop.exe`); postgres + redis healthy |
| **pnpm** | `npx pnpm@9.15.0 install` (already up to date) |
| **Smoke test** | **PASS** — use `http://127.0.0.1:3000` as gateway base on Windows if `localhost` hangs; clear OTP rate limit in Redis if needed (`sh:otp:rate:<phone_sha256>`) |
| **Aggregate health** | `http://127.0.0.1:3000/health/aggregate` → `status: ready` |

**Services (host dev, background shells):**

| Service | URL / port |
|---------|------------|
| API gateway | http://127.0.0.1:3000 |
| Auth | http://127.0.0.1:3001 |
| User | http://127.0.0.1:3002 |
| Realtime | http://127.0.0.1:3009 |
| Postgres | localhost:5432 |
| Redis | localhost:6379 |

**Notes from this run:** First `docker compose up` hit a transient container-name conflict; re-run `docker compose up -d postgres redis` succeeded. Initial setup script run failed before services; auth/gateway needed restart and ~5+ min for Nest watch compile. Dev logs: `logs/dev-*.log`.

