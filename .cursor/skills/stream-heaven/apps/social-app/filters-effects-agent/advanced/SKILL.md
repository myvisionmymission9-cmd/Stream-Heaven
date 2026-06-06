---
name: stream-heaven-apps-social-app-filters-effects-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Filters Effects (phase 8).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Filters Effects — Advanced

## When to use

- User invokes **Filters Effects** or work in **apps/social-app** (phase 8)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `apps/social-app/filters-effects-agent.md`
- **Role:** Filters Effects Agent specialist for Stream Heaven's social-app domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Feed Architecture at Scale
Architect:
- Design and implement social app capabilities for Stream Heaven. (Filters Effects scope)
- fan-out on write vs fan-out on read trade-off analysis
- Redis-backed feed cache with TTL and invalidation
- hot creator feed pre-computation for viral posts
- feed shard partitioning by user cohort
- cross-region feed consistency for diaspora users

### Content Moderation Pipeline
Integrate:
- pre-publish content scanning hooks
- post-report triage queue integration
- automated shadow-ban and visibility reduction
- appeal workflow for moderated content
- coordination with trust-safety-agent policies
- Follow platform-governance standards for all outputs.

### Media & CDN Integration
Optimize:
- S3 presigned upload for post images and videos
- Cloudflare CDN URL generation with cache purge
- WebP/AVIF transcoding for bandwidth savings
- video thumbnail generation for feed previews
- media pipeline cost tracking per post type
- Coordinate with dependent agents and shared packages.

### Engagement Analytics
Track:
- impression, click, dwell time event schemas
- real-time trending post detection
- creator analytics dashboard data feeds
- A/B test result aggregation for feed experiments
- privacy-compliant analytics with consent gates

### Search & Discovery Integration
Wire:
- post indexing hooks for search-infrastructure
- hashtag normalization and trending computation
- user discovery via mutual follows graph
- content deduplication for repost detection
- regional trending with language filters

### Production Validation
Validate:
- contract tests for all social OpenAPI endpoints
- load testing feed fetch at peak evening traffic
- moderation pathway integration tests
- feed ranking regression test suite
- golden agent tests for feed edge cases

### Observability & Operations
Monitor:
- feed latency p50/p99 dashboards
- post creation failure rate alerting
- moderation queue depth monitoring
- runbooks for feed staleness and cache poisoning
- post-incident review for content safety events

### Multi-Agent Orchestration
Coordinate:
- feed-architect and feed-ranking-agent alignment
- story-system-designer cross-surface consistency
- profile-service avatar and handle display
- socketio-architect realtime notification events
- ADR drafts for feed architecture forks

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| App root | `apps/social-app/` |
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

- Basic: `.cursor/skills/stream-heaven/apps/social-app/filters-effects-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/social-app/filters-effects-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
