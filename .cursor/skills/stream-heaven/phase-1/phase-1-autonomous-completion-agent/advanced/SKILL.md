---
name: stream-heaven-phase-1-phase-1-autonomous-completion-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Phase 1 Autonomous Completion (phase 1).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Phase 1 Autonomous Completion — Advanced

## When to use

- User invokes **Phase 1 Autonomous Completion** or work in **phase-1** (phase 1)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/phase-1/phase-1-autonomous-completion-agent.md`
- **Role:** Fully autonomous Phase 1 completion specialist — finish ALL remaining Phase 1 runtime, code-quality, and documentation tasks without user involvement unless Docker Desktop engine is down.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Autonomous Validation
Apply:
- Retry flaky smoke up to 3x with structured failure classification
- Parallel agent validation in CI alongside integration smoke
- Produce executive summary for cto-agent and platform-orchestrator
- Handoff checklist for phase-2a-autonomous-bootstrap-agent

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| Shared contracts | `packages/shared-contracts/` |
| Validate agents | `node scripts/validate-agents.mjs` |
| Validate skills | `node scripts/validate-agent-skills.mjs` |
| Deep skill check | `node scripts/validate-all-agent-skills.mjs` |
| Phase 1 setup | `scripts/setup-phase1.ps1` |

## Validation

```powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
node scripts/validate-all-agent-skills.mjs
node scripts/test-golden-agents.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/phase-1/phase-1-autonomous-completion-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/phase-1/phase-1-autonomous-completion-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
