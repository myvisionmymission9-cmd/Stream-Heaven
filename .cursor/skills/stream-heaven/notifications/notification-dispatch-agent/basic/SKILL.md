---
name: stream-heaven-notifications-notification-dispatch-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Notification Dispatch (Phase 18).
  notifications — single-agent execution with governance prefix.
---

# Notification Dispatch — Basic

## When to use

- User invokes **Notification Dispatch** or related notifications work
- Phase 18; scope limited to: notifications

## Agent

- **Path:** `ai-agents/notifications/notification-dispatch-agent.md`
- **Role:** Fan-out orchestration — consume domain events, resolve recipients, dispatch push + in-app.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
- Open agent markdown and copy its `## Prompt Template` block
- Contract-first: check `packages/shared-contracts/openapi/` first
- Run `node scripts/validate-agents.mjs` after agent edits

## Role-specific focus

- Event-driven fan-out
- Rate limiting
- Multi-channel dispatch

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
