---
name: stream-heaven-search-infrastructure-search-cache-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Search Cache (phase 20).
  Single-agent execution with governance prefix and structural validation.
---

# Search Cache — Basic

## When to use

- User invokes **Search Cache** or work in **search-infrastructure** (phase 20)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/search-infrastructure/search-cache-agent.md`
- **Role:** Search Cache Agent specialist for Stream Heaven's search-infrastructure domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/search-infrastructure/search-cache-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Cache Key Design
Design:
- Design and implement search infrastructure capabilities for Stream Heaven. (Search Cache scope)
- namespaced keys: `{service}:{entity}:{id}` convention
- TTL policies per data volatility class
- cache-aside vs write-through selection per endpoint
- negative caching for miss storms
- key cardinality monitoring to prevent hot keys

### Invalidation Strategies
Implement:
- event-driven invalidation via pub/sub channels
- versioned cache keys for atomic busting
- partial invalidation for feed fan-out subgraphs
- stale-while-revalidate for profile and catalog reads
- invalidation audit logs for debugging ghost data
- Follow platform-governance standards for all outputs.

### Session & Rate Limiting
Configure:
- auth session storage with sliding TTL
- token bucket rate limiters per IP and user
- OTP attempt counters with lockout windows
- API gateway Redis-backed throttle middleware
- session enumeration protection patterns
- Coordinate with dependent agents and shared packages.

### Pub/Sub & Realtime Fan-out
Wire:
- Socket.IO Redis adapter channel design
- room-scoped pub/sub for livestream events
- backpressure handling on subscriber lag
- message schema versioning in shared-contracts
- dead connection cleanup and heartbeat alignment

### Operational Safety
Operate:
- memory eviction policy selection (volatile-lru vs allkeys-lru)
- maxmemory alerts before OOM kills
- RDB/AOF backup strategy per environment
- no secrets in repo — REDIS_URL via env only
- local Docker Redis via setup-phase1.ps1

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

- Basic: `.cursor/skills/stream-heaven/search-infrastructure/search-cache-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/search-infrastructure/search-cache-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
