---
name: stream-heaven-core-engineering-frontend-flutter-architect-basic
description: >-
  Basic Cursor skill for Stream Heaven Flutter Architect (phase 5).
  Single-agent execution with governance prefix and structural validation.
---

# Flutter Architect — Basic

## When to use

- User invokes **Flutter Architect** or work in **core-engineering/frontend** (phase 5)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/core-engineering/frontend/flutter-architect.md`
- **Role:** Flutter Architect specialist for Stream Heaven's frontend domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/core-engineering/frontend/flutter-architect.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Flutter Architecture
Apply:
- Riverpod providers for app state; avoid global singletons
- GoRouter declarative routes with deep link support
- Feature-first folder layout under apps/mobile/lib/features/
- Separation of UI, domain, and data layers per feature

### API Client
Apply:
- Consume packages/shared-contracts generated Dart clients
- Centralize API_BASE_URL via --dart-define and env docs
- Handle 401 refresh flow coordinated with auth-service contracts
- Retry with exponential backoff on transient network errors

### UI & Design System
Apply:
- Apply design tokens from packages/design-system
- Follow flutter-ui-rules.md for spacing, typography, dark mode
- User-facing strings only in ARB i18n files (8+ languages)
- Responsive layouts for small Android screens (320dp width)

### Performance
Apply:
- const constructors, ListView.builder, image cacheWidth/cacheHeight
- Avoid jank: profile with DevTools; target 60fps on low-end devices
- Lazy load feeds and thumbnails; placeholder shimmer patterns
- Minimize app bundle size; defer heavy SDKs to feature modules

### Testing
Apply:
- Widget tests for critical flows: login, profile, feed shell
- Mock Riverpod overrides for API failures
- flutter analyze clean; flutter test in CI
- Golden tests for key screens where design-system mandates

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

- Basic: `.cursor/skills/stream-heaven/core-engineering/frontend/flutter-architect/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/frontend/flutter-architect/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
