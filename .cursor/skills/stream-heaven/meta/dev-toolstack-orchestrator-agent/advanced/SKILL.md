# Stream Heaven Dev Toolstack Orchestrator — Advanced Skill

**Phase:** 1 (prerequisite)
**Domain:** meta / toolstack
**Agent:** `ai-agents/meta/dev-toolstack-orchestrator-agent.md`

---

## Purpose

Multi-phase orchestration for the full Stream Heaven toolstack (150+ tools across 5 tiers). Produces idempotent Windows installs, SaaS/Mac checklists, environment variable templates, ADR-compliant decisions, and phase-gate verification before handing off to Phase 1 services.

---

## Execution Plan

### Phase Gate 0 — Prereq Audit

```powershell
# Check D: drive space (need >= 20 GB free)
$d = Get-PSDrive D -ErrorAction SilentlyContinue
if ($d) { Write-Host "D: free: $([math]::Round($d.Free/1GB,1)) GB" }

# Dry-run to discover missing tools
powershell -ExecutionPolicy Bypass -File scripts\bootstrap-dev-toolstack.ps1 -DryRun
```

### Phase Gate 1 — Core Tools (blocks Phase 1 services)

```powershell
powershell -ExecutionPolicy Bypass -File scripts\bootstrap-dev-toolstack.ps1 -Phase core
```

Required for PASS: `git`, `node`, `npm`, `docker`, `code`, `gh`, `aws`

### Phase Gate 2 — Mobile SDK (blocks Phase 2a Flutter)

```powershell
powershell -ExecutionPolicy Bypass -File scripts\bootstrap-dev-toolstack.ps1 -Phase mobile
```

Required for PASS: `flutter`, Android Studio installed, `dart`

### Phase Gate 3 — DevOps CLIs (blocks service deployments)

```powershell
powershell -ExecutionPolicy Bypass -File scripts\bootstrap-dev-toolstack.ps1 -Phase devops
```

Required for PASS: `firebase`, `wrangler`, `sentry-cli`, `nest`

### Phase Gate 4 — Infra Services (blocks DB-dependent services)

```powershell
powershell -ExecutionPolicy Bypass -File scripts\bootstrap-dev-toolstack.ps1 -Phase infra
```

Required for PASS: Postgres container healthy, Redis container healthy

---

## Master Tool Catalog

### Tier 0 — Windows Auto-Install

| # | Tool | winget ID / Method | Verify Cmd | Env Vars | Stream Heaven Phase |
|---|------|--------------------|------------|----------|---------------------|
| 1 | Git 2.x | `Git.Git` | `git --version` | — | 1 |
| 2 | Node.js 20 LTS | `OpenJS.NodeJS.LTS` | `node --version` | — | 1 |
| 3 | npm 10+ | bundled | `npm --version` | `npm_config_prefix` | 1 |
| 4 | pnpm | `npm install -g pnpm` | `pnpm --version` | — | 1 |
| 5 | Docker Desktop | `Docker.DockerDesktop` | `docker --version` | `DOCKER_HOST` | 1 |
| 6 | VS Code | `Microsoft.VisualStudioCode` | `code --version` | — | 1 |
| 7 | Cursor IDE | `Anysphere.Cursor` | `cursor --version` | — | 1 |
| 8 | GitHub CLI | `GitHub.cli` | `gh --version` | `GITHUB_TOKEN` | 1 |
| 9 | AWS CLI v2 | `Amazon.AWSCLI` | `aws --version` | `AWS_ACCESS_KEY_ID` `AWS_SECRET_ACCESS_KEY` `AWS_REGION` | 1 |
| 10 | Flutter SDK | `Google.Flutter` | `flutter --version` | `FLUTTER_ROOT` | 2a |
| 11 | Android Studio | `Google.AndroidStudio` | Studio installed | `ANDROID_HOME` `ANDROID_SDK_ROOT` | 2a |
| 12 | Java JDK 17 | `Microsoft.OpenJDK.17` | `java --version` | `JAVA_HOME` | 2a |
| 13 | NestJS CLI | `npm install -g @nestjs/cli` | `nest --version` | — | 1 |
| 14 | Firebase CLI | `npm install -g firebase-tools` | `firebase --version` | `FIREBASE_TOKEN` | 3 |
| 15 | Wrangler CLI | `npm install -g wrangler` | `wrangler --version` | `CLOUDFLARE_ACCOUNT_ID` `CLOUDFLARE_API_TOKEN` | 3 |
| 16 | Sentry CLI | `npm install -g @sentry/cli` | `sentry-cli --version` | `SENTRY_AUTH_TOKEN` `SENTRY_ORG` | 5 |
| 17 | TypeScript | `npm install -g typescript` | `tsc --version` | — | 1 |
| 18 | Prisma CLI | `npm install -g prisma` | `prisma --version` | `DATABASE_URL` | 1 |
| 19 | DBeaver CE | `dbeaver.dbeaver` | (GUI) | — | 1 |
| 20 | Postman | `Postman.Postman` | (GUI) | — | 1 |
| 21 | 7-Zip | `7zip.7zip` | `7z` | — | 1 |
| 22 | WinSCP | `WinSCP.WinSCP` | (GUI) | — | optional |
| 23 | pgAdmin 4 | `PostgreSQL.pgAdmin` | (GUI) | — | optional |

