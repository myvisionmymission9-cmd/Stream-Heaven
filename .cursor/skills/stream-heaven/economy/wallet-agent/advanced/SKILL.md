---
name: stream-heaven-economy-wallet-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Wallet (phase 13).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Wallet — Advanced

## When to use

- User invokes **Wallet** or work in **economy** (phase 13)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/economy/wallet-agent.md`
- **Role:** Wallet Agent specialist for Stream Heaven's economy domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Cross-App Economy
Apply:
- Unified coin balance across Social gifts, Livestream tips, Astro consults
- Saga pattern: gift send → wallet debit → creator credit → rollback on fail
- Cross-app-wallet-sync event schema
- ADR before splitting wallet into regional shards

### Compliance
Apply:
- KYC gates for withdraw per identity-verification-agent
- Tax reporting hooks with tax-compliance-agent
- PCI scope minimization — no card storage in Stream Heaven DB
- Governance-compliance-agent sign-off before public wallet GA

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

- Basic: `.cursor/skills/stream-heaven/economy/wallet-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/economy/wallet-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
