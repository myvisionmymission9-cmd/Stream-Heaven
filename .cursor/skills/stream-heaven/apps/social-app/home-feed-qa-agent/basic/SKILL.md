---
name: stream-heaven-apps-social-app-home-feed-qa-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Home Feed QA (phase 8).
  Home Feed scoped — single-agent execution with governance prefix.
---

# Home Feed QA — Basic

## When to use

- User invokes **Home Feed QA** or Home Feed work in **apps/mobile/lib/features/home_feed/**
- Phase 8 social-app; scope limited to Home Feed (not full platform)

## Agent

- **Path:** `apps/social-app/agents/home-feed/home-feed-qa-agent.md`
- **Role:** Smoke and widget tests for Home Feed — tab switch, overlay presence, rail taps.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
- Open agent markdown and copy its `## Prompt Template` block
- Contract-first: `packages/shared-contracts/openapi/feed.v1.yaml`
- Run `node scripts/validate-agents.mjs` after agent edits

## Role-specific focus

- Widget tests
- Feed smoke tests
- L10n validation

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
