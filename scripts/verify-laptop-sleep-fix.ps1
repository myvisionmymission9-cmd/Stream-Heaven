# Verify laptop sleep/power fixes are healthy.
# Exit 0 = all checks pass; exit 1 = one or more failures.
# Run without elevation for read-only checks; admin fixes require prior fix-laptop-sleep-admin.ps1.

$ErrorActionPreference = 'Continue'
$failures = @()

function Add-Failure($msg) {
    Write-Host "[FAIL] $msg" -ForegroundColor Red
    $script:failures += $msg
}

function Add-Pass($msg) {
    Write-Host "[OK] $msg" -ForegroundColor Green
}

Write-Host "=== Laptop sleep fix verification ===" -ForegroundColor Cyan

# HiberbootEnabled (Fast Startup)
try {
    $hb = (Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager\Power' -Name HiberbootEnabled -ErrorAction Stop).HiberbootEnabled
    if ($hb -eq 0) { Add-Pass "HiberbootEnabled=0 (Fast Startup off)" }
    else { Add-Failure "HiberbootEnabled=$hb (expected 0)" }
}
catch {
    Add-Failure "HiberbootEnabled: $($_.Exception.Message)"
}

# Hibernate status
$hibOut = powercfg /a 2>&1 | Out-String
if ($hibOut -match 'Hibernate has not been enabled' -or $hibOut -notmatch 'Hibernate') {
    Add-Pass "Hibernate disabled (powercfg /a)"
}
else {
    $hibDetail = powercfg /availablesleepstates 2>&1 | Out-String
    if ($hibDetail -match 'Hibernate' -and $hibDetail -notmatch 'Hibernate has not been enabled') {
        Add-Failure "Hibernate still available - run powercfg /h off (admin)"
    }
    else {
        Add-Pass "Hibernate not active"
    }
}

# PlatformAoAcOverride
try {
    $aoac = Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\Power' -Name PlatformAoAcOverride -ErrorAction SilentlyContinue
    if ($null -eq $aoac -or $aoac.PlatformAoAcOverride -eq 0) {
        Add-Pass "PlatformAoAcOverride=0 or absent"
    }
    else {
        Add-Failure "PlatformAoAcOverride=$($aoac.PlatformAoAcOverride) (expected 0)"
    }
}
catch {
    Add-Pass "PlatformAoAcOverride key absent (acceptable)"
}

# Hybrid sleep off on AC
$hybrid = powercfg /query SCHEME_CURRENT SUB_SLEEP HYBRIDSLEEP 2>&1 | Out-String
if ($hybrid -match 'Current AC Power Setting Index:\s*0x00000000') {
    Add-Pass "Hybrid sleep off on AC"
}
else {
    Add-Failure "Hybrid sleep not off on AC"
}

# Lid close action on AC (0 = do nothing)
$lid = powercfg /query SCHEME_CURRENT SUB_BUTTONS LIDACTION 2>&1 | Out-String
if ($lid -match 'Current AC Power Setting Index:\s*0x00000000') {
    Add-Pass "Lid close = Do nothing on AC"
}
else {
    Add-Failure "Lid close action not Do nothing on AC"
}

# Recent unexpected shutdown events (last 24h)
$since = (Get-Date).AddHours(-24)
try {
    $e41 = @(Get-WinEvent -FilterHashtable @{ LogName = 'System'; Id = 41; StartTime = $since } -MaxEvents 50 -ErrorAction SilentlyContinue)
    $e6008 = @(Get-WinEvent -FilterHashtable @{ LogName = 'System'; Id = 6008; StartTime = $since } -MaxEvents 50 -ErrorAction SilentlyContinue)
    $count41 = $e41.Count
    $count6008 = $e6008.Count
    Write-Host "[INFO] Event 41 (last 24h): $count41 | Event 6008 (last 24h): $count6008"
    if ($count41 -gt 0) {
        Add-Failure "Event 41 count in last 24h: $count41 (unclean shutdown - monitor after reboot)"
    }
    else {
        Add-Pass "No Event 41 in last 24h"
    }
}
catch {
    Write-Host "[WARN] Could not query System log: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""
if ($failures.Count -eq 0) {
    Write-Host "=== HEALTHY (exit 0) ===" -ForegroundColor Green
    exit 0
}

Write-Host "=== UNHEALTHY ($($failures.Count) issue(s), exit 1) ===" -ForegroundColor Red
$failures | ForEach-Object { Write-Host "  - $_" }
exit 1
