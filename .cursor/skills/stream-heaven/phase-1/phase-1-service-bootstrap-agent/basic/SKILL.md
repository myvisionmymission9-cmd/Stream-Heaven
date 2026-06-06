---
name: stream-heaven-phase-1-phase-1-service-bootstrap-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Phase 1 Service Bootstrap (phase 1).
  Single-agent execution with governance prefix and structural validation.
---

# Phase 1 Service Bootstrap — Basic

## When to use

- User invokes **Phase 1 Service Bootstrap** or work in **phase-1** (phase 1)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/phase-1/phase-1-service-bootstrap-agent.md`
- **Role:** Zero-involvement Phase 1 runtime bootstrap — start Docker (or skip if up), launch all four NestJS dev services, wait for health, and run smoke tests on Windows without user interaction.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/phase-1/phase-1-service-bootstrap-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Phase 1 Foundation Setup
Bootstrap:
- Kill stale processes on ports 3000, 3001, 3002, 3009 before starting Phase 1 NestJS dev services. (Phase 1 Service Bootstrap scope)
- Docker Postgres and Redis via setup-phase1.ps1
- NestJS service scaffolds in services/
- api-gateway on port 3000 as single entry point
- auth-service (3001) and user-service (3002) boot order
- environment templates without secrets in repo

### Contract-First Development
Define:
- OpenAPI specs in packages/shared-contracts before code
- shared-types generation from contract schemas
- breaking change detection in CI validation
- api-contract-author review for new endpoints
- gateway proxy rules aligned with contract paths
- Start Docker postgres/redis via docker compose or honor -SkipDocker when containers already healthy.

### Auth & Identity Foundation
Implement:
- Firebase Auth bridge with OTP login flow
- JWT issuance and Redis session management
- api-gateway JWT validation middleware
- user profile linkage via JWT sub claim
- rate limiting on authentication endpoints
- Copy .env.example to .env for auth, user, gateway, and realtime services when files are missing.

### Local Dev & Validation
Run:
- setup-phase1.ps1 for Windows Docker bootstrap
- smoke tests for gateway health and auth flow
- validate-agents.mjs after agent catalog changes
- phase1:complete npm script for full validation gate
- handoff documentation for Phase 2 agents

### Governance Compliance
Follow:
- MASTER-AI-OPERATING-SYSTEM.md as primary context
- platform-governance/engineering-rules.md standards
- no duplicate services — check services/ first
- ADR for any Phase 1 architecture deviations
- smallest correct diff for all Phase 1 changes

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| Shared contracts | `packages/shared-contracts/` |
| Validate agents | `node scripts/validate-agents.mjs` |
| Validate skills | `node scripts/validate-agent-skills.mjs` |
| Deep skill check | `node scripts/validate-all-agent-skills.mjs` |
| Phase 1 setup | `scripts/setup-phase1.ps1` |

## Validation

```powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
node scripts/validate-all-agent-skills.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/phase-1/phase-1-service-bootstrap-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/phase-1/phase-1-service-bootstrap-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
