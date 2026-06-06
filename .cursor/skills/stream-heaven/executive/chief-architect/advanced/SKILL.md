---
name: stream-heaven-executive-chief-architect-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Chief Architect (phase 2).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Chief Architect — Advanced

## When to use

- User invokes **Chief Architect** or work in **executive** (phase 2)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/executive/chief-architect.md`
- **Role:** Chief Architect specialist for Stream Heaven's executive domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Platform Evolution
Apply:
- Phase gate architecture: Phase 1 foundation before feature microservices
- Plan event bus evolution from Redis pub/sub to Kafka without big-bang migration
- Define strangler patterns for monolith extraction when justified by ADR
- Coordinate decision-engine on conflicting agent architecture proposals

### Data Architecture
Apply:
- Approve Postgres schema ownership per service with migration-manager discipline
- Govern Redis usage: sessions, cache, rate limits, Socket.IO adapter — separate keyspaces
- Plan search index and analytics warehouse boundaries with data-warehouse-agent
- PII data flow maps for auth, profile, Astro birth data, and wallet KYC

### Realtime & Media Architecture
Apply:
- Signaling vs media transport split: Socket.IO vs Agora/Zego
- PK battle and gift event prioritization under load
- CDN and transcoding pipeline for OTT and live replay
- Coordinate realtime-systems-agent on platform-wide realtime SLOs

### Security Architecture
Apply:
- Threat model wallet withdraw, creator payout, and admin impersonation
- Zero-trust internal service auth patterns
- Coordinate enterprise-security agents before payment GA
- Mandate secrets rotation and SBOM in release checklist

### Production Validation
Apply:
- Architecture review gate in quality-gate for new services/
- Chaos game day sign-off before festival traffic events
- Post-incident architecture action items tracked in ADRs
- Investor-ready diagrams synced with cto-agent monthly

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

- Basic: `.cursor/skills/stream-heaven/executive/chief-architect/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/executive/chief-architect/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
