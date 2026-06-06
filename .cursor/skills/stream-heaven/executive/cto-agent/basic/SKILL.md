---
name: stream-heaven-executive-cto-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Cto (phase 2).
  Single-agent execution with governance prefix and structural validation.
---

# Cto — Basic

## When to use

- User invokes **Cto** or work in **executive** (phase 2)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/executive/cto-agent.md`
- **Role:** Cto Agent specialist for Stream Heaven's executive domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/executive/cto-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Technical Strategy
Apply:
- Align four-app roadmap (Social, Livestream, Astro, OTT) with phased delivery gates
- Evaluate build-vs-buy for Agora/Zego, Firebase Auth, and CDN providers
- Define non-negotiable platform standards in platform-governance/
- Prioritize Indian market constraints: low-end Android, 2G/3G, regional languages

### Architecture Review
Apply:
- Review NestJS service boundaries before new microservices are approved
- Enforce contract-first changes in packages/shared-contracts/
- Challenge duplicate services — mandate reuse from services/ catalog
- Sign off ADR drafts when architecture forks from documented patterns

### Engineering Leadership
Apply:
- Set quality bars: validate-agents, golden tests, smoke tests per phase
- Balance velocity vs. tech debt with explicit phase exit criteria
- Coordinate chief-architect and platform-orchestrator on cross-cutting work
- Define hiring and tooling standards (Flutter, NestJS, Redis, Socket.IO)

### Security & Compliance
Apply:
- Mandate no secrets in repo — AWS Secrets Manager and env templates only
- Review auth, PII, and payment flows against security-rules.md
- Require rate limits, JWT rotation, and device trust on identity surfaces
- Escalate enterprise-security agents for DDoS, bot, and zero-trust hardening

### Cost & Scale Awareness
Apply:
- Model unit economics for live minutes, storage egress, and push volume
- Set Redis/Postgres sizing guardrails per cost-control-rules.md
- Prefer edge caching (Cloudflare) and adaptive bitrate for video
- Approve GPU/ML spend only with inference SLO and fallback paths

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

- Basic: `.cursor/skills/stream-heaven/executive/cto-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/executive/cto-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
