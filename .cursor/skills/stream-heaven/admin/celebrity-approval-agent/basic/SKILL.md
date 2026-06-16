---
name: stream-heaven-admin-celebrity-approval-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Celebrity Approval (Phase 20).
  admin — single-agent execution with governance prefix.
---

# Celebrity Approval — Basic

## When to use

- User invokes **Celebrity Approval** or related admin work
- Phase 20; scope limited to: admin

## Agent

- **Path:** `ai-agents/admin/celebrity-approval-agent.md`
- **Role:** Celebrity verification review — evidence package, admin decision, APPROVED/REJECTED with audit.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
- Open agent markdown and copy its `## Prompt Template` block
- Contract-first: check `packages/shared-contracts/openapi/` first
- Run `node scripts/validate-agents.mjs` after agent edits

## Role-specific focus

- Celebrity verification flow
- Admin approval workflow
- Feed boost policy

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
