---
name: stream-heaven-data-science-cohort-analysis-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Cohort Analysis (phase 14).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Cohort Analysis — Advanced

## When to use

- User invokes **Cohort Analysis** or work in **data-science** (phase 14)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/data-science/cohort-analysis-agent.md`
- **Role:** Cohort Analysis Agent specialist for Stream Heaven's data science domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Large-Scale Training Infrastructure
Architect:
- Own Cohort Analysis deliverables in data-science domain for Stream Heaven Phase 14. (Cohort Analysis scope)
- distributed training on GPU clusters
- data pipeline orchestration with Airflow/Prefect
- training job scheduling and priority queues
- checkpoint management and resume from failure
- multi-region training data replication

### Real-Time Inference Optimization
Optimize:
- model quantization for edge deployment
- inference batching for throughput optimization
- caching frequent prediction requests in Redis
- autoscaling inference pods based on QPS
- latency profiling and bottleneck identification
- Define or update packages/shared-contracts schemas before NestJS, Flutter, or Socket.IO implementation.

### Recommendation System Architecture
Build:
- two-tower model for candidate retrieval
- ranking model with multi-objective optimization
- exploration/exploitation balance (multi-armed bandit)
- cold-start handling for new users and content
- real-time feature updates from event streams
- Apply platform-governance standards for API, security, database, deployment, and testing surfaces.

### MLOps & Model Lifecycle
Operate:
- CI/CD for model training and deployment pipelines
- automated model performance monitoring in production
- data drift detection and retraining triggers
- model registry with lineage tracking
- canary deployment for model version rollouts

### LLM Integration Patterns
Integrate:
- RAG pipeline for Astro consultation knowledge base
- prompt engineering with guardrails and output filtering
- LLM cost tracking per feature and user tier
- fallback chains for LLM provider outages
- human-in-the-loop review for high-stakes outputs

### Production Validation
Validate:
- offline/online metric parity checks
- A/B test statistical significance frameworks
- model fairness audits across demographic segments
- load testing inference endpoints at peak traffic
- golden agent tests for ML pipeline edge cases

### Multi-Agent Orchestration
Coordinate:
- feature-engineering-agent for feature store specs
- embedding-agent for vector generation pipelines
- model-serving-agent for deployment topology
- feed-ranking-agent for recommendation integration
- ADR for ML architecture and model selection decisions

### Cost & Resource Management
Manage:
- GPU utilization dashboards and right-sizing
- spot instance strategy for batch training jobs
- inference cost per prediction tracking
- training data storage lifecycle policies
- budget alerts for runaway training experiments

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

- Basic: `.cursor/skills/stream-heaven/data-science/cohort-analysis-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/data-science/cohort-analysis-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
