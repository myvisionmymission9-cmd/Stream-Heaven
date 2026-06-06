---
name: stream-heaven-phase-2a-phase-2a-autonomous-bootstrap-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Phase 2a Autonomous Bootstrap (phase 2a).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Phase 2a Autonomous Bootstrap — Advanced

## When to use

- User invokes **Phase 2a Autonomous Bootstrap** or work in **phase-2a** (phase 2a)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/phase-2a/phase-2a-autonomous-bootstrap-agent.md`
- **Role:** Fully autonomous Phase 2a bootstrap — ensure Phase 1 backend is healthy, run Flutter setup, validate `flutter analyze` / `flutter test`, and document Chrome run steps without requiring user involvement except when launching the browser UI.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Phase 1 Autonomous Completion
Orchestrate:
- Bootstrap NestJS api-gateway (port 3000) routing for Phase 2a Autonomous Bootstrap and Phase 1 service prefixes. (Phase 2a Autonomous Bootstrap scope)
- full phase1:complete validation loop with fix-and-retry
- Docker ensure scripts for Postgres/Redis health
- multi-service smoke test orchestration
- lint and test gap remediation across services
- documentation sync after autonomous completion

### Gateway Architecture
Architect:
- reverse proxy routing to auth, user, and future services
- JWT validation cache with JWKS rotation support
- request-id propagation and distributed tracing headers
- rate limiting tiers by route sensitivity
- health check aggregation for kubernetes readiness
- Configure JWT validation middleware using auth-service public keys before upstream proxy calls.

### Service Bootstrap Patterns
Standardize:
- NestJS module template from nestjs-architect
- shared health, logging, and metrics modules
- database migration workflow with TypeORM/Prisma
- Redis connection pooling and retry configuration
- inter-service communication matrix documentation
- Add Redis-backed rate limiting per IP and authenticated user tier with 429 Retry-After responses.

### Remediation & Recovery
Remediate:
- systematic diagnosis of Phase 1 validation failures
- Windows-safe PowerShell scripts for all fix operations
- CI alignment after local fix verification
- rollback procedures for failed migrations
- escalation paths for blockers requiring ADR

### Multi-Agent Orchestration
Coordinate:
- auth-service-agent and profile-service-agent handoffs
- api-gateway-bootstrap-agent route registration
- nestjs-architect module template alignment
- local-dev-bootstrap-agent environment setup
- quality-gate validation before Phase 2 entry

### Production Readiness Prep
Prepare:
- production-readiness-checklist gap analysis
- secrets management migration plan from env to AWS
- monitoring and alerting stub configuration
- database backup and recovery procedure documentation
- Phase 2 entry criteria verification

### Testing & Quality Gates
Validate:
- integration smoke tests for auth → profile flow
- contract validation against OpenAPI specs
- golden agent tests for Phase 1 agents
- CI pipeline alignment with local validation scripts
- test coverage thresholds for critical paths

### Documentation & Handoff
Document:
- Phase 1 completion report with PASS/FAIL status
- service port and endpoint reference card
- environment variable documentation (templates only)
- Phase 2 agent activation checklist
- known limitations and technical debt register

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

- Basic: `.cursor/skills/stream-heaven/phase-2a/phase-2a-autonomous-bootstrap-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/phase-2a/phase-2a-autonomous-bootstrap-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
