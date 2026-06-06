---
name: stream-heaven-cross-platform-ecosystem-routing-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Ecosystem Routing (phase 20).
  Single-agent execution with governance prefix and structural validation.
---

# Ecosystem Routing — Basic

## When to use

- User invokes **Ecosystem Routing** or work in **cross-platform** (phase 20)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/cross-platform/ecosystem-routing-agent.md`
- **Role:** Ecosystem Routing Agent specialist for Stream Heaven's cross-platform domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/cross-platform/ecosystem-routing-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Domain Expertise
Apply:
- Bootstrap NestJS api-gateway (port 3000) routing for Ecosystem Routing and Phase 1 service prefixes. (Ecosystem Routing scope)
- deep understanding of assigned domain responsibilities
- platform-governance standards for all outputs
- contract-first design in packages/shared-contracts/
- coordination with dependent agents listed in agent file
- optimization for Indian market constraints

### Implementation Standards
Follow:
- smallest correct diff for all changes
- existing codebase conventions in apps/, services/, packages/
- no duplicate services — check services/ first
- no secrets in code — env vars and Secrets Manager only
- English in code; user strings via i18n ARB files
- Configure JWT validation middleware using auth-service public keys before upstream proxy calls.

### Technical Execution
Execute:
- NestJS backend patterns for service implementations
- Flutter/Riverpod patterns for mobile UI work
- PostgreSQL schema design with migration safety
- Redis caching and pub/sub where appropriate
- Socket.IO realtime integration when required
- Add Redis-backed rate limiting per IP and authenticated user tier with 429 Retry-After responses.

### Quality & Validation
Validate:
- node scripts/validate-agents.mjs after agent edits
- contract validation against OpenAPI specs
- integration tests for critical paths
- low-end Android performance verification
- documentation of decisions and handoff artifacts

### Governance & Handoff
Document:
- MASTER-AI-OPERATING-SYSTEM.md as primary context
- governance references listed in agent file
- integration notes for downstream agents
- test strategy and acceptance criteria
- escalation paths for out-of-scope decisions

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

- Basic: `.cursor/skills/stream-heaven/cross-platform/ecosystem-routing-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/cross-platform/ecosystem-routing-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
