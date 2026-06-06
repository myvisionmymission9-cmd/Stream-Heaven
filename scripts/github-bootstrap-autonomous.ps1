# Stream Heaven - headless GitHub repo bootstrap (token auth only, no browser)
# Usage: powershell -ExecutionPolicy Bypass -File scripts/github-bootstrap-autonomous.ps1
#
# Exit codes:
#   0 = success (repo linked and pushed, or already up to date)
#   1 = auth missing (set GH_TOKEN or GITHUB_TOKEN)
#   2 = secrets detected (fix before commit)
#   3 = push failed (auth ok but push error)
#
# One-time setup (pick one):
#   [System.Environment]::SetEnvironmentVariable('GH_TOKEN','<pat>', 'User')
#   Or create .env.local (gitignored): GH_TOKEN=<pat>

param(
  [string]$RepoName = "stream-heaven",
  [ValidateSet("private", "public")]
  [string]$Visibility = "private",
  [switch]$SkipPush,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $RepoRoot

function Write-Step([string]$Message) {
  Write-Host ""
  Write-Host ("==> " + $Message) -ForegroundColor Cyan
}

function Add-GhToPath {
  $ghDir = "D:\Dev\tools\gh"
  if ((Test-Path $ghDir) -and ($env:PATH -notlike "*$ghDir*")) {
    $env:PATH = "$ghDir;$env:PATH"
  }
  $gitDir = "D:\Dev\tools\Git\cmd"
  if ((Test-Path $gitDir) -and ($env:PATH -notlike "*$gitDir*")) {
    $env:PATH = "$gitDir;$env:PATH"
  }
}

function Import-TokenFromEnvLocal {
  if ($env:GH_TOKEN -or $env:GITHUB_TOKEN) { return }
  $envLocal = Join-Path $RepoRoot ".env.local"
  if (-not (Test-Path $envLocal)) { return }
  foreach ($line in Get-Content $envLocal -ErrorAction SilentlyContinue) {
    $t = $line.Trim()
    if ($t -match '^\s*#' -or [string]::IsNullOrWhiteSpace($t)) { continue }
    if ($t -match '^(?:export\s+)?GH_TOKEN\s*=\s*(.+)$') {
      $env:GH_TOKEN = $Matches[1].Trim().Trim('"').Trim("'")
    }
    elseif ($t -match '^(?:export\s+)?GITHUB_TOKEN\s*=\s*(.+)$') {
      $env:GITHUB_TOKEN = $Matches[1].Trim().Trim('"').Trim("'")
    }
    elseif ($t -match '^(?:export\s+)?GIT_AUTHOR_NAME\s*=\s*(.+)$') {
      $env:GIT_AUTHOR_NAME = $Matches[1].Trim().Trim('"').Trim("'")
    }
    elseif ($t -match '^(?:export\s+)?GIT_AUTHOR_EMAIL\s*=\s*(.+)$') {
      $env:GIT_AUTHOR_EMAIL = $Matches[1].Trim().Trim('"').Trim("'")
    }
  }
}


function Import-TokenFromWindowsEnv {
  if ($env:GH_TOKEN -or $env:GITHUB_TOKEN) { return }
  foreach ($scope in @("User", "Machine")) {
    if (-not $env:GH_TOKEN) {
      $v = [Environment]::GetEnvironmentVariable("GH_TOKEN", $scope)
      if (-not [string]::IsNullOrWhiteSpace($v)) { $env:GH_TOKEN = $v }
    }
    if (-not $env:GITHUB_TOKEN) {
      $v = [Environment]::GetEnvironmentVariable("GITHUB_TOKEN", $scope)
      if (-not [string]::IsNullOrWhiteSpace($v)) { $env:GITHUB_TOKEN = $v }
    }
  }
}

function Set-GitCommitIdentity {
  # Uses env vars only — never runs git config (per governance)
  $name = $env:GIT_AUTHOR_NAME
  $email = $env:GIT_AUTHOR_EMAIL

  if ((-not $name -or -not $email) -and (Test-GhAuthenticated)) {
    $prev = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    $login = (& gh api user -q .login 2>$null)
    $ErrorActionPreference = $prev
    if ($login) {
      if (-not $name) { $name = $login }
      if (-not $email) { $email = "$login@users.noreply.github.com" }
    }
  }

  if ($name -and $email) {
    $env:GIT_AUTHOR_NAME = $name
    $env:GIT_AUTHOR_EMAIL = $email
    $env:GIT_COMMITTER_NAME = $name
    $env:GIT_COMMITTER_EMAIL = $email
    return $true
  }
  return $false
}

function Get-GhToken {
  if ($env:GH_TOKEN) { return $env:GH_TOKEN }
  if ($env:GITHUB_TOKEN) { return $env:GITHUB_TOKEN }
  return $null
}

function Test-GhAuthenticated {
  $prev = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  try {
    & gh auth status 2>&1 | Out-Null
    return ($LASTEXITCODE -eq 0)
  } finally {
    $ErrorActionPreference = $prev
  }
}

function Invoke-GhTokenLogin {
  $token = Get-GhToken
  if (-not $token) { return $false }
  Write-Step "Authenticating gh with token from environment"
  $token | & gh auth login --with-token 2>&1 | Out-Null
  return ($LASTEXITCODE -eq 0)
}

function Test-SecretFiles {
  $blockedPatterns = @(
    '\.env$',
    '\.env\.[^/\\]+$',
    '\.pem$',
    '\.p12$',
    'credentials\.json$',
    'firebase-adminsdk.*\.json$',
    'service-account.*\.json$',
    'kubeconfig$',
    '\.tfvars$',
    '\.jks$',
    '\.keystore$',
    'key\.properties$'
  )
  $allowPatterns = @('\.env\.example$', '\.tfvars\.example$')

  $candidates = @()
  if (Test-Path (Join-Path $RepoRoot ".git")) {
    $prev = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    $untracked = & git ls-files --others --exclude-standard 2>&1
    $tracked = & git ls-files --modified 2>&1
    $ErrorActionPreference = $prev
    if ($untracked) { $candidates += $untracked }
    if ($tracked) { $candidates += $tracked }
  } else {
    $candidates = Get-ChildItem -Path $RepoRoot -Recurse -File -Force -ErrorAction SilentlyContinue |
      Where-Object {
        $_.FullName -notmatch '\\node_modules\\|\\\.git\\|\\dist\\|\\build\\|\\\.dart_tool\\|\\\.terraform\\'
      } |
      ForEach-Object { $_.FullName.Substring($RepoRoot.Length + 1) -replace '\\', '/' }
  }

  $found = @()
  foreach ($rel in ($candidates | Select-Object -Unique)) {
    $norm = $rel -replace '\\', '/'
    $allowed = $false
    foreach ($ap in $allowPatterns) {
      if ($norm -match $ap) { $allowed = $true; break }
    }
    if ($allowed) { continue }
    foreach ($bp in $blockedPatterns) {
      if ($norm -match $bp) {
        $found += $norm
        break
      }
    }
  }

  # Content scan - high-confidence only (avoid false positives on source code)
  $pemPattern = '(?i)-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----'
  foreach ($rel in ($candidates | Select-Object -Unique)) {
    $norm = $rel -replace '\\', '/'
    $full = Join-Path $RepoRoot ($rel -replace '/', '\')
    if (-not (Test-Path $full)) { continue }

    $ext = [System.IO.Path]::GetExtension($full).ToLower()
    if ($ext -in @('.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.zip', '.jar', '.exe', '.dll', '.so', '.dylib')) { continue }

    try {
      $fi = Get-Item $full
      if ($fi.Length -gt 256000) { continue }
      $text = Get-Content $full -Raw -ErrorAction SilentlyContinue
      if (-not $text) { continue }

      if ($text -match $pemPattern) {
        $found += "$rel (embedded private key)"
        continue
      }

      # Env-style secrets only in real .env files (never .env.example)
      if ($norm -match '/\.env$' -and $norm -notmatch '\.env\.example$') {
        if ($text -match '(?m)^(?:[A-Z0-9_]*(?:SECRET|PASSWORD|TOKEN|PRIVATE_KEY)[A-Z0-9_]*)\s*=\s*\S{8,}') {
          $found += "$rel (env secret assignment)"
        }
      }
    } catch { }
  }

  return ($found | Select-Object -Unique)
}

function Ensure-GitRepo {
  if (Test-Path (Join-Path $RepoRoot ".git")) {
    Write-Host "Git repo already initialized." -ForegroundColor DarkGray
    return
  }
  Write-Step "Initializing git repository"
  if ($DryRun) {
    Write-Host "[DryRun] would run: git init && git branch -M main" -ForegroundColor Yellow
    return
  }
  & git init
  if ($LASTEXITCODE -ne 0) { throw "git init failed" }
  & git branch -M main
  if ($LASTEXITCODE -ne 0) { throw "git branch -M main failed" }
}

function Get-RemoteUrl {
  $prev = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  $url = & git remote get-url origin 2>$null
  $ErrorActionPreference = $prev
  if ($LASTEXITCODE -eq 0 -and $url) { return $url.Trim() }
  return $null
}

function Ensure-RemoteRepo {
  param([string]$Name, [string]$Vis)
  $existing = Get-RemoteUrl
  if ($existing) {
    Write-Host "Remote origin already set: $existing" -ForegroundColor DarkGray
    return $existing
  }

  Write-Step "Checking GitHub repo: $Name"
  $prev = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  & gh repo view $Name 2>&1 | Out-Null
  $viewOk = ($LASTEXITCODE -eq 0)
  $ErrorActionPreference = $prev

  if ($viewOk) {
    Write-Step "Linking existing GitHub repo as origin"
    if ($DryRun) {
      Write-Host "[DryRun] would run: git remote add origin (from gh repo view)" -ForegroundColor Yellow
      return "https://github.com/PLACEHOLDER/$Name.git"
    }
    $cloneUrl = (& gh repo view $Name --json url -q .url 2>$null)
    if (-not $cloneUrl) { throw "Could not resolve clone URL for $Name" }
    & git remote add origin $cloneUrl
    if ($LASTEXITCODE -ne 0) { throw "git remote add origin failed" }
    return $cloneUrl
  }

  Write-Step "Creating GitHub repo: $Name ($Vis)"
  if ($DryRun) {
    Write-Host "[DryRun] would run: gh repo create $Name --$Vis --source=. --remote=origin" -ForegroundColor Yellow
    return "https://github.com/PLACEHOLDER/$Name.git"
  }
  $visFlag = if ($Vis -eq "public") { "--public" } else { "--private" }
  & gh repo create $Name @($visFlag, "--source=.", "--remote=origin")
  if ($LASTEXITCODE -ne 0) { throw "gh repo create failed" }
  return (Get-RemoteUrl)
}

function Ensure-InitialCommit {
  $prev = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  $count = (& git rev-list --count HEAD 2>$null)
  $ErrorActionPreference = $prev
  if ($LASTEXITCODE -eq 0 -and [int]$count -gt 0) {
    Write-Host "Repository already has commits ($count)." -ForegroundColor DarkGray
    return $false
  }

  Write-Step "Creating initial commit"
  if ($DryRun) {
    Write-Host "[DryRun] would run: git add . && git commit" -ForegroundColor Yellow
    return $true
  }
  & git add .
  if ($LASTEXITCODE -ne 0) { throw "git add failed" }
  $status = & git diff --cached --name-only
  if (-not $status) {
    Write-Host "Nothing to commit." -ForegroundColor Yellow
    return $false
  }
  if (-not (Set-GitCommitIdentity)) {
    throw "Git author identity missing. Set GIT_AUTHOR_NAME and GIT_AUTHOR_EMAIL in env or .env.local, or authenticate gh first."
  }
  $msg = @"
Initial commit: Stream Heaven monorepo bootstrap.

Phase 1 NestJS services, shared contracts, agent catalog, and CI scaffolding.
"@
  & git commit -m $msg
  if ($LASTEXITCODE -ne 0) { throw "git commit failed" }
  return $true
}

function Invoke-PushMain {
  Write-Step "Pushing main to origin"
  if ($DryRun) {
    Write-Host "[DryRun] would run: git push -u origin main" -ForegroundColor Yellow
    return
  }
  $prev = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  & git push -u origin main 2>&1 | ForEach-Object { Write-Host $_ }
  $code = $LASTEXITCODE
  $ErrorActionPreference = $prev
  if ($code -ne 0) { exit 3 }
}

# --- Main ---

Add-GhToPath
Import-TokenFromEnvLocal
Import-TokenFromWindowsEnv

Write-Step "Verifying git and gh"
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Host "ERROR: git not found on PATH." -ForegroundColor Red
  exit 1
}
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  Write-Host "ERROR: gh not found on PATH." -ForegroundColor Red
  exit 1
}
Write-Host ("git: " + (& git --version))
Write-Host ("gh: " + (& gh --version | Select-Object -First 1))

