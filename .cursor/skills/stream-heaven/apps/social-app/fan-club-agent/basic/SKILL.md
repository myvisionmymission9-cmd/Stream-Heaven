---
name: stream-heaven-apps-social-app-fan-club-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Fan Club (Phase 20).
  social-app (Community) — single-agent execution with governance prefix.
---

# Fan Club — Basic

## When to use

- User invokes **Fan Club** or related social-app (Community) work
- Phase 20; scope limited to: social-app (Community)

## Agent

- **Path:** `apps/social-app/agents/community/fan-club-agent.md`
- **Role:** Creator fan club — tiers (Fan, VIP Fan, Super Fan), exclusive content, gifting perks.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
- Open agent markdown and copy its `## Prompt Template` block
- Contract-first: check `packages/shared-contracts/openapi/` first
- Run `node scripts/validate-agents.mjs` after agent edits

## Role-specific focus

- Fan club tier design
- Content gating
- Fan leaderboard

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
