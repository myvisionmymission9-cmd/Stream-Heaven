---
name: stream-heaven-apps-astro-app-consultation-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Consultation (phase 16).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Consultation — Advanced

## When to use

- User invokes **Consultation** or work in **apps/astro-app** (phase 16)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `apps/astro-app/consultation-agent.md`
- **Role:** Consultation Agent specialist for Stream Heaven's astro-app domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Creator Economy
Apply:
- Astrologer payout split via wallet-agent and creator-payout-agent
- Rating and review after session with review-rating-agent
- Ranking signals to astrologer-ranking-agent
- Promo credits for first consultation via growth campaigns

### Privacy
Apply:
- Birth chart data encrypted at rest; minimal JWT claims
- No chart PII in logs or analytics events
- GDPR export/delete hooks on consultation history
- Sensitive-conversation-agent escalation on self-harm signals

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

- Basic: `.cursor/skills/stream-heaven/apps/astro-app/consultation-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/astro-app/consultation-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
