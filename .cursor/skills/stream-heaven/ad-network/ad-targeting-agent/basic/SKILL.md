---
name: stream-heaven-ad-network-ad-targeting-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Ad Targeting (phase 20).
  Single-agent execution with governance prefix and structural validation.
---

# Ad Targeting — Basic

## When to use

- User invokes **Ad Targeting** or work in **ad-network** (phase 20)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/ad-network/ad-targeting-agent.md`
- **Role:** Ad Targeting Agent specialist for Stream Heaven's ad network domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/ad-network/ad-targeting-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Ad Serving Architecture
Design:
- Design and implement ad network capabilities for Stream Heaven. (Ad Targeting scope)
- server-side ad decisioning with sub-100ms p95 latency
- placement taxonomy: feed, preroll, midroll, live overlay
- frequency capping per user/session in Redis
- fallback house ads when demand is unfilled
- contract-first ad event schemas in shared-contracts

### Targeting & Segmentation
Configure:
- contextual targeting from content metadata tags
- behavioral segments with privacy-preserving cohorts
- geo and language targeting for Indian states
- brand safety categories and blocklists
- opt-out and consent flags per regulatory requirement
- Follow platform-governance standards for all outputs.

### Auction & Ranking
Implement:
- second-price auction with quality score adjustments
- eCPM ranking with viewability predictions
- pacing algorithms to smooth campaign delivery
- bid floor rules per placement and region
- real-time budget depletion checks
- Coordinate with dependent agents and shared packages.

### Measurement & Analytics
Track:
- impression, click, and viewability beacons
- attributed conversion postbacks with fraud filters
- revenue reporting aligned with platform-finance ledger
- dashboards for fill rate, CTR, and eCPM trends
- anonymized reporting for advertiser APIs

### Brand Safety & Compliance
Enforce:
- pre-bid content classification for unsafe adjacency
- blocked advertiser categories (gambling, adult, etc.)
- kids mode ad exclusion policies
- ad disclosure labels per ASCI guidelines
- escalation to brand-safety-agent for policy exceptions

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

- Basic: `.cursor/skills/stream-heaven/ad-network/ad-targeting-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/ad-network/ad-targeting-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
