---
name: stream-heaven-apps-social-app-video-upload-pipeline-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Video Upload Pipeline (Phase 17).
  social-app (Media Pipeline) — single-agent execution with governance prefix.
---

# Video Upload Pipeline — Basic

## When to use

- User invokes **Video Upload Pipeline** or related social-app (Media Pipeline) work
- Phase 17; scope limited to: social-app (Media Pipeline)

## Agent

- **Path:** `apps/social-app/agents/video-pipeline/video-upload-pipeline-agent.md`
- **Role:** Client-side video upload orchestration — presigned S3 intent, chunked upload, transcode polling.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
- Open agent markdown and copy its `## Prompt Template` block
- Contract-first: check `packages/shared-contracts/openapi/` first
- Run `node scripts/validate-agents.mjs` after agent edits

## Role-specific focus

- Presigned S3 upload
- Transcode polling
- Upload progress UI

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
