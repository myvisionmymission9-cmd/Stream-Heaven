---
name: stream-heaven-apps-social-app-audio-room-seat-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Audio Room Seat (Phase 9).
  Cross-agent orchestration, ADRs, production validation.
---

# Audio Room Seat — Advanced

## When to use

- Cross-agent features, production readiness, or multi-chat orchestration
- Architecture decisions touching multiple services or contracts
- Phase 9+ changes to social-app (Audio Rooms)

## Agent

- **Path:** `apps/social-app/agents/audio-rooms/audio-room-seat-agent.md`

## Scope (advanced)

- Coordinate via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- ADR for architecture forks: `docs/adr/SH-000-template.md`
- Run `node scripts/test-golden-agents.mjs` after bulk agent changes
- Enforce social-app (Audio Rooms) boundary — defer wallet/live backend to their domain agents

## Orchestration

- **Architecture:** `docs/GLOBAL-CREATOR-ECOSYSTEM-ARCHITECTURE.md`
- **Roadmap:** `docs/GLOBAL-CREATOR-ECOSYSTEM-ROADMAP.md`
- **Contracts:** `packages/shared-contracts/openapi/`
- **Registry:** `ai-agents/AGENT-REGISTRY.md`

## Validation

```powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
flutter test apps/mobile
```
