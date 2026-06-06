---
name: stream-heaven-orchestration-senior-code-review-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Senior Code Review (phase 4).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Senior Code Review — Advanced

## When to use

- User invokes **Senior Code Review** or work in **orchestration** (phase 4)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/orchestration/senior-code-review-agent.md`
- **Role:** Senior Code Review Agent specialist for Stream Heaven's orchestration domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### System Design Review
Apply:
- Coordinate system-design-reviewer-agent on cross-service PRs
- Challenge N+1 queries, missing indexes, unbounded fan-out
- Review idempotency on wallet and gift mutations
- Scale implications for livestream and feed hot paths

### Governance Enforcement
Apply:
- platform-governance/ compliance per governance-compliance-agent matrix
- No duplicate services in services/
- Phase ordering: no Phase 8 feature without Phase 1 auth path
- Escalate repeat offenders to rollback-coordinator

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

- Basic: `.cursor/skills/stream-heaven/orchestration/senior-code-review-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/orchestration/senior-code-review-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
