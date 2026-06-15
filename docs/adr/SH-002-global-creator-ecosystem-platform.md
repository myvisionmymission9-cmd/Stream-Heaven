# SH-002: Global Creator Ecosystem Platform Architecture

| Field | Value |
|-------|-------|
| **Status** | Proposed |
| **Date** | 2026-06-15 |
| **Deciders** | platform-orchestrator, chief-architect, feed-ranking-agent, livestream-architect |
| **Consulted** | SH-001 (auth), platform-governance/platform-roadmap.md, docs/architecture-overview.md |

> **Note:** ADR number is **SH-002** because [SH-001-auth-and-identity.md](./SH-001-auth-and-identity.md) already records Phase 1 identity decisions.

## Context

Stream Heaven targets a **production-grade global creator ecosystem** combining TikTok-style short video, Instagram-style posts and profiles, YouTube-grade transcoding and delivery, Bigo-style live streaming and audio rooms, gifting, wallet, celebrity verification, AI recommendations, community, moderation, fraud prevention, and crypto-ready infrastructure.

The repo today has:
- **Phase 1 complete:** `auth-service`, `user-service`, `api-gateway`, `realtime-gateway`, Phase 1 OpenAPI (`auth`, `user`, `social`, `livestream` stubs), Flutter `apps/mobile` shell (OTP, profile, feed/live stubs)
- **420+ agent definitions** across domains; **Phase 2+ product code largely unbuilt**
- **Four-app strategy:** Social, Livestream, Astro, Media (OTT) sharing one identity, wallet, and realtime layer

Constraints from governance:
- Contract-first — all REST/event schemas in `packages/shared-contracts/` before service implementation
- Database-per-service; no duplicate microservices
- Phase 1 gate: auth → shared-contracts → realtime → profiles before feature work
- No secrets in code; integer minor units for money; idempotency on wallet mutations
- India DPDP, age gates for wallet/games, moderation before social scale

The user's 20-module vision maps onto Stream Heaven's existing four-app monorepo rather than a greenfield single app. This ADR records how to integrate the vision without forking architecture.

## Decision

### 1. Product topology — one identity, unified feed surface, four apps

| User module cluster | Primary app | Primary service(s) | Contract domain |
|---------------------|-------------|--------------------|-----------------|
| Home feed, TikTok video, creator posts, trending | Social App | `social-service`, `media-service` (playback URLs) | `social.v1`, `media.v1` (future) |
| Video processing & YouTube delivery | Media App + Social | `media-service`, async workers | `media.v1`, Kafka jobs |
| Creator / celebrity profiles | All apps | `user-service`, `creator-service` (Phase 12) | `user.v1`, `creator.v1` (future) |
| AI recs & trending | Cross-cutting | `recommendation-service` (Phase 14), Redis feature store | `recommendation.v1` (future) |
| Live + audio rooms + gifts | Livestream App | `livestream-service`, `wallet-service` | `livestream.v1`, `wallet.v1` |
| Wallet & payouts | Cross-app | `wallet-service` | `wallet.v1` |
| Community | Social App | `social-service` (communities namespace) | `social.v1` extensions |
| Notifications | Cross-app | `notification-service` | `notification.v1` (future) |
| Moderation & fraud | Platform | `moderation-service`, `trust-service` (future) | events + admin API |
| Analytics & admin | Platform | `analytics-platform`, admin BFF | read models, internal APIs |

**Home feed** is implemented as a **composition layer** in `social-service`: tabbed surfaces (Trending, Videos, Following, Celebrity, Create) backed by distinct ranking pipelines that share a common post/video envelope and cursor pagination from `social.v1.yaml`.

### 2. Ranking and scoring — spec-owned formulas, ML-owned features

User-provided formulas are **canonical product specs** stored in [`docs/GLOBAL-CREATOR-ECOSYSTEM-ROADMAP.md`](../GLOBAL-CREATOR-ECOSYSTEM-ROADMAP.md):

- **Feed score:** `(UserInterest × 0.40) + (VideoQuality × 0.25) + (WatchTime × 0.20) + (Recency × 0.10) + (Diversity × 0.05)`
- **Trending score:** `(EngagementRate × 0.30) + (Velocity × 0.25) + (WatchTime × 0.25) + (CompletionRate × 0.10) + (Recency × 0.10)`
- **Short-video rank priority (tie-break):** Watch Time > Completion Rate > Rewatch Rate > Shares > Follows > Likes

**Implementation split:**
- **Phase 2 MVP:** rule-based scoring in `social-service` using Redis counters and PostgreSQL aggregates
- **Phase 14+:** offline/online ML via `ai-agents/growth-ai/`, `ai-agents/data-science/` with feature store; formulas become weighted ensemble outputs, not hard-coded in app code

### 3. Media pipeline — async, contract-first, S3 + CloudFront

```
Client upload → media-service (presigned S3) → Kafka `media.upload.received`
  → worker: scan → FFmpeg transcode (240p–4K HLS) → thumbnail → CDN invalidate
  → `media.asset.ready` event → social/livestream attach assetId
```

- **FFmpeg** workers are stateless K8s jobs (Phase 17+); local dev uses Docker worker stub
- **Playback:** HLS primary; MPEG-DASH optional for OTT (Media App)
- **Analytics:** watch progress, completion, rewatch emitted as `engagement.*` events to Kafka → analytics warehouse (Phase 19)

### 4. Live streaming — Agora primary, LiveKit fallback

- **Default RTC:** Agora SDK (existing governance stack); **LiveKit** as ADR-approved fallback for self-hosted/regulatory regions
- Room state in `livestream-service`; gifts debit via `wallet-service` with idempotency key; animation trigger via Socket.IO + Redis pub/sub
- Audio rooms: seat model (8/16/24) as room metadata; moderators via RBAC (`MODERATOR` role from SH-001)

