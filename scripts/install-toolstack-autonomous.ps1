# Stream Heaven - autonomous D: toolstack pipeline (diagnose -> install -> verify)
# Usage: powershell -ExecutionPolicy Bypass -File scripts/install-toolstack-autonomous.ps1

param(
  [string]$DriveLetter = 'D',
  [ValidateSet('all', 'prerequisites', 'core', 'infra', 'optional')]
  [string]$Phase = 'all',
  [switch]$SkipInstall,
  [switch]$SkipVerify
)

$ErrorActionPreference = 'Stop'
$RepoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $RepoRoot

$LogDir = "${DriveLetter}:\StreamHeaven\logs"
$LogFile = Join-Path $LogDir 'toolstack-install.log'

function Write-Banner([string]$Title) {
  Write-Host ""
  Write-Host "=== $Title ===" -ForegroundColor Cyan
}

Write-Banner 'Diagnose'
$drive = Get-PSDrive -Name $DriveLetter -ErrorAction SilentlyContinue
if (-not $drive) {
  Write-Host "[FAIL] Drive ${DriveLetter}: not found" -ForegroundColor Red
  exit 1
}
$freeGb = [math]::Round($drive.Free / 1GB, 1)
Write-Host "Drive ${DriveLetter}: ${freeGb} GB free"

@('node', 'git', 'gh', 'docker', 'aws', 'winget') | ForEach-Object {
  $cmd = $_
  if (Get-Command $cmd -ErrorAction SilentlyContinue) {
    $ver = try { & $cmd --version 2>&1 | Select-Object -First 1 } catch { 'ok' }
    Write-Host "[OK] $cmd : $ver" -ForegroundColor Green
  }
  else {
    Write-Host "[--] $cmd : not installed" -ForegroundColor DarkGray
  }
}

if (-not $SkipInstall) {
  Write-Banner 'Install'
  $installScript = Join-Path $RepoRoot 'scripts/install-stream-heaven-toolstack-d-drive.ps1'
  if (-not (Test-Path $installScript)) {
    $installScript = Join-Path $RepoRoot 'scripts/install-stream-heaven-toolstack-d.ps1'
  }
  & powershell -ExecutionPolicy Bypass -File $installScript `
    -Phase $Phase -DriveLetter $DriveLetter -SkipAlreadyInstalled:$true
  if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARN] Install script exit $LASTEXITCODE - see $LogFile" -ForegroundColor Yellow
  }
}

if (-not $SkipVerify) {
  Write-Banner 'Verify'
  & powershell -ExecutionPolicy Bypass -File (Join-Path $RepoRoot 'scripts/verify-stream-heaven-toolstack-d.ps1') `
    -DriveLetter $DriveLetter
  exit $LASTEXITCODE
}

exit 0