### Tier 1 — SaaS Accounts + API Keys

#### Cloud Infrastructure
| Service | Account URL | Keys Needed | Phase |
|---------|------------|-------------|-------|
| AWS | console.aws.amazon.com | IAM key, S3 bucket, Secrets Manager | 1 |
| Cloudflare | dash.cloudflare.com | Account ID, API Token, Zone ID | 1 |
| Firebase | console.firebase.google.com | Project ID, Service Account JSON, FCM key | 1 |

#### Communication
| Service | Account URL | Keys Needed | Phase |
|---------|------------|-------------|-------|
| MSG91 | msg91.com | Auth Key, Template ID | 1 |
| Twilio | twilio.com | Account SID, Auth Token | 1 |
| Firebase FCM | (included above) | Server Key | 2 |

#### Video / Audio SDKs
| Service | Account URL | Keys Needed | Phase |
|---------|------------|-------------|-------|
| Agora | console.agora.io | App ID, App Certificate | 9 |
| Zego | console.zegocloud.com | App ID, Sign Key | 9 |

#### Payments
| Service | Account URL | Keys Needed | Phase |
|---------|------------|-------------|-------|
| Razorpay | dashboard.razorpay.com | Key ID, Key Secret | 12 |
| Stripe (backup) | dashboard.stripe.com | Publishable Key, Secret Key | 12 |

#### Monitoring / Analytics
| Service | Account URL | Keys Needed | Phase |
|---------|------------|-------------|-------|
| Sentry | sentry.io | DSN, Auth Token, Org slug | 5 |
| Mixpanel | mixpanel.com | Project Token | 5 |
| OpenAI | platform.openai.com | API Key | 14 |

#### Project Management
| Service | Account URL | Keys Needed | Phase |
|---------|------------|-------------|-------|
| Jira | atlassian.com | Workspace, Project Key | 1 |
| Figma | figma.com | Team, File IDs | 1 |
| Notion | notion.so | Integration Token, DB IDs | 1 |

### Tier 2 — Mac-Only / Hardware

| Tool | How | Phase |
|------|-----|-------|
| Xcode 15+ | Mac App Store | 2a |
| iOS Simulator | Xcode Components | 2a |
| Apple Developer Program | developer.apple.com ($99/yr) | before App Store |
| iPhone Test Device | Physical device + UDID | 2a |
| macOS CI Host | GitHub Actions `macos-latest` or local Mac | before iOS release |

### Tier 3 — Production Infra

| Service | How | Phase |
|---------|-----|-------|
| AWS EKS | Terraform / eksctl | 5+ |
| Kafka (AWS MSK) | AWS Console | 5+ |
| Elasticsearch | AWS OpenSearch Service | 5+ |
| Redis Cluster | AWS ElastiCache | 5+ |
| CloudFront CDN | AWS Console | 3+ |
| AWS S3 Media Bucket | AWS CLI / Console | 3+ |
| AWS Secrets Manager | AWS CLI | 1+ |

### Tier 4 — Business / Legal

| Item | Notes | When |
|------|-------|------|
| GST Registration | Required for Indian payments | Before revenue |
| Company PAN | Required for Razorpay KYC | Before revenue |
| Domain (streamheaven.in) | GoDaddy / Google Domains | Before launch |
| App Store Connect | Apple ($99/yr) | Before iOS release |
| Play Console | Google ($25 one-time) | Before Android release |
| Razorpay KYC | Submit business docs | Before payments go live |
| ToS + Privacy Policy | Legal counsel | Before public launch |

---

## SaaS Setup Checklist Template

This is written automatically to `D:\StreamHeaven\config\saas-checklist.md` by the bootstrap script.

```markdown
# Stream Heaven SaaS Setup Checklist

## AWS
- [ ] Create IAM user with programmatic access
- [ ] Attach policy: S3FullAccess, SecretsManagerReadWrite
- [ ] Create S3 bucket: stream-heaven-media-prod
- [ ] Enable versioning + lifecycle rules on bucket
- [ ] Create Secrets Manager secret: /streamheaven/prod/api-keys

## Cloudflare
- [ ] Sign up and add domain
- [ ] Create Workers project for API gateway edge
- [ ] Create R2 bucket for media CDN
- [ ] Create KV namespace for session/cache
- [ ] Create D1 database for edge data
- [ ] Note Account ID and generate API Token

## Firebase
- [ ] Create project: stream-heaven-prod
- [ ] Enable Authentication (Phone OTP provider)
- [ ] Enable Storage
- [ ] Enable Cloud Messaging (FCM)
- [ ] Download service-account.json (DO NOT COMMIT)

## Agora
- [ ] Create project in Agora Console
- [ ] Note App ID and App Certificate
- [ ] Enable media relay for PK battles

## Zego
- [ ] Create project in Zego Console
- [ ] Note App ID and Sign Key
- [ ] Enable RTC and IM

## OpenAI
- [ ] Create API key (GPT-4 access required)
- [ ] Set usage limits

## Razorpay
- [ ] Create account (test mode first)
- [ ] Complete KYC for production
- [ ] Note Key ID and Key Secret

## MSG91
- [ ] Create account
- [ ] Register OTP template
- [ ] Note Auth Key and Template ID

## Sentry
- [ ] Create organization: stream-heaven
- [ ] Create projects: api-gateway, auth-service, flutter-mobile
- [ ] Note DSNs and Auth Token
```

