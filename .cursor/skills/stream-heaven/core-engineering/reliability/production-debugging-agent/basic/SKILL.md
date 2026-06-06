---
name: stream-heaven-core-engineering-reliability-production-debugging-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven Production Debugging (phase 5).
  Single-agent execution with governance prefix and structural validation.
---

# Production Debugging — Basic

## When to use

- User invokes **Production Debugging** or work in **core-engineering/reliability** (phase 5)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/core-engineering/reliability/production-debugging-agent.md`
- **Role:** Production Debugging Agent specialist for Stream Heaven's reliability domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/core-engineering/reliability/production-debugging-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Kubernetes Foundations
Deploy:
- Design and implement reliability capabilities for Stream Heaven. (Production Debugging scope)
- EKS/GKE cluster baseline manifests in infra/
- namespace per environment: dev, staging, prod
- resource requests/limits for NestJS and worker pods
- liveness and readiness probes aligned with health modules
- secrets via External Secrets Operator — not in git

### GitOps & CI/CD
Automate:
- GitHub Actions deploy pipelines with approval gates
- image tagging and immutable release artifacts
- helm/kustomize overlays per environment
- rollback via previous manifest revision
- contract validation job before deploy stage
- Follow platform-governance standards for all outputs.

### Networking & Ingress
Configure:
- ingress controller with TLS termination
- internal service mesh or ClusterIP communication
- NetworkPolicies for least-privilege pod traffic
- Cloudflare tunnel or WAF integration at edge
- api-gateway as external traffic entry
- Coordinate with dependent agents and shared packages.

### Data Services Operations
Operate:
- managed Postgres (Neon/RDS) connection pooling
- Redis StatefulSet or Elasticache failover planning
- backup schedules and restore drill documentation
- migration job isolation and lock management
- storage class selection for persistent volumes

### Observability Stack
Instrument:
- Prometheus metrics scrape configs
- log aggregation with structured JSON
- OpenTelemetry collector sidecar pattern
- alertmanager routes to on-call rotations
- SLO dashboards for gateway and realtime

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

- Basic: `.cursor/skills/stream-heaven/core-engineering/reliability/production-debugging-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/reliability/production-debugging-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
