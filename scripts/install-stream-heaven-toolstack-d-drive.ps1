# Stream Heaven — D: drive toolstack installer (canonical entry alias)
# Usage:
#   powershell -ExecutionPolicy Bypass -File scripts/install-stream-heaven-toolstack-d-drive.ps1
#   powershell -ExecutionPolicy Bypass -File scripts/install-stream-heaven-toolstack-d-drive.ps1 -Phase core -SkipAlreadyInstalled
#
# Delegates to install-stream-heaven-toolstack-d.ps1 (same parameters).

param(
  [ValidateSet('all', 'prerequisites', 'core', 'infra', 'optional')]
  [string]$Phase = 'all',
  [string]$DriveLetter = 'D',
  [switch]$SkipAlreadyInstalled,
  [switch]$DryRun
)

$RepoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Target = Join-Path $RepoRoot 'scripts\install-stream-heaven-toolstack-d.ps1'

if (-not (Test-Path $Target)) {
  Write-Error "Missing installer: $Target"
  exit 1
}

& powershell -ExecutionPolicy Bypass -File $Target `
  -Phase $Phase `
  -DriveLetter $DriveLetter `
  -SkipAlreadyInstalled:$SkipAlreadyInstalled `
  -DryRun:$DryRun

exit $LASTEXITCODE
