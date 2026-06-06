---
name: stream-heaven-core-engineering-realtime-realtime-systems-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Realtime Systems (phase 5).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Realtime Systems — Advanced

## When to use

- User invokes **Realtime Systems** or work in **core-engineering/realtime** (phase 5)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/core-engineering/realtime/realtime-systems-agent.md`
- **Role:** Realtime Systems Agent specialist for Stream Heaven's realtime domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### High-Scale Livestream
Apply:
- Hot room sharding and coalesced viewer count broadcasts
- PK battle and gift event priority queues
- Load test 100k connection architecture with chaos-engineering-agent
- Polling fallback when socket unavailable on poor networks

### Evolution & Incidents
Apply:
- Kafka bridge for analytics without blocking Socket.IO MVP
- Incident runbooks with incident-commander-agent
- Post-mortem template for reconnect storms and adapter lag
- ADR for alternative transports (MQTT, WebTransport) when justified

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

- Basic: `.cursor/skills/stream-heaven/core-engineering/realtime/realtime-systems-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/realtime/realtime-systems-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
