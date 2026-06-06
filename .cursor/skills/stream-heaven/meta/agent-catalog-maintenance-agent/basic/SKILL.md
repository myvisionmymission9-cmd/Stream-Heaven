---
name: stream-heaven-meta-agent-catalog-maintenance-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Agent Catalog Maintenance (phase Meta (ongoing)).
  Single-agent execution with governance prefix and structural validation.
---

# Agent Catalog Maintenance — Basic

## When to use

- User invokes **Agent Catalog Maintenance** or work in **meta** (phase Meta (ongoing))
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/meta/agent-catalog-maintenance-agent.md`
- **Role:** Meta-agent that maintains the Stream Heaven agent catalog — skills, responsibilities, validation scripts, manifest sync, and scoped git commits for catalog-only changes.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/meta/agent-catalog-maintenance-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Agent Discovery & Inventory
Apply:
- Scan ai-agents/, apps/**/agents/, and apps/*/*-agent.md for catalog changes
- Use list-agents.mjs --phase --domain --search for filtered discovery
- Compare filesystem agents against AGENT-REGISTRY.md entries
- Classify git changes as catalog vs unrelated before staging

### Skill Generation & Enrichment
Apply:
- Run generate-agent-skills.mjs --force for new or updated agents
- Run enrich-agent-responsibilities.mjs --force after responsibility template edits
- Apply hand-authored blocks from agent-skill-enrichments.mjs for golden agents
- Ensure basic and advanced SKILL.md paths match agent ## Skills section

### Validation & Quality Gates
Apply:
- Run validate-agents.mjs — target 0 FAIL, minimize PARTIAL
- Run validate-agent-skills.mjs — all manifest skill files present
- Run validate-all-agent-skills.mjs — advanced competency 500+ chars
- Fix thin skills before commit; never commit broken catalog

### Git Commit Hygiene
Apply:
- Stage only ai-agents/**, apps/**/agents/**, .cursor/skills/stream-heaven/**
- Include scripts: generate-agent-skills, enrich-agent-responsibilities, templates, validators
- Exclude phase1-runtime-log.txt, apps/mobile/**, unrelated bootstrap .ps1
- Use WHY-focused commit messages; never push unless user requests

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

- Basic: `.cursor/skills/stream-heaven/meta/agent-catalog-maintenance-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/meta/agent-catalog-maintenance-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
