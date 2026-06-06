---
name: stream-heaven-core-engineering-infrastructure-cloudflare-cdn-specialist-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Cloudflare Cdn Specialist (phase 5).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Cloudflare Cdn Specialist — Advanced

## When to use

- User invokes **Cloudflare Cdn Specialist** or work in **core-engineering/infrastructure** (phase 5)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/core-engineering/infrastructure/cloudflare-cdn-specialist.md`
- **Role:** Cloudflare Cdn Specialist specialist for Stream Heaven's infrastructure domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Live Transcoding & LL-HLS
Stream:
- Design and implement infrastructure capabilities for Stream Heaven. (Cloudflare Cdn Specialist scope)
- low-latency HLS for livestream catch-up
- Agora/Zego recording to VOD pipeline
- live thumbnail updates during broadcast
- ABR switching under variable uplink
- failover between transcode workers

### DRM & Content Protection
Protect:
- Widevine/FairPlay license server integration
- key rotation for premium OTT titles
- screen capture deterrence policies per platform
- geo-restriction enforcement at CDN edge
- watermarking for leak tracing
- Follow platform-governance standards for all outputs.

### Media Pipeline Scale
Scale:
- Kubernetes job autoscaling for transcode spikes
- GPU worker pools for AV1/HEVC encoding
- priority queues for live vs VOD workloads
- multi-region ingest for creator uploads
- cost caps with spot instance strategies
- Coordinate with dependent agents and shared packages.

### AI-Enhanced Media
Augment:
- auto-captioning for Indian languages
- content tagging for search and recommendations
- highlight clip generation for live replays
- inappropriate content frame detection
- thumbnail A/B selection via engagement models

### Storage Lifecycle
Manage:
- S3 lifecycle rules for cold archive tiers
- orphaned upload garbage collection
- deduplication via perceptual hashing where safe
- backup and cross-region replication policies
- storage cost attribution per app

### Production Validation
Validate:
- transcode SLA monitoring and alerting
- playback start time p95 dashboards
- codec compatibility matrix tests
- CDN cache hit ratio targets
- golden tests for ingest edge cases

### Multi-Agent Orchestration
Coordinate:
- OTT catalog agents for metadata sync
- livestream-agent for recording hooks
- cdn-routing-agent for edge policy updates
- kubernetes-agent for worker scaling
- ADR for new codec or CDN vendor adoption

### Creator Upload UX
Optimize:
- background upload on mobile with progress persistence
- draft resume after app kill
- upload quality presets for low-bandwidth creators
- processing status notifications
- failure recovery with partial chunk reuse

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

- Basic: `.cursor/skills/stream-heaven/core-engineering/infrastructure/cloudflare-cdn-specialist/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/infrastructure/cloudflare-cdn-specialist/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
