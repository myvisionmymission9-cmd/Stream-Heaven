# Chat 8 — OTT + Media Pipeline

## Scope

OTT catalog, transcoding, uploads, HLS delivery, CDN optimization, adaptive bitrate, thumbnails, DRM, podcasts, short dramas.

## Attach Folders

- `apps/media-app/`
- `services/media-service/`
- `ai-agents/media-pipeline/`
- `apps/media-app/agents/`

## Primary Agents

| Agent | Path |
|-------|------|
| OTT Catalog Agent | `apps/media-app/agents/ott-catalog-agent.md` |
| Transcoding Pipeline | `apps/media-app/agents/transcoding-pipeline-agent.md` |
| Video Player Agent | `apps/media-app/agents/video-player-agent.md` |
| DRM Protection | `apps/media-app/agents/drm-protection-agent.md` |
| CDN Optimizer | `apps/media-app/agents/media-cdn-optimizer.md` |

## Deliverables

- [ ] `services/media-service/`
- [ ] Upload + resumable upload architecture
- [ ] Transcoding pipeline (FFmpeg / MediaConvert)
- [ ] HLS manifest generation
- [ ] Cloudflare CDN caching rules
- [ ] Flutter video player integration

## Phase Alignment

**Phase 4** — OTT catalog and playback.

## Multi-Chat Ready

**Yes** (agents/docs) — **No** (implementation). 20 media-app agents defined.
