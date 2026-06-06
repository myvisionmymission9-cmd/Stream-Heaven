---
name: stream-heaven-phase-1-phase-1-remediation-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Phase 1 Remediation (phase 1).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Phase 1 Remediation — Advanced

## When to use

- User invokes **Phase 1 Remediation** or work in **phase-1** (phase 1)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/phase-1/phase-1-remediation-agent.md`
- **Role:** Fully autonomous Phase 1 remediation specialist — diagnose and fix audit/CI/local failures across auth-service, user-service, api-gateway, and realtime-gateway without user involvement unless Docker Desktop is down.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Escalation
Apply:
- Architectural blockers → phase-1-autonomous-completion-agent
- NestJS pattern fixes → nestjs-architect
- Contract mismatches → openapi-contract-validation-agent
- Repeated failures → cto-agent with incident summary

### Diagnostic Playbook
Apply:
- Classify failures: infra (Docker/ports), compile, migration, contract drift, smoke timeout
- Fix smallest root cause first — avoid unrelated refactors during remediation
- Re-run setup-phase1.ps1 and integration smoke after each fix batch
- Document fix summary in PR body for senior-code-review-agent

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

- Basic: `.cursor/skills/stream-heaven/phase-1/phase-1-remediation-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/phase-1/phase-1-remediation-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
