---
name: stream-heaven-core-engineering-frontend-mobile-performance-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Mobile Performance (phase 5).
  Single-agent execution with governance prefix and structural validation.
---

# Mobile Performance — Basic

## When to use

- User invokes **Mobile Performance** or work in **core-engineering/frontend** (phase 5)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/core-engineering/frontend/mobile-performance-agent.md`
- **Role:** Mobile Performance Agent specialist for Stream Heaven's frontend domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/core-engineering/frontend/mobile-performance-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Flutter App Architecture
Define:
- Design and implement frontend capabilities for Stream Heaven. (Mobile Performance scope)
- Riverpod provider hierarchy for state management
- GoRouter navigation with deep link support
- feature-first folder structure in apps/mobile
- shared widget library in packages/design-system
- environment config via --dart-define API_BASE_URL

### Performance for Low-End Android
Optimize:
- 60fps scroll targets on 2GB RAM devices
- image caching and lazy loading strategies
- widget rebuild minimization with const constructors
- RepaintBoundary for complex list items
- memory profiling for leak detection
- Follow platform-governance standards for all outputs.

### Networking & API Integration
Implement:
- Dio/HTTP client with JWT token injection
- token refresh interceptor on 401 responses
- offline-aware retry with exponential backoff
- request cancellation on widget dispose
- API error mapping to user-friendly i18n strings
- Coordinate with dependent agents and shared packages.

### UI & Design System
Apply:
- design tokens from packages/design-system
- platform-governance/flutter-ui-rules.md compliance
- responsive layouts for varied screen sizes
- dark mode and theme switching support
- accessibility: semantics, contrast, touch targets

### Localization & Indian Market
Support:
- i18n ARB files for 9+ Indian languages
- RTL-safe layouts where applicable
- low-bandwidth mode toggles
- OTP autofill and phone number formatting
- Indian number/date formatting conventions

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

- Basic: `.cursor/skills/stream-heaven/core-engineering/frontend/mobile-performance-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/frontend/mobile-performance-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
