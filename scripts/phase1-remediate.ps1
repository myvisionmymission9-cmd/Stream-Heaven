# Stream Heaven Phase 1 autonomous remediation runner (Windows)
# Usage: powershell -ExecutionPolicy Bypass -File scripts/phase1-remediate.ps1
#        powershell -ExecutionPolicy Bypass -File scripts/phase1-remediate.ps1 -SkipSmoke

param(
  [switch]$SkipSmoke
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

function Invoke-Pnpm([string]$ScriptName) {
  & npx --yes pnpm@9.15.0 run $ScriptName
  return $LASTEXITCODE
}

Write-Host "Stream Heaven Phase 1 Remediation" -ForegroundColor White
Write-Host ("Repo: " + $RepoRoot)

Invoke-Check "typecheck" { Invoke-Pnpm "typecheck" } -Critical | Out-Null
Invoke-Check "build" { Invoke-Pnpm "build" } -Critical | Out-Null
Invoke-Check "test" { Invoke-Pnpm "test" } -Critical | Out-Null
Invoke-Check "lint" { Invoke-Pnpm "lint" } -Critical | Out-Null
Invoke-Check "contracts:validate" { Invoke-Pnpm "contracts:validate" } -Critical | Out-Null
Invoke-Check "validate-agents" { node scripts/validate-agents.mjs } -Critical | Out-Null
Invoke-Check "validate-agent-skills" { node scripts/validate-agent-skills.mjs } -Critical | Out-Null
Invoke-Check "test-golden-agents" { node scripts/test-golden-agents.mjs } -Critical | Out-Null

Invoke-Check "docker-health" {
  & powershell -ExecutionPolicy Bypass -File (Join-Path $RepoRoot "scripts/ensure-docker.ps1")
} | Out-Null

if (-not $SkipSmoke) {
  Invoke-Check "docker-compose-postgres-redis" {
    & npx --yes pnpm@9.15.0 run docker:up
  } | Out-Null
}

Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host ("PASS: " + $script:PassCount)
Write-Host ("WARN: " + $script:WarnCount)
Write-Host ("FAIL (critical): " + $script:FailCount)

if ($script:FailCount -gt 0) {
  Write-Host ""
  Write-Host "Phase 1 remediation FAILED. Fix critical checks above." -ForegroundColor Red
  Write-Host "Invoke: @ai-agents/phase-1/phase-1-remediation-agent.md"
  exit 1
}

Write-Host ""
Write-Host "Phase 1 remediation PASSED (critical checks green)." -ForegroundColor Green
if ($script:WarnCount -gt 0) {
  Write-Host "Review WARN items - Docker may need manual start." -ForegroundColor Yellow
}
exit 0
