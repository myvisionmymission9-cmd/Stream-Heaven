# Stream Heaven Shared Contracts Overview

> Contract-first development guide for APIs, events, and cross-app types. All services and Flutter apps must consume contracts from `packages/shared-contracts` — never duplicate DTOs.

## Principles

1. **Single source of truth** — OpenAPI 3.1 specs and AsyncAPI event schemas live in `packages/shared-contracts`
2. **Generate, don't copy** — TypeScript types for NestJS and Dart models for Flutter are generated from schemas
3. **Version explicitly** — Breaking changes require new major version and ADR in `docs/adr/`
4. **Idempotent mutations** — All POST/PATCH that spend money or create content accept `Idempotency-Key` header
5. **Locale-aware payloads** — User-facing strings return keys + fallback EN; client resolves via ARB where possible

## Package Layout (Target)

```text
packages/shared-contracts/
  openapi/
    auth/v1/auth.openapi.yaml
    user/v1/user.openapi.yaml
    social/v1/social.openapi.yaml
    livestream/v1/livestream.openapi.yaml
    wallet/v1/wallet.openapi.yaml
    media/v1/media.openapi.yaml
    games/v1/games.openapi.yaml          # Teen Patti, Ludo, Rummy
  asyncapi/
    events/v1/platform-events.asyncapi.yaml
  schemas/
    common/error-response.json
    common/pagination.json
    common/locale-string.json
  generated/
    ts/                                   # NestJS DTOs (gitignored or committed per team choice)
    dart/                                 # @JsonSerializable models
  package.json
  README.md
```

## REST API Conventions

Aligned with [`platform-governance/api-standards.md`](../platform-governance/api-standards.md).

| Aspect | Rule |
|--------|------|
| Base path | `/v1/{resource}` via api-gateway |
| Auth | `Authorization: Bearer {firebase_jwt}` — gateway validates, forwards `X-SH-User-Id` |
| Pagination | Cursor-based: `?cursor=&limit=` — response includes `nextCursor`, `hasMore` |
| Errors | RFC 7807 Problem Details — `type`, `title`, `status`, `detail`, `traceId` |
| Timestamps | ISO 8601 UTC — `createdAt`, `updatedAt` on all entities |
| Money | Integer minor units (paise) + `currency: "INR"` — never floats |
| IDs | UUID v7 (time-sortable) for public IDs; internal serial OK in DB only |

### Example: Wallet Gift Event (HTTP)

```yaml
# POST /v1/wallet/gifts
request:
  headers:
    Idempotency-Key: required
  body:
    roomId: uuid
    giftSku: string
    quantity: integer
    recipientUserId: uuid
response:
  201:
    transactionId: uuid
    coinBalance: integer
    giftAnimationSku: string
```

## Domain Event Conventions (AsyncAPI)

Events use dot notation: `{domain}.{entity}.{verb}`.

| Event | Producer | Consumers |
|-------|----------|-----------|
| `user.profile.updated` | user-service | social, livestream, search indexer |
| `wallet.gift.sent` | wallet-service | livestream-service, analytics, gift-effects |
| `livestream.room.started` | livestream-service | analytics, notification-service |
| `social.post.created` | social-service | feed ranker, moderation, search |
| `games.match.completed` | games-service | wallet-service, leaderboard, analytics |

Transport: Redis Streams or SNS/SQS (Phase 1: Redis; scale to SNS per [`scaling-playbook.md`](../platform-governance/scaling-playbook.md)).

### Event Envelope (all events)

```json
{
  "eventId": "uuid",
  "eventType": "wallet.gift.sent",
  "eventVersion": "1",
  "occurredAt": "2026-05-29T12:00:00Z",
  "producer": "wallet-service",
  "traceId": "uuid",
  "payload": { }
}
```

## Cross-App Identity Claims (JWT)

Firebase custom claims set by `auth-service` after first login:

```json
{
  "sh_uid": "uuid",
  "locale": "hi",
  "apps": ["social", "livestream"],
  "wallet_id": "uuid",
  "creator_tier": "standard"
}
```

All services trust gateway-validated headers — never re-verify Firebase in downstream services except auth-service.

## Flutter Integration

1. Add generated Dart package as path dependency in each app's `pubspec.yaml`
2. `ApiClient` in `core/network/` uses generated request/response types
3. Socket.IO events deserialize to generated `*Event` classes from asyncapi dart output
4. Offline cache stores serialized DTO JSON — schema version in cache key (`v1_post_{id}`)

## NestJS Integration

1. Import generated DTOs in controllers — `class-validator` decorators generated or extended in thin wrapper files
2. Publish domain events via shared `EventPublisher` module wrapping Redis/SNS
3. Subscribe via `@EventHandler('wallet.gift.sent')` pattern in consumer modules

## Versioning & Deprecation

| Change Type | Action |
|-------------|--------|
| Add optional field | Minor bump — backward compatible |
| Remove/rename field | Major bump — support old version 90 days |
| New endpoint | Minor bump in same `/v1` if non-breaking |
| Breaking behavior | New `/v2` path + ADR |

Deprecation header: `Sunset: Sat, 01 Nov 2026 00:00:00 GMT` on deprecated endpoints.

## Contract Change Workflow

1. Agent or engineer opens PR updating `packages/shared-contracts/openapi/...`
2. Run codegen (`pnpm contracts:generate` — to be added in Phase 1)
3. Update consuming services/apps in same PR or linked PR with CI contract diff check
4. ADR if breaking: `docs/adr/SH-###-{slug}.md`
5. `api-contract-test-agent` validates compatibility in CI

## Priority Contracts (Phase 1 Build Order)

| Order | Contract | Owner Agent |
|-------|----------|-------------|
| 1 | auth.openapi.yaml | unified-auth-agent |
| 2 | user.openapi.yaml | follow-graph-manager / user-service |
| 3 | common/error, pagination | api-contract-author |
| 4 | platform-events.asyncapi.yaml | event-schema-guardian |
| 5 | wallet.openapi.yaml | wallet-ledger-agent |
| 6 | livestream.openapi.yaml | livestream-architect |
| 7 | social.openapi.yaml | feed-architect |

## Related Governance

- [`api-standards.md`](../platform-governance/api-standards.md)
- [`database-rules.md`](../platform-governance/database-rules.md)
- [`engineering-rules.md`](../platform-governance/engineering-rules.md)
- [`security-rules.md`](../platform-governance/security-rules.md)

---

*Stream Heaven Platform — Shared Contracts v1.0*
