# Stream Heaven — Phase 2a Flutter Guide

Phase 2a delivers the **mobile app shell**: splash → OTP login → home/profile, wired to the Phase 1 API gateway.

---

## Prerequisites

| Tool | Notes |
|------|-------|
| **Flutter 3.24+** | Stable channel — `flutter doctor` |
| **Phase 1 backend** | Gateway, auth, user services running |
| **Android Studio / Xcode** | Emulator or physical device |

Repo root:

```powershell
cd "C:\Users\admin\Desktop\Stream Heaven"
```

Start Phase 1 (four terminals or background logs):

```powershell
pnpm docker:up
pnpm dev:auth
pnpm dev:user
pnpm dev:gateway
```

Verify gateway:

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:3000/health/aggregate"
```

---

## Project layout

```
apps/mobile/                    # Flutter app (stream_heaven_mobile)
packages/design-system/         # ShTheme, ShButton, ShTextField
```

Monorepo script:

```powershell
pnpm dev:flutter
```

---

## First-time Flutter setup

### 1. Install Flutter + Android SDK (Windows, automated)

```powershell
powershell -ExecutionPolicy Bypass -File scripts/install-flutter-windows.ps1
powershell -ExecutionPolicy Bypass -File scripts/install-android-sdk-windows.ps1 -CleanTemp
```

The Android script installs command-line tools (no Android Studio GUI), JDK 17 if missing, SDK platforms **34 + 36**, build-tools, optional emulator when **≥10 GB** free on `C:`, and accepts licenses. SDK path: `%LOCALAPPDATA%\Android\Sdk`.

Verify:

```powershell
flutter --version
flutter doctor
```

Manual fallback: [Flutter Windows install](https://docs.flutter.dev/get-started/install/windows) and [Android Studio](https://developer.android.com/studio).

### 2. One-command Phase 2a setup (recommended)

Verifies Phase 1, runs Socket.IO smoke test, and bootstraps Flutter (downloads SDK to `.tools/flutter` if needed):

```powershell
powershell -ExecutionPolicy Bypass -File scripts/setup-phase2a.ps1
```

### 3. Generate platform folders (first run only)

If `android/` has no Gradle project yet (only a placeholder README):

```powershell
powershell -ExecutionPolicy Bypass -File scripts/setup-flutter-mobile.ps1
```

This runs:

```powershell
cd apps/mobile
flutter create . --org com.streamheaven --project-name stream_heaven_mobile
flutter pub get
cd ../..
```

### 4. Resolve dependencies

```powershell
cd apps/mobile
flutter pub get
flutter analyze
```

### 5. Disk space and first run (Windows)

Android emulator + first APK/Gradle build need **several GB** on `C:`. If free space is **under ~10 GB**, prefer **Chrome** (no emulator image, smaller build cache):

```powershell
cd apps/mobile
flutter run -d chrome --dart-define=API_BASE_URL=http://127.0.0.1:3000
```

Or: `pnpm dev:flutter:chrome` from repo root.

`install-android-sdk-windows.ps1` skips the emulator system image when `C:` has **under 10 GB** free; SDK-only is enough for Chrome and physical devices. After cleanup, retry emulator only if **≥10 GB** remains.

---

## Running on Chrome (recommended when disk is tight)

1. Phase 1 gateway at `http://127.0.0.1:3000`.
2. Run:

```powershell
cd apps/mobile
flutter run -d chrome --dart-define=API_BASE_URL=http://127.0.0.1:3000
```

API base URL for web matches Windows desktop: **`http://127.0.0.1:3000`**.

---

## Running on Android

1. Start emulator (after `install-android-sdk-windows.ps1` with enough disk):

   ```powershell
   flutter emulators --launch StreamHeaven_Pixel_API34
   ```

   Or start AVD from Android Studio.
2. Ensure gateway is reachable at `10.0.2.2:3000` (Android emulator alias for host `localhost`).

```powershell
cd apps/mobile
flutter run
```

Default API base URL for Android emulator: **`http://10.0.2.2:3000`** (set in `lib/core/config/env_config.dart`).

---

## Running on iOS (macOS only)

1. Open iOS Simulator.
2. Default API base URL: **`http://127.0.0.1:3000`**.

```bash
cd apps/mobile
flutter run
```

---

## API base URL configuration

Configured in `apps/mobile/lib/core/config/env_config.dart`.

