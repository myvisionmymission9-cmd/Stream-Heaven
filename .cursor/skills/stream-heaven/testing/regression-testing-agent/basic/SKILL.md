---
name: stream-heaven-testing-regression-testing-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Regression Testing (phase 20).
  Single-agent execution with governance prefix and structural validation.
---

# Regression Testing — Basic

## When to use

- User invokes **Regression Testing** or work in **testing** (phase 20)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/testing/regression-testing-agent.md`
- **Role:** Regression suites on release branches.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/testing/regression-testing-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Test Strategy Design
Plan:
- regression-testing-agent test plans in CI with flake controls. (Regression Testing scope)
- test pyramid: unit → integration → E2E per service
- risk-based prioritization for auth, wallet, and live paths
- contract tests against OpenAPI in shared-contracts
- smoke test suites aligned with phase scripts
- acceptance criteria traceable to agent Responsibilities

### API & Contract Testing
Validate:
- openapi-contract-validation-agent workflows
- schema breaking change detection in CI
- negative test cases for auth and rate limits
- idempotency replay tests for wallet endpoints
- gateway proxy integration tests
- Contract tests via openapi-contract-validation-agent.

### Flutter & Mobile Testing
Test:
- widget tests for critical navigation flows
- golden file tests for design-system components
- integration tests with mock API servers
- low-end device manual test matrix
- offline sync and retry behavior validation
- NestJS testcontainers for integration-testing-agent.

### Performance & Load Testing
Benchmark:
- k6/Artillery scripts for gateway and feed endpoints
- concurrent viewer simulation for livestream joins
- OTP spike load tests for festival traffic
- memory leak detection on long live sessions
- startup time budgets on 2GB RAM devices

### Chaos & Resilience Testing
Probe:
- Redis and Postgres failure injection scenarios
- network partition tests for mobile clients
- Socket.IO reconnect storm simulations
- graceful degradation verification on 2G
- rollback validation after failed deploys

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| Shared contracts | `packages/shared-contracts/` |
| Validate agents | `node scripts/validate-agents.mjs` |
| Validate skills | `node scripts/validate-agent-skills.mjs` |
| Deep skill check | `node scripts/validate-all-agent-skills.mjs` |

## Validation

```powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
node scripts/validate-all-agent-skills.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/testing/regression-testing-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/testing/regression-testing-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
