---
name: stream-heaven-phase-1-phase-1-remediation-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Phase 1 Remediation (phase 1).
  Single-agent execution with governance prefix and structural validation.
---

# Phase 1 Remediation — Basic

## When to use

- User invokes **Phase 1 Remediation** or work in **phase-1** (phase 1)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/phase-1/phase-1-remediation-agent.md`
- **Role:** Fully autonomous Phase 1 remediation specialist — diagnose and fix audit/CI/local failures across auth-service, user-service, api-gateway, and realtime-gateway without user involvement unless Docker Desktop is down.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/phase-1/phase-1-remediation-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Bootstrap Debug
Apply:
- Diagnose port 3000–3002, 3009 conflicts on Windows dev machines
- Docker compose health: postgres ready, redis PONG
- NestJS compile errors: missing env, bad imports, migration fail
- Parse logs/dev-*.log for stack traces and root cause

### Service Fix
Apply:
- Gateway proxy route typos and upstream URL mismatches
- Auth OTP dev log capture for smoke-test-phase1.ps1
- Redis connection string and session key schema fixes
- Profile migration ordering and seed data issues

### Script Repair
Apply:
- Patch setup-phase1.ps1 and phase1-start-services.ps1 minimally
- Preserve Windows PowerShell parity with documented bash alternatives
- Re-run smoke after each fix; document repro steps
- Avoid scope creep into Phase 2 features

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| Shared contracts | `packages/shared-contracts/` |
| Validate agents | `node scripts/validate-agents.mjs` |
| Validate skills | `node scripts/validate-agent-skills.mjs` |
| Deep skill check | `node scripts/validate-all-agent-skills.mjs` |
| Phase 1 setup | `scripts/setup-phase1.ps1` |

## Validation

```powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
node scripts/validate-all-agent-skills.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/phase-1/phase-1-remediation-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/phase-1/phase-1-remediation-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
