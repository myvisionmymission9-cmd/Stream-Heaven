---
name: stream-heaven-core-engineering-backend-nestjs-architect-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Nestjs Architect (phase 5).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Nestjs Architect — Advanced

## When to use

- User invokes **Nestjs Architect** or work in **core-engineering/backend** (phase 5)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/core-engineering/backend/nestjs-architect.md`
- **Role:** NestJS Architect specialist for Stream Heaven backend — module boundaries, DI patterns, guards/interceptors, microservice layout, and shared library consumption.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Microservice Architecture
Apply:
- Define bounded contexts per NestJS service in services/
- Inter-service HTTP/gRPC with timeout, retry, and bulkhead patterns
- Shared kernel limited to packages/shared-types and contracts
- ADR before extracting monolith modules to new deployables

### Event-Driven NestJS
Apply:
- Emit domain events via Redis pub/sub or message broker adapters
- Idempotent event consumers with dedup keys
- Outbox pattern for reliable event publish after DB commit
- Coordinate socketio-architect on realtime fan-out

### Performance & Scale
Apply:
- Profile p99 handlers; fix N+1 queries and missing indexes
- Caching strategy with redis-cache-specialist
- Horizontal scale: stateless pods, shared Redis sessions
- Load test critical paths before Phase 8/9 GA

### Production Operations
Apply:
- Health/readiness/liveness endpoints per kubernetes-agent standards
- Structured JSON logging with correlation IDs
- Graceful shutdown on SIGTERM for in-flight requests
- Feature flags via decision-engine for risky deploys

### Security Architecture
Apply:
- Input sanitization, SQL injection prevention, SSRF guards on outbound HTTP
- Secrets from AWS Secrets Manager; rotate DB credentials
- Dependency audit in CI; block critical CVE merges
- Align with security-rules.md on every new external integration

### Cross-Agent Coordination
Apply:
- Hand off OpenAPI drafts to api-contract-author before implementation
- Review phase-1 service agents PRs for NestJS consistency
- Quality-gate checklist for new service bootstrap
- Document NestJS conventions in platform-governance engineering-rules.md

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

- Basic: `.cursor/skills/stream-heaven/core-engineering/backend/nestjs-architect/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/backend/nestjs-architect/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
