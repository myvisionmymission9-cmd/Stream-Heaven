---
name: stream-heaven-games-royal-fishing-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Royal Fishing (phase 9 (Games add-on)).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Royal Fishing — Advanced

## When to use

- User invokes **Royal Fishing** or work in **games** (phase 9 (Games add-on))
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/games/royal-fishing-agent.md`
- **Role:** Royal Fishing Agent specialist for Stream Heaven's arcade fishing shooter — cannon bets, fish HP pools, boss waves, and multiplayer room sync.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Advanced Game Architecture
Architect:
- Design server-authoritative fish spawn tables, HP, and coin drop values per fish type. (Royal Fishing scope)
- NestJS game module isolation per title with shared platform SDK
- hot-swappable rules engines for A/B rule variants
- cross-game session federation for unified player identity
- game-specific ADRs when diverging from platform defaults
- load testing match throughput at peak Indian evening hours

### Realtime Sync at Scale
Scale:
- Redis cluster sharding for match state keys
- sticky sessions and Socket.IO adapter scaling
- cross-region match migration for failover
- compression of state payloads for 2G networks
- chaos testing disconnect storms during live events
- Implement cannon bet tiers and bullet cost debits via games-economy-agent.

### Matchmaking Intelligence
Optimize:
- ELO/Glicko-style skill rating per game mode
- party matchmaking with size-aware queue merging
- toxic-player shadow pools and report-weighted matching
- dynamic queue expansion when wait times exceed SLA
- analytics on match quality and churn correlation
- Build Flutter canvas/WebGL-lite fishing scene with object pooling for low-end Android.

### Anti-Cheat & Fair Play Operations
Operate:
- collusion detection across shared IP and device fingerprints
- automated flagging for statistically impossible win rates
- manual review tooling for tournament integrity
- refund and ban workflows integrated with trust-safety
- provably fair RNG audit trails for compliance

### Leaderboards & Tournaments
Run:
- seasonal leaderboard resets with archival snapshots
- bracket tournament scheduling and bye handling
- prize pool distribution with wallet ledger reconciliation
- live tournament spectator channels
- regional leaderboard partitions for latency fairness

### Flutter Game UI Performance
Optimize:
- CustomPainter vs Flame engine selection per game
- 60fps targets on 2GB RAM Android devices
- asset bundle size budgets and lazy loading
- one-hand play layouts for portrait mobile
- accessibility for color-blind and low-vision players

### Production Validation & Observability
Validate:
- match lifecycle metrics (created, completed, abandoned)
- p99 turn latency and reconnect success rate dashboards
- synthetic bot matches in staging before release
- golden agent tests for game rule edge cases
- incident runbooks for stuck matches and payout failures

### Multi-Agent Orchestration
Coordinate:
- handoffs to games-platform-architect for embedding specs
- games-matchmaking-agent queue contract alignment
- games-socket-sync-agent protocol versioning
- wallet-service integration for economy features
- ADR drafts via docs/adr/SH-000-template.md for rule forks

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

- Basic: `.cursor/skills/stream-heaven/games/royal-fishing-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/games/royal-fishing-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
