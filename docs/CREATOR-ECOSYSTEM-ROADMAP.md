# Creator Ecosystem — Execution Roadmap

> **Concise build order** for the 20-module global creator platform.  
> Full module matrix, diagrams, and formulas: [`GLOBAL-CREATOR-ECOSYSTEM-ROADMAP.md`](GLOBAL-CREATOR-ECOSYSTEM-ROADMAP.md)  
> Architecture ADR: [`docs/adr/SH-002-global-creator-ecosystem-platform.md`](adr/SH-002-global-creator-ecosystem-platform.md)

**Last updated:** 2026-06-15  
**Contract-first gate:** extend `packages/shared-contracts/` before NestJS/Flutter implementation.

---

## Readiness Snapshot

| Layer | Status | Notes |
|-------|--------|-------|
| Phase 1 backend | ✅ | `auth-service`, `user-service`, `api-gateway`, `realtime-gateway` |
| Phase 1 contracts | ✅ | `auth`, `user`, `common`, base `social`, `livestream`, `wallet` stubs |
| `social-service` | ⚠️ Stub | Controllers match base contract; in-memory, empty feed |
| `livestream-service` | ⚠️ Stub | Room lifecycle scaffold |
| `wallet-service` | ❌ | Contract only |
| `apps/mobile` | ⚠️ Phase 2a | OTP, profile, list-style feed, live rooms list — no TikTok UI |
| Four standalone apps | ❌ | `apps/social-app` etc. are `.gitkeep` only |
| 420+ agents | ✅ | Definitions exist; product code mostly unbuilt |

---

## 20 Modules → Phase, Assets, Gap

| # | Module | SH phase | Existing services / contracts | Agents (primary) | Gap |
|---|--------|----------|--------------------------------|------------------|-----|
| 1 | Home feed (tabs) | 8 | `social.v1` `/social/feed`, `social-service`, `apps/mobile` feed | `social-feed-agent`, `feed-ranking-agent` | **Partial** — tabs + mixed items in contract v1.1 |
| 2 | TikTok-style video | 8–9 | `reels-short-video-agent`, posts stub | `reels-short-video-agent`, `watch-time-agent` | **Missing** — vertical player, preload |
| 3 | Video processing | 17 | agents only | `transcoding-pipeline-agent` | **Missing** — workers, queue |
| 4 | Creator posts | 8 | `POST /social/posts` | `short-video-agent`, `filters-effects-agent` | **Partial** — text/image only |
| 5 | YouTube-grade delivery | 17 | CDN in architecture docs | `media-cdn-optimizer` | **Missing** — HLS pipeline |
| 6 | Instagram profiles | 12 | `user.v1`, profile screens | `creator-profile-agent` | **Partial** — no creator dashboard API |
| 7 | AI recommendations | 14–15 | agents | `recommendation-engine-agent`, `feed-ranking-ml-agent` | **Missing** — scoring service |
| 8 | Trending | 15 | agents | `trending-engine-agent`, `hashtag-trending-agent` | **Missing** — velocity ranker |
| 9 | Celebrity ecosystem | 12, 20 | RBAC `CREATOR` in common | `creator-verification-agent` | **Missing** — verification flow |
| 10 | Live streaming | 9–10 | `livestream.v1`, `livestream-service` | `livestream-agent`, `agora-integration-agent` | **Partial** — no RTC tokens |
| 11 | Gifting | 10–11 | `wallet.v1` gift paths, gift agents | `gift-trigger-agent`, cosmetics domain | **Partial** — contract stub |
| 12 | Wallet | 11–13 | `wallet.v1` | `wallet-agent`, `iap-integration-agent` | **Missing** — service impl |
| 13 | Community | 20 | community agents | `fan-community-agent` | **Missing** |
| 14 | Notifications | 8, 18 | FCM in architecture | `notification-agent` | **Missing** — `notification-service` |
| 15 | AI moderation | 20 | report/block in `social.v1` | `ai-moderation-agent`, `content-moderation-pipeline` | **Partial** |
| 16 | Anti-fraud | 13, 20 | agents | `fraud-detection-agent` | **Missing** |
| 17 | Analytics | 19 | `analytics-platform/` agents | `event-tracking-agent` | **Missing** — warehouse |
| 18 | Admin panel | 20 | safety agents | incident / governance agents | **Missing** |
| 19 | Camera / media capture | 8–9 | mobile shell | `filters-effects-agent` | **Missing** — capture SDK |
| 20 | Full tech stack | 1–20 | Phase 1 stack live | `dev-toolstack-orchestrator-agent` | **Partial** — Kafka, ES, K8s prod |

---

## Mockup → Phase 1–2 Priority Deliverables

User shell: **top tabs** Trending | Videos | Following | Celebrity | Create; **gift sidebar**; **bottom nav** Home | Live | Audio | Astro | TV.

