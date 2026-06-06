---
name: stream-heaven-apps-livestream-app-livestream-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Livestream (phase 9).
  Single-agent execution with governance prefix and structural validation.
---

# Livestream — Basic

## When to use

- User invokes **Livestream** or work in **apps/livestream-app** (phase 9)
- Focused task within this agent's scope

## Agent

- **Path:** `apps/livestream-app/agents/core/livestream-agent.md`
- **Role:** Owns end-to-end live room lifecycle — go-live, viewer join, graceful end, and cross-app handoff.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `apps/livestream-app/agents/core/livestream-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Live Room Lifecycle
Apply:
- API flow: create → start → join → leave → end with deterministic state machine
- Guard invalid transitions (e.g., join on ended room)
- Viewer count increments/decrements with idempotent join tokens
- Persist room metadata in Postgres; hot state in Redis

### Agora Token
Apply:
- Token bootstrap endpoint using AGORA_APP_ID env only
- Role-specific tokens: publisher vs. subscriber
- Short TTL tokens refreshed on reconnect
- Never embed Agora certificate in client or repo

### Livestream API Contract
Apply:
- OpenAPI /v1/livestream/* in packages/shared-contracts
- List rooms, room detail, start/join/leave/end endpoints
- Gateway proxy and auth header propagation
- Backward-compatible extension points for gifts and PK

### Realtime Event
Apply:
- Emit livestream.room.started, viewer.joined, room.ended events
- Socket.IO room per livestream ID for count updates
- Schema validation with realtime contract owners
- Flutter mobile live room list consumes REST + socket

### NestJS Service
Apply:
- services/livestream-service module layout
- Health checks and structured logging
- Rate limits on room create and join abuse
- Integration test plan with api-gateway-bootstrap-agent

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| App root | `apps/livestream-app/` |
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

- Basic: `.cursor/skills/stream-heaven/apps/livestream-app/livestream-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/livestream-app/livestream-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
