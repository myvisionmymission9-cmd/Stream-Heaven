---
name: stream-heaven-admin-admin-panel-bff-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Admin Panel BFF (Phase 20).
  admin — single-agent execution with governance prefix.
---

# Admin Panel BFF — Basic

## When to use

- User invokes **Admin Panel BFF** or related admin work
- Phase 20; scope limited to: admin

## Agent

- **Path:** `ai-agents/admin/admin-panel-bff-agent.md`
- **Role:** Admin backend-for-frontend — role-gated read models for ops console (celebrity, withdrawals, reports).

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
- Open agent markdown and copy its `## Prompt Template` block
- Contract-first: check `packages/shared-contracts/openapi/` first
- Run `node scripts/validate-agents.mjs` after agent edits

## Role-specific focus

- Admin BFF design
- RBAC guards
- Audit log spec

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
