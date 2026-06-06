# Chat 9 — Admin + Moderation

## Scope

Admin dashboards, moderation pipelines, abuse prevention, fraud, reporting, audit logs, agency dashboards, RBAC admin.

## Attach Folders

- `ai-agents/safety/`
- `ai-agents/community-governance/`
- `apps/social-app/agents/` (moderation agents)

## Primary Agents

| Agent | Path |
|-------|------|
| Content Safety Agent | `ai-agents/safety/content-safety-agent.md` |
| Trust Safety Reviewer | `ai-agents/safety/trust-safety-reviewer.md` |
| Community Moderator | `apps/social-app/agents/community-moderator-agent.md` |
| Content Moderation Pipeline | `apps/social-app/agents/content-moderation-pipeline.md` |
| Age Gate Agent | `ai-agents/safety/age-gate-agent.md` |

## Deliverables

- [ ] Admin RBAC architecture
- [ ] Moderation queue and review UI spec
- [ ] Abuse detection pipeline design
- [ ] Audit log schema
- [ ] Agency dashboard requirements
- [ ] Report/block API contracts

## Phase Alignment

**Phase 2** — basic moderation before social launch. **Phase 3+** — agency dashboards.

## Multi-Chat Ready

**Yes** (agents/docs) — **No** (admin UI/services). Safety agents scaffolded.
