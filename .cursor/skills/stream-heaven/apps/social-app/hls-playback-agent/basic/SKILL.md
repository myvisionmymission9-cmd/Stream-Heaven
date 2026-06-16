---
name: stream-heaven-apps-social-app-hls-playback-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven HLS Playback (Phase 17).
  social-app (Media Pipeline) — single-agent execution with governance prefix.
---

# HLS Playback — Basic

## When to use

- User invokes **HLS Playback** or related social-app (Media Pipeline) work
- Phase 17; scope limited to: social-app (Media Pipeline)

## Agent

- **Path:** `apps/social-app/agents/video-pipeline/hls-playback-agent.md`
- **Role:** HLS video player integration — adaptive bitrate, thumbnail first-frame, offline caching hints.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
- Open agent markdown and copy its `## Prompt Template` block
- Contract-first: check `packages/shared-contracts/openapi/` first
- Run `node scripts/validate-agents.mjs` after agent edits

## Role-specific focus

- HLS adaptive playback
- Memory-efficient player
- Watch analytics events

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
