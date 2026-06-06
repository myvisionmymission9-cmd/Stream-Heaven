# Stream Heaven Phase 1 automated setup (Windows)
# Usage: powershell -ExecutionPolicy Bypass -File scripts/setup-phase1.ps1

param(
  [switch]$SkipInstall,
  [switch]$SkipDocker,
  [switch]$StartServices,
  [switch]$RunSmokeTest,
  [switch]$RunMigrations
)

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $RepoRoot

function Write-Step([string]$Message) {
  Write-Host ""
  Write-Host ("==> " + $Message) -ForegroundColor Cyan
}

function Test-CommandExists([string]$Name) {
  return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Invoke-Docker([string[]]$DockerArgs) {
  $prev = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  try {
    $output = & docker @DockerArgs 2>&1
    return [PSCustomObject]@{ Output = $output; ExitCode = $LASTEXITCODE }
  } finally {
    $ErrorActionPreference = $prev
  }
}

function Invoke-Pnpm([string[]]$PnpmArgs) {
  & npx --yes pnpm@9.15.0 @PnpmArgs
  if ($LASTEXITCODE -ne 0) { throw ("pnpm failed: " + ($PnpmArgs -join " ")) }
}

function Copy-EnvFilesIfMissing {
  $pairs = @(
    @("services/auth-service/.env.example", "services/auth-service/.env"),
    @("services/api-gateway/.env.example", "services/api-gateway/.env"),
    @("services/user-service/.env.example", "services/user-service/.env"),
    @("services/realtime-gateway/.env.example", "services/realtime-gateway/.env")
  )
  foreach ($p in $pairs) {
    $src = Join-Path $RepoRoot $p[0]
    $dst = Join-Path $RepoRoot $p[1]
    if (-not (Test-Path $dst)) {
      if (-not (Test-Path $src)) { throw "Missing example env: $src" }
      Copy-Item $src $dst
      Write-Host ("Created " + $p[1]) -ForegroundColor Green
    } else {
      Write-Host ("Exists: " + $p[1]) -ForegroundColor DarkGray
    }
  }
}

function Wait-DockerHealthy([int]$TimeoutSec = 90) {
  $deadline = (Get-Date).AddSeconds($TimeoutSec)
  while ((Get-Date) -lt $deadline) {
    $psOut = (Invoke-Docker @("compose", "ps")).Output | Out-String
    if ($psOut -match "postgres" -and $psOut -match "redis" -and ($psOut -match "running" -or $psOut -match "\(healthy\)")) {
      Write-Host "Postgres and Redis are running." -ForegroundColor Green
      return
    }
    Start-Sleep -Seconds 3
  }
  Write-Warning "Timed out waiting for Docker health; continuing."
}

function Stop-DevServicePorts {
  foreach ($port in @(3000, 3001, 3002, 3009)) {
    Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue |
      ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
  }
  Start-Sleep -Seconds 2
}

function Start-DevService([string]$ScriptName, [string]$LogFile) {
  $logPath = Join-Path $RepoRoot $LogFile
  $logsDir = Split-Path $logPath -Parent
  if (-not (Test-Path $logsDir)) { New-Item -ItemType Directory -Path $logsDir | Out-Null }
  if (Test-Path $logPath) { Remove-Item $logPath -Force -ErrorAction SilentlyContinue }
  $cmd = "Set-Location -LiteralPath '$RepoRoot'; cmd /c `"npx --yes pnpm@9.15.0 $ScriptName > `"$logPath`" 2>&1`""
  Start-Process -FilePath "powershell.exe" -ArgumentList @("-NoProfile", "-Command", $cmd) -WindowStyle Minimized | Out-Null
  Write-Host ("Started " + $ScriptName + " -> " + $LogFile) -ForegroundColor Green
}

function Wait-HttpOk([string]$Uri, [int]$TimeoutSec = 240) {
  $deadline = (Get-Date).AddSeconds($TimeoutSec)
  while ((Get-Date) -lt $deadline) {
    try {
      Invoke-RestMethod -Uri $Uri -Method GET -TimeoutSec 5 | Out-Null
      return $true
    } catch {
      Start-Sleep -Seconds 2
    }
  }
  return $false
}

Write-Step "Stream Heaven Phase 1 setup"
Write-Host ("Repo: " + $RepoRoot)

Write-Step "Checking node, npm, docker"
if (-not (Test-CommandExists "node")) { throw "Node.js not found. Install Node 20+." }
Write-Host ("node " + (node -v))
Write-Host ("npm " + (npm -v))

$dockerOk = Test-CommandExists "docker"
if ($dockerOk) {
  Write-Host (docker --version)
} else {
  Write-Warning "Docker CLI not found. Install Docker Desktop for Windows, start it, then re-run."
  $SkipDocker = $true
}

if (-not $SkipInstall) {
  Write-Step "pnpm install (npx pnpm@9.15.0)"
  Invoke-Pnpm @("install")
} else {
  Write-Host "Skipped install" -ForegroundColor Yellow
}

Write-Step "Copy .env.example to .env"
Copy-EnvFilesIfMissing

if (-not $SkipDocker -and $dockerOk) {
  Write-Step "docker compose up -d postgres redis"
  $composeUp = Invoke-Docker @("compose", "up", "-d", "postgres", "redis")
  if ($composeUp.ExitCode -ne 0) {
    $composeStart = Invoke-Docker @("start", "streamheaven-postgres-1", "streamheaven-redis-1")
    if ($composeStart.ExitCode -ne 0) { throw "docker compose up failed" }
  }
  Wait-DockerHealthy
  (Invoke-Docker @("compose", "ps")).Output | ForEach-Object { Write-Host $_ }

  if ($RunMigrations) {
    Write-Step "Running TypeORM migrations (auth + user)"
    Invoke-Pnpm @("--filter", "@stream-heaven/auth-service", "migration:run")
    Invoke-Pnpm @("--filter", "@stream-heaven/user-service", "migration:run")
  }
} elseif ($SkipDocker) {
  Write-Warning "Docker skipped. Ensure localhost:5432 and :6379 are available."
}

if ($StartServices) {
  $startScript = Join-Path $RepoRoot "scripts/phase1-start-services.ps1"
  $startArgs = @("-ExecutionPolicy", "Bypass", "-File", $startScript)
  if ($SkipDocker) { $startArgs += "-SkipDocker" }
  & powershell @startArgs
  if ($LASTEXITCODE -ne 0) { Write-Warning "Service bootstrap failed. See logs/dev-*.log" }
}

Write-Step "Next steps"
Write-Host @"

If services are not running, use four terminals at repo root:
  npx pnpm@9.15.0 dev:auth
  npx pnpm@9.15.0 dev:user
  npx pnpm@9.15.0 dev:gateway
  npx pnpm@9.15.0 dev:realtime

Smoke test:
  powershell -ExecutionPolicy Bypass -File scripts/smoke-test-phase1.ps1 -AuthLogPath logs/dev-auth.log

Or re-run: scripts/setup-phase1.ps1 -StartServices -RunSmokeTest

"@

if ($RunSmokeTest) {
  Write-Step "Smoke test"
  $smoke = Join-Path $RepoRoot "scripts/smoke-test-phase1.ps1"
  $authLog = Join-Path $RepoRoot "logs/dev-auth.log"
  if (Test-Path $authLog) {
    & powershell -ExecutionPolicy Bypass -File $smoke -AuthLogPath $authLog
  } else {
    & powershell -ExecutionPolicy Bypass -File $smoke
  }
}

Write-Step "Setup finished"
