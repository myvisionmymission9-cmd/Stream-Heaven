---
name: stream-heaven-apps-livestream-app-pk-battle-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Pk Battle (phase 9).
  Single-agent execution with governance prefix and structural validation.
---

# Pk Battle — Basic

## When to use

- User invokes **Pk Battle** or work in **apps/livestream-app** (phase 9)
- Focused task within this agent's scope

## Agent

- **Path:** `apps/livestream-app/agents/multi-guest/pk-battle-agent.md`
- **Role:** Pk Battle Agent specialist for Stream Heaven's multi guest domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `apps/livestream-app/agents/multi-guest/pk-battle-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### PK State Machine
Apply:
- States: idle → challenge_sent → active → scoring → ended → rematch_optional
- Server-authoritative timers; client display only
- Forfeit and disconnect grace with configurable windows
- Idempotent challenge/accept with dedup keys

### Scoring & Sync
Apply:
- Gift-weighted score aggregation per room side
- Viewer count tie-breaker rules documented in contracts
- Socket.IO pk.score_update with coalesced broadcast rate
- Redis hot score cache with Postgres persistence at end

### Contract
Apply:
- /v1/livestream/pk/challenge, accept, status, forfeit endpoints
- Extend livestream room model without breaking v1 clients
- Event schema: pk.started, pk.score, pk.ended
- Quality-gate before enabling PK in production

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

- Basic: `.cursor/skills/stream-heaven/apps/livestream-app/pk-battle-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/livestream-app/pk-battle-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
