---
name: stream-heaven-games-ludo-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Ludo (phase 9 (Games add-on)).
  Single-agent execution with governance prefix and structural validation.
---

# Ludo — Basic

## When to use

- User invokes **Ludo** or work in **games** (phase 9 (Games add-on))
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/games/ludo-agent.md`
- **Role:** Ludo Agent specialist for Stream Heaven's family-friendly board game — 2–4 player matches, dice RNG, token movement, and quick-match lobbies in Livestream App.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/games/ludo-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Game Rules
Apply:
- Server-authoritative dice with CSPRNG and audit log per roll
- Classic 4-player and quick 2-player rule variants
- Turn timeout auto-forfeit with configurable duration
- Win detection: all tokens home + exact dice on final stretch

### Matchmaking
Apply:
- Quick match queue with games-matchmaking-agent ELO bands
- Play-with-friends room codes via Redis TTL rooms
- NestJS game module state machine per match ID
- /v1/games/ludo/match, move, forfeit contracts

### Flutter Board
Apply:
- CustomPainter board with 60fps target on low-end Android
- Dice animation without blocking game state updates
- One-hand friendly controls and haptic feedback hooks
- i18n for rules and error toasts

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

- Basic: `.cursor/skills/stream-heaven/games/ludo-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/games/ludo-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
