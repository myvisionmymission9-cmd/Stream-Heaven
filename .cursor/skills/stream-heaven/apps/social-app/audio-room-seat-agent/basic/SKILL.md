---
name: stream-heaven-apps-social-app-audio-room-seat-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Audio Room Seat (Phase 9).
  social-app (Audio Rooms) — single-agent execution with governance prefix.
---

# Audio Room Seat — Basic

## When to use

- User invokes **Audio Room Seat** or related social-app (Audio Rooms) work
- Phase 9; scope limited to: social-app (Audio Rooms)

## Agent

- **Path:** `apps/social-app/agents/audio-rooms/audio-room-seat-agent.md`
- **Role:** Audio room seat model — speaker slots (8/16/24), audience rows, raise-hand, mute, kick.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
- Open agent markdown and copy its `## Prompt Template` block
- Contract-first: check `packages/shared-contracts/openapi/` first
- Run `node scripts/validate-agents.mjs` after agent edits

## Role-specific focus

- Seat grid UI
- Raise-hand flow
- Socket seat events

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
