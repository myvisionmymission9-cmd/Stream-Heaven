---
name: stream-heaven-event-system-event-routing-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Event Routing (phase 18).
  Single-agent execution with governance prefix and structural validation.
---

# Event Routing — Basic

## When to use

- User invokes **Event Routing** or work in **event-system** (phase 18)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/event-system/event-routing-agent.md`
- **Role:** Consumer routing by type/region.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/event-system/event-routing-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Socket.IO Architecture
Design:
- event-routing-agent validated by event-schema-guardian. (Event Routing scope)
- namespace and room topology for four-app ecosystem
- Redis adapter for multi-instance Socket.IO scaling
- authentication handshake with JWT validation
- connection lifecycle: connect, reconnect, disconnect grace
- event naming conventions and schema versioning

### Event Protocol Design
Define:
- typed event payloads in packages/shared-contracts/realtime
- ack/retry semantics for critical events
- broadcast vs unicast vs room-scoped delivery
- event ordering guarantees per room/channel
- backpressure handling for slow clients
- Contracts in shared-contracts/events/v1.

### Presence & State Sync
Implement:
- online/offline presence with heartbeat intervals
- room membership tracking in Redis sets
- state snapshot and delta sync patterns
- reconnect state recovery from server cache
- presence fan-out cost optimization
- Outbox + Kafka when ordering required.

### Performance for Mobile India
Optimize:
- minimal payload sizes for 2G/3G networks
- WebSocket fallback to long-polling configuration
- connection pooling and keep-alive tuning
- battery-aware heartbeat frequency on mobile
- graceful degradation when realtime unavailable

### Security & Authorization
Enforce:
- room join authorization against JWT claims
- rate limiting on event emission per connection
- input validation on all inbound socket events
- CORS and origin validation for web clients
- audit logging for privileged socket operations

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

- Basic: `.cursor/skills/stream-heaven/event-system/event-routing-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/event-system/event-routing-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
