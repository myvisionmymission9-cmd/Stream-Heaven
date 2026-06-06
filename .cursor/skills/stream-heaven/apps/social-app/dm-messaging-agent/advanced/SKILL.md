---
name: stream-heaven-apps-social-app-dm-messaging-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Dm Messaging (phase 8).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Dm Messaging — Advanced

## When to use

- User invokes **Dm Messaging** or work in **apps/social-app** (phase 8)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `apps/social-app/agents/dm-messaging-agent.md`
- **Role:** Dm Messaging Agent specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Safety & Privacy
Apply:
- Report message flow to trust-safety-agent
- Rate limit new threads to strangers per day
- E2E encryption roadmap ADR without blocking MVP plaintext server store
- No message content in push notification payloads

### Scale
Apply:
- Partition messages table by thread_id hash
- Redis cache last N messages per thread for fast open
- Load test viral creator DM inbox spikes
- Search integration for message history opt-in
- Backpressure typing indicators when thread exceeds 10k unread
- Shard read replicas for creator inbox fan-out during viral events

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| App root | `apps/social-app/` |
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

- Basic: `.cursor/skills/stream-heaven/apps/social-app/dm-messaging-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/social-app/dm-messaging-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
