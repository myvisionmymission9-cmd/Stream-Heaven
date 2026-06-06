---
name: stream-heaven-apps-social-app-content-moderation-pipeline-basic
description: >-
  Basic Cursor skill for Stream Heaven Content Moderation Pipeline (phase 8).
  Single-agent execution with governance prefix and structural validation.
---

# Content Moderation Pipeline — Basic

## When to use

- User invokes **Content Moderation Pipeline** or work in **apps/social-app** (phase 8)
- Focused task within this agent's scope

## Agent

- **Path:** `apps/social-app/agents/content-moderation-pipeline.md`
- **Role:** Content Moderation Pipeline specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `apps/social-app/agents/content-moderation-pipeline.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Content Moderation Pipeline
Build:
- Define moderation policies and enforcement hooks for Content Moderation across social and livestream surfaces. (Content Moderation Pipeline scope)
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
- Implement report, block, and trust-score pathways in NestJS with PostgreSQL audit logs.

### Fraud & Abuse Detection
Detect:
- fake profile and bot farm identification
- spam and scam link blocking in chat
- gift and wallet wash trading patterns
- deepfake detection on profile media
- rate limits coordinated with auth-service
- Coordinate ML moderation agents with human-in-the-loop review queues per ai-usage-rules.md.

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
| App root | `apps/social-app/` |
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

- Basic: `.cursor/skills/stream-heaven/apps/social-app/content-moderation-pipeline/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/social-app/content-moderation-pipeline/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
