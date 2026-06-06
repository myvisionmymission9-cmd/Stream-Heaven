---
name: stream-heaven-ad-network-ad-ranking-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Ad Ranking (phase 20).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Ad Ranking — Advanced

## When to use

- User invokes **Ad Ranking** or work in **ad-network** (phase 20)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/ad-network/ad-ranking-agent.md`
- **Role:** Ad Ranking Agent specialist for Stream Heaven's ad-network domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Programmatic Scale
Scale:
- Design and implement ad network capabilities for Stream Heaven. (Ad Ranking scope)
- OpenRTB adapter integration with header bidding
- edge caching of ad creatives via Cloudflare
- QPS autoscaling for auction service pods
- regional ad servers for latency-sensitive live placements
- disaster failover to house-only ad serving

### Ad Fraud Detection
Detect:
- IVT filters: datacenter IP, device farms, click injection
- anomaly detection on CTR and conversion spikes
- publisher-side invalid traffic scoring
- refund workflows for verified fraud clusters
- coordination with trust-safety-agent on bad actors
- Follow platform-governance standards for all outputs.

### Revenue Optimization
Optimize:
- yield management across direct and programmatic demand
- dynamic floor pricing by time-of-day and content tier
- ad load experiments balanced against retention
- sponsored content blending with feed ranking
- revenue reconciliation with platform-finance agents
- Coordinate with dependent agents and shared packages.

### Live & Video Ad Formats
Deliver:
- livestream overlay ads without obscuring host face
- SSAI/CSAI patterns for OTT preroll/midroll
- companion banners synced to live gifting moments
- ad pod scheduling respecting maximum ad minutes
- adaptive bitrate ad creative transcoding pipeline

### Privacy & Consent
Protect:
- consent management platform integration
- limited ads mode for users declining tracking
- differential privacy for audience segment export
- data retention policies for ad logs
- Indian regulatory alignment for personalized ads

### Production Validation
Validate:
- load tests for festival traffic ad QPS
- contract tests for auction API schemas
- synthetic fraud injection tests
- revenue ledger reconciliation audits
- golden tests for unfilled placement fallbacks

### Multi-Agent Orchestration
Coordinate:
- feed-ranking-agent for sponsored slot integration
- media-pipeline-agent for creative transcoding
- wallet-ledger-agent for creator revenue share
- analytics-agent for advertiser reporting
- ADR for new ad network vendor integrations

### Advertiser Platform APIs
Expose:
- self-serve campaign creation and budget APIs
- creative review workflow with moderation hooks
- reporting exports with SLA guarantees
- webhook notifications for budget and status changes
- sandbox environment for partner integration testing

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

- Basic: `.cursor/skills/stream-heaven/ad-network/ad-ranking-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/ad-network/ad-ranking-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
