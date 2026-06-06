---
name: stream-heaven-apps-astro-app-consultation-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Consultation (phase 16).
  Single-agent execution with governance prefix and structural validation.
---

# Consultation — Basic

## When to use

- User invokes **Consultation** or work in **apps/astro-app** (phase 16)
- Focused task within this agent's scope

## Agent

- **Path:** `apps/astro-app/consultation-agent.md`
- **Role:** Consultation Agent specialist for Stream Heaven's astro-app domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `apps/astro-app/consultation-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Booking Flow
Apply:
- Astrologer availability slots with timezone conversion (IST default)
- /v1/astro/consultations/book, cancel, reschedule contracts
- Razorpay checkout session with webhook confirmation
- Session timer with auto-end and overtime billing rules

### Live Session
Apply:
- Agora audio/video room per consultation ID
- Recording consent checkbox and storage policy stub
- In-session chat with moderation hooks
- Reconnect handling for poor Indian mobile networks

### Compliance Copy
Apply:
- Mandatory disclaimer: entertainment not medical/legal/financial advice
- astro-disclaimer-compliance agent copy on every screen
- Refund policy display before payment
- Minor account booking restrictions

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| App root | `apps/astro-app/` |
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

- Basic: `.cursor/skills/stream-heaven/apps/astro-app/consultation-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/astro-app/consultation-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
