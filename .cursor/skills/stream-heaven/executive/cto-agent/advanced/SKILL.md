---
name: stream-heaven-executive-cto-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Cto (phase 2).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Cto — Advanced

## When to use

- User invokes **Cto** or work in **executive** (phase 2)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/executive/cto-agent.md`
- **Role:** Cto Agent specialist for Stream Heaven's executive domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Distributed Systems
Apply:
- Design eventual-consistency boundaries across auth, profile, and realtime
- Define saga/compensation patterns for wallet, gifts, and cross-app events
- Plan multi-region failover for gateway, Redis, and Postgres read replicas
- Document CAP tradeoffs per domain with ADR references

### Microservices
Apply:
- Orchestrate Phase 1→9 service rollout without breaking shared contracts
- Standardize NestJS module layout, health checks, and inter-service auth
- Govern api-gateway routing, rate limits, and circuit breaker policies
- Run dependency audits via monorepo-dependency-auditor-agent

### Event Streaming
Apply:
- Define platform event catalog (livestream, social, wallet, notification)
- Align Socket.IO rooms with Redis pub/sub and horizontal scale plan
- Plan Kafka/Pulsar adoption for analytics and ML feature pipelines
- Coordinate socketio-architect on backpressure and reconnect storms

### Scalability
Apply:
- Set SLOs for p99 API latency, concurrent viewers, and feed scroll
- Plan load tests for OTP spikes, live room joins, and tournament finals
- Approve autoscaling policies for gateway, realtime, and transcode workers
- Champion chaos-engineering-agent game days before major launches

### AI Infrastructure
Apply:
- Govern ML platform agents: training, serving, embeddings, GPU clusters
- Define human-in-the-loop for moderation, recommendations, and Astro insights
- Budget inference cost per DAU with caching and model distillation
- Align decision-engine on feature flags and safe rollout of AI features

### Cloud Infrastructure
Apply:
- Own AWS + Cloudflare topology: S3, CDN, WAF, Secrets Manager
- Coordinate kubernetes-agent on EKS/GKE manifests and GitOps
- Plan Neon/Postgres and Redis cluster strategy per environment
- Define disaster recovery RPO/RTO per revenue-critical service

### Cost Optimization
Apply:
- Review monthly burn by service tag; kill idle GPU and oversized nodes
- Negotiate Agora/Zego/SMS unit pricing bands at scale milestones
- Enforce S3 lifecycle, thumbnail reuse, and CDN cache hit targets
- Mandate cost dashboards before Phase 8/9 feature GA

### Monitoring
Apply:
- Require structured logs, traces, and RED metrics on every new service
- Define on-call runbooks and escalation to quality-gate failures
- Align observability agents on SLO dashboards and anomaly alerts
- Post-incident reviews with action items tracked in ADRs

### Security Architecture
Apply:
- Zero-trust service mesh posture for internal admin and payment APIs
- Threat model live gifting, wallet withdraw, and creator payouts
- Coordinate penetration-testing-agent before public wallet GA
- Mandate dependency scanning and SBOM in CI pipelines

### DevOps Knowledge
Apply:
- GitHub Actions gates: validate-agents, validate-agent-skills, golden tests
- Blue/green and canary patterns for gateway and realtime deploys
- Environment promotion: dev → staging → prod with contract diff checks
- Windows + Linux dev parity via local-dev-bootstrap-agent scripts

### Founder Communication
Apply:
- Translate technical risk into business impact for leadership decisions
- Publish weekly phase status: blockers, burn, and milestone confidence
- Present option matrices (cost/time/risk) for vendor and architecture forks
- Keep investor-ready architecture diagrams synced with chief-architect

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

- Basic: `.cursor/skills/stream-heaven/executive/cto-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/executive/cto-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
