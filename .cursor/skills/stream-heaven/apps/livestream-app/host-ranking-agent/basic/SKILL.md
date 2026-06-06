---
name: stream-heaven-apps-livestream-app-host-ranking-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Host Ranking (phase 9).
  Single-agent execution with governance prefix and structural validation.
---

# Host Ranking — Basic

## When to use

- User invokes **Host Ranking** or work in **apps/livestream-app** (phase 9)
- Focused task within this agent's scope

## Agent

- **Path:** `apps/livestream-app/agents/operations/host-ranking-agent.md`
- **Role:** Host leaderboards with fair-play anti-cheat.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `apps/livestream-app/agents/operations/host-ranking-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Live Room Lifecycle
Own:
- Define host-ranking-agent models in PostgreSQL; hot leaderboards in Redis. (Host Ranking scope)
- room create, start, join, leave, and end state machine
- deterministic transitions with idempotent API calls
- viewer count safety guards against race conditions
- graceful host disconnect and co-host takeover
- cross-app handoff for room discovery surfaces

### Streaming Token & Provider Integration
Integrate:
- Agora token bootstrap contract with AGORA_APP_ID env only
- no embedded provider secrets in codebase
- token TTL aligned with expected session duration
- publisher vs subscriber role token differentiation
- provider failover prep for Zego as alternate
- NestJS + Socket.IO APIs in shared-contracts/live/ops.

### Livestream API Contracts
Define:
- /v1/livestream/* OpenAPI in packages/shared-contracts
- room list, create, start, join, leave, end endpoints
- viewer count and room metadata in responses
- api-gateway proxy with JWT X-User-Id propagation
- backward-compatible contract evolution for Phase 3 features
- Coordinate live-ops-dashboard-agent tooling.

### Realtime Events
Emit:
- livestream.room.started event schema
- livestream.viewer.joined and viewer.left events
- livestream.room.ended with duration and peak viewer stats
- Socket.IO broadcast channels per room
- event schema ownership with socketio-architect

### Mobile Live Room UX
Guide:
- Flutter live room list in apps/mobile
- low-bandwidth preview thumbnails via CDN
- one-tap join with minimal pre-buffer
- host go-live flow optimized for low-end Android
- background audio handling for audio-room mode

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

- Basic: `.cursor/skills/stream-heaven/apps/livestream-app/host-ranking-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/livestream-app/host-ranking-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
