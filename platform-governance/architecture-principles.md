# Stream Heaven Architecture Principles

## Purpose


Foundational design constraints for Stream Heaven's four-app ecosystem. Use when designing features, choosing sync vs async, or reviewing ADRs.

## System Context


```text
                    ┌──────────────── Cloudflare CDN / WAF ────────────────┐
  Flutter Apps      │                                                     │
  (Social, Live,    ▼                                                     │
   Astro, OTT) ──► api-gateway ──► auth / user / social / live / wallet  │
       │              │              media / notification                 │
       │              └── Socket.IO ──► Redis adapter ◄── horizontal pods │
       ├── Firebase Auth (OTP)                                            │
       ├── Agora / Zego (Livestream, Astro video consult)                 │
       └── S3 presigned uploads ──► media pipeline ──► Cloudflare        
```



## Core Principles


| Principle | Implementation on Stream Heaven |
| --- | --- |
| Bounded context | Each NestJS service owns one domain; no shared DB schemas across services |
| API-first | OpenAPI in packages/shared-contracts before implementation |
| Eventual consistency | Wallet ledger authoritative; social counts may lag < 5s |
| Offline-first mobile | Flutter caches feed, wallet balance hint, OTT continue-watching |
| Edge delivery | Cloudflare caches thumbnails, HLS segments; S3 origin private |
| Fail operational | Zego fallback when Agora token mint fails; cached feed on API error |
| Privacy by design | Minimize PII replication; user-service is profile source of truth |
| Multi-tenant apps | Single auth identity; app_id claim scopes API access |



## App Boundaries


| App | Package | Primary services | Realtime needs |
| --- | --- | --- | --- |
| Social App | com.streamheaven.social | social-service, user-service | Socket.IO (DM typing) |
| Livestream App | com.streamheaven.live | livestream-service, wallet-service | Socket.IO + Agora |
| Astro App | com.streamheaven.astro | user-service, wallet-service | Push + optional Socket |
| Media App (OTT) | com.streamheaven.media | media-service, wallet-service | Push + optional Socket |



**Rule:** Cross-app deep links use universal links (`https://streamheaven.app/...`) resolved by GoRouter in target app. Shared login session via Firebase + auth-service refresh cookie.

## Data Flow Patterns


### Synchronous (allowed)


- Read profile: app → api-gateway → user-service
- Join live room: app → livestream-service → Agora token (short TTL)
- Purchase coins: app → wallet-service → Play Billing verify

### Asynchronous (preferred)


- Gift sent: livestream-service publishes `gift.sent` → wallet debits → notification push
- Post created: social-service → search index queue → fan-out notification
- OTT transcode complete: media-service → notification → Media App refresh catalog

## Caching Layers


| Layer | Technology | TTL | Invalidation |
| --- | --- | --- | --- |
| CDN | Cloudflare | 1h–7d by asset type | Cache-Tag purge on publish |
| API | Redis | 30s–5m | Event-driven delete |
| Flutter | Hive/drift | Session + stale-while-revalidate | Pull-to-refresh + socket |
| Agora token | Memory | ≤ 24h SDK rule | Re-mint on 401 |



## Realtime Architecture


- **Socket.IO** namespaces: `/social`, `/live`, `/wallet` (server: livestream-service + social-service)
- **Redis adapter** required for >1 pod; sticky sessions via cookie on ALB
- **Presence:** Redis HASH `room:{id}:viewers` with TTL heartbeat

## Streaming (Live + Astro Video)


| Provider | Role | Trigger |
|----------|------|---------|
| Agora | Primary RTC | livestream-service token endpoint |
| Zego | Fallback RTC | Agora 5xx or region block |
| Socket.IO | Gifts, chat, PK score | livestream-service |

## Media / OTT


- Upload: presigned S3 → transcode worker → HLS renditions
- Playback: Cloudflare signed URL; Widevine L1 where device supports
- Downloads: encrypted offline pack per `media-service` entitlement

## Security Architecture


- JWT from auth-service; gateway validates signature + `app_id` + scopes
- Internal service mesh: mTLS between pods (Istio)
- Secrets: AWS Secrets Manager; rotated quarterly per `security-rules.md`

