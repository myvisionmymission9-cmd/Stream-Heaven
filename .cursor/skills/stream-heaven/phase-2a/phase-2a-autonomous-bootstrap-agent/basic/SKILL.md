---
name: stream-heaven-phase-2a-phase-2a-autonomous-bootstrap-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Phase 2a Autonomous Bootstrap (phase 2a).
  Single-agent execution with governance prefix and structural validation.
---

# Phase 2a Autonomous Bootstrap — Basic

## When to use

- User invokes **Phase 2a Autonomous Bootstrap** or work in **phase-2a** (phase 2a)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/phase-2a/phase-2a-autonomous-bootstrap-agent.md`
- **Role:** Fully autonomous Phase 2a bootstrap — ensure Phase 1 backend is healthy, run Flutter setup, validate `flutter analyze` / `flutter test`, and document Chrome run steps without requiring user involvement except when launching the browser UI.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/phase-2a/phase-2a-autonomous-bootstrap-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Phase 1 Foundation Setup
Bootstrap:
- Bootstrap NestJS api-gateway (port 3000) routing for Phase 2a Autonomous Bootstrap and Phase 1 service prefixes. (Phase 2a Autonomous Bootstrap scope)
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
- Configure JWT validation middleware using auth-service public keys before upstream proxy calls.

### Auth & Identity Foundation
Implement:
- Firebase Auth bridge with OTP login flow
- JWT issuance and Redis session management
- api-gateway JWT validation middleware
- user profile linkage via JWT sub claim
- rate limiting on authentication endpoints
- Add Redis-backed rate limiting per IP and authenticated user tier with 429 Retry-After responses.

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

## Validation

```powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
node scripts/validate-all-agent-skills.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/phase-2a/phase-2a-autonomous-bootstrap-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/phase-2a/phase-2a-autonomous-bootstrap-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
