---
name: stream-heaven-core-engineering-database-redis-cache-specialist-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Redis Cache Specialist (phase 5).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Redis Cache Specialist — Advanced

## When to use

- User invokes **Redis Cache Specialist** or work in **core-engineering/database** (phase 5)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/core-engineering/database/redis-cache-specialist.md`
- **Role:** Redis Cache Specialist specialist for Stream Heaven's database domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Cluster Operations
Apply:
- Memory maxmemory policy: volatile-lru for cache workloads
- Slowlog monitoring and hot key detection
- Failover drill with realtime-systems-agent
- Elasticache/Redis Cluster vs single-node dev parity
- Document TTL strategy per key prefix in shared-contracts cache notes

### Festival Scale
Apply:
- Pre-warm feed and room keys before known events
- Emergency eviction playbook when memory > 90%
- Coordinate autoscaling-agent on node count
- Post-event cache flush validation

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

- Basic: `.cursor/skills/stream-heaven/core-engineering/database/redis-cache-specialist/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/database/redis-cache-specialist/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
