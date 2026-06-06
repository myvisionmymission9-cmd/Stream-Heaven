# Stream Heaven Engineering Rules

## Purpose


These rules govern day-to-day engineering across Stream Heaven: four Flutter apps (Social App, Livestream App, Astro App, Media App (OTT)), eight NestJS microservices, shared packages, and infrastructure. Every engineer and AI agent must comply before merging to `main`.

## Scope


| App | Package | Primary services | Realtime needs |
| --- | --- | --- | --- |
| Social App | com.streamheaven.social | social-service, user-service | Socket.IO (DM typing) |
| Livestream App | com.streamheaven.live | livestream-service, wallet-service | Socket.IO + Agora |
| Astro App | com.streamheaven.astro | user-service, wallet-service | Push + optional Socket |
| Media App (OTT) | com.streamheaven.media | media-service, wallet-service | Push + optional Socket |


**Stack:** Flutter 3.x (Riverpod, GoRouter); Node.js 20+, NestJS; PostgreSQL 15+, Redis 7+; Socket.IO + Redis adapter; Agora SDK (primary), Zego SDK (fallback); AWS S3 + Cloudflare CDN; Firebase Auth + OTP (SMS).

## Repository Standards


| Rule | Requirement | Enforcement |
| --- | --- | --- |
| Monorepo root | All code under apps/, services/, packages/, infrastructure/ | CI path filter |
| Package manager | pnpm@9 workspaces only | lockfile lint |
| Task runner | turbo run build|test|lint | Required on PR |
| Branch | feature/SH-{jira}-{slug} or fix/SH-{jira}-{slug} | GitHub ruleset |
| Commits | Conventional Commits; scope = app or service id | Squash merge |
| ADR | Architecture changes need docs/adr/SH-###.md | Architect review |



## Naming Conventions


### Dart / Flutter


- Files: `snake_case.dart`; tests: `*_test.dart`
- Public widgets: `PascalCase`; private: prefix `_`
- Providers: `*Provider`, notifiers: `*Notifier`
- Routes (GoRouter): `/feature/:id` kebab-case — e.g. `/live-room/:roomId`, `/kundli/report/:reportId`
- Assets: `assets/images/{feature}/`

### TypeScript / NestJS


- Modules: `*.module.ts`; DTOs in `dto/`; entities in `entities/`
- Env keys: `SH_{SERVICE}_{KEY}` — e.g. `SH_LIVESTREAM_AGORA_CERT`
- Event names: `domain.entity.verb` — e.g. `wallet.gift.sent`

## Code Organization — Flutter


```text
apps/social/lib/
  main.dart
  app.dart                 # MaterialApp.router + GoRouter
  core/network/api_client.dart
  core/l10n/
  features/feed/
    data/feed_repository.dart
    domain/post.dart
    presentation/feed_screen.dart
    presentation/feed_controller.dart   # @riverpod
  shared/widgets/sh_avatar.dart
```



## Code Organization — NestJS


```text
services/livestream-service/src/
  main.ts
  app.module.ts
  modules/rooms/
    rooms.controller.ts    # POST /v1/rooms — idempotency header
    rooms.service.ts
    rooms.gateway.ts         # Socket.IO namespace /live
  modules/tokens/
    agora-token.service.ts
    zego-fallback.service.ts
```



## Dependency Rules


1. **apps → packages** — Allowed (`design-system`, `shared-contracts`)
2. **apps → services** — HTTP/WebSocket via `api-gateway` only; never direct DB
3. **services → packages** — Allowed for DTOs and event schemas
4. **services → services** — Prefer BullMQ/Redis streams; sync HTTP max 1 hop
5. **packages → apps/services** — Forbidden

## Error Handling — Flutter


```dart
sealed class ShResult<T> {
  const ShResult();
}
final class ShOk<T> extends ShResult<T> {
  final T value;
  const ShOk(this.value);
}
final class ShErr<T> extends ShResult<T> {
  final ShError error;
  const ShErr(this.error);
}

// UI: never throw from build()
ref.watch(liveRoomProvider(roomId)).when(
  data: (room) => LiveStage(room: room),
  loading: () => const LiveSkeleton(),
  error: (e, st) => ShErrorPanel(
    code: e is ShError ? e.code : 'UNKNOWN',
    onRetry: () => ref.invalidate(liveRoomProvider(roomId)),
  ),
);
```



## Error Handling — NestJS


```typescript
throw new HttpException(
  {
    code: 'LIVE_ROOM_FULL',
    message: 'Room has reached viewer cap',
    details: { roomId, maxViewers: 5000 },
  },
  HttpStatus.CONFLICT,
);

// All responses include X-Request-Id from api-gateway
```



## Logging


- JSON logs in prod; `service`, `requestId`, `userId` (hashed), `appId`
- **Never log:** OTP, Firebase refresh tokens, Agora tokens, full PAN/UPI
- Business INFO events: `gift.sent`, `room.started`, `playback.started`

## Performance Budgets


| Surface | Metric | Budget | Measurement |
| --- | --- | --- | --- |
| Social cold start | TTI | < 3s | Profile 2GB Android 10 |
| Livestream join | First frame | < 2.5s | 4G India median |
| OTT start playback | Time to first frame | < 4s | HLS via Cloudflare |
| API REST p99 | Latency | < 500ms | api-gateway Prometheus |
| Socket gift animation | p99 | < 200ms | livestream-service |
| APK download | Base size | < 48MB | Per-app Play Console |



## Prohibited Patterns


| Pattern | Why | Alternative |
| --- | --- | --- |
| `setState` in features | Breaks Riverpod contract | StateNotifier / AsyncNotifier |
| Raw `http` in widgets | No retry/offline | `ApiClient` via repository |
| SQL in NestJS controllers | Leaks persistence | TypeORM repositories |
| `any` in DTOs | Contract drift | Zod/class-validator DTOs |
| Cross-app shared UI in apps/ | Duplication risk | `packages/design-system` |
| Hardcoded Agora App ID | Secret leak | AWS Secrets Manager |
| Sync wallet + gift chain | Double-spend risk | Saga + idempotency key |
| Logging full phone/OTP | DPDP violation | Mask + hash |



## Code Review Checklist


- [ ] Matches feature folder structure and naming
- [ ] shared-contracts updated if API/event shape changed
- [ ] No secrets; .env.example only placeholders
- [ ] ARB files updated for all 9 locales when UI strings change
- [ ] Unit tests for domain logic; contract test if OpenAPI changed
- [ ] Tested on API 24 emulator with network throttling (Slow 3G)
- [ ] Memory: no unbounded ListView without cacheExtent / pagination
- [ ] Idempotency-Key on POST mutations that spend coins or send gifts
- [ ] Socket events versioned in shared-contracts
- [ ] Feature flag key documented in growth dashboard



## Git Workflow


1. Branch from `main`; rebase daily
2. Draft PR when > 100 LOC
3. CI: lint, analyze, test, build (turbo affected)
4. 1 reviewer (2 for auth-service, wallet-service, security)
5. Squash merge; delete branch

## AI Agent Compliance


Agents from `ai-agents/AGENT-REGISTRY.md` must read `MASTER-GOVERNANCE-PROMPT.md` and domain docs before codegen. Agents must not create a ninth microservice without ADR + `chief-architect` approval.

## Microservices Reference


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



## Related Documents


- `architecture-principles.md`, `flutter-ui-rules.md`, `api-standards.md`, `testing-rules.md`

---
*Stream Heaven Platform Governance — engineering-rules.md v1.0 — Generated 2026-05-29*

