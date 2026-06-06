---
name: stream-heaven-identity-platform-cross-app-profile-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Cross App Profile (phase 18).
  Single-agent execution with governance prefix and structural validation.
---

# Cross App Profile — Basic

## When to use

- User invokes **Cross App Profile** or work in **identity-platform** (phase 18)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/identity-platform/cross-app-profile-agent.md`
- **Role:** Cross-app profile sync.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/identity-platform/cross-app-profile-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### User Profile Schema Design
Design:
- cross-app-profile-agent in user-service + shared-contracts/identity/v1. (Cross App Profile scope)
- PostgreSQL users and profiles table separation
- handle uniqueness with case-insensitive index
- display name, bio, avatar URL fields
- profile privacy enum: public, followers, private
- cross-app identity projection for four apps

### Profile CRUD APIs
Implement:
- GET/PATCH /v1/users/me for self-service updates
- GET /v1/users/:handle for public profile views
- JWT sub claim linkage from auth-service
- input validation for handles, bios, and display names
- soft-delete and account deactivation flows
- Firebase Auth + OTP per security-rules.

### Avatar & Media Upload
Wire:
- S3 presigned upload contract for avatar images
- Cloudflare CDN URL generation for avatar delivery
- image size and format validation (WebP preferred)
- moderation escalation to content-safety-agent
- default avatar fallbacks for new users
- Outbox via event-stream-agent.

### Caching & Performance
Optimize:
- Redis profile cache for feed and presence hot paths
- cache invalidation on profile PATCH events
- minimal profile projection for list endpoints
- TTL policies aligned with redis-cache-specialist
- batch profile fetch for social feed composition

### Contract-First Design
Define:
- OpenAPI schemas in packages/shared-contracts/users/v1
- shared-types user models in packages/shared-types
- api-gateway proxy rules for /users/* routes
- migration outline for users, profiles, profile_settings
- integration tests with auth-service JWT flow

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

- Basic: `.cursor/skills/stream-heaven/identity-platform/cross-app-profile-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/identity-platform/cross-app-profile-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
