# Stream Heaven Phase 2a setup (Flutter mobile + realtime smoke)
# Usage: powershell -ExecutionPolicy Bypass -File scripts/setup-phase2a.ps1

param(
  [switch]$SkipFlutter,
  [switch]$SkipRealtimeSmoke
)

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $RepoRoot

function Write-Step([string]$Message) {
  Write-Host ""
  Write-Host ("==> " + $Message) -ForegroundColor Cyan
}

function Ensure-FlutterSdk {
  $userFlutter = Join-Path $env:USERPROFILE "flutter\bin\flutter.bat"
  if (Test-Path $userFlutter) {
    $env:Path = "$(Split-Path $userFlutter -Parent);$env:Path"
    return
  }
  if (Get-Command flutter -ErrorAction SilentlyContinue) { return }
  $installScript = Join-Path $RepoRoot "scripts\install-flutter-windows.ps1"
  if (Test-Path $installScript) {
    & powershell -ExecutionPolicy Bypass -File $installScript
    if (Test-Path $userFlutter) {
      $env:Path = "$(Split-Path $userFlutter -Parent);$env:Path"
      return
    }
  }
  throw "Flutter SDK not installed. Run: scripts/install-flutter-windows.ps1"
}

Write-Step "Phase 2a - verify Phase 1 backend"
try {
  $health = Invoke-RestMethod -Uri "http://localhost:3000/health/aggregate" -TimeoutSec 10
  if ($health.status -ne "ready") {
    Write-Warning "Gateway aggregate status: $($health.status). Start Phase 1 first."
    Write-Host "Run: powershell -ExecutionPolicy Bypass -File scripts/setup-phase1.ps1 -StartServices"
    exit 1
  }
  Write-Host "Phase 1 backend ready" -ForegroundColor Green
} catch {
  Write-Host "Phase 1 not reachable at http://localhost:3000" -ForegroundColor Red
  Write-Host "Run: powershell -ExecutionPolicy Bypass -File scripts/setup-phase1.ps1 -StartServices"
  exit 1
}

if (-not $SkipRealtimeSmoke) {
  Write-Step "Socket.IO smoke test (JWT -> ping/pong)"
  node scripts/smoke-test-realtime.mjs
  if ($LASTEXITCODE -ne 0) { throw "Realtime smoke test failed" }
}

if (-not $SkipFlutter) {
  Write-Step "Flutter SDK"
  try {
    Ensure-FlutterSdk
  } catch {
    Write-Warning "Flutter SDK download failed: $_"
  }
  Write-Step "Flutter mobile setup"
  & powershell -ExecutionPolicy Bypass -File (Join-Path $RepoRoot "scripts\setup-flutter-mobile.ps1")
  if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Flutter setup skipped or failed (install Flutter 3.24+ to run the app)." -ForegroundColor Yellow
    Write-Host "Docs: docs/PHASE-2A-FLUTTER-GUIDE.md"
  } else {
    Write-Host ""
    $freeGb = (Get-PSDrive C).Free / 1GB
    if ($freeGb -lt 10) {
      Write-Host "Low disk on C: ($([math]::Round($freeGb,1)) GB). Prefer: pnpm dev:flutter:chrome" -ForegroundColor Yellow
    } else {
      Write-Host "Run the app: pnpm dev:flutter  (or pnpm dev:flutter:chrome)" -ForegroundColor Green
    }
  }
}

Write-Step "Phase 2a setup finished"
