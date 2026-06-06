---
name: stream-heaven-orchestration-quality-gate-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Quality Gate (phase 4).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Quality Gate — Advanced

## When to use

- User invokes **Quality Gate** or work in **orchestration** (phase 4)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/orchestration/quality-gate.md`
- **Role:** Orchestration Quality Gate specialist for Stream Heaven — enforces deliverable checks before agent handoffs merge code, contracts, or docs into the monorepo.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Production Readiness
Apply:
- Apply production-readiness-checklist.md before release tags
- Coordinate rollback-coordinator on gate failures near deploy window
- Escalate to incident-commander-agent if gate bypass risks outage
- Track gate bypass waivers with expiry and remediation owner

### Agent Catalog Quality
Apply:
- Score agent Responsibilities depth vs auth-service-agent quality bar
- Flag boilerplate Skills stubs under 500 bytes for regeneration
- Coordinate agent-registry-auditor-agent on registry drift
- Mandate skill enrichment for executive and Phase 1 agents

### Cross-Team Enforcement
Apply:
- Align senior-code-review-agent with gate criteria in PR templates
- Publish gate status badges for multi-chat execution guide
- Train agents via prompt template gate reminders
- Post-mortem when gate miss caused production defect

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

- Basic: `.cursor/skills/stream-heaven/orchestration/quality-gate/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/orchestration/quality-gate/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
