---
name: stream-heaven-apps-media-app-ott-streaming-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Ott Streaming (phase 17).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Ott Streaming — Advanced

## When to use

- User invokes **Ott Streaming** or work in **apps/media-app** (phase 17)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `apps/media-app/ott-streaming-agent.md`
- **Role:** Ott Streaming Agent specialist for Stream Heaven's media-app domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Pipeline Integration
Apply:
- Transcode job status webhooks from transcoding-pipeline-agent
- DRM stub with drm-protection-agent before premium GA
- Live-to-VOD replay from livestream recording agents
- Catalog sync with ott-catalog-agent

### Scale & Cost
Apply:
- Concurrent stream start load tests for campaign launches
- Bitrate cap policies for free tier users
- S3 lifecycle for expired offline downloads
- Cost dashboard per watch hour with cto-agent review

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| App root | `apps/media-app/` |
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

- Basic: `.cursor/skills/stream-heaven/apps/media-app/ott-streaming-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/media-app/ott-streaming-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
