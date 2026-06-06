---
name: stream-heaven-orchestration-master-platform-architect-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Master Platform Architect (phase 4).
  Single-agent execution with governance prefix and structural validation.
---

# Master Platform Architect — Basic

## When to use

- User invokes **Master Platform Architect** or work in **orchestration** (phase 4)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/orchestration/master-platform-architect-agent.md`
- **Role:** Master Platform Architect Agent specialist for Stream Heaven's orchestration domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/orchestration/master-platform-architect-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Architecture Map
Apply:
- Maintain living diagram: services/, packages/, apps/, ai-agents/ ownership
- Track contract versions per domain in packages/shared-contracts/
- Document port allocation: 3000 gateway, 3001 auth, 3002 profile, 3009 realtime
- Identify duplicate or orphan modules before new scaffolding

### Integration Pattern
Apply:
- Standardize gateway proxy headers: X-User-Id, X-Request-Id, X-Session-Id
- Redis cache-aside vs write-through decision tree per domain
- Socket.IO room naming conventions per app namespace
- S3 + Cloudflare CDN patterns for media and avatars

### Review & Sign-off
Apply:
- Architecture review template for Phase 2+ feature proposals
- Backward compatibility checklist for /v1/* extensions
- Coordinate chief-architect on ADR-required forks
- Quality-gate architecture section completion before merge

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

- Basic: `.cursor/skills/stream-heaven/orchestration/master-platform-architect-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/orchestration/master-platform-architect-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
