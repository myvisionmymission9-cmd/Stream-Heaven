---
name: stream-heaven-safety-deepfake-detection-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Deepfake Detection (phase 20).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Deepfake Detection — Advanced

## When to use

- User invokes **Deepfake Detection** or work in **safety** (phase 20)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/safety/deepfake-detection-agent.md`
- **Role:** Deepfake on upload/live.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### AI Moderation at Scale
Scale:
- deepfake-detection-agent with human appeals via appeal-review-agent. (Deepfake Detection scope)
- multimodal models for video, audio, and text
- human-in-the-loop active learning pipelines
- regional language moderation models (Hindi, Tamil, etc.)
- latency budgets for live moderation decisions
- false positive/negative monitoring dashboards

### Identity Verification
Verify:
- KYC document verification for creators and withdrawals
- liveness checks for high-risk account recovery
- government ID hashing and secure storage
- verification vendor abstraction via env config
- privacy-minimized verification data retention
- Audit IDs; minimal biometric retention.

### Crisis & CSAM Response
Respond:
- immediate content takedown automation
- NCMEC/regulatory reporting workflows
- preservation of evidence for investigations
- employee wellness support for reviewers
- post-crisis policy updates and ADRs
- Escalate to csam-detection-agent when required.

### Cross-App Safety Federation
Federate:
- unified ban list across four apps
- cross-app report history for repeat offenders
- shared threat intelligence feeds
- wallet freeze coordination on fraud rings
- identity-merge-agent alignment on duplicates

### Live Safety Operations
Protect:
- emergency stream termination controls
- moderator raid tools for high-traffic rooms
- minor safety mode in live recommendations
- dangerous challenge content proactive detection
- coordination with incident-command during crises

### Production Validation
Validate:
- red team tests for moderation bypass attempts
- synthetic harmful content in staging classifiers
- appeal SLA compliance monitoring
- reviewer throughput and accuracy QA sampling
- golden tests for policy edge cases

### Multi-Agent Orchestration
Coordinate:
- ai-moderation-agent model deployment
- legal-compliance-agent for policy updates
- trust-safety-reviewer for high-severity cases
- enterprise-security-agent for platform hardening
- ADR for moderation architecture changes

### Transparency & Governance
Report:
- transparency reports on removals and appeals
- bias audits on moderation models
- creator education on policy violations
- founder-war-room safety KPI reviews
- platform-governance feature-approval for safety tools

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

- Basic: `.cursor/skills/stream-heaven/safety/deepfake-detection-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/safety/deepfake-detection-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
