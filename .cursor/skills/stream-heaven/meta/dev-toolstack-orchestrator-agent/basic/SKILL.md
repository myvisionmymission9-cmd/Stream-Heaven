# Stream Heaven Dev Toolstack Orchestrator — Basic Skill

**Phase:** 1 (prerequisite)
**Domain:** meta / toolstack
**Agent:** `ai-agents/meta/dev-toolstack-orchestrator-agent.md`

---

## Purpose

Single-agent execution to audit, install, and verify the Stream Heaven development toolstack on Windows. Covers ~150 tools across 5 tiers and produces SaaS + Mac-only checklists.

---

## Quick Start

```powershell
# 1. Dry-run audit (no installs, shows what is missing)
powershell -ExecutionPolicy Bypass -File scripts\bootstrap-dev-toolstack.ps1 -DryRun

# 2. Install core tools only
powershell -ExecutionPolicy Bypass -File scripts\bootstrap-dev-toolstack.ps1 -Phase core

# 3. Install everything
powershell -ExecutionPolicy Bypass -File scripts\bootstrap-dev-toolstack.ps1 -Phase all

# 4. Install a specific phase (core | infra | mobile | devops | optional)
powershell -ExecutionPolicy Bypass -File scripts\bootstrap-dev-toolstack.ps1 -Phase infra -SkipAlreadyInstalled
```

Log: `D:\StreamHeaven\logs\toolstack-bootstrap.log`

---

## Tool Catalog (condensed)

### Tier 0 — Auto-Install on Windows

| # | Tool | winget ID / Method | Verify | Phase |
|---|------|--------------------|--------|-------|
| 1 | Git | `Git.Git` | `git --version` | 1 |
| 2 | Node.js 20 LTS | `OpenJS.NodeJS.LTS` | `node --version` | 1 |
| 3 | npm | bundled with Node | `npm --version` | 1 |
| 4 | Docker Desktop | `Docker.DockerDesktop` | `docker --version` | 1 |
| 5 | VS Code | `Microsoft.VisualStudioCode` | `code --version` | 1 |
| 6 | Cursor IDE | `Anysphere.Cursor` | `cursor --version` | 1 |
| 7 | GitHub CLI | `GitHub.cli` | `gh --version` | 1 |
| 8 | AWS CLI v2 | `Amazon.AWSCLI` | `aws --version` | 1 |
| 9 | Flutter SDK | `Google.Flutter` | `flutter --version` | 2a |
| 10 | Android Studio | `Google.AndroidStudio` | `studio64.exe` | 2a |
| 11 | DBeaver CE | `dbeaver.dbeaver` | (GUI) | 1 |
| 12 | Postman | `Postman.Postman` | (GUI) | 1 |
| 13 | 7-Zip | `7zip.7zip` | `7z` | 1 |
| 14 | NestJS CLI | npm global | `nest --version` | 1 |
| 15 | Firebase CLI | npm global | `firebase --version` | 3 |
| 16 | Wrangler CLI | npm global | `wrangler --version` | 3 |
| 17 | Sentry CLI | npm global | `sentry-cli --version` | 5 |
| 18 | pnpm | npm global | `pnpm --version` | 1 |
| 19 | TypeScript | npm global | `tsc --version` | 1 |
| 20 | Prisma CLI | npm global | `prisma --version` | 1 |

### Tier 1 — SaaS Signup (manual)

Sign up and obtain API keys/credentials. Written to `D:\StreamHeaven\config\saas-checklist.md`.

- AWS (IAM user, S3 bucket, Secrets Manager)
- Cloudflare (Workers, R2, KV, D1, DNS)
- Firebase (Auth, Storage, FCM project)
- Sentry (org + project DSN)
- Agora (App ID + App Certificate)
- Zego (App ID + Sign Key)
- OpenAI (API key — GPT-4)
- Razorpay (Key ID + Secret)
- Twilio (Account SID + Auth Token)
- MSG91 (Auth Key + Template ID)
- Mixpanel (Project Token)
- Jira (workspace + project key)
- Figma (team + file access)
- Notion (workspace + integration token)

### Tier 2 — Mac-Only (checklist only)

Written to `D:\StreamHeaven\config\mac-checklist.md`.

- Xcode 15+ (App Store on Mac)
- iOS Simulator
- Apple Developer Program ($99/yr)
- iPhone physical test device
- macOS host for CI iOS builds

### Tier 3 — Production Infra (cloud console)

- AWS EKS cluster
- Kafka cluster (AWS MSK or self-hosted)
- Elasticsearch / OpenSearch
- Redis Cluster (ElastiCache)
- CloudFront distribution
- S3 bucket with lifecycle rules
- AWS Secrets Manager secrets

### Tier 4 — Business / Legal

- GST registration + GSTIN
- Company PAN
- Domain (streamheaven.in / .app)
- App Store Connect account setup
- Play Console developer account ($25)
- Razorpay KYC
- Legal ToS + Privacy Policy documents

---

## D: Drive Layout

```
D:\StreamHeaven\
  tools\
    npm-global\       <- npm prefix (all global CLIs)
    Git\              <- Git portable (if winget C: not available)
  logs\
    toolstack-bootstrap.log
  config\
    saas-checklist.md
    mac-checklist.md
  repos\
    Stream Heaven\    <- project root
```

---

## Validation Checklist

Run after installation:

```powershell
# Verify core tools
git --version
node --version && npm --version
docker --version && docker compose version
code --version
gh --version
aws --version
flutter --version
nest --version
firebase --version
wrangler --version
pnpm --version

# Verify Docker services
docker compose -f docker-compose.yml up -d postgres redis
docker ps
```

---

## Environment Variables

Store in `.env` files (never commit). Reference only:

```
# Auth service
JWT_SECRET=<generate>
FIREBASE_PROJECT_ID=<from Firebase console>

# Agora
AGORA_APP_ID=<from Agora console>
AGORA_APP_CERTIFICATE=<from Agora console>

# Zego
ZEGO_APP_ID=<from Zego console>
ZEGO_SIGN_KEY=<from Zego console>

# Payment
RAZORPAY_KEY_ID=<from Razorpay dashboard>
RAZORPAY_KEY_SECRET=<from Razorpay dashboard>

# SMS
MSG91_AUTH_KEY=<from MSG91>
TWILIO_ACCOUNT_SID=<from Twilio>
TWILIO_AUTH_TOKEN=<from Twilio>

# AWS
AWS_ACCESS_KEY_ID=<IAM user>
AWS_SECRET_ACCESS_KEY=<IAM user>
AWS_REGION=ap-south-1

# Cloudflare
CLOUDFLARE_ACCOUNT_ID=<from CF dashboard>
CLOUDFLARE_API_TOKEN=<from CF dashboard>
```

---

## Handoff

After Tier 0 PASS, hand off to:
- `ai-agents/meta/local-dev-bootstrap-agent.md` — Phase 1 service startup (NestJS + Docker)
- `ai-agents/meta/d-drive-dev-bootstrap-agent.md` — D: drive runtime bootstrap
