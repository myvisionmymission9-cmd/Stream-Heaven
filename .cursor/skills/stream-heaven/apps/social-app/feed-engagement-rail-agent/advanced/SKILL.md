---
name: stream-heaven-apps-social-app-feed-engagement-rail-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Feed Engagement Rail (phase 8).
  Home Feed multi-agent orchestration, ADRs, production validation.
---

# Feed Engagement Rail — Advanced

## When to use

- Cross-agent Home Feed features, production readiness, or multi-chat orchestration
- Ranking, preload, or regional discovery changes touching multiple services

## Agent

- **Path:** `apps/social-app/agents/home-feed/feed-engagement-rail-agent.md`

## Scope (advanced)

- Coordinate via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- ADR for architecture forks: `docs/adr/SH-000-template.md`
- Run `node scripts/test-golden-agents.mjs` after bulk agent changes
- Enforce Home Feed boundary — defer wallet/live backend to their domain agents

## Orchestration

- **Architect:** home-feed-architect-agent
- **Contracts:** home-feed-api-contract-agent
- **UI:** home-feed-flutter-ui-agent
- **QA:** home-feed-qa-agent

## Validation

```powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
flutter test apps/mobile/test/home_feed
```
