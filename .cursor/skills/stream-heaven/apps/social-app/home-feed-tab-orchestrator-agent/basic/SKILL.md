---
name: stream-heaven-apps-social-app-home-feed-tab-orchestrator-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Home Feed Tab Orchestrator (phase 8).
  Home Feed scoped — single-agent execution with governance prefix.
---

# Home Feed Tab Orchestrator — Basic

## When to use

- User invokes **Home Feed Tab Orchestrator** or Home Feed work in **apps/mobile/lib/features/home_feed/**
- Phase 8 social-app; scope limited to Home Feed (not full platform)

## Agent

- **Path:** `apps/social-app/agents/home-feed/home-feed-tab-orchestrator-agent.md`
- **Role:** Tab routing for Trending, Videos, Following, Celebrity — cursor pagination per tab and cache isolation.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
- Open agent markdown and copy its `## Prompt Template` block
- Contract-first: `packages/shared-contracts/openapi/feed.v1.yaml`
- Run `node scripts/validate-agents.mjs` after agent edits

## Role-specific focus

- FeedTab routing
- Per-tab Riverpod state
- Tab analytics

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
