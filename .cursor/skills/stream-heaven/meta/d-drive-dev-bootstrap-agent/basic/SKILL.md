---
name: stream-heaven-meta-d-drive-dev-bootstrap-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven D Drive Dev Bootstrap (phase 1).
  Single-agent execution with governance prefix and structural validation.
---

# D Drive Dev Bootstrap — Basic

## When to use

- User invokes **D Drive Dev Bootstrap** or work in **meta** (phase 1)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/meta/d-drive-dev-bootstrap-agent.md`
- **Role:** Own Windows-only migration and bootstrap of Stream Heaven on the D: drive: portable Git/GitHub CLI, repo layout under `D:\Dev\repos`, robocopy from Desktop, PATH/session setup, `WORKFLOW.md`, git init, and **fully autonomous Phase 1 runtime** from the D path without user involvement unless Docker Desktop cannot be started.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/meta/d-drive-dev-bootstrap-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Local Development Bootstrap
Setup:
- Prepend `D:\Dev\tools\Git\cmd` and `D:\Dev\tools\gh` to session `PATH`; verify `git --version` and `gh --version`. (D Drive Dev Bootstrap scope)
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
- Confirm primary repo at `D:\Dev\repos\Stream Heaven` (not Desktop copy); run `git -C "D:\Dev\repos\Stream Heaven" status -sb`.

### Agent Catalog Management
Maintain:
- AGENT-REGISTRY.md accuracy and completeness
- agent file structure compliance validation
- skill file generation and validation workflows
- golden agent test suite maintenance
- agent onboarding documentation updates
- Check `gh auth status`; if `GITHUB_TOKEN` or `GH_TOKEN` is set, run `gh auth login --with-token` (stdin); otherwise report browser login needed (`gh auth login`).

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

- Basic: `.cursor/skills/stream-heaven/meta/d-drive-dev-bootstrap-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/meta/d-drive-dev-bootstrap-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
