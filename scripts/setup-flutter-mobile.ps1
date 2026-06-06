#Requires -Version 5.1
<#
.SYNOPSIS
  Bootstrap Flutter platform folders and resolve pub dependencies for apps/mobile.
#>
$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$mobileDir = Join-Path $repoRoot "apps\mobile"

Write-Host "Stream Heaven - Flutter mobile setup" -ForegroundColor Cyan
Write-Host "Target: $mobileDir"

$repoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$repoFlutter = Join-Path $repoRoot ".tools\flutter\bin\flutter.bat"
$userFlutter = Join-Path $env:USERPROFILE "flutter\bin\flutter.bat"
$flutterCmd = if (Get-Command flutter -ErrorAction SilentlyContinue) {
  "flutter"
} elseif (Test-Path $userFlutter) {
  $userFlutter
} elseif (Test-Path $repoFlutter) {
  $repoFlutter
} else {
  $null
}
if ($flutterCmd -and $flutterCmd -ne "flutter") {
  $flutterBin = Split-Path $flutterCmd -Parent
  $env:PATH = "$flutterBin;$env:PATH"
}

if (-not $flutterCmd) {
  Write-Host ""
  Write-Host "Flutter CLI not found in PATH." -ForegroundColor Yellow
  Write-Host "Install Flutter 3.24+ from https://docs.flutter.dev/get-started/install"
  Write-Host "Or run setup-phase2a.ps1 (downloads SDK to .tools/flutter when needed)."
  Write-Host ""
  Write-Host "Source files are ready; run 'flutter pub get && flutter run' after installing Flutter."
  exit 1
}

Push-Location $mobileDir
try {
  $hasAndroidProject = (Test-Path "android/app/build.gradle") -or (Test-Path "android/app/build.gradle.kts")
  if (-not $hasAndroidProject) {
    Write-Host "Creating Android/iOS platform folders..." -ForegroundColor Green
    & $flutterCmd create . --org com.streamheaven --project-name stream_heaven_mobile
  } else {
    Write-Host "Platform folders exist - skipping flutter create." -ForegroundColor DarkGray
  }

  Write-Host "Resolving dependencies..." -ForegroundColor Green
  & $flutterCmd pub get

  Write-Host "Running analyzer..." -ForegroundColor Green
  & $flutterCmd analyze
} finally {
  Pop-Location
}

Write-Host ""
Write-Host "Done. Run from repo root: pnpm dev:flutter" -ForegroundColor Green
