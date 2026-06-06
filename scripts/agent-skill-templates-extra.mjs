/**
 * Extended domain-specific competency templates for agent skill generation.
 * Imported and merged into DOMAIN_TEMPLATES by agent-skill-templates.mjs.
 */

/** @typedef {{ title: string; verb: string; items: string[] }} CompetencySection */

/** @type {Record<string, { basic: CompetencySection[]; advanced: CompetencySection[] }>} */
export const EXTRA_DOMAIN_TEMPLATES = {
  growth: {
    basic: [
      {
        title: 'Growth Experimentation',
        verb: 'Design',
        items: [
          'hypothesis-driven A/B tests with clear primary metrics',
          'cohort segmentation by region, device tier, and acquisition channel',
          'experiment guardrails to protect core retention and revenue',
          'statistical significance thresholds before shipping winners',
          'feature flag rollout for gradual exposure in production',
        ],
      },
      {
        title: 'Viral & Referral Mechanics',
        verb: 'Build',
        items: [
          'referral deep links with attribution and fraud checks',
          'invite rewards balanced against wallet ledger integrity',
          'share-to-earn flows for WhatsApp and Instagram Stories',
          'viral loop instrumentation: K-factor, cycle time, activation',
          'regional campaign hooks for festivals and IPL seasons',
        ],
      },
      {
        title: 'Retention & Engagement Analytics',
        verb: 'Measure',
        items: [
          'D1/D7/D30 retention funnels per app surface',
          'session depth, scroll velocity, and rewatch signals',
          'churn prediction features in growth feature store',
          'notification fatigue monitoring and send caps',
          'real-time dashboards for experiment readouts',
        ],
      },
      {
        title: 'Personalization & Discovery',
        verb: 'Tune',
        items: [
          'interest graph updates from implicit engagement signals',
          'cold-start onboarding content seeding per locale',
          'cross-app promotion without cannibalizing core loops',
          'search and feed ranking feedback loops',
          'low-bandwidth discovery UX for 2G/3G users',
        ],
      },
      {
        title: 'Governance & Compliance',
        verb: 'Follow',
        items: [
          'platform-governance/feature-approval-rules.md for growth launches',
          'no dark patterns — transparent opt-in for incentives',
          'PII minimization in growth analytics pipelines',
          'contract-first event schemas in packages/shared-contracts/',
          'handoff to growth-compliance-agent for policy review',
        ],
      },
    ],
    advanced: [
      {
        title: 'Growth ML & Feature Store',
        verb: 'Operate',
        items: [
          'online/offline feature parity for ranking models',
          'real-time inference budgets and fallback heuristics',
          'model monitoring for drift on regional cohorts',
          'shadow mode deployments before traffic allocation',
          'GPU cost caps with distillation for lightweight models',
        ],
      },
      {
        title: 'Attribution & Measurement',
        verb: 'Instrument',
        items: [
          'multi-touch attribution across paid, organic, and referral',
          'SKAN/GA4/AppsFlyer alignment for mobile install tracking',
          'incrementality tests for paid acquisition channels',
          'LTV/CAC modeling by creator vs viewer segments',
          'fraud-adjusted conversion reporting',
        ],
      },
      {
        title: 'Campaign Operations at Scale',
        verb: 'Run',
        items: [
          'regional campaign playbooks for tier-2/3 Indian cities',
          'creator recruitment pipelines with quality scoring',
          'festive burst capacity planning for SMS and push',
          'budget allocation agents integrated with finance ledger',
          'rollback plans for campaigns hurting retention',
        ],
      },
      {
        title: 'Cross-App Growth Loops',
        verb: 'Connect',
        items: [
          'Social → Livestream creator activation journeys',
          'Astro consultation upsell from social engagement',
          'OTT watch-party hooks from livestream events',
          'unified wallet incentives across four apps',
          'deep link routing through api-gateway and mobile shell',
        ],
      },
      {
        title: 'Notification & Re-engagement',
        verb: 'Optimize',
        items: [
          'send-time optimization by timezone and habit windows',
          'winback sequences with channel preference learning',
          'push/email/SMS orchestration without duplicate touches',
          'silent hours and DND compliance for Indian users',
          'fatigue detection with automatic throttle policies',
        ],
      },
      {
        title: 'Search & Ranking Growth',
        verb: 'Improve',
        items: [
          'semantic search embeddings for content discovery',
          'query understanding for Hinglish and regional scripts',
          'trend detection pipelines for homepage surfacing',
          'negative feedback loops to demote low-quality content',
          'cache warming for trending queries during events',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'experiment pre-flight checks in staging cohorts',
          'guardrail metric alerts during live experiments',
          'golden tests for referral and deep link edge cases',
          'load tests for campaign landing spikes',
          'post-experiment decision memos with rollback criteria',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'handoffs to analytics-agent and data-pipeline-agent',
          'wallet-ledger-agent for incentive payouts',
          'notification agents for campaign delivery',
          'quality-gate before production experiment allocation',
          'ADR for new growth infrastructure forks',
        ],
      },
    ],
  },

  gifts: {
    basic: [
      {
        title: 'Gift Animation Pipeline',
        verb: 'Build',
        items: [
          'Lottie, Rive, and GPU shader effect selection per gift tier',
          'gift queue prioritization by coin value and sender VIP status',
          'synchronized playback across host and viewer clients',
          'fallback static badges on low-end Android devices',
          'effect preload and memory budgets per live room',
        ],
      },
      {
        title: 'Realtime Gift Events',
        verb: 'Emit',
        items: [
          'Socket.IO gift events with idempotent delivery IDs',
          'combo streak and multiplier state in Redis',
          'host overlay vs chat feed rendering separation',
          'rate limits on gift spam and duplicate animations',
          'contract schemas in packages/shared-contracts/livestream/',
        ],
      },
      {
        title: 'Gift Economy Integration',
        verb: 'Wire',
        items: [
          'wallet debit with optimistic UI and server reconciliation',
          'creator revenue share and platform rake configuration',
          'insufficient balance UX with top-up deep links',
          'gift catalog versioning and regional pricing',
          'audit trail for disputed gift transactions',
        ],
      },
      {
        title: 'Rendering Performance',
        verb: 'Optimize',
        items: [
          'particle system caps to prevent GPU thermal throttling',
          'shader compilation warmup on room join',
          'animation LOD by device tier and battery state',
          'batch rendering for simultaneous multi-gifter storms',
          'frame drop telemetry for effect quality tuning',
        ],
      },
      {
        title: 'FX & Overlay UX',
        verb: 'Design',
        items: [
          'fullscreen overlays that do not block host interaction',
          'emoji burst and heart rain without chat obscuring',
          'sticker effects aligned with design-system tokens',
          'accessibility: reduced motion mode respects system settings',
          'moderation hooks for offensive custom gift messages',
        ],
      },
    ],
    advanced: [
      {
        title: 'GPU & Shader Architecture',
        verb: 'Architect',
        items: [
          'Metal/Vulkan/OpenGL ES fallback matrix for Flutter',
          'custom shader hot-reload pipeline for artists',
          'GPU memory pools shared across concurrent effects',
          'thermal-aware effect degradation policies',
          'profiling harness for Mali/Adreno GPU families',
        ],
      },
      {
        title: 'Gift Storm Scale',
        verb: 'Scale',
        items: [
          '10k+ gifts/minute fan-out with Redis Streams',
          'priority queue coalescing for identical low-tier gifts',
          'CDN edge caching for popular Lottie assets',
          'regional effect servers for IPL and festival peaks',
          'chaos tests for gift queue backlog recovery',
        ],
      },
      {
        title: 'Economy & Fraud Controls',
        verb: 'Protect',
        items: [
          'velocity limits on high-value gift bursts',
          'collusion detection for wash trading patterns',
          'chargeback handling integrated with wallet ledger',
          'promotional gift credit expiration policies',
          'tax and payout reporting for creator earnings',
        ],
      },
      {
        title: 'Cross-Platform Effect Parity',
        verb: 'Align',
        items: [
          'iOS/Android/Web effect fidelity acceptance criteria',
          'authoring toolchain for designers (After Effects → Lottie)',
          'A/B effect variants without client rebuilds',
          'versioned effect bundles with graceful downgrade',
          'cosmetics-agent coordination for avatar-linked gifts',
        ],
      },
      {
        title: 'Live Room Integration',
        verb: 'Integrate',
        items: [
          'PK battle gift multipliers and team scoring',
          'co-host gift split rules and display priority',
          'moderator mute of disruptive effect classes',
          'replay timeline gift markers for VOD',
          'Agora/Zego metadata channel for effect sync',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'synthetic gift load tests per device tier',
          'p99 effect start latency SLO dashboards',
          'golden tests for combo and multiplier edge cases',
          'crash-free sessions metric during effect peaks',
          'incident runbooks for stuck gift queues',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'livestream-agent for room lifecycle contracts',
          'wallet-ledger-agent for debit/credit flows',
          'socketio-architect for event protocol versioning',
          'flutter-architect for overlay widget patterns',
          'ADR for new rendering engine adoption',
        ],
      },
      {
        title: 'Creator Monetization UX',
        verb: 'Enhance',
        items: [
          'gift goal progress widgets for hosts',
          'leaderboard snippets during PK rounds',
          'thank-you automation without spamming chat',
          'VIP badge tiers tied to cumulative gifting',
          'regional gift cultural localization (festivals, symbols)',
        ],
      },
    ],
  },

  ads: {
    basic: [
      {
        title: 'Ad Serving Architecture',
        verb: 'Design',
        items: [
          'server-side ad decisioning with sub-100ms p95 latency',
          'placement taxonomy: feed, preroll, midroll, live overlay',
          'frequency capping per user/session in Redis',
          'fallback house ads when demand is unfilled',
          'contract-first ad event schemas in shared-contracts',
        ],
      },
      {
        title: 'Targeting & Segmentation',
        verb: 'Configure',
        items: [
          'contextual targeting from content metadata tags',
          'behavioral segments with privacy-preserving cohorts',
          'geo and language targeting for Indian states',
          'brand safety categories and blocklists',
          'opt-out and consent flags per regulatory requirement',
        ],
      },
      {
        title: 'Auction & Ranking',
        verb: 'Implement',
        items: [
          'second-price auction with quality score adjustments',
          'eCPM ranking with viewability predictions',
          'pacing algorithms to smooth campaign delivery',
          'bid floor rules per placement and region',
          'real-time budget depletion checks',
        ],
      },
      {
        title: 'Measurement & Analytics',
        verb: 'Track',
        items: [
          'impression, click, and viewability beacons',
          'attributed conversion postbacks with fraud filters',
          'revenue reporting aligned with platform-finance ledger',
          'dashboards for fill rate, CTR, and eCPM trends',
          'anonymized reporting for advertiser APIs',
        ],
      },
      {
        title: 'Brand Safety & Compliance',
        verb: 'Enforce',
        items: [
          'pre-bid content classification for unsafe adjacency',
          'blocked advertiser categories (gambling, adult, etc.)',
          'kids mode ad exclusion policies',
          'ad disclosure labels per ASCI guidelines',
          'escalation to brand-safety-agent for policy exceptions',
        ],
      },
    ],
    advanced: [
      {
        title: 'Programmatic Scale',
        verb: 'Scale',
        items: [
          'OpenRTB adapter integration with header bidding',
          'edge caching of ad creatives via Cloudflare',
          'QPS autoscaling for auction service pods',
          'regional ad servers for latency-sensitive live placements',
          'disaster failover to house-only ad serving',
        ],
      },
      {
        title: 'Ad Fraud Detection',
        verb: 'Detect',
        items: [
          'IVT filters: datacenter IP, device farms, click injection',
          'anomaly detection on CTR and conversion spikes',
          'publisher-side invalid traffic scoring',
          'refund workflows for verified fraud clusters',
          'coordination with trust-safety-agent on bad actors',
        ],
      },
      {
        title: 'Revenue Optimization',
        verb: 'Optimize',
        items: [
          'yield management across direct and programmatic demand',
          'dynamic floor pricing by time-of-day and content tier',
          'ad load experiments balanced against retention',
          'sponsored content blending with feed ranking',
          'revenue reconciliation with platform-finance agents',
        ],
      },
      {
        title: 'Live & Video Ad Formats',
        verb: 'Deliver',
        items: [
          'livestream overlay ads without obscuring host face',
          'SSAI/CSAI patterns for OTT preroll/midroll',
          'companion banners synced to live gifting moments',
          'ad pod scheduling respecting maximum ad minutes',
          'adaptive bitrate ad creative transcoding pipeline',
        ],
      },
      {
        title: 'Privacy & Consent',
        verb: 'Protect',
        items: [
          'consent management platform integration',
          'limited ads mode for users declining tracking',
          'differential privacy for audience segment export',
          'data retention policies for ad logs',
          'Indian regulatory alignment for personalized ads',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'load tests for festival traffic ad QPS',
          'contract tests for auction API schemas',
          'synthetic fraud injection tests',
          'revenue ledger reconciliation audits',
          'golden tests for unfilled placement fallbacks',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'feed-ranking-agent for sponsored slot integration',
          'media-pipeline-agent for creative transcoding',
          'wallet-ledger-agent for creator revenue share',
          'analytics-agent for advertiser reporting',
          'ADR for new ad network vendor integrations',
        ],
      },
      {
        title: 'Advertiser Platform APIs',
        verb: 'Expose',
        items: [
          'self-serve campaign creation and budget APIs',
          'creative review workflow with moderation hooks',
          'reporting exports with SLA guarantees',
          'webhook notifications for budget and status changes',
          'sandbox environment for partner integration testing',
        ],
      },
    ],
  },

  redis: {
    basic: [
      {
        title: 'Cache Key Design',
        verb: 'Design',
        items: [
          'namespaced keys: `{service}:{entity}:{id}` convention',
          'TTL policies per data volatility class',
          'cache-aside vs write-through selection per endpoint',
          'negative caching for miss storms',
          'key cardinality monitoring to prevent hot keys',
        ],
      },
      {
        title: 'Invalidation Strategies',
        verb: 'Implement',
        items: [
          'event-driven invalidation via pub/sub channels',
          'versioned cache keys for atomic busting',
          'partial invalidation for feed fan-out subgraphs',
          'stale-while-revalidate for profile and catalog reads',
          'invalidation audit logs for debugging ghost data',
        ],
      },
      {
        title: 'Session & Rate Limiting',
        verb: 'Configure',
        items: [
          'auth session storage with sliding TTL',
          'token bucket rate limiters per IP and user',
          'OTP attempt counters with lockout windows',
          'API gateway Redis-backed throttle middleware',
          'session enumeration protection patterns',
        ],
      },
      {
        title: 'Pub/Sub & Realtime Fan-out',
        verb: 'Wire',
        items: [
          'Socket.IO Redis adapter channel design',
          'room-scoped pub/sub for livestream events',
          'backpressure handling on subscriber lag',
          'message schema versioning in shared-contracts',
          'dead connection cleanup and heartbeat alignment',
        ],
      },
      {
        title: 'Operational Safety',
        verb: 'Operate',
        items: [
          'memory eviction policy selection (volatile-lru vs allkeys-lru)',
          'maxmemory alerts before OOM kills',
          'RDB/AOF backup strategy per environment',
          'no secrets in repo — REDIS_URL via env only',
          'local Docker Redis via setup-phase1.ps1',
        ],
      },
    ],
    advanced: [
      {
        title: 'Redis Cluster Architecture',
        verb: 'Architect',
        items: [
          'hash slot planning for even key distribution',
          'read replica routing for session reads',
          'cluster failover drills and split-brain prevention',
          'cross-AZ latency budgets for Indian regions',
          'Elasticache vs self-managed trade-off ADRs',
        ],
      },
      {
        title: 'Performance Tuning',
        verb: 'Tune',
        items: [
          'pipeline batching for bulk cache operations',
          'Lua scripts for atomic multi-key updates',
          'connection pooling sizing per NestJS service',
          'large key detection and structural refactoring',
          'slowlog analysis and hot key resharding',
        ],
      },
      {
        title: 'Streams & Event Backbones',
        verb: 'Leverage',
        items: [
          'Redis Streams consumer groups for domain events',
          'at-least-once delivery with pending entry recovery',
          'stream trimming policies for retention compliance',
          'cross-service event catalog alignment',
          'migration path to Kafka for analytics fan-out',
        ],
      },
      {
        title: 'Distributed Locks & Coordination',
        verb: 'Coordinate',
        items: [
          'Redlock patterns for wallet debit serialization',
          'lock TTL and fencing token best practices',
          'leader election for cron and batch workers',
          'idempotency keys for payment and gift events',
          'chaos tests for lock holder crash scenarios',
        ],
      },
      {
        title: 'Security Hardening',
        verb: 'Harden',
        items: [
          'TLS in transit for managed Redis endpoints',
          'ACL users per microservice with least privilege',
          'command renaming/disabling dangerous commands in prod',
          'VPC security group isolation',
          'audit logging for admin commands',
        ],
      },
      {
        title: 'Observability',
        verb: 'Monitor',
        items: [
          'memory, ops/sec, and hit ratio dashboards',
          'alerting on replication lag and failover events',
          'tracing cache calls with correlation IDs',
          'SLI definitions for cache availability',
          'runbooks for cache stampede incidents',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'load tests for session and rate limit throughput',
          'failover game days with chaos-engineering-agent',
          'contract tests for cache invalidation events',
          'data consistency checks after invalidation storms',
          'golden tests for TTL and lock edge cases',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'socketio-architect for adapter configuration',
          'auth-service-agent for session TTL policies',
          'nestjs-architect for Redis module injection patterns',
          'kubernetes-agent for Redis StatefulSet manifests',
          'ADR for cluster topology changes',
        ],
      },
    ],
  },

  payments: {
    basic: [
      {
        title: 'Wallet Ledger Design',
        verb: 'Design',
        items: [
          'double-entry ledger with immutable transaction log',
          'idempotent debit/credit APIs with client request IDs',
          'balance snapshots vs event-sourced reconstruction',
          'multi-currency coin vs fiat wallet separation',
          'contract schemas in packages/shared-contracts/wallet/',
        ],
      },
      {
        title: 'Payment Gateway Integration',
        verb: 'Integrate',
        items: [
          'Razorpay/Stripe/PayU abstraction with env-based provider selection',
          'UPI, cards, and netbanking flows for Indian users',
          'webhook signature verification and replay protection',
          'payment status state machine: initiated → captured → settled',
          'no secrets in repo — gateway keys via Secrets Manager',
        ],
      },
      {
        title: 'Payouts & Creator Earnings',
        verb: 'Process',
        items: [
          'KYC-gated withdrawal thresholds and cooling periods',
          'TDS and tax withholding hooks for Indian compliance',
          'payout batch scheduling with failure retry queues',
          'creator earnings statements and dispute windows',
          'reconciliation with platform-finance reporting',
        ],
      },
      {
        title: 'Fraud & Risk Controls',
        verb: 'Enforce',
        items: [
          'velocity limits on top-ups and withdrawals',
          'device fingerprint and IP risk scoring',
          'refund and chargeback workflows',
          'suspicious gifting pattern detection',
          'escalation to fraud-detection-agent',
        ],
      },
      {
        title: 'Reconciliation & Reporting',
        verb: 'Report',
        items: [
          'daily gateway vs ledger reconciliation jobs',
          'revenue share splits for gifts, ads, and subscriptions',
          'audit trails for finance and compliance review',
          'anomaly alerts on balance drift',
          'export formats for platform-finance agents',
        ],
      },
    ],
    advanced: [
      {
        title: 'Financial Integrity at Scale',
        verb: 'Scale',
        items: [
          'sharded ledger partitions by user ID ranges',
          'saga patterns for cross-service payment flows',
          'exactly-once settlement with outbox pattern',
          'read models for real-time balance queries',
          'month-end close automation with finance agents',
        ],
      },
      {
        title: 'Subscription & IAP',
        verb: 'Manage',
        items: [
          'Google Play and App Store receipt validation',
          'subscription grace periods and dunning flows',
          'proration rules for plan upgrades',
          'family sharing and regional pricing tiers',
          'entitlement sync across four apps',
        ],
      },
      {
        title: 'Cross-App Wallet Federation',
        verb: 'Federate',
        items: [
          'unified wallet balance across Social, Livestream, Astro, OTT',
          'cross-app transfer rules and fee policies',
          'promotional credit scopes per app surface',
          'identity-platform session binding for wallet ops',
          'deep link flows for low-balance top-up',
        ],
      },
      {
        title: 'Compliance & Tax',
        verb: 'Comply',
        items: [
          'GST invoicing for digital services in India',
          'RBI prepaid instrument guidelines alignment',
          'PCI-DSS scope minimization via tokenization',
          'AML monitoring thresholds and SAR workflows',
          'data localization for financial records',
        ],
      },
      {
        title: 'Treasury & Cash Management',
        verb: 'Operate',
        items: [
          'float monitoring across payment gateways',
          'FX handling for international creator payouts',
          'reserve accounting for pending withdrawals',
          'treasury reporting dashboards',
          'vendor invoice matching automation',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'property-based tests for ledger invariants',
          'chaos tests for webhook delivery failures',
          'reconciliation diff zero-tolerance CI gates',
          'load tests for festival coin purchase spikes',
          'golden tests for refund and chargeback edge cases',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'gift-economy-agent for live tipping flows',
          'creator-economy-agent for revenue share rules',
          'platform-finance-agent for month-end reporting',
          'auth-service-agent for step-up authentication on withdraw',
          'ADR for new payment provider onboarding',
        ],
      },
      {
        title: 'Incident Response',
        verb: 'Respond',
        items: [
          'payment outage comms templates',
          'manual ledger adjustment approval workflow',
          'freeze switches for suspected fraud rings',
          'post-incident financial impact assessment',
          'regulatory notification timelines if required',
        ],
      },
    ],
  },

  orchestration: {
    basic: [
      {
        title: 'Task Routing & Delegation',
        verb: 'Route',
        items: [
          'task-router.md selection by domain, phase, and keywords',
          'single-agent vs multi-chat orchestration decision tree',
          'scope boundaries to prevent agent overlap',
          'dependency-ordered execution for cross-service work',
          'escalation paths when no agent matches',
        ],
      },
      {
        title: 'Quality Gate Enforcement',
        verb: 'Gate',
        items: [
          'validate-agents.mjs before catalog merges',
          'validate-agent-skills.mjs for skill pair integrity',
          'contract diff review before implementation',
          'smoke test requirements per phase exit',
          'production-readiness-checklist alignment',
        ],
      },
      {
        title: 'Handoff Management',
        verb: 'Document',
        items: [
          'structured handoff artifacts: context, decisions, blockers',
          'agent ## Dependencies paths in every delegation',
          'contract-first reminders in cross-agent prompts',
          'test plan attachment before quality-gate sign-off',
          'rollback notes for risky multi-service changes',
        ],
      },
      {
        title: 'Workflow Orchestration',
        verb: 'Sequence',
        items: [
          'Phase 1→2→2a→8→9 dependency ordering',
          'parallel vs serial agent activation rules',
          'chat-coordinator for multi-window Cursor sessions',
          'agent-scheduler for long-running validation loops',
          'pipeline-builder for CI-aligned local workflows',
        ],
      },
      {
        title: 'Governance Prefix',
        verb: 'Apply',
        items: [
          'MASTER-AI-OPERATING-SYSTEM.md load on every orchestration start',
          'no duplicate services — services/ catalog check',
          'ADR requirement for architecture forks',
          'smallest correct diff principle across delegations',
          'English in code; i18n ARB for user strings',
        ],
      },
    ],
    advanced: [
      {
        title: 'Multi-Agent System Design',
        verb: 'Architect',
        items: [
          '774+ agent catalog partitioning by domain and phase',
          'orchestration DAGs for autonomous completion agents',
          'conflict resolution when agents propose overlapping changes',
          'platform-orchestrator vs task-router responsibility split',
          'ecosystem-memory-agent for cross-chat context',
        ],
      },
      {
        title: 'Release Orchestration',
        verb: 'Coordinate',
        items: [
          'blue/green deploy sequencing across gateway and services',
          'feature flag coordination across four mobile apps',
          'database migration ordering in multi-service releases',
          'rollback-coordinator playbooks',
          'release-orchestration-agent checklists',
        ],
      },
      {
        title: 'Code Review & Design Review',
        verb: 'Review',
        items: [
          'senior-code-review-agent standards for NestJS and Flutter',
          'system-design-reviewer-agent for cross-cutting ADRs',
          'security review triggers for auth and payment changes',
          'performance review for feed and livestream hot paths',
          'documentation completeness as merge criterion',
        ],
      },
      {
        title: 'Autonomous Completion Loops',
        verb: 'Automate',
        items: [
          'phase-1-autonomous-completion-agent fix-and-retry patterns',
          'phase-2-autonomous-completion-agent contract alignment',
          'golden test failure triage and assignment',
          'CI red-to-green orchestration with bounded retries',
          'status reporting for founder-war-room visibility',
        ],
      },
      {
        title: 'Cross-Team Coordination',
        verb: 'Align',
        items: [
          'mobile ↔ backend contract sync meetings as agent handoffs',
          'design-system token updates propagated to all apps',
          'shared-contracts versioning communication',
          'dependency-management-agent for npm/Dart upgrades',
          'incident-commander-agent escalation during outages',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'end-to-end orchestration dry runs in staging',
          'agent prompt regression via test-golden-agents.mjs',
          'handoff artifact quality sampling',
          'orchestration latency metrics for task routing',
          'post-release retrospectives with action items',
        ],
      },
      {
        title: 'Master Brain Integration',
        verb: 'Integrate',
        items: [
          'decision-engine for priority conflicts',
          'global-orchestration-agent for ecosystem-wide initiatives',
          'knowledge-router for governance doc retrieval',
          'cross-domain-coordinator for four-app features',
          'ADR tracking in docs/adr/',
        ],
      },
      {
        title: 'Founder & Executive Communication',
        verb: 'Report',
        items: [
          'weekly phase status with blockers and confidence',
          'risk registers for multi-agent initiatives',
          'option matrices for build-vs-buy decisions',
          'cto-agent and chief-architect alignment on forks',
          'investor-ready milestone mapping',
        ],
      },
    ],
  },

  testing: {
    basic: [
      {
        title: 'Test Strategy Design',
        verb: 'Plan',
        items: [
          'test pyramid: unit → integration → E2E per service',
          'risk-based prioritization for auth, wallet, and live paths',
          'contract tests against OpenAPI in shared-contracts',
          'smoke test suites aligned with phase scripts',
          'acceptance criteria traceable to agent Responsibilities',
        ],
      },
      {
        title: 'API & Contract Testing',
        verb: 'Validate',
        items: [
          'openapi-contract-validation-agent workflows',
          'schema breaking change detection in CI',
          'negative test cases for auth and rate limits',
          'idempotency replay tests for wallet endpoints',
          'gateway proxy integration tests',
        ],
      },
      {
        title: 'Flutter & Mobile Testing',
        verb: 'Test',
        items: [
          'widget tests for critical navigation flows',
          'golden file tests for design-system components',
          'integration tests with mock API servers',
          'low-end device manual test matrix',
          'offline sync and retry behavior validation',
        ],
      },
      {
        title: 'Performance & Load Testing',
        verb: 'Benchmark',
        items: [
          'k6/Artillery scripts for gateway and feed endpoints',
          'concurrent viewer simulation for livestream joins',
          'OTP spike load tests for festival traffic',
          'memory leak detection on long live sessions',
          'startup time budgets on 2GB RAM devices',
        ],
      },
      {
        title: 'Chaos & Resilience Testing',
        verb: 'Probe',
        items: [
          'Redis and Postgres failure injection scenarios',
          'network partition tests for mobile clients',
          'Socket.IO reconnect storm simulations',
          'graceful degradation verification on 2G',
          'rollback validation after failed deploys',
        ],
      },
    ],
    advanced: [
      {
        title: 'E2E Test Architecture',
        verb: 'Architect',
        items: [
          'e2e-test-architect harness across four apps',
          'test data factories with PII-safe fixtures',
          'parallel CI sharding for long E2E suites',
          'flaky test quarantine and remediation SLAs',
          'staging environment parity requirements',
        ],
      },
      {
        title: 'CI/CD Quality Gates',
        verb: 'Enforce',
        items: [
          'required checks: validate-agents, validate-agent-skills, golden',
          'coverage thresholds for critical modules only',
          'performance regression budgets in CI',
          'security scan gates for dependencies',
          'merge blocking on contract test failures',
        ],
      },
      {
        title: 'Device & Compatibility Matrix',
        verb: 'Cover',
        items: [
          'Android API 24–34 device farm priorities',
          'iOS version support matrix',
          'screen size and notch layout regression suite',
          'accessibility testing with TalkBack/VoiceOver',
          'regional locale and RTL layout checks',
        ],
      },
      {
        title: 'Observability in Testing',
        verb: 'Instrument',
        items: [
          'test run correlation with production trace formats',
          'crash monitoring integration for beta builds',
          'performance trace capture during load tests',
          'synthetic monitoring for production SLOs',
          'bug-reproduction-agent playbooks from telemetry',
        ],
      },
      {
        title: 'Chaos Engineering Program',
        verb: 'Operate',
        items: [
          'chaos-engineering-agent game day calendar',
          'blast radius containment for experiments',
          'automated rollback triggers on SLO breach',
          'hypothesis-driven failure injection docs',
          'post-game improvement backlog',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'canary analysis metrics for releases',
          'shadow traffic comparison before cutover',
          'production smoke tests post-deploy',
          'data migration verification scripts',
          'incident replay tests from past outages',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'qa-automation-agent for CI wiring',
          'api-contract-author for schema updates',
          'flutter-architect for testability hooks',
          'quality-gate before release orchestration',
          'ADR for new testing infrastructure',
        ],
      },
      {
        title: 'Test Data & Privacy',
        verb: 'Protect',
        items: [
          'no production PII in test fixtures',
          'synthetic user generation for scale tests',
          'data masking in staging database refreshes',
          'GDPR-style deletion test scenarios',
          'secure cleanup after load test runs',
        ],
      },
    ],
  },

  ux: {
    basic: [
      {
        title: 'User Research & Insights',
        verb: 'Research',
        items: [
          'qualitative interviews with tier-2/3 Indian users',
          'session replay analysis for drop-off points',
          'jobs-to-be-done framing per app surface',
          'competitive UX benchmarks (ShareChat, Josh, etc.)',
          'accessibility needs for low-literacy users',
        ],
      },
      {
        title: 'Onboarding & Activation',
        verb: 'Design',
        items: [
          'progressive onboarding with skip-friendly steps',
          'OTP-first login UX with error recovery',
          'interest picker cold-start for feed personalization',
          'creator vs viewer path branching',
          'low-bandwidth onboarding asset budgets',
        ],
      },
      {
        title: 'Engagement Loop Design',
        verb: 'Craft',
        items: [
          'variable reward schedules without dark patterns',
          'streak and milestone UX with clear value exchange',
          'notification entry points back to core loops',
          'micro-reward feedback (haptics, confetti, badges)',
          'session depth metrics tied to UX changes',
        ],
      },
      {
        title: 'Regional & Low-Bandwidth UX',
        verb: 'Adapt',
        items: [
          'Hinglish and regional language copy via i18n ARB',
          'data saver modes for video and image loading',
          'one-hand thumb reach layouts for portrait mobile',
          'offline states with actionable retry CTAs',
          '2G/3G skeleton screens and optimistic UI',
        ],
      },
      {
        title: 'Experiment Design',
        verb: 'Run',
        items: [
          'ux-experiment-designer hypothesis templates',
          'guardrail metrics: retention, crash rate, support tickets',
          'prototype-spike-agent for fast validation',
          'A/B UI variants behind feature flags',
          'document decisions for product-labs agents',
        ],
      },
    ],
    advanced: [
      {
        title: 'Behavioral Science & Ethics',
        verb: 'Balance',
        items: [
          'addiction-risk-agent reviews for dopamine loops',
          'transparent limits on infinite scroll nudges',
          'parental and minor protection UX patterns',
          'ethical personalization without manipulation',
          'regional cultural sensitivity in engagement tactics',
        ],
      },
      {
        title: 'Creator Psychology UX',
        verb: 'Support',
        items: [
          'go-live confidence builders for first-time hosts',
          'earnings visibility without anxiety-inducing comparisons',
          'moderation feedback loops that educate creators',
          'burnout detection signals in creator dashboards',
          'community reputation surfacing for trust',
        ],
      },
      {
        title: 'Cross-App Experience Coherence',
        verb: 'Unify',
        items: [
          'design-system tokens across Social, Livestream, Astro, OTT',
          'shared navigation mental models in mobile shell',
          'wallet and profile UX consistency',
          'notification tone and branding alignment',
          'deep link landing experiences per app',
        ],
      },
      {
        title: 'Personalization UX',
        verb: 'Tailor',
        items: [
          'explainable recommendations UI snippets',
          'user controls for interest tuning and resets',
          'regional content prioritization without filter bubbles',
          'new user vs power user layout adaptations',
          'session satisfaction surveys with low friction',
        ],
      },
      {
        title: 'Accessibility Excellence',
        verb: 'Include',
        items: [
          'WCAG-aligned contrast and touch targets',
          'screen reader labels for live and feed interactions',
          'reduced motion and high-contrast modes',
          'voice navigation experiments for hands-busy users',
          'accessibility regression in CI checklists',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'usability test gates before GA features',
          'quantitative UX metric dashboards',
          'heatmap and scroll depth analysis on key screens',
          'support ticket taxonomy linked to UX changes',
          'rollback criteria for negative retention experiments',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'design-tokens-architect for visual consistency',
          'growth-ai agents for experiment allocation',
          'flutter-architect for implementation feasibility',
          'ux-research-lead for study design review',
          'ADR for major navigation architecture changes',
        ],
      },
      {
        title: 'Attention Economy Strategy',
        verb: 'Govern',
        items: [
          'session length healthy bounds per app',
          'break reminders for extended live viewing',
          'quality-time metrics vs raw dwell time',
          'founder-war-room reporting on engagement ethics',
          'platform-governance alignment on feature-approval',
        ],
      },
    ],
  },

  safety: {
    basic: [
      {
        title: 'Content Moderation Pipeline',
        verb: 'Build',
        items: [
          'AI pre-filter + human review queue for UGC',
          'real-time live stream moderation hooks',
          'CSAM and illegal content zero-tolerance workflows',
          'appeal and restoration processes for creators',
          'moderation SLA tiers by content severity',
        ],
      },
      {
        title: 'Trust & Safety Policies',
        verb: 'Enforce',
        items: [
          'content-policy-agent rule sets per app surface',
          'age-gate and minor protection flows',
          'harassment and hate speech detection thresholds',
          'creator verification for monetization eligibility',
          'regional legal compliance for Indian jurisdictions',
        ],
      },
      {
        title: 'Fraud & Abuse Detection',
        verb: 'Detect',
        items: [
          'fake profile and bot farm identification',
          'spam and scam link blocking in chat',
          'gift and wallet wash trading patterns',
          'deepfake detection on profile media',
          'rate limits coordinated with auth-service',
        ],
      },
      {
        title: 'User Reporting & Appeals',
        verb: 'Operate',
        items: [
          'in-app report flows with evidence capture',
          'ticket triage priority by harm severity',
          'reporter feedback without revealing outcomes',
          'repeat offender escalation ladders',
          'law enforcement request handling procedures',
        ],
      },
      {
        title: 'Community Reputation',
        verb: 'Score',
        items: [
          'trust-score-agent composite signals',
          'host and viewer reputation badges',
          'shadow restrictions before hard bans',
          'community moderator tooling',
          'transparent community guidelines surfacing',
        ],
      },
    ],
    advanced: [
      {
        title: 'AI Moderation at Scale',
        verb: 'Scale',
        items: [
          'multimodal models for video, audio, and text',
          'human-in-the-loop active learning pipelines',
          'regional language moderation models (Hindi, Tamil, etc.)',
          'latency budgets for live moderation decisions',
          'false positive/negative monitoring dashboards',
        ],
      },
      {
        title: 'Identity Verification',
        verb: 'Verify',
        items: [
          'KYC document verification for creators and withdrawals',
          'liveness checks for high-risk account recovery',
          'government ID hashing and secure storage',
          'verification vendor abstraction via env config',
          'privacy-minimized verification data retention',
        ],
      },
      {
        title: 'Crisis & CSAM Response',
        verb: 'Respond',
        items: [
          'immediate content takedown automation',
          'NCMEC/regulatory reporting workflows',
          'preservation of evidence for investigations',
          'employee wellness support for reviewers',
          'post-crisis policy updates and ADRs',
        ],
      },
      {
        title: 'Cross-App Safety Federation',
        verb: 'Federate',
        items: [
          'unified ban list across four apps',
          'cross-app report history for repeat offenders',
          'shared threat intelligence feeds',
          'wallet freeze coordination on fraud rings',
          'identity-merge-agent alignment on duplicates',
        ],
      },
      {
        title: 'Live Safety Operations',
        verb: 'Protect',
        items: [
          'emergency stream termination controls',
          'moderator raid tools for high-traffic rooms',
          'minor safety mode in live recommendations',
          'dangerous challenge content proactive detection',
          'coordination with incident-command during crises',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'red team tests for moderation bypass attempts',
          'synthetic harmful content in staging classifiers',
          'appeal SLA compliance monitoring',
          'reviewer throughput and accuracy QA sampling',
          'golden tests for policy edge cases',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'ai-moderation-agent model deployment',
          'legal-compliance-agent for policy updates',
          'trust-safety-reviewer for high-severity cases',
          'enterprise-security-agent for platform hardening',
          'ADR for moderation architecture changes',
        ],
      },
      {
        title: 'Transparency & Governance',
        verb: 'Report',
        items: [
          'transparency reports on removals and appeals',
          'bias audits on moderation models',
          'creator education on policy violations',
          'founder-war-room safety KPI reviews',
          'platform-governance feature-approval for safety tools',
        ],
      },
    ],
  },

  media: {
    basic: [
      {
        title: 'Upload & Ingest Pipeline',
        verb: 'Build',
        items: [
          'S3 multipart upload with presigned URL contracts',
          'client-side compression before upload on mobile',
          'virus scan and MIME validation on ingest',
          'metadata extraction (duration, resolution, codec)',
          'retry and resume for flaky network uploads',
        ],
      },
      {
        title: 'Transcoding & Packaging',
        verb: 'Configure',
        items: [
          'HLS/DASH ladder generation for adaptive bitrate',
          'per-title encoding optimization where available',
          'thumbnail and preview sprite generation',
          'audio-only fallback renditions',
          'job queue prioritization by content tier',
        ],
      },
      {
        title: 'CDN & Delivery',
        verb: 'Route',
        items: [
          'Cloudflare CDN cache rules for segments and manifests',
          'signed URL TTL policies for premium content',
          'regional edge selection for Indian ISPs',
          'cache invalidation on content updates',
          'egress cost monitoring per platform-finance rules',
        ],
      },
      {
        title: 'Quality Control',
        verb: 'Inspect',
        items: [
          'automated QC checks for black frames and silence',
          'loudness normalization standards',
          'caption and subtitle track validation',
          '4K/HDR optional tiers with device capability gating',
          'manual QC queue for flagged assets',
        ],
      },
      {
        title: 'Contract-First Media APIs',
        verb: 'Define',
        items: [
          'upload, transcode status, and playback URL schemas',
          'webhook callbacks for job completion',
          'idempotent job submission with client request IDs',
          'error codes for quota exceeded and unsupported codecs',
          'integration with OTT catalog agents',
        ],
      },
    ],
    advanced: [
      {
        title: 'Live Transcoding & LL-HLS',
        verb: 'Stream',
        items: [
          'low-latency HLS for livestream catch-up',
          'Agora/Zego recording to VOD pipeline',
          'live thumbnail updates during broadcast',
          'ABR switching under variable uplink',
          'failover between transcode workers',
        ],
      },
      {
        title: 'DRM & Content Protection',
        verb: 'Protect',
        items: [
          'Widevine/FairPlay license server integration',
          'key rotation for premium OTT titles',
          'screen capture deterrence policies per platform',
          'geo-restriction enforcement at CDN edge',
          'watermarking for leak tracing',
        ],
      },
      {
        title: 'Media Pipeline Scale',
        verb: 'Scale',
        items: [
          'Kubernetes job autoscaling for transcode spikes',
          'GPU worker pools for AV1/HEVC encoding',
          'priority queues for live vs VOD workloads',
          'multi-region ingest for creator uploads',
          'cost caps with spot instance strategies',
        ],
      },
      {
        title: 'AI-Enhanced Media',
        verb: 'Augment',
        items: [
          'auto-captioning for Indian languages',
          'content tagging for search and recommendations',
          'highlight clip generation for live replays',
          'inappropriate content frame detection',
          'thumbnail A/B selection via engagement models',
        ],
      },
      {
        title: 'Storage Lifecycle',
        verb: 'Manage',
        items: [
          'S3 lifecycle rules for cold archive tiers',
          'orphaned upload garbage collection',
          'deduplication via perceptual hashing where safe',
          'backup and cross-region replication policies',
          'storage cost attribution per app',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'transcode SLA monitoring and alerting',
          'playback start time p95 dashboards',
          'codec compatibility matrix tests',
          'CDN cache hit ratio targets',
          'golden tests for ingest edge cases',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'OTT catalog agents for metadata sync',
          'livestream-agent for recording hooks',
          'cdn-routing-agent for edge policy updates',
          'kubernetes-agent for worker scaling',
          'ADR for new codec or CDN vendor adoption',
        ],
      },
      {
        title: 'Creator Upload UX',
        verb: 'Optimize',
        items: [
          'background upload on mobile with progress persistence',
          'draft resume after app kill',
          'upload quality presets for low-bandwidth creators',
          'processing status notifications',
          'failure recovery with partial chunk reuse',
        ],
      },
    ],
  },

  search: {
    basic: [
      {
        title: 'Indexing Pipeline',
        verb: 'Build',
        items: [
          'Elasticsearch/OpenSearch cluster index design',
          'incremental indexing from domain event streams',
          'denormalized documents for feed, users, and OTT titles',
          'language analyzers for Hindi, Tamil, and Hinglish',
          'index lifecycle management and rollover policies',
        ],
      },
      {
        title: 'Query Understanding',
        verb: 'Parse',
        items: [
          'spell correction and synonym expansion',
          'intent classification: user vs content vs hashtag',
          'zero-results fallback strategies',
          'safe search filters for minor accounts',
          'query logging with PII redaction',
        ],
      },
      {
        title: 'Ranking & Relevance',
        verb: 'Tune',
        items: [
          'BM25 baseline with engagement boosting',
          'personalization features from growth signals',
          'freshness decay for trending queries',
          'diversity constraints in result pages',
          'A/B ranking experiments with guardrails',
        ],
      },
      {
        title: 'Autocomplete & Suggestions',
        verb: 'Serve',
        items: [
          'edge-cached suggestion endpoints',
          'trending query prefixes by region',
          'creator handle vs display name disambiguation',
          'inappropriate suggestion blocklists',
          'sub-50ms p95 autocomplete latency targets',
        ],
      },
      {
        title: 'Search Analytics',
        verb: 'Measure',
        items: [
          'CTR, zero-rate, and reformulation metrics',
          'index lag monitoring dashboards',
          'slow query logging and optimization backlog',
          'search-to-conversion attribution hooks',
          'weekly relevance evaluation sets',
        ],
      },
    ],
    advanced: [
      {
        title: 'Hybrid & Vector Search',
        verb: 'Combine',
        items: [
          'dense embeddings + sparse BM25 fusion',
          'vector database agent coordination (pgvector/Pinecone)',
          'embedding refresh pipelines on content updates',
          'approximate nearest neighbor tuning',
          'cold-start embedding strategies',
        ],
      },
      {
        title: 'Search at Scale',
        verb: 'Scale',
        items: [
          'shard planning by content type and region',
          'read replica routing for query traffic',
          'cache layers for hot queries and autocomplete',
          'rate limiting abusive search scrapers',
          'failover to degraded keyword-only mode',
        ],
      },
      {
        title: 'Cross-App Search Federation',
        verb: 'Federate',
        items: [
          'unified search across Social, Livestream, OTT, Astro',
          'app-specific result tabs with blended ranking option',
          'cross-app deep links from search results',
          'permission-aware result filtering',
          'wallet and purchase history search exclusions',
        ],
      },
      {
        title: 'Semantic Discovery',
        verb: 'Enable',
        items: [
          'natural language queries for content discovery',
          'multimodal search on thumbnails and clips',
          'astro consultation topic search specialization',
          'live room search by topic and language',
          'creator discovery by niche and geography',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'relevance benchmark suites per locale',
          'index consistency checks after bulk reindex',
          'load tests for festival trending spikes',
          'regression tests for ranking model deployments',
          'golden tests for autocomplete edge cases',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'growth-ai search-ranking agents',
          'ml-platform embedding-agent pipelines',
          'content-tagging-agent metadata enrichment',
          'elasticsearch-admin-agent cluster ops',
          'ADR for search engine vendor changes',
        ],
      },
      {
        title: 'Privacy & Compliance',
        verb: 'Protect',
        items: [
          'user search history retention limits',
          'right-to-erasure propagation to indexes',
          'consent-gated personalized search',
          'audit logs for admin search overrides',
          'regional data residency for search logs',
        ],
      },
      {
        title: 'Operational Excellence',
        verb: 'Operate',
        items: [
          'blue/green index migrations',
          'backup and restore drills for search clusters',
          'capacity planning for IPL and festival peaks',
          'on-call runbooks for index red health',
          'cost optimization for storage and compute',
        ],
      },
    ],
  },

  governance: {
    basic: [
      {
        title: 'Platform Governance Compliance',
        verb: 'Follow',
        items: [
          'MASTER-AI-OPERATING-SYSTEM.md as primary authority',
          '22 platform-governance documents by domain relevance',
          'feature-approval-rules.md gates before new capabilities',
          'engineering-rules.md and security-rules.md on every change',
          'production-readiness-checklist before launch',
        ],
      },
      {
        title: 'Contract-First Enforcement',
        verb: 'Require',
        items: [
          'OpenAPI definitions before NestJS implementation',
          'breaking change review with api-contract-author',
          'shared-contracts versioning and changelog discipline',
          'mobile client codegen sync after contract updates',
          'no undocumented public API surfaces',
        ],
      },
      {
        title: 'Agent Catalog Integrity',
        verb: 'Maintain',
        items: [
          'AGENT-REGISTRY.md accuracy after agent changes',
          'validate-agents.mjs PASS/FAIL on catalog edits',
          'boilerplate responsibility detection and enrichment',
          'skill pair completeness via validate-agent-skills.mjs',
          'golden agent tests for structural regression',
        ],
      },
      {
        title: 'ADR & Architecture Forks',
        verb: 'Document',
        items: [
          'docs/adr/SH-000-template.md for all architecture forks',
          'no duplicate services — services/ catalog audit',
          'chief-architect and cto-agent review for major forks',
          'phase gate criteria before advancing roadmap',
          'rollback plans attached to ADR proposals',
        ],
      },
      {
        title: 'Audit & Reporting',
        verb: 'Report',
        items: [
          'governance compliance checklists per deliverable',
          'non-compliance escalation to quality-gate',
          'periodic audits of secrets and dependency risks',
          'documentation drift detection vs implementation',
          'founder-war-room governance status summaries',
        ],
      },
    ],
    advanced: [
      {
        title: 'Ecosystem Policy Design',
        verb: 'Design',
        items: [
          'cross-app policy harmonization (safety, payments, AI)',
          'cost-control-rules.md enforcement automation',
          'ai-usage-rules.md for LLM feature governance',
          'data retention and localization policies',
          'vendor risk assessment frameworks',
        ],
      },
      {
        title: 'Compliance Automation',
        verb: 'Automate',
        items: [
          'CI gates for governance doc references in PRs',
          'automated boilerplate agent detection',
          'policy-as-code for security and rate limits',
          'contract drift scanners in nightly jobs',
          'audit trail exports for external reviews',
        ],
      },
      {
        title: 'Community Governance',
        verb: 'Moderate',
        items: [
          'community guidelines across apps and games',
          'creator council feedback incorporation',
          'transparency reporting standards',
          'appeals process governance',
          'regional legal variant tracking',
        ],
      },
      {
        title: 'Multi-Chat & AI Operations',
        verb: 'Govern',
        items: [
          'Cursor agent scope boundaries and handoffs',
          'prompt template quality standards',
          'agent-skill-validator quality thresholds',
          'multi-chat execution guide compliance',
          'AI cost and safety budgets per feature',
        ],
      },
      {
        title: 'Risk Management',
        verb: 'Assess',
        items: [
          'risk registers for phase transitions',
          'third-party dependency concentration risks',
          'regulatory change monitoring (India digital rules)',
          'business continuity planning requirements',
          'insurance and liability documentation hooks',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'quarterly governance audit playbooks',
          'sample-based PR compliance reviews',
          'post-incident governance gap analysis',
          'training completion tracking for engineering',
          'golden tests for governance agent prompts',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'governance-compliance-agent as enforcement hub',
          'quality-gate before production releases',
          'platform-orchestrator for policy rollouts',
          'adr-writer-agent for documentation',
          'cto-agent sign-off on policy exceptions',
        ],
      },
      {
        title: 'International Expansion Governance',
        verb: 'Prepare',
        items: [
          'locale-specific compliance matrices',
          'payment and tax rule variants by country',
          'content legality maps per jurisdiction',
          'data residency decision trees',
          'partnership legal review checkpoints',
        ],
      },
    ],
  },

  infrastructure: {
    basic: [
      {
        title: 'Kubernetes Foundations',
        verb: 'Deploy',
        items: [
          'EKS/GKE cluster baseline manifests in infra/',
          'namespace per environment: dev, staging, prod',
          'resource requests/limits for NestJS and worker pods',
          'liveness and readiness probes aligned with health modules',
          'secrets via External Secrets Operator — not in git',
        ],
      },
      {
        title: 'GitOps & CI/CD',
        verb: 'Automate',
        items: [
          'GitHub Actions deploy pipelines with approval gates',
          'image tagging and immutable release artifacts',
          'helm/kustomize overlays per environment',
          'rollback via previous manifest revision',
          'contract validation job before deploy stage',
        ],
      },
      {
        title: 'Networking & Ingress',
        verb: 'Configure',
        items: [
          'ingress controller with TLS termination',
          'internal service mesh or ClusterIP communication',
          'NetworkPolicies for least-privilege pod traffic',
          'Cloudflare tunnel or WAF integration at edge',
          'api-gateway as external traffic entry',
        ],
      },
      {
        title: 'Data Services Operations',
        verb: 'Operate',
        items: [
          'managed Postgres (Neon/RDS) connection pooling',
          'Redis StatefulSet or Elasticache failover planning',
          'backup schedules and restore drill documentation',
          'migration job isolation and lock management',
          'storage class selection for persistent volumes',
        ],
      },
      {
        title: 'Observability Stack',
        verb: 'Instrument',
        items: [
          'Prometheus metrics scrape configs',
          'log aggregation with structured JSON',
          'OpenTelemetry collector sidecar pattern',
          'alertmanager routes to on-call rotations',
          'SLO dashboards for gateway and realtime',
        ],
      },
    ],
    advanced: [
      {
        title: 'Multi-Region Topology',
        verb: 'Architect',
        items: [
          'active-passive vs active-active per service tier',
          'global load balancing for api-gateway',
          'Postgres read replica routing in ORM config',
          'Redis Global Datastore or regional clusters',
          'RPO/RTO targets per revenue-critical service',
        ],
      },
      {
        title: 'Autoscaling & Capacity',
        verb: 'Scale',
        items: [
          'HPA on CPU and custom metrics (QPS, room count)',
          'cluster autoscaler node pool strategies',
          'festival and IPL pre-warming runbooks',
          'cost-aware scale-to-zero for dev environments',
          'GPU node pools for ML and transcode workers',
        ],
      },
      {
        title: 'Security Hardening',
        verb: 'Harden',
        items: [
          'pod security standards and seccomp profiles',
          'IRSA/IAM roles for S3 and Secrets access',
          'admission controllers for image signing',
          'vulnerability scanning in CI for container images',
          'zero-trust service mesh mTLS',
        ],
      },
      {
        title: 'Disaster Recovery',
        verb: 'Recover',
        items: [
          'cross-region backup replication verification',
          'game day failover to secondary region',
          'runbook for total AZ loss scenarios',
          'data consistency checks post-failover',
          'customer communication templates via incident-command',
        ],
      },
      {
        title: 'Platform Engineering',
        verb: 'Enable',
        items: [
          'developer self-service preview environments',
          'standard service Helm chart templates',
          'infra cost allocation tags per team/app',
          'policy-as-code with OPA/Kyverno',
          'documentation for local-to-prod parity gaps',
        ],
      },
      {
        title: 'Production Validation',
        verb: 'Validate',
        items: [
          'chaos experiments on pod and node failures',
          'deploy canary analysis with automatic promotion',
          'load tests from staging mirroring prod topology',
          'backup restore quarterly drills',
          'golden tests for manifest rendering',
        ],
      },
      {
        title: 'Multi-Agent Orchestration',
        verb: 'Coordinate',
        items: [
          'nestjs-architect for health probe contracts',
          'redis-cache-specialist for Redis K8s config',
          'chaos-engineering-agent game days',
          'incident-commander-agent during infra outages',
          'ADR for cloud provider or K8s distro changes',
        ],
      },
      {
        title: 'Cost & FinOps',
        verb: 'Optimize',
        items: [
          'right-sizing recommendations from metrics',
          'spot/preemptible workloads for batch jobs',
          'reserved capacity planning for baseline',
          'egress and cross-AZ traffic minimization',
          'monthly infra review with platform-finance',
        ],
      },
    ],
  },
};
