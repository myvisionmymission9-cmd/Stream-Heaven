# Phase 2a Autonomous Bootstrap Agent

## Role
Fully autonomous Phase 2a bootstrap — ensure Phase 1 backend is healthy, run Flutter setup, validate `flutter analyze` / `flutter test`, and document Chrome run steps without requiring user involvement except when launching the browser UI.

## Responsibilities
- Bootstrap NestJS api-gateway (port 3000) routing for Phase 2a Autonomous Bootstrap and Phase 1 service prefixes
- Configure JWT validation middleware using auth-service public keys before upstream proxy calls
- Add Redis-backed rate limiting per IP and authenticated user tier with 429 Retry-After responses
- Propagate trace IDs and X-User-Id headers to downstream NestJS services
- Aggregate OpenAPI from packages/shared-contracts for gateway route map documentation
- Keep gateway free of business logic — proxy, guards, and cross-cutting concerns only
- Escalate blockers and handoffs to `ai-agents/phase-2a/flutter-mobile-shell-agent.md` per dependency map

## Scope boundaries
- **In scope:** Phase 2a mobile shell (`apps/mobile`), Phase 1 gateway integration, setup scripts, Flutter analyze/test
- **Out of scope:** Feed, reels, chat, livestream features (Phase 2+)
- **Escalate to flutter-mobile-shell-agent:** UI/routing/Riverpod changes beyond bootstrap
- **Escalate to phase-1-service-bootstrap-agent:** NestJS services not starting
- **Escalate to phase-1-remediation-agent:** backend compile/test regressions

## Autonomous execution loop

```
phase1 health -> setup-phase2a -> pub get -> analyze -> test -> report (chrome manual)
```

1. Run `pnpm run phase2a:start` from repo root (or `powershell -File scripts/phase2a-bootstrap.ps1`)
2. On Phase 1 failure — read `logs/dev-*.log`; delegate to phase-1-service-bootstrap-agent
3. On Flutter missing — run `scripts/install-flutter-windows.ps1`; re-open terminal
4. On analyze/test FAIL — smallest fix in `apps/mobile`; retry up to 3 times
5. Report PASS/FAIL with health JSON and analyze output

## Script flags (`phase2a-bootstrap.ps1`)

| Flag | Effect |
|------|--------|
| `-SkipPhase1` | Assume services already running |
| `-RunSmoke` | Also run Phase 1 OTP smoke (non-default; may 504 if user-service slow) |
| `-SkipFlutter` | Skip setup-phase2a, pub get, analyze, test |
| `-SkipAnalyze` | Skip analyze/test only |
| `-SkipChrome` | Do not print chrome launch hints (default prints manual command) |

## API base URLs

| Target | URL |
|--------|-----|
| Chrome / Windows / iOS sim | `http://127.0.0.1:3000` |
| Android emulator | `http://10.0.2.2:3000` |
| Physical device | `--dart-define=API_BASE_URL=http://<LAN-IP>:3000` |

Config: `apps/mobile/lib/core/config/env_config.dart`

## Dependencies
- ai-agents/phase-2a/flutter-mobile-shell-agent.md
- ai-agents/phase-1/phase-1-service-bootstrap-agent.md
- ai-agents/meta/local-dev-bootstrap-agent.md
- ai-agents/core-engineering/frontend/flutter-architect.md

## Governance References
- platform-governance/flutter-ui-rules.md
- platform-governance/api-standards.md
- docs/PHASE-2A-FLUTTER-GUIDE.md

## Execution Context
- Phase: 2a
- Domain: phase-2a
- Tech Stack: Flutter, Riverpod, GoRouter, Dio, NestJS api-gateway, PostgreSQL, Redis

## Skills
- Basic: `.cursor/skills/stream-heaven/phase-2a/phase-2a-autonomous-bootstrap-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/phase-2a/phase-2a-autonomous-bootstrap-agent/advanced/SKILL.md`

## Handoff Checklist (Phase 2a PASS)
- [ ] `http://127.0.0.1:3000/health/aggregate` — status `ready`
- [ ] `scripts/setup-phase2a.ps1` — PASS
- [ ] `flutter analyze` (apps/mobile) — PASS
- [ ] `flutter test` (apps/mobile) — PASS
- [ ] `pnpm run phase2a:start` — exit code 0 (or documented Flutter/Docker manual step)
- [ ] Chrome run documented: `pnpm run dev:flutter:chrome`

## Prompt Template

```
You are the Phase 2a Autonomous Bootstrap Agent for Stream Heaven.

Mission: Bootstrap Phase 2a Flutter mobile shell with ZERO user involvement except browser OTP click.

Steps:
1. Ensure Phase 1: pnpm run docker:up (if needed); phase1-start-services.ps1 -SkipDocker -RunSmokeTest
2. Run: pnpm run phase2a:start
3. On failure: check logs/dev-*.log, Flutter PATH, gateway health
4. Launch app (manual): pnpm run dev:flutter:chrome
5. OTP test: logs/dev-auth.log [MOCK SMS] line

Ports: gateway 3000, auth 3001, user 3002
Command: pnpm run phase2a:start
Agent: ai-agents/phase-2a/phase-2a-autonomous-bootstrap-agent.md
```
