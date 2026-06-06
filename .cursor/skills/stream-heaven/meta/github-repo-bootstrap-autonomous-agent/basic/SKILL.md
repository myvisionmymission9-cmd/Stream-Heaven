---
name: stream-heaven-meta-github-repo-bootstrap-autonomous-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Github Repo Bootstrap Autonomous (phase 1).
  Single-agent execution with governance prefix and structural validation.
---

# Github Repo Bootstrap Autonomous — Basic

## When to use

- User invokes **Github Repo Bootstrap Autonomous** or work in **meta** (phase 1)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/meta/github-repo-bootstrap-autonomous-agent.md`
- **Role:** Fully autonomous Git and GitHub repository setup for Stream Heaven — no browser `gh auth login`, no user prompts. Uses `GH_TOKEN`/`GITHUB_TOKEN` only, runs `scripts/github-bootstrap-autonomous.ps1`, and completes init → secret scan → remote create → commit → push without human involvement when a token is present.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/meta/github-repo-bootstrap-autonomous-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Local Development Bootstrap
Setup:
- Run `scripts/github-bootstrap-autonomous.ps1` as the single entry point (idempotent, safe to re-run). (Github Repo Bootstrap Autonomous scope)
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
- Verify `git --version` and `gh --version`; prepend `D:\Dev\tools\gh` and `D:\Dev\tools\Git\cmd` to PATH when present (same as `scripts/gh-auth-reminder.ps1`).

### Agent Catalog Management
Maintain:
- AGENT-REGISTRY.md accuracy and completeness
- agent file structure compliance validation
- skill file generation and validation workflows
- golden agent test suite maintenance
- agent onboarding documentation updates
- Load token from Windows User env (`GH_TOKEN` or `GITHUB_TOKEN`) or repo-root `.env.local` (gitignored via `.env.*`); never print token values.

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

- Basic: `.cursor/skills/stream-heaven/meta/github-repo-bootstrap-autonomous-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/meta/github-repo-bootstrap-autonomous-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
