---
name: stream-heaven-cross-platform-web-flutter-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Web Flutter (phase 20).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Web Flutter — Advanced

## When to use

- User invokes **Web Flutter** or work in **cross-platform** (phase 20)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/cross-platform/web-flutter-agent.md`
- **Role:** Web Flutter Agent specialist for Stream Heaven's cross platform domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Advanced State Management
Architect:
- Implement Web Flutter in Flutter using Riverpod state and GoRouter navigation per flutter-ui-rules.md. (Web Flutter scope)
- Riverpod code generation with @riverpod annotations
- async provider error and loading state patterns
- cross-feature state sharing without tight coupling
- optimistic UI updates with rollback on failure
- state persistence for offline-first features

### Realtime Client Integration
Wire:
- Socket.IO client with reconnection backoff
- event stream to Riverpod provider bridge
- background connection management on mobile
- battery-efficient heartbeat configuration
- coordination with socketio-architect protocols
- Optimize list scrolling, image caching, and offline-first UX for low-end Android and poor connectivity.

### Media & Streaming UI
Build:
- video player integration for livestream and OTT
- adaptive quality selection UI for poor networks
- picture-in-picture for live viewing
- gift animation overlay performance budgets
- camera/mic permission flows for go-live
- Consume generated API clients from packages/shared-contracts for NestJS backend types.

### Testing & Quality
Validate:
- widget tests for critical user flows
- integration tests with mock API servers
- golden file tests for UI regression
- flutter analyze zero-warning policy
- device matrix testing on low-end Android

### Build & Release Pipeline
Automate:
- flavor configuration for dev/staging/prod
- code signing and Play Store release workflow
- app size optimization and split APK strategies
- crash reporting integration (Firebase Crashlytics)
- feature flag client SDK integration

### Cross-App Shared Components
Share:
- monorepo package extraction for shared UI
- auth flow widget shared across four apps
- profile avatar component standardization
- navigation shell pattern for multi-app ecosystem
- design-tokens-architect token sync workflow

### Multi-Agent Orchestration
Coordinate:
- social-feed-agent mobile feed requirements
- livestream-agent room UI specifications
- design-tokens-architect token updates
- api-contract-author client SDK alignment
- ADR for major Flutter architecture changes

### Production Validation
Ensure:
- ANR and crash rate monitoring thresholds
- startup time profiling on target devices
- network failure UX validation on simulated 2G
- accessibility audit with screen reader testing
- golden agent tests for navigation edge cases

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

- Basic: `.cursor/skills/stream-heaven/cross-platform/web-flutter-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/cross-platform/web-flutter-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
