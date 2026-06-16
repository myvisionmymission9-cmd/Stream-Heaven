---
name: stream-heaven-apps-social-app-creator-stats-dashboard-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Creator Stats Dashboard (Phase 12).
  social-app (Creator Dashboard) — single-agent execution with governance prefix.
---

# Creator Stats Dashboard — Basic

## When to use

- User invokes **Creator Stats Dashboard** or related social-app (Creator Dashboard) work
- Phase 12; scope limited to: social-app (Creator Dashboard)

## Agent

- **Path:** `apps/social-app/agents/creator/creator-stats-dashboard-agent.md`
- **Role:** Creator-facing dashboard: views, followers gained, watch time, earnings, and content performance.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
- Open agent markdown and copy its `## Prompt Template` block
- Contract-first: check `packages/shared-contracts/openapi/` first
- Run `node scripts/validate-agents.mjs` after agent edits

## Role-specific focus

- Dashboard Flutter screen
- Earnings display
- Stats chart stubs

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
