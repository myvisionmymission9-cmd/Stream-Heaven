---
name: stream-heaven-notifications-in-app-notification-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven In-App Notification (Phase 18).
  notifications — single-agent execution with governance prefix.
---

# In-App Notification — Basic

## When to use

- User invokes **In-App Notification** or related notifications work
- Phase 18; scope limited to: notifications

## Agent

- **Path:** `ai-agents/notifications/in-app-notification-agent.md`
- **Role:** In-app notification inbox — bell icon, unread badge, read/mark-all, notification list.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
- Open agent markdown and copy its `## Prompt Template` block
- Contract-first: check `packages/shared-contracts/openapi/` first
- Run `node scripts/validate-agents.mjs` after agent edits

## Role-specific focus

- Notification inbox Flutter
- Unread badge Socket
- Cursor paginated list

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
