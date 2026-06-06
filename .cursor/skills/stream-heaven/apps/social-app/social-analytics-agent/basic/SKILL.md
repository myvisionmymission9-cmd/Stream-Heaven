---
name: stream-heaven-apps-social-app-social-analytics-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Social Analytics (phase 8).
  Single-agent execution with governance prefix and structural validation.
---

# Social Analytics — Basic

## When to use

- User invokes **Social Analytics** or work in **apps/social-app** (phase 8)
- Focused task within this agent's scope

## Agent

- **Path:** `apps/social-app/agents/social-analytics-agent.md`
- **Role:** Social Analytics Agent specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `apps/social-app/agents/social-analytics-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Feed Composition & Pagination
Design:
- Define /v1/social/* OpenAPI contracts for Social Analytics with cursor pagination and moderation hooks. (Social Analytics scope)
- following feed vs For You algorithmic feed separation
- cursor-based pagination for infinite scroll
- low-bandwidth feed payloads for 2G/3G networks
- ad insertion slots without disrupting scroll UX
- feed refresh and pull-to-refresh debouncing

### Social API Contracts
Define:
- /v1/social/* OpenAPI in packages/shared-contracts
- posts CRUD, comments, follows, and report/block stubs
- api-gateway JWT-derived X-User-Id header propagation
- request-id propagation for distributed tracing
- moderation hook endpoints for trust-safety integration
- Guide services/social-service NestJS implementation aligned with packages/shared-contracts.

### Post & Engagement Flows
Implement:
- CRUD-lite post creation with media upload hooks
- comment threading with depth limits
- follow/unfollow mutation with fan-out considerations
- like and share event emission for analytics
- report and block pathways to moderation pipeline
- Ensure api-gateway proxies social routes with JWT-derived identity headers.

### Feed Ranking Integration
Coordinate:
- feed-ranking-agent ordering input contracts
- feed-architect composition layer boundaries
- cold-start feed for new users without follows
- regional content boosting for Indian languages
- A/B test hooks for ranking algorithm variants

### Mobile Feed UX
Guide:
- Flutter feed in apps/mobile with Riverpod state
- image lazy loading and placeholder skeletons
- video autoplay policy for low-end devices
- offline draft posts with sync on reconnect
- accessibility for screen reader feed navigation

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

- Basic: `.cursor/skills/stream-heaven/apps/social-app/social-analytics-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/social-app/social-analytics-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
