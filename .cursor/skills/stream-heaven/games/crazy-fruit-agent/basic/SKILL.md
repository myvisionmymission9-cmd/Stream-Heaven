---
name: stream-heaven-games-crazy-fruit-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Crazy Fruit (phase 9 (Games add-on)).
  Single-agent execution with governance prefix and structural validation.
---

# Crazy Fruit — Basic

## When to use

- User invokes **Crazy Fruit** or work in **games** (phase 9 (Games add-on))
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/games/crazy-fruit-agent.md`
- **Role:** Crazy Fruit Agent specialist for Stream Heaven's match/cascade fruit slot hybrid — tumbling reels, combo multipliers, and festive Indian festival skins.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/games/crazy-fruit-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Game Loop & State Management
Design:
- Design tumbling fruit grid engine with combo chains and multiplier stacks (server-side). (Crazy Fruit scope)
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
- Configurable symbol sets for Diwali/Holi seasonal reskins without code deploy.

### Matchmaking & Lobbies
Configure:
- skill-based and casual queue definitions in Redis
- private room codes and friend-invite flows
- queue wait thresholds with optional bot fill
- regional latency-aware server selection
- concurrent match capacity per game type
- Build Flutter grid UI with cascade animations within cost-control particle limits.

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

- Basic: `.cursor/skills/stream-heaven/games/crazy-fruit-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/games/crazy-fruit-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
