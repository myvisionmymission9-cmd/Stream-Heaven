---
name: stream-heaven-core-engineering-backend-microservice-designer-basic
description: >-
  Basic Cursor skill for Stream Heaven Microservice Designer (phase 5).
  Single-agent execution with governance prefix and structural validation.
---

# Microservice Designer — Basic

## When to use

- User invokes **Microservice Designer** or work in **core-engineering/backend** (phase 5)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/core-engineering/backend/microservice-designer.md`
- **Role:** Microservice Designer specialist for Stream Heaven's backend domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/core-engineering/backend/microservice-designer.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### NestJS Module Architecture
Define:
- Scaffold or extend NestJS modules for Microservice with health checks and structured logging. (Microservice Designer scope)
- module template for services/* (config, health, logging, metrics)
- feature module isolation with clear domain boundaries
- shared library consumption from packages/
- global vs scoped provider registration patterns
- lazy-loaded module strategy for large services

### Cross-Cutting Middleware
Standardize:
- global JWT auth guards across microservices
- rate limiting guards with Redis-backed counters
- validation pipes with class-validator DTOs
- exception filters for consistent error responses
- request-id and tracing interceptors
- Publish OpenAPI contracts in packages/shared-contracts before controller implementation.

### Inter-Service Communication
Architect:
- sync REST via api-gateway for client-facing APIs
- async events via Redis pub/sub and Bull queues
- domain event emission to Redis Streams
- circuit breaker patterns for downstream calls
- idempotency keys for mutation endpoints
- Use PostgreSQL for durable state and Redis for cache, sessions, or rate limits as appropriate.

### OpenAPI & Contract Alignment
Align:
- OpenAPI generation from NestJS decorators
- packages/shared-contracts as source of truth
- api-contract-author review workflow
- DTO mapping between contract and internal models
- breaking change detection in CI

### Service Scaffolding Standards
Document:
- folder structure: controllers, services, dto, entities
- health check and readiness probe endpoints
- structured logging with correlation IDs
- environment config via @nestjs/config
- Phase 1 build order alignment

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

- Basic: `.cursor/skills/stream-heaven/core-engineering/backend/microservice-designer/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/backend/microservice-designer/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
