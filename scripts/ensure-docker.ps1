# Stream Heaven - Docker Desktop health check (Windows)
# Usage: powershell -ExecutionPolicy Bypass -File scripts/ensure-docker.ps1

$ErrorActionPreference = "Continue"

function Write-Ok([string]$Message) {
  Write-Host ("[OK] " + $Message) -ForegroundColor Green
}

function Write-Fail([string]$Message) {
  Write-Host ("[FAIL] " + $Message) -ForegroundColor Red
}

function Write-Info([string]$Message) {
  Write-Host ("[INFO] " + $Message) -ForegroundColor Cyan
}

function Write-DockerEngineManualSteps([string]$Reason) {
  Write-Fail $Reason
  Write-Host @"

Manual steps (Docker Desktop not ready):
  1. Open Docker Desktop from the Start menu (search "Docker Desktop")
  2. Wait until the whale icon in the system tray shows "Engine running"
     - If you see HTTP 500 or "Cannot connect to the Docker daemon", the engine is still starting or crashed
  3. If it stays stuck: Docker Desktop -> Troubleshoot -> Restart Docker Desktop
  4. Verify: pnpm run docker:ensure
  5. Then: pnpm run docker:up
  6. Full Phase 1: pnpm run phase1:complete

"@
}

Write-Info "Checking Docker Desktop availability..."

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
  Write-Fail "Docker CLI not found."
  Write-Host @"

Manual steps:
  1. Install Docker Desktop for Windows: https://docs.docker.com/desktop/setup/install/windows-install/
  2. Start Docker Desktop and wait until the whale icon shows "Running"
  3. Re-run: pnpm run docker:ensure

"@
  exit 1
}

Write-Ok ("Docker CLI: " + (docker --version))

$info = docker info 2>&1 | Out-String
if ($LASTEXITCODE -ne 0) {
  Write-Host $info

  Write-Info "Probing docker compose ps (helps diagnose HTTP 500)..."
  $composePs = docker compose ps 2>&1 | Out-String
  if ($composePs) { Write-Host $composePs }

  $engineDown = ($info + $composePs) -match "500|Internal Server Error|Cannot connect to the Docker daemon|error during connect|request returned 500"
  if ($engineDown) {
    Write-DockerEngineManualSteps "Docker engine returned an error (often HTTP 500 while Docker Desktop is stopped or starting)."
  } else {
    Write-DockerEngineManualSteps "Docker engine is not running."
  }
  exit 1
}

Write-Ok "Docker engine is running."

Write-Info "Verifying docker compose ps..."
$composePsOk = docker compose ps 2>&1 | Out-String
if ($LASTEXITCODE -ne 0) {
  Write-Host $composePsOk
  if ($composePsOk -match "500|Internal Server Error|request returned 500") {
    Write-DockerEngineManualSteps "docker compose ps returned HTTP 500 (engine not fully ready)."
  } else {
    Write-Fail "docker compose ps failed."
  }
  exit 1
}

Write-Ok "docker compose ps succeeded."

$compose = docker compose version 2>&1 | Out-String
if ($LASTEXITCODE -ne 0) {
  Write-Fail "Docker Compose plugin unavailable."
  Write-Host $compose
  exit 1
}

Write-Ok ("Compose: " + ($compose.Trim()))
Write-Info "Ready for: pnpm run docker:up"
exit 0
