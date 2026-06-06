---
name: stream-heaven-identity-platform-cross-app-profile-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Cross App Profile (phase 18).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Cross App Profile — Advanced

## When to use

- User invokes **Cross App Profile** or work in **identity-platform** (phase 18)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/identity-platform/cross-app-profile-agent.md`
- **Role:** Cross-app profile sync.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Advanced Profile Architecture
Architect:
- cross-app-profile-agent in user-service + shared-contracts/identity/v1. (Cross App Profile scope)
- event-driven profile updates via Redis Streams
- read replicas for high-traffic profile lookups
- profile versioning for audit and rollback
- multi-region profile cache coherence
- ADR for profile data model extensions

### Privacy & Moderation Integration
Enforce:
- field-level privacy controls per app surface
- blocked user profile visibility rules
- content moderation queue for avatar and bio changes
- GDPR-style data export and deletion workflows
- minor account restrictions and parental controls prep
- Firebase Auth + OTP per security-rules.

### Media Pipeline Integration
Integrate:
- image processing pipeline for avatar resize and WebP conversion
- virus scan hook before avatar publish
- CDN cache purge on avatar update
- bandwidth-optimized thumbnail variants
- S3 lifecycle policies for orphaned uploads
- Outbox via event-stream-agent.

### Cross-App Identity Projection
Project:
- minimal profile DTO per app (social vs livestream vs astro)
- verified badge and creator tier display rules
- handle change cooldown and redirect policies
- profile completeness scoring for onboarding nudges
- sync events to search-infrastructure indexing

### Caching at Scale
Scale:
- Redis cluster sharding for profile cache keys
- cache stampede prevention with request coalescing
- negative caching for non-existent handles
- cache warming for trending creator profiles
- chaos testing cache invalidation storms

### Multi-Agent Orchestration
Coordinate:
- auth-service user ID creation handoff
- api-gateway-bootstrap-agent route registration
- postgres-architect schema review
- content-safety-agent moderation escalation
- social-feed-agent profile display requirements

### Production Validation
Validate:
- contract tests for all user OpenAPI endpoints
- load testing profile fetch at feed peak traffic
- avatar upload E2E with presigned URL flow
- privacy setting enforcement integration tests
- golden agent tests for profile edge cases

### Observability & Operations
Monitor:
- profile update rate and cache hit ratio dashboards
- avatar upload failure alerting
- handle collision and uniqueness violation metrics
- runbooks for profile data corruption recovery
- post-incident review for PII exposure events

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

- Basic: `.cursor/skills/stream-heaven/identity-platform/cross-app-profile-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/identity-platform/cross-app-profile-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
