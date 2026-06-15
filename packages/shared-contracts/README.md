# @stream-heaven/shared-contracts

Contract-first OpenAPI 3.1 specs and JSON event schemas for Stream Heaven.

## Layout

```text
openapi/
  common.v1.yaml   # Error, Pagination, UserId, Timestamps
  auth.v1.yaml     # OTP, Firebase exchange, refresh, logout
  user.v1.yaml     # Profile CRUD, devices
  social.v1.yaml   # Posts, tabbed feed, video posts, engagement, watch events (v1.1)
  livestream.v1.yaml # Room lifecycle, viewer count, token stub
  wallet.v1.yaml     # Balance, ledger, gift catalog, gift send (Phase 11 stub)
events/
  realtime.v1.json # Presence + social/livestream domain events
```

## Versioning Rules

| Change | Version bump | Action |
|--------|--------------|--------|
| Add optional field | Minor (same `/v1`) | Backward compatible |
| Add required field | Major (`/v2`) | ADR + 90-day sunset on v1 |
| Remove/rename field | Major | ADR + contract diff in CI |
| New endpoint (non-breaking) | Minor | Same spec file, bump `info.version` |
| Breaking behavior | Major | New path prefix `/v2/` |

- File naming: `{domain}.v{major}.yaml` (e.g. `auth.v1.yaml`)
- Breaking changes require ADR in `docs/adr/`
- Deprecation: `Sunset` HTTP header on deprecated routes

## Scripts

```bash
pnpm validate          # Lint OpenAPI + validate event JSON
pnpm validate:openapi  # Redocly lint only
pnpm bundle:auth       # Bundle auth spec (resolves $ref)
pnpm bundle:social     # Bundle social spec
pnpm bundle:livestream # Bundle livestream spec
```

## Consumption

1. Implement NestJS controllers to match paths under `/v1/`
2. Generate types: `packages/shared-types` (Phase 1 placeholder; full codegen in CI)
3. Gateway routes proxy to owning service per `platform-governance/api-standards.md`
4. Phase 2 contracts currently map to `social-service` (`/v1/social/*`) and `livestream-service` (`/v1/livestream/*`) behind `api-gateway`
