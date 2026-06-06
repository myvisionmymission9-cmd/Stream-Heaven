---
name: stream-heaven-core-engineering-realtime-socketio-architect-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Socketio Architect (phase 5).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Socketio Architect — Advanced

## When to use

- User invokes **Socketio Architect** or work in **core-engineering/realtime** (phase 5)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/core-engineering/realtime/socketio-architect.md`
- **Role:** Socketio Architect specialist for Stream Heaven's realtime domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Realtime Platform Orchestration
Apply:
- Coordinate livestream-agent on viewer count safety and fan-out
- Games socket sync with games-socket-sync-agent
- Social feed live reactions without overloading single room
- Task-router for cross-app realtime feature planning

### Reliability & Chaos
Apply:
- Simulate Redis adapter partition and reconnect storms
- Graceful degradation: polling fallback for critical state
- SLO: message delivery p99 <500ms in live rooms
- Coordinate chaos-engineering-agent on game days

### Security
Apply:
- Authorize room join server-side — never trust client room IDs
- Rate limit emit frequency per socket
- Sanitize chat payloads; block XSS in user-generated content
- Audit admin broadcast and moderation override events

### High-Scale Livestream
Apply:
- Shard hot rooms across Redis pub/sub channels
- Coalesce viewer count updates to reduce broadcast churn
- PK battle and gift event prioritization queues
- Load test 100k concurrent connections target architecture

### Observability
Apply:
- Metrics: connections, rooms, emits/sec, adapter lag
- Trace socket lifecycle with gateway correlation IDs
- Alert on connection drop spikes and Redis adapter errors
- Runbooks for scaling socket pods during viral events

### Architecture Decision
Apply:
- ADR: Socket.IO vs. raw WebSockets vs. MQTT for IoT
- Evaluate managed realtime (Ably, Pusher) at scale breakpoints
- Document CAP tradeoffs for presence vs. chat ordering
- Quality-gate before enabling realtime on new app surfaces

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
node scripts/test-golden-agents.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/core-engineering/realtime/socketio-architect/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/realtime/socketio-architect/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
