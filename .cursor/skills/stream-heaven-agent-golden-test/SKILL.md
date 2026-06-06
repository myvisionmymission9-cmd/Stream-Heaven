---
name: stream-heaven-agent-golden-test
description: >-
  Validate Stream Heaven AI agent markdown files — run validate-agents.mjs and
  golden-agent test suite. Use when creating agents, skills, or auditing agent
  quality after bulk changes.
---

# Stream Heaven Agent Golden Test

## When to use

- After creating or editing agent `.md` files under `ai-agents/`
- User asks to test, validate, or install agents
- Before registry updates or agent bulk imports

## Golden agents (must PASS)

These are the **currently important** agents for Phase 1–2a work:

| Agent | Path |
|-------|------|
| Local Dev Bootstrap | `ai-agents/meta/local-dev-bootstrap-agent.md` |
| Flutter Mobile Shell | `ai-agents/phase-2a/flutter-mobile-shell-agent.md` |
| Auth Service | `ai-agents/phase-1/auth-service-agent.md` |
| Profile Service | `ai-agents/phase-1/profile-service-agent.md` |
| API Gateway Bootstrap | `ai-agents/phase-1/api-gateway-bootstrap-agent.md` |
| Integration Smoke Test | `ai-agents/testing/integration-smoke-test-agent.md` |
| Agent Prompt Tester | `ai-agents/meta/agent-prompt-tester-agent.md` |
| Agent Skill Validator | `ai-agents/meta/agent-skill-validator-agent.md` |

## Run tests

From repo root:

```powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
node scripts/test-golden-agents.mjs
node scripts/test-golden-agents.mjs --verbose
```

Exit code 0 = all golden agents PASS with no FAIL in full scan.

## Required agent sections

Every agent file must include:

- `## Role`
- `## Responsibilities`
- `## Prompt Template` (with fenced code block)
- `## Dependencies`
- `## Governance References`

## Creating a new agent

1. Copy structure from `ai-agents/phase-2a/flutter-mobile-shell-agent.md`
2. Use **domain-specific** responsibilities (not boilerplate "Design and implement frontend capabilities")
3. Mention stack: Flutter, NestJS, PostgreSQL, Redis, Socket.IO, AWS
4. Add to golden list in `scripts/test-golden-agents.mjs` if phase-critical
5. Register in `ai-agents/AGENT-REGISTRY.md`
6. Run both validation scripts

## Cursor skills map

| Skill | Purpose |
|-------|---------|
| `.cursor/skills/stream-heaven-phase1-dev/` | Backend local setup |
| `.cursor/skills/stream-heaven-phase2a-flutter/` | Mobile app setup |
| `.cursor/skills/stream-heaven-agent-golden-test/` | This skill |
| `.cursor/skills/stream-heaven/<domain>/<slug>/basic\|advanced/` | Per-agent paired skills (see `scripts/agent-skill-manifest.mjs`) |

Agents are **not npm packages** — they are markdown prompt templates. "Install" = ensure files exist + skills point to them + validation passes.
