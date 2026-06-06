---
name: stream-heaven-core-engineering-frontend-flutter-architect-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Flutter Architect (phase 5).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Flutter Architect — Advanced

## When to use

- User invokes **Flutter Architect** or work in **core-engineering/frontend** (phase 5)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/core-engineering/frontend/flutter-architect.md`
- **Role:** Flutter Architect specialist for Stream Heaven's frontend domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Multi-App Shell
Apply:
- Shared mobile shell routing to Social, Livestream, Astro, OTT modules
- Single sign-on session across in-app tab switches
- Feature flags per app module via remote config
- ADR for monorepo vs. multi-app Flutter workspace splits

### Offline & Connectivity
Apply:
- Cache profile and feed skeleton for offline-first UX
- Connectivity-aware UI: queue actions, sync on reconnect
- Compress images client-side before S3 presigned upload
- Optimize for 2G/3G: small payloads, progressive loading

### Realtime UI
Apply:
- Socket.IO client integration with reconnect backoff
- Riverpod stream providers for live viewer counts and chat
- Coordinate socketio-architect on room join/leave lifecycle
- Battery-aware background socket policy on Android

### Media & Livestream UI
Apply:
- Agora/Zego Flutter SDK integration patterns
- PiP, orientation, and audio focus handling on Android
- Low-latency preview surfaces for creator go-live
- Handoff livestream-agent for room list and token bootstrap UI

### Production Quality
Apply:
- Crash reporting hooks without PII in logs
- Staged rollout via Play Console with phase-2a bootstrap checks
- Accessibility: semantic labels, contrast, screen reader flows
- Quality-gate before Phase 8/9 feature module merge

### Cross-Team Coordination
Apply:
- Sync with design-tokens-architect on breaking token changes
- Contract-first: block UI work on undocumented API changes
- Coordinate ux-research-lead on usability validation
- Document Flutter patterns in platform-governance flutter-ui-rules.md

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

- Basic: `.cursor/skills/stream-heaven/core-engineering/frontend/flutter-architect/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/frontend/flutter-architect/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
