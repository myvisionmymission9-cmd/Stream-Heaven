# Day 2 — Auth Testing Checklist

Use this checklist after implementing Firebase Phone OTP in `apps/mobile`.

## Environment

- [ ] `google-services.json` placed at `apps/mobile/android/app/` (Android)
- [ ] `GoogleService-Info.plist` in `apps/mobile/ios/Runner/` (iOS)
- [ ] Phone sign-in enabled in Firebase Console
- [ ] At least one **test phone number** configured (dev)
- [ ] `flutterfire configure` run OR `firebase_options.dart` has real values (not `REPLACE_ME`)
- [ ] Backend running; `API_BASE_URL` reachable from device/emulator
- [ ] `flutter pub get` and `flutter analyze` pass

## Automated tests

```bash
cd apps/mobile
flutter test test/login_screen_test.dart
flutter test
```

- [ ] Login screen widget tests pass
- [ ] Existing social/creator tests still pass

## Splash & session restore

- [ ] Cold start shows splash while session restores
- [ ] With valid Firebase + stored JWT: redirects to **Home** (not login)
- [ ] After logout + app restart: shows **Login**
- [ ] `DEV_SKIP_AUTH=true`: skips to home without Firebase

## Login screen

- [ ] Country code picker opens and changes dial code
- [ ] Invalid phone (too short) shows localized validation error
- [ ] Valid phone shows loading on Continue
- [ ] Network/Firebase errors surface in UI (not silent failure)

## OTP screen

- [ ] Navigates with masked phone subtitle
- [ ] Invalid OTP (< 6 digits) shows validation error
- [ ] Wrong OTP shows Firebase error message
- [ ] Correct OTP signs in and navigates to Home
- [ ] Resend disabled during countdown
- [ ] Resend enabled after countdown; new code can be entered
- [ ] Android auto-verify (if applicable) skips OTP and lands on Home

## Home & navigation

- [ ] Home AppBar shows welcome with phone or user id
- [ ] Bottom nav: Home, Reels, Live, Profile tabs switch content
- [ ] **Open social feed** opens `SocialHomeShell` (`/social-feed`)
- [ ] Profile tab **Edit profile** opens full profile screen
- [ ] Profile tab **Log out** clears session and returns to Login

## Router guards

- [ ] Unauthenticated user cannot open `/home` (redirect to login)
- [ ] Authenticated user cannot open `/login` (redirect to home)
- [ ] Deep link to `/social-feed` works when authenticated

## Backend integration

- [ ] `POST /v1/auth/firebase/exchange` succeeds after OTP verify
- [ ] Access token stored in secure storage
- [ ] Authenticated API calls include Bearer token
- [ ] Logout calls `POST /v1/auth/logout` (best effort) and clears tokens

## Dark theme & i18n

- [ ] Login and OTP readable in dark theme
- [ ] All user-visible strings come from `app_en.arb` (no hardcoded English in auth UI)

## Platform matrix (smoke)

| Platform | Login | OTP | Restore session | Logout |
|----------|-------|-----|-----------------|--------|
| Android emulator | | | | |
| Android device | | | | |
| iOS simulator | | | | |
| iOS device | | | | |

## Sign-off

- [ ] `flutter analyze` — no issues
- [ ] Manual smoke on primary dev device completed
- [ ] Firebase test numbers documented for team
