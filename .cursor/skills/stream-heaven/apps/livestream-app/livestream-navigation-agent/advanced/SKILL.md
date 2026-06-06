---
name: stream-heaven-apps-livestream-app-livestream-navigation-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Livestream Navigation (phase 9).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Livestream Navigation — Advanced

## When to use

- User invokes **Livestream Navigation** or work in **apps/livestream-app** (phase 9)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `apps/livestream-app/agents/core/livestream-navigation-agent.md`
- **Role:** Livestream Navigation Agent specialist for Stream Heaven's core domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Livestream Scaling Architecture
Scale:
- Own livestream domain contracts and NestJS livestream-service behavior for Livestream Navigation. (Livestream Navigation scope)
- horizontal scaling of livestream-service instances
- Redis-backed room state with sticky Socket.IO sessions
- viewer count aggregation via Redis INCR with debounce
- CDN edge caching for room metadata and thumbnails
- regional room placement for latency optimization

### Multi-Host & Co-Streaming
Support:
- co-host invitation and permission model
- layout switching for PK battles and guest panels
- audio mixing coordination with multi-guest agents
- bandwidth-adaptive layouts for viewer devices
- host control delegation and moderation tools
- Manage room lifecycle, viewer counts, and Agora/Zego token bootstrap via env templates only.

### Monetization Handoff Architecture
Prepare:
- gift event hooks without breaking core room contracts
- PK battle state extension points in room schema
- wallet ledger integration stubs for tipping
- creator revenue share event emission
- Phase 3 agent handoff documentation
- Configure api-gateway /v1/livestream/* proxy routes with JWT header propagation.

### Moderation & Safety Integration
Wire:
- live content moderation signal ingestion
- host ban and room force-close admin APIs
- report flow from viewer to trust-safety pipeline
- age-gated room access policies
- regional compliance for live content regulations

### Adaptive Streaming & Quality
Optimize:
- adaptive bitrate guidance for host upload conditions
- low-latency mode vs standard mode trade-offs
- network quality indicator for viewers on poor connectivity
- fallback to audio-only on bandwidth collapse
- coordination with adaptive-streaming-agent

### Production Validation
Validate:
- room lifecycle E2E tests with synthetic viewers
- load testing 10K concurrent viewers per room cluster
- Agora token generation contract tests
- chaos testing host disconnect during peak viewers
- golden agent tests for room state edge cases

### Observability & Incident Response
Monitor:
- concurrent live rooms and viewer count dashboards
- stream start failure rate and token error alerting
- p99 room join latency metrics
- runbooks for stuck rooms and ghost viewer counts
- post-incident review for live outage events

### Multi-Agent Orchestration
Coordinate:
- room-lifecycle-manager and viewer-session-agent handoffs
- socketio-architect event schema alignment
- creator-monetization-agent Phase 3 extension planning
- livestream-scaling-agent capacity planning
- ADR drafts for streaming provider changes

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
node scripts/test-golden-agents.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/apps/livestream-app/livestream-navigation-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/livestream-app/livestream-navigation-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
