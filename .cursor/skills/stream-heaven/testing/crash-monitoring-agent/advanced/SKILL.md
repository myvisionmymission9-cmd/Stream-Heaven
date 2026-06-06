---
name: stream-heaven-testing-crash-monitoring-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Crash Monitoring (phase 20).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Crash Monitoring — Advanced

## When to use

- User invokes **Crash Monitoring** or work in **testing** (phase 20)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/testing/crash-monitoring-agent.md`
- **Role:** Crashlytics/Sentry triage.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### E2E Test Architecture
Architect:
- crash-monitoring-agent test plans in CI with flake controls. (Crash Monitoring scope)
- e2e-test-architect harness across four apps
- test data factories with PII-safe fixtures
- parallel CI sharding for long E2E suites
- flaky test quarantine and remediation SLAs
- staging environment parity requirements

### CI/CD Quality Gates
Enforce:
- required checks: validate-agents, validate-agent-skills, golden
- coverage thresholds for critical modules only
- performance regression budgets in CI
- security scan gates for dependencies
- merge blocking on contract test failures
- Contract tests via openapi-contract-validation-agent.

### Device & Compatibility Matrix
Cover:
- Android API 24–34 device farm priorities
- iOS version support matrix
- screen size and notch layout regression suite
- accessibility testing with TalkBack/VoiceOver
- regional locale and RTL layout checks
- NestJS testcontainers for integration-testing-agent.

### Observability in Testing
Instrument:
- test run correlation with production trace formats
- crash monitoring integration for beta builds
- performance trace capture during load tests
- synthetic monitoring for production SLOs
- bug-reproduction-agent playbooks from telemetry

### Chaos Engineering Program
Operate:
- chaos-engineering-agent game day calendar
- blast radius containment for experiments
- automated rollback triggers on SLO breach
- hypothesis-driven failure injection docs
- post-game improvement backlog

### Production Validation
Validate:
- canary analysis metrics for releases
- shadow traffic comparison before cutover
- production smoke tests post-deploy
- data migration verification scripts
- incident replay tests from past outages

### Multi-Agent Orchestration
Coordinate:
- qa-automation-agent for CI wiring
- api-contract-author for schema updates
- flutter-architect for testability hooks
- quality-gate before release orchestration
- ADR for new testing infrastructure

### Test Data & Privacy
Protect:
- no production PII in test fixtures
- synthetic user generation for scale tests
- data masking in staging database refreshes
- GDPR-style deletion test scenarios
- secure cleanup after load test runs

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
node scripts/test-golden-agents.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/testing/crash-monitoring-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/testing/crash-monitoring-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
