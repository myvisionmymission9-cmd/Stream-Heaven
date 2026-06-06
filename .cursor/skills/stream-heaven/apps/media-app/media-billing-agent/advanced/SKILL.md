---
name: stream-heaven-apps-media-app-media-billing-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Media Billing (phase 17).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Media Billing — Advanced

## When to use

- User invokes **Media Billing** or work in **apps/media-app** (phase 17)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `apps/media-app/agents/media-billing-agent.md`
- **Role:** Media Billing Agent specialist for Stream Heaven's media app domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Financial Integrity at Scale
Scale:
- Design and implement media app capabilities for Stream Heaven. (Media Billing scope)
- sharded ledger partitions by user ID ranges
- saga patterns for cross-service payment flows
- exactly-once settlement with outbox pattern
- read models for real-time balance queries
- month-end close automation with finance agents

### Subscription & IAP
Manage:
- Google Play and App Store receipt validation
- subscription grace periods and dunning flows
- proration rules for plan upgrades
- family sharing and regional pricing tiers
- entitlement sync across four apps
- Follow platform-governance standards for all outputs.

### Cross-App Wallet Federation
Federate:
- unified wallet balance across Social, Livestream, Astro, OTT
- cross-app transfer rules and fee policies
- promotional credit scopes per app surface
- identity-platform session binding for wallet ops
- deep link flows for low-balance top-up
- Coordinate with dependent agents and shared packages.

### Compliance & Tax
Comply:
- GST invoicing for digital services in India
- RBI prepaid instrument guidelines alignment
- PCI-DSS scope minimization via tokenization
- AML monitoring thresholds and SAR workflows
- data localization for financial records

### Treasury & Cash Management
Operate:
- float monitoring across payment gateways
- FX handling for international creator payouts
- reserve accounting for pending withdrawals
- treasury reporting dashboards
- vendor invoice matching automation

### Production Validation
Validate:
- property-based tests for ledger invariants
- chaos tests for webhook delivery failures
- reconciliation diff zero-tolerance CI gates
- load tests for festival coin purchase spikes
- golden tests for refund and chargeback edge cases

### Multi-Agent Orchestration
Coordinate:
- gift-economy-agent for live tipping flows
- creator-economy-agent for revenue share rules
- platform-finance-agent for month-end reporting
- auth-service-agent for step-up authentication on withdraw
- ADR for new payment provider onboarding

### Incident Response
Respond:
- payment outage comms templates
- manual ledger adjustment approval workflow
- freeze switches for suspected fraud rings
- post-incident financial impact assessment
- regulatory notification timelines if required

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| App root | `apps/media-app/` |
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

- Basic: `.cursor/skills/stream-heaven/apps/media-app/media-billing-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/media-app/media-billing-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
