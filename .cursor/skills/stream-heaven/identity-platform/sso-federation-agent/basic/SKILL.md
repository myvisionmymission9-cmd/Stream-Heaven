---
name: stream-heaven-identity-platform-sso-federation-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Sso Federation (phase 18).
  Single-agent execution with governance prefix and structural validation.
---

# Sso Federation — Basic

## When to use

- User invokes **Sso Federation** or work in **identity-platform** (phase 18)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/identity-platform/sso-federation-agent.md`
- **Role:** Sso Federation Agent specialist for Stream Heaven's identity platform domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/identity-platform/sso-federation-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Authentication Flow Design
Design:
- Design and implement identity platform capabilities for Stream Heaven. (Sso Federation scope)
- phone OTP as primary login for Indian mobile-first users
- email magic-link fallback for recovery flows
- Firebase Auth bridge with custom token exchange
- device trust hooks for suspicious login detection
- graceful offline OTP retry with exponential backoff

### JWT & Session Management
Implement:
- short-lived access tokens (≤15m) with refresh rotation
- Redis-backed session store with TTL and revocation lists
- refresh token reuse detection and family invalidation
- JWT claims: sub, roles, device_id, session_id
- api-gateway Bearer validation middleware contract
- Follow platform-governance standards for all outputs.

### OTP & Rate Limiting
Secure:
- SMS provider abstraction (Twilio, MSG91, etc.) via env config
- idempotent OTP verify with attempt counters
- brute-force rate limits on /auth/verify-otp
- OTP expiry windows and resend cooldown policies
- no secrets in repo — env templates only
- Coordinate with dependent agents and shared packages.

### Contract-First API Design
Define:
- OpenAPI schemas in packages/shared-contracts/auth/v1
- register, login, refresh, logout, verify-otp endpoints
- standard error codes for auth failures
- gateway proxy rules for /auth/* routes
- integration test plan with api-gateway-bootstrap-agent

### Security & Compliance
Follow:
- platform-governance/security-rules.md for token handling
- PII minimization in logs and audit trails
- HTTPS-only token transport; no tokens in query strings
- escalation path to unified-auth-agent for SSO Phase 2
- session fixation and CSRF protections on web surfaces

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| Shared contracts | `packages/shared-contracts/` |
| Validate agents | `node scripts/validate-agents.mjs` |
| Validate skills | `node scripts/validate-agent-skills.mjs` |
| Deep skill check | `node scripts/validate-all-agent-skills.mjs` |

## Validation

```powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
node scripts/validate-all-agent-skills.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/identity-platform/sso-federation-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/identity-platform/sso-federation-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
