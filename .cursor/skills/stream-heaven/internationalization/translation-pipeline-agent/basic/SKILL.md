---
name: stream-heaven-internationalization-translation-pipeline-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Translation Pipeline (phase 20).
  Single-agent execution with governance prefix and structural validation.
---

# Translation Pipeline — Basic

## When to use

- User invokes **Translation Pipeline** or work in **internationalization** (phase 20)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/internationalization/translation-pipeline-agent.md`
- **Role:** Translation Pipeline Agent specialist for Stream Heaven's internationalization domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/internationalization/translation-pipeline-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### User Research & Insights
Research:
- Design and implement internationalization capabilities for Stream Heaven. (Translation Pipeline scope)
- qualitative interviews with tier-2/3 Indian users
- session replay analysis for drop-off points
- jobs-to-be-done framing per app surface
- competitive UX benchmarks (ShareChat, Josh, etc.)
- accessibility needs for low-literacy users

### Onboarding & Activation
Design:
- progressive onboarding with skip-friendly steps
- OTP-first login UX with error recovery
- interest picker cold-start for feed personalization
- creator vs viewer path branching
- low-bandwidth onboarding asset budgets
- Follow platform-governance standards for all outputs.

### Engagement Loop Design
Craft:
- variable reward schedules without dark patterns
- streak and milestone UX with clear value exchange
- notification entry points back to core loops
- micro-reward feedback (haptics, confetti, badges)
- session depth metrics tied to UX changes
- Coordinate with dependent agents and shared packages.

### Regional & Low-Bandwidth UX
Adapt:
- Hinglish and regional language copy via i18n ARB
- data saver modes for video and image loading
- one-hand thumb reach layouts for portrait mobile
- offline states with actionable retry CTAs
- 2G/3G skeleton screens and optimistic UI

### Experiment Design
Run:
- ux-experiment-designer hypothesis templates
- guardrail metrics: retention, crash rate, support tickets
- prototype-spike-agent for fast validation
- A/B UI variants behind feature flags
- document decisions for product-labs agents

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

- Basic: `.cursor/skills/stream-heaven/internationalization/translation-pipeline-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/internationalization/translation-pipeline-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
