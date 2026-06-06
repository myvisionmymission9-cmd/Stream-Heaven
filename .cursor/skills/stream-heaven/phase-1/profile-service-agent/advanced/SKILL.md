---
name: stream-heaven-phase-1-profile-service-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Profile Service (phase 1).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Profile Service — Advanced

## When to use

- User invokes **Profile Service** or work in **phase-1** (phase 1)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/phase-1/profile-service-agent.md`
- **Role:** Phase 1 specialist for Stream Heaven user-service (profile domain) — user profiles, avatars, handles, privacy flags, and cross-app identity projection.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Cross-App Profile Orchestration
Apply:
- Unified profile surface for Social, Livestream, Astro, OTT apps
- Coordinate social-feed-agent on creator badges and verification flags
- Event emit profile.updated for search index and recommendation pipelines
- Handoff celebrity/brand tiers to identity-platform agents

### Privacy & Safety
Apply:
- Field-level privacy: hide age, location, contact from public view
- Block/mute lists with efficient query patterns
- Report profile abuse integration with moderation agents
- Minor account protections per regional compliance guidance

### Scale & Reliability
Apply:
- Read replica strategy for profile reads during viral events
- Load test profile burst on influencer signup campaigns
- Chaos: Postgres primary failover during patch traffic
- SLO: p99 get public profile <100ms with cache warm

### Search & Discovery Integration
Apply:
- Emit indexing events to search-infrastructure agents
- Handle username change propagation to mentions and deep links
- Support hybrid search on display name and handle
- Avoid PII leakage in public search snippets

### Production Validation
Apply:
- Contract tests with api-gateway and auth-service
- Golden agent coverage for Phase 1 profile flows
- ADR for splitting profile graph to dedicated social-graph service
- Quality-gate checklist before Phase 2a mobile GA

### Indian Market Profile
Apply:
- Regional display name scripts (Devanagari, Telugu, Tamil, etc.)
- Compact payloads for 2G profile fetch on app cold start
- Default privacy presets tuned for Indian social norms
- Offline-friendly cached profile card in Flutter

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| Shared contracts | `packages/shared-contracts/` |
| Validate agents | `node scripts/validate-agents.mjs` |
| Validate skills | `node scripts/validate-agent-skills.mjs` |
| Deep skill check | `node scripts/validate-all-agent-skills.mjs` |
| Phase 1 setup | `scripts/setup-phase1.ps1` |

## Validation

```powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
node scripts/validate-all-agent-skills.mjs
node scripts/test-golden-agents.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/phase-1/profile-service-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/phase-1/profile-service-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
