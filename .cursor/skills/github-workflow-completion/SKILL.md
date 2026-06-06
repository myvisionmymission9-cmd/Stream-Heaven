---
name: github-workflow-completion
description: >-
  Complete Stream Heaven GitHub hygiene after repo bootstrap — PR/issue templates,
  Dependabot, CODEOWNERS, workflow verification. Use when finishing GitHub setup
  or running github-workflow-complete.ps1.
---

# Stream Heaven GitHub Workflow Completion

## When to use

- User asks to finish GitHub setup after bootstrap
- PR/issue templates, Dependabot, or CODEOWNERS are missing
- Need to verify `gh workflow list` / `gh run list` after push
- Post-bootstrap hygiene check without browser `gh auth login`

## Agent scope

Primary agent: `ai-agents/meta/github-workflow-completion-agent.md`

Prerequisite: `ai-agents/meta/github-repo-bootstrap-autonomous-agent.md`

Read first: `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`, `platform-governance/security-rules.md`

## Steps

1. **Prerequisites** — Git and `gh` on PATH; optional `GH_TOKEN` or `.env.local` (gitignored)
2. **Repo root** — `cd "c:\Users\admin\Desktop\Stream Heaven"` (or D-drive canonical path)
3. **Run completion script**:
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts/github-workflow-complete.ps1
   ```
4. **If no remote** — with token: `scripts/github-bootstrap-autonomous.ps1 -SkipPush`
5. **Verify when authenticated**:
   ```powershell
   git remote -v
   gh workflow list
   gh run list --limit 5
   git status -sb
   ```

## Exit codes

| Code | Meaning |
|------|---------|
| 0 | Hygiene OK; verification complete or skipped (no auth) |
| 1 | `GH_TOKEN` missing when gh verification requested |
| 2 | Required `.github` hygiene files missing |
| 3 | `gh workflow list` or `gh run list` failed |

## Hygiene artifacts

| File | Purpose |
|------|---------|
| `.github/PULL_REQUEST_TEMPLATE.md` | PR checklist |
| `.github/ISSUE_TEMPLATE/bug_report.md` | Bug reports |
| `.github/ISSUE_TEMPLATE/feature_request.md` | Feature requests |
| `.github/dependabot.yml` | npm/pnpm updates at repo root |
| `.github/CODEOWNERS` | Default reviewers |
| `.github/workflows/phase1-ci.yml` | Phase 1 CI |

## Branch strategy

- `main` — protected default; CI on push/PR
- `feat/*`, `fix/*`, `chore/*` — branch prefixes for PRs to `main`
- Branch protection: document `gh api repos/OWNER/REPO/branches/main/protection` (admin PAT); do not auto-apply

## Common fixes

- **Exit 1** — Set `[System.Environment]::SetEnvironmentVariable('GH_TOKEN','<pat>','User')` or `.env.local`; restart terminal
- **No origin** — Run bootstrap with `-SkipPush` first; push only when user requests
- **Dirty tree** — Report `git status -sb`; commit only on explicit user request
- **CODEOWNERS** — Update placeholder owner in `.github/CODEOWNERS`

## Validation

```powershell
node scripts/validate-agents.mjs
```
