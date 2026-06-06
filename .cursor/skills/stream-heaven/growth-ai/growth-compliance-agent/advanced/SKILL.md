---
name: stream-heaven-growth-ai-growth-compliance-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Growth Compliance (phase 15).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Growth Compliance — Advanced

## When to use

- User invokes **Growth Compliance** or work in **growth-ai** (phase 15)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/growth-ai/growth-compliance-agent.md`
- **Role:** Growth Compliance Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Ecosystem Policy Design
Design:
- Design and implement growth ai capabilities for Stream Heaven. (Growth Compliance scope)
- cross-app policy harmonization (safety, payments, AI)
- cost-control-rules.md enforcement automation
- ai-usage-rules.md for LLM feature governance
- data retention and localization policies
- vendor risk assessment frameworks

### Compliance Automation
Automate:
- CI gates for governance doc references in PRs
- automated boilerplate agent detection
- policy-as-code for security and rate limits
- contract drift scanners in nightly jobs
- audit trail exports for external reviews
- Follow platform-governance standards for all outputs.

### Community Governance
Moderate:
- community guidelines across apps and games
- creator council feedback incorporation
- transparency reporting standards
- appeals process governance
- regional legal variant tracking
- Coordinate with dependent agents and shared packages.

### Multi-Chat & AI Operations
Govern:
- Cursor agent scope boundaries and handoffs
- prompt template quality standards
- agent-skill-validator quality thresholds
- multi-chat execution guide compliance
- AI cost and safety budgets per feature

### Risk Management
Assess:
- risk registers for phase transitions
- third-party dependency concentration risks
- regulatory change monitoring (India digital rules)
- business continuity planning requirements
- insurance and liability documentation hooks

### Production Validation
Validate:
- quarterly governance audit playbooks
- sample-based PR compliance reviews
- post-incident governance gap analysis
- training completion tracking for engineering
- golden tests for governance agent prompts

### Multi-Agent Orchestration
Coordinate:
- governance-compliance-agent as enforcement hub
- quality-gate before production releases
- platform-orchestrator for policy rollouts
- adr-writer-agent for documentation
- cto-agent sign-off on policy exceptions

### International Expansion Governance
Prepare:
- locale-specific compliance matrices
- payment and tax rule variants by country
- content legality maps per jurisdiction
- data residency decision trees
- partnership legal review checkpoints

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

- Basic: `.cursor/skills/stream-heaven/growth-ai/growth-compliance-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/growth-ai/growth-compliance-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
