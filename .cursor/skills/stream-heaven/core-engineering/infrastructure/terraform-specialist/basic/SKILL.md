---
name: stream-heaven-core-engineering-infrastructure-terraform-specialist-basic
description: >-
  Basic Cursor skill for Stream Heaven Terraform Specialist (phase 5).
  Single-agent execution with governance prefix and structural validation.
---

# Terraform Specialist — Basic

## When to use

- User invokes **Terraform Specialist** or work in **core-engineering/infrastructure** (phase 5)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/core-engineering/infrastructure/terraform-specialist.md`
- **Role:** Terraform Specialist specialist for Stream Heaven's infrastructure domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/core-engineering/infrastructure/terraform-specialist.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### Kubernetes Foundations
Deploy:
- Design AWS and Cloudflare topology for Terraform: compute, CDN, WAF, and Secrets Manager usage. (Terraform Specialist scope)
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
- Maintain IaC manifests and GitOps flows for NestJS services on EKS/ECS with zero-downtime deploys.

### Networking & Ingress
Configure:
- ingress controller with TLS termination
- internal service mesh or ClusterIP communication
- NetworkPolicies for least-privilege pod traffic
- Cloudflare tunnel or WAF integration at edge
- api-gateway as external traffic entry
- Plan PostgreSQL (Neon) and Redis cluster strategy per environment with disaster recovery RPO/RTO.

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

- Basic: `.cursor/skills/stream-heaven/core-engineering/infrastructure/terraform-specialist/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/infrastructure/terraform-specialist/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
