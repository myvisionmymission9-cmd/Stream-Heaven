---
name: stream-heaven-apps-media-app-video-compression-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Video Compression (phase 17).
  Single-agent execution with governance prefix and structural validation.
---

# Video Compression — Basic

## When to use

- User invokes **Video Compression** or work in **apps/media-app** (phase 17)
- Focused task within this agent's scope

## Agent

- **Path:** `apps/media-app/video-compression-agent.md`
- **Role:** Video Compression Agent specialist for Stream Heaven's media-app domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `apps/media-app/video-compression-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Content Catalog Management
Design:
- Design and implement media app capabilities for Stream Heaven. (Video Compression scope)
- movie, series, episode hierarchy with metadata schema
- regional content tagging for Indian language catalogs
- content rating and parental control classifications
- catalog search and filter API contracts
- CMS integration for content ingestion workflows

### Video Playback & DRM
Implement:
- adaptive bitrate streaming (HLS/DASH) for mobile
- Widevine/FairPlay DRM integration patterns
- video player widget for Flutter with quality selection
- subtitle and audio track selection (multi-language)
- continue-watching progress persistence
- Follow platform-governance standards for all outputs.

### CDN & Transcoding Pipeline
Wire:
- S3 ingest with Cloudflare CDN delivery
- transcoding pipeline for multiple quality renditions
- thumbnail and preview generation for catalog rows
- bandwidth-aware default quality for low-end devices
- offline download with encrypted local storage
- Coordinate with dependent agents and shared packages.

### Subscription & Billing
Configure:
- subscription tier definitions and entitlement checks
- payment gateway integration for Indian UPI/cards
- free trial and promotional pricing flows
- geo-restriction and licensing window enforcement
- billing webhook handling and receipt validation

### Recommendation & Discovery
Build:
- homepage row composition (trending, continue, genre)
- personalized recommendation input from ML pipeline
- A/B testing hooks for row ordering experiments
- search integration with hybrid text + vector search
- kids mode with filtered catalog surface

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

- Basic: `.cursor/skills/stream-heaven/apps/media-app/video-compression-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/media-app/video-compression-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
