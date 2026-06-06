# Stream Heaven Monorepo Structure

> Authoritative map of the Stream Heaven workspace. All engineers and AI agents must place code, docs, and configs in the correct paths.

## Overview

Stream Heaven is a **pnpm + Turborepo** monorepo hosting four Flutter consumer apps, eight NestJS microservices, shared packages, infrastructure-as-code, platform governance, and 400+ AI agent definitions for parallel Cursor development.

```
stream-heaven/
├── master-governance-prompt.md    # Root pointer → platform-governance/MASTER-GOVERNANCE-PROMPT.md
├── README.md                      # Ecosystem overview and multi-chat workflow
├── package.json                   # Root scripts (turbo build|dev|test|lint)
├── pnpm-workspace.yaml            # Workspace package globs
├── turbo.json                     # Task pipeline config
│
├── platform-governance/           # Phase 1 — engineering rules, checklists, vision
├── ai-agents/                     # Phases 2–20 — agent definitions by domain
├── apps/                          # Flutter applications
│   ├── social-app/
│   ├── livestream-app/
│   ├── astro-app/
│   ├── media-app/
│   └── mobile/                    # Optional unified shell / deep-link host (future)
├── services/                      # NestJS microservices (backend)
├── packages/                      # Shared Dart/TS libraries
├── infrastructure/                # Terraform, K8s, CI/CD templates
├── api-platform/                  # Public developer API layer
├── analytics-platform/            # Event tracking, warehouse, dashboards
├── docs/                          # Architecture docs, ADRs, contract overviews
└── scripts/                       # Generators (governance, agents)
```

## Apps Layer (`apps/`)

Each app is a standalone Flutter project consuming shared packages. Agents live in `{app}/agents/` for domain-specific Cursor workflows.

| App | Package ID | Primary Backend Services | Realtime |
|-----|------------|--------------------------|----------|
| Social App | `com.streamheaven.social` | social-service, user-service | Socket.IO (DMs, typing) |
| Livestream App | `com.streamheaven.live` | livestream-service, wallet-service | Socket.IO + Agora/Zego |
| Astro App | `com.streamheaven.astro` | user-service, wallet-service | Push; optional Socket |
| Media App (OTT) | `com.streamheaven.media` | media-service, wallet-service | Push; HLS playback |

### Expected Flutter Layout (per app)

```text
apps/{app}/lib/
  main.dart
  app.dart                    # MaterialApp.router + GoRouter
  core/network/api_client.dart
  core/l10n/                  # ARB files: en, hi, te, ta, kn, ml, bn, mr, pa
  features/{feature}/
    data/                     # repositories, DTO mappers
    domain/                   # entities, use cases
    presentation/             # screens, Riverpod controllers
  shared/widgets/
```

## Services Layer (`services/`)

NestJS microservices. One service = one deployable unit with its own `package.json`, Dockerfile, and health endpoint.

| Service | Port (local) | Ownership |
|---------|--------------|-----------|
| api-gateway | 3000 | Routing, JWT validation, rate limits, request IDs |
| auth-service | 3001 | Firebase verify, OTP, refresh tokens, device binding |
| user-service | 3002 | Profiles, avatars, preferences, locale, blocks |
| social-service | 3003 | Posts, feed, comments, follows, moderation hooks |
| livestream-service | 3004 | Rooms, Agora/Zego tokens, gifts, viewer counts |
| wallet-service | 3005 | Coins, ledger, IAP receipts, payouts |
| media-service | 3006 | Catalog, entitlements, playback URLs, DRM |
| notification-service | 3007 | FCM push, SMS OTP relay, in-app inbox |

**Future:** `games-service` for Teen Patti, Ludo, Rummy (see `ai-agents/games/`).

### Expected NestJS Layout (per service)

```text
services/{service}/src/
  main.ts
  app.module.ts
  modules/{domain}/
    {domain}.module.ts
    {domain}.controller.ts
    {domain}.service.ts
    dto/
    entities/
  common/guards/ filters/ interceptors/
```

## Packages Layer (`packages/`)

Shared code only — no app-specific UI or service-specific business logic.

| Package | Language | Purpose |
|---------|----------|---------|
| shared-contracts | TypeScript + Dart (generated) | OpenAPI/JSON Schema, event schemas, API DTOs |
| shared-types | TypeScript + Dart | Domain types, enums, error codes |
| shared-utils | TypeScript + Dart | Retry, date/locale helpers, idempotency keys |
| design-system | Dart (Flutter) | Tokens, components, themes for all four apps |

Contract-first rule: define changes in `shared-contracts` before implementing in apps or services. See [`shared-contracts-overview.md`](shared-contracts-overview.md).

## AI Agents (`ai-agents/`)

Agent `.md` files are **not executable code** — they are Cursor prompt templates organized by phase:

| Phase Range | Domains |
|-------------|---------|
| 2–4 | executive, master-brain, orchestration |
| 5 | core-engineering (frontend, backend, database, realtime, infrastructure, reliability) |
| 6–7 | design-system, user-experience-intelligence |
| 10–15 | gift-effects, cosmetics, creator-economy, economy, data-science, growth-ai |
| 18–20 | identity-platform, event-system, safety, ml-platform, games, etc. |

App-specific agents live under `apps/{app}/agents/`. Full catalog: [`ai-agents/AGENT-REGISTRY.md`](../ai-agents/AGENT-REGISTRY.md).

## Platform Layers

| Path | Phase | Purpose |
|------|-------|---------|
| `api-platform/agents/` | 19 | Public API gateway, versioning, developer portal |
| `analytics-platform/agents/` | 19 | Event tracking, warehouse, realtime metrics |
| `infrastructure/` | — | Terraform modules, EKS, RDS, Redis, S3, Cloudflare |

## Documentation (`docs/`)

| Path | Purpose |
|------|---------|
| `docs/monorepo-structure.md` | This file |
| `docs/shared-contracts-overview.md` | Contract-first API and event conventions |
| `docs/adr/SH-###.md` | Architecture Decision Records |

## Branching & CI Conventions

- Branch: `feature/SH-{ticket}-{slug}` or `fix/SH-{ticket}-{slug}`
- Commits: Conventional Commits with scope = app or service id
- Turbo tasks: `build`, `test`, `lint`, `typecheck` run per affected package
- ADR required for new services, schema breaking changes, or auth model changes

## Multi-Chat Development Workflow

1. Paste `platform-governance/MASTER-GOVERNANCE-PROMPT.md` into every Cursor chat
2. Select agent from `AGENT-REGISTRY.md`
3. Work within assigned path boundaries (app vs service vs package)
4. Hand off via agent **Outputs** section and update ADR if architectural

## Phase 1 Development Priority

After scaffolding (Phases 0–20 complete), implement in this order:

1. **Auth** — `auth-service` + Firebase + OTP + unified JWT claims
2. **Shared core** — `packages/shared-contracts`, `shared-types`, `shared-utils`
3. **Realtime** — Socket.IO gateway + Redis adapter + presence
4. **Profiles** — `user-service` + cross-app identity graph

See [`platform-governance/platform-roadmap.md`](../platform-governance/platform-roadmap.md) for timeline.

---

*Stream Heaven Platform — Monorepo Structure v1.0*
