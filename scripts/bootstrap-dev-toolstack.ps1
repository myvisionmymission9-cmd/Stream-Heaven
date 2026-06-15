# Stream Heaven -- Dev Toolstack Bootstrap
# Idempotent installer for all Windows-installable tools (~150+ tool catalog).
# SaaS-only items are printed as a checklist -- never auto-created.
#
# Usage:
#   powershell -ExecutionPolicy Bypass -File scripts\bootstrap-dev-toolstack.ps1
#   powershell -ExecutionPolicy Bypass -File scripts\bootstrap-dev-toolstack.ps1 -Phase core -SkipAlreadyInstalled
#   powershell -ExecutionPolicy Bypass -File scripts\bootstrap-dev-toolstack.ps1 -Phase infra
#   powershell -ExecutionPolicy Bypass -File scripts\bootstrap-dev-toolstack.ps1 -DryRun

param(
    [ValidateSet('all', 'core', 'infra', 'mobile', 'devops', 'optional')]
    [string]$Phase = 'all',
    [string]$DriveLetter = 'D',
    [switch]$SkipAlreadyInstalled,
    [switch]$DryRun,
    [switch]$Verbose
)

$ErrorActionPreference = 'Continue'

$Root        = "${DriveLetter}:\StreamHeaven"
$ToolsDir    = "$Root\tools"
$LogDir      = "$Root\logs"
$ConfigDir   = "$Root\config"
$NpmGlobal   = "$ToolsDir\npm-global"
$LogFile     = "$LogDir\toolstack-bootstrap.log"

# ---- Helpers ----------------------------------------------------------------

function Ensure-Dir([string]$Path) {
    if (-not (Test-Path $Path)) {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
    }
}

function Write-Log {
    param([string]$Message, [string]$Level = 'INFO')
    $ts   = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    $line = "[$ts][$Level] $Message"
    Ensure-Dir $LogDir
    Add-Content -Path $LogFile -Value $line -Encoding UTF8
    switch ($Level) {
        'OK'    { Write-Host "  [OK]   $Message" -ForegroundColor Green }
        'WARN'  { Write-Host "  [WARN] $Message" -ForegroundColor Yellow }
        'ERROR' { Write-Host "  [ERR]  $Message" -ForegroundColor Red }
        'SKIP'  { Write-Host "  [SKIP] $Message" -ForegroundColor DarkCyan }
        'INFO'  { Write-Host "  [INFO] $Message" -ForegroundColor Cyan }
        default { Write-Host "  $Message" }
    }
}

function Write-Section([string]$Title) {
    $sep = '-' * 60
    Write-Host ""
    Write-Host $sep -ForegroundColor DarkGray
    Write-Host "  $Title" -ForegroundColor White
    Write-Host $sep -ForegroundColor DarkGray
    Write-Log "=== $Title ===" 'INFO'
}

