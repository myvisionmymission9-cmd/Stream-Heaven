---
name: stream-heaven-safety-trust-safety-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Trust Safety (phase 20).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Trust Safety — Advanced

## When to use

- User invokes **Trust Safety** or work in **safety** (phase 20)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/safety/trust-safety-agent.md`
- **Role:** Trust & safety program enforcement.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Threat Response
Apply:
- CSAM zero-tolerance pipeline with csam-detection-agent
- Deepfake detection on livestream frames and uploads
- Coordinated inauthentic behavior detection
- Law enforcement escalation playbook with chief-safety-officer

### Trust Score
Apply:
- Host and creator reputation metrics
- High-risk action friction: withdraw, go-live, mass DM
- Coordinate trust-score-agent on feature gating
- Transparency reports for executive agents quarterly

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

- Basic: `.cursor/skills/stream-heaven/safety/trust-safety-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/safety/trust-safety-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
