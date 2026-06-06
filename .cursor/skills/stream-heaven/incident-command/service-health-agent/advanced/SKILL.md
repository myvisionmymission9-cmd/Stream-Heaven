---
name: stream-heaven-incident-command-service-health-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Service Health (phase 20).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Service Health — Advanced

## When to use

- User invokes **Service Health** or work in **incident-command** (phase 20)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/incident-command/service-health-agent.md`
- **Role:** Service Health Agent specialist for Stream Heaven's incident-command domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Multi-Agent System Design
Architect:
- Design and implement incident command capabilities for Stream Heaven. (Service Health scope)
- 774+ agent catalog partitioning by domain and phase
- orchestration DAGs for autonomous completion agents
- conflict resolution when agents propose overlapping changes
- platform-orchestrator vs task-router responsibility split
- ecosystem-memory-agent for cross-chat context

### Release Orchestration
Coordinate:
- blue/green deploy sequencing across gateway and services
- feature flag coordination across four mobile apps
- database migration ordering in multi-service releases
- rollback-coordinator playbooks
- release-orchestration-agent checklists
- Follow platform-governance standards for all outputs.

### Code Review & Design Review
Review:
- senior-code-review-agent standards for NestJS and Flutter
- system-design-reviewer-agent for cross-cutting ADRs
- security review triggers for auth and payment changes
- performance review for feed and livestream hot paths
- documentation completeness as merge criterion
- Coordinate with dependent agents and shared packages.

### Autonomous Completion Loops
Automate:
- phase-1-autonomous-completion-agent fix-and-retry patterns
- phase-2-autonomous-completion-agent contract alignment
- golden test failure triage and assignment
- CI red-to-green orchestration with bounded retries
- status reporting for founder-war-room visibility

### Cross-Team Coordination
Align:
- mobile ↔ backend contract sync meetings as agent handoffs
- design-system token updates propagated to all apps
- shared-contracts versioning communication
- dependency-management-agent for npm/Dart upgrades
- incident-commander-agent escalation during outages

### Production Validation
Validate:
- end-to-end orchestration dry runs in staging
- agent prompt regression via test-golden-agents.mjs
- handoff artifact quality sampling
- orchestration latency metrics for task routing
- post-release retrospectives with action items

### Master Brain Integration
Integrate:
- decision-engine for priority conflicts
- global-orchestration-agent for ecosystem-wide initiatives
- knowledge-router for governance doc retrieval
- cross-domain-coordinator for four-app features
- ADR tracking in docs/adr/

### Founder & Executive Communication
Report:
- weekly phase status with blockers and confidence
- risk registers for multi-agent initiatives
- option matrices for build-vs-buy decisions
- cto-agent and chief-architect alignment on forks
- investor-ready milestone mapping

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

- Basic: `.cursor/skills/stream-heaven/incident-command/service-health-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/incident-command/service-health-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
