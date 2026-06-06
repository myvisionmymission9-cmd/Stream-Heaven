# Stream Heaven Technical Debt Rules

## Definition


Deferred work that increases risk, cost, or velocity loss. Tracked as `debt/*` labels in Jira.

## Classification


| Class | Pay within | Example |
| --- | --- | --- |
| D1 Critical | Current sprint | No OTP rate limit |
| D2 High | 2 sprints | Missing wallet idempotency tests |
| D3 Medium | Quarter | Duplicated theme tokens in Live app |
| D4 Low | Opportunistic | Legacy setState in one screen |



## Allocation


- 20% sprint capacity for D1/D2
- No more than 2 D1 items open

### api-gateway debt watchlist template

- [ ] Document top 3 debt items
- [ ] Link ADR if intentional

### auth-service debt watchlist template

- [ ] Document top 3 debt items
- [ ] Link ADR if intentional

### user-service debt watchlist template

- [ ] Document top 3 debt items
- [ ] Link ADR if intentional

### social-service debt watchlist template

- [ ] Document top 3 debt items
- [ ] Link ADR if intentional

### livestream-service debt watchlist template

- [ ] Document top 3 debt items
- [ ] Link ADR if intentional

### wallet-service debt watchlist template

- [ ] Document top 3 debt items
- [ ] Link ADR if intentional

### media-service debt watchlist template

- [ ] Document top 3 debt items
- [ ] Link ADR if intentional

### notification-service debt watchlist template

- [ ] Document top 3 debt items
- [ ] Link ADR if intentional

---
*Stream Heaven Platform Governance — technical-debt-rules.md v1.0 — Generated 2026-05-29*

## Appendix — Operational reference (technical-debt-rules.md)


### Microservice ownership matrix

| Service | Port | Ownership |
| --- | --- | --- |
| api-gateway | 3000 | Routing, JWT validation, rate limits, request IDs |
| auth-service | 3001 | Firebase verify, OTP, refresh, device binding |
| user-service | 3002 | Profiles, avatars, preferences, locale, blocks |
| social-service | 3003 | Posts, feed, comments, follows, moderation hooks |
| livestream-service | 3004 | Rooms, Agora/Zego tokens, gifts, viewer counts |
| wallet-service | 3005 | Coins, ledger, IAP receipts, payouts |
| media-service | 3006 | Catalog, entitlements, playback URLs, DRM |
| notification-service | 3007 | FCM push, SMS OTP relay, in-app inbox |

### Four-app surface map

| App | Package | Primary services | Realtime needs |
| --- | --- | --- | --- |
| Social App | com.streamheaven.social | social-service, user-service | Socket.IO (DM typing) |
| Livestream App | com.streamheaven.live | livestream-service, wallet-service | Socket.IO + Agora |
| Astro App | com.streamheaven.astro | user-service, wallet-service | Push + optional Socket |
| Media App (OTT) | com.streamheaven.media | media-service, wallet-service | Push + optional Socket |

### Locale release gate (9 languages)

| Locale | ARB file | QA required | Script |
| --- | --- | --- | --- |
| EN | app_en.arb | Native speaker or LQA vendor sign-off | Latin / Devanagari |
| HI | app_hi.arb | Native speaker or LQA vendor sign-off | Latin / Devanagari |
| TE | app_te.arb | Native speaker or LQA vendor sign-off | Indic script |
| TA | app_ta.arb | Native speaker or LQA vendor sign-off | Indic script |
| KN | app_kn.arb | Native speaker or LQA vendor sign-off | Indic script |
| ML | app_ml.arb | Native speaker or LQA vendor sign-off | Indic script |
| BN | app_bn.arb | Native speaker or LQA vendor sign-off | Indic script |
| MR | app_mr.arb | Native speaker or LQA vendor sign-off | Indic script |
| PA | app_pa.arb | Native speaker or LQA vendor sign-off | Indic script |

### api-gateway — on-call notes

**Port:** 3000 · **Domain:** Routing, JWT validation, rate limits, request IDs

- [ ] Grafana dashboard: sh-api-gateway-overview
- [ ] PagerDuty service linked to api-gateway
- [ ] Runbook: docs/runbooks/api-gateway.md
- [ ] Last game day or load test within 90 days
- [ ] Secrets in AWS Secrets Manager sh/prod/api-gateway
- [ ] No cross-service DB credentials

### auth-service — on-call notes

**Port:** 3001 · **Domain:** Firebase verify, OTP, refresh, device binding

- [ ] Grafana dashboard: sh-auth-service-overview
- [ ] PagerDuty service linked to auth-service
- [ ] Runbook: docs/runbooks/auth-service.md
- [ ] Last game day or load test within 90 days
- [ ] Secrets in AWS Secrets Manager sh/prod/auth-service
- [ ] No cross-service DB credentials

### user-service — on-call notes

**Port:** 3002 · **Domain:** Profiles, avatars, preferences, locale, blocks

