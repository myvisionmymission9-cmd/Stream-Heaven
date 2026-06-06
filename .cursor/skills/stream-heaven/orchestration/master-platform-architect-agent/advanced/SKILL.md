---
name: stream-heaven-orchestration-master-platform-architect-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Master Platform Architect (phase 4).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Master Platform Architect — Advanced

## When to use

- User invokes **Master Platform Architect** or work in **orchestration** (phase 4)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/orchestration/master-platform-architect-agent.md`
- **Role:** Master Platform Architect Agent specialist for Stream Heaven's orchestration domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Multi-App Orchestration
Apply:
- Shared identity and wallet across Social, Livestream, Astro, Media
- Cross-app notification and deep link routing standards
- Feature module boundaries in Flutter monorepo
- Task-router escalation for ambiguous cross-app ownership

### Scale & Reliability
Apply:
- Hot path identification: feed scroll, live join, wallet debit, OTP verify
- Sharding and read replica triggers per postgres-architect
- Realtime fan-out limits per realtime-systems-agent
- Incident architecture actions via rollback-coordinator

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

- Basic: `.cursor/skills/stream-heaven/orchestration/master-platform-architect-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/orchestration/master-platform-architect-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
