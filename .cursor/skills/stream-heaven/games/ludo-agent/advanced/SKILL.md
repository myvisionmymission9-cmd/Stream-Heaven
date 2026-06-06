---
name: stream-heaven-games-ludo-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Ludo (phase 9 (Games add-on)).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Ludo — Advanced

## When to use

- User invokes **Ludo** or work in **games** (phase 9 (Games add-on))
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/games/ludo-agent.md`
- **Role:** Ludo Agent specialist for Stream Heaven's family-friendly board game — 2–4 player matches, dice RNG, token movement, and quick-match lobbies in Livestream App.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Realtime Sync
Apply:
- games-socket-sync-agent broadcast on move and turn change
- Reconnect: resync full board state from server snapshot
- Anti-cheat: reject client-proposed dice values
- Spectator mode stub for livestream embed

### Economy Integration
Apply:
- Optional coin-table entry via wallet-agent hold/release
- Winner payout idempotency key per match
- games-fair-play-agent dice distribution audits
- Tournament handoff to games-tournament-agent

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
node scripts/test-golden-agents.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/games/ludo-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/games/ludo-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
