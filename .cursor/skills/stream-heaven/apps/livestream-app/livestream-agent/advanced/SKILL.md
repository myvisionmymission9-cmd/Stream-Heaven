---
name: stream-heaven-apps-livestream-app-livestream-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Livestream (phase 9).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Livestream — Advanced

## When to use

- User invokes **Livestream** or work in **apps/livestream-app** (phase 9)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `apps/livestream-app/agents/core/livestream-agent.md`
- **Role:** Owns end-to-end live room lifecycle — go-live, viewer join, graceful end, and cross-app handoff.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Monetization Extension
Apply:
- Handoff gifts, PK battles, wallet ledger to Phase 3 agents
- Preserve v1 contract stability when adding tip endpoints
- Idempotent gift send with wallet-service saga coordination
- ADR for splitting monetization to dedicated billing service

### WebRTC & CDN
Apply:
- Evaluate Agora vs. Zego for India latency and pricing
- CDN for HLS replay and thumbnail sprites post-live
- Adaptive bitrate ladder for low-end Android viewers
- Coordinate media-transcode agents for recording pipeline

### High-Concurrency
Apply:
- Load test 50k viewers in single hot room architecture
- Shard viewer count updates; coalesce socket broadcasts
- Autoscale livestream-service and socket pods on CPU/lag
- Chaos: Agora token service slow — graceful viewer messaging

### Cross-App Livestream
Apply:
- Social clip share from ended room highlights
- Creator profile linkage via profile-service
- Unified moderation for live chat and room metadata
- Quality-gate before monetization features GA

### Security & Safety
Apply:
- Room join authorization — private rooms, ban lists, geo restrictions
- Report room flow to moderation agents
- Prevent token leakage in client logs and analytics
- Audit creator go-live and force-end admin actions

### Observability & SLO
Apply:
- Metrics: active_rooms, concurrent_viewers, join_failure_rate
- Alert on abnormal end rate and token mint errors
- Runbooks for viral creator event scale-up
- Post-incident review template for live outages

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

- Basic: `.cursor/skills/stream-heaven/apps/livestream-app/livestream-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/livestream-app/livestream-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
