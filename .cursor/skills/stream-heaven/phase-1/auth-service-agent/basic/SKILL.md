---
name: stream-heaven-phase-1-auth-service-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Auth Service (phase 1).
  Single-agent execution with governance prefix and structural validation.
---

# Auth Service — Basic

## When to use

- User invokes **Auth Service** or work in **phase-1** (phase 1)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/phase-1/auth-service-agent.md`
- **Role:** Phase 1 specialist for Stream Heaven auth-service — Firebase Auth bridge, OTP flows, JWT issuance, session refresh, and device trust hooks.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/phase-1/auth-service-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Firebase Auth Bridge
Apply:
- Verify Firebase ID tokens via Admin SDK in NestJS guards
- Map Firebase UID to internal user records in PostgreSQL
- Handle token refresh and revoked-user propagation to Redis sessions
- Document env templates for FIREBASE_* without committing secrets

### OTP & Phone Auth
Apply:
- Implement SMS OTP with provider abstraction (MSG91, Twilio, AWS SNS)
- Idempotent verify endpoint with attempt counters and cooldown windows
- Support Indian +E.164 numbers; normalize leading zero formats
- Rate-limit /auth/otp/* per IP and per phone hash

### JWT & Session Security
Apply:
- Issue access JWT ≤15m and rotating refresh tokens stored in Redis
- Implement refresh-on-use with family detection for token reuse attacks
- Define claims: sub, roles, device_id, session_id, iat, exp
- Wire api-gateway Bearer validation and public route allowlist

### Contract-First Auth API
Apply:
- Define OpenAPI in packages/shared-contracts/auth/v1
- Cover register, login, refresh, logout, verify-otp, device-trust
- Version breaking changes; never ship undocumented auth endpoints
- Generate client SDK stubs for Flutter mobile shell

### Redis Session
Apply:
- Key schema: session:{userId}:{deviceId} with TTL aligned to refresh policy
- Store session metadata: user agent, IP hash, last active, trust level
- Invalidate all sessions on password change and admin lock
- Coordinate redis-cache-specialist on cluster slot and memory limits

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| Shared contracts | `packages/shared-contracts/` |
| Validate agents | `node scripts/validate-agents.mjs` |
| Validate skills | `node scripts/validate-agent-skills.mjs` |
| Deep skill check | `node scripts/validate-all-agent-skills.mjs` |
| Phase 1 setup | `scripts/setup-phase1.ps1` |

## Validation

```powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
node scripts/validate-all-agent-skills.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/phase-1/auth-service-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/phase-1/auth-service-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
