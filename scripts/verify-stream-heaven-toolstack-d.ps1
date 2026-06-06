# Verify Stream Heaven D: drive tool stack
# Exit 0 = core requirements met; exit 1 = one or more failures

param(
  [string]$DriveLetter = 'D'
)

$ErrorActionPreference = 'Continue'
$failures = @()
$warnings = @()

$InstallRoot = "${DriveLetter}:\StreamHeaven\tools"
$NpmGlobal = Join-Path $InstallRoot 'npm-global'
$DevToolsGit = "${DriveLetter}:\Dev\tools\Git\cmd"
$DevToolsGh = "${DriveLetter}:\Dev\tools\gh"

function Add-Failure($msg) {
  Write-Host "[FAIL] $msg" -ForegroundColor Red
  $script:failures += $msg
}

function Add-Warn($msg) {
  Write-Host "[WARN] $msg" -ForegroundColor Yellow
  $script:warnings += $msg
}

function Add-Pass($msg) {
  Write-Host "[OK] $msg" -ForegroundColor Green
}

function Test-Cmd([string]$Name, [string]$Label, [switch]$Required) {
  if (Get-Command $Name -ErrorAction SilentlyContinue) {
    try {
      $ver = & $Name --version 2>&1 | Select-Object -First 1
      Add-Pass "$Label`: $ver"
      return $true
    }
    catch {
      Add-Pass "$Label`: present"
      return $true
    }
  }
  if ($Required) { Add-Failure "$Label not found ($Name)" }
  else { Add-Warn "$Label not found ($Name)" }
  return $false
}

Write-Host "=== Stream Heaven D: toolstack verification ===" -ForegroundColor Cyan

# Drive
$drive = Get-PSDrive -Name $DriveLetter -ErrorAction SilentlyContinue
if (-not $drive) {
  Add-Failure "Drive ${DriveLetter}: not found"
}
else {
  $freeGb = [math]::Round($drive.Free / 1GB, 1)
  Add-Pass "Drive ${DriveLetter}: ${freeGb} GB free"
}

# Paths
foreach ($p in @($InstallRoot, "${DriveLetter}:\StreamHeaven\logs", "${DriveLetter}:\StreamHeaven\config")) {
  if (Test-Path $p) { Add-Pass "Exists: $p" }
  else { Add-Warn "Missing: $p (run install script)" }
}

# PATH helpers
if ($env:PATH -notlike "*$NpmGlobal*" -and (Test-Path $NpmGlobal)) {
  $env:PATH = "$NpmGlobal;$env:PATH"
}
if (Test-Path $DevToolsGit) { $env:PATH = "$DevToolsGit;$env:PATH" }
if (Test-Path $DevToolsGh) { $env:PATH = "$DevToolsGh;$env:PATH" }

# Core tools (required)
Test-Cmd 'node' 'Node.js' -Required | Out-Null
Test-Cmd 'git' 'Git' -Required | Out-Null
Test-Cmd 'gh' 'GitHub CLI' -Required | Out-Null
Test-Cmd 'npm' 'npm' -Required | Out-Null

# Infra (warn if missing)
Test-Cmd 'docker' 'Docker' | Out-Null
Test-Cmd 'aws' 'AWS CLI' | Out-Null

# npm prefix on D:
if (Get-Command npm -ErrorAction SilentlyContinue) {
  $prefix = (npm config get prefix 2>$null).Trim()
  if ($prefix -like "${DriveLetter}:*") {
    Add-Pass "npm prefix on ${DriveLetter}: $prefix"
  }
  else {
    Add-Warn "npm prefix not on ${DriveLetter}: (current: $prefix)"
  }
}

# Optional CLIs
Test-Cmd 'firebase' 'Firebase CLI' | Out-Null
if (-not (Test-Cmd 'wrangler' 'Wrangler')) {
  if (Get-Command 'npx' -ErrorAction SilentlyContinue) {
    $w = npx wrangler --version 2>&1 | Select-Object -First 1
    if ($LASTEXITCODE -eq 0) { Add-Pass "Wrangler via npx: $w" }
  }
}

# Docker containers (Phase 1)
if (Get-Command docker -ErrorAction SilentlyContinue) {
  $prev = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  $ps = docker compose ps 2>&1 | Out-String
  $ErrorActionPreference = $prev
  if ($ps -match 'postgres' -and $ps -match 'redis') {
    Add-Pass 'Postgres/Redis compose services listed'
  }
  else {
    Add-Warn 'Postgres/Redis not running - run setup-phase1.ps1 or docker compose up -d postgres redis'
  }
}

# Config artifacts
$checklist = "${DriveLetter}:\StreamHeaven\config\saas-checklist.md"
if (Test-Path $checklist) { Add-Pass 'saas-checklist.md present' }
else { Add-Warn 'saas-checklist.md missing' }

Write-Host ""
Write-Host "Failures: $($failures.Count) | Warnings: $($warnings.Count)" -ForegroundColor Cyan

if ($failures.Count -gt 0) {
  exit 1
}
exit 0
