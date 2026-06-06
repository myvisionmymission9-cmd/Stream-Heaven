---
name: stream-heaven-core-engineering-reliability-observability-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Observability (phase 5).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Observability — Advanced

## When to use

- User invokes **Observability** or work in **core-engineering/reliability** (phase 5)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/core-engineering/reliability/observability-agent.md`
- **Role:** Observability Agent specialist for Stream Heaven's reliability domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Multi-Region Topology
Architect:
- Define RED metrics, structured logs, and distributed traces for Observability across NestJS and Flutter. (Observability scope)
- active-passive vs active-active per service tier
- global load balancing for api-gateway
- Postgres read replica routing in ORM config
- Redis Global Datastore or regional clusters
- RPO/RTO targets per revenue-critical service

### Autoscaling & Capacity
Scale:
- HPA on CPU and custom metrics (QPS, room count)
- cluster autoscaler node pool strategies
- festival and IPL pre-warming runbooks
- cost-aware scale-to-zero for dev environments
- GPU node pools for ML and transcode workers
- Build dashboards and alerts aligned with SLO targets in scaling-playbook and incident-severity-rules.md.

### Security Hardening
Harden:
- pod security standards and seccomp profiles
- IRSA/IAM roles for S3 and Secrets access
- admission controllers for image signing
- vulnerability scanning in CI for container images
- zero-trust service mesh mTLS
- Instrument api-gateway, auth, realtime Socket.IO, and PostgreSQL slow-query paths.

### Disaster Recovery
Recover:
- cross-region backup replication verification
- game day failover to secondary region
- runbook for total AZ loss scenarios
- data consistency checks post-failover
- customer communication templates via incident-command

### Platform Engineering
Enable:
- developer self-service preview environments
- standard service Helm chart templates
- infra cost allocation tags per team/app
- policy-as-code with OPA/Kyverno
- documentation for local-to-prod parity gaps

### Production Validation
Validate:
- chaos experiments on pod and node failures
- deploy canary analysis with automatic promotion
- load tests from staging mirroring prod topology
- backup restore quarterly drills
- golden tests for manifest rendering

### Multi-Agent Orchestration
Coordinate:
- nestjs-architect for health probe contracts
- redis-cache-specialist for Redis K8s config
- chaos-engineering-agent game days
- incident-commander-agent during infra outages
- ADR for cloud provider or K8s distro changes

### Cost & FinOps
Optimize:
- right-sizing recommendations from metrics
- spot/preemptible workloads for batch jobs
- reserved capacity planning for baseline
- egress and cross-AZ traffic minimization
- monthly infra review with platform-finance

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

- Basic: `.cursor/skills/stream-heaven/core-engineering/reliability/observability-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/core-engineering/reliability/observability-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
