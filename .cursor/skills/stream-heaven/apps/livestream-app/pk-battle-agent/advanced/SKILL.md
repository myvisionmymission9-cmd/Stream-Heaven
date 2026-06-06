---
name: stream-heaven-apps-livestream-app-pk-battle-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Pk Battle (phase 9).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Pk Battle — Advanced

## When to use

- User invokes **Pk Battle** or work in **apps/livestream-app** (phase 9)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `apps/livestream-app/agents/multi-guest/pk-battle-agent.md`
- **Role:** Pk Battle Agent specialist for Stream Heaven's multi guest domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Monetization Integration
Apply:
- PK wager holds via wallet-agent saga
- Gift multiplier windows during final 30 seconds
- Anti-cheat: validate gift events server-side only
- Revenue share to creators per creator-economy rules

### Scale & UX
Apply:
- Dual-room Agora layout compositor handoff
- Low-end Android PK UI: minimal animations, clear score bar
- Load test finals with livestream-scaling-agent
- Moderation: report PK harassment in real time
- PK timer sync via Socket.IO room events with server-authoritative clock

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| App root | `apps/livestream-app/` |
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

- Basic: `.cursor/skills/stream-heaven/apps/livestream-app/pk-battle-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/livestream-app/pk-battle-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
