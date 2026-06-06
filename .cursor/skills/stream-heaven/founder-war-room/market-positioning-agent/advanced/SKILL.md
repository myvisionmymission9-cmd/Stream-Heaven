---
name: stream-heaven-founder-war-room-market-positioning-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Market Positioning (phase 20).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Market Positioning — Advanced

## When to use

- User invokes **Market Positioning** or work in **founder-war-room** (phase 20)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/founder-war-room/market-positioning-agent.md`
- **Role:** Market Positioning Agent specialist for Stream Heaven's founder-war-room domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Distributed Systems Skills
Understand:
- Own Market Positioning deliverables in founder-war-room domain for Stream Heaven Phase 20. (Market Positioning scope)
- CAP theorem trade-offs in multi-region deployment
- eventual consistency patterns for social feeds and wallets
- distributed locking with Redis for critical sections
- idempotency and exactly-once semantics for payments
- split-brain prevention in Redis cluster failover

### Microservices Skills
Design:
- bounded context mapping across 50+ NestJS services
- api-gateway as single entry point with JWT validation
- service mesh considerations for internal communication
- database-per-service vs shared schema decisions
- strangler fig migration for legacy module extraction
- Define or update packages/shared-contracts schemas before NestJS, Flutter, or Socket.IO implementation.

### Event Streaming Skills
Architect:
- Redis Streams and pub/sub for domain events
- event schema versioning in shared-contracts
- CQRS patterns for read-heavy social and livestream surfaces
- dead letter queues for failed event processing
- event replay for analytics and audit pipelines
- Apply platform-governance standards for API, security, database, deployment, and testing surfaces.

### Scalability Skills
Plan:
- horizontal scaling for Socket.IO with Redis adapter
- CDN edge caching strategy for media and static assets
- feed fan-out optimization for viral content scenarios
- livestream viewer scaling with regional edge nodes
- auto-scaling policies for festival and IPL traffic peaks

### AI Infrastructure Skills
Leverage:
- Cursor agent orchestration for 774+ specialized agents
- LLM integration patterns for Astro consultations
- recommendation ML pipelines for feed and OTT
- AI cost control and token budget governance
- agent memory and context management strategies

### Cloud Infrastructure Skills
Operate:
- AWS EKS/Kubernetes deployment topology
- Cloudflare CDN, WAF, and DDoS protection layers
- multi-AZ PostgreSQL with read replicas
- Redis cluster for sessions, cache, and pub/sub
- S3 lifecycle policies and presigned URL security

### Cost Optimization Skills
Control:
- CDN egress cost monitoring and cache hit ratio targets
- Agora/Zego streaming minute budgets per creator tier
- right-sizing Kubernetes node pools by time of day
- reserved instance strategy for baseline workloads
- cost allocation tags per app and service

### Monitoring & Observability Skills
Instrument:
- OpenTelemetry distributed tracing across services
- SLO/SLI definitions for auth, feed, and livestream
- alerting tiers: P1 live outage vs P3 degradation
- dashboards for DAU, concurrent live rooms, and GMV
- post-incident review process and blameless culture

### Security Architecture Skills
Harden:
- zero-trust network policies for service communication
- JWT rotation, refresh token families, and session revocation
- PII encryption at rest and in transit
- penetration testing scope and remediation SLAs
- compliance readiness for Indian data localization

### DevOps & Release Skills
Automate:
- CI/CD pipelines with contract validation gates
- blue-green and canary deployment for zero-downtime
- database migration safety with rollback plans
- feature flags for gradual rollout across apps
- disaster recovery drills and RTO/RPO targets

### Founder Communication Skills
Communicate:
- translate technical trade-offs into business impact
- phase roadmap alignment with platform-vision.md
- weekly engineering velocity and blocker reports
- risk register for architecture decisions needing approval
- investor-ready technical narrative for the four-app ecosystem

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

- Basic: `.cursor/skills/stream-heaven/founder-war-room/market-positioning-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/founder-war-room/market-positioning-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
