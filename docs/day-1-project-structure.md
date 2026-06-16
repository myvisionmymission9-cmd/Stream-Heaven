# Day 1 — Mobile App Project Structure (`apps/mobile/lib`)

Quick reference for what each folder does in the Stream Heaven Flutter app.

## Top level

| Path | Purpose |
|------|---------|
| `main.dart` | App entry point — calls `bootstrap()` then runs `StreamHeavenApp`. |
| `app.dart` | Root widget: theme, localization, Riverpod, and `GoRouter`. |
| `bootstrap/` | Startup wiring (Firebase init, orientation lock). |
| `router/` | Route definitions and auth-based redirects (`/splash`, `/login`, `/home`, …). |
| `l10n/` | Generated and source localization strings (`app_en.arb`). |

## `core/` — shared infrastructure

| Path | Purpose |
|------|---------|
| `core/api/` | Dio HTTP client, auth interceptor, API error mapping. |
| `core/config/` | Runtime config (`API_BASE_URL`, `DEV_SKIP_AUTH`, app id). |
| `core/errors/` | `AppException`, Firebase error mapping, user-facing messages. |
| `core/firebase/` | Firebase initialization and `firebase_options.dart` export. |
| `core/realtime/` | Socket.IO client for live features (connects after login). |
| `core/storage/` | Secure token storage (JWT access/refresh tokens). |

## `features/auth/` — phone login (Day 1 focus)

| Path | Purpose |
|------|---------|
| `data/auth_service.dart` | Firebase Phone Auth: send OTP, verify OTP, sign out. |
| `data/auth_repository.dart` | Exchanges Firebase ID token with backend `/v1/auth/firebase/exchange`. |
| `domain/` | Auth state (`authenticated` / `unauthenticated`) and session models. |
| `presentation/login_screen.dart` | Phone number + country code entry. |
| `presentation/otp_verify_screen.dart` | OTP entry, resend countdown, verification. |
| `presentation/providers/` | Riverpod `authStateProvider` — session restore, login, logout. |
| `presentation/widgets/` | Country code picker and dial-code validation helpers. |

**Day 1 flow:** Login → OTP → backend token exchange → Home.

## `features/home/` — post-login shell

| Path | Purpose |
|------|---------|
| `presentation/home_screen.dart` | Main tab shell (Home, Reels, Live, Profile) with logout. |

Placeholder tabs for Reels/Live; Profile tab links to profile screen and logout.

## `features/profile/` — user profile

| Path | Purpose |
|------|---------|
| `data/profile_repository.dart` | Fetches `/v1/users/me` after login. |
| `presentation/profile_screen.dart` | Edit profile UI. |
| `presentation/providers/` | Profile Riverpod providers. |

## Other feature folders (not Day 1 scope)

| Path | Purpose |
|------|---------|
| `features/splash/` | Loading screen while restoring session. |
| `features/social/` | Social feed, creator profiles (Phase 2+). |
| `features/livestream/` | Live rooms (future). |

## Architecture pattern

Each feature follows **data → domain → presentation**:

- **data** — API/Firebase calls
- **domain** — models and business state
- **presentation** — screens, widgets, Riverpod providers
