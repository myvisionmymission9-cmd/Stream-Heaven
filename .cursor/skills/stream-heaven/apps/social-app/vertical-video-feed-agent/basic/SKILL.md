---
name: stream-heaven-apps-social-app-vertical-video-feed-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Vertical Video Feed (phase 8).
  Home Feed scoped — single-agent execution with governance prefix.
---

# Vertical Video Feed — Basic

## When to use

- User invokes **Vertical Video Feed** or Home Feed work in **apps/mobile/lib/features/home_feed/**
- Phase 8 social-app; scope limited to Home Feed (not full platform)

## Agent

- **Path:** `apps/social-app/agents/home-feed/vertical-video-feed-agent.md`
- **Role:** TikTok-style vertical infinite scroll player — PageView, autoplay, mute policy, and completion tracking.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
- Open agent markdown and copy its `## Prompt Template` block
- Contract-first: `packages/shared-contracts/openapi/feed.v1.yaml`
- Run `node scripts/validate-agents.mjs` after agent edits

## Role-specific focus

- Vertical PageView
- Autoplay lifecycle
- Watch event ingestion

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
