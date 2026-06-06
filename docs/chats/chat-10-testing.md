# Chat 10 — Testing + QA + Automation

## Scope

Unit, integration, E2E, load, websocket stress tests, API contract tests, CI validation, agent quality audits.

## Attach Folders

- `ai-agents/testing/`
- `scripts/`
- `docs/`

## Primary Agents

| Agent | Path |
|-------|------|
| E2E Test Architect | `ai-agents/testing/e2e-test-architect.md` |
| API Contract Test Agent | `ai-agents/testing/api-contract-test-agent.md` |
| Load Test Agent | `ai-agents/testing/load-test-agent.md` |
| Integration Smoke Test | `ai-agents/testing/integration-smoke-test-agent.md` |
| Agent Skill Validator | `ai-agents/meta/agent-skill-validator-agent.md` |

## Deliverables

- [ ] `node scripts/validate-agents.mjs` in CI (exists locally)
- [ ] Contract compatibility tests
- [ ] Integration smoke tests for auth + user
- [ ] WebSocket stress test suite
- [ ] E2E Flutter driver tests
- [ ] Load test architecture (k6 / Artillery)

## Phase Alignment

**Phase 1** — contract tests + smoke tests alongside each service. **Phase 5** — full load/chaos.

## Multi-Chat Ready

**Yes** — validation script operational (366 agents, 0 FAIL). CI pipeline not yet wired.
