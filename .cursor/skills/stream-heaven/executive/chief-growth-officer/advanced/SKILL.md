---
name: stream-heaven-executive-chief-growth-officer-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Chief Growth Officer (phase 2).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Chief Growth Officer — Advanced

## When to use

- User invokes **Chief Growth Officer** or work in **executive** (phase 2)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/executive/chief-growth-officer.md`
- **Role:** Chief Growth Officer specialist for Stream Heaven's executive domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Viral Loop Design
Apply:
- WhatsApp share incentives and share-deeplink-agent integration
- Live PK battle and gift moments as shareable clips to Social
- Referral rewards funded via wallet-agent promo credits
- Measure K-factor per loop with analytics-agent

### Cross-App Growth
Apply:
- Unified wallet and identity for cross-app promotion-agent
- Livestream viewer → Social follow conversion hooks
- Astro consultation upsell from Social creator profiles
- OTT trial from Livestream highlight reels

### Experimentation Platform
Apply:
- Feature flags for growth tests via decision-engine
- Guardrail metrics: crash rate, OTP cost, moderation queue depth
- Coordinate ab-testing-agent on experiment design and power analysis
- Document failed experiments for institutional learning

### Compliance & Trust
Apply:
- Store policy compliance for incentive campaigns
- Coordinate governance-compliance-agent on promotional copy
- Avoid dark patterns flagged by trust-safety-agent
- Regional telecom and SMS regulations for OTP growth hacks

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

- Basic: `.cursor/skills/stream-heaven/executive/chief-growth-officer/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/executive/chief-growth-officer/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
