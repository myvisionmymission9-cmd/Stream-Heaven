# Install Flutter SDK on Windows (no Git required) and add to user PATH
# Usage: powershell -ExecutionPolicy Bypass -File scripts/install-flutter-windows.ps1

$ErrorActionPreference = "Stop"

$FlutterRoot = "C:\Users\admin\flutter"
$FlutterBin = Join-Path $FlutterRoot "bin"
$BaseUrl = "https://storage.googleapis.com/flutter_infra_release/releases"
$Archive = "stable/windows/flutter_windows_3.44.0-stable.zip"
$ZipUrl = "$BaseUrl/$Archive"
$RepoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$RepoZip = Join-Path $RepoRoot ".tools\flutter_windows.zip"
$ZipPath = Join-Path $env:TEMP "flutter_windows_stable_3440.zip"

function Test-FlutterReady {
  return (Test-Path (Join-Path $FlutterBin "flutter.bat"))
}

function Test-ZipValid([string]$Path) {
  try {
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $z = [System.IO.Compression.ZipFile]::OpenRead($Path)
    $z.Dispose()
    return $true
  } catch {
    return $false
  }
}

function Wait-RepoZipReady([string]$Path, [int]$MinMb = 950) {
  Write-Host "Waiting for Flutter archive (target ~$MinMb MB)..." -ForegroundColor DarkGray
  $stableCount = 0
  $last = -1
  while ($true) {
    if (-not (Test-Path $Path)) {
      Start-Sleep -Seconds 10
      continue
    }
    $mb = [math]::Round((Get-Item $Path).Length / 1MB, 1)
    Write-Host "  Download: $mb MB"
    $size = (Get-Item $Path).Length
    if ($size -ge ($MinMb * 1MB) -and (Test-ZipValid $Path)) { return $true }
    if ($size -eq $last) { $stableCount++ } else { $stableCount = 0; $last = $size }
    if ($stableCount -ge 4 -and (Test-ZipValid $Path)) { return $true }
    if ($stableCount -ge 4 -and $size -lt (100 * 1MB)) { return $false }
    Start-Sleep -Seconds 15
  }
}

if (Test-FlutterReady) {
  Write-Host "Flutter already installed at $FlutterRoot" -ForegroundColor Green
} else {
  if (Test-Path $RepoZip) {
    Remove-Item $RepoZip -Force -ErrorAction SilentlyContinue
  }
  if (Test-Path $ZipPath) {
    Remove-Item $ZipPath -Force -ErrorAction SilentlyContinue
  }
  Write-Host "Downloading Flutter 3.44.0 stable (~1 GB) to $ZipPath ..." -ForegroundColor Cyan
  Write-Host $ZipUrl
  if (Get-Command curl.exe -ErrorAction SilentlyContinue) {
    & curl.exe -L --retry 5 --retry-delay 3 -o $ZipPath $ZipUrl
    if ($LASTEXITCODE -ne 0) { throw "curl download failed with exit code $LASTEXITCODE" }
  } else {
    Invoke-WebRequest -Uri $ZipUrl -OutFile $ZipPath -UseBasicParsing
  }
  if (-not (Test-ZipValid $ZipPath)) {
    throw "Downloaded Flutter archive is invalid: $ZipPath"
  }

  if (Test-Path $FlutterRoot) {
    cmd /c "rmdir /s /q `"$FlutterRoot`"" 2>$null | Out-Null
    if (Test-Path $FlutterRoot) {
      Remove-Item $FlutterRoot -Recurse -Force -ErrorAction SilentlyContinue
    }
  }
  New-Item -ItemType Directory -Path (Split-Path $FlutterRoot -Parent) -Force | Out-Null

  if (-not (Test-ZipValid $ZipPath)) {
    throw "Flutter archive is incomplete or corrupt: $ZipPath"
  }

  Write-Host "Extracting..." -ForegroundColor Cyan
  Expand-Archive -Path $ZipPath -DestinationPath (Split-Path $FlutterRoot -Parent) -Force
  if ($ZipPath -ne $RepoZip) {
    Remove-Item $ZipPath -Force -ErrorAction SilentlyContinue
  }

  if (-not (Test-FlutterReady)) {
    throw "Flutter extract failed: bin/flutter.bat not found under $FlutterRoot"
  }
  Write-Host "Flutter extracted to $FlutterRoot" -ForegroundColor Green
}

# Session PATH
$env:PATH = "$FlutterBin;" + $env:PATH

# Persist for user
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$FlutterBin*") {
  [Environment]::SetEnvironmentVariable("Path", "$FlutterBin;$userPath", "User")
  Write-Host "Added Flutter to user PATH" -ForegroundColor Green
}

& "$FlutterBin\flutter.bat" config --no-analytics
& "$FlutterBin\flutter.bat" doctor -v
& "$FlutterBin\flutter.bat" precache --windows

Write-Host "Flutter install complete." -ForegroundColor Green
