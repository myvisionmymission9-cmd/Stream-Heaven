---
name: stream-heaven-core-engineering-database-redis-cache-specialist-basic
description: >-
  Basic Cursor skill for Stream Heaven Redis Cache Specialist (phase 5).
  Single-agent execution with governance prefix and structural validation.
---

# Redis Cache Specialist — Basic

## When to use

- User invokes **Redis Cache Specialist** or work in **core-engineering/database** (phase 5)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/core-engineering/database/redis-cache-specialist.md`
- **Role:** Redis Cache Specialist specialist for Stream Heaven's database domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/core-engineering/database/redis-cache-specialist.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Key Design
Apply:
- Prefix convention: auth:session:, social:feed:, live:presence:, ratelimit:
- Hash tags for cluster multi-key ops: {userId} session families
- TTL on all cache keys — no immortal keys without ADR
- Document key catalog in platform-governance/database-rules.md

### Session & Auth Cache
Apply:
- Refresh token rotation families with reuse detection
- OTP attempt counters and cooldown keys per phone hash
- Session invalidation on password change and admin lock
- Coordinate auth-service-agent on schema changes

### Cache Pattern
Apply:
- Cache-aside for profiles and feed slices
- Rate limit sliding windows with INCR + EXPIRE
- Probabilistic early expiration against stampede
- Socket.IO Redis adapter memory and channel planning

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

- Basic: `.cursor/skills/stream-heaven/core-engineering/database/redis-cache-specialist/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/database/redis-cache-specialist/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
