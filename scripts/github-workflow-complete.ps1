# Stream Heaven - post-bootstrap GitHub hygiene verification
# Usage: powershell -ExecutionPolicy Bypass -File scripts/github-workflow-complete.ps1
#
# Exit codes:
#   0 = hygiene OK; verification complete or skipped (no auth)
#   1 = GH_TOKEN missing when gh verification required
#   2 = required .github hygiene files missing
#   3 = gh workflow/run verification failed

param(
  [switch]$SkipBootstrap,
  [switch]$RequireAuth,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $RepoRoot

function Write-Step([string]$Message) {
  Write-Host ""
  Write-Host ("==> " + $Message) -ForegroundColor Cyan
}

function Add-GhToPath {
  $ghDir = "D:\Dev\tools\gh"
  if ((Test-Path $ghDir) -and ($env:PATH -notlike "*$ghDir*")) {
    $env:PATH = "$ghDir;$env:PATH"
  }
  $gitDir = "D:\Dev\tools\Git\cmd"
  if ((Test-Path $gitDir) -and ($env:PATH -notlike "*$gitDir*")) {
    $env:PATH = "$gitDir;$env:PATH"
  }
}

function Import-TokenFromEnvLocal {
  if ($env:GH_TOKEN -or $env:GITHUB_TOKEN) { return }
  $envLocal = Join-Path $RepoRoot ".env.local"
  if (-not (Test-Path $envLocal)) { return }
  foreach ($line in Get-Content $envLocal -ErrorAction SilentlyContinue) {
    $t = $line.Trim()
    if ($t -match '^\s*#' -or [string]::IsNullOrWhiteSpace($t)) { continue }
    if ($t -match '^(?:export\s+)?GH_TOKEN\s*=\s*(.+)$') {
      $env:GH_TOKEN = $Matches[1].Trim().Trim('"').Trim("'")
    }
    elseif ($t -match '^(?:export\s+)?GITHUB_TOKEN\s*=\s*(.+)$') {
      $env:GITHUB_TOKEN = $Matches[1].Trim().Trim('"').Trim("'")
    }
  }
}

function Get-GhToken {
  if ($env:GH_TOKEN) { return $env:GH_TOKEN }
  if ($env:GITHUB_TOKEN) { return $env:GITHUB_TOKEN }
  return $null
}

function Test-GhAuthenticated {
  $prev = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  try {
    & gh auth status 2>&1 | Out-Null
    return ($LASTEXITCODE -eq 0)
  } finally {
    $ErrorActionPreference = $prev
  }
}

function Invoke-GhTokenLogin {
  $token = Get-GhToken
  if (-not $token) { return $false }
  Write-Step "Authenticating gh with token from environment"
  $token | & gh auth login --with-token 2>&1 | Out-Null
  return ($LASTEXITCODE -eq 0)
}

$requiredHygiene = @(
  ".github/PULL_REQUEST_TEMPLATE.md",
  ".github/ISSUE_TEMPLATE/bug_report.md",
  ".github/ISSUE_TEMPLATE/feature_request.md",
  ".github/dependabot.yml",
  ".github/CODEOWNERS",
  ".github/workflows/phase1-ci.yml"
)

Write-Step "GitHub workflow completion - Stream Heaven"
Add-GhToPath
Import-TokenFromEnvLocal

Write-Step "Dirty tree check"
$prev = $ErrorActionPreference
$ErrorActionPreference = "Continue"
$status = & git status -sb 2>&1
$ErrorActionPreference = $prev
if ($status) {
  Write-Host $status
}

Write-Step "Hygiene file check"
$missing = @()
foreach ($rel in $requiredHygiene) {
  $full = Join-Path $RepoRoot ($rel -replace '/', '\')
  if (Test-Path $full) {
    Write-Host "  OK  $rel" -ForegroundColor Green
  } else {
    Write-Host "  MISS $rel" -ForegroundColor Yellow
    $missing += $rel
  }
}

if ($missing.Count -gt 0) {
  Write-Host ""
  Write-Host "Missing hygiene files: $($missing -join ', ')" -ForegroundColor Red
  exit 2
}

$hasOrigin = $false
$ErrorActionPreference = "Continue"
$remotes = & git remote -v 2>&1
$ErrorActionPreference = $prev
if ($remotes -match "origin\s+") {
  $hasOrigin = $true
  Write-Step "Remotes"
  Write-Host $remotes
} else {
  Write-Host ""
  Write-Host "No origin remote configured." -ForegroundColor Yellow
  if (-not $SkipBootstrap) {
    $bootstrap = Join-Path $RepoRoot "scripts\github-bootstrap-autonomous.ps1"
    if (Test-Path $bootstrap) {
      Write-Step "Calling github-bootstrap-autonomous.ps1 -SkipPush"
      if ($DryRun) {
        Write-Host "[DryRun] Would run bootstrap with -SkipPush"
      } else {
        & powershell -ExecutionPolicy Bypass -File $bootstrap -SkipPush
        if ($LASTEXITCODE -eq 1) {
          Write-Host "Bootstrap skipped: GH_TOKEN missing (exit 1)" -ForegroundColor Yellow
        }
      }
    }
  }
}

$needGh = $RequireAuth -or $hasOrigin
if (-not $needGh) {
  Write-Step "Skipping gh verification (no origin and -RequireAuth not set)"
  Write-Host "Hygiene OK. Set GH_TOKEN and run bootstrap to link remote." -ForegroundColor Green
  exit 0
}

if (-not (Test-GhAuthenticated)) {
  if (-not (Invoke-GhTokenLogin)) {
    Write-Host ""
    Write-Host "GH_TOKEN or GITHUB_TOKEN required for gh verification (exit 1)" -ForegroundColor Red
    Write-Host "Set token in Windows User env or .env.local, then re-run." -ForegroundColor Yellow
    exit 1
  }
}

Write-Step "git remote -v"
& git remote -v

Write-Step "gh workflow list"
$ErrorActionPreference = "Continue"
& gh workflow list 2>&1
if ($LASTEXITCODE -ne 0) { exit 3 }

Write-Step "gh run list --limit 5"
& gh run list --limit 5 2>&1
if ($LASTEXITCODE -ne 0) { exit 3 }
$ErrorActionPreference = $prev

Write-Host ""
Write-Host "GitHub workflow completion: OK" -ForegroundColor Green
exit 0
