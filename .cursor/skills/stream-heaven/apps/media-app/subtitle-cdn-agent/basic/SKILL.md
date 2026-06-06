---
name: stream-heaven-apps-media-app-subtitle-cdn-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Subtitle Cdn (phase 17).
  Single-agent execution with governance prefix and structural validation.
---

# Subtitle Cdn — Basic

## When to use

- User invokes **Subtitle Cdn** or work in **apps/media-app** (phase 17)
- Focused task within this agent's scope

## Agent

- **Path:** `apps/media-app/agents/subtitle-cdn-agent.md`
- **Role:** Subtitle Cdn Agent specialist for Stream Heaven's media app domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `apps/media-app/agents/subtitle-cdn-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Upload & Ingest Pipeline
Build:
- Own Subtitle Cdn media pipeline: ingest, transcode, CDN delivery, and playback in Media (OTT) app. (Subtitle Cdn scope)
- S3 multipart upload with presigned URL contracts
- client-side compression before upload on mobile
- virus scan and MIME validation on ingest
- metadata extraction (duration, resolution, codec)
- retry and resume for flaky network uploads

### Transcoding & Packaging
Configure:
- HLS/DASH ladder generation for adaptive bitrate
- per-title encoding optimization where available
- thumbnail and preview sprite generation
- audio-only fallback renditions
- job queue prioritization by content tier
- Define contracts for VOD catalogs, entitlements, and adaptive streaming via Cloudflare and AWS S3.

### CDN & Delivery
Route:
- Cloudflare CDN cache rules for segments and manifests
- signed URL TTL policies for premium content
- regional edge selection for Indian ISPs
- cache invalidation on content updates
- egress cost monitoring per platform-finance rules
- Optimize transcoding cost and thumbnail reuse per cost-control-rules.md and scaling-playbook.md.

### Quality Control
Inspect:
- automated QC checks for black frames and silence
- loudness normalization standards
- caption and subtitle track validation
- 4K/HDR optional tiers with device capability gating
- manual QC queue for flagged assets

### Contract-First Media APIs
Define:
- upload, transcode status, and playback URL schemas
- webhook callbacks for job completion
- idempotent job submission with client request IDs
- error codes for quota exceeded and unsupported codecs
- integration with OTT catalog agents

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

- Basic: `.cursor/skills/stream-heaven/apps/media-app/subtitle-cdn-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/media-app/subtitle-cdn-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
