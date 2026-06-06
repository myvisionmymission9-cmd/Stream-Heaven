---
name: stream-heaven-core-engineering-backend-microservice-designer-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Microservice Designer (phase 5).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Microservice Designer — Advanced

## When to use

- User invokes **Microservice Designer** or work in **core-engineering/backend** (phase 5)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/core-engineering/backend/microservice-designer.md`
- **Role:** Microservice Designer specialist for Stream Heaven's backend domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Microservice Extraction Patterns
Architect:
- Design and implement backend capabilities for Stream Heaven. (Microservice Designer scope)
- bounded context identification for service splits
- strangler fig migration from monolith modules
- shared database vs database-per-service trade-offs
- saga patterns for cross-service transactions
- ADR template for new microservice extraction

### Advanced Async Patterns
Implement:
- Bull queue job retry and dead letter policies
- Redis Streams consumer groups for event processing
- outbox pattern for reliable event publishing
- scheduled tasks with @nestjs/schedule
- backpressure handling in high-volume consumers
- Follow platform-governance standards for all outputs.

### Performance & Scalability
Optimize:
- connection pooling for PostgreSQL and Redis
- response compression and ETag caching
- query optimization with TypeORM/Prisma best practices
- horizontal scaling with stateless service design
- load testing methodology for NestJS services
- Coordinate with dependent agents and shared packages.

### Security Architecture
Harden:
- RBAC guard implementation across services
- input sanitization and SQL injection prevention
- secrets management via AWS Secrets Manager
- API rate limiting tiers by endpoint sensitivity
- security headers and CORS policies

### Testing Strategy
Validate:
- unit tests with mocked repositories
- integration tests with testcontainers PostgreSQL/Redis
- contract tests against OpenAPI specs
- e2e tests through api-gateway
- test coverage gates in CI pipeline

### Observability Integration
Instrument:
- OpenTelemetry tracing across NestJS middleware stack
- Prometheus metrics endpoints per service
- structured JSON logging with log levels
- health check aggregation for kubernetes probes
- alerting on error rate and latency SLO breaches

### Multi-Agent Orchestration
Coordinate:
- microservice-designer for cross-service transactions
- postgres-architect for schema ownership
- api-contract-author for contract-first workflow
- redis-cache-specialist for caching policies
- kubernetes-agent for deployment manifests

### Production Readiness
Ensure:
- graceful shutdown with in-flight request draining
- zero-downtime deployment strategies
- database migration safety checks
- rollback procedures for failed deployments
- production-readiness-checklist alignment

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

- Basic: `.cursor/skills/stream-heaven/core-engineering/backend/microservice-designer/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/backend/microservice-designer/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
