# Chat 5 — AI Recommendation Systems

## Scope

Personalization, ranking, watch history, engagement scoring, retention prediction, creator scoring, trend detection, feature stores.

## Attach Folders

- `ai-agents/growth-ai/`
- `ai-agents/data-science/`
- `analytics-platform/`

## Primary Agents

| Agent | Path |
|-------|------|
| Feed Ranking Agent | `apps/social-app/agents/feed-ranking-agent.md` |
| Retention Optimizer | `ai-agents/growth-ai/` (domain agents) |
| Trend Detection | `ai-agents/data-science/` (domain agents) |
| Recommendation Row | `apps/media-app/agents/recommendation-row-agent.md` |

## Deliverables

- [ ] Recommendation architecture doc
- [ ] Feature store design
- [ ] Ranking pipeline (batch + realtime)
- [ ] Event ingestion from analytics-platform
- [ ] Recommendation APIs (Phase 4)

## Phase Alignment

**Phase 4** — full ML pipelines. **Phase 2** — simple heuristic feed ranking only.

## Multi-Chat Ready

**Yes** (agents/docs) — **No** (ML infra). Defer heavy work until Phase 2 social data exists.
