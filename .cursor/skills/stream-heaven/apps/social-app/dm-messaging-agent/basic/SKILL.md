---
name: stream-heaven-apps-social-app-dm-messaging-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Dm Messaging (phase 8).
  Single-agent execution with governance prefix and structural validation.
---

# Dm Messaging — Basic

## When to use

- User invokes **Dm Messaging** or work in **apps/social-app** (phase 8)
- Focused task within this agent's scope

## Agent

- **Path:** `apps/social-app/agents/dm-messaging-agent.md`
- **Role:** Dm Messaging Agent specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `apps/social-app/agents/dm-messaging-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### DM API
Apply:
- /v1/social/dm/threads, messages, read, delete contracts
- Cursor pagination on messages with stable (created_at, id) sort
- Media attachments via S3 presigned upload refs only
- Block graph check on every send — return 403 without leak

### Realtime DM
Apply:
- Socket namespace /social/dm per thread room
- Typing indicators with debounced emit rate
- Delivery and read receipt events with idempotency
- Offline queue sync on reconnect

### Flutter DM UI
Apply:
- Thread list with unread badges and mute support
- Message composer with attachment picker and low-data mode
- Optimistic send with rollback on failure
- i18n for all user-visible strings via ARB files

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| App root | `apps/social-app/` |
| Shared contracts | `packages/shared-contracts/` |
| Validate agents | `node scripts/validate-agents.mjs` |
| Validate skills | `node scripts/validate-agent-skills.mjs` |
| Deep skill check | `node scripts/validate-all-agent-skills.mjs` |

## Validation

```powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
node scripts/validate-all-agent-skills.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/apps/social-app/dm-messaging-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/social-app/dm-messaging-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
