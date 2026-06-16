# Start Phase 1 NestJS dev services (Windows) ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â zero user involvement
# Usage: powershell -ExecutionPolicy Bypass -File scripts/phase1-start-services.ps1
#        pnpm run phase1:start
#        pnpm run phase1:start -- -RunSmokeTest

param(
  [switch]$SkipDocker,
  [switch]$RunSmokeTest,
  [switch]$StopOnly,
  [int]$HealthTimeoutSec = 300
)

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $RepoRoot

function Write-Step([string]$Message) {
  Write-Host ""
  Write-Host ("==> " + $Message) -ForegroundColor Cyan
}


function Stop-StreamHeavenNodeWorkers {
  Get-CimInstance Win32_Process -Filter "Name = 'node.exe'" -ErrorAction SilentlyContinue |
    Where-Object { $_.CommandLine -match 'Stream Heaven' } |
    ForEach-Object {
      Write-Host ("Stopping stale node PID " + $_.ProcessId) -ForegroundColor DarkYellow
      Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue
    }
  Start-Sleep -Seconds 2
}
function Stop-DevServicePorts {
  foreach ($port in @(3000, 3001, 3002, 3009)) {
    Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue |
      ForEach-Object {
        $procId = $_.OwningProcess
        if ($procId -and $procId -ne 0) {
          Write-Host ("Stopping port " + $port + " (PID " + $procId + ")") -ForegroundColor DarkYellow
          Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
        }
      }
  }
  Start-Sleep -Seconds 2
}

function Start-DevService([string]$ScriptName, [string]$LogFile) {
  $logPath = Join-Path $RepoRoot $LogFile
  $logsDir = Split-Path $logPath -Parent
  if (-not (Test-Path $logsDir)) { New-Item -ItemType Directory -Path $logsDir | Out-Null }
  if (Test-Path $logPath) { Remove-Item $logPath -Force -ErrorAction SilentlyContinue }

  $cmdLine = "cd /d `"$RepoRoot`" && npx --yes pnpm@9.15.0 $ScriptName > `"$logPath`" 2>&1"
  Start-Process -FilePath "cmd.exe" -ArgumentList @("/c", $cmdLine) -WindowStyle Minimized | Out-Null
  Write-Host ("Started " + $ScriptName + " -> " + $LogFile) -ForegroundColor Green
}

function Wait-HttpOk([string]$Uri, [int]$TimeoutSec) {
  $deadline = (Get-Date).AddSeconds($TimeoutSec)
  while ((Get-Date) -lt $deadline) {
    try {
      $resp = Invoke-WebRequest -Uri $Uri -Method GET -TimeoutSec 15 -UseBasicParsing
      if ($resp.StatusCode -ge 200 -and $resp.StatusCode -lt 300) { return $true }
    } catch {
      # retry
    }
    Start-Sleep -Seconds 3
  }
  return $false
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
    }
  }
}

Write-Step "Phase 1 service bootstrap"
Write-Host ("Repo: " + $RepoRoot)

Write-Step "Stopping existing dev processes on ports 3000-3002, 3009"
Stop-DevServicePorts
Stop-StreamHeavenNodeWorkers

if ($StopOnly) {
  Write-Host "Stop-only mode complete." -ForegroundColor Green
  exit 0
}

if (-not $SkipDocker) {
  Write-Step "Ensuring Docker postgres + redis"
  $dockerOk = [bool](Get-Command docker -ErrorAction SilentlyContinue)
  if ($dockerOk) {
    # Docker writes status lines to stderr; with $ErrorActionPreference Stop that aborts before $LASTEXITCODE is checked.
    $prevEap = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    & docker compose up -d postgres redis 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
      & docker start streamheaven-postgres-1 streamheaven-redis-1 2>&1 | Out-Null
    }
    Start-Sleep -Seconds 5
    & docker compose ps
    $ErrorActionPreference = $prevEap
  } else {
    Write-Warning "Docker CLI not found. Ensure localhost:5432 and :6379 are available."
  }
}

Write-Step "Copy .env.example to .env (if missing)"
Copy-EnvFilesIfMissing

function Start-AndWait-DevService([string]$ScriptName, [string]$LogFile, [string]$HealthUri, [string]$DisplayName) {
  Start-DevService $ScriptName $LogFile
  Write-Host ("Allowing compile/boot for " + $DisplayName + " (30s)...") -ForegroundColor DarkGray
  Start-Sleep -Seconds 30
  Write-Host ("Waiting for " + $HealthUri + " ...")
  if (Wait-HttpOk $HealthUri $HealthTimeoutSec) {
    Write-Host ($DisplayName + " healthy") -ForegroundColor Green
    return $true
  }
  Write-Warning ($DisplayName + " not ready. See " + $LogFile)
  return $false
}

Write-Step "Starting NestJS services (sequential)"
$allOk = $true
if (-not (Start-AndWait-DevService "dev:auth" "logs/dev-auth.log" "http://127.0.0.1:3001/v1/health" "auth")) { $allOk = $false }
if (-not (Start-AndWait-DevService "dev:user" "logs/dev-user.log" "http://127.0.0.1:3002/v1/health" "user")) { $allOk = $false }
if (-not (Start-AndWait-DevService "dev:gateway" "logs/dev-gateway.log" "http://127.0.0.1:3000/health" "gateway")) { $allOk = $false }

Write-Step "Starting realtime + extra health checks"
if ($allOk) {
  Start-DevService "dev:realtime" "logs/dev-realtime.log"
  Write-Host "Allowing compile/boot for realtime (30s)..." -ForegroundColor DarkGray
  Start-Sleep -Seconds 30
}
$extraChecks = @(
  @{ Name = "gateway-aggregate"; Uri = "http://127.0.0.1:3000/health/aggregate" },
  @{ Name = "realtime"; Uri = "http://127.0.0.1:3009/health" }
)
foreach ($c in $extraChecks) {
  if (-not $allOk) { break }
  Write-Host ("Waiting for " + $c.Uri + " ...")
  if (Wait-HttpOk $c.Uri $HealthTimeoutSec) {
    Write-Host ($c.Name + " healthy") -ForegroundColor Green
  } else {
    Write-Warning ($c.Name + " not ready. See logs/dev-*.log")
    $allOk = $false
  }
}

if (-not $allOk) {
  Write-Host ""
  Write-Host "Tail of dev-auth.log:" -ForegroundColor Yellow
  Get-Content (Join-Path $RepoRoot "logs/dev-auth.log") -Tail 15 -ErrorAction SilentlyContinue
  Write-Host ""
  Write-Host "Tail of dev-gateway.log:" -ForegroundColor Yellow
  Get-Content (Join-Path $RepoRoot "logs/dev-gateway.log") -Tail 15 -ErrorAction SilentlyContinue
  exit 1
}

if ($RunSmokeTest) {
  Write-Step "Smoke test"
  $smoke = Join-Path $RepoRoot "scripts/smoke-test-phase1.ps1"
  $authLog = Join-Path $RepoRoot "logs/dev-auth.log"
  if (Test-Path $authLog) {
    & powershell -ExecutionPolicy Bypass -File $smoke -AuthLogPath $authLog
  } else {
    & powershell -ExecutionPolicy Bypass -File $smoke
  }
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

Write-Step "Phase 1 services ready"
exit 0