function Test-Cmd([string]$Name) {
    return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Run-Phase([string]$Name) {
    return ($Phase -eq 'all') -or ($Phase -eq $Name)
}

function Install-Winget {
    param(
        [string]$Id,
        [string]$Label,
        [scriptblock]$Check
    )
    if ($DryRun) {
        Write-Log "[DRY-RUN] winget install --id $Id ($Label)" 'INFO'
        return
    }
    if ($SkipAlreadyInstalled -and (& $Check)) {
        Write-Log "$Label already installed -- skip" 'SKIP'
        return
    }
    if (-not (Test-Cmd 'winget')) {
        Write-Log "winget not found -- cannot install $Label" 'WARN'
        return
    }
    Write-Log "Installing $Label..." 'INFO'
    $out  = winget install --id $Id --accept-package-agreements --accept-source-agreements --scope user --silent 2>&1
    $code = $LASTEXITCODE
    $out | ForEach-Object { Add-Content -Path $LogFile -Value $_ -Encoding UTF8 }
    # exit code -1978335189 = already installed
    if ($code -eq 0 -or $code -eq -1978335189) {
        Write-Log "$Label installed / already present" 'OK'
    } else {
        Write-Log "$Label winget exit $code (may need admin; check log)" 'WARN'
    }
}

function Install-NpmGlobal {
    param([string]$Package, [string]$Cmd)
    if (-not (Test-Cmd 'npm')) {
        Write-Log "npm not found -- skip $Package" 'WARN'
        return
    }
    if ($DryRun) {
        Write-Log "[DRY-RUN] npm install -g $Package" 'INFO'
        return
    }
    if ($SkipAlreadyInstalled -and (Test-Cmd $Cmd)) {
        Write-Log "$Package ($Cmd) already on PATH -- skip" 'SKIP'
        return
    }
    Write-Log "npm install -g $Package..." 'INFO'
    npm install -g $Package 2>&1 | ForEach-Object { Add-Content -Path $LogFile -Value $_ -Encoding UTF8 }
    if ($LASTEXITCODE -eq 0) { Write-Log "$Package installed" 'OK' }
    else { Write-Log "$Package npm install failed (exit $LASTEXITCODE)" 'WARN' }
}

# ---- Directory Setup --------------------------------------------------------

Write-Section "Stream Heaven Bootstrap -- Phase: $Phase"
Write-Log "Log: $LogFile"

foreach ($d in @($Root, $ToolsDir, $LogDir, $ConfigDir, $NpmGlobal,
        "$ToolsDir\portable", "$Root\data\postgres", "$Root\data\redis")) {
    Ensure-Dir $d
}

# ---- PHASE: core ------------------------------------------------------------

if (Run-Phase 'core') {
    Write-Section "Core Development Tools"

    Install-Winget 'Git.Git'                       'Git'              { Test-Cmd 'git' }
    Install-Winget 'GitHub.cli'                    'GitHub CLI'       { Test-Cmd 'gh' }
    Install-Winget 'OpenJS.NodeJS.LTS'             'Node.js LTS'      { Test-Cmd 'node' }
    Install-Winget 'Microsoft.VisualStudioCode'    'VS Code'          { Test-Cmd 'code' }
    Install-Winget 'Docker.DockerDesktop'          'Docker Desktop'   { Test-Cmd 'docker' }
    Install-Winget 'Python.Python.3'               'Python 3'         { Test-Cmd 'python' }
    Install-Winget 'Amazon.AWSCLI'                 'AWS CLI v2'       { Test-Cmd 'aws' }
    Install-Winget 'dbeaver.dbeaver'               'DBeaver'          { Test-Path 'C:\Program Files\DBeaver\dbeaver.exe' }
    Install-Winget 'WinSCP.WinSCP'                 'WinSCP'           { Test-Path 'C:\Program Files (x86)\WinSCP\WinSCP.exe' }
    Install-Winget 'Microsoft.WindowsTerminal'     'Windows Terminal' { Test-Cmd 'wt' }
    Install-Winget '7zip.7zip'                     '7-Zip'            { Test-Cmd '7z' }

    # Set npm global prefix to D: drive before installing globals
    if (Test-Cmd 'npm') {
        if ($DryRun) {
            Write-Log "[DRY-RUN] npm config set prefix $NpmGlobal" 'INFO'
        } else {
            npm config set prefix $NpmGlobal 2>&1 | Out-Null
            if ($env:PATH -notlike "*$NpmGlobal*") {
                $env:PATH = "$NpmGlobal;$env:PATH"
            }
            Write-Log "npm global prefix set to $NpmGlobal" 'OK'
        }
    }

    Write-Section "npm Global Tools"
    Install-NpmGlobal '@nestjs/cli'        'nest'
    Install-NpmGlobal 'firebase-tools'     'firebase'
    Install-NpmGlobal 'wrangler'           'wrangler'
    Install-NpmGlobal '@sentry/cli'        'sentry-cli'
    Install-NpmGlobal 'typescript'         'tsc'
    Install-NpmGlobal 'eslint'             'eslint'
    Install-NpmGlobal 'prettier'           'prettier'
    Install-NpmGlobal 'pnpm'               'pnpm'
    Install-NpmGlobal 'tsx'                'tsx'
}

# ---- PHASE: mobile ----------------------------------------------------------

if (Run-Phase 'mobile') {
    Write-Section "Mobile Development (Phase 2a)"

    Install-Winget 'Google.FlutterSDK'                'Flutter SDK'         { Test-Cmd 'flutter' }
    Install-Winget 'Google.AndroidStudio'             'Android Studio'      { Test-Path "$env:LOCALAPPDATA\Programs\Android Studio\bin\studio64.exe" }
    Install-Winget 'EclipseAdoptium.Temurin.17.JDK'  'Java JDK 17'         { Test-Cmd 'java' }

    Write-Log "NOTE: iOS builds require a Mac with Xcode 15+. See $ConfigDir\mac-checklist.md" 'WARN'
    Write-Log "Run 'flutter doctor' after Flutter install to verify Android toolchain." 'INFO'
}

# ---- PHASE: infra -----------------------------------------------------------

if (Run-Phase 'infra') {
    Write-Section "Infrastructure & DevOps Tools"

    Install-Winget 'Kubernetes.kubectl'     'kubectl'    { Test-Cmd 'kubectl' }
    Install-Winget 'Helm.Helm'              'Helm'       { Test-Cmd 'helm' }
    Install-Winget 'Hashicorp.Terraform'    'Terraform'  { Test-Cmd 'terraform' }
    Install-Winget 'k6.k6'                 'k6'         { Test-Cmd 'k6' }

    Write-Section "Starting Local Services (Docker)"

    if (-not (Test-Cmd 'docker')) {
        Write-Log "Docker not found -- skipping service startup. Install Docker Desktop first." 'WARN'
    } elseif ($DryRun) {
        Write-Log "[DRY-RUN] docker compose up -d (postgres, redis)" 'INFO'
    } else {
        $repoRoot = Split-Path -Parent $PSScriptRoot
        $composeFile = Join-Path $repoRoot 'docker-compose.yml'
        if (Test-Path $composeFile) {
            Write-Log "Starting Postgres + Redis via docker compose..." 'INFO'
            Push-Location $repoRoot
            docker compose up -d postgres redis 2>&1 | ForEach-Object {
                Write-Host "    $_" -ForegroundColor DarkGray
                Add-Content -Path $LogFile -Value $_ -Encoding UTF8
            }
            Pop-Location
            if ($LASTEXITCODE -eq 0) { Write-Log "Postgres + Redis started" 'OK' }
            else { Write-Log "docker compose up exit $LASTEXITCODE -- check docker is running" 'WARN' }
        } else {
            Write-Log "docker-compose.yml not found at $repoRoot -- skipping service startup" 'WARN'
            Write-Log "Run 'scripts\setup-phase1.ps1 -StartServices' after cloning the repo" 'INFO'
        }
    }
}

# ---- PHASE: devops ----------------------------------------------------------

if (Run-Phase 'devops') {
    Write-Section "DevOps & Testing Tools"

    Install-Winget 'Postman.Postman'           'Postman'    { Test-Path "$env:LOCALAPPDATA\Postman\app-*\Postman.exe" }
    Install-Winget 'HTTPie.HTTPie'             'HTTPie'     { Test-Cmd 'http' }
    Install-NpmGlobal 'artillery'              'artillery'
}

# ---- PHASE: optional --------------------------------------------------------

if (Run-Phase 'optional') {
    Write-Section "Optional Tools"

    Install-Winget 'OBSProject.OBSStudio'   'OBS Studio'   { Test-Path 'C:\Program Files\obs-studio\bin\64bit\obs64.exe' }
    Install-Winget 'VideoLAN.VLC'           'VLC'          { Test-Cmd 'vlc' }
}

# ---- SaaS Checklist Generation ----------------------------------------------

Write-Section "Generating SaaS Checklist"

$saasPath = Join-Path $ConfigDir 'saas-checklist.md'
if ((-not (Test-Path $saasPath)) -or (-not $SkipAlreadyInstalled)) {
    if ($DryRun) {
        Write-Log "[DRY-RUN] Would write $saasPath" 'INFO'
    } else {
        $saasLines = @(
            '# Stream Heaven -- SaaS Setup Checklist',
            "Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm')",
            '',
            '> Mark items [x] when account is created and API key is stored in .env.local or AWS Secrets Manager.',
            '> NEVER commit API keys to git.',
            '',
            '## Phase 1 -- Required Before Services Start',
            '',
            '### Source Control',
            '- [ ] GitHub repository created and team invited',
            '- [ ] GitHub Actions enabled; secrets added for CI/CD',
            '',
            '### Authentication',
            '- [ ] Firebase project created -> add FIREBASE_PROJECT_ID + FIREBASE_WEB_API_KEY to .env.local',
            '      URL: https://console.firebase.google.com',
            '',
            '### OTP SMS',
            '- [ ] MSG91 account -> MSG91_AUTH_KEY + MSG91_TEMPLATE_ID',
            '      URL: https://msg91.com',
            '- [ ] Twilio account (global fallback) -> TWILIO_ACCOUNT_SID + TWILIO_AUTH_TOKEN + TWILIO_PHONE',
            '      URL: https://twilio.com',
            '',
            '### Cloud Infrastructure',
            '- [ ] AWS account activated, IAM user + programmatic access created',
            '      -> AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY + AWS_REGION',
            '      -> Store in AWS Secrets Manager for services; .env.local for local dev',
            '      URL: https://console.aws.amazon.com',
            '',
            '### Project Management',
            '- [ ] Jira Cloud project created | URL: https://atlassian.com',
            '- [ ] Notion workspace setup (docs) | URL: https://notion.so',
            '- [ ] Slack workspace + #stream-heaven-dev channel + webhook URL',
            '      -> SLACK_WEBHOOK_URL for alerts',
            '',
            '## Phase 2a -- Mobile / App Store',
            '',
            '- [ ] Google Play Console developer account ($25 one-time)',
            '      URL: https://play.google.com/console',
            '- [ ] Apple Developer Program ($99/year) -- REQUIRES MAC FOR iOS BUILDS',
            '      URL: https://developer.apple.com',
            '- [ ] App Store Connect app record created',
            '      URL: https://appstoreconnect.apple.com',
            '',
            '## Phase 3 -- Cloudflare',
            '',
            '- [ ] Cloudflare account, domain added, zone active',
            '      -> CLOUDFLARE_API_TOKEN + CLOUDFLARE_ZONE_ID + CLOUDFLARE_ACCOUNT_ID',
            '      URL: https://dash.cloudflare.com',
            '',
            '## Phase 5 -- Monitoring',
            '',
            '- [ ] Sentry org created; projects: stream-heaven-backend, stream-heaven-mobile',
            '      -> SENTRY_DSN (per project) + SENTRY_AUTH_TOKEN + SENTRY_ORG',
            '      URL: https://sentry.io',
            '- [ ] Grafana Cloud free tier -> GRAFANA_API_KEY | URL: https://grafana.com',
            '- [ ] PagerDuty / OpsGenie on-call routing (optional for early phase)',
            '',
            '## Phase 6 -- Design',
            '',
            '- [ ] Figma workspace + team project -> FIGMA_ACCESS_TOKEN',
            '      URL: https://figma.com',
            '',
            '## Phase 7 -- Analytics',
            '',
            '- [ ] Mixpanel project -> MIXPANEL_TOKEN | URL: https://mixpanel.com',
            '- [ ] Amplitude project -> AMPLITUDE_API_KEY | URL: https://amplitude.com',
            '',
            '## Phase 8 -- Push Notifications',
            '',
            '- [ ] OneSignal app -> ONESIGNAL_APP_ID + ONESIGNAL_API_KEY',
            '      URL: https://onesignal.com',
            '- [ ] Firebase Cloud Messaging (via existing Firebase project)',
            '',
            '## Phase 9 -- Livestream RTC',
            '',
            '- [ ] Agora console project -> AGORA_APP_ID + AGORA_APP_CERTIFICATE',
            '      URL: https://console.agora.io',
            '- [ ] Zego console project -> ZEGO_APP_ID + ZEGO_APP_SIGN',
            '      URL: https://console.zegocloud.com',
            '',
            '## Phase 12 -- Payments',
            '',
            '- [ ] Razorpay account (India) -> RAZORPAY_KEY_ID + RAZORPAY_KEY_SECRET + RAZORPAY_WEBHOOK_SECRET',
            '      URL: https://dashboard.razorpay.com',
            '      Prerequisite: GST registration + business bank account',
            '- [ ] Stripe account (international) -> STRIPE_SECRET_KEY + STRIPE_PUBLISHABLE_KEY + STRIPE_WEBHOOK_SECRET',
            '      URL: https://dashboard.stripe.com',
            '',
            '## Phase 14 -- AI APIs',
            '',
            '- [ ] OpenAI API key -> OPENAI_API_KEY + OPENAI_ORG_ID',
            '      URL: https://platform.openai.com',
            '- [ ] Anthropic API key (optional) -> ANTHROPIC_API_KEY',
            '      URL: https://console.anthropic.com',
            '- [ ] Google AI Studio (Gemini) -> GEMINI_API_KEY | URL: https://aistudio.google.com',
            '',
            '## Phase 15 -- Mobile Attribution',
            '',
            '- [ ] Branch.io -> BRANCH_KEY | URL: https://branch.io',
            '- [ ] AppsFlyer -> APPSFLYER_DEV_KEY | URL: https://appsflyer.com',
            '',
            '## Phase 18 -- Event Streaming',
            '',
            '- [ ] Confluent Cloud Kafka cluster',
            '      -> KAFKA_BOOTSTRAP_SERVERS + KAFKA_API_KEY + KAFKA_API_SECRET',
            '      URL: https://confluent.io',
            '',
            '## Phase 20 -- Search',
            '',
            '- [ ] Elastic Cloud deployment -> ELASTICSEARCH_URL + ELASTICSEARCH_API_KEY',
            '      URL: https://elastic.co'
        )
        $saasLines | Set-Content -Path $saasPath -Encoding UTF8
        Write-Log "SaaS checklist written to $saasPath" 'OK'
    }
} else {
    Write-Log "saas-checklist.md exists -- skip" 'SKIP'
}

# ---- Mac Checklist Generation -----------------------------------------------

Write-Section "Generating Mac Checklist"

$macPath = Join-Path $ConfigDir 'mac-checklist.md'
if ((-not (Test-Path $macPath)) -or (-not $SkipAlreadyInstalled)) {
    if ($DryRun) {
        Write-Log "[DRY-RUN] Would write $macPath" 'INFO'
    } else {
        $macLines = @(
            '# Stream Heaven -- Mac-only Requirements',
            "Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm')",
            '',
            '> These cannot be installed on Windows. You need a Mac for iOS builds.',
            '> Alternative: Use GitHub Actions macOS runner (macos-latest) for CI/CD iOS builds.',
            '',
            '## Required for iOS Development (Phase 2a)',
            '',
            '- [ ] macOS Ventura 13+ or Sonoma 14+ (hardware requirement)',
            '- [ ] Xcode 15+ from Mac App Store',
            '      URL: https://apps.apple.com/app/xcode/id497799835',
            '      After install: xcode-select --install',
            '- [ ] CocoaPods -> sudo gem install cocoapods',
            '- [ ] Apple Developer Program ($99/year)',
            '      URL: https://developer.apple.com/programs/',
            '- [ ] Physical iPhone or iPad (for device testing)',
            '- [ ] TestFlight configured in App Store Connect',
            '- [ ] Certificates and provisioning profiles set up in Keychain',
            '',
            '## CI/CD Alternative (GitHub Actions macOS runner)',
            '',
            'Add to .github/workflows/ios-build.yml:',
            '  runs-on: macos-latest',
            '',
            'This avoids needing a physical Mac for automated builds.',
            '',
            '## Phase 5 -- iOS Profiling',
            '',
            '- [ ] Xcode Instruments (bundled with Xcode)',
            '- [ ] Fastlane -> gem install fastlane',
            '',
            '## Phase 16 -- Swift (Native iOS features)',
            '',
            '- [ ] Swift toolchain (bundled with Xcode)',
            '- [ ] Swift Package Manager (bundled with Xcode)'
        )
        $macLines | Set-Content -Path $macPath -Encoding UTF8
        Write-Log "Mac checklist written to $macPath" 'OK'
    }
} else {
    Write-Log "mac-checklist.md exists -- skip" 'SKIP'
}

# ---- Summary ----------------------------------------------------------------

Write-Section "Bootstrap Complete"

Write-Host ""
Write-Host "  Files generated:" -ForegroundColor White
Write-Host "    $saasPath" -ForegroundColor Cyan
Write-Host "    $macPath" -ForegroundColor Cyan
Write-Host "    $LogFile" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Next steps:" -ForegroundColor White
Write-Host "    1. Run verify:  powershell -ExecutionPolicy Bypass -File scripts\verify-stream-heaven-toolstack-d.ps1" -ForegroundColor DarkCyan
Write-Host "    2. Work through $ConfigDir\saas-checklist.md" -ForegroundColor DarkCyan
Write-Host "    3. Start Phase 1 services: powershell -ExecutionPolicy Bypass -File scripts\setup-phase1.ps1 -StartServices" -ForegroundColor DarkCyan
Write-Host "    4. For iOS builds -- see $ConfigDir\mac-checklist.md" -ForegroundColor DarkCyan
Write-Host ""
Write-Log "Bootstrap script complete. Phase=$Phase DryRun=$DryRun" 'OK'
