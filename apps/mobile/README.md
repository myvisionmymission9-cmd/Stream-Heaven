# Stream Heaven Mobile (Phase 2a)

Flutter app shell: OTP login, profile, dark theme, gateway integration.

## Prerequisites

| Tool | Version |
|------|---------|
| Flutter | 3.24+ stable |
| Android Studio / Xcode | For emulators |
| Phase 1 backend | Gateway on port 3000 |

Check Flutter:

```powershell
flutter --version
```

If `flutter` is not recognized, install from [flutter.dev](https://docs.flutter.dev/get-started/install) and add to PATH.

## First-time setup

From repo root:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/setup-flutter-mobile.ps1
```

Or manually:

```powershell
cd apps/mobile
flutter create . --org com.streamheaven --project-name stream_heaven_mobile
flutter pub get
```

## Run

From repo root:

```powershell
pnpm dev:flutter
```

Or from `apps/mobile`:

```powershell
flutter run
```

### API base URL

| Target | Default base URL |
|--------|------------------|
| Android emulator | `http://10.0.2.2:3000` |
| iOS simulator | `http://127.0.0.1:3000` |
| Physical device | Your PC LAN IP, e.g. `http://192.168.1.10:3000` |

Override:

```powershell
flutter run --dart-define=API_BASE_URL=http://192.168.1.10:3000
```

Ensure Phase 1 services are running (`pnpm dev:gateway`, `pnpm dev:auth`, `pnpm dev:user`).

## OTP test flow

1. Enter a 10-digit Indian number (default `+91` prefix).
2. Tap **Send OTP**.
3. Read the 6-digit code from the **auth-service** terminal (`[MOCK SMS] OTP …`).
4. Enter the code and verify — you should land on Home → Profile.

## Analyze

```powershell
cd apps/mobile
flutter analyze
```

## Structure

```
lib/
├── main.dart / app.dart
├── bootstrap/
├── core/          # API, config, storage, errors, socket stub
├── features/
│   ├── auth/      # OTP login
│   ├── profile/   # GET/PATCH /v1/users/me
│   └── splash/
├── router/        # GoRouter
└── l10n/          # EN stub (9 locales planned)
```

Design tokens: `packages/design-system/` (`ShTheme`, `ShButton`, `ShTextField`).

## Stubbed (not Phase 2a)

- Full 9-language ARB files
- Feed, reels, chat, livestream
- Socket.IO feature handlers (optional connect only)
- Firebase client SDK (phone OTP via gateway REST)

See [`docs/PHASE-2A-FLUTTER-GUIDE.md`](../../docs/PHASE-2A-FLUTTER-GUIDE.md) for full details.
