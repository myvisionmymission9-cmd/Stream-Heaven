---
name: stream-heaven-meta-agent-registry-auditor-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Agent Registry Auditor (phase Meta (ongoing)).
  Single-agent execution with governance prefix and structural validation.
---

# Agent Registry Auditor — Basic

## When to use

- User invokes **Agent Registry Auditor** or work in **meta** (phase Meta (ongoing))
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/meta/agent-registry-auditor-agent.md`
- **Role:** Meta-agent that keeps `ai-agents/AGENT-REGISTRY.md` synchronized with filesystem agent definitions, naming conventions, and phase/domain taxonomy.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/meta/agent-registry-auditor-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Registry Audit
Apply:
- Validate AGENT-REGISTRY.md paths exist on disk
- Detect duplicate agent titles and conflicting slugs
- Find orphan .md files under ai-agents/ and apps/**/agents/
- Verify @-mention paths match list-agents.mjs output

### Validation Script
Apply:
- Run validate-agents.mjs after bulk catalog edits
- Run test-golden-agents.mjs for prompt template regressions
- Coordinate validate-agent-skills.mjs on Skills path drift
- Report exit codes and fix list to agent maintainer

### Dependency Graph
Apply:
- Parse ## Dependencies and verify target files exist
- Detect circular agent dependencies for workflow-engine
- Flag missing governance references in agent frontmatter sections
- Score Responsibilities depth vs boilerplate detector

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

- Basic: `.cursor/skills/stream-heaven/meta/agent-registry-auditor-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/meta/agent-registry-auditor-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
