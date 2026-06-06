# Stream Heaven — Multi-Chat Execution Guide

> How to run Stream Heaven development across **10 parallel Cursor chats**, each owning a domain without stepping on others.

## Prerequisites

1. Clone/open the monorepo: `Stream Heaven/`
2. Read [`platform-governance/MASTER-AI-OPERATING-SYSTEM.md`](../platform-governance/MASTER-AI-OPERATING-SYSTEM.md)
3. Keep [`ai-agents/AGENT-REGISTRY.md`](../ai-agents/AGENT-REGISTRY.md) open for agent lookup

---

## Setup (Once)

| Step | Action |
|------|--------|
| 1 | Enable **Agent Mode** (or Composer) in Cursor |
| 2 | Create **10 separate chats** — one per domain below |
| 3 | Pin each chat with a label: `SH-Chat-01-Governance`, etc. |
| 4 | Paste the **full master prompt** into each chat on first message |
| 5 | Attach only the folders listed for that chat (reduces context noise) |

---

## Chat Map

| # | Chat Name | Attach Folders | Primary Agents | Deliverables |
|---|-----------|----------------|----------------|--------------|
| **1** | Governance + Architecture | `platform-governance/`, `docs/`, `packages/` | `chief-architect`, `adr-writer-agent`, `api-contract-author` | ADRs, RFCs, standards updates, contract schemas |
| **2** | Flutter Architecture | `apps/`, `packages/design-system/`, `ai-agents/core-engineering/frontend/` | `flutter-architect`, `riverpod-specialist`, `routing-specialist` | App shells, Riverpod, GoRouter, design system |
| **3** | Backend Microservices | `services/`, `packages/shared-contracts/`, `ai-agents/core-engineering/backend/` | `nestjs-architect`, `auth-service-agent`, `api-gateway-bootstrap-agent` | NestJS services, OpenAPI, Docker |
| **4** | Realtime + Livestream | `services/livestream-service/`, `apps/livestream-app/`, `ai-agents/core-engineering/realtime/` | `socketio-architect`, `livestream-architect`, `pk-battle-agent` | Socket.IO gateway, rooms, PK sync |
| **5** | Recommendations | `ai-agents/growth-ai/`, `ai-agents/data-science/`, `analytics-platform/` | `feed-ranking-agent`, `retention-optimizer`, `trend-detection-agent` | Ranking pipelines, feature store design |
| **6** | DevOps + K8s | `infrastructure/`, `ai-agents/core-engineering/infrastructure/` | `terraform-specialist`, `k8s-operator`, `observability-engineer` | Terraform, Helm, CI/CD |
| **7** | Wallet + Economy | `services/wallet-service/`, `ai-agents/economy/`, `ai-agents/creator-economy/` | `wallet-ledger-agent`, `gift-architecture-agent`, `payout-system-agent` | Ledger, gifts, VIP, payouts |
| **8** | OTT + Media | `apps/media-app/`, `services/media-service/`, `ai-agents/media-pipeline/` | `ott-catalog-agent`, `transcoding-pipeline-agent`, `video-player-agent` | Upload, transcode, HLS, CDN |
| **9** | Admin + Moderation | `ai-agents/safety/`, `ai-agents/community-governance/` | `content-safety-agent`, `trust-safety-reviewer`, `community-moderator-agent` | Admin RBAC, moderation pipelines |
| **10** | Testing + QA | `ai-agents/testing/`, `scripts/` | `e2e-test-architect`, `api-contract-test-agent`, `load-test-agent` | Tests, `validate-agents.mjs`, CI gates |

Per-chat detail stubs: [`docs/chats/`](chats/)

---

## Phase 1 Build Order (All Chats)

Phase 1 is **sequential across chats** even though chats run in parallel:

```
Chat 1: shared-contracts OpenAPI stubs + ADR for auth model
   ↓
Chat 3: auth-service + api-gateway (implements contracts)
   ↓
Chat 3: user-service profiles
   ↓
Chat 4: Socket.IO foundation + presence
   ↓
Chat 2: Flutter auth shell + profile screens (consumes contracts)
   ↓
Chat 10: contract tests + integration smoke tests
```

**Do not** start Chat 2 Flutter features or Chat 4 PK battles until Phase 1 foundation merges.

---

## Handoff Protocol

When a chat completes a unit of work:

1. **Outputs** — list files created/changed with paths
2. **Contracts** — note OpenAPI/AsyncAPI version bumps
3. **Blockers** — tag the downstream chat number
4. **ADR** — link `docs/adr/SH-###-*.md` if architectural
5. **Next agent** — name from `AGENT-REGISTRY.md`

Example handoff message:

```text
Chat 3 complete: auth-service scaffold
- services/auth-service/ (new)
- packages/shared-contracts/openapi/auth/v1/auth.openapi.yaml
- Blocker: none
- Next: Chat 2 invoke flutter-architect for login UI
- ADR: docs/adr/SH-001-firebase-otp-auth.md
```

---

## Conflict Avoidance Rules

| Rule | Owner |
|------|-------|
| OpenAPI schemas | Chat 1 approves; Chat 3 implements |
| Flutter shared widgets | Chat 2 only |
| NestJS service code | Chat 3 (except livestream realtime modules → Chat 4) |
| Socket event names | Chat 4 defines; all others consume |
| Terraform / K8s | Chat 6 only |
| Wallet ledger schema | Chat 7 only |

Never edit the same file from two chats simultaneously. Use feature branches: `feature/SH-{ticket}-{slug}`.

---

## Validation Commands

```bash
# Agent quality audit (Chat 10)
node scripts/validate-agents.mjs

# Future (Phase 1+)
pnpm contracts:generate
pnpm test
pnpm lint
```

---

## Recommended First Session Prompts

### Chat 1 — Start Phase 1 contracts

```text
[Paste MASTER-AI-OPERATING-SYSTEM.md]

Invoke api-contract-author. Create packages/shared-contracts/openapi/auth/v1/auth.openapi.yaml
and user/v1/user.openapi.yaml per docs/shared-contracts-overview.md. Write ADR SH-001 for Firebase OTP auth.
```

### Chat 3 — Bootstrap auth-service

```text
[Paste MASTER-AI-OPERATING-SYSTEM.md]

Invoke auth-service-agent. Scaffold services/auth-service/ as NestJS microservice implementing
packages/shared-contracts/openapi/auth/v1/. Include Dockerfile and health endpoint.
```

### Chat 4 — Realtime foundation

```text
[Paste MASTER-AI-OPERATING-SYSTEM.md]

Invoke socketio-architect. Design Socket.IO gateway module with Redis adapter, presence, and
platform-events.asyncapi.yaml event envelope. Output architecture doc only — no full implementation yet.
```

---

## Related Docs

- [`architecture-overview.md`](architecture-overview.md)
- [`monorepo-structure.md`](monorepo-structure.md)
- [`FINAL-READINESS-REPORT.md`](FINAL-READINESS-REPORT.md)
- [`platform-governance/platform-roadmap.md`](../platform-governance/platform-roadmap.md)

---

*Stream Heaven — Multi-Chat Execution Guide v1.0*
