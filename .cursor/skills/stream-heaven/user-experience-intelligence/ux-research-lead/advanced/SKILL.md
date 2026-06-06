---
name: stream-heaven-user-experience-intelligence-ux-research-lead-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Ux Research Lead (phase 7).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Ux Research Lead — Advanced

## When to use

- User invokes **Ux Research Lead** or work in **user-experience-intelligence** (phase 7)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/user-experience-intelligence/ux-research-lead.md`
- **Role:** Ux Research Lead specialist for Stream Heaven's user experience intelligence domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Hybrid & Vector Search
Combine:
- Design and implement user experience intelligence capabilities for Stream Heaven. (Ux Research Lead scope)
- dense embeddings + sparse BM25 fusion
- vector database agent coordination (pgvector/Pinecone)
- embedding refresh pipelines on content updates
- approximate nearest neighbor tuning
- cold-start embedding strategies

### Search at Scale
Scale:
- shard planning by content type and region
- read replica routing for query traffic
- cache layers for hot queries and autocomplete
- rate limiting abusive search scrapers
- failover to degraded keyword-only mode
- Follow platform-governance standards for all outputs.

### Cross-App Search Federation
Federate:
- unified search across Social, Livestream, OTT, Astro
- app-specific result tabs with blended ranking option
- cross-app deep links from search results
- permission-aware result filtering
- wallet and purchase history search exclusions
- Coordinate with dependent agents and shared packages.

### Semantic Discovery
Enable:
- natural language queries for content discovery
- multimodal search on thumbnails and clips
- astro consultation topic search specialization
- live room search by topic and language
- creator discovery by niche and geography

### Production Validation
Validate:
- relevance benchmark suites per locale
- index consistency checks after bulk reindex
- load tests for festival trending spikes
- regression tests for ranking model deployments
- golden tests for autocomplete edge cases

### Multi-Agent Orchestration
Coordinate:
- growth-ai search-ranking agents
- ml-platform embedding-agent pipelines
- content-tagging-agent metadata enrichment
- elasticsearch-admin-agent cluster ops
- ADR for search engine vendor changes

### Privacy & Compliance
Protect:
- user search history retention limits
- right-to-erasure propagation to indexes
- consent-gated personalized search
- audit logs for admin search overrides
- regional data residency for search logs

### Operational Excellence
Operate:
- blue/green index migrations
- backup and restore drills for search clusters
- capacity planning for IPL and festival peaks
- on-call runbooks for index red health
- cost optimization for storage and compute

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

- Basic: `.cursor/skills/stream-heaven/user-experience-intelligence/ux-research-lead/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/user-experience-intelligence/ux-research-lead/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