---

## Mac-Only Checklist Template

Written to `D:\StreamHeaven\config\mac-checklist.md`:

```markdown
# Stream Heaven Mac / iOS Checklist

## Required on a Mac Machine
- [ ] macOS Sonoma 14+ or Ventura 13+
- [ ] Xcode 15+ (from App Store, ~13 GB)
- [ ] iOS Simulator installed via Xcode Components
- [ ] Command Line Tools: xcode-select --install

## Apple Developer Account
- [ ] Sign up: developer.apple.com ($99/year)
- [ ] Accept Developer Agreement
- [ ] Create App ID: com.streamheaven.app

## App Store Connect
- [ ] Create app listing: Stream Heaven
- [ ] Set up TestFlight for beta
- [ ] Add test devices via UDID

## Physical Device Testing
- [ ] iPhone running iOS 16+ for Agora/Zego RTC
- [ ] Register UDID in Apple Developer Portal
- [ ] Trust developer certificate on device
```

---

## Environment Variable Conventions

All stored in `.env` files per service (never committed to git):

```
# services/auth-service/.env
DATABASE_URL=postgresql://postgres:password@localhost:5432/streamheaven
JWT_SECRET=<generate: openssl rand -hex 32>
FIREBASE_PROJECT_ID=<from Firebase console>
MSG91_AUTH_KEY=<from MSG91>

# services/api-gateway/.env
JWT_SECRET=<same as auth-service>
REDIS_URL=redis://localhost:6379

# services/media-service/.env
AWS_ACCESS_KEY_ID=<IAM user>
AWS_SECRET_ACCESS_KEY=<IAM user>
AWS_REGION=ap-south-1
AWS_S3_BUCKET=stream-heaven-media-prod
CLOUDFLARE_ACCOUNT_ID=<from CF>
CLOUDFLARE_API_TOKEN=<from CF>

# apps/mobile/.env
AGORA_APP_ID=<from Agora>
ZEGO_APP_ID=<from Zego>
RAZORPAY_KEY_ID=<from Razorpay>
OPENAI_API_KEY=<from OpenAI>
SENTRY_DSN=<from Sentry>
```

---

## ADR Guidance

When selecting infrastructure tools, create ADRs in `docs/adr/`:

- **ADR-xxx: Agora vs Zego for RTC** — Agora primary (PK battles, multi-host), Zego fallback
- **ADR-xxx: PostgreSQL vs MongoDB** — PostgreSQL for all transactional data (contracts, wallets, profiles)
- **ADR-xxx: Socket.IO vs WebSockets** — Socket.IO for real-time (presence, gifts, chat) via Redis adapter
- **ADR-xxx: Firebase Auth vs custom OTP** — Firebase for OTP in Phase 1; consider MSG91 direct for cost savings
- **ADR-xxx: AWS S3 vs Cloudflare R2** — R2 for media CDN (no egress fees); S3 for backup/archive

---

## Phase Gate Definitions

| Gate | Required Tools | Blocks |
|------|---------------|--------|
| GATE_0 | git, node, npm, docker | All phases |
| GATE_1_CORE | + code, gh, aws | Phase 1 services |
| GATE_2_MOBILE | + flutter, android-studio, dart | Phase 2a Flutter |
| GATE_3_DEVOPS | + firebase, wrangler, nest | Deploy to cloud |
| GATE_4_INFRA | postgres container, redis container | DB-dependent services |
| GATE_SAAS | AWS IAM, Firebase, Sentry DSN | Monitored production |

---

## Handoff Protocol

After all gates pass:

1. Signal `TOOLSTACK_TIER0_PASS` to `ai-agents/meta/local-dev-bootstrap-agent.md`
2. Pass install log path: `D:\StreamHeaven\logs\toolstack-bootstrap.log`
3. Pass checklist paths: `saas-checklist.md`, `mac-checklist.md`
4. Confirm: `docker compose up -d postgres redis` healthy

```powershell
# Final verification before handoff
docker compose -f docker-compose.yml ps
node --version && npm --version && git --version && docker --version
Write-Host "Toolstack Tier 0 PASS - proceed to local-dev-bootstrap-agent"
```
