# Chat 1 — Governance + Architecture

## Scope

Governance docs, architecture standards, shared contracts, ADR/RFC systems, monorepo governance, observability and release governance.

## Attach Folders

- `platform-governance/`
- `docs/`
- `packages/shared-contracts/` (when created)

## Primary Agents

| Agent | Path |
|-------|------|
| Chief Architect | `ai-agents/executive/chief-architect.md` |
| ADR Writer | `ai-agents/platform-knowledge/adr-writer-agent.md` |
| API Contract Author | `ai-agents/core-engineering/backend/api-contract-author.md` |
| Monorepo Dependency Auditor | `ai-agents/core-engineering/monorepo-dependency-auditor-agent.md` |

## Deliverables

- [ ] OpenAPI/AsyncAPI stubs in `packages/shared-contracts/`
- [ ] ADRs in `docs/adr/SH-###-*.md`
- [ ] RFCs for major proposals in `docs/rfc/`
- [ ] Updates to governance docs when standards change
- [ ] Architecture overview maintenance

## Phase Alignment

**Phase 1** — contract schemas for auth, user, common errors; ADR for auth model.

## Multi-Chat Ready

**Yes** — governance layer complete; owns contract approval gate for all other chats.
