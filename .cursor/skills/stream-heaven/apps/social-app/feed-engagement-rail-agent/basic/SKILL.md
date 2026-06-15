---
name: stream-heaven-apps-social-app-feed-engagement-rail-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Feed Engagement Rail (phase 8).
  Home Feed scoped — single-agent execution with governance prefix.
---

# Feed Engagement Rail — Basic

## When to use

- User invokes **Feed Engagement Rail** or Home Feed work in **apps/mobile/lib/features/home_feed/**
- Phase 8 social-app; scope limited to Home Feed (not full platform)

## Agent

- **Path:** `apps/social-app/agents/home-feed/feed-engagement-rail-agent.md`
- **Role:** Right-side action rail — avatar+follow, gift, like, comment, share counts and tap handlers.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
- Open agent markdown and copy its `## Prompt Template` block
- Contract-first: `packages/shared-contracts/openapi/feed.v1.yaml`
- Run `node scripts/validate-agents.mjs` after agent edits

## Role-specific focus

- Engagement rail UI
- Like/share API hooks
- Gift intent placeholder

## Key paths

| Resource | Path |
|----------|------|
| Architecture | `docs/HOME-FEED-SYSTEM-ARCHITECTURE.md` |
| Flutter feature | `apps/mobile/lib/features/home_feed/` |
| OpenAPI | `packages/shared-contracts/openapi/feed.v1.yaml` |
| Validate agents | `node scripts/validate-agents.mjs` |

## Validation

```powershell
node scripts/validate-agents.mjs
flutter analyze apps/mobile
flutter test apps/mobile/test/home_feed
```
