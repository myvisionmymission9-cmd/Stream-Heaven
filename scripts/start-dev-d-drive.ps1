# Daily dev startup for Stream Heaven on D drive (Windows)
# Usage: powershell -ExecutionPolicy Bypass -File scripts/start-dev-d-drive.ps1

$ErrorActionPreference = "Stop"
$RepoRoot = if ($env:SH_REPO_ROOT) { $env:SH_REPO_ROOT } else { Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path) }

$gitCmd = "D:\Dev\tools\Git\cmd"
$ghDir = "D:\Dev\tools\gh"
if (Test-Path $gitCmd) { $env:PATH = "$gitCmd;$env:PATH" }
if (Test-Path $ghDir) { $env:PATH = "$ghDir;$env:PATH" }

if (-not (Test-Path $RepoRoot)) {
  Write-Host "Repo not found: $RepoRoot" -ForegroundColor Red
  exit 1
}

Set-Location $RepoRoot
Write-Host "==> Stream Heaven daily dev start ($RepoRoot)" -ForegroundColor Cyan

Write-Host "==> Docker compose (postgres, redis)" -ForegroundColor Cyan
docker compose up -d postgres redis
if ($LASTEXITCODE -ne 0) {
  Write-Host "Docker failed — start Docker Desktop and retry." -ForegroundColor Yellow
  exit 1
}

Write-Host "==> Phase 1 services" -ForegroundColor Cyan
npx pnpm@9.15.0 run phase1:start
if ($LASTEXITCODE -ne 0) {
  Write-Host "phase1:start failed — see logs under logs/" -ForegroundColor Yellow
  exit 1
}

Write-Host "==> Gateway health (aggregate, up to 120s)" -ForegroundColor Cyan
$deadline = (Get-Date).AddSeconds(120)
$ready = $false
while ((Get-Date) -lt $deadline) {
  try {
    $health = Invoke-RestMethod -Uri "http://127.0.0.1:3000/health/aggregate" -TimeoutSec 5
    if ($health.status -eq "ready") {
      $ready = $true
      Write-Host ("Health: ready — " + ($health | ConvertTo-Json -Compress)) -ForegroundColor Green
      break
    }
    Write-Host ("Health: " + $health.status + " — retrying...") -ForegroundColor DarkYellow
  } catch {
    Write-Host "Health: unreachable — retrying..." -ForegroundColor DarkYellow
  }
  Start-Sleep -Seconds 5
}

if (-not $ready) {
  Write-Host "Gateway not ready within 120s — check logs/dev-gateway.log" -ForegroundColor Red
  exit 1
}

Write-Host ""
Write-Host "Flutter (optional, separate terminal):" -ForegroundColor Cyan
Write-Host "  cd `"$RepoRoot\apps\mobile`" && flutter run"
Write-Host ""
Write-Host "Agent: @ai-agents/meta/d-drive-dev-bootstrap-agent.md" -ForegroundColor DarkGray
exit 0
