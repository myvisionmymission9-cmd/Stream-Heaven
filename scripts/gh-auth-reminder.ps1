# Prints one-liner for GitHub CLI browser auth (does not block).
# Usage: powershell -ExecutionPolicy Bypass -File scripts/gh-auth-reminder.ps1

$ghDir = "D:\Dev\tools\gh"
if (Test-Path $ghDir) { $env:PATH = "$ghDir;$env:PATH" }

Write-Host ""
Write-Host "GitHub CLI is not authenticated. Run once in a terminal:" -ForegroundColor Yellow
Write-Host ""
Write-Host '  $env:PATH = "D:\Dev\tools\gh;D:\Dev\tools\Git\cmd;" + $env:PATH; gh auth login' -ForegroundColor Cyan
Write-Host ""
Write-Host "Or set GH_TOKEN / GITHUB_TOKEN and pipe to: gh auth login --with-token" -ForegroundColor DarkGray
Write-Host ""
