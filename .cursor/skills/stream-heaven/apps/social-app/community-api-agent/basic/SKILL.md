---
name: stream-heaven-apps-social-app-community-api-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Community API (Phase 20).
  social-app (Community) — single-agent execution with governance prefix.
---

# Community API — Basic

## When to use

- User invokes **Community API** or related social-app (Community) work
- Phase 20; scope limited to: social-app (Community)

## Agent

- **Path:** `apps/social-app/agents/community/community-api-agent.md`
- **Role:** Community CRUD API — create/join/leave communities, roles, polls, events.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
- Open agent markdown and copy its `## Prompt Template` block
- Contract-first: check `packages/shared-contracts/openapi/` first
- Run `node scripts/validate-agents.mjs` after agent edits

## Role-specific focus

- Community CRUD API
- Membership roles
- Poll and event schemas

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
