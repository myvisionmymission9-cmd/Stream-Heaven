# Stream Heaven Phase 2a autonomous bootstrap (Windows)
# Usage: powershell -ExecutionPolicy Bypass -File scripts/phase2a-bootstrap.ps1
#        pnpm run phase2a:start
#        pnpm run phase2a:start -- -SkipFlutter -SkipChrome

param(
  [switch]$SkipFlutter,
  [switch]$SkipChrome,
  [switch]$SkipPhase1,
  [switch]$RunSmoke,
  [switch]$SkipAnalyze
)

$ErrorActionPreference = "Continue"
$RepoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $RepoRoot

$script:FailCount = 0
$script:PassCount = 0
$script:WarnCount = 0

function Write-CheckHeader([string]$Name) {
  Write-Host ""
  Write-Host ("=== " + $Name + " ===") -ForegroundColor Cyan
}

function Invoke-Check([string]$Name, [scriptblock]$Block, [switch]$Critical) {
  Write-CheckHeader $Name
  $prev = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  try {
    & $Block
    $code = $LASTEXITCODE
    if ($null -eq $code) { $code = 0 }
  } catch {
    Write-Host $_.Exception.Message -ForegroundColor Red
    $code = 1
  } finally {
    $ErrorActionPreference = $prev
  }

  if ($code -eq 0) {
    Write-Host ("PASS: " + $Name) -ForegroundColor Green
    $script:PassCount++
  } elseif ($Critical) {
    Write-Host ("FAIL (critical): " + $Name) -ForegroundColor Red
    $script:FailCount++
  } else {
    Write-Host ("WARN (non-critical): " + $Name) -ForegroundColor Yellow
    $script:WarnCount++
  }
  return $code
}

function Ensure-FlutterOnPath {
  $userFlutter = Join-Path $env:USERPROFILE "flutter\bin\flutter.bat"
  if (Test-Path $userFlutter) {
    $env:Path = "$(Split-Path $userFlutter -Parent);$env:Path"
  }
  if (-not (Get-Command flutter -ErrorAction SilentlyContinue)) {
    throw "Flutter not on PATH. Run scripts/install-flutter-windows.ps1 and open a new terminal."
  }
}

Write-Host "Stream Heaven Phase 2a Autonomous Bootstrap" -ForegroundColor White
Write-Host ("Repo: " + $RepoRoot)
Write-Host "Agent: ai-agents/phase-2a/phase-2a-autonomous-bootstrap-agent.md"

if (-not $SkipPhase1) {
  $phase1Args = @("-SkipDocker")
  if ($RunSmoke) { $phase1Args += "-RunSmokeTest" }
  Invoke-Check "phase1-services" {
    & powershell -ExecutionPolicy Bypass -File (Join-Path $RepoRoot "scripts\phase1-start-services.ps1") @phase1Args
  } | Out-Null
}

Invoke-Check "gateway-health" {
  $health = Invoke-RestMethod -Uri "http://127.0.0.1:3000/health/aggregate" -TimeoutSec 15
  if ($health.status -ne "ready") {
    Write-Host ("Aggregate status: " + $health.status) -ForegroundColor Yellow
    $global:LASTEXITCODE = 1
    return
  }
  Write-Host ("Gateway ready: " + ($health | ConvertTo-Json -Compress)) -ForegroundColor Green
  $global:LASTEXITCODE = 0
} -Critical | Out-Null

if (-not $SkipFlutter) {
  $setupArgs = @()
  if ($SkipFlutter) { $setupArgs += "-SkipFlutter" }
  Invoke-Check "setup-phase2a" {
    & powershell -ExecutionPolicy Bypass -File (Join-Path $RepoRoot "scripts\setup-phase2a.ps1") @setupArgs
  } | Out-Null

  Invoke-Check "flutter-pub-get" {
    Ensure-FlutterOnPath
    Push-Location (Join-Path $RepoRoot "apps\mobile")
    try {
      flutter pub get
    } finally {
      Pop-Location
    }
  } -Critical | Out-Null

  if (-not $SkipAnalyze) {
    Invoke-Check "flutter-analyze" {
      Ensure-FlutterOnPath
      Push-Location (Join-Path $RepoRoot "apps\mobile")
      try {
        flutter analyze
      } finally {
        Pop-Location
      }
    } -Critical | Out-Null

    Invoke-Check "flutter-test" {
      Ensure-FlutterOnPath
      Push-Location (Join-Path $RepoRoot "apps\mobile")
      try {
        flutter test
      } finally {
        Pop-Location
      }
    } -Critical | Out-Null
  }
} else {
  Write-CheckHeader "setup-phase2a (skipped -SkipFlutter)"
  Write-Host "Skipped Flutter setup and analyze/test." -ForegroundColor Yellow
}

if (-not $SkipChrome) {
  Write-CheckHeader "flutter-chrome (optional)"
  Write-Host "flutter run stays in the foreground; Chrome opens a browser window." -ForegroundColor Yellow
  Write-Host "Headless CI cannot complete OTP without user click. Launch manually:" -ForegroundColor Yellow
  Write-Host "  pnpm run dev:flutter:chrome" -ForegroundColor Green
  Write-Host "Or: cd apps/mobile && flutter run -d chrome --dart-define=API_BASE_URL=http://127.0.0.1:3000" -ForegroundColor Green
  $script:WarnCount++
} else {
  Write-CheckHeader "flutter-chrome (skipped)"
}

Write-Host ""
Write-Host ("Summary: PASS=" + $script:PassCount + " FAIL=" + $script:FailCount + " WARN=" + $script:WarnCount) -ForegroundColor White
if ($script:FailCount -gt 0) { exit 1 }
exit 0
