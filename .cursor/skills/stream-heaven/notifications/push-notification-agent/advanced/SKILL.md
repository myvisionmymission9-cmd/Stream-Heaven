---
name: stream-heaven-notifications-push-notification-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Push Notification (Phase 18).
  Cross-agent orchestration, ADRs, production validation.
---

# Push Notification — Advanced

## When to use

- Cross-agent features, production readiness, or multi-chat orchestration
- Architecture decisions touching multiple services or contracts
- Phase 18+ changes to notifications

## Agent

- **Path:** `ai-agents/notifications/push-notification-agent.md`

## Scope (advanced)

- Coordinate via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- ADR for architecture forks: `docs/adr/SH-000-template.md`
- Run `node scripts/test-golden-agents.mjs` after bulk agent changes
- Enforce notifications boundary — defer wallet/live backend to their domain agents

## Orchestration

- **Architecture:** `docs/GLOBAL-CREATOR-ECOSYSTEM-ARCHITECTURE.md`
- **Roadmap:** `docs/GLOBAL-CREATOR-ECOSYSTEM-ROADMAP.md`
- **Contracts:** `packages/shared-contracts/openapi/`
- **Registry:** `ai-agents/AGENT-REGISTRY.md`

## Validation

```powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
flutter test apps/mobile
```
