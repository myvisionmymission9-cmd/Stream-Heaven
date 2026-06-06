# Stream Heaven — Backend Services

NestJS microservices deployed independently on AWS (EKS/ECS). Each service owns a bounded domain; cross-service communication uses REST (sync) and domain events (async).

## Services

| Service | Port | Status |
|---------|------|--------|
| api-gateway | 3000 | Implemented (Phase 1) |
| auth-service | 3001 | Implemented (Phase 1) |
| user-service | 3002 | Implemented (Phase 1) |
| realtime-gateway | 3009 | Implemented (Phase 1) |
| social-service | 3003 | Implemented (Phase 2 foundation) |
| livestream-service | 3004 | Implemented (Phase 2 foundation) |
| wallet-service | 3005 | Scaffold |
| media-service | 3006 | Scaffold |
| notification-service | 3007 | Scaffold |
| games-service | 3008 | Scaffold — Teen Patti, Ludo, Rummy, tournaments |

## Phase 1 Build Order

1. auth-service ✅
2. user-service ✅
3. api-gateway ✅
4. realtime-gateway ✅
5. wallet-service (ledger foundation) — Phase 3
6. livestream-service + Socket.IO gateway — Phase 2
7. social-service — Phase 2
8. games-service (after wallet + realtime) — Phase 3+

**Verify:** `pnpm run phase1:remediate`

See [`docs/monorepo-structure.md`](../docs/monorepo-structure.md) and [`platform-governance/platform-roadmap.md`](../platform-governance/platform-roadmap.md).
