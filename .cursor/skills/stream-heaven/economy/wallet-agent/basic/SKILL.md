---
name: stream-heaven-economy-wallet-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Wallet (phase 13).
  Single-agent execution with governance prefix and structural validation.
---

# Wallet — Basic

## When to use

- User invokes **Wallet** or work in **economy** (phase 13)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/economy/wallet-agent.md`
- **Role:** Wallet Agent specialist for Stream Heaven's economy domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/economy/wallet-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Ledger Design
Apply:
- Double-entry ledger: every debit has matching credit row
- Idempotency-Key header on all POST wallet mutations
- Balance snapshot with optimistic locking on user wallet row
- Immutable audit log table append-only

### Contract & API
Apply:
- OpenAPI wallet/v1: balance, credit, debit, hold, release, transfer
- Webhook endpoints for Razorpay/Stripe with signature verification
- No PAN/card data in Postgres — tokenize via payment provider
- Flutter wallet UI consumes generated contract types

### Fraud & Limits
Apply:
- Velocity limits per user, device, and IP hash
- Hold funds during dispute with refund-policy-agent rules
- Reconciliation nightly job vs payment provider statements
- Coordinate fraud-detection-agent on anomaly scoring

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
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/economy/wallet-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/economy/wallet-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
