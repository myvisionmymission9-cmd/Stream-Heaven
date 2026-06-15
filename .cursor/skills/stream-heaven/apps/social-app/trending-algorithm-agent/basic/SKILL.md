---
name: stream-heaven-apps-social-app-trending-algorithm-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Trending Algorithm (phase 8).
  Home Feed scoped — single-agent execution with governance prefix.
---

# Trending Algorithm — Basic

## When to use

- User invokes **Trending Algorithm** or Home Feed work in **apps/mobile/lib/features/home_feed/**
- Phase 8 social-app; scope limited to Home Feed (not full platform)

## Agent

- **Path:** `apps/social-app/agents/home-feed/trending-algorithm-agent.md`
- **Role:** Trending tab score formula — velocity, engagement rate, recency decay, and regional boosts.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
- Open agent markdown and copy its `## Prompt Template` block
- Contract-first: `packages/shared-contracts/openapi/feed.v1.yaml`
- Run `node scripts/validate-agents.mjs` after agent edits

## Role-specific focus

- Trending velocity formula
- Recency decay
- Anti-gaming caps

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