### 5. Economy — wallet ledger as single source of truth

```
Fiat/UPI/IAP → wallet-service (credit coins) → gift send (debit viewer, credit creator escrow)
  → creator balance → withdrawal request → payout rail (UPI/bank)
```

- **Gifts** are catalog items in wallet domain; **livestream** only orchestrates UX and realtime fanout
- **Crypto-ready:** `wallet.v1` reserves `chainId`, `walletAddress`, `web3TxHash` optional fields; no on-chain logic until Phase 20 web3 agents; fiat ledger remains authoritative

### 6. Celebrity verification — manual gate on automated checks

Automated checks (linked IG/YT/X validity, follower thresholds, engagement quality, face match) produce a **verification candidate** record. **Admin approval** (Phase 20 admin panel) sets `celebrityVerified: true` on profile with audit trail. Benefits: badge, priority distribution weights in feed/trending pipelines.

### 7. Event bus evolution

| Phase | Transport | Use |
|-------|-----------|-----|
| 1–2 | Redis pub/sub + Socket.IO | presence, live chat, gift animations |
| 8+ | Kafka | engagement signals, transcode jobs, analytics, fraud |
| 18 | Unified event schema | `packages/shared-contracts/events/` per domain |

### 8. Search & discovery

Elasticsearch (Phase 19) indexes posts, creators, hashtags, live rooms. Until then, PostgreSQL + Redis for MVP search.

### 9. Client strategy

- **Now:** `apps/mobile` unified Phase 2a shell; feature modules map to future four-app split via `AppId` and flavor builds
- **Later:** separate store listings per app (`com.streamheaven.social`, etc.) sharing `packages/shared-*`

### 10. Phasing alignment (governance phases 1–20)

Execution follows Stream Heaven agent phase numbers (not calendar quarters):

| Governance phase | User modules delivered (MVP → production) |
|------------------|----------------------------------------|
| **1** ✅ | Identity, profiles, contracts, realtime base (modules 20 partial) |
| **2–3** | Home feed tabs, post system MVP, TikTok feed shell (1, 4 partial) |
| **8–9** | Full social graph, reels ranking, live rooms MVP (2, 10 partial) |
| **10–11** | Gift animations, wallet ledger MVP (11, 12) |
| **12–13** | Creator dashboard, payouts, economy (6, 17 partial) |
| **14–15** | AI recommendation + trending production (7, 8) |
| **16–17** | OTT delivery, FFmpeg pipeline (3, 5, 19 partial) |
| **18–20** | Community, notifications, moderation, fraud, admin, celebrity, crypto-ready (9, 13–16, 18) |

Detail: [`docs/GLOBAL-CREATOR-ECOSYSTEM-ROADMAP.md`](../GLOBAL-CREATOR-ECOSYSTEM-ROADMAP.md)

## Consequences

### Positive

- Reuses Phase 1 foundation; no throwaway prototype
- Clear contract boundaries enable parallel multi-chat execution (Flutter, backend, realtime, ML, wallet)
- User ranking formulas preserved as testable spec references
- Four-app split prevents monolithic Flutter binary while sharing wallet/identity

### Negative / Trade-offs

- **Time-to-full-vision:** 20-module scope spans phases 1–20; MVP is feed + live + wallet, not all features day one
- **Dual ranking systems:** rule-based MVP vs ML production requires migration plan and A/B infra
- **RTC vendor dual stack:** Agora + LiveKit increases integration test surface
- **Celebrity manual review** does not scale without admin tooling (Phase 18+)

### Follow-up Actions

- [ ] Accept ADR and link from `docs/architecture-overview.md`
- [ ] Extend `packages/shared-contracts/openapi/wallet.v1.yaml` (stub added in SH-002 workstream)
- [ ] Phase 2: implement `social-service` feed tabs + post types per `social.v1.yaml`
- [ ] Phase 2: wire `apps/mobile` feed to live API
- [ ] ADR for `recommendation-service` extraction when ML phase starts (Phase 14)
- [ ] Notify Chat owners: 2 (Flutter), 3 (Backend), 4 (Realtime), 5 (ML), 7 (Wallet), 8 (Media), 9 (Safety)

## Alternatives Considered

| Option | Why rejected |
|--------|--------------|
| Single mega-app for all 20 modules | Violates four-app ecosystem strategy; poor store positioning and binary size |
| Build all modules before Phase 1 validation | Governance non-negotiable; auth/contracts/realtime must gate feature work |
| Third-party BaaS for feed/wallet | Loses ledger control, fraud tooling, and contract-first governance |
| Crypto-native wallet first | Regulatory and age-gate complexity; fiat ledger first with optional web3 fields |
| Monolithic NestJS service | Conflicts with existing microservice map and team parallelization |

## References

- [`platform-governance/MASTER-AI-OPERATING-SYSTEM.md`](../../platform-governance/MASTER-AI-OPERATING-SYSTEM.md)
- [`docs/architecture-overview.md`](../architecture-overview.md)
- [`docs/FINAL-READINESS-REPORT.md`](../FINAL-READINESS-REPORT.md)
- [`docs/GLOBAL-CREATOR-ECOSYSTEM-ROADMAP.md`](../GLOBAL-CREATOR-ECOSYSTEM-ROADMAP.md)
- Related ADRs: [SH-001](./SH-001-auth-and-identity.md)
- Agents: `ai-agents/master-brain/platform-orchestrator.md`, `apps/social-app/agents/feed-ranking-agent.md`, `ai-agents/meta/dev-toolstack-orchestrator-agent.md`

---

*Stream Heaven ADR SH-002 — Global Creator Ecosystem Platform Architecture*
