/**
 * Hand-authored deep competency sections for priority agents.
 * Key: agent path relative to repo root.
 */
export const AGENT_SKILL_ENRICHMENTS = {
  'ai-agents/executive/cto-agent.md': {
    basic: [
      {
        title: 'Technical Strategy Skills',
        bullets: [
          'Align four-app roadmap (Social, Livestream, Astro, OTT) with phased delivery gates',
          'Evaluate build-vs-buy for Agora/Zego, Firebase Auth, and CDN providers',
          'Define non-negotiable platform standards in platform-governance/',
          'Prioritize Indian market constraints: low-end Android, 2G/3G, regional languages',
        ],
      },
      {
        title: 'Architecture Review Skills',
        bullets: [
          'Review NestJS service boundaries before new microservices are approved',
          'Enforce contract-first changes in packages/shared-contracts/',
          'Challenge duplicate services — mandate reuse from services/ catalog',
          'Sign off ADR drafts when architecture forks from documented patterns',
        ],
      },
      {
        title: 'Engineering Leadership Skills',
        bullets: [
          'Set quality bars: validate-agents, golden tests, smoke tests per phase',
          'Balance velocity vs. tech debt with explicit phase exit criteria',
          'Coordinate chief-architect and platform-orchestrator on cross-cutting work',
          'Define hiring and tooling standards (Flutter, NestJS, Redis, Socket.IO)',
        ],
      },
      {
        title: 'Security & Compliance Skills',
        bullets: [
          'Mandate no secrets in repo — AWS Secrets Manager and env templates only',
          'Review auth, PII, and payment flows against security-rules.md',
          'Require rate limits, JWT rotation, and device trust on identity surfaces',
          'Escalate enterprise-security agents for DDoS, bot, and zero-trust hardening',
        ],
      },
      {
        title: 'Cost & Scale Awareness Skills',
        bullets: [
          'Model unit economics for live minutes, storage egress, and push volume',
          'Set Redis/Postgres sizing guardrails per cost-control-rules.md',
          'Prefer edge caching (Cloudflare) and adaptive bitrate for video',
          'Approve GPU/ML spend only with inference SLO and fallback paths',
        ],
      },
    ],
    advanced: [
      {
        title: 'Distributed Systems Skills',
        bullets: [
          'Design eventual-consistency boundaries across auth, profile, and realtime',
          'Define saga/compensation patterns for wallet, gifts, and cross-app events',
          'Plan multi-region failover for gateway, Redis, and Postgres read replicas',
          'Document CAP tradeoffs per domain with ADR references',
        ],
      },
      {
        title: 'Microservices Skills',
        bullets: [
          'Orchestrate Phase 1→9 service rollout without breaking shared contracts',
          'Standardize NestJS module layout, health checks, and inter-service auth',
          'Govern api-gateway routing, rate limits, and circuit breaker policies',
          'Run dependency audits via monorepo-dependency-auditor-agent',
        ],
      },
      {
        title: 'Event Streaming Skills',
        bullets: [
          'Define platform event catalog (livestream, social, wallet, notification)',
          'Align Socket.IO rooms with Redis pub/sub and horizontal scale plan',
          'Plan Kafka/Pulsar adoption for analytics and ML feature pipelines',
          'Coordinate socketio-architect on backpressure and reconnect storms',
        ],
      },
      {
        title: 'Scalability Skills',
        bullets: [
          'Set SLOs for p99 API latency, concurrent viewers, and feed scroll',
          'Plan load tests for OTP spikes, live room joins, and tournament finals',
          'Approve autoscaling policies for gateway, realtime, and transcode workers',
          'Champion chaos-engineering-agent game days before major launches',
        ],
      },
      {
        title: 'AI Infrastructure Skills',
        bullets: [
          'Govern ML platform agents: training, serving, embeddings, GPU clusters',
          'Define human-in-the-loop for moderation, recommendations, and Astro insights',
          'Budget inference cost per DAU with caching and model distillation',
          'Align decision-engine on feature flags and safe rollout of AI features',
        ],
      },
      {
        title: 'Cloud Infrastructure Skills',
        bullets: [
          'Own AWS + Cloudflare topology: S3, CDN, WAF, Secrets Manager',
          'Coordinate kubernetes-agent on EKS/GKE manifests and GitOps',
          'Plan Neon/Postgres and Redis cluster strategy per environment',
          'Define disaster recovery RPO/RTO per revenue-critical service',
        ],
      },
      {
        title: 'Cost Optimization Skills',
        bullets: [
          'Review monthly burn by service tag; kill idle GPU and oversized nodes',
          'Negotiate Agora/Zego/SMS unit pricing bands at scale milestones',
          'Enforce S3 lifecycle, thumbnail reuse, and CDN cache hit targets',
          'Mandate cost dashboards before Phase 8/9 feature GA',
        ],
      },
      {
        title: 'Monitoring Skills',
        bullets: [
          'Require structured logs, traces, and RED metrics on every new service',
          'Define on-call runbooks and escalation to quality-gate failures',
          'Align observability agents on SLO dashboards and anomaly alerts',
          'Post-incident reviews with action items tracked in ADRs',
        ],
      },
      {
        title: 'Security Architecture Skills',
        bullets: [
          'Zero-trust service mesh posture for internal admin and payment APIs',
          'Threat model live gifting, wallet withdraw, and creator payouts',
          'Coordinate penetration-testing-agent before public wallet GA',
          'Mandate dependency scanning and SBOM in CI pipelines',
        ],
      },
      {
        title: 'DevOps Knowledge',
        bullets: [
          'GitHub Actions gates: validate-agents, validate-agent-skills, golden tests',
          'Blue/green and canary patterns for gateway and realtime deploys',
          'Environment promotion: dev → staging → prod with contract diff checks',
          'Windows + Linux dev parity via local-dev-bootstrap-agent scripts',
        ],
      },
      {
        title: 'Founder Communication Skills',
        bullets: [
          'Translate technical risk into business impact for leadership decisions',
          'Publish weekly phase status: blockers, burn, and milestone confidence',
          'Present option matrices (cost/time/risk) for vendor and architecture forks',
          'Keep investor-ready architecture diagrams synced with chief-architect',
        ],
      },
    ],
  },

  'ai-agents/phase-1/auth-service-agent.md': {
    basic: [
      {
        title: 'Firebase Auth Bridge Skills',
        bullets: [
          'Verify Firebase ID tokens via Admin SDK in NestJS guards',
          'Map Firebase UID to internal user records in PostgreSQL',
          'Handle token refresh and revoked-user propagation to Redis sessions',
          'Document env templates for FIREBASE_* without committing secrets',
        ],
      },
      {
        title: 'OTP & Phone Auth Skills',
        bullets: [
          'Implement SMS OTP with provider abstraction (MSG91, Twilio, AWS SNS)',
          'Idempotent verify endpoint with attempt counters and cooldown windows',
          'Support Indian +E.164 numbers; normalize leading zero formats',
          'Rate-limit /auth/otp/* per IP and per phone hash',
        ],
      },
      {
        title: 'JWT & Session Security Skills',
        bullets: [
          'Issue access JWT ≤15m and rotating refresh tokens stored in Redis',
          'Implement refresh-on-use with family detection for token reuse attacks',
          'Define claims: sub, roles, device_id, session_id, iat, exp',
          'Wire api-gateway Bearer validation and public route allowlist',
        ],
      },
      {
        title: 'Contract-First Auth API Skills',
        bullets: [
          'Define OpenAPI in packages/shared-contracts/auth/v1',
          'Cover register, login, refresh, logout, verify-otp, device-trust',
          'Version breaking changes; never ship undocumented auth endpoints',
          'Generate client SDK stubs for Flutter mobile shell',
        ],
      },
      {
        title: 'Redis Session Skills',
        bullets: [
          'Key schema: session:{userId}:{deviceId} with TTL aligned to refresh policy',
          'Store session metadata: user agent, IP hash, last active, trust level',
          'Invalidate all sessions on password change and admin lock',
          'Coordinate redis-cache-specialist on cluster slot and memory limits',
        ],
      },
    ],
    advanced: [
      {
        title: 'Multi-Service Auth Orchestration Skills',
        bullets: [
          'Coordinate api-gateway-bootstrap-agent on JWT middleware and route guards',
          'Hand off SSO Phase 2 to unified-auth-agent without breaking v1 contracts',
          'Define cross-service service-to-service auth (mTLS or signed internal JWT)',
          'Run integration smoke tests across gateway → auth → profile chain',
        ],
      },
      {
        title: 'Threat Model & Hardening Skills',
        bullets: [
          'Brute-force, credential stuffing, and OTP flooding mitigation playbooks',
          'Device fingerprinting hooks for high-value wallet and creator actions',
          'Audit log stream for login, logout, refresh, and admin impersonation',
          'Align with enterprise-security agents on WAF rules for /auth/*',
        ],
      },
      {
        title: 'Production Validation Skills',
        bullets: [
          'Load test OTP send/verify at 10x expected Diwali traffic',
          'Chaos: Redis failover during active refresh rotation',
          'Golden path tests in test-golden-agents for Phase 1 auth',
          'ADR when switching SMS provider or JWT signing algorithm',
        ],
      },
      {
        title: 'Observability & SLO Skills',
        bullets: [
          'Metrics: otp_send_success, verify_latency_p99, refresh_errors',
          'Alert on abnormal verify failure ratio per country code',
          'Structured logs without PII — hash phone and mask tokens',
          'Dashboard for session count and Redis memory pressure',
        ],
      },
      {
        title: 'Indian Market Auth Skills',
        bullets: [
          'Optimize OTP UX for intermittent connectivity — retry with backoff',
          'Fallback email magic link when SMS delayed >30s',
          'Support Hindi/Telugu error strings via i18n ARB keys',
          'Low-data mode: minimize auth payload sizes on first launch',
        ],
      },
      {
        title: 'Compliance & Governance Skills',
        bullets: [
          'Enforce platform-governance/security-rules.md on every PR',
          'Document data retention for OTP logs and session metadata',
          'PII minimization in JWT claims and audit exports',
          'Coordinate governance-compliance-agent on policy updates',
        ],
      },
    ],
  },

  'ai-agents/phase-1/profile-service-agent.md': {
    basic: [
      {
        title: 'Profile Domain Modeling Skills',
        bullets: [
          'Design user profile schema: display name, avatar, bio, locale, privacy flags',
          'Link profiles to auth user_id with immutable foreign key constraints',
          'Support multi-app persona fields without duplicating identity records',
          'Define soft-delete and GDPR export/delete hooks',
        ],
      },
      {
        title: 'NestJS Profile Service Skills',
        bullets: [
          'Scaffold services/profile-service on assigned port with health module',
          'CRUD endpoints: get self, get public, patch profile, upload avatar ref',
          'Validate input with class-validator; sanitize HTML in bio fields',
          'Paginate follower/following lists with cursor-based APIs',
        ],
      },
      {
        title: 'Media & Avatar Skills',
        bullets: [
          'Issue presigned S3 URLs for avatar upload; virus scan hook placeholder',
          'Generate Cloudflare CDN URLs for resized avatar variants',
          'Enforce max file size and MIME allowlist per cost-control-rules.md',
          'Never store raw uploads in Postgres — metadata + S3 key only',
        ],
      },
      {
        title: 'Contract-First Profile API Skills',
        bullets: [
          'OpenAPI in packages/shared-contracts/profile/v1',
          'Public vs. private field masks in response DTOs',
          'Breaking change policy coordinated with api-contract-author',
          'Flutter mobile shell consumes generated client types',
        ],
      },
      {
        title: 'Caching & Performance Skills',
        bullets: [
          'Cache hot public profiles in Redis with TTL and cache-aside pattern',
          'Invalidate cache on profile update events',
          'Optimize for low-end devices: small default avatar, lazy load full res',
          'Index Postgres on username/handle with uniqueness constraints',
        ],
      },
    ],
    advanced: [
      {
        title: 'Cross-App Profile Orchestration Skills',
        bullets: [
          'Unified profile surface for Social, Livestream, Astro, OTT apps',
          'Coordinate social-feed-agent on creator badges and verification flags',
          'Event emit profile.updated for search index and recommendation pipelines',
          'Handoff celebrity/brand tiers to identity-platform agents',
        ],
      },
      {
        title: 'Privacy & Safety Skills',
        bullets: [
          'Field-level privacy: hide age, location, contact from public view',
          'Block/mute lists with efficient query patterns',
          'Report profile abuse integration with moderation agents',
          'Minor account protections per regional compliance guidance',
        ],
      },
      {
        title: 'Scale & Reliability Skills',
        bullets: [
          'Read replica strategy for profile reads during viral events',
          'Load test profile burst on influencer signup campaigns',
          'Chaos: Postgres primary failover during patch traffic',
          'SLO: p99 get public profile <100ms with cache warm',
        ],
      },
      {
        title: 'Search & Discovery Integration Skills',
        bullets: [
          'Emit indexing events to search-infrastructure agents',
          'Handle username change propagation to mentions and deep links',
          'Support hybrid search on display name and handle',
          'Avoid PII leakage in public search snippets',
        ],
      },
      {
        title: 'Production Validation Skills',
        bullets: [
          'Contract tests with api-gateway and auth-service',
          'Golden agent coverage for Phase 1 profile flows',
          'ADR for splitting profile graph to dedicated social-graph service',
          'Quality-gate checklist before Phase 2a mobile GA',
        ],
      },
      {
        title: 'Indian Market Profile Skills',
        bullets: [
          'Regional display name scripts (Devanagari, Telugu, Tamil, etc.)',
          'Compact payloads for 2G profile fetch on app cold start',
          'Default privacy presets tuned for Indian social norms',
          'Offline-friendly cached profile card in Flutter',
        ],
      },
    ],
  },

  'ai-agents/phase-1/api-gateway-bootstrap-agent.md': {
    basic: [
      {
        title: 'API Gateway Bootstrap Skills',
        bullets: [
          'Scaffold services/api-gateway as single public HTTP entry (port 3000)',
          'Configure reverse proxy routes to auth, profile, and future services',
          'Implement global prefix /v1 and consistent error envelope',
          'Expose /health and /ready for orchestration probes',
        ],
      },
      {
        title: 'JWT Validation Middleware Skills',
        bullets: [
          'Validate Bearer tokens issued by auth-service on protected routes',
          'Maintain public route allowlist: /auth/*, /health, OpenAPI docs',
          'Propagate X-User-Id and X-Session-Id headers to upstream services',
          'Handle clock skew and expired token responses with RFC7807 errors',
        ],
      },
      {
        title: 'Rate Limiting & Throttling Skills',
        bullets: [
          'Redis-backed rate limits per IP and per user on sensitive routes',
          'Stricter limits on /auth/otp/* and login endpoints',
          'Return Retry-After headers on 429 responses',
          'Document limit tiers in shared-contracts gateway section',
        ],
      },
      {
        title: 'Routing & Proxy Skills',
        bullets: [
          'Path-based routing with timeout and retry policies per upstream',
          'Strip hop-by-hop headers; forward correlation IDs',
          'Circuit breaker stub for unavailable upstream services',
          'CORS policy for Flutter mobile and future web clients',
        ],
      },
      {
        title: 'Contract & Documentation Skills',
        bullets: [
          'Aggregate OpenAPI from downstream services where feasible',
          'Gateway-level request/response logging without secrets',
          'Coordinate api-contract-author on gateway-facing DTOs',
          'Version gateway breaking changes independently',
        ],
      },
    ],
    advanced: [
      {
        title: 'Multi-Service Gateway Orchestration Skills',
        bullets: [
          'Coordinate auth-service and profile-service proxy wiring',
          'Plan Phase 8/9 route additions without gateway monolith anti-pattern',
          'Service discovery strategy: env-based vs. Consul/K8s DNS',
          'Task-router handoffs for cross-team gateway changes',
        ],
      },
      {
        title: 'Security Hardening Skills',
        bullets: [
          'TLS termination at Cloudflare; mTLS option for internal admin routes',
          'WAF rule recommendations with enterprise-security agents',
          'Request size limits and JSON depth validation',
          'Bot detection hooks on auth and signup paths',
        ],
      },
      {
        title: 'Observability Skills',
        bullets: [
          'Per-route latency, error rate, and saturation metrics',
          'Distributed tracing from gateway request ID through upstreams',
          'Alert on 5xx spike and upstream timeout ratio',
          'Access logs with hashed IP for compliance',
        ],
      },
      {
        title: 'Scale & Resilience Skills',
        bullets: [
          'Horizontal scale behind load balancer with sticky sessions only if needed',
          'Load test gateway at 10x mobile DAU projection',
          'Graceful shutdown draining in-flight requests',
          'Chaos: upstream auth outage — fail closed on protected routes',
        ],
      },
      {
        title: 'Production Readiness Skills',
        bullets: [
          'Blue/green deploy checklist with smoke-test integration agent',
          'ADR for API gateway product (Kong vs. custom NestJS) forks',
          'Quality-gate validation before Phase 2a mobile dependency',
          'Document runbook for certificate rotation and emergency rate limit',
        ],
      },
      {
        title: 'Indian Market Edge Skills',
        bullets: [
          'Cloudflare PoP caching for static OpenAPI and health endpoints',
          'Optimize TLS handshake for older Android WebView stacks',
          'Geo-aware rate limits during festival OTP spikes',
          'Low-timeout fast-fail for poor connectivity clients',
        ],
      },
    ],
  },

  'ai-agents/core-engineering/backend/nestjs-architect.md': {
    basic: [
      {
        title: 'NestJS Module Design Skills',
        bullets: [
          'Standard layout: module, controller, service, dto, entity, guard per domain',
          'Use dependency injection for testability and cross-cutting concerns',
          'Global ValidationPipe, exception filters, and interceptors',
          'ConfigModule with Joi/env validation — no hardcoded secrets',
        ],
      },
      {
        title: 'API & DTO Skills',
        bullets: [
          'class-validator DTOs aligned with OpenAPI in shared-contracts',
          'Consistent pagination, sorting, and error response shapes',
          'Swagger decorators generated from or synced to contracts',
          'Idempotency keys on POST mutations where required',
        ],
      },
      {
        title: 'Persistence Skills',
        bullets: [
          'TypeORM/Prisma patterns with migration discipline',
          'Transaction boundaries for wallet and multi-table updates',
          'Connection pooling tuned for Postgres on small instances',
          'Read/write split awareness for replica lag',
        ],
      },
      {
        title: 'Auth Integration Skills',
        bullets: [
          'JwtAuthGuard consuming gateway-forwarded headers or direct JWT',
          'Role-based guards for admin and creator endpoints',
          'Service-to-service auth for internal NestJS calls',
          'Never log raw tokens or OTP values',
        ],
      },
      {
        title: 'Testing Skills',
        bullets: [
          'Unit tests for services with mocked repositories',
          'e2e tests with supertest against bootstrap module',
          'Contract test hooks for OpenAPI compliance',
          'Run npm test in CI before merge to main',
        ],
      },
    ],
    advanced: [
      {
        title: 'Microservice Architecture Skills',
        bullets: [
          'Define bounded contexts per NestJS service in services/',
          'Inter-service HTTP/gRPC with timeout, retry, and bulkhead patterns',
          'Shared kernel limited to packages/shared-types and contracts',
          'ADR before extracting monolith modules to new deployables',
        ],
      },
      {
        title: 'Event-Driven NestJS Skills',
        bullets: [
          'Emit domain events via Redis pub/sub or message broker adapters',
          'Idempotent event consumers with dedup keys',
          'Outbox pattern for reliable event publish after DB commit',
          'Coordinate socketio-architect on realtime fan-out',
        ],
      },
      {
        title: 'Performance & Scale Skills',
        bullets: [
          'Profile p99 handlers; fix N+1 queries and missing indexes',
          'Caching strategy with redis-cache-specialist',
          'Horizontal scale: stateless pods, shared Redis sessions',
          'Load test critical paths before Phase 8/9 GA',
        ],
      },
      {
        title: 'Production Operations Skills',
        bullets: [
          'Health/readiness/liveness endpoints per kubernetes-agent standards',
          'Structured JSON logging with correlation IDs',
          'Graceful shutdown on SIGTERM for in-flight requests',
          'Feature flags via decision-engine for risky deploys',
        ],
      },
      {
        title: 'Security Architecture Skills',
        bullets: [
          'Input sanitization, SQL injection prevention, SSRF guards on outbound HTTP',
          'Secrets from AWS Secrets Manager; rotate DB credentials',
          'Dependency audit in CI; block critical CVE merges',
          'Align with security-rules.md on every new external integration',
        ],
      },
      {
        title: 'Cross-Agent Coordination Skills',
        bullets: [
          'Hand off OpenAPI drafts to api-contract-author before implementation',
          'Review phase-1 service agents PRs for NestJS consistency',
          'Quality-gate checklist for new service bootstrap',
          'Document NestJS conventions in platform-governance engineering-rules.md',
        ],
      },
    ],
  },

  'ai-agents/core-engineering/frontend/flutter-architect.md': {
    basic: [
      {
        title: 'Flutter Architecture Skills',
        bullets: [
          'Riverpod providers for app state; avoid global singletons',
          'GoRouter declarative routes with deep link support',
          'Feature-first folder layout under apps/mobile/lib/features/',
          'Separation of UI, domain, and data layers per feature',
        ],
      },
      {
        title: 'API Client Skills',
        bullets: [
          'Consume packages/shared-contracts generated Dart clients',
          'Centralize API_BASE_URL via --dart-define and env docs',
          'Handle 401 refresh flow coordinated with auth-service contracts',
          'Retry with exponential backoff on transient network errors',
        ],
      },
      {
        title: 'UI & Design System Skills',
        bullets: [
          'Apply design tokens from packages/design-system',
          'Follow flutter-ui-rules.md for spacing, typography, dark mode',
          'User-facing strings only in ARB i18n files (8+ languages)',
          'Responsive layouts for small Android screens (320dp width)',
        ],
      },
      {
        title: 'Performance Skills',
        bullets: [
          'const constructors, ListView.builder, image cacheWidth/cacheHeight',
          'Avoid jank: profile with DevTools; target 60fps on low-end devices',
          'Lazy load feeds and thumbnails; placeholder shimmer patterns',
          'Minimize app bundle size; defer heavy SDKs to feature modules',
        ],
      },
      {
        title: 'Testing Skills',
        bullets: [
          'Widget tests for critical flows: login, profile, feed shell',
          'Mock Riverpod overrides for API failures',
          'flutter analyze clean; flutter test in CI',
          'Golden tests for key screens where design-system mandates',
        ],
      },
    ],
    advanced: [
      {
        title: 'Multi-App Shell Skills',
        bullets: [
          'Shared mobile shell routing to Social, Livestream, Astro, OTT modules',
          'Single sign-on session across in-app tab switches',
          'Feature flags per app module via remote config',
          'ADR for monorepo vs. multi-app Flutter workspace splits',
        ],
      },
      {
        title: 'Offline & Connectivity Skills',
        bullets: [
          'Cache profile and feed skeleton for offline-first UX',
          'Connectivity-aware UI: queue actions, sync on reconnect',
          'Compress images client-side before S3 presigned upload',
          'Optimize for 2G/3G: small payloads, progressive loading',
        ],
      },
      {
        title: 'Realtime UI Skills',
        bullets: [
          'Socket.IO client integration with reconnect backoff',
          'Riverpod stream providers for live viewer counts and chat',
          'Coordinate socketio-architect on room join/leave lifecycle',
          'Battery-aware background socket policy on Android',
        ],
      },
      {
        title: 'Media & Livestream UI Skills',
        bullets: [
          'Agora/Zego Flutter SDK integration patterns',
          'PiP, orientation, and audio focus handling on Android',
          'Low-latency preview surfaces for creator go-live',
          'Handoff livestream-agent for room list and token bootstrap UI',
        ],
      },
      {
        title: 'Production Quality Skills',
        bullets: [
          'Crash reporting hooks without PII in logs',
          'Staged rollout via Play Console with phase-2a bootstrap checks',
          'Accessibility: semantic labels, contrast, screen reader flows',
          'Quality-gate before Phase 8/9 feature module merge',
        ],
      },
      {
        title: 'Cross-Team Coordination Skills',
        bullets: [
          'Sync with design-tokens-architect on breaking token changes',
          'Contract-first: block UI work on undocumented API changes',
          'Coordinate ux-research-lead on usability validation',
          'Document Flutter patterns in platform-governance flutter-ui-rules.md',
        ],
      },
    ],
  },

  'ai-agents/core-engineering/realtime/socketio-architect.md': {
    basic: [
      {
        title: 'Socket.IO Server Skills',
        bullets: [
          'NestJS WebSocket gateway with Socket.IO adapter',
          'Redis adapter for multi-node room broadcast',
          'Namespace design: /social, /livestream, /games per app',
          'Authenticate socket handshake with JWT from auth-service',
        ],
      },
      {
        title: 'Room & Presence Skills',
        bullets: [
          'Join/leave room with ack callbacks and error codes',
          'Track presence in Redis with TTL heartbeat',
          'Prevent duplicate connections per device session',
          'Graceful disconnect on token expiry',
        ],
      },
      {
        title: 'Event Schema Skills',
        bullets: [
          'Versioned event payloads in packages/shared-contracts/realtime/',
          'Validate inbound events with JSON schema or class-validator',
          'Emit server events: room.started, message.new, viewer.count',
          'Document event catalog for client code generation',
        ],
      },
      {
        title: 'Scale Basics Skills',
        bullets: [
          'Sticky sessions or Redis adapter for horizontal scale',
          'Backpressure: drop low-priority events under load',
          'Connection limits per IP and per user',
          'Monitor connected clients and memory per node',
        ],
      },
      {
        title: 'Client Contract Skills',
        bullets: [
          'Reconnect with exponential backoff and room rejoin',
          'Client event idempotency keys for mutations',
          'Flutter and web client SDK parity on event names',
          'Integration tests with socket.io-client',
        ],
      },
    ],
    advanced: [
      {
        title: 'Realtime Platform Orchestration Skills',
        bullets: [
          'Coordinate livestream-agent on viewer count safety and fan-out',
          'Games socket sync with games-socket-sync-agent',
          'Social feed live reactions without overloading single room',
          'Task-router for cross-app realtime feature planning',
        ],
      },
      {
        title: 'Reliability & Chaos Skills',
        bullets: [
          'Simulate Redis adapter partition and reconnect storms',
          'Graceful degradation: polling fallback for critical state',
          'SLO: message delivery p99 <500ms in live rooms',
          'Coordinate chaos-engineering-agent on game days',
        ],
      },
      {
        title: 'Security Skills',
        bullets: [
          'Authorize room join server-side — never trust client room IDs',
          'Rate limit emit frequency per socket',
          'Sanitize chat payloads; block XSS in user-generated content',
          'Audit admin broadcast and moderation override events',
        ],
      },
      {
        title: 'High-Scale Livestream Skills',
        bullets: [
          'Shard hot rooms across Redis pub/sub channels',
          'Coalesce viewer count updates to reduce broadcast churn',
          'PK battle and gift event prioritization queues',
          'Load test 100k concurrent connections target architecture',
        ],
      },
      {
        title: 'Observability Skills',
        bullets: [
          'Metrics: connections, rooms, emits/sec, adapter lag',
          'Trace socket lifecycle with gateway correlation IDs',
          'Alert on connection drop spikes and Redis adapter errors',
          'Runbooks for scaling socket pods during viral events',
        ],
      },
      {
        title: 'Architecture Decision Skills',
        bullets: [
          'ADR: Socket.IO vs. raw WebSockets vs. MQTT for IoT',
          'Evaluate managed realtime (Ably, Pusher) at scale breakpoints',
          'Document CAP tradeoffs for presence vs. chat ordering',
          'Quality-gate before enabling realtime on new app surfaces',
        ],
      },
    ],
  },

  'apps/social-app/agents/social-feed-agent.md': {
    basic: [
      {
        title: 'Feed API Skills',
        bullets: [
          'Design /v1/social/feed endpoints: home, following, profile posts',
          'Cursor pagination with stable sort keys (created_at, id)',
          'Contract-first in packages/shared-contracts/social/v1',
          'NestJS feed-service module with auth guards',
        ],
      },
      {
        title: 'Content Model Skills',
        bullets: [
          'Post types: text, image, video ref, repost, poll stub',
          'Media references via S3 keys + CDN URLs — no binary in API',
          'Engagement counters: like, comment, share with idempotent toggles',
          'Soft delete and author-only edit windows',
        ],
      },
      {
        title: 'Feed Ranking Skills',
        bullets: [
          'Phase 8 MVP: chronological following + lightweight score blend',
          'Hook for ml-platform recommendation agent Phase 2 ranking',
          'Diversity caps: avoid same-author domination in home feed',
          'Cache ranked slices in Redis with short TTL',
        ],
      },
      {
        title: 'Flutter Feed UI Skills',
        bullets: [
          'Infinite scroll ListView with pull-to-refresh',
          'Optimistic like/comment with rollback on failure',
          'Video autoplay policy for low-data mode',
          'Skeleton loaders for 2G first paint',
        ],
      },
      {
        title: 'Moderation Hooks Skills',
        bullets: [
          'Report post endpoint stub to moderation pipeline',
          'NSFW and spam signals placeholder for ML moderation agent',
          'Geo-block and age-gate flags on sensitive content',
          'Audit trail for removed posts',
        ],
      },
    ],
    advanced: [
      {
        title: 'Feed Scale Orchestration Skills',
        bullets: [
          'Fan-out on write vs. read tradeoff ADR for influencer graphs',
          'Coordinate search-infrastructure on post indexing',
          'Event stream post.created for notification and analytics agents',
          'Load test feed scroll at 1M DAU projection',
        ],
      },
      {
        title: 'Cross-App Social Skills',
        bullets: [
          'Deep links from Livestream clips to social posts',
          'Shared identity via profile-service public cards',
          'Unified block/mute across Social and Livestream chat',
          'Quality-gate before public beta launch',
        ],
      },
      {
        title: 'Realtime Social Skills',
        bullets: [
          'Live reaction counts via socketio-architect rooms',
          'New post notifications with push-notification agents',
          'Typing indicators and live comment threads on hot posts',
          'Degrade to polling when socket unavailable',
        ],
      },
      {
        title: 'ML & Personalization Skills',
        bullets: [
          'Feature store hooks for embedding-agent and training-pipeline-agent',
          'A/B test ranking models via decision-engine flags',
          'Cold start strategy for new users in Indian regional content',
          'Explainability stubs for regulated content surfaces',
        ],
      },
      {
        title: 'Production Validation Skills',
        bullets: [
          'Contract tests with api-gateway and auth headers',
          'Golden paths for create post → appear in follower feed',
          'Chaos: Redis cache flush during viral post spike',
          'SLO: home feed p99 <300ms warm cache',
        ],
      },
      {
        title: 'Indian Market Feed Skills',
        bullets: [
          'Regional language post rendering and font fallbacks',
          'Low-bandwidth video: adaptive quality and manual play default',
          'Festival and cricket moment caching prefetch strategy',
          'Compact JSON payloads for feed cards on 2G',
        ],
      },
    ],
  },

  'apps/livestream-app/agents/core/livestream-agent.md': {
    basic: [
      {
        title: 'Live Room Lifecycle Skills',
        bullets: [
          'API flow: create → start → join → leave → end with deterministic state machine',
          'Guard invalid transitions (e.g., join on ended room)',
          'Viewer count increments/decrements with idempotent join tokens',
          'Persist room metadata in Postgres; hot state in Redis',
        ],
      },
      {
        title: 'Agora Token Skills',
        bullets: [
          'Token bootstrap endpoint using AGORA_APP_ID env only',
          'Role-specific tokens: publisher vs. subscriber',
          'Short TTL tokens refreshed on reconnect',
          'Never embed Agora certificate in client or repo',
        ],
      },
      {
        title: 'Livestream API Contract Skills',
        bullets: [
          'OpenAPI /v1/livestream/* in packages/shared-contracts',
          'List rooms, room detail, start/join/leave/end endpoints',
          'Gateway proxy and auth header propagation',
          'Backward-compatible extension points for gifts and PK',
        ],
      },
      {
        title: 'Realtime Event Skills',
        bullets: [
          'Emit livestream.room.started, viewer.joined, room.ended events',
          'Socket.IO room per livestream ID for count updates',
          'Schema validation with realtime contract owners',
          'Flutter mobile live room list consumes REST + socket',
        ],
      },
      {
        title: 'NestJS Service Skills',
        bullets: [
          'services/livestream-service module layout',
          'Health checks and structured logging',
          'Rate limits on room create and join abuse',
          'Integration test plan with api-gateway-bootstrap-agent',
        ],
      },
    ],
    advanced: [
      {
        title: 'Monetization Extension Skills',
        bullets: [
          'Handoff gifts, PK battles, wallet ledger to Phase 3 agents',
          'Preserve v1 contract stability when adding tip endpoints',
          'Idempotent gift send with wallet-service saga coordination',
          'ADR for splitting monetization to dedicated billing service',
        ],
      },
      {
        title: 'WebRTC & CDN Skills',
        bullets: [
          'Evaluate Agora vs. Zego for India latency and pricing',
          'CDN for HLS replay and thumbnail sprites post-live',
          'Adaptive bitrate ladder for low-end Android viewers',
          'Coordinate media-transcode agents for recording pipeline',
        ],
      },
      {
        title: 'High-Concurrency Skills',
        bullets: [
          'Load test 50k viewers in single hot room architecture',
          'Shard viewer count updates; coalesce socket broadcasts',
          'Autoscale livestream-service and socket pods on CPU/lag',
          'Chaos: Agora token service slow — graceful viewer messaging',
        ],
      },
      {
        title: 'Cross-App Livestream Skills',
        bullets: [
          'Social clip share from ended room highlights',
          'Creator profile linkage via profile-service',
          'Unified moderation for live chat and room metadata',
          'Quality-gate before monetization features GA',
        ],
      },
      {
        title: 'Security & Safety Skills',
        bullets: [
          'Room join authorization — private rooms, ban lists, geo restrictions',
          'Report room flow to moderation agents',
          'Prevent token leakage in client logs and analytics',
          'Audit creator go-live and force-end admin actions',
        ],
      },
      {
        title: 'Observability & SLO Skills',
        bullets: [
          'Metrics: active_rooms, concurrent_viewers, join_failure_rate',
          'Alert on abnormal end rate and token mint errors',
          'Runbooks for viral creator event scale-up',
          'Post-incident review template for live outages',
        ],
      },
    ],
  },
};
