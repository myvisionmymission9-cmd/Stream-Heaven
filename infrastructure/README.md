# Stream Heaven — Infrastructure

DevOps, Terraform, Kubernetes manifests, and CI/CD templates for AWS + Cloudflare.

## Target Stack

| Component | Technology |
|-----------|------------|
| Compute | AWS EKS or ECS Fargate |
| Database | RDS PostgreSQL 15+, ElastiCache Redis 7+ |
| Storage | S3 + Cloudflare CDN |
| Edge | Cloudflare WAF, DNS, Workers (optional) |
| Secrets | AWS Secrets Manager |
| Observability | CloudWatch, OpenTelemetry, Grafana |

## Planned Layout

```text
infrastructure/
  terraform/
    modules/          # rds, redis, s3, eks
    environments/     # dev, staging, prod
  kubernetes/
    base/             # Kustomize bases per service
    overlays/
  ci/                 # GitHub Actions reusable workflows
```

Agents: `ai-agents/core-engineering/infrastructure/aws-architect.md`, `terraform-specialist.md`, `cloudflare-cdn-specialist.md`

Governance: [`platform-governance/deployment-rules.md`](../platform-governance/deployment-rules.md), [`disaster-recovery-rules.md`](../platform-governance/disaster-recovery-rules.md)
