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

### Platform Governance Compliance
Follow:
- Map each task to required governance docs (security, API, database, deployment, testing, AI usage). (Governance Compliance scope)
- MASTER-AI-OPERATING-SYSTEM.md as primary authority
- 22 platform-governance documents by domain relevance
- feature-approval-rules.md gates before new capabilities
- engineering-rules.md and security-rules.md on every change
- production-readiness-checklist before launch

### Contract-First Enforcement
Require:
- OpenAPI definitions before NestJS implementation
- breaking change review with api-contract-author
- shared-contracts versioning and changelog discipline
- mobile client codegen sync after contract updates
- no undocumented public API surfaces
- Block work that duplicates services, bypasses api-gateway, or violates contract-first rules in `packages/shared-contracts/`.

### Agent Catalog Integrity
Maintain:
- AGENT-REGISTRY.md accuracy after agent changes
- validate-agents.mjs PASS/FAIL on catalog edits
- boilerplate responsibility detection and enrichment
- skill pair completeness via validate-agent-skills.mjs
- golden agent tests for structural regression
- Produce a compliance checklist with pass/fail per governance file before merge.

### ADR & Architecture Forks
Document:
- docs/adr/SH-000-template.md for all architecture forks
- no duplicate services — services/ catalog audit
- chief-architect and cto-agent review for major forks
- phase gate criteria before advancing roadmap
- rollback plans attached to ADR proposals

### Audit & Reporting
Report:
- governance compliance checklists per deliverable
- non-compliance escalation to quality-gate
- periodic audits of secrets and dependency risks
- documentation drift detection vs implementation
- founder-war-room governance status summaries

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
