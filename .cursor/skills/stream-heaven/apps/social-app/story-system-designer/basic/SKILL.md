---
name: stream-heaven-apps-social-app-story-system-designer-basic
description: >-
  Basic Cursor skill for Stream Heaven Story System Designer (phase 8).
  Single-agent execution with governance prefix and structural validation.
---

# Story System Designer — Basic

## When to use

- User invokes **Story System Designer** or work in **apps/social-app** (phase 8)
- Focused task within this agent's scope

## Agent

- **Path:** `apps/social-app/agents/story-system-designer.md`
- **Role:** Story System Designer specialist for Stream Heaven social app — ephemeral 24h stories, creation flows, viewer lists, highlights, and CDN-optimized media delivery.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `apps/social-app/agents/story-system-designer.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Feed Composition & Pagination
Design:
- Design story capture pipeline (photo/video, stickers, text overlays) with S3 presigned upload. (Story System Designer scope)
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
- Implement 24h TTL story rings on home feed with Redis expiring keys and PostgreSQL archive for highlights.

### Post & Engagement Flows
Implement:
- CRUD-lite post creation with media upload hooks
- comment threading with depth limits
- follow/unfollow mutation with fan-out considerations
- like and share event emission for analytics
- report and block pathways to moderation pipeline
- Build Flutter story viewer (tap-to-advance, pause, reply-to-DM hook) optimized for 3G prefetch.

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

- Basic: `.cursor/skills/stream-heaven/apps/social-app/story-system-designer/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/social-app/story-system-designer/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
