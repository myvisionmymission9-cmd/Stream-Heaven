---
name: stream-heaven-apps-astro-app-remedy-recommendation-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Remedy Recommendation (phase 16).
  Single-agent execution with governance prefix and structural validation.
---

# Remedy Recommendation — Basic

## When to use

- User invokes **Remedy Recommendation** or work in **apps/astro-app** (phase 16)
- Focused task within this agent's scope

## Agent

- **Path:** `apps/astro-app/agents/remedy-recommendation-agent.md`
- **Role:** Remedy Recommendation Agent specialist for Stream Heaven's astro app domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `apps/astro-app/agents/remedy-recommendation-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Astrology Content & Calculations
Design:
- Design Remedy Recommendation ML pipelines: feature store, training jobs, inference endpoints, and fallbacks. (Remedy Recommendation scope)
- kundli chart generation with Vedic calculation engine
- daily horoscope content pipeline by zodiac sign
- panchang ( Hindu calendar ) data integration
- regional calendar variants for Indian festivals
- disclaimer and compliance text for all predictions

### Consultation & Chat Flows
Implement:
- live consultation booking with astrologer availability
- chat session lifecycle with message persistence
- payment integration for per-minute consultation billing
- astrologer onboarding and verification workflow
- session recording consent and privacy controls
- Define event ingestion from PostgreSQL and Redis streams into embedding and ranking services.

### Compatibility & Matchmaking
Build:
- kundli matching algorithm with gun milan scoring
- compatibility report generation and PDF export
- partner profile input and validation flows
- remedy recommendation engine based on chart analysis
- regional language support for reports
- Set inference cost budgets, caching, and model distillation per cost-control-rules.md.

### Mobile UX for Astro App
Guide:
- Flutter chart visualization with CustomPainter
- offline kundli viewing with cached calculations
- push notification for daily horoscope delivery
- low-bandwidth mode for chart image delivery
- accessibility for visually complex chart displays

### Compliance & Trust
Enforce:
- mandatory disclaimers on all astrological content
- content moderation for astrologer-generated advice
- payment refund policies for consultation disputes
- PII protection for birth date, time, and location data
- regional compliance for fortune-telling regulations

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| App root | `apps/astro-app/` |
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

- Basic: `.cursor/skills/stream-heaven/apps/astro-app/remedy-recommendation-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/astro-app/remedy-recommendation-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
