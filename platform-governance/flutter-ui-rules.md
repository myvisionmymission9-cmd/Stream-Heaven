# Stream Heaven Flutter UI Rules

## Purpose


UI/UX implementation standards for Social, Livestream, Astro, and Media (OTT) apps. Optimized for low-end Android (2GB RAM), poor connectivity, and 9 Indic/English locales.

## Stack


- **Framework:** Flutter 3.x stable channel
- **State:** Riverpod 2.x (`@riverpod` codegen)
- **Navigation:** GoRouter with `ShellRoute` for tabs
- **Design:** `packages/design-system` — ShTheme, ShButton, ShAvatar

## Localization


- **EN** — ARB `app_en.arb`, RTL N/A (Indic scripts LTR)
- **HI** — ARB `app_hi.arb`, RTL N/A (Indic scripts LTR)
- **TE** — ARB `app_te.arb`, RTL N/A (Indic scripts LTR)
- **TA** — ARB `app_ta.arb`, RTL N/A (Indic scripts LTR)
- **KN** — ARB `app_kn.arb`, RTL N/A (Indic scripts LTR)
- **ML** — ARB `app_ml.arb`, RTL N/A (Indic scripts LTR)
- **BN** — ARB `app_bn.arb`, RTL N/A (Indic scripts LTR)
- **MR** — ARB `app_mr.arb`, RTL N/A (Indic scripts LTR)
- **PA** — ARB `app_pa.arb`, RTL N/A (Indic scripts LTR)


- Use `context.l10n.key` — never concatenate translated strings (plural/gender rules)
- Numbers/currency: `intl` with locale from `user-service` profile
- Fonts: Noto Sans + Noto Sans Devanagari/Telugu/Tamil fallbacks bundled per script

## Layout & Density


| Rule | Value |
| --- | --- |
| Min touch target | 48dp |
| Base grid | 4dp |
| Max content width (tablet) | 600dp centered |
| Live gift lane | SafeArea + exclude keyboard |
| OTT player | Landscape lock optional per title |



## Performance


- [ ] Use `const` constructors where possible
- [ ] `ListView.builder` / `SliverList` only — no unbounded Column of cards
- [ ] Precache hero images ≤ 200KB thumbnail via Cloudflare resize params
- [ ] Defer heavy work: `compute()` for image decode > 1MP
- [ ] RepaintBoundary around gift animations and live chat overlay
- [ ] Disable blur/shadow on API 21–24 devices via `DeviceInfo` gate
- [ ] Profile with Impeller on; target < 1% jank frames



## Offline & Connectivity


```dart
@riverpod
class FeedController extends _$FeedController {
  @override
  Future<FeedPage> build() async {
    final cache = ref.read(feedCacheProvider);
    final network = ref.watch(connectivityProvider);
    if (network == ConnectivityResult.none) {
      return cache.getStale() ?? throw const OfflineException();
    }
    final fresh = await ref.read(feedRepositoryProvider).fetchPage();
    await cache.put(fresh);
    return fresh;
  }
}
```



## GoRouter Patterns


```dart
GoRoute(
  path: '/live-room/:roomId',
  name: 'liveRoom',
  parentNavigatorKey: rootNavigatorKey,
  builder: (context, state) => LiveRoomScreen(
    roomId: state.pathParameters['roomId']!,
  ),
  redirect: (context, state) {
    final auth = ref.read(authStateProvider);
    if (auth is! Authenticated) return '/login?next=${state.uri}';
    return null;
  },
);
```



## Livestream UI


- Stage: Agora `RtcEngine` in dedicated `LiveEngineController`
- Chat: reversed ListView; batch insert max 5 msgs/frame
- Gifts: Rive/Lottie from CDN; queue animations, drop if > 3 pending on low memory
- PK bar: listen `pk.score.updated` socket event

## Social UI


- Feed card: video autoplay only when ≥ 50% visible (`VisibilityDetector`)
- Reels: vertical PageView; preload next 1 item
- DM: optimistic send with failed retry chip

## Astro UI


- Kundli charts: customPainter with cached layout size
- Consultation booking: show IST slots; wallet balance inline
- Disclaimer footer on all prediction screens (compliance)

## OTT UI


- Continue watching row: Hive-backed
- Download button states: queued, downloading, encrypted ready, expired
- Parental PIN gate before mature content

## Accessibility


- Semantics labels on icon-only buttons (gift, share, follow)
- Minimum contrast 4.5:1 (WCAG AA)
- Respect `MediaQuery.disableAnimations`

## Theming


| Token | Light | Dark |
| --- | --- | --- |
| Primary | SH Purple #6B4EFF | Same |
| Surface | #FFFFFF | #121212 |
| Error | #D32F2F | #EF9A9A |



### Social App — Screen inventory

| Route | Screen | Critical widget |
| --- | --- | --- |
| /social/home | Home | ShScaffold |
| /social/profile/:id | Profile | ShAvatar |

### Livestream App — Screen inventory

| Route | Screen | Critical widget |
| --- | --- | --- |
| /livestream/home | Home | ShScaffold |
| /livestream/profile/:id | Profile | ShAvatar |
| /live-room/:id | Live Room | LiveStage |

### Astro App — Screen inventory

| Route | Screen | Critical widget |
| --- | --- | --- |
| /astro/home | Home | ShScaffold |
| /astro/profile/:id | Profile | ShAvatar |

### Media App (OTT) — Screen inventory

| Route | Screen | Critical widget |
| --- | --- | --- |
| /media/home | Home | ShScaffold |
| /media/profile/:id | Profile | ShAvatar |
| /title/:id | Title Detail | ShPlayButton |

## Widget Test Requirements

- [ ] Golden test for design-system components when changed
- [ ] Pump LiveRoomScreen with mocked Agora channel
- [ ] Verify GoRouter redirect when logged out

---
*Stream Heaven Platform Governance — flutter-ui-rules.md v1.0 — Generated 2026-05-29*

## Appendix — Operational reference (flutter-ui-rules.md)


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

