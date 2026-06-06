# Phase 1 smoke test: OTP -> JWT -> profile via API gateway
# Usage: powershell -ExecutionPolicy Bypass -File scripts/smoke-test-phase1.ps1

param(
  [string]$GatewayBase = "http://localhost:3000",
  [string]$Phone = "+919876543210",
  [string]$AppId = "social",
  [string]$OtpCode = "",
  [string]$AuthLogPath = "",
  [int]$OtpWaitSeconds = 45
)

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

function Wait-Health {
  $uri = ($GatewayBase.TrimEnd("/") + "/health/aggregate")
  $deadline = (Get-Date).AddSeconds(120)
  while ((Get-Date) -lt $deadline) {
    try {
      $h = Invoke-RestMethod -Uri $uri -Method GET -TimeoutSec 5
      Write-Host "Health OK" -ForegroundColor Green
      return $h
    } catch {
      Start-Sleep -Seconds 2
    }
  }
  throw "Gateway not healthy at $uri"
}

function Read-LogContent([string]$Path) {
  if (-not (Test-Path $Path)) { return '' }
  try { return [System.IO.File]::ReadAllText($Path, [System.Text.Encoding]::UTF8) } catch {}
  try { return [System.IO.File]::ReadAllText($Path, [System.Text.Encoding]::Unicode) } catch {}
  return Get-Content $Path -Raw -ErrorAction SilentlyContinue
}

function Get-OtpFromAuthLog([string]$LogPath, [int]$TimeoutSec) {
  if (-not $LogPath) { return $null }
  if (-not [System.IO.Path]::IsPathRooted($LogPath)) {
    $LogPath = Join-Path $RepoRoot $LogPath
  }
  $deadline = (Get-Date).AddSeconds($TimeoutSec)
  while ((Get-Date) -lt $deadline) {
    if (Test-Path $LogPath) {
      $content = Read-LogContent $LogPath
      $matches = [regex]::Matches($content, "\[MOCK SMS\] OTP (\d{6}) ")
      if ($matches.Count -gt 0) {
        return $matches[$matches.Count - 1].Groups[1].Value
      }
    }
    Start-Sleep -Seconds 2
  }
  return $null
}

Wait-Health | Out-Null

$sendBody = @{ phone = $Phone } | ConvertTo-Json
$send = Invoke-RestMethod -Uri ($GatewayBase + "/v1/auth/otp/send") -Method POST -ContentType "application/json" -Headers @{ "X-App-Id" = $AppId } -Body $sendBody

Write-Host ("OTP send requestId: " + $send.requestId)
$requestId = $send.requestId

if (-not $OtpCode -and $send.mockOtpCode) {
  $OtpCode = $send.mockOtpCode
}

if (-not $OtpCode) {
  $OtpCode = Get-OtpFromAuthLog -LogPath $AuthLogPath -TimeoutSec $OtpWaitSeconds
}

if (-not $OtpCode) {
  throw "Could not determine OTP. Pass -OtpCode or -AuthLogPath (auth log with [MOCK SMS] line)."
}

Write-Host ("Using OTP code: " + $OtpCode)

$verifyBody = @{
  phone     = $Phone
  code      = $OtpCode
  requestId = $requestId
} | ConvertTo-Json

$session = Invoke-RestMethod -Uri ($GatewayBase + "/v1/auth/otp/verify") -Method POST -ContentType "application/json" -Headers @{ "X-App-Id" = $AppId } -Body $verifyBody

$accessToken = $session.accessToken
if (-not $accessToken) { throw "No accessToken in verify response" }

Write-Host "JWT obtained" -ForegroundColor Green

$profile = Invoke-RestMethod -Uri ($GatewayBase + "/v1/users/me") -Headers @{ Authorization = "Bearer $accessToken" }

Write-Host "Profile:" -ForegroundColor Green
$profile | ConvertTo-Json -Depth 6
Write-Host "Smoke test passed (OTP -> JWT -> profile)." -ForegroundColor Green
