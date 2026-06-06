/**
 * Domain-specific competency templates for agent skill generation.
 * Each domain provides basic (4-6 sections) and advanced (8-11 sections) skill blocks.
 */

import { EXTRA_DOMAIN_TEMPLATES } from './agent-skill-templates-extra.mjs';

/** @typedef {{ title: string; verb: string; items: string[] }} CompetencySection */

/** @type {Record<string, { basic: CompetencySection[]; advanced: CompetencySection[] }>} */
const BASE_DOMAIN_TEMPLATES = {
  games: {
    basic: [
      {
        title: 'Game Loop & State Management',
        verb: 'Design',
        items: [
          'server-authoritative game state with deterministic turn order',
          'state snapshots for reconnect and late-join recovery',
          'turn timeout and forfeit handling for mobile sessions',
          'idle player detection and bot backfill policies',
          'game phase transitions (lobby → active → results)',
        ],
      },
      {
        title: 'Realtime Sync & Socket Protocol',
        verb: 'Implement',
        items: [
          'Socket.IO room channels per match with Redis pub/sub fan-out',
          'delta updates vs full-state sync for low-bandwidth clients',
          'client prediction with server reconciliation for smooth UX',
          'heartbeat and disconnect grace periods',
          'event ordering guarantees for dice rolls and moves',
        ],
      },
      {
        title: 'Matchmaking & Lobbies',
        verb: 'Configure',
        items: [
          'skill-based and casual queue definitions in Redis',
          'private room codes and friend-invite flows',
          'queue wait thresholds with optional bot fill',
          'regional latency-aware server selection',
          'concurrent match capacity per game type',
        ],
      },
      {
        title: 'Fair Play & Anti-Cheat',
        verb: 'Enforce',
        items: [
          'server-side RNG for dice, cards, and outcomes',
          'move validation against authoritative rules engine',
          'rate limits on actions and suspicious pattern detection',
          'audit logs for disputed matches and refunds',
          'replay verification for tournament disputes',
        ],
      },
      {
        title: 'Economy & Rewards Integration',
        verb: 'Wire',
        items: [
          'optional coin entry fees via wallet-service contracts',
          'winner payout and rake configuration',
          'daily reward hooks and streak bonuses',
          'leaderboard point accrual on match completion',
          'graceful handling of insufficient balance at entry',
        ],
      },
    ],
    advanced: [
      {
        title: 'Advanced Game Architecture',
        verb: 'Architect',
        items: [
          'NestJS game module isolation per title with shared platform SDK',
          'hot-swappable rules engines for A/B rule variants',
          'cross-game session federation for unified player identity',
          'game-specific ADRs when diverging from platform defaults',
          'load testing match throughput at peak Indian evening hours',
        ],
      },
      {
        title: 'Realtime Sync at Scale',
        verb: 'Scale',
        items: [
          'Redis cluster sharding for match state keys',
          'sticky sessions and Socket.IO adapter scaling',
          'cross-region match migration for failover',
          'compression of state payloads for 2G networks',
          'chaos testing disconnect storms during live events',
        ],
      },
      {
        title: 'Matchmaking Intelligence',
        verb: 'Optimize',
        items: [
          'ELO/Glicko-style skill rating per game mode',
          'party matchmaking with size-aware queue merging',
          'toxic-player shadow pools and report-weighted matching',
          'dynamic queue expansion when wait times exceed SLA',
          'analytics on match quality and churn correlation',
        ],
      },
      {
        title: 'Anti-Cheat & Fair Play Operations',
        verb: 'Operate',
        items: [
          'collusion detection across shared IP and device fingerprints',
          'automated flagging for statistically impossible win rates',
          'manual review tooling for tournament integrity',
          'refund and ban workflows integrated with trust-safety',
          'provably fair RNG audit trails for compliance',
        ],
      },
      {
        title: 'Leaderboards & Tournaments',
        verb: 'Run',
        items: [
          'seasonal leaderboard resets with archival snapshots',
          'bracket tournament scheduling and bye handling',
          'prize pool distribution with wallet ledger reconciliation',
          'live tournament spectator channels',
          'regional leaderboard partitions for latency fairness',
        ],
      },
      {
        title: 'Flutter Game UI Performance',
        verb: 'Optimize',
        items: [
          'CustomPainter vs Flame engine selection per game',
          '60fps targets on 2GB RAM Android devices',
          'asset bundle size budgets and lazy loading',
          'one-hand play layouts for portrait mobile',
          'accessibility for color-blind and low-vision players',
        ],
      },
      {
        title: 'Production Validation & Observability',
        verb: 'Validate',
        items: [
          'match lifecycle metrics (created, completed, abandoned)',
          'p99 turn latency and reconnect success rate dashboards',
          'synthetic bot matches in staging before release',
          'golden agent tests for game rule edge cases',
          'incident runbooks for stuck matches and payout failures',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'handoffs to games-platform-architect for embedding specs',
          'games-matchmaking-agent queue contract alignment',
          'games-socket-sync-agent protocol versioning',
          'wallet-service integration for economy features',
          'ADR drafts via docs/adr/SH-000-template.md for rule forks',
        ],
      },
    ],
  },

  auth: {
    basic: [
      {
        title: 'Authentication Flow Design',
        verb: 'Design',
        items: [
          'phone OTP as primary login for Indian mobile-first users',
          'email magic-link fallback for recovery flows',
          'Firebase Auth bridge with custom token exchange',
          'device trust hooks for suspicious login detection',
          'graceful offline OTP retry with exponential backoff',
        ],
      },
      {
        title: 'JWT & Session Management',
        verb: 'Implement',
        items: [
          'short-lived access tokens (≤15m) with refresh rotation',
          'Redis-backed session store with TTL and revocation lists',
          'refresh token reuse detection and family invalidation',
          'JWT claims: sub, roles, device_id, session_id',
          'api-gateway Bearer validation middleware contract',
        ],
      },
      {
        title: 'OTP & Rate Limiting',
        verb: 'Secure',
        items: [
          'SMS provider abstraction (Twilio, MSG91, etc.) via env config',
          'idempotent OTP verify with attempt counters',
          'brute-force rate limits on /auth/verify-otp',
          'OTP expiry windows and resend cooldown policies',
          'no secrets in repo — env templates only',
        ],
      },
      {
        title: 'Contract-First API Design',
        verb: 'Define',
        items: [
          'OpenAPI schemas in packages/shared-contracts/auth/v1',
          'register, login, refresh, logout, verify-otp endpoints',
          'standard error codes for auth failures',
          'gateway proxy rules for /auth/* routes',
          'integration test plan with api-gateway-bootstrap-agent',
        ],
      },
      {
        title: 'Security & Compliance',
        verb: 'Follow',
        items: [
          'platform-governance/security-rules.md for token handling',
          'PII minimization in logs and audit trails',
          'HTTPS-only token transport; no tokens in query strings',
          'escalation path to unified-auth-agent for SSO Phase 2',
          'session fixation and CSRF protections on web surfaces',
        ],
      },
    ],
    advanced: [
      {
        title: 'Advanced Token Architecture',
        verb: 'Architect',
        items: [
          'asymmetric JWT signing with key rotation schedule',
          'opaque refresh tokens vs JWT refresh trade-offs',
          'cross-app token federation for four-app ecosystem',
          'token binding to device fingerprint where appropriate',
          'emergency global session revocation via Redis pub/sub',
        ],
      },
      {
        title: 'Firebase & Identity Bridge',
        verb: 'Integrate',
        items: [
          'Firebase Admin SDK verification in NestJS guards',
          'custom claims sync to PostgreSQL user records',
          'phone number normalization for Indian +91 formats',
          'account linking for social login Phase 2 prep',
          'Firebase emulator config for local dev bootstrap',
        ],
      },
      {
        title: 'Session Security Operations',
        verb: 'Operate',
        items: [
          'Redis session key schema: auth:session:{userId}:{sessionId}',
          'concurrent session limits per user tier',
          'geo-velocity checks for impossible travel logins',
          'audit log pipeline for auth events to analytics',
          'incident response for credential stuffing attacks',
        ],
      },
      {
        title: 'OTP Infrastructure at Scale',
        verb: 'Scale',
        items: [
          'multi-provider SMS failover with cost tracking',
          'OTP delivery SLA monitoring and alerting',
          'voice OTP fallback for SMS delivery failures',
          'DND registry compliance for Indian telecom rules',
          'load testing auth endpoints at festival traffic peaks',
        ],
      },
      {
        title: 'Gateway Integration & Zero Trust',
        verb: 'Wire',
        items: [
          'JWT validation middleware in api-gateway with JWKS cache',
          'rate limiting tiers: anonymous, authenticated, premium',
          'X-User-Id header propagation to downstream services',
          'mTLS prep for internal service-to-service auth',
          'API key management for partner integrations',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'handoff checklist for api-gateway-bootstrap-agent',
          'profile-service user ID linkage via JWT sub claim',
          'nestjs-architect module template alignment',
          'redis-cache-specialist session TTL policies',
          'ADR for auth architecture forks',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'contract tests for all auth OpenAPI endpoints',
          'chaos testing Redis session store failover',
          'penetration test scope for OTP brute force',
          'golden agent tests for auth flow edge cases',
          'smoke test scripts in setup-phase1.ps1 alignment',
        ],
      },
      {
        title: 'Observability & Incident Response',
        verb: 'Monitor',
        items: [
          'auth success/failure rate dashboards',
          'OTP delivery latency and failure alerting',
          'anomaly detection on login geo patterns',
          'runbooks for mass session invalidation',
          'post-incident review template for auth breaches',
        ],
      },
    ],
  },

  profile: {
    basic: [
      {
        title: 'User Profile Schema Design',
        verb: 'Design',
        items: [
          'PostgreSQL users and profiles table separation',
          'handle uniqueness with case-insensitive index',
          'display name, bio, avatar URL fields',
          'profile privacy enum: public, followers, private',
          'cross-app identity projection for four apps',
        ],
      },
      {
        title: 'Profile CRUD APIs',
        verb: 'Implement',
        items: [
          'GET/PATCH /v1/users/me for self-service updates',
          'GET /v1/users/:handle for public profile views',
          'JWT sub claim linkage from auth-service',
          'input validation for handles, bios, and display names',
          'soft-delete and account deactivation flows',
        ],
      },
      {
        title: 'Avatar & Media Upload',
        verb: 'Wire',
        items: [
          'S3 presigned upload contract for avatar images',
          'Cloudflare CDN URL generation for avatar delivery',
          'image size and format validation (WebP preferred)',
          'moderation escalation to content-safety-agent',
          'default avatar fallbacks for new users',
        ],
      },
      {
        title: 'Caching & Performance',
        verb: 'Optimize',
        items: [
          'Redis profile cache for feed and presence hot paths',
          'cache invalidation on profile PATCH events',
          'minimal profile projection for list endpoints',
          'TTL policies aligned with redis-cache-specialist',
          'batch profile fetch for social feed composition',
        ],
      },
      {
        title: 'Contract-First Design',
        verb: 'Define',
        items: [
          'OpenAPI schemas in packages/shared-contracts/users/v1',
          'shared-types user models in packages/shared-types',
          'api-gateway proxy rules for /users/* routes',
          'migration outline for users, profiles, profile_settings',
          'integration tests with auth-service JWT flow',
        ],
      },
    ],
    advanced: [
      {
        title: 'Advanced Profile Architecture',
        verb: 'Architect',
        items: [
          'event-driven profile updates via Redis Streams',
          'read replicas for high-traffic profile lookups',
          'profile versioning for audit and rollback',
          'multi-region profile cache coherence',
          'ADR for profile data model extensions',
        ],
      },
      {
        title: 'Privacy & Moderation Integration',
        verb: 'Enforce',
        items: [
          'field-level privacy controls per app surface',
          'blocked user profile visibility rules',
          'content moderation queue for avatar and bio changes',
          'GDPR-style data export and deletion workflows',
          'minor account restrictions and parental controls prep',
        ],
      },
      {
        title: 'Media Pipeline Integration',
        verb: 'Integrate',
        items: [
          'image processing pipeline for avatar resize and WebP conversion',
          'virus scan hook before avatar publish',
          'CDN cache purge on avatar update',
          'bandwidth-optimized thumbnail variants',
          'S3 lifecycle policies for orphaned uploads',
        ],
      },
      {
        title: 'Cross-App Identity Projection',
        verb: 'Project',
        items: [
          'minimal profile DTO per app (social vs livestream vs astro)',
          'verified badge and creator tier display rules',
          'handle change cooldown and redirect policies',
          'profile completeness scoring for onboarding nudges',
          'sync events to search-infrastructure indexing',
        ],
      },
      {
        title: 'Caching at Scale',
        verb: 'Scale',
        items: [
          'Redis cluster sharding for profile cache keys',
          'cache stampede prevention with request coalescing',
          'negative caching for non-existent handles',
          'cache warming for trending creator profiles',
          'chaos testing cache invalidation storms',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'auth-service user ID creation handoff',
          'api-gateway-bootstrap-agent route registration',
          'postgres-architect schema review',
          'content-safety-agent moderation escalation',
          'social-feed-agent profile display requirements',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'contract tests for all user OpenAPI endpoints',
          'load testing profile fetch at feed peak traffic',
          'avatar upload E2E with presigned URL flow',
          'privacy setting enforcement integration tests',
          'golden agent tests for profile edge cases',
        ],
      },
      {
        title: 'Observability & Operations',
        verb: 'Monitor',
        items: [
          'profile update rate and cache hit ratio dashboards',
          'avatar upload failure alerting',
          'handle collision and uniqueness violation metrics',
          'runbooks for profile data corruption recovery',
          'post-incident review for PII exposure events',
        ],
      },
    ],
  },

  livestream: {
    basic: [
      {
        title: 'Live Room Lifecycle',
        verb: 'Own',
        items: [
          'room create, start, join, leave, and end state machine',
          'deterministic transitions with idempotent API calls',
          'viewer count safety guards against race conditions',
          'graceful host disconnect and co-host takeover',
          'cross-app handoff for room discovery surfaces',
        ],
      },
      {
        title: 'Streaming Token & Provider Integration',
        verb: 'Integrate',
        items: [
          'Agora token bootstrap contract with AGORA_APP_ID env only',
          'no embedded provider secrets in codebase',
          'token TTL aligned with expected session duration',
          'publisher vs subscriber role token differentiation',
          'provider failover prep for Zego as alternate',
        ],
      },
      {
        title: 'Livestream API Contracts',
        verb: 'Define',
        items: [
          '/v1/livestream/* OpenAPI in packages/shared-contracts',
          'room list, create, start, join, leave, end endpoints',
          'viewer count and room metadata in responses',
          'api-gateway proxy with JWT X-User-Id propagation',
          'backward-compatible contract evolution for Phase 3 features',
        ],
      },
      {
        title: 'Realtime Events',
        verb: 'Emit',
        items: [
          'livestream.room.started event schema',
          'livestream.viewer.joined and viewer.left events',
          'livestream.room.ended with duration and peak viewer stats',
          'Socket.IO broadcast channels per room',
          'event schema ownership with socketio-architect',
        ],
      },
      {
        title: 'Mobile Live Room UX',
        verb: 'Guide',
        items: [
          'Flutter live room list in apps/mobile',
          'low-bandwidth preview thumbnails via CDN',
          'one-tap join with minimal pre-buffer',
          'host go-live flow optimized for low-end Android',
          'background audio handling for audio-room mode',
        ],
      },
    ],
    advanced: [
      {
        title: 'Livestream Scaling Architecture',
        verb: 'Scale',
        items: [
          'horizontal scaling of livestream-service instances',
          'Redis-backed room state with sticky Socket.IO sessions',
          'viewer count aggregation via Redis INCR with debounce',
          'CDN edge caching for room metadata and thumbnails',
          'regional room placement for latency optimization',
        ],
      },
      {
        title: 'Multi-Host & Co-Streaming',
        verb: 'Support',
        items: [
          'co-host invitation and permission model',
          'layout switching for PK battles and guest panels',
          'audio mixing coordination with multi-guest agents',
          'bandwidth-adaptive layouts for viewer devices',
          'host control delegation and moderation tools',
        ],
      },
      {
        title: 'Monetization Handoff Architecture',
        verb: 'Prepare',
        items: [
          'gift event hooks without breaking core room contracts',
          'PK battle state extension points in room schema',
          'wallet ledger integration stubs for tipping',
          'creator revenue share event emission',
          'Phase 3 agent handoff documentation',
        ],
      },
      {
        title: 'Moderation & Safety Integration',
        verb: 'Wire',
        items: [
          'live content moderation signal ingestion',
          'host ban and room force-close admin APIs',
          'report flow from viewer to trust-safety pipeline',
          'age-gated room access policies',
          'regional compliance for live content regulations',
        ],
      },
      {
        title: 'Adaptive Streaming & Quality',
        verb: 'Optimize',
        items: [
          'adaptive bitrate guidance for host upload conditions',
          'low-latency mode vs standard mode trade-offs',
          'network quality indicator for viewers on poor connectivity',
          'fallback to audio-only on bandwidth collapse',
          'coordination with adaptive-streaming-agent',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'room lifecycle E2E tests with synthetic viewers',
          'load testing 10K concurrent viewers per room cluster',
          'Agora token generation contract tests',
          'chaos testing host disconnect during peak viewers',
          'golden agent tests for room state edge cases',
        ],
      },
      {
        title: 'Observability & Incident Response',
        verb: 'Monitor',
        items: [
          'concurrent live rooms and viewer count dashboards',
          'stream start failure rate and token error alerting',
          'p99 room join latency metrics',
          'runbooks for stuck rooms and ghost viewer counts',
          'post-incident review for live outage events',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'room-lifecycle-manager and viewer-session-agent handoffs',
          'socketio-architect event schema alignment',
          'creator-monetization-agent Phase 3 extension planning',
          'livestream-scaling-agent capacity planning',
          'ADR drafts for streaming provider changes',
        ],
      },
    ],
  },

  social: {
    basic: [
      {
        title: 'Feed Composition & Pagination',
        verb: 'Design',
        items: [
          'following feed vs For You algorithmic feed separation',
          'cursor-based pagination for infinite scroll',
          'low-bandwidth feed payloads for 2G/3G networks',
          'ad insertion slots without disrupting scroll UX',
          'feed refresh and pull-to-refresh debouncing',
        ],
      },
      {
        title: 'Social API Contracts',
        verb: 'Define',
        items: [
          '/v1/social/* OpenAPI in packages/shared-contracts',
          'posts CRUD, comments, follows, and report/block stubs',
          'api-gateway JWT-derived X-User-Id header propagation',
          'request-id propagation for distributed tracing',
          'moderation hook endpoints for trust-safety integration',
        ],
      },
      {
        title: 'Post & Engagement Flows',
        verb: 'Implement',
        items: [
          'CRUD-lite post creation with media upload hooks',
          'comment threading with depth limits',
          'follow/unfollow mutation with fan-out considerations',
          'like and share event emission for analytics',
          'report and block pathways to moderation pipeline',
        ],
      },
      {
        title: 'Feed Ranking Integration',
        verb: 'Coordinate',
        items: [
          'feed-ranking-agent ordering input contracts',
          'feed-architect composition layer boundaries',
          'cold-start feed for new users without follows',
          'regional content boosting for Indian languages',
          'A/B test hooks for ranking algorithm variants',
        ],
      },
      {
        title: 'Mobile Feed UX',
        verb: 'Guide',
        items: [
          'Flutter feed in apps/mobile with Riverpod state',
          'image lazy loading and placeholder skeletons',
          'video autoplay policy for low-end devices',
          'offline draft posts with sync on reconnect',
          'accessibility for screen reader feed navigation',
        ],
      },
    ],
    advanced: [
      {
        title: 'Feed Architecture at Scale',
        verb: 'Architect',
        items: [
          'fan-out on write vs fan-out on read trade-off analysis',
          'Redis-backed feed cache with TTL and invalidation',
          'hot creator feed pre-computation for viral posts',
          'feed shard partitioning by user cohort',
          'cross-region feed consistency for diaspora users',
        ],
      },
      {
        title: 'Content Moderation Pipeline',
        verb: 'Integrate',
        items: [
          'pre-publish content scanning hooks',
          'post-report triage queue integration',
          'automated shadow-ban and visibility reduction',
          'appeal workflow for moderated content',
          'coordination with trust-safety-agent policies',
        ],
      },
      {
        title: 'Media & CDN Integration',
        verb: 'Optimize',
        items: [
          'S3 presigned upload for post images and videos',
          'Cloudflare CDN URL generation with cache purge',
          'WebP/AVIF transcoding for bandwidth savings',
          'video thumbnail generation for feed previews',
          'media pipeline cost tracking per post type',
        ],
      },
      {
        title: 'Engagement Analytics',
        verb: 'Track',
        items: [
          'impression, click, dwell time event schemas',
          'real-time trending post detection',
          'creator analytics dashboard data feeds',
          'A/B test result aggregation for feed experiments',
          'privacy-compliant analytics with consent gates',
        ],
      },
      {
        title: 'Search & Discovery Integration',
        verb: 'Wire',
        items: [
          'post indexing hooks for search-infrastructure',
          'hashtag normalization and trending computation',
          'user discovery via mutual follows graph',
          'content deduplication for repost detection',
          'regional trending with language filters',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'contract tests for all social OpenAPI endpoints',
          'load testing feed fetch at peak evening traffic',
          'moderation pathway integration tests',
          'feed ranking regression test suite',
          'golden agent tests for feed edge cases',
        ],
      },
      {
        title: 'Observability & Operations',
        verb: 'Monitor',
        items: [
          'feed latency p50/p99 dashboards',
          'post creation failure rate alerting',
          'moderation queue depth monitoring',
          'runbooks for feed staleness and cache poisoning',
          'post-incident review for content safety events',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'feed-architect and feed-ranking-agent alignment',
          'story-system-designer cross-surface consistency',
          'profile-service avatar and handle display',
          'socketio-architect realtime notification events',
          'ADR drafts for feed architecture forks',
        ],
      },
    ],
  },

  realtime: {
    basic: [
      {
        title: 'Socket.IO Architecture',
        verb: 'Design',
        items: [
          'namespace and room topology for four-app ecosystem',
          'Redis adapter for multi-instance Socket.IO scaling',
          'authentication handshake with JWT validation',
          'connection lifecycle: connect, reconnect, disconnect grace',
          'event naming conventions and schema versioning',
        ],
      },
      {
        title: 'Event Protocol Design',
        verb: 'Define',
        items: [
          'typed event payloads in packages/shared-contracts/realtime',
          'ack/retry semantics for critical events',
          'broadcast vs unicast vs room-scoped delivery',
          'event ordering guarantees per room/channel',
          'backpressure handling for slow clients',
        ],
      },
      {
        title: 'Presence & State Sync',
        verb: 'Implement',
        items: [
          'online/offline presence with heartbeat intervals',
          'room membership tracking in Redis sets',
          'state snapshot and delta sync patterns',
          'reconnect state recovery from server cache',
          'presence fan-out cost optimization',
        ],
      },
      {
        title: 'Performance for Mobile India',
        verb: 'Optimize',
        items: [
          'minimal payload sizes for 2G/3G networks',
          'WebSocket fallback to long-polling configuration',
          'connection pooling and keep-alive tuning',
          'battery-aware heartbeat frequency on mobile',
          'graceful degradation when realtime unavailable',
        ],
      },
      {
        title: 'Security & Authorization',
        verb: 'Enforce',
        items: [
          'room join authorization against JWT claims',
          'rate limiting on event emission per connection',
          'input validation on all inbound socket events',
          'CORS and origin validation for web clients',
          'audit logging for privileged socket operations',
        ],
      },
    ],
    advanced: [
      {
        title: 'Realtime Scaling Architecture',
        verb: 'Scale',
        items: [
          'Redis cluster for Socket.IO adapter pub/sub',
          'sticky session load balancing at gateway layer',
          'horizontal pod autoscaling on connection count metrics',
          'cross-region realtime relay for diaspora users',
          'connection limit policies per user tier',
        ],
      },
      {
        title: 'Event Streaming Integration',
        verb: 'Integrate',
        items: [
          'Redis Streams for durable event backplane',
          'bridge socket events to async consumers (Bull queues)',
          'event replay for late-joining clients',
          'dead letter handling for failed event delivery',
          'coordination with event-system agents',
        ],
      },
      {
        title: 'Livestream & Games Realtime',
        verb: 'Support',
        items: [
          'high-frequency game state sync protocols',
          'livestream viewer count aggregation patterns',
          'gift animation event fan-out at scale',
          'PK battle score update broadcast optimization',
          'latency SLA targets per use case',
        ],
      },
      {
        title: 'Chaos & Reliability Engineering',
        verb: 'Test',
        items: [
          'disconnect storm simulation during live events',
          'Redis adapter failover testing',
          'split-brain detection in multi-instance clusters',
          'graceful shutdown with connection draining',
          'coordination with chaos-engineering-agent',
        ],
      },
      {
        title: 'Monitoring & Debugging',
        verb: 'Monitor',
        items: [
          'connected client count and room occupancy dashboards',
          'event throughput and latency histograms',
          'reconnect rate and failure reason tracking',
          'socket debug mode for staging environments',
          'distributed tracing across socket and REST paths',
        ],
      },
      {
        title: 'Protocol Evolution',
        verb: 'Version',
        items: [
          'schema versioning with backward-compatible readers',
          'feature flags for new event types rollout',
          'client SDK version negotiation on handshake',
          'deprecation timeline for legacy event formats',
          'ADR for breaking protocol changes',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'livestream-agent room event schema ownership',
          'games-socket-sync-agent game protocol alignment',
          'nestjs-architect gateway middleware integration',
          'redis-cache-specialist pub/sub configuration',
          'kubernetes-agent deployment and HPA policies',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'load testing 100K concurrent socket connections',
          'event delivery guarantee integration tests',
          'authentication bypass penetration test scope',
          'golden agent tests for reconnect edge cases',
          'staging synthetic traffic before major releases',
        ],
      },
    ],
  },

  nestjs: {
    basic: [
      {
        title: 'NestJS Module Architecture',
        verb: 'Define',
        items: [
          'module template for services/* (config, health, logging, metrics)',
          'feature module isolation with clear domain boundaries',
          'shared library consumption from packages/',
          'global vs scoped provider registration patterns',
          'lazy-loaded module strategy for large services',
        ],
      },
      {
        title: 'Cross-Cutting Middleware',
        verb: 'Standardize',
        items: [
          'global JWT auth guards across microservices',
          'rate limiting guards with Redis-backed counters',
          'validation pipes with class-validator DTOs',
          'exception filters for consistent error responses',
          'request-id and tracing interceptors',
        ],
      },
      {
        title: 'Inter-Service Communication',
        verb: 'Architect',
        items: [
          'sync REST via api-gateway for client-facing APIs',
          'async events via Redis pub/sub and Bull queues',
          'domain event emission to Redis Streams',
          'circuit breaker patterns for downstream calls',
          'idempotency keys for mutation endpoints',
        ],
      },
      {
        title: 'OpenAPI & Contract Alignment',
        verb: 'Align',
        items: [
          'OpenAPI generation from NestJS decorators',
          'packages/shared-contracts as source of truth',
          'api-contract-author review workflow',
          'DTO mapping between contract and internal models',
          'breaking change detection in CI',
        ],
      },
      {
        title: 'Service Scaffolding Standards',
        verb: 'Document',
        items: [
          'folder structure: controllers, services, dto, entities',
          'health check and readiness probe endpoints',
          'structured logging with correlation IDs',
          'environment config via @nestjs/config',
          'Phase 1 build order alignment',
        ],
      },
    ],
    advanced: [
      {
        title: 'Microservice Extraction Patterns',
        verb: 'Architect',
        items: [
          'bounded context identification for service splits',
          'strangler fig migration from monolith modules',
          'shared database vs database-per-service trade-offs',
          'saga patterns for cross-service transactions',
          'ADR template for new microservice extraction',
        ],
      },
      {
        title: 'Advanced Async Patterns',
        verb: 'Implement',
        items: [
          'Bull queue job retry and dead letter policies',
          'Redis Streams consumer groups for event processing',
          'outbox pattern for reliable event publishing',
          'scheduled tasks with @nestjs/schedule',
          'backpressure handling in high-volume consumers',
        ],
      },
      {
        title: 'Performance & Scalability',
        verb: 'Optimize',
        items: [
          'connection pooling for PostgreSQL and Redis',
          'response compression and ETag caching',
          'query optimization with TypeORM/Prisma best practices',
          'horizontal scaling with stateless service design',
          'load testing methodology for NestJS services',
        ],
      },
      {
        title: 'Security Architecture',
        verb: 'Harden',
        items: [
          'RBAC guard implementation across services',
          'input sanitization and SQL injection prevention',
          'secrets management via AWS Secrets Manager',
          'API rate limiting tiers by endpoint sensitivity',
          'security headers and CORS policies',
        ],
      },
      {
        title: 'Testing Strategy',
        verb: 'Validate',
        items: [
          'unit tests with mocked repositories',
          'integration tests with testcontainers PostgreSQL/Redis',
          'contract tests against OpenAPI specs',
          'e2e tests through api-gateway',
          'test coverage gates in CI pipeline',
        ],
      },
      {
        title: 'Observability Integration',
        verb: 'Instrument',
        items: [
          'OpenTelemetry tracing across NestJS middleware stack',
          'Prometheus metrics endpoints per service',
          'structured JSON logging with log levels',
          'health check aggregation for kubernetes probes',
          'alerting on error rate and latency SLO breaches',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'microservice-designer for cross-service transactions',
          'postgres-architect for schema ownership',
          'api-contract-author for contract-first workflow',
          'redis-cache-specialist for caching policies',
          'kubernetes-agent for deployment manifests',
        ],
      },
      {
        title: 'Production Readiness',
        verb: 'Ensure',
        items: [
          'graceful shutdown with in-flight request draining',
          'zero-downtime deployment strategies',
          'database migration safety checks',
          'rollback procedures for failed deployments',
          'production-readiness-checklist alignment',
        ],
      },
    ],
  },

  flutter: {
    basic: [
      {
        title: 'Flutter App Architecture',
        verb: 'Define',
        items: [
          'Riverpod provider hierarchy for state management',
          'GoRouter navigation with deep link support',
          'feature-first folder structure in apps/mobile',
          'shared widget library in packages/design-system',
          'environment config via --dart-define API_BASE_URL',
        ],
      },
      {
        title: 'Performance for Low-End Android',
        verb: 'Optimize',
        items: [
          '60fps scroll targets on 2GB RAM devices',
          'image caching and lazy loading strategies',
          'widget rebuild minimization with const constructors',
          'RepaintBoundary for complex list items',
          'memory profiling for leak detection',
        ],
      },
      {
        title: 'Networking & API Integration',
        verb: 'Implement',
        items: [
          'Dio/HTTP client with JWT token injection',
          'token refresh interceptor on 401 responses',
          'offline-aware retry with exponential backoff',
          'request cancellation on widget dispose',
          'API error mapping to user-friendly i18n strings',
        ],
      },
      {
        title: 'UI & Design System',
        verb: 'Apply',
        items: [
          'design tokens from packages/design-system',
          'platform-governance/flutter-ui-rules.md compliance',
          'responsive layouts for varied screen sizes',
          'dark mode and theme switching support',
          'accessibility: semantics, contrast, touch targets',
        ],
      },
      {
        title: 'Localization & Indian Market',
        verb: 'Support',
        items: [
          'i18n ARB files for 9+ Indian languages',
          'RTL-safe layouts where applicable',
          'low-bandwidth mode toggles',
          'OTP autofill and phone number formatting',
          'Indian number/date formatting conventions',
        ],
      },
    ],
    advanced: [
      {
        title: 'Advanced State Management',
        verb: 'Architect',
        items: [
          'Riverpod code generation with @riverpod annotations',
          'async provider error and loading state patterns',
          'cross-feature state sharing without tight coupling',
          'optimistic UI updates with rollback on failure',
          'state persistence for offline-first features',
        ],
      },
      {
        title: 'Realtime Client Integration',
        verb: 'Wire',
        items: [
          'Socket.IO client with reconnection backoff',
          'event stream to Riverpod provider bridge',
          'background connection management on mobile',
          'battery-efficient heartbeat configuration',
          'coordination with socketio-architect protocols',
        ],
      },
      {
        title: 'Media & Streaming UI',
        verb: 'Build',
        items: [
          'video player integration for livestream and OTT',
          'adaptive quality selection UI for poor networks',
          'picture-in-picture for live viewing',
          'gift animation overlay performance budgets',
          'camera/mic permission flows for go-live',
        ],
      },
      {
        title: 'Testing & Quality',
        verb: 'Validate',
        items: [
          'widget tests for critical user flows',
          'integration tests with mock API servers',
          'golden file tests for UI regression',
          'flutter analyze zero-warning policy',
          'device matrix testing on low-end Android',
        ],
      },
      {
        title: 'Build & Release Pipeline',
        verb: 'Automate',
        items: [
          'flavor configuration for dev/staging/prod',
          'code signing and Play Store release workflow',
          'app size optimization and split APK strategies',
          'crash reporting integration (Firebase Crashlytics)',
          'feature flag client SDK integration',
        ],
      },
      {
        title: 'Cross-App Shared Components',
        verb: 'Share',
        items: [
          'monorepo package extraction for shared UI',
          'auth flow widget shared across four apps',
          'profile avatar component standardization',
          'navigation shell pattern for multi-app ecosystem',
          'design-tokens-architect token sync workflow',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'social-feed-agent mobile feed requirements',
          'livestream-agent room UI specifications',
          'design-tokens-architect token updates',
          'api-contract-author client SDK alignment',
          'ADR for major Flutter architecture changes',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Ensure',
        items: [
          'ANR and crash rate monitoring thresholds',
          'startup time profiling on target devices',
          'network failure UX validation on simulated 2G',
          'accessibility audit with screen reader testing',
          'golden agent tests for navigation edge cases',
        ],
      },
    ],
  },

  executive: {
    basic: [
      {
        title: 'Platform Architecture Overview',
        verb: 'Understand',
        items: [
          'four-app ecosystem: Social, Livestream, Astro, Media (OTT)',
          'Phase-gated delivery: auth → contracts → realtime → profiles',
          'monorepo layout: apps/, services/, packages/, ai-agents/',
          'contract-first API design in packages/shared-contracts/',
          'shared governance in platform-governance/',
        ],
      },
      {
        title: 'Technology Stack Mastery',
        verb: 'Know',
        items: [
          'Flutter (Riverpod, GoRouter) for mobile clients',
          'NestJS microservices with PostgreSQL and Redis',
          'Socket.IO for realtime; Agora/Zego for live streaming',
          'AWS S3 + Cloudflare CDN for media delivery',
          'Firebase Auth for identity; AWS Secrets Manager for secrets',
        ],
      },
      {
        title: 'Engineering Principles',
        verb: 'Apply',
        items: [
          'no secrets in code — env vars and Secrets Manager only',
          'no duplicate services — check services/ before creating',
          'ADR required for architecture forks (docs/adr/)',
          'optimize for Indian market: low-end Android, poor connectivity',
          'smallest correct diff; phase-by-phase delivery',
        ],
      },
      {
        title: 'Ecosystem Coordination',
        verb: 'Coordinate',
        items: [
          'agent registry (ai-agents/AGENT-REGISTRY.md) for task routing',
          'orchestration via task-router and quality-gate agents',
          'cross-app identity and wallet shared services',
          'cost control rules for streaming and CDN spend',
          'i18n for 9+ Indian languages across all apps',
        ],
      },
      {
        title: 'Governance & Compliance',
        verb: 'Follow',
        items: [
          'MASTER-AI-OPERATING-SYSTEM.md as primary context doc',
          'platform-governance/security-rules.md for all decisions',
          'feature-approval-rules.md for new capability gates',
          'production-readiness-checklist before launch',
          'validate-agents.mjs after agent catalog changes',
        ],
      },
    ],
    advanced: [
      {
        title: 'Distributed Systems Skills',
        verb: 'Understand',
        items: [
          'CAP theorem trade-offs in multi-region deployment',
          'eventual consistency patterns for social feeds and wallets',
          'distributed locking with Redis for critical sections',
          'idempotency and exactly-once semantics for payments',
          'split-brain prevention in Redis cluster failover',
        ],
      },
      {
        title: 'Microservices Skills',
        verb: 'Design',
        items: [
          'bounded context mapping across 50+ NestJS services',
          'api-gateway as single entry point with JWT validation',
          'service mesh considerations for internal communication',
          'database-per-service vs shared schema decisions',
          'strangler fig migration for legacy module extraction',
        ],
      },
      {
        title: 'Event Streaming Skills',
        verb: 'Architect',
        items: [
          'Redis Streams and pub/sub for domain events',
          'event schema versioning in shared-contracts',
          'CQRS patterns for read-heavy social and livestream surfaces',
          'dead letter queues for failed event processing',
          'event replay for analytics and audit pipelines',
        ],
      },
      {
        title: 'Scalability Skills',
        verb: 'Plan',
        items: [
          'horizontal scaling for Socket.IO with Redis adapter',
          'CDN edge caching strategy for media and static assets',
          'feed fan-out optimization for viral content scenarios',
          'livestream viewer scaling with regional edge nodes',
          'auto-scaling policies for festival and IPL traffic peaks',
        ],
      },
      {
        title: 'AI Infrastructure Skills',
        verb: 'Leverage',
        items: [
          'Cursor agent orchestration for 774+ specialized agents',
          'LLM integration patterns for Astro consultations',
          'recommendation ML pipelines for feed and OTT',
          'AI cost control and token budget governance',
          'agent memory and context management strategies',
        ],
      },
      {
        title: 'Cloud Infrastructure Skills',
        verb: 'Operate',
        items: [
          'AWS EKS/Kubernetes deployment topology',
          'Cloudflare CDN, WAF, and DDoS protection layers',
          'multi-AZ PostgreSQL with read replicas',
          'Redis cluster for sessions, cache, and pub/sub',
          'S3 lifecycle policies and presigned URL security',
        ],
      },
      {
        title: 'Cost Optimization Skills',
        verb: 'Control',
        items: [
          'CDN egress cost monitoring and cache hit ratio targets',
          'Agora/Zego streaming minute budgets per creator tier',
          'right-sizing Kubernetes node pools by time of day',
          'reserved instance strategy for baseline workloads',
          'cost allocation tags per app and service',
        ],
      },
      {
        title: 'Monitoring & Observability Skills',
        verb: 'Instrument',
        items: [
          'OpenTelemetry distributed tracing across services',
          'SLO/SLI definitions for auth, feed, and livestream',
          'alerting tiers: P1 live outage vs P3 degradation',
          'dashboards for DAU, concurrent live rooms, and GMV',
          'post-incident review process and blameless culture',
        ],
      },
      {
        title: 'Security Architecture Skills',
        verb: 'Harden',
        items: [
          'zero-trust network policies for service communication',
          'JWT rotation, refresh token families, and session revocation',
          'PII encryption at rest and in transit',
          'penetration testing scope and remediation SLAs',
          'compliance readiness for Indian data localization',
        ],
      },
      {
        title: 'DevOps & Release Skills',
        verb: 'Automate',
        items: [
          'CI/CD pipelines with contract validation gates',
          'blue-green and canary deployment for zero-downtime',
          'database migration safety with rollback plans',
          'feature flags for gradual rollout across apps',
          'disaster recovery drills and RTO/RPO targets',
        ],
      },
      {
        title: 'Founder Communication Skills',
        verb: 'Communicate',
        items: [
          'translate technical trade-offs into business impact',
          'phase roadmap alignment with platform-vision.md',
          'weekly engineering velocity and blocker reports',
          'risk register for architecture decisions needing approval',
          'investor-ready technical narrative for the four-app ecosystem',
        ],
      },
    ],
  },

  ott: {
    basic: [
      {
        title: 'Content Catalog Management',
        verb: 'Design',
        items: [
          'movie, series, episode hierarchy with metadata schema',
          'regional content tagging for Indian language catalogs',
          'content rating and parental control classifications',
          'catalog search and filter API contracts',
          'CMS integration for content ingestion workflows',
        ],
      },
      {
        title: 'Video Playback & DRM',
        verb: 'Implement',
        items: [
          'adaptive bitrate streaming (HLS/DASH) for mobile',
          'Widevine/FairPlay DRM integration patterns',
          'video player widget for Flutter with quality selection',
          'subtitle and audio track selection (multi-language)',
          'continue-watching progress persistence',
        ],
      },
      {
        title: 'CDN & Transcoding Pipeline',
        verb: 'Wire',
        items: [
          'S3 ingest with Cloudflare CDN delivery',
          'transcoding pipeline for multiple quality renditions',
          'thumbnail and preview generation for catalog rows',
          'bandwidth-aware default quality for low-end devices',
          'offline download with encrypted local storage',
        ],
      },
      {
        title: 'Subscription & Billing',
        verb: 'Configure',
        items: [
          'subscription tier definitions and entitlement checks',
          'payment gateway integration for Indian UPI/cards',
          'free trial and promotional pricing flows',
          'geo-restriction and licensing window enforcement',
          'billing webhook handling and receipt validation',
        ],
      },
      {
        title: 'Recommendation & Discovery',
        verb: 'Build',
        items: [
          'homepage row composition (trending, continue, genre)',
          'personalized recommendation input from ML pipeline',
          'A/B testing hooks for row ordering experiments',
          'search integration with hybrid text + vector search',
          'kids mode with filtered catalog surface',
        ],
      },
    ],
    advanced: [
      {
        title: 'OTT Scaling Architecture',
        verb: 'Scale',
        items: [
          'CDN edge caching strategy for viral content spikes',
          'origin shield configuration for S3 egress cost control',
          'concurrent stream limit enforcement per subscription',
          'regional catalog replication for latency',
          'peak traffic planning for festival movie releases',
        ],
      },
      {
        title: 'Advanced DRM & Content Protection',
        verb: 'Protect',
        items: [
          'multi-DRM license server integration',
          'screen recording detection and blocking',
          'watermarking for premium content anti-piracy',
          'license renewal and offline playback expiry',
          'compliance with studio content protection requirements',
        ],
      },
      {
        title: 'Media Pipeline Operations',
        verb: 'Operate',
        items: [
          'automated transcoding queue with priority tiers',
          'quality assurance checks on transcoded outputs',
          'subtitle synchronization and format conversion',
          'content expiry and takedown workflows',
          'media asset cost tracking per title',
        ],
      },
      {
        title: 'Analytics & Engagement',
        verb: 'Track',
        items: [
          'watch time, completion rate, and drop-off analytics',
          'real-time trending computation for homepage rows',
          'churn prediction signals from viewing patterns',
          'A/B test result aggregation for UX experiments',
          'privacy-compliant viewing history for recommendations',
        ],
      },
      {
        title: 'Accessibility & Compliance',
        verb: 'Ensure',
        items: [
          'closed captions and audio descriptions for all content',
          'parental control PIN and age-gate enforcement',
          'regional content compliance (CBFC ratings)',
          'data localization for Indian user viewing history',
          'accessibility audit for video player controls',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'playback E2E tests across device matrix',
          'DRM license flow integration tests',
          'CDN cache hit ratio monitoring thresholds',
          'subscription entitlement enforcement tests',
          'golden agent tests for catalog edge cases',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'transcoding-pipeline-agent for media processing',
          'recommendation-row-agent for homepage composition',
          'drm-protection-agent for content security',
          'media-billing-agent for subscription flows',
          'ADR for streaming protocol or DRM provider changes',
        ],
      },
      {
        title: 'Cost & Performance Optimization',
        verb: 'Optimize',
        items: [
          'CDN egress cost dashboards and alerting',
          'transcoding cost per minute of content',
          'adaptive quality defaults to reduce bandwidth spend',
          'cold storage tiering for archival content',
          'right-sizing transcoding worker pools',
        ],
      },
    ],
  },

  astro: {
    basic: [
      {
        title: 'Astrology Content & Calculations',
        verb: 'Design',
        items: [
          'kundli chart generation with Vedic calculation engine',
          'daily horoscope content pipeline by zodiac sign',
          'panchang ( Hindu calendar ) data integration',
          'regional calendar variants for Indian festivals',
          'disclaimer and compliance text for all predictions',
        ],
      },
      {
        title: 'Consultation & Chat Flows',
        verb: 'Implement',
        items: [
          'live consultation booking with astrologer availability',
          'chat session lifecycle with message persistence',
          'payment integration for per-minute consultation billing',
          'astrologer onboarding and verification workflow',
          'session recording consent and privacy controls',
        ],
      },
      {
        title: 'Compatibility & Matchmaking',
        verb: 'Build',
        items: [
          'kundli matching algorithm with gun milan scoring',
          'compatibility report generation and PDF export',
          'partner profile input and validation flows',
          'remedy recommendation engine based on chart analysis',
          'regional language support for reports',
        ],
      },
      {
        title: 'Mobile UX for Astro App',
        verb: 'Guide',
        items: [
          'Flutter chart visualization with CustomPainter',
          'offline kundli viewing with cached calculations',
          'push notification for daily horoscope delivery',
          'low-bandwidth mode for chart image delivery',
          'accessibility for visually complex chart displays',
        ],
      },
      {
        title: 'Compliance & Trust',
        verb: 'Enforce',
        items: [
          'mandatory disclaimers on all astrological content',
          'content moderation for astrologer-generated advice',
          'payment refund policies for consultation disputes',
          'PII protection for birth date, time, and location data',
          'regional compliance for fortune-telling regulations',
        ],
      },
    ],
    advanced: [
      {
        title: 'Astrology Engine Architecture',
        verb: 'Architect',
        items: [
          'ephemeris data pipeline for accurate planetary positions',
          'calculation caching in Redis for repeated kundli requests',
          'A/B testing different calculation tradition variants',
          'batch horoscope generation for push notification scale',
          'ADR for third-party ephemeris library selection',
        ],
      },
      {
        title: 'Live Consultation at Scale',
        verb: 'Scale',
        items: [
          'astrologer queue management with wait time estimation',
          'video/audio consultation via Agora integration',
          'concurrent session limits per astrologer tier',
          'quality monitoring for consultation completion rates',
          'peak demand handling during festival periods',
        ],
      },
      {
        title: 'AI-Enhanced Astrology Features',
        verb: 'Leverage',
        items: [
          'LLM-assisted remedy recommendation with guardrails',
          'natural language chart interpretation generation',
          'chatbot triage before live astrologer handoff',
          'AI cost control for per-consultation LLM usage',
          'human review queue for AI-generated content',
        ],
      },
      {
        title: 'Monetization & Payments',
        verb: 'Optimize',
        items: [
          'per-minute billing with precise session timing',
          'wallet integration for consultation credits',
          'astrologer revenue share and payout scheduling',
          'promotional free consultation campaigns',
          'UPI-first payment flow for Indian users',
        ],
      },
      {
        title: 'Content Moderation & Safety',
        verb: 'Operate',
        items: [
          'astrologer advice audit sampling program',
          'user report and block flows for inappropriate guidance',
          'automated flagging for medical/financial advice violations',
          'astrologer rating and review integrity checks',
          'coordination with trust-safety-agent policies',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'kundli calculation accuracy regression tests',
          'consultation booking E2E flow tests',
          'payment and refund integration tests',
          'disclaimer display enforcement checks',
          'golden agent tests for chart edge cases',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'kundli-chart-agent for calculation engine specs',
          'live-consultation-agent for session management',
          'astro-payment-agent for billing integration',
          'astro-disclaimer-compliance for regulatory text',
          'profile-service for astrologer profile display',
        ],
      },
      {
        title: 'Observability & Operations',
        verb: 'Monitor',
        items: [
          'consultation completion rate dashboards',
          'kundli generation latency and error tracking',
          'astrologer utilization and queue depth metrics',
          'payment failure rate alerting',
          'runbooks for ephemeris data pipeline failures',
        ],
      },
    ],
  },

  ml: {
    basic: [
      {
        title: 'ML Pipeline Fundamentals',
        verb: 'Design',
        items: [
          'training data collection and labeling workflows',
          'feature store schema for reusable ML features',
          'model training pipeline with experiment tracking',
          'model versioning and artifact storage in S3',
          'offline evaluation metrics before deployment',
        ],
      },
      {
        title: 'Feature Engineering',
        verb: 'Build',
        items: [
          'user engagement feature extraction from event streams',
          'content embedding generation for similarity search',
          'temporal features for session and retention prediction',
          'feature freshness SLAs and backfill procedures',
          'PII-safe feature design with anonymization',
        ],
      },
      {
        title: 'Model Serving',
        verb: 'Deploy',
        items: [
          'inference API with p99 latency targets',
          'model A/B testing with traffic splitting',
          'fallback to heuristic ranking when model unavailable',
          'batch inference for nightly recommendation updates',
          'GPU vs CPU inference cost trade-off analysis',
        ],
      },
      {
        title: 'Vector Search Integration',
        verb: 'Wire',
        items: [
          'embedding storage in vector database (pgvector/Pinecone)',
          'similarity search API for content discovery',
          'hybrid search combining text and vector scores',
          'index rebuild and incremental update strategies',
          'embedding dimension and model selection rationale',
        ],
      },
      {
        title: 'ML Governance & Cost',
        verb: 'Control',
        items: [
          'AI usage rules from platform-governance/ai-usage-rules.md',
          'GPU cluster budget caps and utilization monitoring',
          'model bias auditing for recommendation fairness',
          'data retention policies for training datasets',
          'model rollback procedures for quality regressions',
        ],
      },
    ],
    advanced: [
      {
        title: 'Large-Scale Training Infrastructure',
        verb: 'Architect',
        items: [
          'distributed training on GPU clusters',
          'data pipeline orchestration with Airflow/Prefect',
          'training job scheduling and priority queues',
          'checkpoint management and resume from failure',
          'multi-region training data replication',
        ],
      },
      {
        title: 'Real-Time Inference Optimization',
        verb: 'Optimize',
        items: [
          'model quantization for edge deployment',
          'inference batching for throughput optimization',
          'caching frequent prediction requests in Redis',
          'autoscaling inference pods based on QPS',
          'latency profiling and bottleneck identification',
        ],
      },
      {
        title: 'Recommendation System Architecture',
        verb: 'Build',
        items: [
          'two-tower model for candidate retrieval',
          'ranking model with multi-objective optimization',
          'exploration/exploitation balance (multi-armed bandit)',
          'cold-start handling for new users and content',
          'real-time feature updates from event streams',
        ],
      },
      {
        title: 'MLOps & Model Lifecycle',
        verb: 'Operate',
        items: [
          'CI/CD for model training and deployment pipelines',
          'automated model performance monitoring in production',
          'data drift detection and retraining triggers',
          'model registry with lineage tracking',
          'canary deployment for model version rollouts',
        ],
      },
      {
        title: 'LLM Integration Patterns',
        verb: 'Integrate',
        items: [
          'RAG pipeline for Astro consultation knowledge base',
          'prompt engineering with guardrails and output filtering',
          'LLM cost tracking per feature and user tier',
          'fallback chains for LLM provider outages',
          'human-in-the-loop review for high-stakes outputs',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'offline/online metric parity checks',
          'A/B test statistical significance frameworks',
          'model fairness audits across demographic segments',
          'load testing inference endpoints at peak traffic',
          'golden agent tests for ML pipeline edge cases',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'feature-engineering-agent for feature store specs',
          'embedding-agent for vector generation pipelines',
          'model-serving-agent for deployment topology',
          'feed-ranking-agent for recommendation integration',
          'ADR for ML architecture and model selection decisions',
        ],
      },
      {
        title: 'Cost & Resource Management',
        verb: 'Manage',
        items: [
          'GPU utilization dashboards and right-sizing',
          'spot instance strategy for batch training jobs',
          'inference cost per prediction tracking',
          'training data storage lifecycle policies',
          'budget alerts for runaway training experiments',
        ],
      },
    ],
  },

  security: {
    basic: [
      {
        title: 'Security Fundamentals',
        verb: 'Apply',
        items: [
          'platform-governance/security-rules.md as baseline',
          'defense in depth across network, app, and data layers',
          'least privilege access for services and agents',
          'secrets management via AWS Secrets Manager only',
          'security review gate for all new API endpoints',
        ],
      },
      {
        title: 'Authentication & Authorization',
        verb: 'Harden',
        items: [
          'JWT validation and token lifecycle management',
          'RBAC and ABAC policy enforcement patterns',
          'API key rotation and scope limitation',
          'multi-factor authentication for admin surfaces',
          'session fixation and CSRF prevention',
        ],
      },
      {
        title: 'Network & API Security',
        verb: 'Protect',
        items: [
          'WAF rules via Cloudflare for common attack vectors',
          'rate limiting and DDoS mitigation strategies',
          'input validation and output encoding standards',
          'CORS and CSP header configuration',
          'TLS 1.3 enforcement and certificate management',
        ],
      },
      {
        title: 'Data Protection',
        verb: 'Encrypt',
        items: [
          'PII encryption at rest (AES-256) and in transit (TLS)',
          'data masking in logs and analytics pipelines',
          'secure deletion and data retention policies',
          'Indian data localization compliance requirements',
          'key rotation schedules and HSM integration prep',
        ],
      },
      {
        title: 'Threat Detection & Response',
        verb: 'Monitor',
        items: [
          'SIEM integration for security event correlation',
          'anomaly detection on auth and payment flows',
          'vulnerability scanning in CI pipeline',
          'incident severity classification and escalation',
          'security runbooks for common attack scenarios',
        ],
      },
    ],
    advanced: [
      {
        title: 'Zero Trust Architecture',
        verb: 'Implement',
        items: [
          'micro-segmentation for service-to-service communication',
          'mTLS between internal microservices',
          'identity-aware proxy for admin and internal tools',
          'continuous verification instead of perimeter trust',
          'device trust scoring for mobile client access',
        ],
      },
      {
        title: 'Advanced Threat Protection',
        verb: 'Defend',
        items: [
          'bot detection and mitigation (CAPTCHA, behavioral analysis)',
          'credential stuffing detection and account lockout',
          'API abuse pattern recognition and auto-blocking',
          'supply chain security for npm/Dart dependencies',
          'red team exercise scope and remediation tracking',
        ],
      },
      {
        title: 'Penetration Testing & Auditing',
        verb: 'Audit',
        items: [
          'annual penetration test scope definition',
          'OWASP Top 10 remediation tracking',
          'security code review checklist for PRs',
          'bug bounty program structure and triage',
          'compliance audit preparation (SOC 2, ISO 27001 prep)',
        ],
      },
      {
        title: 'Encryption & Key Management',
        verb: 'Manage',
        items: [
          'envelope encryption for database PII fields',
          'KMS key hierarchy and rotation automation',
          'HSM integration for payment and DRM keys',
          'secure key escrow for disaster recovery',
          'crypto agility plan for algorithm upgrades',
        ],
      },
      {
        title: 'Incident Response Operations',
        verb: 'Respond',
        items: [
          'security incident classification (P1 breach vs P3 scan)',
          'forensic data preservation procedures',
          'breach notification timelines and legal coordination',
          'post-incident root cause analysis template',
          'tabletop exercise schedule for security scenarios',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'automated security scanning in CI/CD pipeline',
          'dependency vulnerability SLA for critical CVEs',
          'security regression tests for auth flows',
          'WAF rule effectiveness testing',
          'golden agent tests for security edge cases',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'auth-service-agent for token security alignment',
          'api-security-agent for endpoint protection',
          'credential-security-agent for secrets management',
          'ddos-protection-agent for traffic mitigation',
          'ADR for security architecture decisions',
        ],
      },
      {
        title: 'Compliance & Governance',
        verb: 'Ensure',
        items: [
          'Indian IT Act and data protection compliance mapping',
          'content moderation legal requirements per app',
          'payment PCI-DSS scope minimization',
          'privacy impact assessments for new features',
          'security training requirements for engineering team',
        ],
      },
    ],
  },

  phase1: {
    basic: [
      {
        title: 'Phase 1 Foundation Setup',
        verb: 'Bootstrap',
        items: [
          'Docker Postgres and Redis via setup-phase1.ps1',
          'NestJS service scaffolds in services/',
          'api-gateway on port 3000 as single entry point',
          'auth-service (3001) and user-service (3002) boot order',
          'environment templates without secrets in repo',
        ],
      },
      {
        title: 'Contract-First Development',
        verb: 'Define',
        items: [
          'OpenAPI specs in packages/shared-contracts before code',
          'shared-types generation from contract schemas',
          'breaking change detection in CI validation',
          'api-contract-author review for new endpoints',
          'gateway proxy rules aligned with contract paths',
        ],
      },
      {
        title: 'Auth & Identity Foundation',
        verb: 'Implement',
        items: [
          'Firebase Auth bridge with OTP login flow',
          'JWT issuance and Redis session management',
          'api-gateway JWT validation middleware',
          'user profile linkage via JWT sub claim',
          'rate limiting on authentication endpoints',
        ],
      },
      {
        title: 'Local Dev & Validation',
        verb: 'Run',
        items: [
          'setup-phase1.ps1 for Windows Docker bootstrap',
          'smoke tests for gateway health and auth flow',
          'validate-agents.mjs after agent catalog changes',
          'phase1:complete npm script for full validation gate',
          'handoff documentation for Phase 2 agents',
        ],
      },
      {
        title: 'Governance Compliance',
        verb: 'Follow',
        items: [
          'MASTER-AI-OPERATING-SYSTEM.md as primary context',
          'platform-governance/engineering-rules.md standards',
          'no duplicate services — check services/ first',
          'ADR for any Phase 1 architecture deviations',
          'smallest correct diff for all Phase 1 changes',
        ],
      },
    ],
    advanced: [
      {
        title: 'Phase 1 Autonomous Completion',
        verb: 'Orchestrate',
        items: [
          'full phase1:complete validation loop with fix-and-retry',
          'Docker ensure scripts for Postgres/Redis health',
          'multi-service smoke test orchestration',
          'lint and test gap remediation across services',
          'documentation sync after autonomous completion',
        ],
      },
      {
        title: 'Gateway Architecture',
        verb: 'Architect',
        items: [
          'reverse proxy routing to auth, user, and future services',
          'JWT validation cache with JWKS rotation support',
          'request-id propagation and distributed tracing headers',
          'rate limiting tiers by route sensitivity',
          'health check aggregation for kubernetes readiness',
        ],
      },
      {
        title: 'Service Bootstrap Patterns',
        verb: 'Standardize',
        items: [
          'NestJS module template from nestjs-architect',
          'shared health, logging, and metrics modules',
          'database migration workflow with TypeORM/Prisma',
          'Redis connection pooling and retry configuration',
          'inter-service communication matrix documentation',
        ],
      },
      {
        title: 'Remediation & Recovery',
        verb: 'Remediate',
        items: [
          'systematic diagnosis of Phase 1 validation failures',
          'Windows-safe PowerShell scripts for all fix operations',
          'CI alignment after local fix verification',
          'rollback procedures for failed migrations',
          'escalation paths for blockers requiring ADR',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'auth-service-agent and profile-service-agent handoffs',
          'api-gateway-bootstrap-agent route registration',
          'nestjs-architect module template alignment',
          'local-dev-bootstrap-agent environment setup',
          'quality-gate validation before Phase 2 entry',
        ],
      },
      {
        title: 'Production Readiness Prep',
        verb: 'Prepare',
        items: [
          'production-readiness-checklist gap analysis',
          'secrets management migration plan from env to AWS',
          'monitoring and alerting stub configuration',
          'database backup and recovery procedure documentation',
          'Phase 2 entry criteria verification',
        ],
      },
      {
        title: 'Testing & Quality Gates',
        verb: 'Validate',
        items: [
          'integration smoke tests for auth → profile flow',
          'contract validation against OpenAPI specs',
          'golden agent tests for Phase 1 agents',
          'CI pipeline alignment with local validation scripts',
          'test coverage thresholds for critical paths',
        ],
      },
      {
        title: 'Documentation & Handoff',
        verb: 'Document',
        items: [
          'Phase 1 completion report with PASS/FAIL status',
          'service port and endpoint reference card',
          'environment variable documentation (templates only)',
          'Phase 2 agent activation checklist',
          'known limitations and technical debt register',
        ],
      },
    ],
  },

  meta: {
    basic: [
      {
        title: 'Local Development Bootstrap',
        verb: 'Setup',
        items: [
          'Docker Desktop verification and container health',
          'Node.js and npm workspace dependency installation',
          'PostgreSQL and Redis container startup scripts',
          'environment file templates from .env.example',
          'Windows PowerShell script compatibility',
        ],
      },
      {
        title: 'Daily Dev Workflow',
        verb: 'Run',
        items: [
          'daily-dev-start-agent morning bootstrap checklist',
          'service health check before feature work',
          'git branch hygiene and PR preparation',
          'validate-agents.mjs before agent catalog edits',
          'smoke test after infrastructure changes',
        ],
      },
      {
        title: 'Agent Catalog Management',
        verb: 'Maintain',
        items: [
          'AGENT-REGISTRY.md accuracy and completeness',
          'agent file structure compliance validation',
          'skill file generation and validation workflows',
          'golden agent test suite maintenance',
          'agent onboarding documentation updates',
        ],
      },
      {
        title: 'Validation & Quality',
        verb: 'Execute',
        items: [
          'node scripts/validate-agents.mjs for catalog health',
          'node scripts/validate-agent-skills.mjs for skill pairs',
          'node scripts/test-golden-agents.mjs for regression',
          'pre-commit hook alignment with validation scripts',
          'CI pipeline validation gate verification',
        ],
      },
      {
        title: 'Environment & Tooling',
        verb: 'Configure',
        items: [
          'D: drive dev bootstrap for disk space management',
          'Flutter SDK path configuration for Phase 2a',
          'Cursor IDE rules and skills directory structure',
          'MCP server configuration for external tools',
          'monorepo npm workspace script discovery',
        ],
      },
    ],
    advanced: [
      {
        title: 'Autonomous Bootstrap Orchestration',
        verb: 'Orchestrate',
        items: [
          'full environment bootstrap with fix-and-retry loops',
          'multi-phase validation (Phase 1 → 2a → 2) sequencing',
          'dependency conflict resolution across workspaces',
          'Docker resource allocation optimization for Windows',
          'bootstrap failure diagnosis and automated remediation',
        ],
      },
      {
        title: 'Agent Ecosystem Governance',
        verb: 'Govern',
        items: [
          '774+ agent catalog integrity audits',
          'agent-skill-validator-agent quality gate enforcement',
          'boilerplate detection and enrichment workflows',
          'agent coverage analysis across platform domains',
          'registry sync after bulk agent generation',
        ],
      },
      {
        title: 'CI/CD Pipeline Alignment',
        verb: 'Align',
        items: [
          'local validation script parity with CI checks',
          'GitHub Actions workflow debugging and fixes',
          'pre-commit hook configuration and testing',
          'validation script performance optimization',
          'CI failure triage and remediation playbooks',
        ],
      },
      {
        title: 'Developer Experience Optimization',
        verb: 'Improve',
        items: [
          'setup script idempotency and re-run safety',
          'error message clarity for common bootstrap failures',
          'documentation sync after script changes',
          'onboarding time measurement and reduction',
          'developer feedback collection and prioritization',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'phase-1-autonomous-completion-agent handoffs',
          'local-dev-bootstrap-agent environment prerequisites',
          'agent-registry-auditor-agent catalog health checks',
          'quality-gate validation before feature work',
          'ADR for dev tooling architecture changes',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'bootstrap script E2E tests on clean Windows VM',
          'validation script regression test suite',
          'golden agent test coverage for meta agents',
          'CI pipeline green status verification',
          'documentation accuracy audits',
        ],
      },
      {
        title: 'Monitoring & Diagnostics',
        verb: 'Monitor',
        items: [
          'bootstrap success rate tracking across team',
          'common failure pattern analysis and fixes',
          'Docker resource usage monitoring on dev machines',
          'validation script execution time profiling',
          'runbooks for dev environment recovery',
        ],
      },
      {
        title: 'Security & Compliance',
        verb: 'Ensure',
        items: [
          'no secrets in setup scripts or .env.example',
          'Docker image vulnerability scanning',
          'dependency audit automation in CI',
          'dev environment isolation from production credentials',
          'secure defaults in all bootstrap configurations',
        ],
      },
    ],
  },

  default: {
    basic: [
      {
        title: 'Domain Expertise',
        verb: 'Apply',
        items: [
          'deep understanding of assigned domain responsibilities',
          'platform-governance standards for all outputs',
          'contract-first design in packages/shared-contracts/',
          'coordination with dependent agents listed in agent file',
          'optimization for Indian market constraints',
        ],
      },
      {
        title: 'Implementation Standards',
        verb: 'Follow',
        items: [
          'smallest correct diff for all changes',
          'existing codebase conventions in apps/, services/, packages/',
          'no duplicate services — check services/ first',
          'no secrets in code — env vars and Secrets Manager only',
          'English in code; user strings via i18n ARB files',
        ],
      },
      {
        title: 'Technical Execution',
        verb: 'Execute',
        items: [
          'NestJS backend patterns for service implementations',
          'Flutter/Riverpod patterns for mobile UI work',
          'PostgreSQL schema design with migration safety',
          'Redis caching and pub/sub where appropriate',
          'Socket.IO realtime integration when required',
        ],
      },
      {
        title: 'Quality & Validation',
        verb: 'Validate',
        items: [
          'node scripts/validate-agents.mjs after agent edits',
          'contract validation against OpenAPI specs',
          'integration tests for critical paths',
          'low-end Android performance verification',
          'documentation of decisions and handoff artifacts',
        ],
      },
      {
        title: 'Governance & Handoff',
        verb: 'Document',
        items: [
          'MASTER-AI-OPERATING-SYSTEM.md as primary context',
          'governance references listed in agent file',
          'integration notes for downstream agents',
          'test strategy and acceptance criteria',
          'escalation paths for out-of-scope decisions',
        ],
      },
    ],
    advanced: [
      {
        title: 'Advanced Architecture',
        verb: 'Architect',
        items: [
          'cross-service integration design and dependency mapping',
          'scalability planning for peak Indian traffic patterns',
          'event-driven patterns with Redis Streams and pub/sub',
          'caching strategy with invalidation policies',
          'ADR drafts via docs/adr/SH-000-template.md for forks',
        ],
      },
      {
        title: 'Production Readiness',
        verb: 'Ensure',
        items: [
          'production-readiness-checklist alignment',
          'monitoring and alerting stub configuration',
          'graceful degradation for poor connectivity scenarios',
          'rollback procedures for failed deployments',
          'incident runbooks for domain-specific failures',
        ],
      },
      {
        title: 'Performance & Scalability',
        verb: 'Optimize',
        items: [
          'load testing methodology for domain endpoints',
          'database query optimization and index strategy',
          'CDN and caching for media-heavy features',
          'horizontal scaling patterns for stateless services',
          'cost control per platform-governance/cost-control-rules.md',
        ],
      },
      {
        title: 'Security & Compliance',
        verb: 'Harden',
        items: [
          'platform-governance/security-rules.md compliance',
          'input validation and authorization on all endpoints',
          'PII handling and data retention policies',
          'audit logging for sensitive operations',
          'security review for new external integrations',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'task-router.md for cross-domain task delegation',
          'quality-gate.md validation before merge',
          'dependency agent handoffs documented in agent file',
          'cross-check shared-contracts before API changes',
          'enrich boilerplate Responsibilities to quality bar',
        ],
      },
      {
        title: 'Testing & Quality Gates',
        verb: 'Validate',
        items: [
          'golden agent tests via test-golden-agents.mjs',
          'contract tests against OpenAPI specifications',
          'integration smoke tests for service interactions',
          'CI pipeline alignment with local validation',
          'regression test suite for domain edge cases',
        ],
      },
      {
        title: 'Observability & Operations',
        verb: 'Monitor',
        items: [
          'structured logging with correlation IDs',
          'metrics endpoints for key domain operations',
          'alerting thresholds for error rate and latency',
          'dashboard requirements for domain KPIs',
          'post-incident review template for domain outages',
        ],
      },
      {
        title: 'Cross-App Integration',
        verb: 'Integrate',
        items: [
          'four-app ecosystem alignment (Social, Livestream, Astro, OTT)',
          'shared identity and wallet service consumption',
          'cross-app notification and deep link patterns',
          'consistent UX via design-system tokens',
          'i18n support for 9+ Indian languages',
        ],
      },
    ],
  },
};

export const DOMAIN_TEMPLATES = { ...BASE_DOMAIN_TEMPLATES, ...EXTRA_DOMAIN_TEMPLATES };

/** Path-prefix → template key (first match wins). */
const PATH_TEMPLATE_MAP = [
  ['ai-agents/growth-ai/', 'growth'],
  ['ai-agents/store-growth/', 'growth'],
  ['ai-agents/gift-effects/', 'gifts'],
  ['ai-agents/cosmetics/', 'gifts'],
  ['ai-agents/ad-network/', 'ads'],
  ['ai-agents/core-engineering/database/', 'redis'],
  ['ai-agents/economy/', 'payments'],
  ['ai-agents/creator-economy/', 'payments'],
  ['ai-agents/platform-finance/', 'payments'],
  ['ai-agents/governance/', 'governance'],
  ['ai-agents/community-governance/', 'governance'],
  ['ai-agents/orchestration/', 'orchestration'],
  ['ai-agents/master-brain/', 'orchestration'],
  ['ai-agents/founder-war-room/', 'executive'],
  ['ai-agents/testing/', 'testing'],
  ['ai-agents/user-experience-intelligence/', 'ux'],
  ['ai-agents/product-labs/', 'ux'],
  ['ai-agents/safety/', 'safety'],
  ['ai-agents/incident-command/', 'orchestration'],
  ['ai-agents/media-pipeline/', 'media'],
  ['ai-agents/search-infrastructure/', 'search'],
  ['ai-agents/web3/', 'payments'],
  ['ai-agents/internationalization/', 'ux'],
  ['ai-agents/support-ecosystem/', 'meta'],
  ['ai-agents/design-system/', 'flutter'],
  ['ai-agents/core-engineering/reliability/', 'infrastructure'],
  ['ai-agents/core-engineering/infrastructure/', 'infrastructure'],
  ['ai-agents/event-system/', 'realtime'],
  ['ai-agents/agent-memory/', 'meta'],
  ['ai-agents/platform-knowledge/', 'meta'],
  ['ai-agents/data-science/', 'ml'],
  ['ai-agents/ml-platform/', 'ml'],
  ['ai-agents/enterprise-security/', 'security'],
  ['ai-agents/phase-1/', 'phase1'],
  ['ai-agents/phase-2/', 'phase1'],
  ['ai-agents/phase-2a/', 'phase1'],
  ['ai-agents/executive/', 'executive'],
  ['ai-agents/games/', 'games'],
  ['ai-agents/meta/', 'meta'],
  ['apps/livestream-app/', 'livestream'],
  ['apps/social-app/', 'social'],
  ['apps/astro-app/', 'astro'],
  ['apps/media-app/', 'ott'],
  ['ai-agents/core-engineering/backend/', 'nestjs'],
  ['ai-agents/core-engineering/frontend/', 'flutter'],
  ['ai-agents/core-engineering/realtime/', 'realtime'],
];

/**
 * Resolve domain template key from agent metadata and file path.
 * @param {string} agentPath - repo-relative agent file path
 * @param {string} domainField - Domain from ## Execution Context
 * @param {string} role - ## Role text
 * @param {string} slug - agent slug
 */
export function resolveTemplateKey(agentPath, domainField, role, slug) {
  const pathLower = agentPath.toLowerCase().replace(/\\/g, '/');
  const domainLower = (domainField || '').toLowerCase();
  const roleLower = (role || '').toLowerCase();
  const slugLower = slug.toLowerCase();

  // Slug-specific overrides (highest priority)
  if (slugLower.includes('cto') || slugLower.includes('chief-architect')) return 'executive';
  if (slugLower.includes('auth') || slugLower.includes('otp') || slugLower.includes('jwt')) return 'auth';
  if (slugLower.includes('profile') || slugLower.includes('user-service') || slugLower.includes('avatar')) return 'profile';
  if (slugLower.includes('redis') || slugLower.includes('cache')) return 'redis';
  if (slugLower.includes('socket') || slugLower.includes('websocket')) return 'realtime';
  if (slugLower.includes('nestjs') || slugLower.includes('api-gateway') || slugLower.includes('api-contract')) return 'nestjs';
  if (slugLower.includes('flutter') || slugLower.includes('mobile-shell')) return 'flutter';
  if (slugLower.includes('kubernetes') || slugLower.includes('k8s') || slugLower.includes('terraform')) return 'infrastructure';
  if (slugLower.includes('incident') || slugLower.includes('on-call') || slugLower.includes('runbook')) return 'orchestration';
  if (slugLower.includes('wallet') || slugLower.includes('payout') || slugLower.includes('payment') || slugLower.includes('billing')) return 'payments';
  if (slugLower.includes('gift') || slugLower.includes('particle') || slugLower.includes('shader') || slugLower.includes('lottie')) return 'gifts';
  if (slugLower.includes('moderation') || slugLower.includes('trust') || slugLower.includes('fraud') || slugLower.includes('safety')) return 'safety';
  if (slugLower.includes('search') || slugLower.includes('elasticsearch') || slugLower.includes('indexing')) return 'search';
  if (slugLower.includes('transcod') || slugLower.includes('cdn') || slugLower.includes('thumbnail')) return 'media';
  if (slugLower.includes('governance') || slugLower.includes('compliance') || slugLower.includes('adr')) return 'governance';
  if (slugLower.includes('ludo') || slugLower.includes('rummy') || slugLower.includes('carrom') || slugLower.includes('teen-patti')) return 'games';

  // Path-prefix map
  for (const [prefix, key] of PATH_TEMPLATE_MAP) {
    if (pathLower.startsWith(prefix)) return key;
  }

  // Role-based fallbacks
  if (roleLower.includes('livestream') || roleLower.includes('live room') || roleLower.includes('go-live')) return 'livestream';
  if (roleLower.includes('feed') || roleLower.includes('social')) return 'social';
  if (domainLower.includes('identity')) return 'auth';
  if (domainLower.includes('livestream')) return 'livestream';
  if (domainLower.includes('social')) return 'social';
  if (domainLower.includes('astro')) return 'astro';
  if (domainLower.includes('ott') || domainLower.includes('media')) return 'ott';

  return 'default';
}

/**
 * Customize sections with agent-specific content from responsibilities.
 * @param {CompetencySection[]} sections
 * @param {string[]} responsibilities
 * @param {string} displayName
 */
export function customizeSections(sections, responsibilities, displayName) {
  const respItems = responsibilities.slice(0, 3).map((r) => {
    const cleaned = r.replace(/^-\s*/, '').trim();
    return cleaned.endsWith('.') ? cleaned : `${cleaned}.`;
  });

  return sections.map((section, idx) => {
    const items = [...section.items];
    if (idx === 0 && respItems.length > 0) {
      // Inject first responsibility into first section
      items.unshift(`${respItems[0]} (${displayName} scope)`);
    }
    if (idx === 1 && respItems.length > 1) {
      items.push(respItems[1]);
    }
    if (idx === 2 && respItems.length > 2) {
      items.push(respItems[2]);
    }
    return { ...section, items: items.slice(0, 7) };
  });
}

export function getTemplate(templateKey, tier) {
  const tpl = DOMAIN_TEMPLATES[templateKey] || DOMAIN_TEMPLATES.default;
  return tpl[tier] || DOMAIN_TEMPLATES.default[tier];
}