- [ ] Grafana dashboard: sh-user-service-overview
- [ ] PagerDuty service linked to user-service
- [ ] Runbook: docs/runbooks/user-service.md
- [ ] Last game day or load test within 90 days
- [ ] Secrets in AWS Secrets Manager sh/prod/user-service
- [ ] No cross-service DB credentials

### social-service — on-call notes

**Port:** 3003 · **Domain:** Posts, feed, comments, follows, moderation hooks

- [ ] Grafana dashboard: sh-social-service-overview
- [ ] PagerDuty service linked to social-service
- [ ] Runbook: docs/runbooks/social-service.md
- [ ] Last game day or load test within 90 days
- [ ] Secrets in AWS Secrets Manager sh/prod/social-service
- [ ] No cross-service DB credentials

### livestream-service — on-call notes

**Port:** 3004 · **Domain:** Rooms, Agora/Zego tokens, gifts, viewer counts

- [ ] Grafana dashboard: sh-livestream-service-overview
- [ ] PagerDuty service linked to livestream-service
- [ ] Runbook: docs/runbooks/livestream-service.md
- [ ] Last game day or load test within 90 days
- [ ] Secrets in AWS Secrets Manager sh/prod/livestream-service
- [ ] No cross-service DB credentials

### wallet-service — on-call notes

**Port:** 3005 · **Domain:** Coins, ledger, IAP receipts, payouts

- [ ] Grafana dashboard: sh-wallet-service-overview
- [ ] PagerDuty service linked to wallet-service
- [ ] Runbook: docs/runbooks/wallet-service.md
- [ ] Last game day or load test within 90 days
- [ ] Secrets in AWS Secrets Manager sh/prod/wallet-service
- [ ] No cross-service DB credentials

### media-service — on-call notes

**Port:** 3006 · **Domain:** Catalog, entitlements, playback URLs, DRM

- [ ] Grafana dashboard: sh-media-service-overview
- [ ] PagerDuty service linked to media-service
- [ ] Runbook: docs/runbooks/media-service.md
- [ ] Last game day or load test within 90 days
- [ ] Secrets in AWS Secrets Manager sh/prod/media-service
- [ ] No cross-service DB credentials

### notification-service — on-call notes

**Port:** 3007 · **Domain:** FCM push, SMS OTP relay, in-app inbox

- [ ] Grafana dashboard: sh-notification-service-overview
- [ ] PagerDuty service linked to notification-service
- [ ] Runbook: docs/runbooks/notification-service.md
- [ ] Last game day or load test within 90 days
- [ ] Secrets in AWS Secrets Manager sh/prod/notification-service
- [ ] No cross-service DB credentials

### Social App — store & compliance

- **Package:** `com.streamheaven.social`
- **Focus:** Feed, reels, DMs, creator profiles
- **Gateway headers:** `X-App-Id: social`
- [ ] Firebase google-services.json per flavor
- [ ] OTP flow tested on Jio 4G throttled network
- [ ] Crashlytics mapping file uploaded per release
- [ ] Play Data safety section matches actual data collection

### Livestream App — store & compliance

- **Package:** `com.streamheaven.live`
- **Focus:** Live rooms, gifts, co-host, PK battles
- **Gateway headers:** `X-App-Id: livestream`
- [ ] Firebase google-services.json per flavor
- [ ] OTP flow tested on Jio 4G throttled network
- [ ] Crashlytics mapping file uploaded per release
- [ ] Play Data safety section matches actual data collection

### Astro App — store & compliance

- **Package:** `com.streamheaven.astro`
- **Focus:** Kundli, consultations, remedies, subscriptions
- **Gateway headers:** `X-App-Id: astro`
- [ ] Firebase google-services.json per flavor
- [ ] OTP flow tested on Jio 4G throttled network
- [ ] Crashlytics mapping file uploaded per release
- [ ] Play Data safety section matches actual data collection

### Media App (OTT) — store & compliance

- **Package:** `com.streamheaven.media`
- **Focus:** Movies, series, downloads, parental controls
- **Gateway headers:** `X-App-Id: media`
- [ ] Firebase google-services.json per flavor
- [ ] OTP flow tested on Jio 4G throttled network
- [ ] Crashlytics mapping file uploaded per release
- [ ] Play Data safety section matches actual data collection

## Glossary

| Term | Definition |
| --- | --- |
| SH Coin | Virtual currency ledger in wallet-service |
| Room | livestream-service broadcast unit with Agora channel |
| Entitlement | media-service playback right |
| Kundli | Astro birth chart entity |
| PK | Livestream battle mode — two hosts, socket score |
| api-gateway | Single public REST/WebSocket entry |
| DPDP | India Digital Personal Data Protection Act compliance |

## Cross-document index

| Topic | Primary doc |
| --- | --- |
| REST contracts | api-standards.md |
| Schema migrations | database-rules.md |
| Riverpod / GoRouter | flutter-ui-rules.md |
| OTP / JWT | security-rules.md |
| Agora / Zego | vendor-management-rules.md + architecture-principles.md |
| Incidents | incident-severity-rules.md |
| Releases | release-checklist.md |
| AI agents | ai-usage-rules.md |

