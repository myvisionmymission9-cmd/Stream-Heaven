---
name: stream-heaven-apps-livestream-app-stream-moderation-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Stream Moderation (phase 9).
  Single-agent execution with governance prefix and structural validation.
---

# Stream Moderation — Basic

## When to use

- User invokes **Stream Moderation** or work in **apps/livestream-app** (phase 9)
- Focused task within this agent's scope

## Agent

- **Path:** `apps/livestream-app/agents/core/stream-moderation-agent.md`
- **Role:** Apps/Livestream App/Agents/Core/Stream Moderation specialist for Stream Heaven's livestream-core domain within the four-app entertainment ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `apps/livestream-app/agents/core/stream-moderation-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Content Moderation Pipeline
Build:
- Implement host-side mute, kick, ban, and slow-mode controls with Redis-backed ban lists. (Stream Moderation scope)
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
- Wire AI moderation signals from ai-moderation-agent into live comment and audio transcription pipelines.

### Fraud & Abuse Detection
Detect:
- fake profile and bot farm identification
- spam and scam link blocking in chat
- gift and wallet wash trading patterns
- deepfake detection on profile media
- rate limits coordinated with auth-service
- Define escalation paths for CSAM, harassment, and fraud to trust-safety-agent within 60 seconds.

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
| App root | `apps/livestream-app/` |
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

- Basic: `.cursor/skills/stream-heaven/apps/livestream-app/stream-moderation-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/livestream-app/stream-moderation-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
