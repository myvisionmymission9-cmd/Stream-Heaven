---
name: stream-heaven-support-ecosystem-vip-support-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Vip Support (phase 20).
  Single-agent execution with governance prefix and structural validation.
---

# Vip Support — Basic

## When to use

- User invokes **Vip Support** or work in **support-ecosystem** (phase 20)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/support-ecosystem/vip-support-agent.md`
- **Role:** Vip Support Agent specialist for Stream Heaven's support-ecosystem domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/support-ecosystem/vip-support-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Local Development Bootstrap
Setup:
- Own Vip Support deliverables in support-ecosystem domain for Stream Heaven Phase 20. (Vip Support scope)
- Docker Desktop verification and container health
- Node.js and npm workspace dependency installation
- PostgreSQL and Redis container startup scripts
- environment file templates from .env.example
- Windows PowerShell script compatibility

### Daily Dev Workflow
Run:
- daily-dev-start-agent morning bootstrap checklist
- service health check before feature work
- git branch hygiene and PR preparation
- validate-agents.mjs before agent catalog edits
- smoke test after infrastructure changes
- Define or update packages/shared-contracts schemas before NestJS, Flutter, or Socket.IO implementation.

### Agent Catalog Management
Maintain:
- AGENT-REGISTRY.md accuracy and completeness
- agent file structure compliance validation
- skill file generation and validation workflows
- golden agent test suite maintenance
- agent onboarding documentation updates
- Apply platform-governance standards for API, security, database, deployment, and testing surfaces.

### Validation & Quality
Execute:
- node scripts/validate-agents.mjs for catalog health
- node scripts/validate-agent-skills.mjs for skill pairs
- node scripts/test-golden-agents.mjs for regression
- pre-commit hook alignment with validation scripts
- CI pipeline validation gate verification

### Environment & Tooling
Configure:
- D: drive dev bootstrap for disk space management
- Flutter SDK path configuration for Phase 2a
- Cursor IDE rules and skills directory structure
- MCP server configuration for external tools
- monorepo npm workspace script discovery

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

- Basic: `.cursor/skills/stream-heaven/support-ecosystem/vip-support-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/support-ecosystem/vip-support-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
