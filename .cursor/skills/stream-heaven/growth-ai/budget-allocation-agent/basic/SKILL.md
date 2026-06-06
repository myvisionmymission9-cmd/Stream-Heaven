---
name: stream-heaven-growth-ai-budget-allocation-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Budget Allocation (phase 15).
  Single-agent execution with governance prefix and structural validation.
---

# Budget Allocation — Basic

## When to use

- User invokes **Budget Allocation** or work in **growth-ai** (phase 15)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/growth-ai/budget-allocation-agent.md`
- **Role:** Budget Allocation Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/growth-ai/budget-allocation-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Growth Experimentation
Design:
- Design and implement growth ai capabilities for Stream Heaven. (Budget Allocation scope)
- hypothesis-driven A/B tests with clear primary metrics
- cohort segmentation by region, device tier, and acquisition channel
- experiment guardrails to protect core retention and revenue
- statistical significance thresholds before shipping winners
- feature flag rollout for gradual exposure in production

### Viral & Referral Mechanics
Build:
- referral deep links with attribution and fraud checks
- invite rewards balanced against wallet ledger integrity
- share-to-earn flows for WhatsApp and Instagram Stories
- viral loop instrumentation: K-factor, cycle time, activation
- regional campaign hooks for festivals and IPL seasons
- Follow platform-governance standards for all outputs.

### Retention & Engagement Analytics
Measure:
- D1/D7/D30 retention funnels per app surface
- session depth, scroll velocity, and rewatch signals
- churn prediction features in growth feature store
- notification fatigue monitoring and send caps
- real-time dashboards for experiment readouts
- Coordinate with dependent agents and shared packages.

### Personalization & Discovery
Tune:
- interest graph updates from implicit engagement signals
- cold-start onboarding content seeding per locale
- cross-app promotion without cannibalizing core loops
- search and feed ranking feedback loops
- low-bandwidth discovery UX for 2G/3G users

### Governance & Compliance
Follow:
- platform-governance/feature-approval-rules.md for growth launches
- no dark patterns — transparent opt-in for incentives
- PII minimization in growth analytics pipelines
- contract-first event schemas in packages/shared-contracts/
- handoff to growth-compliance-agent for policy review

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

- Basic: `.cursor/skills/stream-heaven/growth-ai/budget-allocation-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/growth-ai/budget-allocation-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
