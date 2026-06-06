# Stream Heaven Phase 1 autonomous completion (Windows)
# Full end-to-end: code checks -> Docker -> migrations -> services -> smoke tests
# Usage: powershell -ExecutionPolicy Bypass -File scripts/phase1-autonomous-complete.ps1
#        pnpm run phase1:complete
#        pnpm run phase1:complete -- -SkipDocker          (code checks only)
#        pnpm run phase1:complete -- -SkipCodeChecks      (runtime/smoke only)

param(
  [switch]$SkipCodeChecks,
  [switch]$SkipDocker,
  [switch]$SkipSmoke,
  [switch]$SkipRealtimeSmoke
)

$ErrorActionPreference = "Continue"
$RepoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $RepoRoot

$script:FailCount = 0
$script:PassCount = 0
$script:WarnCount = 0
$script:ManualSteps = @()

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

Write-Host "Stream Heaven Phase 1 Autonomous Completion" -ForegroundColor White
Write-Host ("Repo: " + $RepoRoot)
Write-Host "Agent: ai-agents/phase-1/phase-1-autonomous-completion-agent.md"

if (-not $SkipCodeChecks) {
  Invoke-Check "typecheck" { Invoke-Pnpm "typecheck" } -Critical | Out-Null
  Invoke-Check "build" { Invoke-Pnpm "build" } -Critical | Out-Null
  Invoke-Check "test" { Invoke-Pnpm "test" } -Critical | Out-Null
  Invoke-Check "lint" { Invoke-Pnpm "lint" } -Critical | Out-Null
  Invoke-Check "contracts:validate" { Invoke-Pnpm "contracts:validate" } -Critical | Out-Null
  Invoke-Check "contracts:generate" { Invoke-Pnpm "contracts:generate" } -Critical | Out-Null
  Invoke-Check "validate-agents" { node scripts/validate-agents.mjs } -Critical | Out-Null
  Invoke-Check "validate-agent-skills" { node scripts/validate-agent-skills.mjs } -Critical | Out-Null
  Invoke-Check "test-golden-agents" { node scripts/test-golden-agents.mjs } -Critical | Out-Null
}

$script:DockerOk = $false

if ($SkipDocker) {
  Write-Host ""
  Write-Host "=== docker-health ===" -ForegroundColor Cyan
  Write-Host "SKIP: Docker/runtime checks skipped (-SkipDocker). Code-only validation path." -ForegroundColor Yellow
} else {
  Invoke-Check "docker-health" {
    & (Join-Path $RepoRoot "scripts/ensure-docker.ps1")
    if ($LASTEXITCODE -eq 0) { $script:DockerOk = $true }
  } | Out-Null
}

if (-not $SkipDocker -and -not $script:DockerOk) {
  $script:ManualSteps += "Start Docker Desktop (wait for Engine running), then re-run: pnpm run phase1:complete"
  Write-Host ""
  Write-Host "Docker section skipped. Code checks above still count toward PASS/FAIL." -ForegroundColor Yellow
} elseif (-not $SkipDocker) {
  Invoke-Check "docker-compose-postgres-redis" {
    Invoke-Pnpm "docker:up"
  } | Out-Null

  Invoke-Check "phase1-setup-migrations" {
    & powershell -ExecutionPolicy Bypass -File (Join-Path $RepoRoot "scripts/setup-phase1.ps1") -SkipInstall -RunMigrations
  } | Out-Null

  if (-not $SkipSmoke) {
    Invoke-Check "phase1-start-services" {
      & powershell -ExecutionPolicy Bypass -File (Join-Path $RepoRoot "scripts/setup-phase1.ps1") -SkipInstall -SkipDocker -StartServices
    } | Out-Null

    Invoke-Check "smoke-test-phase1" {
      $authLog = Join-Path $RepoRoot "logs/dev-auth.log"
      if (Test-Path $authLog) {
        & powershell -ExecutionPolicy Bypass -File (Join-Path $RepoRoot "scripts/smoke-test-phase1.ps1") -AuthLogPath $authLog
      } else {
        & powershell -ExecutionPolicy Bypass -File (Join-Path $RepoRoot "scripts/smoke-test-phase1.ps1")
      }
    } | Out-Null

    if (-not $SkipRealtimeSmoke) {
      Invoke-Check "smoke-test-realtime" {
        Invoke-Pnpm "smoke:realtime"
      } | Out-Null
    }
  }
}

Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host ("PASS: " + $script:PassCount)
Write-Host ("WARN: " + $script:WarnCount)
Write-Host ("FAIL (critical): " + $script:FailCount)

if ($script:ManualSteps.Count -gt 0) {
  Write-Host ""
  Write-Host "Manual steps required:" -ForegroundColor Yellow
  foreach ($step in $script:ManualSteps) {
    Write-Host ("  - " + $step)
  }
}

if ($script:FailCount -gt 0) {
  Write-Host ""
  Write-Host "Phase 1 completion FAILED. Invoke remediation agent for code fixes." -ForegroundColor Red
  Write-Host "  @ai-agents/phase-1/phase-1-remediation-agent.md"
  Write-Host "  @ai-agents/phase-1/phase-1-autonomous-completion-agent.md"
  exit 1
}

Write-Host ""
if ($script:WarnCount -gt 0 -or $script:ManualSteps.Count -gt 0) {
  Write-Host "Phase 1 completion PASSED with warnings (review Docker/smoke WARN items)." -ForegroundColor Yellow
} else {
  Write-Host "Phase 1 completion PASSED - all checks green." -ForegroundColor Green
}
exit 0
