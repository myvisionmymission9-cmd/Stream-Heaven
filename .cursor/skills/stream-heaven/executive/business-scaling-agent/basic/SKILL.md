---
name: stream-heaven-executive-business-scaling-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Business Scaling (phase 2).
  Single-agent execution with governance prefix and structural validation.
---

# Business Scaling — Basic

## When to use

- User invokes **Business Scaling** or work in **executive** (phase 2)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/executive/business-scaling-agent.md`
- **Role:** Business Scaling Agent specialist for Stream Heaven's executive domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/executive/business-scaling-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Platform Architecture Overview
Understand:
- Provide executive guidance for Business Scaling across Social, Livestream, Astro, and Media strategic priorities. (Business Scaling scope)
- four-app ecosystem: Social, Livestream, Astro, Media (OTT)
- Phase-gated delivery: auth → contracts → realtime → profiles
- monorepo layout: apps/, services/, packages/, ai-agents/
- contract-first API design in packages/shared-contracts/
- shared governance in platform-governance/

### Technology Stack Mastery
Know:
- Flutter (Riverpod, GoRouter) for mobile clients
- NestJS microservices with PostgreSQL and Redis
- Socket.IO for realtime; Agora/Zego for live streaming
- AWS S3 + Cloudflare CDN for media delivery
- Firebase Auth for identity; AWS Secrets Manager for secrets
- Review phase gates, resource allocation, and OKR alignment before major platform investments.

### Engineering Principles
Apply:
- no secrets in code — env vars and Secrets Manager only
- no duplicate services — check services/ before creating
- ADR required for architecture forks (docs/adr/)
- optimize for Indian market: low-end Android, poor connectivity
- smallest correct diff; phase-by-phase delivery
- Arbitrate cross-functional tradeoffs: velocity, cost, safety, and Indian market reach.

### Ecosystem Coordination
Coordinate:
- agent registry (ai-agents/AGENT-REGISTRY.md) for task routing
- orchestration via task-router and quality-gate agents
- cross-app identity and wallet shared services
- cost control rules for streaming and CDN spend
- i18n for 9+ Indian languages across all apps

### Governance & Compliance
Follow:
- MASTER-AI-OPERATING-SYSTEM.md as primary context doc
- platform-governance/security-rules.md for all decisions
- feature-approval-rules.md for new capability gates
- production-readiness-checklist before launch
- validate-agents.mjs after agent catalog changes

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

- Basic: `.cursor/skills/stream-heaven/executive/business-scaling-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/executive/business-scaling-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
