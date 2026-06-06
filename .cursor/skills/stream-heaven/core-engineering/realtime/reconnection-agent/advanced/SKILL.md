---
name: stream-heaven-core-engineering-realtime-reconnection-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Reconnection (phase 5).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Reconnection — Advanced

## When to use

- User invokes **Reconnection** or work in **core-engineering/realtime** (phase 5)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/core-engineering/realtime/reconnection-agent.md`
- **Role:** Reconnection Agent specialist for Stream Heaven's realtime domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Realtime Scaling Architecture
Scale:
- Design and implement realtime capabilities for Stream Heaven. (Reconnection scope)
- Redis cluster for Socket.IO adapter pub/sub
- sticky session load balancing at gateway layer
- horizontal pod autoscaling on connection count metrics
- cross-region realtime relay for diaspora users
- connection limit policies per user tier

### Event Streaming Integration
Integrate:
- Redis Streams for durable event backplane
- bridge socket events to async consumers (Bull queues)
- event replay for late-joining clients
- dead letter handling for failed event delivery
- coordination with event-system agents
- Follow platform-governance standards for all outputs.

### Livestream & Games Realtime
Support:
- high-frequency game state sync protocols
- livestream viewer count aggregation patterns
- gift animation event fan-out at scale
- PK battle score update broadcast optimization
- latency SLA targets per use case
- Coordinate with dependent agents and shared packages.

### Chaos & Reliability Engineering
Test:
- disconnect storm simulation during live events
- Redis adapter failover testing
- split-brain detection in multi-instance clusters
- graceful shutdown with connection draining
- coordination with chaos-engineering-agent

### Monitoring & Debugging
Monitor:
- connected client count and room occupancy dashboards
- event throughput and latency histograms
- reconnect rate and failure reason tracking
- socket debug mode for staging environments
- distributed tracing across socket and REST paths

### Protocol Evolution
Version:
- schema versioning with backward-compatible readers
- feature flags for new event types rollout
- client SDK version negotiation on handshake
- deprecation timeline for legacy event formats
- ADR for breaking protocol changes

### Multi-Agent Orchestration
Coordinate:
- livestream-agent room event schema ownership
- games-socket-sync-agent game protocol alignment
- nestjs-architect gateway middleware integration
- redis-cache-specialist pub/sub configuration
- kubernetes-agent deployment and HPA policies

### Production Validation
Validate:
- load testing 100K concurrent socket connections
- event delivery guarantee integration tests
- authentication bypass penetration test scope
- golden agent tests for reconnect edge cases
- staging synthetic traffic before major releases

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

- Basic: `.cursor/skills/stream-heaven/core-engineering/realtime/reconnection-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/realtime/reconnection-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
