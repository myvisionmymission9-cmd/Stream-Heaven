---
name: stream-heaven-core-engineering-database-migration-manager-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Migration Manager (phase 5).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Migration Manager — Advanced

## When to use

- User invokes **Migration Manager** or work in **core-engineering/database** (phase 5)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/core-engineering/database/migration-manager.md`
- **Role:** Migration Manager specialist for Stream Heaven's database domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Redis Cluster Architecture
Architect:
- Design and implement database capabilities for Stream Heaven. (Migration Manager scope)
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
- Follow platform-governance standards for all outputs.

### Streams & Event Backbones
Leverage:
- Redis Streams consumer groups for domain events
- at-least-once delivery with pending entry recovery
- stream trimming policies for retention compliance
- cross-service event catalog alignment
- migration path to Kafka for analytics fan-out
- Coordinate with dependent agents and shared packages.

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

- Basic: `.cursor/skills/stream-heaven/core-engineering/database/migration-manager/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/database/migration-manager/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
