---
name: stream-heaven-core-engineering-backend-api-gateway-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Api Gateway (phase 5).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Api Gateway — Advanced

## When to use

- User invokes **Api Gateway** or work in **core-engineering/backend** (phase 5)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/core-engineering/backend/api-gateway-agent.md`
- **Role:** Api Gateway Agent specialist for Stream Heaven's backend domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Deploy & Resilience
Apply:
- Blue/green and canary deploy with automatic rollback on error budget burn
- Circuit breaker per upstream with half-open probe policy
- Graceful shutdown and connection draining
- Chaos: auth service outage — protected routes fail closed

### Multi-Environment
Apply:
- Dev/staging/prod upstream URL parity via env templates
- Coordinate kubernetes-agent on ingress and HPA for gateway pods
- ADR for managed API gateway (Kong/AWS) vs custom NestJS at scale
- Quality-gate checklist for every new proxied path

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

- Basic: `.cursor/skills/stream-heaven/core-engineering/backend/api-gateway-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/backend/api-gateway-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
