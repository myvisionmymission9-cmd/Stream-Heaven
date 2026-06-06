---
name: stream-heaven-media-pipeline-transcoding-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Transcoding (phase 20).
  Single-agent execution with governance prefix and structural validation.
---

# Transcoding — Basic

## When to use

- User invokes **Transcoding** or work in **media-pipeline** (phase 20)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/media-pipeline/transcoding-agent.md`
- **Role:** Transcoding Agent specialist for Stream Heaven's media-pipeline domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/media-pipeline/transcoding-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Upload & Ingest Pipeline
Build:
- Own Transcoding deliverables in media-pipeline domain for Stream Heaven Phase 20. (Transcoding scope)
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
- Define or update packages/shared-contracts schemas before NestJS, Flutter, or Socket.IO implementation.

### CDN & Delivery
Route:
- Cloudflare CDN cache rules for segments and manifests
- signed URL TTL policies for premium content
- regional edge selection for Indian ISPs
- cache invalidation on content updates
- egress cost monitoring per platform-finance rules
- Apply platform-governance standards for API, security, database, deployment, and testing surfaces.

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

- Basic: `.cursor/skills/stream-heaven/media-pipeline/transcoding-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/media-pipeline/transcoding-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
