---
name: stream-heaven-core-engineering-database-postgres-architect-basic
description: >-
  Basic Cursor skill for Stream Heaven Postgres Architect (phase 5).
  Single-agent execution with governance prefix and structural validation.
---

# Postgres Architect — Basic

## When to use

- User invokes **Postgres Architect** or work in **core-engineering/database** (phase 5)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/core-engineering/database/postgres-architect.md`
- **Role:** Postgres Architect specialist for Stream Heaven's database domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/core-engineering/database/postgres-architect.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Schema Design
Apply:
- One schema owner per NestJS service — no cross-service FKs
- UUID primary keys; timestamptz for all audit columns
- Soft delete with deleted_at where GDPR export requires
- Index strategy: composite indexes for feed and wallet hot queries

### Migration
Apply:
- Reversible migrations via migration-manager conventions
- Expand-contract pattern for zero-downtime column changes
- Migration ordering in CI before deploy
- Never destructive migration without ADR and backup plan

### Performance
Apply:
- Connection pool tuning per service and PgBouncer when needed
- EXPLAIN ANALYZE on p99 offenders with query-optimization-agent
- Partition large tables: messages, wallet_ledger, analytics events
- Read replica routing for read-heavy profile and feed queries

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

- Basic: `.cursor/skills/stream-heaven/core-engineering/database/postgres-architect/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/database/postgres-architect/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
