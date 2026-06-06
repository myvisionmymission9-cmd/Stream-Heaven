---
name: stream-heaven-growth-ai-growth-hacker-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Growth Hacker (phase 15).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Growth Hacker — Advanced

## When to use

- User invokes **Growth Hacker** or work in **growth-ai** (phase 15)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/growth-ai/growth-hacker-agent.md`
- **Role:** Growth Hacker Agent specialist for Stream Heaven's growth-ai domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Growth ML & Feature Store
Operate:
- Design Growth Hacker growth loops: referrals, campaigns, store ASO, and share incentives with measurable KPIs. (Growth Hacker scope)
- online/offline feature parity for ranking models
- real-time inference budgets and fallback heuristics
- model monitoring for drift on regional cohorts
- shadow mode deployments before traffic allocation
- GPU cost caps with distillation for lightweight models

### Attribution & Measurement
Instrument:
- multi-touch attribution across paid, organic, and referral
- SKAN/GA4/AppsFlyer alignment for mobile install tracking
- incrementality tests for paid acquisition channels
- LTV/CAC modeling by creator vs viewer segments
- fraud-adjusted conversion reporting
- Implement NestJS growth APIs and Flutter surfaces optimized for low-data first launches.

### Campaign Operations at Scale
Run:
- regional campaign playbooks for tier-2/3 Indian cities
- creator recruitment pipelines with quality scoring
- festive burst capacity planning for SMS and push
- budget allocation agents integrated with finance ledger
- rollback plans for campaigns hurting retention
- Track funnel events into analytics pipelines without PII leakage per security-rules.md.

### Cross-App Growth Loops
Connect:
- Social → Livestream creator activation journeys
- Astro consultation upsell from social engagement
- OTT watch-party hooks from livestream events
- unified wallet incentives across four apps
- deep link routing through api-gateway and mobile shell

### Notification & Re-engagement
Optimize:
- send-time optimization by timezone and habit windows
- winback sequences with channel preference learning
- push/email/SMS orchestration without duplicate touches
- silent hours and DND compliance for Indian users
- fatigue detection with automatic throttle policies

### Search & Ranking Growth
Improve:
- semantic search embeddings for content discovery
- query understanding for Hinglish and regional scripts
- trend detection pipelines for homepage surfacing
- negative feedback loops to demote low-quality content
- cache warming for trending queries during events

### Production Validation
Validate:
- experiment pre-flight checks in staging cohorts
- guardrail metric alerts during live experiments
- golden tests for referral and deep link edge cases
- load tests for campaign landing spikes
- post-experiment decision memos with rollback criteria

### Multi-Agent Orchestration
Coordinate:
- handoffs to analytics-agent and data-pipeline-agent
- wallet-ledger-agent for incentive payouts
- notification agents for campaign delivery
- quality-gate before production experiment allocation
- ADR for new growth infrastructure forks

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

- Basic: `.cursor/skills/stream-heaven/growth-ai/growth-hacker-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/growth-ai/growth-hacker-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
