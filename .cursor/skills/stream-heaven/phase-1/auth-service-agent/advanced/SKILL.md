---
name: stream-heaven-phase-1-auth-service-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Auth Service (phase 1).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Auth Service — Advanced

## When to use

- User invokes **Auth Service** or work in **phase-1** (phase 1)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/phase-1/auth-service-agent.md`
- **Role:** Phase 1 specialist for Stream Heaven auth-service — Firebase Auth bridge, OTP flows, JWT issuance, session refresh, and device trust hooks.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Multi-Service Auth Orchestration
Apply:
- Coordinate api-gateway-bootstrap-agent on JWT middleware and route guards
- Hand off SSO Phase 2 to unified-auth-agent without breaking v1 contracts
- Define cross-service service-to-service auth (mTLS or signed internal JWT)
- Run integration smoke tests across gateway → auth → profile chain

### Threat Model & Hardening
Apply:
- Brute-force, credential stuffing, and OTP flooding mitigation playbooks
- Device fingerprinting hooks for high-value wallet and creator actions
- Audit log stream for login, logout, refresh, and admin impersonation
- Align with enterprise-security agents on WAF rules for /auth/*

### Production Validation
Apply:
- Load test OTP send/verify at 10x expected Diwali traffic
- Chaos: Redis failover during active refresh rotation
- Golden path tests in test-golden-agents for Phase 1 auth
- ADR when switching SMS provider or JWT signing algorithm

### Observability & SLO
Apply:
- Metrics: otp_send_success, verify_latency_p99, refresh_errors
- Alert on abnormal verify failure ratio per country code
- Structured logs without PII — hash phone and mask tokens
- Dashboard for session count and Redis memory pressure

### Indian Market Auth
Apply:
- Optimize OTP UX for intermittent connectivity — retry with backoff
- Fallback email magic link when SMS delayed >30s
- Support Hindi/Telugu error strings via i18n ARB keys
- Low-data mode: minimize auth payload sizes on first launch

### Compliance & Governance
Apply:
- Enforce platform-governance/security-rules.md on every PR
- Document data retention for OTP logs and session metadata
- PII minimization in JWT claims and audit exports
- Coordinate governance-compliance-agent on policy updates

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
node scripts/test-golden-agents.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/phase-1/auth-service-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/phase-1/auth-service-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
