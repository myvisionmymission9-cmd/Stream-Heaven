---
name: stream-heaven-enterprise-security-pen-test-coordinator-basic
description: >-
  Basic Cursor skill for Stream Heaven Pen Test Coordinator (phase 20).
  Single-agent execution with governance prefix and structural validation.
---

# Pen Test Coordinator — Basic

## When to use

- User invokes **Pen Test Coordinator** or work in **enterprise-security** (phase 20)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/enterprise-security/pen-test-coordinator.md`
- **Role:** Pen Test Coordinator specialist for Stream Heaven's enterprise security domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/enterprise-security/pen-test-coordinator.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Security Fundamentals
Apply:
- Define automated tests for Pen Test: unit, integration, contract, and smoke layers. (Pen Test Coordinator scope)
- platform-governance/security-rules.md as baseline
- defense in depth across network, app, and data layers
- least privilege access for services and agents
- secrets management via AWS Secrets Manager only
- security review gate for all new API endpoints

### Authentication & Authorization
Harden:
- JWT validation and token lifecycle management
- RBAC and ABAC policy enforcement patterns
- API key rotation and scope limitation
- multi-factor authentication for admin surfaces
- session fixation and CSRF prevention
- Maintain scripts/ test entry points with CI-friendly exit codes and structured failure output.

### Network & API Security
Protect:
- WAF rules via Cloudflare for common attack vectors
- rate limiting and DDoS mitigation strategies
- input validation and output encoding standards
- CORS and CSP header configuration
- TLS 1.3 enforcement and certificate management
- Validate NestJS, Flutter, PostgreSQL, and Redis behavior against acceptance criteria.

### Data Protection
Encrypt:
- PII encryption at rest (AES-256) and in transit (TLS)
- data masking in logs and analytics pipelines
- secure deletion and data retention policies
- Indian data localization compliance requirements
- key rotation schedules and HSM integration prep

### Threat Detection & Response
Monitor:
- SIEM integration for security event correlation
- anomaly detection on auth and payment flows
- vulnerability scanning in CI pipeline
- incident severity classification and escalation
- security runbooks for common attack scenarios

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

- Basic: `.cursor/skills/stream-heaven/enterprise-security/pen-test-coordinator/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/enterprise-security/pen-test-coordinator/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
