# SH-001: Auth and Identity Foundation

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | 2026-05-29 |
| **Deciders** | auth-service-agent, api-gateway-bootstrap-agent, profile-service-agent |
| **Consulted** | platform-governance/security-rules.md, api-standards.md |

## Context

Stream Heaven Phase 1 requires a unified identity layer across four Flutter apps (Social, Livestream, Astro, OTT). Users authenticate primarily via phone OTP (India-first) with Firebase Auth as the client SDK bridge. The platform must issue its own JWTs for downstream microservices while keeping auth logic centralized.

Constraints:
- DPDP compliance — phone PII encrypted at rest, hashed for lookups
- Database-per-service — auth owns credentials/sessions; user-service owns profiles
- Gateway validates JWT once; downstream services trust `X-User-Id` headers
- Access token TTL ≤ 15 minutes; refresh rotation on use

## Decision

### Identity providers

1. **Firebase Auth** — client-side SDK for social login and phone auth UI; auth-service verifies Firebase ID tokens via Admin SDK (mock verifier in dev when credentials unset).
2. **Direct OTP** — auth-service sends 6-digit OTP via pluggable SMS provider (MockSmsProvider in dev; TwilioSmsProvider interface ready).

### Token strategy

- **Access JWT** (15m): claims `userId`, `roles[]`, `appAccess[]`, `type: access`
- **Refresh JWT** (30d): stored hashed in PostgreSQL `refresh_tokens`; rotated on each refresh; session metadata in Redis (`sh:auth:session:{userId}:{deviceId}`)
- **Signing**: HS256 with separate access/refresh secrets (env vars; AWS Secrets Manager in prod)

### Session storage

- **Redis**: OTP rate limits (`sh:otp:rate:{phone_hash}`), active session hashes, future Socket.IO adapter
- **PostgreSQL (auth-service)**: users, devices, otp_codes, refresh_tokens
- **PostgreSQL (user-service)**: profiles (displayName, handle, locale, apps[]) — no FK to auth DB

### Gateway behavior

- api-gateway validates Bearer JWT on protected routes
- Attaches `X-User-Id`, `X-User-Roles`, `X-User-Apps` to upstream requests
- Public auth routes: OTP send/verify, Firebase exchange, token refresh

### Realtime

- Separate `realtime-gateway` service (port 3009) with Socket.IO + Redis adapter
- JWT handshake on connection; presence.online/offline stub events per `realtime.v1.json`

### RBAC foundation

Roles enum: `USER`, `CREATOR`, `MODERATOR`, `ADMIN` — stored on auth user record, propagated via JWT and gateway headers.

## Consequences

### Positive

- Single auth domain; profile service stays focused on user data
- Contract-first OpenAPI in `packages/shared-contracts` drives implementation
- Refresh rotation limits token theft window
- Mock SMS/Firebase enables local dev without vendor credentials

### Negative / Trade-offs

- HS256 shared secret requires coordinated rotation (RS256/JWKS deferred to Phase 2)
- Profile auto-created on first GET /users/me — eventual consistency with auth user creation
- Gateway JWT validation duplicates auth-service logic (acceptable for edge performance)

### Follow-up Actions

- [ ] Wire Twilio SMS provider with AWS Secrets Manager credentials
- [ ] RS256 + JWKS endpoint for zero-trust mesh validation
- [ ] OpenAPI codegen pipeline (`pnpm contracts:generate`)
- [ ] Integration smoke tests via integration-smoke-test-agent
- [ ] Firebase custom claims sync (`sh_uid`, `apps[]`)

## Alternatives Considered

| Option | Why rejected |
|--------|--------------|
| Firebase-only tokens downstream | No custom claims control; vendor lock-in for authorization |
| Session cookies only | Poor fit for mobile native apps; complicates cross-app SSO |
| Shared auth+profile DB | Violates database-per-service; couples bounded contexts |
| JWT validation in every service | Duplicated logic; gateway centralization preferred |

## References

- [`platform-governance/architecture-principles.md`](../platform-governance/architecture-principles.md)
- [`platform-governance/security-rules.md`](../platform-governance/security-rules.md)
- [`docs/shared-contracts-overview.md`](../shared-contracts-overview.md)
- Related ADRs: SH-000 (template)

---

*Stream Heaven ADR SH-001 — Auth and Identity Foundation*
