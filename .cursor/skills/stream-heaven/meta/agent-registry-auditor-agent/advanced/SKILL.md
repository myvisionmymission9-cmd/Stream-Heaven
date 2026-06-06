---
name: stream-heaven-meta-agent-registry-auditor-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Agent Registry Auditor (phase Meta (ongoing)).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Agent Registry Auditor — Advanced

## When to use

- User invokes **Agent Registry Auditor** or work in **meta** (phase Meta (ongoing))
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/meta/agent-registry-auditor-agent.md`
- **Role:** Meta-agent that keeps `ai-agents/AGENT-REGISTRY.md` synchronized with filesystem agent definitions, naming conventions, and phase/domain taxonomy.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Catalog Health
Apply:
- Publish top 20 agents needing skill enrichment
- Track manifest drift in agent-skills-manifest.json
- Propose registry schema ADR for new domains
- Coordinate agent-coverage-analyst-agent on gap analysis

### CI Integration
Apply:
- GitHub Actions gate on validate-agents for agent PRs
- Pre-commit hook recommendation via create-hook skill
- Bulk update playbooks for agent-skill-validator-agent
- Escalate catalog breakage to platform-orchestrator

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

- Basic: `.cursor/skills/stream-heaven/meta/agent-registry-auditor-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/meta/agent-registry-auditor-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
