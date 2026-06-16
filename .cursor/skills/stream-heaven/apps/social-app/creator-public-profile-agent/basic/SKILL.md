---
name: stream-heaven-apps-social-app-creator-public-profile-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Creator Public Profile (Phase 12).
  social-app (Creator Profile) — single-agent execution with governance prefix.
---

# Creator Public Profile — Basic

## When to use

- User invokes **Creator Public Profile** or related social-app (Creator Profile) work
- Phase 12; scope limited to: social-app (Creator Profile)

## Agent

- **Path:** `apps/social-app/agents/creator/creator-public-profile-agent.md`
- **Role:** Instagram-style public creator profile page — avatar, bio, follower counts, post grid, follow/unfollow, celebrity badge.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
- Open agent markdown and copy its `## Prompt Template` block
- Contract-first: check `packages/shared-contracts/openapi/` first
- Run `node scripts/validate-agents.mjs` after agent edits

## Role-specific focus

- Public profile Flutter screen
- Follow/unfollow mutation
- Celebrity badge display

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
