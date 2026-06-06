# Chat 6 — DevOps + Kubernetes

## Scope

Docker, Kubernetes, Terraform, CI/CD, autoscaling, AWS infrastructure, monitoring, blue-green deployments, rollback.

## Attach Folders

- `infrastructure/`
- `ai-agents/core-engineering/infrastructure/`
- `.github/` (when created)

## Primary Agents

| Agent | Path |
|-------|------|
| Terraform Specialist | `ai-agents/core-engineering/infrastructure/terraform-specialist.md` |
| K8s Operator | `ai-agents/core-engineering/infrastructure/k8s-operator.md` |
| AWS Architect | `ai-agents/core-engineering/infrastructure/aws-architect.md` |
| Observability Engineer | `ai-agents/core-engineering/infrastructure/observability-engineer.md` |

## Deliverables

- [ ] Terraform modules (VPC, EKS, RDS, Redis, S3)
- [ ] Kubernetes manifests / Helm charts
- [ ] GitHub Actions CI/CD pipelines
- [ ] Staging and production environment configs
- [ ] Monitoring dashboards and alert rules

## Phase Alignment

**Phase 1** — Docker Compose local dev. **Phase 5** — full K8s production.

## Multi-Chat Ready

**Yes** (agents/docs) — **No** (IaC). Start Docker Compose alongside Chat 3 Phase 1 services.
