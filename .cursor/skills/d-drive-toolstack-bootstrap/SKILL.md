---
name: d-drive-toolstack-bootstrap
description: >-
  Autonomous D: drive installation of Stream Heaven minimum dev tool stack on
  Windows. winget/portable installs, Docker/Postgres/Redis guidance, SaaS
  checklists, verify script. Zero user prompts unless admin blocked.
---

# D-Drive Toolstack Bootstrap

Use when setting up a **new Windows dev machine** for Stream Heaven with tools on **D: drive** (not C:).

**Agent:** `ai-agents/meta/d-drive-toolstack-bootstrap-agent.md`

## When to use

- User asks to install dev tools on D: drive for Stream Heaven
- Fresh laptop setup before Phase 1 backend work
- Verify or repair missing Git, Node, Docker, AWS CLI, Firebase CLI, etc.
- After host stability fixes (run windows-laptop-diagnostics first if sudden shutdowns)

## Autonomous execution (zero user prompts)

```powershell
Set-Location "D:\Dev\repos\Stream Heaven"
# Or Desktop copy during migration:
# Set-Location "C:\Users\admin\Desktop\Stream Heaven"

powershell -ExecutionPolicy Bypass -File scripts/install-toolstack-autonomous.ps1
```

Pipeline: **diagnose** (D: space, existing tools) → **install** (all phases) → **verify** (exit 0 = core ready).

Phased install only:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/install-stream-heaven-toolstack-d.ps1 -Phase core -SkipAlreadyInstalled
powershell -ExecutionPolicy Bypass -File scripts/install-stream-heaven-toolstack-d.ps1 -Phase infra -SkipAlreadyInstalled
powershell -ExecutionPolicy Bypass -File scripts/install-stream-heaven-toolstack-d.ps1 -Phase optional -SkipAlreadyInstalled
```

Verify only:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/verify-stream-heaven-toolstack-d.ps1
```

## D: layout

| Path | Purpose |
|------|---------|
| `D:\StreamHeaven\tools` | Portable ZIPs, npm prefix, CLI binaries |
| `D:\StreamHeaven\tools\npm-global` | Firebase CLI, wrangler, Sentry CLI (npm global prefix) |
| `D:\StreamHeaven\tools\vscode-portable` | Optional VS Code portable |
| `D:\StreamHeaven\logs` | `toolstack-install.log` |
| `D:\StreamHeaven\config` | `saas-checklist.md`, `env-template.md`, Docker data-root notes |
| `D:\Dev\tools` | Existing Git/gh portable (reuse if present) |
| `D:\Dev\repos\Stream Heaven` | Canonical repo for Phase 1 |

## Install phases

### Prerequisites
- D: drive present, ≥10 GB free
- Folder structure under `D:\StreamHeaven`
- Session PATH prepends `D:\StreamHeaven\tools\npm-global`, `D:\Dev\tools\Git\cmd`, `D:\Dev\tools\gh`

### Core (automated)
- Node.js LTS (winget user scope or portable under `D:\StreamHeaven\tools\node`)
- Git + GitHub CLI (verify; prefer `D:\Dev\tools` if already bootstrapped)
- AWS CLI v2 (winget → user install; verify `aws --version`)
- npm global prefix → `D:\StreamHeaven\tools\npm-global`

### Infra (automated where possible)
- Docker Desktop: verify CLI; write `config/docker-data-root.md` for moving data to D:
- Postgres + Redis: **prefer** repo `docker compose up -d postgres redis` (Phase 1)
- Optional Memurai (Redis for Windows) via winget if Docker unavailable

### Optional
- DBeaver, Postman (winget with user scope)
- VS Code portable ZIP to `D:\StreamHeaven\tools\vscode-portable`
- Firebase CLI, wrangler, `@sentry/cli` via npm global on D:
- Grafana + Prometheus: `config/docker-observability-compose.yml` snippet (Docker)

### SaaS / document only (no fake install)
Written to `D:\StreamHeaven\config\saas-checklist.md`:
- Cursor (already installed)
- Jira Cloud + API token
- Notion workspace
- Figma (desktop or browser)
- Mixpanel project
- Agora / ZEGO SDK docs
- GitHub Actions (built into GitHub)
- OpenAI API keys via env (see `env-template.md`)

## Verification commands

```powershell
node -v
git --version
gh --version
aws --version
docker --version
npm config get prefix   # should be D:\StreamHeaven\tools\npm-global
firebase --version      # after npm global install
npx wrangler --version
```

Full verify script:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/verify-stream-heaven-toolstack-d.ps1
```

Exit **0** = core stack OK; **1** = one or more required tools missing.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| D: not found | Add drive or change `-DriveLetter`; agent cannot proceed |
| winget missing | Install App Installer from Microsoft Store; retry |
| Node on C: only | Re-run with `-Phase core`; script sets npm prefix on D: |
| Docker not running | Start Docker Desktop; wait 2 min; `docker info` |
| Docker data on C: | Follow `D:\StreamHeaven\config\docker-data-root.md` (requires quit Docker + admin) |
| gh not authenticated | `gh auth login` or set `GH_TOKEN` user env var |
| Firebase/wrangler not found | Ensure PATH includes `D:\StreamHeaven\tools\npm-global`; re-run `-Phase optional` |
| Postgres/Redis | Use Phase 1: `scripts/setup-phase1.ps1` from D: repo |

## After toolstack PASS

Hand off to **D-Drive Dev Bootstrap Agent** for Phase 1 runtime:

```powershell
Set-Location "D:\Dev\repos\Stream Heaven"
powershell -ExecutionPolicy Bypass -File scripts/setup-phase1.ps1 -StartServices -RunSmokeTest
```

## Validation

```powershell
node scripts/validate-agents.mjs
```
