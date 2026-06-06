---
name: stream-heaven-apps-media-app-video-compression-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Video Compression (phase 17).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Video Compression — Advanced

## When to use

- User invokes **Video Compression** or work in **apps/media-app** (phase 17)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `apps/media-app/video-compression-agent.md`
- **Role:** Video Compression Agent specialist for Stream Heaven's media-app domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### OTT Scaling Architecture
Scale:
- Design and implement media app capabilities for Stream Heaven. (Video Compression scope)
- CDN edge caching strategy for viral content spikes
- origin shield configuration for S3 egress cost control
- concurrent stream limit enforcement per subscription
- regional catalog replication for latency
- peak traffic planning for festival movie releases

### Advanced DRM & Content Protection
Protect:
- multi-DRM license server integration
- screen recording detection and blocking
- watermarking for premium content anti-piracy
- license renewal and offline playback expiry
- compliance with studio content protection requirements
- Follow platform-governance standards for all outputs.

### Media Pipeline Operations
Operate:
- automated transcoding queue with priority tiers
- quality assurance checks on transcoded outputs
- subtitle synchronization and format conversion
- content expiry and takedown workflows
- media asset cost tracking per title
- Coordinate with dependent agents and shared packages.

### Analytics & Engagement
Track:
- watch time, completion rate, and drop-off analytics
- real-time trending computation for homepage rows
- churn prediction signals from viewing patterns
- A/B test result aggregation for UX experiments
- privacy-compliant viewing history for recommendations

### Accessibility & Compliance
Ensure:
- closed captions and audio descriptions for all content
- parental control PIN and age-gate enforcement
- regional content compliance (CBFC ratings)
- data localization for Indian user viewing history
- accessibility audit for video player controls

### Production Validation
Validate:
- playback E2E tests across device matrix
- DRM license flow integration tests
- CDN cache hit ratio monitoring thresholds
- subscription entitlement enforcement tests
- golden agent tests for catalog edge cases

### Multi-Agent Orchestration
Coordinate:
- transcoding-pipeline-agent for media processing
- recommendation-row-agent for homepage composition
- drm-protection-agent for content security
- media-billing-agent for subscription flows
- ADR for streaming protocol or DRM provider changes

### Cost & Performance Optimization
Optimize:
- CDN egress cost dashboards and alerting
- transcoding cost per minute of content
- adaptive quality defaults to reduce bandwidth spend
- cold storage tiering for archival content
- right-sizing transcoding worker pools

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

- Basic: `.cursor/skills/stream-heaven/apps/media-app/video-compression-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/media-app/video-compression-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
