---
name: stream-heaven-master-brain-decision-engine-basic
description: >-
  Basic Cursor skill for Stream Heaven Decision Engine (phase 3).
  Single-agent execution with governance prefix and structural validation.
---

# Decision Engine — Basic

## When to use

- User invokes **Decision Engine** or work in **master-brain** (phase 3)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/master-brain/decision-engine.md`
- **Role:** Decision Engine specialist for Stream Heaven's master brain domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/master-brain/decision-engine.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Task Routing & Delegation
Route:
- Synthesize cross-domain context for Decision from AGENT-REGISTRY.md, governance, and active roadmaps. (Decision Engine scope)
- task-router.md selection by domain, phase, and keywords
- single-agent vs multi-chat orchestration decision tree
- scope boundaries to prevent agent overlap
- dependency-ordered execution for cross-service work
- escalation paths when no agent matches

### Quality Gate Enforcement
Gate:
- validate-agents.mjs before catalog merges
- validate-agent-skills.mjs for skill pair integrity
- contract diff review before implementation
- smoke test requirements per phase exit
- production-readiness-checklist alignment
- Decompose ambiguous goals into phased agent task graphs with decision-engine conflict resolution.

### Handoff Management
Document:
- structured handoff artifacts: context, decisions, blockers
- agent ## Dependencies paths in every delegation
- contract-first reminders in cross-agent prompts
- test plan attachment before quality-gate sign-off
- rollback notes for risky multi-service changes
- Prioritize foundation phases before feature expansion in social, livestream, games, or web3 domains.

### Workflow Orchestration
Sequence:
- Phase 1→2→2a→8→9 dependency ordering
- parallel vs serial agent activation rules
- chat-coordinator for multi-window Cursor sessions
- agent-scheduler for long-running validation loops
- pipeline-builder for CI-aligned local workflows

### Governance Prefix
Apply:
- MASTER-AI-OPERATING-SYSTEM.md load on every orchestration start
- no duplicate services — services/ catalog check
- ADR requirement for architecture forks
- smallest correct diff principle across delegations
- English in code; i18n ARB for user strings

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

- Basic: `.cursor/skills/stream-heaven/master-brain/decision-engine/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/master-brain/decision-engine/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
