---
name: stream-heaven-notifications-push-notification-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Push Notification (Phase 18).
  notifications — single-agent execution with governance prefix.
---

# Push Notification — Basic

## When to use

- User invokes **Push Notification** or related notifications work
- Phase 18; scope limited to: notifications

## Agent

- **Path:** `ai-agents/notifications/push-notification-agent.md`
- **Role:** FCM push notification dispatch — templates, device token management, per-user preferences.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
- Open agent markdown and copy its `## Prompt Template` block
- Contract-first: check `packages/shared-contracts/openapi/` first
- Run `node scripts/validate-agents.mjs` after agent edits

## Role-specific focus

- FCM dispatch
- Notification templates
- Deep-link payloads

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
