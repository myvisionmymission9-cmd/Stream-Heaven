---
name: stream-heaven-core-engineering-backend-api-gateway-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Api Gateway (phase 5).
  Single-agent execution with governance prefix and structural validation.
---

# Api Gateway — Basic

## When to use

- User invokes **Api Gateway** or work in **core-engineering/backend** (phase 5)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/core-engineering/backend/api-gateway-agent.md`
- **Role:** Api Gateway Agent specialist for Stream Heaven's backend domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/core-engineering/backend/api-gateway-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Production Gateway
Apply:
- Own routing table versioning and upstream service registry
- TLS termination at Cloudflare; origin protection and WAF rules
- Global /v1 error envelope and RFC7807 problem details
- Request size limits and JSON depth validation at edge

### Auth & Rate Limit
Apply:
- JWT validation middleware shared with api-gateway-bootstrap-agent patterns
- Per-route rate limits: stricter on /auth/*, wallet, and report endpoints
- Bot detection hooks coordinated with bot-protection-agent
- Service-to-service internal routes with mTLS or signed internal JWT

### Observability
Apply:
- Per-route RED metrics and distributed tracing headers
- Access logs with hashed IP; no Bearer tokens in logs
- Alert on 5xx ratio and upstream timeout spikes
- Dashboard for gateway saturation during festival events

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

- Basic: `.cursor/skills/stream-heaven/core-engineering/backend/api-gateway-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/backend/api-gateway-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
