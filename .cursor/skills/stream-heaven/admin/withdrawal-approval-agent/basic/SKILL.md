---
name: stream-heaven-admin-withdrawal-approval-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Withdrawal Approval (Phase 20).
  admin — single-agent execution with governance prefix.
---

# Withdrawal Approval — Basic

## When to use

- User invokes **Withdrawal Approval** or related admin work
- Phase 20; scope limited to: admin

## Agent

- **Path:** `ai-agents/admin/withdrawal-approval-agent.md`
- **Role:** Creator withdrawal review — pending queue, tax compliance check, approve/reject with payout rail.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
- Open agent markdown and copy its `## Prompt Template` block
- Contract-first: check `packages/shared-contracts/openapi/` first
- Run `node scripts/validate-agents.mjs` after agent edits

## Role-specific focus

- Withdrawal state machine
- Tax compliance calc
- Payout rail stub

## Key paths

| Resource | Path |
|----------|------|
| Architecture | `docs/GLOBAL-CREATOR-ECOSYSTEM-ARCHITECTURE.md` |
| Roadmap | `docs/GLOBAL-CREATOR-ECOSYSTEM-ROADMAP.md` |
| OpenAPI | `packages/shared-contracts/openapi/` |
| Validate agents | `node scripts/validate-agents.mjs` |

## Validation

```powershell
node scripts/validate-agents.mjs
flutter analyze apps/mobile
```
