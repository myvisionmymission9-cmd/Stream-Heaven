---
name: stream-heaven-economy-gift-pricing-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Gift Pricing (phase 13).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Gift Pricing — Advanced

## When to use

- User invokes **Gift Pricing** or work in **economy** (phase 13)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/economy/gift-pricing-agent.md`
- **Role:** Gift Pricing Agent specialist for Stream Heaven's economy domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### GPU & Shader Architecture
Architect:
- Design and implement economy capabilities for Stream Heaven. (Gift Pricing scope)
- Metal/Vulkan/OpenGL ES fallback matrix for Flutter
- custom shader hot-reload pipeline for artists
- GPU memory pools shared across concurrent effects
- thermal-aware effect degradation policies
- profiling harness for Mali/Adreno GPU families

### Gift Storm Scale
Scale:
- 10k+ gifts/minute fan-out with Redis Streams
- priority queue coalescing for identical low-tier gifts
- CDN edge caching for popular Lottie assets
- regional effect servers for IPL and festival peaks
- chaos tests for gift queue backlog recovery
- Follow platform-governance standards for all outputs.

### Economy & Fraud Controls
Protect:
- velocity limits on high-value gift bursts
- collusion detection for wash trading patterns
- chargeback handling integrated with wallet ledger
- promotional gift credit expiration policies
- tax and payout reporting for creator earnings
- Coordinate with dependent agents and shared packages.

### Cross-Platform Effect Parity
Align:
- iOS/Android/Web effect fidelity acceptance criteria
- authoring toolchain for designers (After Effects → Lottie)
- A/B effect variants without client rebuilds
- versioned effect bundles with graceful downgrade
- cosmetics-agent coordination for avatar-linked gifts

### Live Room Integration
Integrate:
- PK battle gift multipliers and team scoring
- co-host gift split rules and display priority
- moderator mute of disruptive effect classes
- replay timeline gift markers for VOD
- Agora/Zego metadata channel for effect sync

### Production Validation
Validate:
- synthetic gift load tests per device tier
- p99 effect start latency SLO dashboards
- golden tests for combo and multiplier edge cases
- crash-free sessions metric during effect peaks
- incident runbooks for stuck gift queues

### Multi-Agent Orchestration
Coordinate:
- livestream-agent for room lifecycle contracts
- wallet-ledger-agent for debit/credit flows
- socketio-architect for event protocol versioning
- flutter-architect for overlay widget patterns
- ADR for new rendering engine adoption

### Creator Monetization UX
Enhance:
- gift goal progress widgets for hosts
- leaderboard snippets during PK rounds
- thank-you automation without spamming chat
- VIP badge tiers tied to cumulative gifting
- regional gift cultural localization (festivals, symbols)

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

- Basic: `.cursor/skills/stream-heaven/economy/gift-pricing-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/economy/gift-pricing-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
