---
name: stream-heaven-apps-social-app-home-feed-local-run-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Home Feed Local Run (phase 8).
  Home Feed scoped — single-agent execution with governance prefix.
---

# Home Feed Local Run — Basic

## When to use

- User cannot open an “app link”, API URL, or expected hosted Home Feed
- User tries `http://127.0.0.1:3000` and expects the mobile UI
- Need copy-paste steps to run Home Feed locally with Flutter (mock data)

## Agent

- **Path:** `apps/social-app/agents/home-feed/home-feed-local-run-agent.md`
- **Role:** Autonomous local run — Flutter chrome/emulator, optional Phase 1 backend, link troubleshooting.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
- Open agent markdown and copy its `## Prompt Template` block
- Clarify: **no hosted app URL** in repo; `127.0.0.1:3000` is API only
- Run `node scripts/validate-agents.mjs` after agent edits

## Role-specific focus

- `flutter pub get`, `flutter test test/social_home_shell_test.dart`, `flutter run -d chrome`
- Check Docker (postgres/redis) and port 3000 only if user needs backend
- Report printed localhost URL from `flutter run`

## Key paths

| Resource | Path |
|----------|------|
| Home Feed UI | `apps/mobile/lib/features/social/presentation/home/social_home_shell.dart` |
| Router | `apps/mobile/lib/router/app_router.dart` (`/home`) |
| Phase 1 script | `scripts/setup-phase1.ps1` |
| Flutter phase skill | `.cursor/skills/stream-heaven-phase2a-flutter/SKILL.md` |
| Validate agents | `node scripts/validate-agents.mjs` |

## Validation

```powershell
cd apps/mobile
flutter pub get
flutter test test/social_home_shell_test.dart
node ../../scripts/validate-agents.mjs
```

## User messaging (always include)

1. No public deployment URL was created — opening `127.0.0.1:3000` shows API JSON, not the app.
2. Home Feed UI runs via Flutter; mock data works without backend.
3. To see UI today: `cd apps/mobile` then `flutter run -d chrome` and open the printed localhost URL.
