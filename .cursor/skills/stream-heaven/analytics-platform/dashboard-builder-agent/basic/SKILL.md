---
name: stream-heaven-analytics-platform-dashboard-builder-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Dashboard Builder (phase 19).
  Single-agent execution with governance prefix and structural validation.
---

# Dashboard Builder — Basic

## When to use

- User invokes **Dashboard Builder** or work in **analytics-platform** (phase 19)
- Focused task within this agent's scope

## Agent

- **Path:** `analytics-platform/agents/dashboard-builder-agent.md`
- **Role:** Dashboard Builder Agent specialist for Stream Heaven's analytics platform domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `analytics-platform/agents/dashboard-builder-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Domain Expertise
Apply:
- Provide executive guidance for Dashboard Builder across Social, Livestream, Astro, and Media strategic priorities. (Dashboard Builder scope)
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
- Review phase gates, resource allocation, and OKR alignment before major platform investments.

### Technical Execution
Execute:
- NestJS backend patterns for service implementations
- Flutter/Riverpod patterns for mobile UI work
- PostgreSQL schema design with migration safety
- Redis caching and pub/sub where appropriate
- Socket.IO realtime integration when required
- Arbitrate cross-functional tradeoffs: velocity, cost, safety, and Indian market reach.

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
| Deep skill check | `node scripts/validate-all-agent-skills.mjs` |

## Validation

```powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
node scripts/validate-all-agent-skills.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/analytics-platform/dashboard-builder-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/analytics-platform/dashboard-builder-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
