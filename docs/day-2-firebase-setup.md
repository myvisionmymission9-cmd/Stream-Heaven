# Day 2 — Firebase Phone OTP Setup (Stream Heaven Mobile)

This guide configures **Firebase Authentication (Phone)** for `apps/mobile`. Native config files are **not committed**; each developer adds them locally.

## Prerequisites

- Flutter stable (3.24+) and Android Studio / Xcode
- A Firebase project with **Blaze** or **Spark** plan (Phone Auth works on Spark with quotas)
- [Firebase CLI](https://firebase.google.com/docs/cli) and [FlutterFire CLI](https://firebase.flutter.dev/docs/cli):

```bash
dart pub global activate flutterfire_cli
```

## 1. Create / select Firebase project

1. Open [Firebase Console](https://console.firebase.google.com/).
2. Create a project (or use an existing Stream Heaven project).
3. Go to **Build → Authentication → Sign-in method**.
4. Enable **Phone** and save.

### Test phone numbers (recommended for dev)

Under **Authentication → Sign-in method → Phone → Phone numbers for testing**, add entries such as:

| Phone number   | OTP code |
|----------------|----------|
| +1 650-555-1234 | 123456   |

Test numbers skip SMS billing and work without a real device SIM.

## 2. Register Android app

1. Firebase Console → **Project settings → Your apps → Add app → Android**.
2. Package name: `com.streamheaven.stream_heaven_mobile` (must match `applicationId` in `android/app/build.gradle.kts`).
3. Download **`google-services.json`**.
4. Place it at:

```
apps/mobile/android/app/google-services.json
```

This path is gitignored. Do not commit it.

Gradle is already configured:

- `android/settings.gradle.kts` — Google Services plugin
- `android/app/build.gradle.kts` — `com.google.gms.google-services`, `minSdk` ≥ 23

## 3. Register iOS app

1. Firebase Console → add **iOS** app.
2. Bundle ID: `com.streamheaven.streamHeavenMobile` (see `ios/Runner.xcodeproj` / `firebase_options.dart`).
3. Download **`GoogleService-Info.plist`**.
4. Place it at:

```
apps/mobile/ios/Runner/GoogleService-Info.plist
```

Add the file to the Xcode **Runner** target (drag into Runner in Xcode if needed).

## 4. FlutterFire options (recommended)

From the repo root:

```bash
cd apps/mobile
flutterfire configure
```

This updates `lib/core/firebase/firebase_options.dart` with non-secret project identifiers. You may commit `firebase_options.dart` **after** replacing `REPLACE_ME` placeholders, or keep it local-only.

`DefaultFirebaseOptions.isConfigured` must be `true` for release builds.

## 5. Backend token exchange

After Firebase verifies the phone, the app exchanges the Firebase ID token with the API gateway:

```
POST /v1/auth/firebase/exchange
{ "firebaseIdToken": "<token>" }
```

Ensure Phase 1 backend is running (`services/api-gateway`, `services/auth-service`) and `API_BASE_URL` points to your gateway (see `apps/mobile` env / `--dart-define`).

## 6. Local run without Firebase (optional)

For UI-only work without Firebase:

```bash
flutter run --dart-define=DEV_SKIP_AUTH=true
```

This bypasses auth and lands on home with a dev user ID.

## 7. Verify setup

```bash
cd apps/mobile
flutter pub get
flutter analyze
flutter test test/login_screen_test.dart
flutter run
```

Expected flow: **Splash → Login → OTP → Home**.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `operation-not-allowed` | Enable Phone provider in Firebase Console |
| `invalid-phone-number` | Use E.164 format (`+91…`) |
| `network-request-failed` | Check device network / emulator DNS |
| Android build: missing `google-services.json` | Add file per step 2 |
| iOS: Firebase not configured | Add `GoogleService-Info.plist` and run `flutterfire configure` |
| SMS not received (prod number) | Use test numbers first; check Firebase SMS region settings |

## Security notes

- Never commit `google-services.json`, `GoogleService-Info.plist`, or API keys in source control.
- Use Firebase App Check and rate limits before production launch.
- Rotate keys if a config file was ever committed publicly.
