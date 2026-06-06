---
name: stream-heaven-ad-network-ad-fraud-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Ad Fraud (phase 20).
  Single-agent execution with governance prefix and structural validation.
---

# Ad Fraud — Basic

## When to use

- User invokes **Ad Fraud** or work in **ad-network** (phase 20)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/ad-network/ad-fraud-agent.md`
- **Role:** Ad Fraud Agent specialist for Stream Heaven's ad network domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/ad-network/ad-fraud-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Content Moderation Pipeline
Build:
- Implement Ad Fraud ad insertion, targeting, and measurement with NestJS ad-network services. (Ad Fraud scope)
- AI pre-filter + human review queue for UGC
- real-time live stream moderation hooks
- CSAM and illegal content zero-tolerance workflows
- appeal and restoration processes for creators
- moderation SLA tiers by content severity

### Trust & Safety Policies
Enforce:
- content-policy-agent rule sets per app surface
- age-gate and minor protection flows
- harassment and hate speech detection thresholds
- creator verification for monetization eligibility
- regional legal compliance for Indian jurisdictions
- Define ad slot contracts for social feed, livestream overlays, and media pre-roll in shared-contracts.

### Fraud & Abuse Detection
Detect:
- fake profile and bot farm identification
- spam and scam link blocking in chat
- gift and wallet wash trading patterns
- deepfake detection on profile media
- rate limits coordinated with auth-service
- Enforce brand safety, frequency caps, and child-audience rules per security and feature-approval docs.

### User Reporting & Appeals
Operate:
- in-app report flows with evidence capture
- ticket triage priority by harm severity
- reporter feedback without revealing outcomes
- repeat offender escalation ladders
- law enforcement request handling procedures

### Community Reputation
Score:
- trust-score-agent composite signals
- host and viewer reputation badges
- shadow restrictions before hard bans
- community moderator tooling
- transparent community guidelines surfacing

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

- Basic: `.cursor/skills/stream-heaven/ad-network/ad-fraud-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/ad-network/ad-fraud-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
