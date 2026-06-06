---
name: stream-heaven-games-rummy-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Rummy (phase 9 (Games add-on)).
  Single-agent execution with governance prefix and structural validation.
---

# Rummy — Basic

## When to use

- User invokes **Rummy** or work in **games** (phase 9 (Games add-on))
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/games/rummy-agent.md`
- **Role:** Rummy Agent specialist for Stream Heaven's 13-card Indian Rummy — deal, meld validation, drop scores, and multi-deck support for 2–6 players.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/games/rummy-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Game Loop & State Management
Design:
- Specify Indian Rummy rules (pure sequence, impure sequence, sets, drop points). (Rummy scope)
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
- Server-side meld validator and declare verification.

### Matchmaking & Lobbies
Configure:
- skill-based and casual queue definitions in Redis
- private room codes and friend-invite flows
- queue wait thresholds with optional bot fill
- regional latency-aware server selection
- concurrent match capacity per game type
- Flutter hand UI with drag-drop meld zones and discard pile.

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

- Basic: `.cursor/skills/stream-heaven/games/rummy-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/games/rummy-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
