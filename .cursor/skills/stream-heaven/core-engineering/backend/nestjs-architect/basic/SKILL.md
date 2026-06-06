---
name: stream-heaven-core-engineering-backend-nestjs-architect-basic
description: >-
  Basic Cursor skill for Stream Heaven Nestjs Architect (phase 5).
  Single-agent execution with governance prefix and structural validation.
---

# Nestjs Architect — Basic

## When to use

- User invokes **Nestjs Architect** or work in **core-engineering/backend** (phase 5)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/core-engineering/backend/nestjs-architect.md`
- **Role:** NestJS Architect specialist for Stream Heaven backend — module boundaries, DI patterns, guards/interceptors, microservice layout, and shared library consumption.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/core-engineering/backend/nestjs-architect.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### NestJS Module Design
Apply:
- Standard layout: module, controller, service, dto, entity, guard per domain
- Use dependency injection for testability and cross-cutting concerns
- Global ValidationPipe, exception filters, and interceptors
- ConfigModule with Joi/env validation — no hardcoded secrets

### API & DTO
Apply:
- class-validator DTOs aligned with OpenAPI in shared-contracts
- Consistent pagination, sorting, and error response shapes
- Swagger decorators generated from or synced to contracts
- Idempotency keys on POST mutations where required

### Persistence
Apply:
- TypeORM/Prisma patterns with migration discipline
- Transaction boundaries for wallet and multi-table updates
- Connection pooling tuned for Postgres on small instances
- Read/write split awareness for replica lag

### Auth Integration
Apply:
- JwtAuthGuard consuming gateway-forwarded headers or direct JWT
- Role-based guards for admin and creator endpoints
- Service-to-service auth for internal NestJS calls
- Never log raw tokens or OTP values

### Testing
Apply:
- Unit tests for services with mocked repositories
- e2e tests with supertest against bootstrap module
- Contract test hooks for OpenAPI compliance
- Run npm test in CI before merge to main

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

- Basic: `.cursor/skills/stream-heaven/core-engineering/backend/nestjs-architect/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/backend/nestjs-architect/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
