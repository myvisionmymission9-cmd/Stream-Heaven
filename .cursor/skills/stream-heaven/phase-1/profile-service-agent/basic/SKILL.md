---
name: stream-heaven-phase-1-profile-service-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Profile Service (phase 1).
  Single-agent execution with governance prefix and structural validation.
---

# Profile Service — Basic

## When to use

- User invokes **Profile Service** or work in **phase-1** (phase 1)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/phase-1/profile-service-agent.md`
- **Role:** Phase 1 specialist for Stream Heaven user-service (profile domain) — user profiles, avatars, handles, privacy flags, and cross-app identity projection.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/phase-1/profile-service-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Profile Domain Modeling
Apply:
- Design user profile schema: display name, avatar, bio, locale, privacy flags
- Link profiles to auth user_id with immutable foreign key constraints
- Support multi-app persona fields without duplicating identity records
- Define soft-delete and GDPR export/delete hooks

### NestJS Profile Service
Apply:
- Scaffold services/profile-service on assigned port with health module
- CRUD endpoints: get self, get public, patch profile, upload avatar ref
- Validate input with class-validator; sanitize HTML in bio fields
- Paginate follower/following lists with cursor-based APIs

### Media & Avatar
Apply:
- Issue presigned S3 URLs for avatar upload; virus scan hook placeholder
- Generate Cloudflare CDN URLs for resized avatar variants
- Enforce max file size and MIME allowlist per cost-control-rules.md
- Never store raw uploads in Postgres — metadata + S3 key only

### Contract-First Profile API
Apply:
- OpenAPI in packages/shared-contracts/profile/v1
- Public vs. private field masks in response DTOs
- Breaking change policy coordinated with api-contract-author
- Flutter mobile shell consumes generated client types

### Caching & Performance
Apply:
- Cache hot public profiles in Redis with TTL and cache-aside pattern
- Invalidate cache on profile update events
- Optimize for low-end devices: small default avatar, lazy load full res
- Index Postgres on username/handle with uniqueness constraints

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| Shared contracts | `packages/shared-contracts/` |
| Validate agents | `node scripts/validate-agents.mjs` |
| Validate skills | `node scripts/validate-agent-skills.mjs` |
| Deep skill check | `node scripts/validate-all-agent-skills.mjs` |
| Phase 1 setup | `scripts/setup-phase1.ps1` |

## Validation

```powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
node scripts/validate-all-agent-skills.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/phase-1/profile-service-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/phase-1/profile-service-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
