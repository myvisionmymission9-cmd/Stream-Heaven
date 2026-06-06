#Requires -RunAsAdministrator
# One-shot admin fixes for HP laptop sleep/power-off issues.
# Run: Right-click PowerShell -> Run as administrator, then:
#   Set-Location "c:\Users\admin\Desktop\Stream Heaven"
#   .\scripts\fix-laptop-sleep-admin.ps1

$ErrorActionPreference = 'Stop'

Write-Host "=== Laptop sleep admin fixes ===" -ForegroundColor Cyan

# Fast Startup off
Set-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager\Power' `
  -Name HiberbootEnabled -Value 0
Write-Host "[OK] Fast Startup disabled (HiberbootEnabled=0)"

# Hibernate off (reduces sleep/hibernate path conflicts)
powercfg /h off
Write-Host "[OK] Hibernate disabled (powercfg /h off)"

# Modern Standby override (safe on S3-only firmware; no-op if unsupported)
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Power" /v PlatformAoAcOverride /t REG_DWORD /d 0 /f | Out-Null
Write-Host "[OK] PlatformAoAcOverride=0 (if key exists)"

# Re-apply AC scheme fixes
powercfg /change monitor-timeout-ac 30
powercfg /change standby-timeout-ac 0
powercfg /change hibernate-timeout-ac 0
powercfg /SETACVALUEINDEX SCHEME_CURRENT SUB_BUTTONS LIDACTION 0
powercfg /SETACVALUEINDEX SCHEME_CURRENT SUB_SLEEP HYBRIDSLEEP 0
powercfg /SETACTIVE SCHEME_CURRENT
Write-Host "[OK] AC power scheme refreshed"

$hb = (Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager\Power' -Name HiberbootEnabled).HiberbootEnabled
Write-Host "HiberbootEnabled now: $hb"
Write-Host ""
Write-Host "Reboot recommended for changes to fully apply." -ForegroundColor Yellow
