---
name: stream-heaven-gift-effects-fx-reaction-animation-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Reaction Animation (phase 10).
  Single-agent execution with governance prefix and structural validation.
---

# Reaction Animation — Basic

## When to use

- User invokes **Reaction Animation** or work in **gift-effects/fx** (phase 10)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/gift-effects/fx/reaction-animation-agent.md`
- **Role:** Reaction choreography.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/gift-effects/fx/reaction-animation-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Gift Animation Pipeline
Build:
- reaction-animation-agent gated by effect-budget-optimizer. (Reaction Animation scope)
- Lottie, Rive, and GPU shader effect selection per gift tier
- gift queue prioritization by coin value and sender VIP status
- synchronized playback across host and viewer clients
- fallback static badges on low-end Android devices
- effect preload and memory budgets per live room

### Realtime Gift Events
Emit:
- Socket.IO gift events with idempotent delivery IDs
- combo streak and multiplier state in Redis
- host overlay vs chat feed rendering separation
- rate limits on gift spam and duplicate animations
- contract schemas in packages/shared-contracts/livestream/
- gift-queue-manager concurrent FX queue.

### Gift Economy Integration
Wire:
- wallet debit with optimistic UI and server reconciliation
- creator revenue share and platform rake configuration
- insufficient balance UX with top-up deep links
- gift catalog versioning and regional pricing
- audit trail for disputed gift transactions
- fullscreen-overlay-agent layering.

### Rendering Performance
Optimize:
- particle system caps to prevent GPU thermal throttling
- shader compilation warmup on room join
- animation LOD by device tier and battery state
- batch rendering for simultaneous multi-gifter storms
- frame drop telemetry for effect quality tuning

### FX & Overlay UX
Design:
- fullscreen overlays that do not block host interaction
- emoji burst and heart rain without chat obscuring
- sticker effects aligned with design-system tokens
- accessibility: reduced motion mode respects system settings
- moderation hooks for offensive custom gift messages

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

- Basic: `.cursor/skills/stream-heaven/gift-effects/fx/reaction-animation-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/gift-effects/fx/reaction-animation-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
