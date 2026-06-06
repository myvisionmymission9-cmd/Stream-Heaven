---
name: stream-heaven-testing-api-contract-test-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Api Contract Test (phase 20).
  Single-agent execution with governance prefix and structural validation.
---

# Api Contract Test — Basic

## When to use

- User invokes **Api Contract Test** or work in **testing** (phase 20)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/testing/api-contract-test-agent.md`
- **Role:** Api Contract Test Agent specialist for Stream Heaven — automated tests that verify NestJS implementations honor packages/shared-contracts OpenAPI schemas.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/testing/api-contract-test-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### NestJS Module Architecture
Define:
- Generate contract tests from OpenAPI specs (Dredd, Schemathesis, or custom supertest + ajv). (Api Contract Test scope)
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
- Assert request/response shapes, status codes, and error envelopes per api-standards.md.

### Inter-Service Communication
Architect:
- sync REST via api-gateway for client-facing APIs
- async events via Redis pub/sub and Bull queues
- domain event emission to Redis Streams
- circuit breaker patterns for downstream calls
- idempotency keys for mutation endpoints
- Run consumer-driven tests for Flutter client critical paths (auth, profile, feed).

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

- Basic: `.cursor/skills/stream-heaven/testing/api-contract-test-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/testing/api-contract-test-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
