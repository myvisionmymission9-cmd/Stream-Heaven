---
name: stream-heaven-governance-governance-compliance-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Governance Compliance (phase 1 (governance)).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Governance Compliance — Advanced

## When to use

- User invokes **Governance Compliance** or work in **governance** (phase 1 (governance))
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/governance/governance-compliance-agent.md`
- **Role:** Phase 1 governance specialist — enforces the 22 `platform-governance/` documents before any implementation, contract change, or agent invocation across Stream Heaven.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Audit & Remediation
Apply:
- Quarterly audit: services/ deduplication, packages/ dependency hygiene
- Secrets scan and .env.example completeness review
- Phase exit audit with phase-1-autonomous-completion-agent evidence
- Remediation tickets with owner agent and deadline

### Regulatory Alignment
Apply:
- India IT Rules and store policy checkpoints for UGC and payments
- Astro disclaimer and non-medical advice compliance with astro-disclaimer-compliance
- Wallet KYC/AML escalation paths to tax-compliance-agent
- Coordinate chief-safety-officer on child safety policies

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

- Basic: `.cursor/skills/stream-heaven/governance/governance-compliance-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/governance/governance-compliance-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