## Scalability Axes


| Axis | Scale trigger | First action |
| --- | --- | --- |
| Live viewers | Concurrent rooms > 10k | Redis shard + Agora channel limits |
| Feed read | p99 > 400ms | Read replicas + feed cache |
| Wallet writes | Ledger TPS > 500 | Partition by user_id hash |
| Push fan-out | Campaign > 1M | notification-service batch + FCM topics |



## Anti-Patterns


- [ ] Shared PostgreSQL database across two services
- [ ] Dual write to wallet and livestream without outbox pattern
- [ ] Client-side coin balance as source of truth
- [ ] Global Socket.IO room without Redis adapter
- [ ] Synchronous call chain gateway → social → user → wallet
- [ ] Storing master video only on device without S3 backup



## ADR Requirements


Write ADR when: new microservice, new third-party vendor, breaking API v2, cross-app shared database, or blockchain/NFT integration.

## Phase Alignment


Phase 1: auth-service + user-service + shared-contracts + Socket foundation.
Phase 2: social-service feed + livestream-service MVP.
Phase 3: wallet-service + gifts; media-service catalog.
Phase 4: Astro consultations + OTT DRM hardening.

| Service | Default port | Ownership |
| --- | --- | --- |
| api-gateway | 3000 | Routing, JWT validation, rate limits, request IDs |
| auth-service | 3001 | Firebase verify, OTP, refresh, device binding |
| user-service | 3002 | Profiles, avatars, preferences, locale, blocks |
| social-service | 3003 | Posts, feed, comments, follows, moderation hooks |
| livestream-service | 3004 | Rooms, Agora/Zego tokens, gifts, viewer counts |
| wallet-service | 3005 | Coins, ledger, IAP receipts, payouts |
| media-service | 3006 | Catalog, entitlements, playback URLs, DRM |
| notification-service | 3007 | FCM push, SMS OTP relay, in-app inbox |


### Social App — Architecture Notes

- **Package:** `com.streamheaven.social`
- **Focus:** Feed, reels, DMs, creator profiles
- **GoRouter root:** `/social` shell with tab branches
- **State:** Riverpod codegen; global `authStateProvider`, feature-scoped notifiers
- **Network:** Dio client with interceptors (auth refresh, retry-3, connectivity pause)

### Livestream App — Architecture Notes

- **Package:** `com.streamheaven.live`
- **Focus:** Live rooms, gifts, co-host, PK battles
- **GoRouter root:** `/livestream` shell with tab branches
- **State:** Riverpod codegen; global `authStateProvider`, feature-scoped notifiers
- **Network:** Dio client with interceptors (auth refresh, retry-3, connectivity pause)

### Astro App — Architecture Notes

- **Package:** `com.streamheaven.astro`
- **Focus:** Kundli, consultations, remedies, subscriptions
- **GoRouter root:** `/astro` shell with tab branches
- **State:** Riverpod codegen; global `authStateProvider`, feature-scoped notifiers
- **Network:** Dio client with interceptors (auth refresh, retry-3, connectivity pause)

### Media App (OTT) — Architecture Notes

- **Package:** `com.streamheaven.media`
- **Focus:** Movies, series, downloads, parental controls
- **GoRouter root:** `/media` shell with tab branches
- **State:** Riverpod codegen; global `authStateProvider`, feature-scoped notifiers
- **Network:** Dio client with interceptors (auth refresh, retry-3, connectivity pause)

## Integration Matrix

| Consumer | Provider | Protocol | Contract package |
| --- | --- | --- | --- |
| All apps | api-gateway | HTTPS REST | shared-contracts/rest |
| Livestream App | livestream-service | WSS + REST | shared-contracts/live |
| Social App | social-service | REST + WSS | shared-contracts/social |
| Media App | media-service | REST | shared-contracts/media |
| Astro App | wallet-service | REST | shared-contracts/wallet |
| notification-service | FCM | HTTPS | Firebase console |

---
*Stream Heaven Platform Governance — architecture-principles.md v1.0 — Generated 2026-05-29*
