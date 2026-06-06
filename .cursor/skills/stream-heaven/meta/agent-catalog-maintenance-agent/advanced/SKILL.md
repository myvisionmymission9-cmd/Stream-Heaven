---
name: stream-heaven-meta-agent-catalog-maintenance-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Agent Catalog Maintenance (phase Meta (ongoing)).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Agent Catalog Maintenance — Advanced

## When to use

- User invokes **Agent Catalog Maintenance** or work in **meta** (phase Meta (ongoing))
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/meta/agent-catalog-maintenance-agent.md`
- **Role:** Meta-agent that maintains the Stream Heaven agent catalog — skills, responsibilities, validation scripts, manifest sync, and scoped git commits for catalog-only changes.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Manifest & Registry Sync
Apply:
- Regenerate agent-skill-manifest.mjs with generate-agent-skills.mjs --manifest --force
- Add new meta agents to AGENT-REGISTRY.md Phase 0 section
- Coordinate agent-registry-auditor-agent on orphan and ghost entries
- Update agent-skill-enrichments.mjs when adding golden-batch competency blocks

### Priority Agent Hand-Authoring
Apply:
- Enrich executive, Phase 1, and cross-app agents beyond generator defaults
- Add domain competency sections: 3+ titled blocks with actionable bullets
- Cross-reference quality bar: teen-patti-agent, auth-service-agent
- Run test-golden-agents.mjs after prompt template changes

### CI Integration
Apply:
- Ensure .github/workflows/phase1-ci.yml runs validate-agents on agent PRs
- Document validation commands in skill Key paths tables
- Block catalog merges when validate-all-agent-skills exits non-zero
- Escalate repeated validation failures to agent-skill-validator-agent

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

- Basic: `.cursor/skills/stream-heaven/meta/agent-catalog-maintenance-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/meta/agent-catalog-maintenance-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
