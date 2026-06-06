# Chat 3 — Backend Microservices

## Scope

NestJS microservices, PostgreSQL, Redis, API gateway, CQRS, queues, RBAC, Docker, distributed tracing, migrations.

## Attach Folders

- `services/`
- `packages/shared-contracts/`
- `packages/shared-types/`
- `packages/shared-utils/`
- `ai-agents/core-engineering/backend/`
- `ai-agents/core-engineering/database/`
- `ai-agents/phase-1/`

## Primary Agents

| Agent | Path |
|-------|------|
| NestJS Architect | `ai-agents/core-engineering/backend/nestjs-architect.md` |
| Auth Service Agent | `ai-agents/phase-1/auth-service-agent.md` |
| Profile Service Agent | `ai-agents/phase-1/profile-service-agent.md` |
| API Gateway Bootstrap | `ai-agents/phase-1/api-gateway-bootstrap-agent.md` |
| Postgres Architect | `ai-agents/core-engineering/database/postgres-architect.md` |

## Deliverables

- [ ] `services/api-gateway/`
- [ ] `services/auth-service/`
- [ ] `services/user-service/`
- [ ] PostgreSQL schemas + migrations
- [ ] Redis cache strategy
- [ ] Docker Compose for local dev
- [ ] OpenAPI implementation matching contracts

## Phase Alignment

**Phase 1** — auth, user, gateway. **Phase 2+** — social, livestream services.

## Multi-Chat Ready

**Yes** (agents/docs) — **No** (service code not scaffolded). Highest priority for Phase 1 coding.
