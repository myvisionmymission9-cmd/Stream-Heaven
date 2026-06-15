---
name: stream-heaven-apps-social-app-feed-preload-buffer-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Feed Preload Buffer (phase 8).
  Home Feed scoped — single-agent execution with governance prefix.
---

# Feed Preload Buffer — Basic

## When to use

- User invokes **Feed Preload Buffer** or Home Feed work in **apps/mobile/lib/features/home_feed/**
- Phase 8 social-app; scope limited to Home Feed (not full platform)

## Agent

- **Path:** `apps/social-app/agents/home-feed/feed-preload-buffer-agent.md`
- **Role:** Smart preload and adaptive bitrate hints for vertical feed — next N items, thumbnail-first.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
- Open agent markdown and copy its `## Prompt Template` block
- Contract-first: `packages/shared-contracts/openapi/feed.v1.yaml`
- Run `node scripts/validate-agents.mjs` after agent edits

## Role-specific focus

- Video preload queue
- Adaptive bitrate policy
- Low-RAM caps

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
