# Install Android SDK (command-line tools) for Flutter on Windows — no Android Studio GUI required
# Usage: powershell -ExecutionPolicy Bypass -File scripts/install-android-sdk-windows.ps1
# Optional: -CleanTemp removes large Flutter installer zips to free disk space

param(
  [switch]$CleanTemp,
  [string]$SdkRoot = "$env:LOCALAPPDATA\Android\Sdk"
)

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

function Write-Step([string]$Message) {
  Write-Host ""
  Write-Host ("==> " + $Message) -ForegroundColor Cyan
}

function Enable-DeveloperMode {
  $key = "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\AppModelUnlock"
  if (-not (Test-Path $key)) {
    New-Item -Path $key -Force | Out-Null
  }
  Set-ItemProperty -Path $key -Name AllowDevelopmentWithoutDevMode -Value 1 -Type DWord -Force
  Write-Host "Developer Mode registry flag set (symlink support for Flutter plugins)." -ForegroundColor Green
}

function Resolve-JavaHome {
  if ($env:JAVA_HOME -and (Test-Path (Join-Path $env:JAVA_HOME "bin\java.exe"))) {
    return $env:JAVA_HOME
  }
  $candidates = @(
    "C:\Program Files\Microsoft\jdk-17.0.19.10-hotspot",
    "C:\Program Files\Eclipse Adoptium\jdk-17*",
    "C:\Program Files\Java\jdk-17*"
  )
  foreach ($pattern in $candidates) {
    $dirs = Get-Item $pattern -ErrorAction SilentlyContinue
    if ($dirs) {
      $dir = if ($dirs -is [array]) { $dirs[0] } else { $dirs }
      if (Test-Path (Join-Path $dir.FullName "bin\java.exe")) {
        return $dir.FullName
      }
    }
  }
  if (Get-Command winget.exe -ErrorAction SilentlyContinue) {
    Write-Host "Installing Microsoft OpenJDK 17..."
    winget install --id Microsoft.OpenJDK.17 --accept-package-agreements --accept-source-agreements --disable-interactivity
    $dirs = Get-Item "C:\Program Files\Microsoft\jdk-17*" -ErrorAction SilentlyContinue | Sort-Object Name -Descending
    if ($dirs -and (Test-Path (Join-Path $dirs[0].FullName "bin\java.exe"))) {
      return $dirs[0].FullName
    }
  }
  throw "JAVA_HOME not set and JDK 17 not found. Install Microsoft.OpenJDK.17 (winget) or set JAVA_HOME."
}

function Invoke-SdkManagerYes {
  param(
    [Parameter(Mandatory)][string]$SdkManagerPath,
    [Parameter(ValueFromRemainingArguments = $true)][string[]]$PackageArgs
  )
  $yes = 1..80 | ForEach-Object { "y" }
  $yes | & $SdkManagerPath @PackageArgs 2>&1 | Out-Host
  if ($LASTEXITCODE -ne 0 -and $null -ne $LASTEXITCODE) {
    throw "sdkmanager failed: $($PackageArgs -join ' ')"
  }
}

function Test-DiskSpaceGB([double]$MinGb = 3) {
  $driveLetter = $SdkRoot.Substring(0, 1)
  $free = (Get-PSDrive $driveLetter).Free / 1GB
  Write-Host ("Free space on ${driveLetter}: " + [math]::Round($free, 2) + " GB")
  if ($free -lt $MinGb) {
    throw "Need at least $MinGb GB free on drive ${driveLetter}:. Run with -CleanTemp or delete large files."
  }
}

if ($CleanTemp) {
  Write-Step "Cleaning large temp Flutter archives"
  @(
    "$env:TEMP\flutter_windows_stable_3440.zip",
    (Join-Path $RepoRoot ".tools\flutter_windows.zip")
  ) | ForEach-Object {
    if (Test-Path $_) {
      Remove-Item $_ -Force
      Write-Host "Removed $_" -ForegroundColor Green
    }
  }
}

Write-Step "Disk space check"
Test-DiskSpaceGB -MinGb 3

$flutterBin = Join-Path $env:USERPROFILE "flutter\bin\flutter.bat"
if (-not (Test-Path $flutterBin)) {
  throw "Flutter not found. Run scripts/install-flutter-windows.ps1 first."
}
$env:PATH = "$(Split-Path $flutterBin -Parent);$env:PATH"

Write-Step "Android SDK command-line tools"
$cmdlineRoot = Join-Path $SdkRoot "cmdline-tools\latest"
$sdkmanager = Join-Path $cmdlineRoot "bin\sdkmanager.bat"