| UI surface | Phase 1–2 deliverable | Contract / service | Defer |
|------------|---------------------|-------------------|-------|
| **Following tab** (default home) | Cursor feed of followed creators | `GET /social/feed?tab=following` | ML ranking |
| **Videos tab** | Full-screen vertical list (720p URL) | `feedItemType=video_post`, engagement events | Preload, gifts on video |
| **Trending tab** | Sort by engagement + recency rules | `tab=trending`, watch-event ingestion | Full velocity formula |
| **Celebrity tab** | Filter `author.isCelebrity=true` | user profile flag + feed filter | OAuth verification |
| **Create** | Text + image post; video upload placeholder | `POST /social/posts`, presigned URL stub | Editor, effects |
| **Gift sidebar** | Navigate to live + wallet balance | `wallet.v1` read + live room | Send gift animation |
| **Live bottom nav** | Room list → join stub | `livestream.v1` | RTC, PK, audio seats |
| **Audio / Astro / TV** | Placeholder routes / deep links | app routing only | Full app shells |

**Phase 1–2 exit criteria:** OTP login → **Following feed with video items** → like/comment/share → **watch events accepted** → profile view → live room list.

---

## Contract-First Build Order

Execute in separate chats; do not skip validation gates.

```
1. [DONE this slice] social.v1.yaml v1.1 — feed tabs, FeedItem union, video post,
   engagement (like/share/gift-intent), watch-events for ranking signals
2. pnpm --filter @stream-heaven/shared-contracts validate
3. social-service — implement new paths against contract (PostgreSQL + Redis counters)
4. api-gateway — route verification; no duplicate social routes elsewhere
5. apps/mobile — extend feed_screen: TabBar + PageView for video tab; wire engagement APIs
6. Seed data script — sample video posts for local smoke test
7. Phase 1 remediate — pnpm run phase1:remediate before Phase 8 live work
8. livestream.v1 + wallet gift send — unlock gift sidebar (Phase 10–11)
9. media.v1 + upload presign — unlock Create video (Phase 17 parallel track)
10. recommendation.v1 — online features (Phase 14+)
```

**Dependencies:** auth + user (✅) → social feed → engagement events → ranking → media URLs → live/wallet.

---

## Ranking Signals (Immediate Slice)

Client emits batched watch events; server aggregates for rule-based score (Phase 8 MVP).

| Signal | Field | Used in |
|--------|-------|---------|
| Watch time | `watchTimeMs` | Feed score (0.20), trending (0.25), short-video tie-break #1 |
| Completion | `completionRate` (0–1) | Trending (0.10), tie-break #2 |
| Rewatch | `rewatchCount` | Tie-break #3 |
| Skip | `skipped` | Negative signal / fatigue |

Formula references: [`GLOBAL-CREATOR-ECOSYSTEM-ROADMAP.md`](GLOBAL-CREATOR-ECOSYSTEM-ROADMAP.md#ranking-formula-spec-references).

---

## Flutter Scaffold Status

| Screen | Path | Action |
|--------|------|--------|
| Home hub | `apps/mobile/lib/features/profile/presentation/home_screen.dart` | Replace with bottom nav shell (Phase 2b chat) |
| Text feed | `apps/mobile/lib/features/social/presentation/feed_screen.dart` | Extend with tabs + video page — **next mobile chat** |
| Live list | `apps/mobile/lib/features/livestream/presentation/live_rooms_screen.dart` | Wire to livestream API |
| TikTok vertical | — | **Not built** — document only until contract + Following feed stable |

Patterns exist (Riverpod, GoRouter, design_system); no new app scaffold required.

---

## Recommended Next 3 Implementation Chats

1. **Social service MVP** — `@ai-agents/apps/social-app/agents/social-feed-agent.md` + `@ai-agents/apps/social-app/agents/feed-ranking-agent.md` — implement `social.v1` v1.1 in `services/social-service` with Postgres schema.
2. **Mobile feed UX** — `@ai-agents/phase-2a/flutter-mobile-shell-agent.md` — TabBar home, vertical video tab, engagement actions, watch-event batching.
3. **Phase 1 gate** — `@ai-agents/phase-1/phase-1-remediation-agent.md` — run remediate script; fix auth/gateway/realtime before live/wallet work.

---

## Blockers (User Decision)

| Blocker | Options |
|---------|---------|
| Single mobile app vs four apps now | **Recommend:** one `apps/mobile` super-shell until Phase 2b split |
| Agora vs LiveKit for live MVP | Governance default: **Agora** (ADR SH-002) |
| Kafka for engagement events | **Recommend:** Redis streams MVP; Kafka Phase 11+ |
| Celebrity tab without admin UI | Manual DB flag for dev; admin Phase 20 |

---

*Creator Ecosystem Execution Roadmap v1.0 — Stream Heaven*
