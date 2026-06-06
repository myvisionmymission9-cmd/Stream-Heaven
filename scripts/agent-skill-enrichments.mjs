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

  'ai-agents/executive/chief-architect.md': {
    basic: [
      {
        title: 'Architecture Principles Skills',
        bullets: [
          'Maintain canonical service map: auth, profile, gateway, realtime, social, livestream, wallet',
          'Enforce bounded contexts — no shared DB tables across NestJS services',
          'Document integration styles: sync REST via gateway, async events, Socket.IO fan-out',
          'Align four-app Flutter shells with shared packages/design-system and shared-contracts',
        ],
      },
      {
        title: 'ADR & Governance Skills',
        bullets: [
          'Require ADR in docs/adr/ before new microservice or breaking contract change',
          'Review ADR options matrix: cost, time, risk, reversibility',
          'Block implementations that bypass api-gateway or duplicate services/',
          'Coordinate governance-compliance-agent on policy exceptions',
        ],
      },
      {
        title: 'Scaling Playbook Skills',
        bullets: [
          'Set SLO targets for feed p99, live viewer joins, and wallet transaction latency',
          'Review autoscaling triggers for gateway, socket, and transcode workers',
          'Plan read replica and Redis cluster breakpoints per scaling-playbook.md',
          'Champion load tests before Phase 8/9 public beta gates',
        ],
      },
      {
        title: 'Cross-Domain Coordination Skills',
        bullets: [
          'Facilitate architecture reviews with master-platform-architect-agent',
          'Resolve service ownership conflicts between social and livestream domains',
          'Hand off NestJS standards to nestjs-architect and Flutter to flutter-architect',
          'Escalate executive tradeoffs to cto-agent with ADR recommendation',
        ],
      },
    ],
    advanced: [
      {
        title: 'Platform Evolution Skills',
        bullets: [
          'Phase gate architecture: Phase 1 foundation before feature microservices',
          'Plan event bus evolution from Redis pub/sub to Kafka without big-bang migration',
          'Define strangler patterns for monolith extraction when justified by ADR',
          'Coordinate decision-engine on conflicting agent architecture proposals',
        ],
      },
      {
        title: 'Data Architecture Skills',
        bullets: [
          'Approve Postgres schema ownership per service with migration-manager discipline',
          'Govern Redis usage: sessions, cache, rate limits, Socket.IO adapter — separate keyspaces',
          'Plan search index and analytics warehouse boundaries with data-warehouse-agent',
          'PII data flow maps for auth, profile, Astro birth data, and wallet KYC',
        ],
      },
      {
        title: 'Realtime & Media Architecture Skills',
        bullets: [
          'Signaling vs media transport split: Socket.IO vs Agora/Zego',
          'PK battle and gift event prioritization under load',
          'CDN and transcoding pipeline for OTT and live replay',
          'Coordinate realtime-systems-agent on platform-wide realtime SLOs',
        ],
      },
      {
        title: 'Security Architecture Skills',
        bullets: [
          'Threat model wallet withdraw, creator payout, and admin impersonation',
          'Zero-trust internal service auth patterns',
          'Coordinate enterprise-security agents before payment GA',
          'Mandate secrets rotation and SBOM in release checklist',
        ],
      },
      {
        title: 'Production Validation Skills',
        bullets: [
          'Architecture review gate in quality-gate for new services/',
          'Chaos game day sign-off before festival traffic events',
          'Post-incident architecture action items tracked in ADRs',
          'Investor-ready diagrams synced with cto-agent monthly',
        ],
      },
    ],
  },

  'ai-agents/executive/chief-growth-officer.md': {
    basic: [
      {
        title: 'Growth Strategy Skills',
        bullets: [
          'Set north-star metrics: DAU, retention D7/D30, creator activation, payer conversion',
          'Prioritize growth experiments by ICE score and phase alignment',
          'Design cross-app discovery: Social → Livestream → Astro → Media funnels',
          'Regional India focus: Hindi/Telugu content, festival campaigns, cricket moments',
        ],
      },
      {
        title: 'Acquisition Skills',
        bullets: [
          'Coordinate aso-agent and play-store-listing-agent on store conversion',
          'Influencer and referral program design with referral-growth-agent',
          'Deep link attribution via deep-link-attribution-agent',
          'Paid UA budget caps with budget-allocation-agent and CFO review',
        ],
      },
      {
        title: 'Onboarding & Activation Skills',
        bullets: [
          'OTP-first onboarding funnel optimization with user-onboarding-agent',
          'A/B test onboarding screens via onboarding-experiment-agent',
          'Creator cold-start seeding with content-seeding-agent',
          'Reduce time-to-first-value: first post, first live watch, first consultation',
        ],
      },
      {
        title: 'Retention Skills',
        bullets: [
          'Push notification cadence with notification-fatigue-agent guardrails',
          'Streak and daily bonus mechanics with streak-mechanics-agent',
          'Winback campaigns for churned payers via winback-campaign-agent',
          'Cohort dashboards with retention-funnel-agent',
        ],
      },
    ],
    advanced: [
      {
        title: 'Viral Loop Design Skills',
        bullets: [
          'WhatsApp share incentives and share-deeplink-agent integration',
          'Live PK battle and gift moments as shareable clips to Social',
          'Referral rewards funded via wallet-agent promo credits',
          'Measure K-factor per loop with analytics-agent',
        ],
      },
      {
        title: 'Cross-App Growth Skills',
        bullets: [
          'Unified wallet and identity for cross-app promotion-agent',
          'Livestream viewer → Social follow conversion hooks',
          'Astro consultation upsell from Social creator profiles',
          'OTT trial from Livestream highlight reels',
        ],
      },
      {
        title: 'Experimentation Platform Skills',
        bullets: [
          'Feature flags for growth tests via decision-engine',
          'Guardrail metrics: crash rate, OTP cost, moderation queue depth',
          'Coordinate ab-testing-agent on experiment design and power analysis',
          'Document failed experiments for institutional learning',
        ],
      },
      {
        title: 'Compliance & Trust Skills',
        bullets: [
          'Store policy compliance for incentive campaigns',
          'Coordinate governance-compliance-agent on promotional copy',
          'Avoid dark patterns flagged by trust-safety-agent',
          'Regional telecom and SMS regulations for OTP growth hacks',
        ],
      },
    ],
  },

  'ai-agents/orchestration/quality-gate.md': {
    basic: [
      {
        title: 'Gate Checklist Skills',
        bullets: [
          'NestJS PR gate: health endpoints, guards, OpenAPI sync, npm test green',
          'Flutter PR gate: analyze clean, widget tests on auth/profile paths',
          'Agent .md gate: governance refs, Dependencies resolve, Skills paths exist',
          'Contract gate: shared-contracts diff reviewed before implementation merge',
        ],
      },
      {
        title: 'Validation Script Skills',
        bullets: [
          'Run node scripts/validate-agents.mjs on ai-agents/ and apps/ agent changes',
          'Run validate-agent-skills.mjs and validate-all-agent-skills.mjs on skill updates',
          'Trigger test-golden-agents.mjs when agent prompt templates change',
          'Block merge on non-zero exit codes without documented waiver ADR',
        ],
      },
      {
        title: 'Handoff Review Skills',
        bullets: [
          'Verify handoff-manager package: artifacts, tests, governance checklist',
          'Confirm task-router assigned correct owner agent',
          'Check openapi-contract-validation-agent sign-off on API changes',
          'Require smoke test PASS for Phase 1 service modifications',
        ],
      },
    ],
    advanced: [
      {
        title: 'Production Readiness Skills',
        bullets: [
          'Apply production-readiness-checklist.md before release tags',
          'Coordinate rollback-coordinator on gate failures near deploy window',
          'Escalate to incident-commander-agent if gate bypass risks outage',
          'Track gate bypass waivers with expiry and remediation owner',
        ],
      },
      {
        title: 'Agent Catalog Quality Skills',
        bullets: [
          'Score agent Responsibilities depth vs auth-service-agent quality bar',
          'Flag boilerplate Skills stubs under 500 bytes for regeneration',
          'Coordinate agent-registry-auditor-agent on registry drift',
          'Mandate skill enrichment for executive and Phase 1 agents',
        ],
      },
      {
        title: 'Cross-Team Enforcement Skills',
        bullets: [
          'Align senior-code-review-agent with gate criteria in PR templates',
          'Publish gate status badges for multi-chat execution guide',
          'Train agents via prompt template gate reminders',
          'Post-mortem when gate miss caused production defect',
        ],
      },
    ],
  },

  'ai-agents/orchestration/master-platform-architect-agent.md': {
    basic: [
      {
        title: 'Architecture Map Skills',
        bullets: [
          'Maintain living diagram: services/, packages/, apps/, ai-agents/ ownership',
          'Track contract versions per domain in packages/shared-contracts/',
          'Document port allocation: 3000 gateway, 3001 auth, 3002 profile, 3009 realtime',
          'Identify duplicate or orphan modules before new scaffolding',
        ],
      },
      {
        title: 'Integration Pattern Skills',
        bullets: [
          'Standardize gateway proxy headers: X-User-Id, X-Request-Id, X-Session-Id',
          'Redis cache-aside vs write-through decision tree per domain',
          'Socket.IO room naming conventions per app namespace',
          'S3 + Cloudflare CDN patterns for media and avatars',
        ],
      },
      {
        title: 'Review & Sign-off Skills',
        bullets: [
          'Architecture review template for Phase 2+ feature proposals',
          'Backward compatibility checklist for /v1/* extensions',
          'Coordinate chief-architect on ADR-required forks',
          'Quality-gate architecture section completion before merge',
        ],
      },
    ],
    advanced: [
      {
        title: 'Multi-App Orchestration Skills',
        bullets: [
          'Shared identity and wallet across Social, Livestream, Astro, Media',
          'Cross-app notification and deep link routing standards',
          'Feature module boundaries in Flutter monorepo',
          'Task-router escalation for ambiguous cross-app ownership',
        ],
      },
      {
        title: 'Scale & Reliability Skills',
        bullets: [
          'Hot path identification: feed scroll, live join, wallet debit, OTP verify',
          'Sharding and read replica triggers per postgres-architect',
          'Realtime fan-out limits per realtime-systems-agent',
          'Incident architecture actions via rollback-coordinator',
        ],
      },
    ],
  },

  'ai-agents/governance/governance-compliance-agent.md': {
    basic: [
      {
        title: 'Governance Mapping Skills',
        bullets: [
          'Map tasks to 22 platform-governance/ files with required vs optional compliance',
          'Produce per-PR compliance matrix: security, API, database, deployment, testing',
          'Block secrets in code, duplicate services, and gateway bypass patterns',
          'Enforce Phase 1 before Phase 8 ordering in agent task routing',
        ],
      },
      {
        title: 'Agent Catalog Compliance Skills',
        bullets: [
          'Validate agent .md has Role, Responsibilities, Dependencies, Governance References',
          'Coordinate agent-skill-validator-agent on Skills section health',
          'Flag boilerplate Responsibilities for enrich-agent-responsibilities.mjs',
          'Require ADR reference when agent proposes new service in services/',
        ],
      },
      {
        title: 'Contract-First Enforcement Skills',
        bullets: [
          'No NestJS controller without packages/shared-contracts OpenAPI entry',
          'Version breaking API changes with deprecation window',
          'Coordinate api-contract-author on schema ownership',
          'Block Flutter client work on undocumented endpoints',
        ],
      },
    ],
    advanced: [
      {
        title: 'Audit & Remediation Skills',
        bullets: [
          'Quarterly audit: services/ deduplication, packages/ dependency hygiene',
          'Secrets scan and .env.example completeness review',
          'Phase exit audit with phase-1-autonomous-completion-agent evidence',
          'Remediation tickets with owner agent and deadline',
        ],
      },
      {
        title: 'Regulatory Alignment Skills',
        bullets: [
          'India IT Rules and store policy checkpoints for UGC and payments',
          'Astro disclaimer and non-medical advice compliance with astro-disclaimer-compliance',
          'Wallet KYC/AML escalation paths to tax-compliance-agent',
          'Coordinate chief-safety-officer on child safety policies',
        ],
      },
    ],
  },

  'ai-agents/phase-1/phase-1-autonomous-completion-agent.md': {
    basic: [
      {
        title: 'Phase 1 Orchestration Skills',
        bullets: [
          'Run full bootstrap: Docker Postgres/Redis, four NestJS services, smoke suite',
          'Collect evidence: health JSON, OTP log snippet, smoke PASS output',
          'Sequence validate-agents → validate-agent-skills → golden tests',
          'Update docs/FINAL-READINESS-REPORT.md with dated PASS/FAIL summary',
        ],
      },
      {
        title: 'Exit Criteria Skills',
        bullets: [
          'Gateway /health aggregates auth, profile, realtime upstream status',
          'Auth OTP register → verify → JWT → profile CRUD chain works',
          'Realtime socket ping/pong or room join smoke passes',
          'No secrets committed; .env.example documents all required vars',
        ],
      },
      {
        title: 'Remediation Routing Skills',
        bullets: [
          'Route compile errors to phase-1-remediation-agent and nestjs-architect',
          'Route contract mismatches to openapi-contract-validation-agent',
          'Route Docker issues to local-dev-bootstrap-agent',
          'Block Phase 2a until two consecutive green Phase 1 runs',
        ],
      },
    ],
    advanced: [
      {
        title: 'Autonomous Validation Skills',
        bullets: [
          'Retry flaky smoke up to 3x with structured failure classification',
          'Parallel agent validation in CI alongside integration smoke',
          'Produce executive summary for cto-agent and platform-orchestrator',
          'Handoff checklist for phase-2a-autonomous-bootstrap-agent',
        ],
      },
    ],
  },

  'ai-agents/core-engineering/backend/api-gateway-agent.md': {
    basic: [
      {
        title: 'Production Gateway Skills',
        bullets: [
          'Own routing table versioning and upstream service registry',
          'TLS termination at Cloudflare; origin protection and WAF rules',
          'Global /v1 error envelope and RFC7807 problem details',
          'Request size limits and JSON depth validation at edge',
        ],
      },
      {
        title: 'Auth & Rate Limit Skills',
        bullets: [
          'JWT validation middleware shared with api-gateway-bootstrap-agent patterns',
          'Per-route rate limits: stricter on /auth/*, wallet, and report endpoints',
          'Bot detection hooks coordinated with bot-protection-agent',
          'Service-to-service internal routes with mTLS or signed internal JWT',
        ],
      },
      {
        title: 'Observability Skills',
        bullets: [
          'Per-route RED metrics and distributed tracing headers',
          'Access logs with hashed IP; no Bearer tokens in logs',
          'Alert on 5xx ratio and upstream timeout spikes',
          'Dashboard for gateway saturation during festival events',
        ],
      },
    ],
    advanced: [
      {
        title: 'Deploy & Resilience Skills',
        bullets: [
          'Blue/green and canary deploy with automatic rollback on error budget burn',
          'Circuit breaker per upstream with half-open probe policy',
          'Graceful shutdown and connection draining',
          'Chaos: auth service outage — protected routes fail closed',
        ],
      },
      {
        title: 'Multi-Environment Skills',
        bullets: [
          'Dev/staging/prod upstream URL parity via env templates',
          'Coordinate kubernetes-agent on ingress and HPA for gateway pods',
          'ADR for managed API gateway (Kong/AWS) vs custom NestJS at scale',
          'Quality-gate checklist for every new proxied path',
        ],
      },
    ],
  },

  'ai-agents/core-engineering/realtime/realtime-systems-agent.md': {
    basic: [
      {
        title: 'Realtime Platform Skills',
        bullets: [
          'Own realtime-service (port 3009) platform SLOs and capacity plan',
          'Namespace topology: /social, /livestream, /games, /notifications',
          'Redis adapter cluster sizing for Socket.IO horizontal scale',
          'Handshake auth with JWT from auth-service — reject anonymous joins',
        ],
      },
      {
        title: 'Presence & Messaging Skills',
        bullets: [
          'Presence heartbeat TTL and stale cleanup in Redis',
          'Message ordering guarantees per room vs eventual for viewer counts',
          'Backpressure: drop low-priority events under CPU/memory pressure',
          'Reconnect policy: exponential backoff, room rejoin, state sync',
        ],
      },
      {
        title: 'Event Catalog Skills',
        bullets: [
          'Versioned events in packages/shared-contracts/realtime/',
          'Schema validation on inbound client emits',
          'Server event catalog for analytics pipeline ingestion',
          'Coordinate socketio-architect on implementation details',
        ],
      },
    ],
    advanced: [
      {
        title: 'High-Scale Livestream Skills',
        bullets: [
          'Hot room sharding and coalesced viewer count broadcasts',
          'PK battle and gift event priority queues',
          'Load test 100k connection architecture with chaos-engineering-agent',
          'Polling fallback when socket unavailable on poor networks',
        ],
      },
      {
        title: 'Evolution & Incidents Skills',
        bullets: [
          'Kafka bridge for analytics without blocking Socket.IO MVP',
          'Incident runbooks with incident-commander-agent',
          'Post-mortem template for reconnect storms and adapter lag',
          'ADR for alternative transports (MQTT, WebTransport) when justified',
        ],
      },
    ],
  },

  'ai-agents/core-engineering/database/postgres-architect.md': {
    basic: [
      {
        title: 'Schema Design Skills',
        bullets: [
          'One schema owner per NestJS service — no cross-service FKs',
          'UUID primary keys; timestamptz for all audit columns',
          'Soft delete with deleted_at where GDPR export requires',
          'Index strategy: composite indexes for feed and wallet hot queries',
        ],
      },
      {
        title: 'Migration Skills',
        bullets: [
          'Reversible migrations via migration-manager conventions',
          'Expand-contract pattern for zero-downtime column changes',
          'Migration ordering in CI before deploy',
          'Never destructive migration without ADR and backup plan',
        ],
      },
      {
        title: 'Performance Skills',
        bullets: [
          'Connection pool tuning per service and PgBouncer when needed',
          'EXPLAIN ANALYZE on p99 offenders with query-optimization-agent',
          'Partition large tables: messages, wallet_ledger, analytics events',
          'Read replica routing for read-heavy profile and feed queries',
        ],
      },
    ],
    advanced: [
      {
        title: 'Reliability & DR Skills',
        bullets: [
          'RPO/RTO targets per revenue-critical database',
          'Point-in-time recovery drills quarterly',
          'Failover runbook with rollback-coordinator',
          'Logical replication for analytics warehouse with data-warehouse-agent',
        ],
      },
      {
        title: 'Domain-Specific Schema Skills',
        bullets: [
          'Wallet double-entry ledger tables with idempotency keys',
          'Social graph edge tables with efficient block/mute queries',
          'Livestream room state with optimistic locking',
          'Astro consultation booking with timezone-aware slots',
        ],
      },
    ],
  },

  'ai-agents/core-engineering/database/redis-cache-specialist.md': {
    basic: [
      {
        title: 'Key Design Skills',
        bullets: [
          'Prefix convention: auth:session:, social:feed:, live:presence:, ratelimit:',
          'Hash tags for cluster multi-key ops: {userId} session families',
          'TTL on all cache keys — no immortal keys without ADR',
          'Document key catalog in platform-governance/database-rules.md',
        ],
      },
      {
        title: 'Session & Auth Cache Skills',
        bullets: [
          'Refresh token rotation families with reuse detection',
          'OTP attempt counters and cooldown keys per phone hash',
          'Session invalidation on password change and admin lock',
          'Coordinate auth-service-agent on schema changes',
        ],
      },
      {
        title: 'Cache Pattern Skills',
        bullets: [
          'Cache-aside for profiles and feed slices',
          'Rate limit sliding windows with INCR + EXPIRE',
          'Probabilistic early expiration against stampede',
          'Socket.IO Redis adapter memory and channel planning',
        ],
      },
    ],
    advanced: [
      {
        title: 'Cluster Operations Skills',
        bullets: [
          'Memory maxmemory policy: volatile-lru for cache workloads',
          'Slowlog monitoring and hot key detection',
          'Failover drill with realtime-systems-agent',
          'Elasticache/Redis Cluster vs single-node dev parity',
        ],
      },
      {
        title: 'Festival Scale Skills',
        bullets: [
          'Pre-warm feed and room keys before known events',
          'Emergency eviction playbook when memory > 90%',
          'Coordinate autoscaling-agent on node count',
          'Post-event cache flush validation',
        ],
      },
    ],
  },

  'ai-agents/economy/wallet-agent.md': {
    basic: [
      {
        title: 'Ledger Design Skills',
        bullets: [
          'Double-entry ledger: every debit has matching credit row',
          'Idempotency-Key header on all POST wallet mutations',
          'Balance snapshot with optimistic locking on user wallet row',
          'Immutable audit log table append-only',
        ],
      },
      {
        title: 'Contract & API Skills',
        bullets: [
          'OpenAPI wallet/v1: balance, credit, debit, hold, release, transfer',
          'Webhook endpoints for Razorpay/Stripe with signature verification',
          'No PAN/card data in Postgres — tokenize via payment provider',
          'Flutter wallet UI consumes generated contract types',
        ],
      },
      {
        title: 'Fraud & Limits Skills',
        bullets: [
          'Velocity limits per user, device, and IP hash',
          'Hold funds during dispute with refund-policy-agent rules',
          'Reconciliation nightly job vs payment provider statements',
          'Coordinate fraud-detection-agent on anomaly scoring',
        ],
      },
    ],
    advanced: [
      {
        title: 'Cross-App Economy Skills',
        bullets: [
          'Unified coin balance across Social gifts, Livestream tips, Astro consults',
          'Saga pattern: gift send → wallet debit → creator credit → rollback on fail',
          'Cross-app-wallet-sync event schema',
          'ADR before splitting wallet into regional shards',
        ],
      },
      {
        title: 'Compliance Skills',
        bullets: [
          'KYC gates for withdraw per identity-verification-agent',
          'Tax reporting hooks with tax-compliance-agent',
          'PCI scope minimization — no card storage in Stream Heaven DB',
          'Governance-compliance-agent sign-off before public wallet GA',
        ],
      },
    ],
  },

  'ai-agents/safety/trust-safety-agent.md': {
    basic: [
      {
        title: 'Policy & Enforcement Skills',
        bullets: [
          'Community guidelines alignment across four apps',
          'Report taxonomy: spam, harassment, CSAM, fraud, impersonation',
          'Block/mute enforcement on API and Socket.IO layers',
          'Shadow-ban coordination without alerting bad actors',
        ],
      },
      {
        title: 'Moderation Pipeline Skills',
        bullets: [
          'Pre-publish ML scores via ai-moderation-agent hooks',
          'Human review queue SLA for high-severity reports',
          'Appeal workflow with appeal-review-agent',
          'Creator and host strike system with escalating penalties',
        ],
      },
      {
        title: 'Regional Compliance Skills',
        bullets: [
          'India IT Rules grievance officer workflow stubs',
          'Age-gate integration for sensitive content',
          'Astro non-medical disclaimer enforcement',
          'Store policy alignment for incentive and UGC features',
        ],
      },
    ],
    advanced: [
      {
        title: 'Threat Response Skills',
        bullets: [
          'CSAM zero-tolerance pipeline with csam-detection-agent',
          'Deepfake detection on livestream frames and uploads',
          'Coordinated inauthentic behavior detection',
          'Law enforcement escalation playbook with chief-safety-officer',
        ],
      },
      {
        title: 'Trust Score Skills',
        bullets: [
          'Host and creator reputation metrics',
          'High-risk action friction: withdraw, go-live, mass DM',
          'Coordinate trust-score-agent on feature gating',
          'Transparency reports for executive agents quarterly',
        ],
      },
    ],
  },

  'apps/livestream-app/agents/multi-guest/pk-battle-agent.md': {
    basic: [
      {
        title: 'PK State Machine Skills',
        bullets: [
          'States: idle → challenge_sent → active → scoring → ended → rematch_optional',
          'Server-authoritative timers; client display only',
          'Forfeit and disconnect grace with configurable windows',
          'Idempotent challenge/accept with dedup keys',
        ],
      },
      {
        title: 'Scoring & Sync Skills',
        bullets: [
          'Gift-weighted score aggregation per room side',
          'Viewer count tie-breaker rules documented in contracts',
          'Socket.IO pk.score_update with coalesced broadcast rate',
          'Redis hot score cache with Postgres persistence at end',
        ],
      },
      {
        title: 'Contract Skills',
        bullets: [
          '/v1/livestream/pk/challenge, accept, status, forfeit endpoints',
          'Extend livestream room model without breaking v1 clients',
          'Event schema: pk.started, pk.score, pk.ended',
          'Quality-gate before enabling PK in production',
        ],
      },
    ],
    advanced: [
      {
        title: 'Monetization Integration Skills',
        bullets: [
          'PK wager holds via wallet-agent saga',
          'Gift multiplier windows during final 30 seconds',
          'Anti-cheat: validate gift events server-side only',
          'Revenue share to creators per creator-economy rules',
        ],
      },
      {
        title: 'Scale & UX Skills',
        bullets: [
          'Dual-room Agora layout compositor handoff',
          'Low-end Android PK UI: minimal animations, clear score bar',
          'Load test finals with livestream-scaling-agent',
          'Moderation: report PK harassment in real time',
        ],
      },
    ],
  },

  'apps/social-app/agents/dm-messaging-agent.md': {
    basic: [
      {
        title: 'DM API Skills',
        bullets: [
          '/v1/social/dm/threads, messages, read, delete contracts',
          'Cursor pagination on messages with stable (created_at, id) sort',
          'Media attachments via S3 presigned upload refs only',
          'Block graph check on every send — return 403 without leak',
        ],
      },
      {
        title: 'Realtime DM Skills',
        bullets: [
          'Socket namespace /social/dm per thread room',
          'Typing indicators with debounced emit rate',
          'Delivery and read receipt events with idempotency',
          'Offline queue sync on reconnect',
        ],
      },
      {
        title: 'Flutter DM UI Skills',
        bullets: [
          'Thread list with unread badges and mute support',
          'Message composer with attachment picker and low-data mode',
          'Optimistic send with rollback on failure',
          'i18n for all user-visible strings via ARB files',
        ],
      },
    ],
    advanced: [
      {
        title: 'Safety & Privacy Skills',
        bullets: [
          'Report message flow to trust-safety-agent',
          'Rate limit new threads to strangers per day',
          'E2E encryption roadmap ADR without blocking MVP plaintext server store',
          'No message content in push notification payloads',
        ],
      },
      {
        title: 'Scale Skills',
        bullets: [
          'Partition messages table by thread_id hash',
          'Redis cache last N messages per thread for fast open',
          'Load test viral creator DM inbox spikes',
          'Search integration for message history opt-in',
        ],
      },
    ],
  },

  'apps/astro-app/consultation-agent.md': {
    basic: [
      {
        title: 'Booking Flow Skills',
        bullets: [
          'Astrologer availability slots with timezone conversion (IST default)',
          '/v1/astro/consultations/book, cancel, reschedule contracts',
          'Razorpay checkout session with webhook confirmation',
          'Session timer with auto-end and overtime billing rules',
        ],
      },
      {
        title: 'Live Session Skills',
        bullets: [
          'Agora audio/video room per consultation ID',
          'Recording consent checkbox and storage policy stub',
          'In-session chat with moderation hooks',
          'Reconnect handling for poor Indian mobile networks',
        ],
      },
      {
        title: 'Compliance Copy Skills',
        bullets: [
          'Mandatory disclaimer: entertainment not medical/legal/financial advice',
          'astro-disclaimer-compliance agent copy on every screen',
          'Refund policy display before payment',
          'Minor account booking restrictions',
        ],
      },
    ],
    advanced: [
      {
        title: 'Creator Economy Skills',
        bullets: [
          'Astrologer payout split via wallet-agent and creator-payout-agent',
          'Rating and review after session with review-rating-agent',
          'Ranking signals to astrologer-ranking-agent',
          'Promo credits for first consultation via growth campaigns',
        ],
      },
      {
        title: 'Privacy Skills',
        bullets: [
          'Birth chart data encrypted at rest; minimal JWT claims',
          'No chart PII in logs or analytics events',
          'GDPR export/delete hooks on consultation history',
          'Sensitive-conversation-agent escalation on self-harm signals',
        ],
      },
    ],
  },

  'apps/media-app/ott-streaming-agent.md': {
    basic: [
      {
        title: 'Playback Skills',
        bullets: [
          'HLS/DASH player in Flutter with adaptive bitrate ladder',
          'Continue watching progress events to watch-history-agent',
          'Offline download quota per device storage tier',
          'Low-data mode: cap resolution and manual play default',
        ],
      },
      {
        title: 'Entitlement Skills',
        bullets: [
          '/v1/media/entitlement/check before stream start',
          'Subscription tier and rental window validation',
          'Geo restriction hooks with media-regional-content agent',
          'Parental PIN gate for age-rated content',
        ],
      },
      {
        title: 'CDN & Origin Skills',
        bullets: [
          'Cloudflare signed URL generation with short TTL',
          'S3 origin failover documented in runbook',
          'Thumbnail and poster CDN cache policies',
          'Coordinate media-cdn-optimizer on cache hit targets',
        ],
      },
    ],
    advanced: [
      {
        title: 'Pipeline Integration Skills',
        bullets: [
          'Transcode job status webhooks from transcoding-pipeline-agent',
          'DRM stub with drm-protection-agent before premium GA',
          'Live-to-VOD replay from livestream recording agents',
          'Catalog sync with ott-catalog-agent',
        ],
      },
      {
        title: 'Scale & Cost Skills',
        bullets: [
          'Concurrent stream start load tests for campaign launches',
          'Bitrate cap policies for free tier users',
          'S3 lifecycle for expired offline downloads',
          'Cost dashboard per watch hour with cto-agent review',
        ],
      },
    ],
  },

  'ai-agents/games/ludo-agent.md': {
    basic: [
      {
        title: 'Game Rules Skills',
        bullets: [
          'Server-authoritative dice with CSPRNG and audit log per roll',
          'Classic 4-player and quick 2-player rule variants',
          'Turn timeout auto-forfeit with configurable duration',
          'Win detection: all tokens home + exact dice on final stretch',
        ],
      },
      {
        title: 'Matchmaking Skills',
        bullets: [
          'Quick match queue with games-matchmaking-agent ELO bands',
          'Play-with-friends room codes via Redis TTL rooms',
          'NestJS game module state machine per match ID',
          '/v1/games/ludo/match, move, forfeit contracts',
        ],
      },
      {
        title: 'Flutter Board Skills',
        bullets: [
          'CustomPainter board with 60fps target on low-end Android',
          'Dice animation without blocking game state updates',
          'One-hand friendly controls and haptic feedback hooks',
          'i18n for rules and error toasts',
        ],
      },
    ],
    advanced: [
      {
        title: 'Realtime Sync Skills',
        bullets: [
          'games-socket-sync-agent broadcast on move and turn change',
          'Reconnect: resync full board state from server snapshot',
          'Anti-cheat: reject client-proposed dice values',
          'Spectator mode stub for livestream embed',
        ],
      },
      {
        title: 'Economy Integration Skills',
        bullets: [
          'Optional coin-table entry via wallet-agent hold/release',
          'Winner payout idempotency key per match',
          'games-fair-play-agent dice distribution audits',
          'Tournament handoff to games-tournament-agent',
        ],
      },
    ],
  },

  'ai-agents/meta/agent-registry-auditor-agent.md': {
    basic: [
      {
        title: 'Registry Audit Skills',
        bullets: [
          'Validate AGENT-REGISTRY.md paths exist on disk',
          'Detect duplicate agent titles and conflicting slugs',
          'Find orphan .md files under ai-agents/ and apps/**/agents/',
          'Verify @-mention paths match list-agents.mjs output',
        ],
      },
      {
        title: 'Validation Script Skills',
        bullets: [
          'Run validate-agents.mjs after bulk catalog edits',
          'Run test-golden-agents.mjs for prompt template regressions',
          'Coordinate validate-agent-skills.mjs on Skills path drift',
          'Report exit codes and fix list to agent maintainer',
        ],
      },
      {
        title: 'Dependency Graph Skills',
        bullets: [
          'Parse ## Dependencies and verify target files exist',
          'Detect circular agent dependencies for workflow-engine',
          'Flag missing governance references in agent frontmatter sections',
          'Score Responsibilities depth vs boilerplate detector',
        ],
      },
    ],
    advanced: [
      {
        title: 'Catalog Health Skills',
        bullets: [
          'Publish top 20 agents needing skill enrichment',
          'Track manifest drift in agent-skills-manifest.json',
          'Propose registry schema ADR for new domains',
          'Coordinate agent-coverage-analyst-agent on gap analysis',
        ],
      },
      {
        title: 'CI Integration Skills',
        bullets: [
          'GitHub Actions gate on validate-agents for agent PRs',
          'Pre-commit hook recommendation via create-hook skill',
          'Bulk update playbooks for agent-skill-validator-agent',
          'Escalate catalog breakage to platform-orchestrator',
        ],
      },
    ],
  },

  'ai-agents/meta/agent-catalog-maintenance-agent.md': {
    basic: [
      {
        title: 'Agent Discovery & Inventory',
        bullets: [
          'Scan ai-agents/, apps/**/agents/, and apps/*/*-agent.md for catalog changes',
          'Use list-agents.mjs --phase --domain --search for filtered discovery',
          'Compare filesystem agents against AGENT-REGISTRY.md entries',
          'Classify git changes as catalog vs unrelated before staging',
        ],
      },
      {
        title: 'Skill Generation & Enrichment',
        bullets: [
          'Run generate-agent-skills.mjs --force for new or updated agents',
          'Run enrich-agent-responsibilities.mjs --force after responsibility template edits',
          'Apply hand-authored blocks from agent-skill-enrichments.mjs for golden agents',
          'Ensure basic and advanced SKILL.md paths match agent ## Skills section',
        ],
      },
      {
        title: 'Validation & Quality Gates',
        bullets: [
          'Run validate-agents.mjs — target 0 FAIL, minimize PARTIAL',
          'Run validate-agent-skills.mjs — all manifest skill files present',
          'Run validate-all-agent-skills.mjs — advanced competency 500+ chars',
          'Fix thin skills before commit; never commit broken catalog',
        ],
      },
      {
        title: 'Git Commit Hygiene',
        bullets: [
          'Stage only ai-agents/**, apps/**/agents/**, .cursor/skills/stream-heaven/**',
          'Include scripts: generate-agent-skills, enrich-agent-responsibilities, templates, validators',
          'Exclude phase1-runtime-log.txt, apps/mobile/**, unrelated bootstrap .ps1',
          'Use WHY-focused commit messages; never push unless user requests',
        ],
      },
    ],
    advanced: [
      {
        title: 'Manifest & Registry Sync',
        bullets: [
          'Regenerate agent-skill-manifest.mjs with generate-agent-skills.mjs --manifest --force',
          'Add new meta agents to AGENT-REGISTRY.md Phase 0 section',
          'Coordinate agent-registry-auditor-agent on orphan and ghost entries',
          'Update agent-skill-enrichments.mjs when adding golden-batch competency blocks',
        ],
      },
      {
        title: 'Priority Agent Hand-Authoring',
        bullets: [
          'Enrich executive, Phase 1, and cross-app agents beyond generator defaults',
          'Add domain competency sections: 3+ titled blocks with actionable bullets',
          'Cross-reference quality bar: teen-patti-agent, auth-service-agent',
          'Run test-golden-agents.mjs after prompt template changes',
        ],
      },
      {
        title: 'CI Integration',
        bullets: [
          'Ensure .github/workflows/phase1-ci.yml runs validate-agents on agent PRs',
          'Document validation commands in skill Key paths tables',
          'Block catalog merges when validate-all-agent-skills exits non-zero',
          'Escalate repeated validation failures to agent-skill-validator-agent',
        ],
      },
    ],
  },

  'ai-agents/phase-1/phase-1-remediation-agent.md': {
    basic: [
      {
        title: 'Bootstrap Debug Skills',
        bullets: [
          'Diagnose port 3000–3002, 3009 conflicts on Windows dev machines',
          'Docker compose health: postgres ready, redis PONG',
          'NestJS compile errors: missing env, bad imports, migration fail',
          'Parse logs/dev-*.log for stack traces and root cause',
        ],
      },
      {
        title: 'Service Fix Skills',
        bullets: [
          'Gateway proxy route typos and upstream URL mismatches',
          'Auth OTP dev log capture for smoke-test-phase1.ps1',
          'Redis connection string and session key schema fixes',
          'Profile migration ordering and seed data issues',
        ],
      },
      {
        title: 'Script Repair Skills',
        bullets: [
          'Patch setup-phase1.ps1 and phase1-start-services.ps1 minimally',
          'Preserve Windows PowerShell parity with documented bash alternatives',
          'Re-run smoke after each fix; document repro steps',
          'Avoid scope creep into Phase 2 features',
        ],
      },
    ],
    advanced: [
      {
        title: 'Escalation Skills',
        bullets: [
          'Architectural blockers → phase-1-autonomous-completion-agent',
          'NestJS pattern fixes → nestjs-architect',
          'Contract mismatches → openapi-contract-validation-agent',
          'Repeated failures → cto-agent with incident summary',
        ],
      },
    ],
  },

  'ai-agents/orchestration/senior-code-review-agent.md': {
    basic: [
      {
        title: 'Code Review Skills',
        bullets: [
          'NestJS: guards, DTO validation, no business logic in controllers',
          'Flutter: Riverpod patterns, no API calls in build methods',
          'Reject secrets, console.log of PII, and commented-out dead code',
          'Smallest correct diff — challenge unrelated refactors',
        ],
      },
      {
        title: 'Contract Review Skills',
        bullets: [
          'Require shared-contracts update before API implementation',
          'Check breaking change policy and version bumps',
          'Verify OpenAPI matches controller decorators',
          'Block undocumented query params and response fields',
        ],
      },
      {
        title: 'Test & Quality Skills',
        bullets: [
          'Meaningful tests on auth, wallet, realtime critical paths',
          'npm test / flutter test green in CI',
          'Quality-gate checklist items addressed in PR description',
          'ADR link present for architecture changes',
        ],
      },
    ],
    advanced: [
      {
        title: 'System Design Review Skills',
        bullets: [
          'Coordinate system-design-reviewer-agent on cross-service PRs',
          'Challenge N+1 queries, missing indexes, unbounded fan-out',
          'Review idempotency on wallet and gift mutations',
          'Scale implications for livestream and feed hot paths',
        ],
      },
      {
        title: 'Governance Enforcement Skills',
        bullets: [
          'platform-governance/ compliance per governance-compliance-agent matrix',
          'No duplicate services in services/',
          'Phase ordering: no Phase 8 feature without Phase 1 auth path',
          'Escalate repeat offenders to rollback-coordinator',
        ],
      },
    ],
  },
};
