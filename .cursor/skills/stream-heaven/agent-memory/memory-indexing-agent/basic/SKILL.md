---
name: stream-heaven-agent-memory-memory-indexing-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Memory Indexing (phase 18).
  Single-agent execution with governance prefix and structural validation.
---

# Memory Indexing — Basic

## When to use

- User invokes **Memory Indexing** or work in **agent-memory** (phase 18)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/agent-memory/memory-indexing-agent.md`
- **Role:** Memory search indexing.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/agent-memory/memory-indexing-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Indexing Pipeline
Build:
- memory-indexing-agent: Redis hot, PostgreSQL cold, vector tier. (Memory Indexing scope)
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
- PII scrub per security-rules.

### Ranking & Relevance
Tune:
- BM25 baseline with engagement boosting
- personalization features from growth signals
- freshness decay for trending queries
- diversity constraints in result pages
- A/B ranking experiments with guardrails
- TTL via memory-pruning-agent.

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

- Basic: `.cursor/skills/stream-heaven/agent-memory/memory-indexing-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/agent-memory/memory-indexing-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
