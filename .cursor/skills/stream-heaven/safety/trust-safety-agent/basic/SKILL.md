---
name: stream-heaven-safety-trust-safety-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Trust Safety (phase 20).
  Single-agent execution with governance prefix and structural validation.
---

# Trust Safety — Basic

## When to use

- User invokes **Trust Safety** or work in **safety** (phase 20)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/safety/trust-safety-agent.md`
- **Role:** Trust & safety program enforcement.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/safety/trust-safety-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Policy & Enforcement
Apply:
- Community guidelines alignment across four apps
- Report taxonomy: spam, harassment, CSAM, fraud, impersonation
- Block/mute enforcement on API and Socket.IO layers
- Shadow-ban coordination without alerting bad actors

### Moderation Pipeline
Apply:
- Pre-publish ML scores via ai-moderation-agent hooks
- Human review queue SLA for high-severity reports
- Appeal workflow with appeal-review-agent
- Creator and host strike system with escalating penalties

### Regional Compliance
Apply:
- India IT Rules grievance officer workflow stubs
- Age-gate integration for sensitive content
- Astro non-medical disclaimer enforcement
- Store policy alignment for incentive and UGC features

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

- Basic: `.cursor/skills/stream-heaven/safety/trust-safety-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/safety/trust-safety-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
