---
name: stream-heaven-apps-astro-app-astro-offline-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Astro Offline (phase 16).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Astro Offline — Advanced

## When to use

- User invokes **Astro Offline** or work in **apps/astro-app** (phase 16)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `apps/astro-app/agents/astro-offline-agent.md`
- **Role:** Astro Offline Agent specialist for Stream Heaven's astro app domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Astrology Engine Architecture
Architect:
- Design and implement astro app capabilities for Stream Heaven. (Astro Offline scope)
- ephemeris data pipeline for accurate planetary positions
- calculation caching in Redis for repeated kundli requests
- A/B testing different calculation tradition variants
- batch horoscope generation for push notification scale
- ADR for third-party ephemeris library selection

### Live Consultation at Scale
Scale:
- astrologer queue management with wait time estimation
- video/audio consultation via Agora integration
- concurrent session limits per astrologer tier
- quality monitoring for consultation completion rates
- peak demand handling during festival periods
- Follow platform-governance standards for all outputs.

### AI-Enhanced Astrology Features
Leverage:
- LLM-assisted remedy recommendation with guardrails
- natural language chart interpretation generation
- chatbot triage before live astrologer handoff
- AI cost control for per-consultation LLM usage
- human review queue for AI-generated content
- Coordinate with dependent agents and shared packages.

### Monetization & Payments
Optimize:
- per-minute billing with precise session timing
- wallet integration for consultation credits
- astrologer revenue share and payout scheduling
- promotional free consultation campaigns
- UPI-first payment flow for Indian users

### Content Moderation & Safety
Operate:
- astrologer advice audit sampling program
- user report and block flows for inappropriate guidance
- automated flagging for medical/financial advice violations
- astrologer rating and review integrity checks
- coordination with trust-safety-agent policies

### Production Validation
Validate:
- kundli calculation accuracy regression tests
- consultation booking E2E flow tests
- payment and refund integration tests
- disclaimer display enforcement checks
- golden agent tests for chart edge cases

### Multi-Agent Orchestration
Coordinate:
- kundli-chart-agent for calculation engine specs
- live-consultation-agent for session management
- astro-payment-agent for billing integration
- astro-disclaimer-compliance for regulatory text
- profile-service for astrologer profile display

### Observability & Operations
Monitor:
- consultation completion rate dashboards
- kundli generation latency and error tracking
- astrologer utilization and queue depth metrics
- payment failure rate alerting
- runbooks for ephemeris data pipeline failures

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
node scripts/test-golden-agents.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/apps/astro-app/astro-offline-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/astro-app/astro-offline-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
