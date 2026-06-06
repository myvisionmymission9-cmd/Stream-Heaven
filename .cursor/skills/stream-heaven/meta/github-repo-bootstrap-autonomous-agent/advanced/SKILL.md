---
name: stream-heaven-meta-github-repo-bootstrap-autonomous-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Github Repo Bootstrap Autonomous (phase 1).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Github Repo Bootstrap Autonomous — Advanced

## When to use

- User invokes **Github Repo Bootstrap Autonomous** or work in **meta** (phase 1)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/meta/github-repo-bootstrap-autonomous-agent.md`
- **Role:** Fully autonomous Git and GitHub repository setup for Stream Heaven — no browser `gh auth login`, no user prompts. Uses `GH_TOKEN`/`GITHUB_TOKEN` only, runs `scripts/github-bootstrap-autonomous.ps1`, and completes init → secret scan → remote create → commit → push without human involvement when a token is present.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Autonomous Bootstrap Orchestration
Orchestrate:
- Run `scripts/github-bootstrap-autonomous.ps1` as the single entry point (idempotent, safe to re-run). (Github Repo Bootstrap Autonomous scope)
- full environment bootstrap with fix-and-retry loops
- multi-phase validation (Phase 1 → 2a → 2) sequencing
- dependency conflict resolution across workspaces
- Docker resource allocation optimization for Windows
- bootstrap failure diagnosis and automated remediation

### Agent Ecosystem Governance
Govern:
- 774+ agent catalog integrity audits
- agent-skill-validator-agent quality gate enforcement
- boilerplate detection and enrichment workflows
- agent coverage analysis across platform domains
- registry sync after bulk agent generation
- Verify `git --version` and `gh --version`; prepend `D:\Dev\tools\gh` and `D:\Dev\tools\Git\cmd` to PATH when present (same as `scripts/gh-auth-reminder.ps1`).

### CI/CD Pipeline Alignment
Align:
- local validation script parity with CI checks
- GitHub Actions workflow debugging and fixes
- pre-commit hook configuration and testing
- validation script performance optimization
- CI failure triage and remediation playbooks
- Load token from Windows User env (`GH_TOKEN` or `GITHUB_TOKEN`) or repo-root `.env.local` (gitignored via `.env.*`); never print token values.

### Developer Experience Optimization
Improve:
- setup script idempotency and re-run safety
- error message clarity for common bootstrap failures
- documentation sync after script changes
- onboarding time measurement and reduction
- developer feedback collection and prioritization

### Multi-Agent Orchestration
Coordinate:
- phase-1-autonomous-completion-agent handoffs
- local-dev-bootstrap-agent environment prerequisites
- agent-registry-auditor-agent catalog health checks
- quality-gate validation before feature work
- ADR for dev tooling architecture changes

### Production Validation
Validate:
- bootstrap script E2E tests on clean Windows VM
- validation script regression test suite
- golden agent test coverage for meta agents
- CI pipeline green status verification
- documentation accuracy audits

### Monitoring & Diagnostics
Monitor:
- bootstrap success rate tracking across team
- common failure pattern analysis and fixes
- Docker resource usage monitoring on dev machines
- validation script execution time profiling
- runbooks for dev environment recovery

### Security & Compliance
Ensure:
- no secrets in setup scripts or .env.example
- Docker image vulnerability scanning
- dependency audit automation in CI
- dev environment isolation from production credentials
- secure defaults in all bootstrap configurations

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
node scripts/test-golden-agents.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/meta/github-repo-bootstrap-autonomous-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/meta/github-repo-bootstrap-autonomous-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
