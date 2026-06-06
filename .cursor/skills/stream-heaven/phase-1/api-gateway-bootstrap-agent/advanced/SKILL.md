---
name: stream-heaven-phase-1-api-gateway-bootstrap-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Api Gateway Bootstrap (phase 1).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Api Gateway Bootstrap — Advanced

## When to use

- User invokes **Api Gateway Bootstrap** or work in **phase-1** (phase 1)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/phase-1/api-gateway-bootstrap-agent.md`
- **Role:** Phase 1 specialist for Stream Heaven api-gateway — reverse proxy routing, JWT validation, rate limiting, and service discovery for auth, user, and wallet services.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Multi-Service Gateway Orchestration
Apply:
- Coordinate auth-service and profile-service proxy wiring
- Plan Phase 8/9 route additions without gateway monolith anti-pattern
- Service discovery strategy: env-based vs. Consul/K8s DNS
- Task-router handoffs for cross-team gateway changes

### Security Hardening
Apply:
- TLS termination at Cloudflare; mTLS option for internal admin routes
- WAF rule recommendations with enterprise-security agents
- Request size limits and JSON depth validation
- Bot detection hooks on auth and signup paths

### Observability
Apply:
- Per-route latency, error rate, and saturation metrics
- Distributed tracing from gateway request ID through upstreams
- Alert on 5xx spike and upstream timeout ratio
- Access logs with hashed IP for compliance

### Scale & Resilience
Apply:
- Horizontal scale behind load balancer with sticky sessions only if needed
- Load test gateway at 10x mobile DAU projection
- Graceful shutdown draining in-flight requests
- Chaos: upstream auth outage — fail closed on protected routes

### Production Readiness
Apply:
- Blue/green deploy checklist with smoke-test integration agent
- ADR for API gateway product (Kong vs. custom NestJS) forks
- Quality-gate validation before Phase 2a mobile dependency
- Document runbook for certificate rotation and emergency rate limit

### Indian Market Edge
Apply:
- Cloudflare PoP caching for static OpenAPI and health endpoints
- Optimize TLS handshake for older Android WebView stacks
- Geo-aware rate limits during festival OTP spikes
- Low-timeout fast-fail for poor connectivity clients

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| Shared contracts | `packages/shared-contracts/` |
| Validate agents | `node scripts/validate-agents.mjs` |
| Validate skills | `node scripts/validate-agent-skills.mjs` |
| Deep skill check | `node scripts/validate-all-agent-skills.mjs` |
| Phase 1 setup | `scripts/setup-phase1.ps1` |

## Validation

```powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
node scripts/validate-all-agent-skills.mjs
node scripts/test-golden-agents.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/phase-1/api-gateway-bootstrap-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/phase-1/api-gateway-bootstrap-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
