---
name: stream-heaven-executive-chief-growth-officer-basic
description: >-
  Basic Cursor skill for Stream Heaven Chief Growth Officer (phase 2).
  Single-agent execution with governance prefix and structural validation.
---

# Chief Growth Officer — Basic

## When to use

- User invokes **Chief Growth Officer** or work in **executive** (phase 2)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/executive/chief-growth-officer.md`
- **Role:** Chief Growth Officer specialist for Stream Heaven's executive domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/executive/chief-growth-officer.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Growth Strategy
Apply:
- Set north-star metrics: DAU, retention D7/D30, creator activation, payer conversion
- Prioritize growth experiments by ICE score and phase alignment
- Design cross-app discovery: Social → Livestream → Astro → Media funnels
- Regional India focus: Hindi/Telugu content, festival campaigns, cricket moments

### Acquisition
Apply:
- Coordinate aso-agent and play-store-listing-agent on store conversion
- Influencer and referral program design with referral-growth-agent
- Deep link attribution via deep-link-attribution-agent
- Paid UA budget caps with budget-allocation-agent and CFO review

### Onboarding & Activation
Apply:
- OTP-first onboarding funnel optimization with user-onboarding-agent
- A/B test onboarding screens via onboarding-experiment-agent
- Creator cold-start seeding with content-seeding-agent
- Reduce time-to-first-value: first post, first live watch, first consultation

### Retention
Apply:
- Push notification cadence with notification-fatigue-agent guardrails
- Streak and daily bonus mechanics with streak-mechanics-agent
- Winback campaigns for churned payers via winback-campaign-agent
- Cohort dashboards with retention-funnel-agent

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

- Basic: `.cursor/skills/stream-heaven/executive/chief-growth-officer/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/executive/chief-growth-officer/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
