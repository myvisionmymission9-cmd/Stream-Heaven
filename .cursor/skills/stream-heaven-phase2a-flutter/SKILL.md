---
name: stream-heaven-phase2a-flutter
description: >-
  Bootstrap and run Stream Heaven Phase 2a Flutter mobile app — Flutter SDK,
  setup-phase2a.ps1, emulator run, OTP login. Use when installing Flutter,
  running apps/mobile, or fixing API_BASE_URL.
---

# Stream Heaven Phase 2a Flutter

## When to use

- User finished Flutter install or asks what's next after Flutter
- Running `apps/mobile`, OTP login flow, or Phase 2a setup
- Android emulator / Windows desktop / physical device API URL issues

## Agent scope

Primary agent: `ai-agents/phase-2a/flutter-mobile-shell-agent.md`

Supporting: `flutter-architect.md`, `riverpod-specialist.md`, `routing-specialist.md` under `ai-agents/core-engineering/frontend/`

Read first: `docs/PHASE-2A-FLUTTER-GUIDE.md`, `platform-governance/flutter-ui-rules.md`

## Prerequisites

- Phase 1 gateway healthy at `http://127.0.0.1:3000/health/aggregate`
- Flutter 3.24+ — `scripts/install-flutter-windows.ps1` if missing

## Steps

1. **Install Flutter** (if needed):
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts/install-flutter-windows.ps1
   ```
   Open a **new** terminal; run `flutter doctor`.

2. **Phase 2a setup**:
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts/setup-phase2a.ps1
   ```

3. **First-time platform folders** (if no `android/app/build.gradle`):
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts/setup-flutter-mobile.ps1
   ```

4. **Run app**:
   ```powershell
   cd apps/mobile
   flutter pub get
   flutter analyze
   flutter run              # pick device
   flutter run -d windows   # faster first run on Windows
   ```

## API base URLs

| Target | Default |
|--------|---------|
| Android emulator | `http://10.0.2.2:3000` |
| iOS sim / Windows | `http://127.0.0.1:3000` |
| Physical device | `flutter run --dart-define=API_BASE_URL=http://<LAN-IP>:3000` |

Config: `apps/mobile/lib/core/config/env_config.dart`

## OTP test flow

1. Enter 10-digit phone (e.g. `9876543210` → `+919876543210`)
2. Send OTP → check `logs/dev-auth.log` for `[MOCK SMS] OTP xxxxxx`
3. Verify → Home → Profile

## Out of scope (Phase 2+)

Feed, reels, chat, livestream, full i18n ARB files — do not implement in Phase 2a tasks.

## Time estimates

| Step | First time | Repeat |
|------|------------|--------|
| Flutter SDK install | 20–40 min | skip |
| setup-phase2a.ps1 | 5–15 min | 2–5 min |
| First `flutter run` (Android) | 15–30 min | 1–3 min |
| First `flutter run` (Windows) | 5–10 min | ~1 min |
