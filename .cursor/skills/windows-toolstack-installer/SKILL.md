---
name: windows-toolstack-installer
description: >-
  Install Stream Heaven minimum Windows dev tool stack on D: drive — winget,
  npm globals on D:, Docker Postgres/Redis, SaaS checklists. Autonomous, idempotent.
---

# Windows Toolstack Installer (D: drive)

Use when installing or verifying the **Stream Heaven dev tool stack on D: drive** on Windows 10/11.

**Agent:** `ai-agents/meta/stream-heaven-toolstack-installer-agent.md`

## Autonomous execution

```powershell
Set-Location "D:\Dev\repos\Stream Heaven"
# Or: Set-Location "C:\Users\admin\Desktop\Stream Heaven"

powershell -ExecutionPolicy Bypass -File scripts/install-toolstack-autonomous.ps1
```

Equivalent entry (alias script):

```powershell
powershell -ExecutionPolicy Bypass -File scripts/install-stream-heaven-toolstack-d-drive.ps1 -SkipAlreadyInstalled
```

Verify:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/verify-stream-heaven-toolstack-d.ps1
```

## D: layout

| Path | Purpose |
|------|---------|
| `D:\StreamHeaven\tools` | VS Code, npm-global, portable tools |
| `D:\StreamHeaven\tools\npm-global` | firebase-tools, wrangler, @sentry/cli |
| `D:\StreamHeaven\logs` | `toolstack-install.log` |
| `D:\StreamHeaven\config` | SaaS checklist, env template, Docker notes |
| `D:\Docker` | Target Docker Desktop data root |
| `D:\Dev\tools` | Portable Git + gh |
| `D:\Dev\repos\Stream Heaven` | Canonical repo |

## Phased install

```powershell
powershell -ExecutionPolicy Bypass -File scripts/install-stream-heaven-toolstack-d-drive.ps1 -Phase prerequisites
powershell -ExecutionPolicy Bypass -File scripts/install-stream-heaven-toolstack-d-drive.ps1 -Phase core -SkipAlreadyInstalled
powershell -ExecutionPolicy Bypass -File scripts/install-stream-heaven-toolstack-d-drive.ps1 -Phase infra -SkipAlreadyInstalled
powershell -ExecutionPolicy Bypass -File scripts/install-stream-heaven-toolstack-d-drive.ps1 -Phase optional -SkipAlreadyInstalled
```

## Tool matrix

| Tool | Install | Location / notes |
|------|---------|------------------|
| Git / gh | Reuse or winget | `D:\Dev\tools` |
| Node.js | winget | C: binary OK; set npm prefix to D: |
| VS Code | winget `/DIR=` | `D:\StreamHeaven\tools\VSCode` |
| Docker Desktop | Already installed / winget | Move data to `D:\Docker` (GUI) |
| Postgres / Redis | Docker Compose | Repo `docker-compose.yml` |
| AWS CLI | winget | User scope |
| Firebase / wrangler | npm global | `D:\StreamHeaven\tools\npm-global` |
| DBeaver / Postman | winget | User scope |
| Cursor | Already installed | — |
| Jira / Notion / Figma / Mixpanel / OpenAI | SaaS only | See `saas-checklist.md` |
| Agora | Docs only (default) | `saas-checklist.md` |
| Grafana / Prometheus | Optional Docker | `docker-observability-compose.yml` |

## After PASS

```powershell
Set-Location "D:\Dev\repos\Stream Heaven"
powershell -ExecutionPolicy Bypass -File scripts/setup-phase1.ps1 -StartServices -RunSmokeTest
```

Agent handoff: `@ai-agents/meta/d-drive-dev-bootstrap-agent.md`

## Validation

```powershell
node scripts/validate-agents.mjs
```
