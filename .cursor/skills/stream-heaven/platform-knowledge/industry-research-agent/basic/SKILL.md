---
name: stream-heaven-platform-knowledge-industry-research-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Industry Research (phase 20).
  Single-agent execution with governance prefix and structural validation.
---

# Industry Research — Basic

## When to use

- User invokes **Industry Research** or work in **platform-knowledge** (phase 20)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/platform-knowledge/industry-research-agent.md`
- **Role:** Industry Research Agent specialist for Stream Heaven's platform-knowledge domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/platform-knowledge/industry-research-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Indexing Pipeline
Build:
- Own Industry Research deliverables in platform-knowledge domain for Stream Heaven Phase 20. (Industry Research scope)
- Elasticsearch/OpenSearch cluster index design
- incremental indexing from domain event streams
- denormalized documents for feed, users, and OTT titles
- language analyzers for Hindi, Tamil, and Hinglish
- index lifecycle management and rollover policies

### Query Understanding
Parse:
- spell correction and synonym expansion
- intent classification: user vs content vs hashtag
- zero-results fallback strategies
- safe search filters for minor accounts
- query logging with PII redaction
- Define or update packages/shared-contracts schemas before NestJS, Flutter, or Socket.IO implementation.

### Ranking & Relevance
Tune:
- BM25 baseline with engagement boosting
- personalization features from growth signals
- freshness decay for trending queries
- diversity constraints in result pages
- A/B ranking experiments with guardrails
- Apply platform-governance standards for API, security, database, deployment, and testing surfaces.

### Autocomplete & Suggestions
Serve:
- edge-cached suggestion endpoints
- trending query prefixes by region
- creator handle vs display name disambiguation
- inappropriate suggestion blocklists
- sub-50ms p95 autocomplete latency targets

### Search Analytics
Measure:
- CTR, zero-rate, and reformulation metrics
- index lag monitoring dashboards
- slow query logging and optimization backlog
- search-to-conversion attribution hooks
- weekly relevance evaluation sets

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
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/platform-knowledge/industry-research-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/platform-knowledge/industry-research-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