Write-Step "Secret scan (pre-commit)"
$secrets = Test-SecretFiles
if ($secrets.Count -gt 0) {
  Write-Host "BLOCKED: secret-like files detected (not committed):" -ForegroundColor Red
  foreach ($s in $secrets) { Write-Host ("  - " + $s) -ForegroundColor Red }
  Write-Host ""
  Write-Host "Ensure .gitignore covers these paths and remove them from the commit set." -ForegroundColor Yellow
  exit 2
}
Write-Host "Secret scan: clean" -ForegroundColor Green

Ensure-GitRepo

$authed = Test-GhAuthenticated
if (-not $authed) {
  $authed = Invoke-GhTokenLogin
}

$hadNewCommit = Ensure-InitialCommit

if (-not $authed) {
  Write-Host ""
  Write-Host "WARN: GitHub CLI not authenticated - local repo ready, remote/push skipped." -ForegroundColor Yellow
  Write-Host "Set GH_TOKEN (or GITHUB_TOKEN) in Windows User env or .env.local, then re-run:" -ForegroundColor Yellow
  Write-Host '  powershell -ExecutionPolicy Bypass -File scripts/github-bootstrap-autonomous.ps1' -ForegroundColor Cyan
  if ($hadNewCommit) { Write-Host "Local initial commit created on main." -ForegroundColor Green }
  exit 1
}

$remoteUrl = $null
try {
  $remoteUrl = Ensure-RemoteRepo -Name $RepoName -Vis $Visibility
} catch {
  Write-Host ("ERROR: remote setup failed: " + $_.Exception.Message) -ForegroundColor Red
  exit 1
}

if (-not $SkipPush) {
  Invoke-PushMain
}

Write-Host ""
Write-Host "SUCCESS: GitHub bootstrap complete." -ForegroundColor Green
if ($remoteUrl) { Write-Host ("Remote: " + $remoteUrl) -ForegroundColor Green }
exit 0
