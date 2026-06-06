---
name: stream-heaven-core-engineering-realtime-realtime-systems-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Realtime Systems (phase 5).
  Single-agent execution with governance prefix and structural validation.
---

# Realtime Systems — Basic

## When to use

- User invokes **Realtime Systems** or work in **core-engineering/realtime** (phase 5)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/core-engineering/realtime/realtime-systems-agent.md`
- **Role:** Realtime Systems Agent specialist for Stream Heaven's realtime domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/core-engineering/realtime/realtime-systems-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Realtime Platform
Apply:
- Own realtime-service (port 3009) platform SLOs and capacity plan
- Namespace topology: /social, /livestream, /games, /notifications
- Redis adapter cluster sizing for Socket.IO horizontal scale
- Handshake auth with JWT from auth-service — reject anonymous joins

### Presence & Messaging
Apply:
- Presence heartbeat TTL and stale cleanup in Redis
- Message ordering guarantees per room vs eventual for viewer counts
- Backpressure: drop low-priority events under CPU/memory pressure
- Reconnect policy: exponential backoff, room rejoin, state sync

### Event Catalog
Apply:
- Versioned events in packages/shared-contracts/realtime/
- Schema validation on inbound client emits
- Server event catalog for analytics pipeline ingestion
- Coordinate socketio-architect on implementation details

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
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

- Basic: `.cursor/skills/stream-heaven/core-engineering/realtime/realtime-systems-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/realtime/realtime-systems-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
