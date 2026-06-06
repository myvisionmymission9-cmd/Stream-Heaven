---
name: stream-heaven-core-engineering-database-postgres-architect-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Postgres Architect (phase 5).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Postgres Architect — Advanced

## When to use

- User invokes **Postgres Architect** or work in **core-engineering/database** (phase 5)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/core-engineering/database/postgres-architect.md`
- **Role:** Postgres Architect specialist for Stream Heaven's database domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Reliability & DR
Apply:
- RPO/RTO targets per revenue-critical database
- Point-in-time recovery drills quarterly
- Failover runbook with rollback-coordinator
- Logical replication for analytics warehouse with data-warehouse-agent

### Domain-Specific Schema
Apply:
- Wallet double-entry ledger tables with idempotency keys
- Social graph edge tables with efficient block/mute queries
- Livestream room state with optimistic locking
- Astro consultation booking with timezone-aware slots

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

- Basic: `.cursor/skills/stream-heaven/core-engineering/database/postgres-architect/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/database/postgres-architect/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
