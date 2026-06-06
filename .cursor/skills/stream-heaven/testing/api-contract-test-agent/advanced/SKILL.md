---
name: stream-heaven-testing-api-contract-test-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Api Contract Test (phase 20).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Api Contract Test — Advanced

## When to use

- User invokes **Api Contract Test** or work in **testing** (phase 20)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/testing/api-contract-test-agent.md`
- **Role:** Api Contract Test Agent specialist for Stream Heaven — automated tests that verify NestJS implementations honor packages/shared-contracts OpenAPI schemas.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Microservice Extraction Patterns
Architect:
- Generate contract tests from OpenAPI specs (Dredd, Schemathesis, or custom supertest + ajv). (Api Contract Test scope)
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
- Assert request/response shapes, status codes, and error envelopes per api-standards.md.

### Performance & Scalability
Optimize:
- connection pooling for PostgreSQL and Redis
- response compression and ETag caching
- query optimization with TypeORM/Prisma best practices
- horizontal scaling with stateless service design
- load testing methodology for NestJS services
- Run consumer-driven tests for Flutter client critical paths (auth, profile, feed).

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

- Basic: `.cursor/skills/stream-heaven/testing/api-contract-test-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/testing/api-contract-test-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
