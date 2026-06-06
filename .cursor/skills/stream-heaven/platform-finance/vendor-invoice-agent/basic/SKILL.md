---
name: stream-heaven-platform-finance-vendor-invoice-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Vendor Invoice (phase 20).
  Single-agent execution with governance prefix and structural validation.
---

# Vendor Invoice — Basic

## When to use

- User invokes **Vendor Invoice** or work in **platform-finance** (phase 20)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/platform-finance/vendor-invoice-agent.md`
- **Role:** Vendor Invoice Agent specialist for Stream Heaven's platform finance domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/platform-finance/vendor-invoice-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Wallet Ledger Design
Design:
- Own Vendor Invoice deliverables in platform-finance domain for Stream Heaven Phase 20. (Vendor Invoice scope)
- double-entry ledger with immutable transaction log
- idempotent debit/credit APIs with client request IDs
- balance snapshots vs event-sourced reconstruction
- multi-currency coin vs fiat wallet separation
- contract schemas in packages/shared-contracts/wallet/

### Payment Gateway Integration
Integrate:
- Razorpay/Stripe/PayU abstraction with env-based provider selection
- UPI, cards, and netbanking flows for Indian users
- webhook signature verification and replay protection
- payment status state machine: initiated → captured → settled
- no secrets in repo — gateway keys via Secrets Manager
- Define or update packages/shared-contracts schemas before NestJS, Flutter, or Socket.IO implementation.

### Payouts & Creator Earnings
Process:
- KYC-gated withdrawal thresholds and cooling periods
- TDS and tax withholding hooks for Indian compliance
- payout batch scheduling with failure retry queues
- creator earnings statements and dispute windows
- reconciliation with platform-finance reporting
- Apply platform-governance standards for API, security, database, deployment, and testing surfaces.

### Fraud & Risk Controls
Enforce:
- velocity limits on top-ups and withdrawals
- device fingerprint and IP risk scoring
- refund and chargeback workflows
- suspicious gifting pattern detection
- escalation to fraud-detection-agent

### Reconciliation & Reporting
Report:
- daily gateway vs ledger reconciliation jobs
- revenue share splits for gifts, ads, and subscriptions
- audit trails for finance and compliance review
- anomaly alerts on balance drift
- export formats for platform-finance agents

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

- Basic: `.cursor/skills/stream-heaven/platform-finance/vendor-invoice-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/platform-finance/vendor-invoice-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