if (-not (Test-Path $sdkmanager)) {
  New-Item -ItemType Directory -Path (Split-Path $cmdlineRoot -Parent) -Force | Out-Null
  $zipUrl = "https://dl.google.com/android/repository/commandlinetools-win-13114758_latest.zip"
  $zipPath = Join-Path $env:TEMP "commandlinetools-win.zip"
  Write-Host "Downloading command-line tools (~150 MB)..."
  if (Get-Command curl.exe -ErrorAction SilentlyContinue) {
    & curl.exe -L -o $zipPath $zipUrl
    if ($LASTEXITCODE -ne 0) { throw "curl download failed" }
  } else {
    Invoke-WebRequest -Uri $zipUrl -OutFile $zipPath -UseBasicParsing
  }
  $extractDir = Join-Path $env:TEMP "cmdline-tools-extract"
  if (Test-Path $extractDir) { Remove-Item $extractDir -Recurse -Force }
  Expand-Archive -Path $zipPath -DestinationPath $extractDir -Force
  New-Item -ItemType Directory -Path $cmdlineRoot -Force | Out-Null
  Copy-Item -Path (Join-Path $extractDir "cmdline-tools\*") -Destination $cmdlineRoot -Recurse -Force
  Remove-Item $zipPath -Force -ErrorAction SilentlyContinue
  Remove-Item $extractDir -Recurse -Force -ErrorAction SilentlyContinue
}

$env:ANDROID_HOME = $SdkRoot
$env:ANDROID_SDK_ROOT = $SdkRoot
[Environment]::SetEnvironmentVariable("ANDROID_HOME", $SdkRoot, "User")
[Environment]::SetEnvironmentVariable("ANDROID_SDK_ROOT", $SdkRoot, "User")
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
$platformTools = Join-Path $SdkRoot "platform-tools"
if ($userPath -notlike "*$platformTools*") {
  [Environment]::SetEnvironmentVariable("Path", "$platformTools;$cmdlineRoot\bin;$userPath", "User")
}
$env:PATH = "$platformTools;$cmdlineRoot\bin;$env:PATH"

Write-Step "Java (required by sdkmanager)"
$javaHome = Resolve-JavaHome
$env:JAVA_HOME = $javaHome
[Environment]::SetEnvironmentVariable("JAVA_HOME", $javaHome, "User")
$javaBin = Join-Path $javaHome "bin"
if ([Environment]::GetEnvironmentVariable("Path", "User") -notlike "*$javaBin*") {
  [Environment]::SetEnvironmentVariable("Path", "$javaBin;$([Environment]::GetEnvironmentVariable('Path', 'User'))", "User")
}
$env:PATH = "$javaBin;$env:PATH"
$prevEa = $ErrorActionPreference
$ErrorActionPreference = "Continue"
& (Join-Path $javaBin "java.exe") -version 2>&1 | ForEach-Object { Write-Host $_ }
$ErrorActionPreference = $prevEa

Write-Step "Accepting sdkmanager licenses"
Invoke-SdkManagerYes -SdkManagerPath $sdkmanager --licenses

Write-Step "Installing SDK packages"
$driveLetter = $SdkRoot.Substring(0, 1)
$freeGb = (Get-PSDrive $driveLetter).Free / 1GB
$packages = @(
  "platform-tools",
  "platforms;android-34",
  "platforms;android-36",
  "build-tools;34.0.0",
  "build-tools;28.0.3"
)
if ($freeGb -ge 10) {
  $packages += @("emulator", "system-images;android-34;google_apis;x86_64")
  Write-Host "Enough disk for emulator + system image." -ForegroundColor Green
} else {
  Write-Warning ('Skipping emulator image. SDK only - use Chrome or free disk for emulator (~10 GB needed). Free: ' + [math]::Round($freeGb,1) + ' GB')
}
foreach ($pkg in $packages) {
  Write-Host "  $pkg"
  Invoke-SdkManagerYes -SdkManagerPath $sdkmanager $pkg
}

Write-Step "Accepting Flutter Android licenses"
1..80 | ForEach-Object { "y" } | flutter doctor --android-licenses 2>&1 | Out-Host

& flutter config --android-sdk $SdkRoot

if ($freeGb -ge 10) {
  Write-Step "Creating AVD (StreamHeaven_Pixel_API34)"
  $avdManager = Join-Path $cmdlineRoot "bin\avdmanager.bat"
  echo no | & $avdManager create avd -n StreamHeaven_Pixel_API34 -k "system-images;android-34;google_apis;x86_64" -d pixel_6 --force 2>&1 | Out-Host
}

try {
  Write-Step "Enable Developer Mode (requires admin)"
  Enable-DeveloperMode
} catch {
  Write-Warning "Could not set Developer Mode (run PowerShell as Administrator once): $_"
  Write-Host 'Or: Settings - Privacy and security - For developers - turn Developer Mode ON'
}

Write-Step "Flutter doctor"
flutter doctor -v

Write-Host ""
Write-Host "Android SDK setup finished." -ForegroundColor Green
if ($freeGb -ge 10) {
  Write-Host "Start emulator: emulator -avd StreamHeaven_Pixel_API34"
}
Write-Host ('Run on Chrome: cd "' + $RepoRoot + '\apps\mobile" ; flutter run -d chrome')
Write-Host 'Run on Android emulator: pnpm dev:flutter (after freeing disk and installing emulator image)'
