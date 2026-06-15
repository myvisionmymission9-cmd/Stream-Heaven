---
name: stream-heaven-apps-social-app-home-feed-local-run-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Home Feed Local Run (phase 8).
  Home Feed multi-agent orchestration, ADRs, production validation.
---

# Home Feed Local Run — Advanced

## When to use

- Multi-chat orchestration for “link not working” across UI, API, and infra
- User needs Phase 1 backend + Flutter together with full smoke validation
- Production deploy readiness (explicitly separate from local run)

## Agent

- **Path:** `apps/social-app/agents/home-feed/home-feed-local-run-agent.md`

## Scope (advanced)

- Coordinate via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Chain: local-dev-bootstrap-agent → setup-phase1.ps1 → API health → flutter run
- ADR for architecture forks: `docs/adr/SH-000-template.md`
- Run `node scripts/test-golden-agents.mjs` after bulk agent changes
- Enforce boundary: local run ≠ deploy; defer hosting to infra/devops agents

## Orchestration

- **UI:** home-feed-flutter-ui-agent
- **QA:** home-feed-qa-agent
- **Local run:** home-feed-local-run-agent (this agent)
- **Phase 1 backend:** ai-agents/meta/local-dev-bootstrap-agent.md
- **Deploy/hosting:** out of scope — escalate to platform infra when user needs public URL

## Validation

```powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
cd apps/mobile
flutter test test/social_home_shell_test.dart
# Optional when Docker running:
# .\scripts\setup-phase1.ps1
# curl http://127.0.0.1:3000/v1/health
```

## Troubleshooting matrix

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Browser shows JSON at :3000 | Hit API gateway, not UI | `flutter run -d chrome` from apps/mobile |
| Connection refused :3000 | Docker/backend not running | Start Docker Desktop, run setup-phase1.ps1 |
| “App link” 404 / DNS fail | No deploy exists | Local Flutter only until deploy pipeline |
| Blank feed | Mock provider empty | Check social_home_mock_data.dart; tests should pass |
