---
name: stream-heaven-apps-social-app-creator-analytics-dashboard-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Creator Analytics Dashboard (Phase 19).
  social-app (Analytics) — single-agent execution with governance prefix.
---

# Creator Analytics Dashboard — Basic

## When to use

- User invokes **Creator Analytics Dashboard** or related social-app (Analytics) work
- Phase 19; scope limited to: social-app (Analytics)

## Agent

- **Path:** `apps/social-app/agents/analytics/creator-analytics-dashboard-agent.md`
- **Role:** Flutter creator analytics dashboard — view trends, watch-time charts, follower growth, earnings.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
- Open agent markdown and copy its `## Prompt Template` block
- Contract-first: check `packages/shared-contracts/openapi/` first
- Run `node scripts/validate-agents.mjs` after agent edits

## Role-specific focus

- Analytics dashboard Flutter
- fl_chart integration
- Date range filter

## Key paths

| Resource | Path |
|----------|------|
| Architecture | `docs/GLOBAL-CREATOR-ECOSYSTEM-ARCHITECTURE.md` |
| Roadmap | `docs/GLOBAL-CREATOR-ECOSYSTEM-ROADMAP.md` |
| OpenAPI | `packages/shared-contracts/openapi/` |
| Validate agents | `node scripts/validate-agents.mjs` |

## Validation

```powershell
node scripts/validate-agents.mjs
flutter analyze apps/mobile
```
