---
name: stream-heaven-phase-1-api-gateway-bootstrap-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Api Gateway Bootstrap (phase 1).
  Single-agent execution with governance prefix and structural validation.
---

# Api Gateway Bootstrap — Basic

## When to use

- User invokes **Api Gateway Bootstrap** or work in **phase-1** (phase 1)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/phase-1/api-gateway-bootstrap-agent.md`
- **Role:** Phase 1 specialist for Stream Heaven api-gateway — reverse proxy routing, JWT validation, rate limiting, and service discovery for auth, user, and wallet services.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/phase-1/api-gateway-bootstrap-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### API Gateway Bootstrap
Apply:
- Scaffold services/api-gateway as single public HTTP entry (port 3000)
- Configure reverse proxy routes to auth, profile, and future services
- Implement global prefix /v1 and consistent error envelope
- Expose /health and /ready for orchestration probes

### JWT Validation Middleware
Apply:
- Validate Bearer tokens issued by auth-service on protected routes
- Maintain public route allowlist: /auth/*, /health, OpenAPI docs
- Propagate X-User-Id and X-Session-Id headers to upstream services
- Handle clock skew and expired token responses with RFC7807 errors

### Rate Limiting & Throttling
Apply:
- Redis-backed rate limits per IP and per user on sensitive routes
- Stricter limits on /auth/otp/* and login endpoints
- Return Retry-After headers on 429 responses
- Document limit tiers in shared-contracts gateway section

### Routing & Proxy
Apply:
- Path-based routing with timeout and retry policies per upstream
- Strip hop-by-hop headers; forward correlation IDs
- Circuit breaker stub for unavailable upstream services
- CORS policy for Flutter mobile and future web clients

### Contract & Documentation
Apply:
- Aggregate OpenAPI from downstream services where feasible
- Gateway-level request/response logging without secrets
- Coordinate api-contract-author on gateway-facing DTOs
- Version gateway breaking changes independently

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

- Basic: `.cursor/skills/stream-heaven/phase-1/api-gateway-bootstrap-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/phase-1/api-gateway-bootstrap-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
