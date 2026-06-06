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

### Gate Checklist
Apply:
- NestJS PR gate: health endpoints, guards, OpenAPI sync, npm test green
- Flutter PR gate: analyze clean, widget tests on auth/profile paths
- Agent .md gate: governance refs, Dependencies resolve, Skills paths exist
- Contract gate: shared-contracts diff reviewed before implementation merge

### Validation Script
Apply:
- Run node scripts/validate-agents.mjs on ai-agents/ and apps/ agent changes
- Run validate-agent-skills.mjs and validate-all-agent-skills.mjs on skill updates
- Trigger test-golden-agents.mjs when agent prompt templates change
- Block merge on non-zero exit codes without documented waiver ADR

### Handoff Review
Apply:
- Verify handoff-manager package: artifacts, tests, governance checklist
- Confirm task-router assigned correct owner agent
- Check openapi-contract-validation-agent sign-off on API changes
- Require smoke test PASS for Phase 1 service modifications

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

- Basic: `.cursor/skills/stream-heaven/orchestration/quality-gate/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/orchestration/quality-gate/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
