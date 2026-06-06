---
name: stream-heaven-apps-media-app-ott-streaming-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Ott Streaming (phase 17).
  Single-agent execution with governance prefix and structural validation.
---

# Ott Streaming — Basic

## When to use

- User invokes **Ott Streaming** or work in **apps/media-app** (phase 17)
- Focused task within this agent's scope

## Agent

- **Path:** `apps/media-app/ott-streaming-agent.md`
- **Role:** Ott Streaming Agent specialist for Stream Heaven's media-app domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `apps/media-app/ott-streaming-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Playback
Apply:
- HLS/DASH player in Flutter with adaptive bitrate ladder
- Continue watching progress events to watch-history-agent
- Offline download quota per device storage tier
- Low-data mode: cap resolution and manual play default

### Entitlement
Apply:
- /v1/media/entitlement/check before stream start
- Subscription tier and rental window validation
- Geo restriction hooks with media-regional-content agent
- Parental PIN gate for age-rated content

### CDN & Origin
Apply:
- Cloudflare signed URL generation with short TTL
- S3 origin failover documented in runbook
- Thumbnail and poster CDN cache policies
- Coordinate media-cdn-optimizer on cache hit targets

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| App root | `apps/media-app/` |
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

- Basic: `.cursor/skills/stream-heaven/apps/media-app/ott-streaming-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/media-app/ott-streaming-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
