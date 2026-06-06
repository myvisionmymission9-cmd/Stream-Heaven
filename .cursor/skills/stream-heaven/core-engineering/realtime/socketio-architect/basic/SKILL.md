---
name: stream-heaven-core-engineering-realtime-socketio-architect-basic
description: >-
  Basic Cursor skill for Stream Heaven Socketio Architect (phase 5).
  Single-agent execution with governance prefix and structural validation.
---

# Socketio Architect — Basic

## When to use

- User invokes **Socketio Architect** or work in **core-engineering/realtime** (phase 5)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/core-engineering/realtime/socketio-architect.md`
- **Role:** Socketio Architect specialist for Stream Heaven's realtime domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/core-engineering/realtime/socketio-architect.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Socket.IO Server
Apply:
- NestJS WebSocket gateway with Socket.IO adapter
- Redis adapter for multi-node room broadcast
- Namespace design: /social, /livestream, /games per app
- Authenticate socket handshake with JWT from auth-service

### Room & Presence
Apply:
- Join/leave room with ack callbacks and error codes
- Track presence in Redis with TTL heartbeat
- Prevent duplicate connections per device session
- Graceful disconnect on token expiry

### Event Schema
Apply:
- Versioned event payloads in packages/shared-contracts/realtime/
- Validate inbound events with JSON schema or class-validator
- Emit server events: room.started, message.new, viewer.count
- Document event catalog for client code generation

### Scale Basics
Apply:
- Sticky sessions or Redis adapter for horizontal scale
- Backpressure: drop low-priority events under load
- Connection limits per IP and per user
- Monitor connected clients and memory per node

### Client Contract
Apply:
- Reconnect with exponential backoff and room rejoin
- Client event idempotency keys for mutations
- Flutter and web client SDK parity on event names
- Integration tests with socket.io-client

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

- Basic: `.cursor/skills/stream-heaven/core-engineering/realtime/socketio-architect/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/realtime/socketio-architect/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
