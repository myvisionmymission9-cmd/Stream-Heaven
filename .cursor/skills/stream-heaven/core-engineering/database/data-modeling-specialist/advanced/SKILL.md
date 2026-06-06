---
name: stream-heaven-core-engineering-database-data-modeling-specialist-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Data Modeling Specialist (phase 5).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Data Modeling Specialist — Advanced

## When to use

- User invokes **Data Modeling Specialist** or work in **core-engineering/database** (phase 5)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/core-engineering/database/data-modeling-specialist.md`
- **Role:** Data Modeling Specialist specialist for Stream Heaven's database domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Redis Cluster Architecture
Architect:
- Design Data Modeling ML pipelines: feature store, training jobs, inference endpoints, and fallbacks. (Data Modeling Specialist scope)
- hash slot planning for even key distribution
- read replica routing for session reads
- cluster failover drills and split-brain prevention
- cross-AZ latency budgets for Indian regions
- Elasticache vs self-managed trade-off ADRs

### Performance Tuning
Tune:
- pipeline batching for bulk cache operations
- Lua scripts for atomic multi-key updates
- connection pooling sizing per NestJS service
- large key detection and structural refactoring
- slowlog analysis and hot key resharding
- Define event ingestion from PostgreSQL and Redis streams into embedding and ranking services.

### Streams & Event Backbones
Leverage:
- Redis Streams consumer groups for domain events
- at-least-once delivery with pending entry recovery
- stream trimming policies for retention compliance
- cross-service event catalog alignment
- migration path to Kafka for analytics fan-out
- Set inference cost budgets, caching, and model distillation per cost-control-rules.md.

### Distributed Locks & Coordination
Coordinate:
- Redlock patterns for wallet debit serialization
- lock TTL and fencing token best practices
- leader election for cron and batch workers
- idempotency keys for payment and gift events
- chaos tests for lock holder crash scenarios

### Security Hardening
Harden:
- TLS in transit for managed Redis endpoints
- ACL users per microservice with least privilege
- command renaming/disabling dangerous commands in prod
- VPC security group isolation
- audit logging for admin commands

### Observability
Monitor:
- memory, ops/sec, and hit ratio dashboards
- alerting on replication lag and failover events
- tracing cache calls with correlation IDs
- SLI definitions for cache availability
- runbooks for cache stampede incidents

### Production Validation
Validate:
- load tests for session and rate limit throughput
- failover game days with chaos-engineering-agent
- contract tests for cache invalidation events
- data consistency checks after invalidation storms
- golden tests for TTL and lock edge cases

### Multi-Agent Orchestration
Coordinate:
- socketio-architect for adapter configuration
- auth-service-agent for session TTL policies
- nestjs-architect for Redis module injection patterns
- kubernetes-agent for Redis StatefulSet manifests
- ADR for cluster topology changes

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

- Basic: `.cursor/skills/stream-heaven/core-engineering/database/data-modeling-specialist/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/database/data-modeling-specialist/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
