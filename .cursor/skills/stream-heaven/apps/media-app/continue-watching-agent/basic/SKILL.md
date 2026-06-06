---
name: stream-heaven-apps-media-app-continue-watching-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Continue Watching (phase 17).
  Single-agent execution with governance prefix and structural validation.
---

# Continue Watching — Basic

## When to use

- User invokes **Continue Watching** or work in **apps/media-app** (phase 17)
- Focused task within this agent's scope

## Agent

- **Path:** `apps/media-app/continue-watching-agent.md`
- **Role:** Continue Watching Agent specialist for Stream Heaven's media-app domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `apps/media-app/continue-watching-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Content Catalog Management
Design:
- Own Continue Watching media pipeline: ingest, transcode, CDN delivery, and playback in Media (OTT) app. (Continue Watching scope)
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
- Define contracts for VOD catalogs, entitlements, and adaptive streaming via Cloudflare and AWS S3.

### CDN & Transcoding Pipeline
Wire:
- S3 ingest with Cloudflare CDN delivery
- transcoding pipeline for multiple quality renditions
- thumbnail and preview generation for catalog rows
- bandwidth-aware default quality for low-end devices
- offline download with encrypted local storage
- Optimize transcoding cost and thumbnail reuse per cost-control-rules.md and scaling-playbook.md.

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

- Basic: `.cursor/skills/stream-heaven/apps/media-app/continue-watching-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/media-app/continue-watching-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
