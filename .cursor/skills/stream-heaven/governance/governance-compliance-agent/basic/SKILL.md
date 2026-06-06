---
name: stream-heaven-governance-governance-compliance-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Governance Compliance (phase 1 (governance)).
  Single-agent execution with governance prefix and structural validation.
---

# Governance Compliance — Basic

## When to use

- User invokes **Governance Compliance** or work in **governance** (phase 1 (governance))
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/governance/governance-compliance-agent.md`
- **Role:** Phase 1 governance specialist — enforces the 22 `platform-governance/` documents before any implementation, contract change, or agent invocation across Stream Heaven.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/governance/governance-compliance-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Governance Mapping
Apply:
- Map tasks to 22 platform-governance/ files with required vs optional compliance
- Produce per-PR compliance matrix: security, API, database, deployment, testing
- Block secrets in code, duplicate services, and gateway bypass patterns
- Enforce Phase 1 before Phase 8 ordering in agent task routing

### Agent Catalog Compliance
Apply:
- Validate agent .md has Role, Responsibilities, Dependencies, Governance References
- Coordinate agent-skill-validator-agent on Skills section health
- Flag boilerplate Responsibilities for enrich-agent-responsibilities.mjs
- Require ADR reference when agent proposes new service in services/

### Contract-First Enforcement
Apply:
- No NestJS controller without packages/shared-contracts OpenAPI entry
- Version breaking API changes with deprecation window
- Coordinate api-contract-author on schema ownership
- Block Flutter client work on undocumented endpoints

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

- Basic: `.cursor/skills/stream-heaven/governance/governance-compliance-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/governance/governance-compliance-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
