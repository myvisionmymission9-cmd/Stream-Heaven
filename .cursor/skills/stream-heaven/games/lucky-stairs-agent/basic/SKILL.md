---
name: stream-heaven-games-lucky-stairs-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Lucky Stairs (phase 9 (Games add-on)).
  Single-agent execution with governance prefix and structural validation.
---

# Lucky Stairs — Basic

## When to use

- User invokes **Lucky Stairs** or work in **games** (phase 9 (Games add-on))
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/games/lucky-stairs-agent.md`
- **Role:** Lucky Stairs Agent specialist for Stream Heaven's climb-or-cash-out ladder game — escalating multipliers, bust steps, and tension-based live participation.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/games/lucky-stairs-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Game Loop & State Management
Design:
- Design Lucky Stairs step protocol (climb, cash-out, bust probability per step). (Lucky Stairs scope)
- server-authoritative game state with deterministic turn order
- state snapshots for reconnect and late-join recovery
- turn timeout and forfeit handling for mobile sessions
- idle player detection and bot backfill policies
- game phase transitions (lobby → active → results)

### Realtime Sync & Socket Protocol
Implement:
- Socket.IO room channels per match with Redis pub/sub fan-out
- delta updates vs full-state sync for low-bandwidth clients
- client prediction with server reconciliation for smooth UX
- heartbeat and disconnect grace periods
- event ordering guarantees for dice rolls and moves
- Server computes step outcomes; client shows animated stairs only.

### Matchmaking & Lobbies
Configure:
- skill-based and casual queue definitions in Redis
- private room codes and friend-invite flows
- queue wait thresholds with optional bot fill
- regional latency-aware server selection
- concurrent match capacity per game type
- Integrate ante and cash-out settlements via games-economy-agent.

### Fair Play & Anti-Cheat
Enforce:
- server-side RNG for dice, cards, and outcomes
- move validation against authoritative rules engine
- rate limits on actions and suspicious pattern detection
- audit logs for disputed matches and refunds
- replay verification for tournament disputes

### Economy & Rewards Integration
Wire:
- optional coin entry fees via wallet-service contracts
- winner payout and rake configuration
- daily reward hooks and streak bonuses
- leaderboard point accrual on match completion
- graceful handling of insufficient balance at entry

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| Shared contracts | `packages/shared-contracts/` |
| Validate agents | `node scripts/validate-agents.mjs` |
| Validate skills | `node scripts/validate-agent-skills.mjs` |
| Deep skill check | `node scripts/validate-all-agent-skills.mjs` |
| Games platform | `ai-agents/games/games-platform-architect.md` |

## Validation

```powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
node scripts/validate-all-agent-skills.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/games/lucky-stairs-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/games/lucky-stairs-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
