---
name: stream-heaven-apps-social-app-creator-post-composer-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Creator Post Composer (Phase 8).
  social-app (Creator Post) — single-agent execution with governance prefix.
---

# Creator Post Composer — Basic

## When to use

- User invokes **Creator Post Composer** or related social-app (Creator Post) work
- Phase 8; scope limited to: social-app (Creator Post)

## Agent

- **Path:** `apps/social-app/agents/creator/creator-post-composer-agent.md`
- **Role:** Create Post entry flow — text/image/video/audio picker, caption editor, draft sync, upload stub.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
- Open agent markdown and copy its `## Prompt Template` block
- Contract-first: check `packages/shared-contracts/openapi/` first
- Run `node scripts/validate-agents.mjs` after agent edits

## Role-specific focus

- Post composer UI
- Media picker integration
- Upload intent stub

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
