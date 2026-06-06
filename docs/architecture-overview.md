# Stream Heaven — Architecture Overview

> Ecosystem architecture: folder structure, service map, and data flow. For folder details see [`monorepo-structure.md`](monorepo-structure.md).

---

## System Context

Stream Heaven is a **multi-app entertainment super ecosystem** — four Flutter consumer apps sharing one identity, wallet, realtime layer, and NestJS microservices backend on AWS.

```
┌─────────────────────────────────────────────────────────────────┐
│                     Flutter Apps (Client)                        │
│  Social App │ Livestream App │ Astro App │ Media App (OTT)      │
└─────────────┬───────────────────────────────────────────────────┘
              │ HTTPS / WSS
              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API Gateway (:3000)                         │
│         JWT validation · rate limits · request IDs               │
└─────────────┬───────────────────────────────────────────────────┘
              │
    ┌─────────┼─────────┬─────────────┬──────────────┐
    ▼         ▼         ▼             ▼              ▼
 auth      user      social      livestream      wallet
 :3001     :3002     :3003        :3004           :3005
    │         │         │             │              │
    └─────────┴─────────┴──────┬──────┴──────────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
         PostgreSQL          Redis          AWS S3
         (primary DB)    (cache/pubsub)   (media)
                               │
                               ▼
                    Socket.IO (Redis adapter)
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
         Agora/Zego        Cloudflare CDN    FCM Push
         (live video)      (delivery)     (notifications)
```

---

## Monorepo Layers

| Layer | Path | Status |
|-------|------|--------|
| Governance | `platform-governance/` | ✅ 22 docs complete |
| AI Agents | `ai-agents/`, `apps/*/agents/` | ✅ 420+ definitions |
| Flutter Apps | `apps/social-app`, `livestream-app`, `astro-app`, `media-app` | ⚠️ Scaffold only (`.gitkeep`) |
| Backend Phase 1 | `services/auth-service`, `user-service`, `api-gateway`, `realtime-gateway` | ✅ Implemented |
| Backend Phase 2+ | `services/social-service`, etc. | ⚠️ README stubs |
| Shared Packages | `packages/shared-contracts`, `shared-types`, `shared-utils` | ✅ Phase 1 packages |
| Infrastructure | `infrastructure/local/` | ✅ Docker compose + init-db |
| API Platform | `api-platform/` | ⚠️ Agent defs only |
| Analytics | `analytics-platform/` | ⚠️ Agent defs only |
| Documentation | `docs/` | ✅ Structure + guides |
| CI / Remediation | `.github/workflows/phase1-ci.yml`, `scripts/phase1-remediate.ps1` | ✅ Phase 1 pipeline |

---

## Microservices Map

| Service | Port | Responsibility | Phase |
|---------|------|----------------|-------|
| `api-gateway` | 3000 | Routing, JWT, rate limits | 1 ✅ |
| `auth-service` | 3001 | Firebase verify, OTP, sessions | 1 ✅ |
| `user-service` | 3002 | Profiles, preferences, blocks | 1 ✅ |
| `realtime-gateway` | 3009 | Socket.IO, Redis adapter, presence | 1 ✅ |
| `social-service` | 3003 | Feed, posts, comments, follows | 2 |
| `livestream-service` | 3004 | Rooms, Agora/Zego tokens, gifts | 2 |
| `wallet-service` | 3005 | Coins, ledger, IAP, payouts | 3 |
| `media-service` | 3006 | OTT catalog, playback, DRM | 4 |
| `notification-service` | 3007 | FCM, SMS OTP, in-app inbox | 1–2 |
| `games-service` | TBD | 12 casual games (future) | 3+ |

---

## Data Flow Patterns

### Authentication (Phase 1)

```
Flutter App → Firebase Auth (OTP) → auth-service verifies token
  → issues SH custom claims (sh_uid, locale, apps[])
  → api-gateway validates JWT on all /v1/* requests
  → forwards X-SH-User-Id to downstream services
```

### Realtime Events (Phase 1–2)

```
Client ←Socket.IO→ livestream-service / gateway
                      ↕ Redis pub/sub
              social-service, wallet-service (gift events)
```

Event envelope: see [`shared-contracts-overview.md`](shared-contracts-overview.md)

### Media Pipeline (Phase 4)

```
Creator upload → media-service → S3 → transcoding → HLS segments
  → Cloudflare CDN → Flutter player (adaptive bitrate)
```

### Wallet / Gifts (Phase 3)

```
Viewer sends gift → wallet-service (idempotent ledger debit)
  → event wallet.gift.sent → livestream-service (animation trigger)
  → analytics-platform (engagement scoring)
```

---

## Shared Contracts (Contract-First)

All API and event schemas live in `packages/shared-contracts/`:

- **OpenAPI 3.1** — REST endpoints per service domain
- **AsyncAPI** — domain events (`user.profile.updated`, `wallet.gift.sent`, etc.)
- **Generated** — TypeScript DTOs (NestJS) + Dart models (Flutter)

No service or app may define duplicate DTOs. Changes require ADR if breaking.

---

## Multi-Chat Architecture Ownership

| Concern | Chat | Path |
|---------|------|------|
| Governance & ADRs | 1 | `platform-governance/`, `docs/adr/` |
| Flutter UI & state | 2 | `apps/`, `packages/design-system/` |
| NestJS services | 3 | `services/` |
| Socket.IO & live video | 4 | `services/livestream-service/`, realtime agents |
| ML & recommendations | 5 | `ai-agents/growth-ai/`, `data-science/` |
| Infra & CI/CD | 6 | `infrastructure/` |
| Wallet & monetization | 7 | `services/wallet-service/` |
| OTT & transcoding | 8 | `services/media-service/`, `apps/media-app/` |
| Safety & admin | 9 | `ai-agents/safety/` |
| Tests & validation | 10 | `ai-agents/testing/`, `scripts/` |

Guide: [`MULTI-CHAT-EXECUTION-GUIDE.md`](MULTI-CHAT-EXECUTION-GUIDE.md)

---

## Games Subsystem (Future)

12 game titles embedded in Livestream App via `games-service`:

- Socket.IO state sync (`games-socket-sync-agent`)
- Wallet settlements (`games-economy-agent`)
- Fair play / CSPRNG (`games-fair-play-agent`)

Agents: `ai-agents/games/`

---

## Security & Compliance

- **Auth:** Firebase + OTP; no secrets in code (AWS Secrets Manager)
- **PII:** India DPDP Act compliance; age gates for wallet/games
- **Moderation:** content-safety pipeline before Phase 2 social launch
- **Payments:** integer minor units (paise); idempotency keys on all mutations

Governance: `platform-governance/security-rules.md`

---

## Observability (Target)

| Signal | Tool (Phase 5) |
|--------|-----------------|
| Logs | centralized JSON → CloudWatch / Loki |
| Metrics | Prometheus + Grafana |
| Traces | OpenTelemetry → Jaeger |
| Alerts | PagerDuty per `incident-severity-rules.md` |

---

## Phase Roadmap Summary

| Phase | Focus | Key Services |
|-------|-------|--------------|
| 1 | Foundation | auth, user, shared-contracts, Socket.IO base |
| 2 | Social + Live | social-service, livestream-service |
| 3 | Economy | wallet-service, gifts, games |
| 4 | Media + AI | media-service, recommendations |
| 5 | Scale | K8s, analytics, enterprise |

Detail: [`platform-governance/platform-roadmap.md`](../platform-governance/platform-roadmap.md)

---

*Stream Heaven Architecture Overview v1.0*
