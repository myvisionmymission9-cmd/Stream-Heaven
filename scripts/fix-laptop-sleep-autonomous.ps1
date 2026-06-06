# Autonomous laptop sleep fix entry point (non-interactive).
# Chains: non-admin powercfg -> admin script (if elevated) -> optional reboot -> verify.
# Usage: powershell -ExecutionPolicy Bypass -File scripts/fix-laptop-sleep-autonomous.ps1
# Optional: -ScheduleReboot (default $true), -RebootDelaySeconds 120, -SkipWinget

param(
    [bool]$ScheduleReboot = $true,
    [int]$RebootDelaySeconds = 120,
    [switch]$SkipWinget
)

$ErrorActionPreference = 'Continue'
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

Write-Host '=== Autonomous laptop sleep fix ===' -ForegroundColor Cyan

# --- Non-admin powercfg (safe AC fixes) ---
Write-Host ''
Write-Host '--- Non-admin powercfg ---' -ForegroundColor Cyan
powercfg /change monitor-timeout-ac 30
powercfg /change standby-timeout-ac 0
powercfg /change hibernate-timeout-ac 0
powercfg /change monitor-timeout-dc 15
powercfg /change standby-timeout-dc 30
powercfg /change hibernate-timeout-dc 0
powercfg /SETACVALUEINDEX SCHEME_CURRENT SUB_BUTTONS LIDACTION 0
powercfg /SETDCVALUEINDEX SCHEME_CURRENT SUB_BUTTONS LIDACTION 0
powercfg /SETACVALUEINDEX SCHEME_CURRENT SUB_SLEEP HYBRIDSLEEP 0
powercfg /SETDCVALUEINDEX SCHEME_CURRENT SUB_SLEEP HYBRIDSLEEP 0
powercfg /SETACTIVE SCHEME_CURRENT
Write-Host '[OK] Non-admin powercfg applied'

# --- Admin script (if already elevated) ---
$adminScript = Join-Path $PSScriptRoot 'fix-laptop-sleep-admin.ps1'
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole(
    [Security.Principal.WindowsBuiltInRole]::Administrator
)

if ($isAdmin -and (Test-Path $adminScript)) {
    Write-Host ''
    Write-Host '--- Admin fixes (elevated session) ---' -ForegroundColor Cyan
    & $adminScript
}
else {
    Write-Host ''
    Write-Host '[WARN] Not elevated - skipping admin script. Run elevated:' -ForegroundColor Yellow
    Write-Host "  powershell -ExecutionPolicy Bypass -File `"$adminScript`""
}

# --- Optional winget driver sweep ---
if (-not $SkipWinget) {
    Write-Host ''
    Write-Host '--- winget upgrade (non-interactive) ---' -ForegroundColor Cyan
    $winget = Get-Command winget -ErrorAction SilentlyContinue
    if ($winget) {
        winget upgrade --all --accept-package-agreements --accept-source-agreements --disable-interactivity 2>&1 |
            Tee-Object -Variable wingetOut | Out-Host
        $hpLines = $wingetOut | Where-Object { $_ -match 'HP|hp|chipset|firmware|BIOS' }
        if ($hpLines) {
            Write-Host '[INFO] HP/chipset related winget output:' -ForegroundColor Cyan
            $hpLines | ForEach-Object { Write-Host "  $_" }
        }
        $hpSa = winget list --id HPInc.HPSupportAssistant --accept-source-agreements 2>&1
        if ($hpSa -match 'HPInc.HPSupportAssistant') {
            Write-Host '[OK] HP Support Assistant installed'
        }
        else {
            Write-Host '[INFO] Installing HP Support Assistant via winget...'
            winget install --id HPInc.HPSupportAssistant --accept-package-agreements --accept-source-agreements --disable-interactivity 2>&1 | Out-Host
        }
    }
    else {
        Write-Host '[WARN] winget not found - skip driver sweep'
    }
}

# --- Schedule reboot ---
if ($ScheduleReboot) {
    Write-Host ''
    Write-Host '--- Reboot schedule ---' -ForegroundColor Cyan
    $msg = 'Sleep fixes applied'
    $result = shutdown /r /t $RebootDelaySeconds /c $msg 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Reboot scheduled in $RebootDelaySeconds seconds: $msg"
        Write-Host '     Cancel with: shutdown /a'
    }
    else {
        Write-Host "[FAIL] Could not schedule reboot: $result" -ForegroundColor Red
        Write-Host '       Manual reboot required - only unavoidable step if policy blocks shutdown.'
    }
}

# --- Verify ---
$verifyScript = Join-Path $PSScriptRoot 'verify-laptop-sleep-fix.ps1'
if (Test-Path $verifyScript) {
    Write-Host ''
    Write-Host '--- Verification ---' -ForegroundColor Cyan
    & $verifyScript
    exit $LASTEXITCODE
}

exit 0
