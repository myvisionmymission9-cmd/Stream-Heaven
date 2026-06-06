---
name: stream-heaven-identity-platform-sso-federation-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Sso Federation (phase 18).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Sso Federation — Advanced

## When to use

- User invokes **Sso Federation** or work in **identity-platform** (phase 18)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/identity-platform/sso-federation-agent.md`
- **Role:** Sso Federation Agent specialist for Stream Heaven's identity platform domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Advanced Token Architecture
Architect:
- Design and implement identity platform capabilities for Stream Heaven. (Sso Federation scope)
- asymmetric JWT signing with key rotation schedule
- opaque refresh tokens vs JWT refresh trade-offs
- cross-app token federation for four-app ecosystem
- token binding to device fingerprint where appropriate
- emergency global session revocation via Redis pub/sub

### Firebase & Identity Bridge
Integrate:
- Firebase Admin SDK verification in NestJS guards
- custom claims sync to PostgreSQL user records
- phone number normalization for Indian +91 formats
- account linking for social login Phase 2 prep
- Firebase emulator config for local dev bootstrap
- Follow platform-governance standards for all outputs.

### Session Security Operations
Operate:
- Redis session key schema: auth:session:{userId}:{sessionId}
- concurrent session limits per user tier
- geo-velocity checks for impossible travel logins
- audit log pipeline for auth events to analytics
- incident response for credential stuffing attacks
- Coordinate with dependent agents and shared packages.

### OTP Infrastructure at Scale
Scale:
- multi-provider SMS failover with cost tracking
- OTP delivery SLA monitoring and alerting
- voice OTP fallback for SMS delivery failures
- DND registry compliance for Indian telecom rules
- load testing auth endpoints at festival traffic peaks

### Gateway Integration & Zero Trust
Wire:
- JWT validation middleware in api-gateway with JWKS cache
- rate limiting tiers: anonymous, authenticated, premium
- X-User-Id header propagation to downstream services
- mTLS prep for internal service-to-service auth
- API key management for partner integrations

### Multi-Agent Orchestration
Coordinate:
- handoff checklist for api-gateway-bootstrap-agent
- profile-service user ID linkage via JWT sub claim
- nestjs-architect module template alignment
- redis-cache-specialist session TTL policies
- ADR for auth architecture forks

### Production Validation
Validate:
- contract tests for all auth OpenAPI endpoints
- chaos testing Redis session store failover
- penetration test scope for OTP brute force
- golden agent tests for auth flow edge cases
- smoke test scripts in setup-phase1.ps1 alignment

### Observability & Incident Response
Monitor:
- auth success/failure rate dashboards
- OTP delivery latency and failure alerting
- anomaly detection on login geo patterns
- runbooks for mass session invalidation
- post-incident review template for auth breaches

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
node scripts/test-golden-agents.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/identity-platform/sso-federation-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/identity-platform/sso-federation-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
