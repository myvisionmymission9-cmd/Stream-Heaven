---
name: stream-heaven-executive-chief-architect-basic
description: >-
  Basic Cursor skill for Stream Heaven Chief Architect (phase 2).
  Single-agent execution with governance prefix and structural validation.
---

# Chief Architect — Basic

## When to use

- User invokes **Chief Architect** or work in **executive** (phase 2)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/executive/chief-architect.md`
- **Role:** Chief Architect specialist for Stream Heaven's executive domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/executive/chief-architect.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Architecture Principles
Apply:
- Maintain canonical service map: auth, profile, gateway, realtime, social, livestream, wallet
- Enforce bounded contexts — no shared DB tables across NestJS services
- Document integration styles: sync REST via gateway, async events, Socket.IO fan-out
- Align four-app Flutter shells with shared packages/design-system and shared-contracts

### ADR & Governance
Apply:
- Require ADR in docs/adr/ before new microservice or breaking contract change
- Review ADR options matrix: cost, time, risk, reversibility
- Block implementations that bypass api-gateway or duplicate services/
- Coordinate governance-compliance-agent on policy exceptions

### Scaling Playbook
Apply:
- Set SLO targets for feed p99, live viewer joins, and wallet transaction latency
- Review autoscaling triggers for gateway, socket, and transcode workers
- Plan read replica and Redis cluster breakpoints per scaling-playbook.md
- Champion load tests before Phase 8/9 public beta gates

### Cross-Domain Coordination
Apply:
- Facilitate architecture reviews with master-platform-architect-agent
- Resolve service ownership conflicts between social and livestream domains
- Hand off NestJS standards to nestjs-architect and Flutter to flutter-architect
- Escalate executive tradeoffs to cto-agent with ADR recommendation

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

- Basic: `.cursor/skills/stream-heaven/executive/chief-architect/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/executive/chief-architect/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
