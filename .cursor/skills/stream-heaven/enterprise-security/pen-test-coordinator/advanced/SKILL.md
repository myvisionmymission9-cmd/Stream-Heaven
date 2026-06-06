---
name: stream-heaven-enterprise-security-pen-test-coordinator-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Pen Test Coordinator (phase 20).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Pen Test Coordinator — Advanced

## When to use

- User invokes **Pen Test Coordinator** or work in **enterprise-security** (phase 20)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/enterprise-security/pen-test-coordinator.md`
- **Role:** Pen Test Coordinator specialist for Stream Heaven's enterprise security domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Zero Trust Architecture
Implement:
- Design and implement enterprise security capabilities for Stream Heaven. (Pen Test Coordinator scope)
- micro-segmentation for service-to-service communication
- mTLS between internal microservices
- identity-aware proxy for admin and internal tools
- continuous verification instead of perimeter trust
- device trust scoring for mobile client access

### Advanced Threat Protection
Defend:
- bot detection and mitigation (CAPTCHA, behavioral analysis)
- credential stuffing detection and account lockout
- API abuse pattern recognition and auto-blocking
- supply chain security for npm/Dart dependencies
- red team exercise scope and remediation tracking
- Follow platform-governance standards for all outputs.

### Penetration Testing & Auditing
Audit:
- annual penetration test scope definition
- OWASP Top 10 remediation tracking
- security code review checklist for PRs
- bug bounty program structure and triage
- compliance audit preparation (SOC 2, ISO 27001 prep)
- Coordinate with dependent agents and shared packages.

### Encryption & Key Management
Manage:
- envelope encryption for database PII fields
- KMS key hierarchy and rotation automation
- HSM integration for payment and DRM keys
- secure key escrow for disaster recovery
- crypto agility plan for algorithm upgrades

### Incident Response Operations
Respond:
- security incident classification (P1 breach vs P3 scan)
- forensic data preservation procedures
- breach notification timelines and legal coordination
- post-incident root cause analysis template
- tabletop exercise schedule for security scenarios

### Production Validation
Validate:
- automated security scanning in CI/CD pipeline
- dependency vulnerability SLA for critical CVEs
- security regression tests for auth flows
- WAF rule effectiveness testing
- golden agent tests for security edge cases

### Multi-Agent Orchestration
Coordinate:
- auth-service-agent for token security alignment
- api-security-agent for endpoint protection
- credential-security-agent for secrets management
- ddos-protection-agent for traffic mitigation
- ADR for security architecture decisions

### Compliance & Governance
Ensure:
- Indian IT Act and data protection compliance mapping
- content moderation legal requirements per app
- payment PCI-DSS scope minimization
- privacy impact assessments for new features
- security training requirements for engineering team

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

- Basic: `.cursor/skills/stream-heaven/enterprise-security/pen-test-coordinator/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/enterprise-security/pen-test-coordinator/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
