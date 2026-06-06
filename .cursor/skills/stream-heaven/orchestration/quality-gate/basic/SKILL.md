---
name: stream-heaven-orchestration-quality-gate-basic
description: >-
  Basic Cursor skill for Stream Heaven Quality Gate (phase 4).
  Single-agent execution with governance prefix and structural validation.
---

# Quality Gate — Basic

## When to use

- User invokes **Quality Gate** or work in **orchestration** (phase 4)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/orchestration/quality-gate.md`
- **Role:** Orchestration Quality Gate specialist for Stream Heaven — enforces deliverable checks before agent handoffs merge code, contracts, or docs into the monorepo.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/orchestration/quality-gate.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Domain Expertise
Apply:
- Define quality gate checklist per artifact type (NestJS service, Flutter feature, OpenAPI change, agent .md). (Quality Gate scope)
- deep understanding of assigned domain responsibilities
- platform-governance standards for all outputs
- contract-first design in packages/shared-contracts/
- coordination with dependent agents listed in agent file
- optimization for Indian market constraints

### Implementation Standards
Follow:
- smallest correct diff for all changes
- existing codebase conventions in apps/, services/, packages/
- no duplicate services — check services/ first
- no secrets in code — env vars and Secrets Manager only
- English in code; user strings via i18n ARB files
- Block handoffs missing governance references, tests, or shared-contracts updates.

### Technical Execution
Execute:
- NestJS backend patterns for service implementations
- Flutter/Riverpod patterns for mobile UI work
- PostgreSQL schema design with migration safety
- Redis caching and pub/sub where appropriate
- Socket.IO realtime integration when required
- Run validate-agents.mjs on new/changed agent files in PR scope.

### Quality & Validation
Validate:
- node scripts/validate-agents.mjs after agent edits
- contract validation against OpenAPI specs
- integration tests for critical paths
- low-end Android performance verification
- documentation of decisions and handoff artifacts

### Governance & Handoff
Document:
- MASTER-AI-OPERATING-SYSTEM.md as primary context
- governance references listed in agent file
- integration notes for downstream agents
- test strategy and acceptance criteria
- escalation paths for out-of-scope decisions

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| Shared contracts | `packages/shared-contracts/` |
| Validate agents | `node scripts/validate-agents.mjs` |
| Validate skills | `node scripts/validate-agent-skills.mjs` |

## Validation

```powershell
node scripts/validate-agents.mjs
node scripts/validate-all-agent-skills.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/orchestration/quality-gate/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/orchestration/quality-gate/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
