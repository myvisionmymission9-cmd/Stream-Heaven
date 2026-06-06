---
name: stream-heaven-phase-1-phase-1-autonomous-completion-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Phase 1 Autonomous Completion (phase 1).
  Single-agent execution with governance prefix and structural validation.
---

# Phase 1 Autonomous Completion — Basic

## When to use

- User invokes **Phase 1 Autonomous Completion** or work in **phase-1** (phase 1)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/phase-1/phase-1-autonomous-completion-agent.md`
- **Role:** Fully autonomous Phase 1 completion specialist — finish ALL remaining Phase 1 runtime, code-quality, and documentation tasks without user involvement unless Docker Desktop engine is down.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/phase-1/phase-1-autonomous-completion-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Phase 1 Orchestration
Apply:
- Run full bootstrap: Docker Postgres/Redis, four NestJS services, smoke suite
- Collect evidence: health JSON, OTP log snippet, smoke PASS output
- Sequence validate-agents → validate-agent-skills → golden tests
- Update docs/FINAL-READINESS-REPORT.md with dated PASS/FAIL summary

### Exit Criteria
Apply:
- Gateway /health aggregates auth, profile, realtime upstream status
- Auth OTP register → verify → JWT → profile CRUD chain works
- Realtime socket ping/pong or room join smoke passes
- No secrets committed; .env.example documents all required vars

### Remediation Routing
Apply:
- Route compile errors to phase-1-remediation-agent and nestjs-architect
- Route contract mismatches to openapi-contract-validation-agent
- Route Docker issues to local-dev-bootstrap-agent
- Block Phase 2a until two consecutive green Phase 1 runs

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

- Basic: `.cursor/skills/stream-heaven/phase-1/phase-1-autonomous-completion-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/phase-1/phase-1-autonomous-completion-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
