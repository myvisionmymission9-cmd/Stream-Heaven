---
name: stream-heaven-master-brain-priority-resolver-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Priority Resolver (phase 3).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Priority Resolver — Advanced

## When to use

- User invokes **Priority Resolver** or work in **master-brain** (phase 3)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/master-brain/priority-resolver.md`
- **Role:** Priority Resolver specialist for Stream Heaven's master brain domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check dependencies listed in the agent file before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + skill validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Advanced Architecture
Architect:
- Design and implement master brain capabilities for Stream Heaven. (Priority Resolver scope)
- cross-service integration design and dependency mapping
- scalability planning for peak Indian traffic patterns
- event-driven patterns with Redis Streams and pub/sub
- caching strategy with invalidation policies
- ADR drafts via docs/adr/SH-000-template.md for forks

### Production Readiness
Ensure:
- production-readiness-checklist alignment
- monitoring and alerting stub configuration
- graceful degradation for poor connectivity scenarios
- rollback procedures for failed deployments
- incident runbooks for domain-specific failures
- Follow platform-governance standards for all outputs.

### Performance & Scalability
Optimize:
- load testing methodology for domain endpoints
- database query optimization and index strategy
- CDN and caching for media-heavy features
- horizontal scaling patterns for stateless services
- cost control per platform-governance/cost-control-rules.md
- Coordinate with dependent agents and shared packages.

### Security & Compliance
Harden:
- platform-governance/security-rules.md compliance
- input validation and authorization on all endpoints
- PII handling and data retention policies
- audit logging for sensitive operations
- security review for new external integrations

### Multi-Agent Orchestration
Coordinate:
- task-router.md for cross-domain task delegation
- quality-gate.md validation before merge
- dependency agent handoffs documented in agent file
- cross-check shared-contracts before API changes
- enrich boilerplate Responsibilities to quality bar

### Testing & Quality Gates
Validate:
- golden agent tests via test-golden-agents.mjs
- contract tests against OpenAPI specifications
- integration smoke tests for service interactions
- CI pipeline alignment with local validation
- regression test suite for domain edge cases

### Observability & Operations
Monitor:
- structured logging with correlation IDs
- metrics endpoints for key domain operations
- alerting thresholds for error rate and latency
- dashboard requirements for domain KPIs
- post-incident review template for domain outages

### Cross-App Integration
Integrate:
- four-app ecosystem alignment (Social, Livestream, Astro, OTT)
- shared identity and wallet service consumption
- cross-app notification and deep link patterns
- consistent UX via design-system tokens
- i18n support for 9+ Indian languages

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| Shared contracts | `packages/shared-contracts/` |
| Validate agents | `node scripts/validate-agents.mjs` |
| Validate skills | `node scripts/validate-agent-skills.mjs` |

## Validation

```powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
node scripts/validate-all-agent-skills.mjs
node scripts/test-golden-agents.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/master-brain/priority-resolver/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/master-brain/priority-resolver/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