| Environment | Default `API_BASE_URL` |
|-------------|------------------------|
| Android emulator | `http://10.0.2.2:3000` |
| iOS simulator | `http://127.0.0.1:3000` |
| Physical device | Must use host machine LAN IP |
| Windows desktop / web | `http://127.0.0.1:3000` |

### Physical device

Find your PC IP:

```powershell
ipconfig
```

Run with override:

```powershell
flutter run --dart-define=API_BASE_URL=http://192.168.1.10:3000
```

Also ensure Windows Firewall allows inbound TCP **3000** on private networks.

### Other dart-defines

| Define | Default | Purpose |
|--------|---------|---------|
| `API_BASE_URL` | Platform default | Gateway REST |
| `REALTIME_BASE_URL` | Platform default `:3009` | Socket.IO stub |
| `APP_ID` | `social` | `X-App-Id` header |

Example:

```powershell
flutter run --dart-define=API_BASE_URL=http://10.0.2.2:3000 --dart-define=APP_ID=social
```

---

## Testing OTP flow end-to-end

1. Launch app → **Splash** checks secure storage for JWT.
2. No token → **Login** screen.
3. Enter 10-digit number (e.g. `9876543210` → sent as `+919876543210`).
4. Tap **Send OTP** → `POST /v1/auth/otp/send` via gateway.
5. **Dev shortcut:** with `SMS_PROVIDER=mock`, the send-OTP API returns `mockOtpCode` — the app pre-fills it on the verify screen. You can also read the code from the auth-service log: `[MOCK SMS] OTP 482917 sent to +91******3210`.

6. Enter 6-digit code (or tap verify if pre-filled) → `POST /v1/auth/otp/verify`.
7. Tokens saved in `flutter_secure_storage` → redirect to **Home**.
8. Open **Profile** → `GET /v1/users/me`.
9. Edit display name → `PATCH /v1/users/me`.
10. **Log out** → clears tokens, returns to login.

### Troubleshooting

| Issue | Fix |
|-------|-----|
| Connection refused | Gateway not running; wrong `API_BASE_URL` for emulator vs device |
| OTP invalid | Use latest `requestId`; code expires in 300s |
| 401 on profile | Token cleared — log in again |
| Rate limit on OTP | Change phone or clear Redis key `sh:otp:rate:*` in dev |

---

## Architecture (Phase 2a)

| Layer | Package / path |
|-------|----------------|
| State | `flutter_riverpod` — `authStateProvider`, `profileControllerProvider` |
| Navigation | `go_router` — splash, login, verify, home, profile |
| HTTP | `dio` — interceptors for JWT, `X-App-Id`, `X-Device-Id` |
| Storage | `flutter_secure_storage` — access/refresh tokens, device ID |
| Realtime | `socket_io_client` stub — optional connect to `/presence` |
| UI | `packages/design-system` — dark theme, buttons, fields |

### Routes

| Path | Screen |
|------|--------|
| `/splash` | Session restore |
| `/login` | Phone input, send OTP |
| `/login/verify` | OTP verification |
| `/home` | Placeholder home |
| `/profile` | Profile view/edit, logout |

---

## Implemented vs stubbed

### Implemented

- Splash session check (token + profile validation)
- Phone OTP login (+91 default)
- JWT persistence and auth headers
- Profile fetch and display name edit
- Logout (local + best-effort server)
- Dark Stream Heaven theme
- Design system tokens and base widgets
- English l10n stub with 9-locale placeholder list

### Stubbed / deferred

- Full ARB files for HI, TE, TA, KN, ML, BN, MR, PA
- Feed, reels, chat, livestream, OTT
- Firebase SDK (REST OTP via gateway only)
- Socket.IO ping/presence handlers
- Token refresh interceptor
- `@riverpod` codegen (manual providers for Phase 2a)
- Golden tests for design system

---

## Validation commands

```powershell
cd apps/mobile
flutter pub get
flutter analyze
flutter test
```

---

## Related docs

- [Phase 1 Setup Guide](./PHASE-1-SETUP-GUIDE.md)
- [Flutter UI Rules](../platform-governance/flutter-ui-rules.md)
- [Auth API](../packages/shared-contracts/openapi/auth.v1.yaml)
- [User API](../packages/shared-contracts/openapi/user.v1.yaml)

---

*Phase 2a — Flutter app shell — Stream Heaven*
