/**
 * Domain-specific responsibility templates for agent markdown enrichment.
 * Used by scripts/enrich-agent-responsibilities.mjs
 */

const BOILERPLATE_RESP =
  /Design and implement .+ capabilities for Stream Heaven/i;
const GENERIC_LINE =
  /Follow platform-governance|Coordinate with dependent|Optimize for Indian|Document decisions|Design and implement/;

export function isBoilerplateResponsibilities(content) {
  const respMatch = content.match(/## Responsibilities\n([\s\S]*?)(?=\n## )/);
  const respText = respMatch?.[1] ?? '';
  const respLines = respText
    .split('\n')
    .filter((l) => l.trim().startsWith('-'));
  return (
    BOILERPLATE_RESP.test(respText) &&
    respLines.length <= 6 &&
    respLines.every((l) => GENERIC_LINE.test(l))
  );
}

export function needsResponsibilityEnrichment(content) {
  const respMatch = content.match(/## Responsibilities\n([\s\S]*?)(?=\n## )/);
  const respText = respMatch?.[1] ?? '';
  const respLines = respText
    .split('\n')
    .filter((l) => l.trim().startsWith('-'));
  return isBoilerplateResponsibilities(content) || respLines.length < 3;
}

function slugTokens(slug) {
  return slug
    .replace(/-agent$/, '')
    .replace(
      /-(specialist|architect|engineer|coordinator|manager|orchestrator|router|lead|reviewer|guardian|curator|advisor|moderator|enhancer|pipeline|integration|flow|engine|planner|tracker|keeper|designer)$/,
      ''
    )
    .split('-')
    .filter(Boolean);
}

function humanize(tokens) {
  return tokens.map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(' ');
}

function pickDependencyEscalation(ctx) {
  const deps = ctx.content.match(/## Dependencies\n([\s\S]*?)(?=\n## )/)?.[1] ?? '';
  const agentDep = deps.match(/ai-agents\/[^\s`]+\.md|apps\/[^\s`]+\.md/)?.[0];
  if (agentDep) {
    return `Escalate blockers and handoffs to \`${agentDep}\` per dependency map`;
  }
  return 'Coordinate handoffs with orchestration agents (task-router, quality-gate) on cross-team work';
}

/** Hand-authored responsibilities for highest-priority agents */
export const SLUG_OVERRIDES = {
  'ai-agents/executive/cto-agent.md': [
    'Set technical strategy for four-app roadmap (Social, Livestream, Astro, Media) aligned to phase gates',
    'Review NestJS service boundaries and block duplicate microservices before ADR approval',
    'Enforce contract-first changes in packages/shared-contracts/ and api-gateway routing standards',
    'Arbitrate build-vs-buy for Agora/Zego, Firebase Auth, CDN, and SMS OTP providers',
    'Define engineering quality bars: validate-agents, golden tests, and Phase 1 smoke suites',
    'Coordinate chief-architect and platform-orchestrator on cross-cutting architecture decisions',
    'Escalate wallet, auth, and safety risks to enterprise-security and chief-safety-officer agents',
  ],
  'ai-agents/executive/chief-architect.md': [
    'Own platform architecture principles across NestJS services, Flutter apps, Redis, and Socket.IO realtime',
    'Author and review ADRs in docs/adr/ before architecture forks or new service approvals',
    'Define service boundaries for auth, profile, gateway, livestream, social, and wallet domains',
    'Mandate shared-contracts updates before any breaking API or event schema change',
    'Review scaling-playbook compliance for live minutes, feed scroll, and concurrent viewer SLOs',
    'Coordinate cto-platform-advisor and master-platform-architect-agent on phase exit criteria',
    'Escalate governance exceptions to governance-compliance-agent with remediation checklist',
  ],
  'ai-agents/orchestration/master-platform-architect-agent.md': [
    'Maintain cross-domain architecture map linking ai-agents/, services/, apps/, and packages/',
    'Resolve conflicting service ownership before new NestJS modules or Flutter feature shells ship',
    'Review OpenAPI and event schema changes for backward compatibility across four apps',
    'Define integration patterns: api-gateway proxy, Redis cache, PostgreSQL migrations, Socket.IO rooms',
    'Run architecture reviews with chief-architect before Phase 2+ feature work expands scope',
    'Document handoff artifacts for task-router and quality-gate on multi-agent deliverables',
    'Escalate production-impacting forks to rollback-coordinator and incident-commander-agent',
  ],
  'ai-agents/orchestration/task-router.md': [
    'Route incoming tasks to the correct domain agent using ai-agents/AGENT-REGISTRY.md ownership map',
    'Detect duplicate agent assignments and merge parallel work into a single owner agent',
    'Inject governance-compliance-agent gate for tasks touching services/ or shared-contracts/',
    'Pass execution context (phase, domain, stack) into downstream agent prompt templates',
    'Track dependency chains and block handoffs when upstream agents have open blockers',
    'Coordinate with workflow-engine and agent-scheduler on parallel vs. sequential routing',
    'Escalate ambiguous ownership to platform-orchestrator and master-platform-architect-agent',
  ],
  'ai-agents/orchestration/workflow-engine.md': [
    'Model multi-step agent workflows with explicit inputs, outputs, and quality-gate checkpoints',
    'Persist workflow state for handoff-manager: pending, in-review, blocked, complete',
    'Sequence Phase 1 chains: governance → contracts → NestJS service → gateway → smoke tests',
    'Trigger quality-gate validation before merging agent deliverables into the monorepo',
    'Support rollback paths via rollback-coordinator when gate failures affect production scope',
    'Coordinate task-router and dependency-resolver on cyclic agent dependency detection',
    'Document workflow DAGs for recurring platform tasks (bootstrap, release, incident response)',
  ],
  'ai-agents/master-brain/platform-orchestrator.md': [
    'Decompose founder/CTO intents into phased agent task graphs across ai-agents/ domains',
    'Prioritize Phase 1 foundation work before feature agents in social, livestream, or games domains',
    'Synthesize context from AGENT-REGISTRY.md, governance docs, and active phase roadmaps',
    'Assign owners via task-router; block work that violates platform-governance or duplicates services',
    'Track cross-domain blockers and escalate to decision-engine for conflict resolution',
    'Coordinate master-planner and cross-domain-coordinator on multi-app launch milestones',
    'Report phase readiness summaries with explicit PASS/FAIL gates for executive agents',
  ],
  'ai-agents/core-engineering/frontend/flutter-architect.md': [
    'Define Flutter monorepo layout: apps/mobile shell, feature modules, Riverpod providers, GoRouter routes',
    'Set widget and theme standards per platform-governance/flutter-ui-rules.md across four apps',
    'Mandate low-end Android performance budgets: jank frames, image cache, and offline-first patterns',
    'Coordinate riverpod-specialist and routing-specialist on state and navigation conventions',
    'Review platform-channel integrations (Agora, Firebase Auth, push) without duplicating native code',
    'Enforce shared-contracts client generation for NestJS API types consumed in Flutter',
    'Escalate UI system forks to design-system agents and chief-architect via ADR when required',
  ],
  'ai-agents/core-engineering/backend/nestjs-architect.md': [
    'Standardize NestJS service layout: modules, controllers, guards, interceptors, health checks',
    'Define inter-service auth patterns (JWT propagation, internal signed tokens, rate limits)',
    'Mandate OpenAPI-first endpoints in packages/shared-contracts before controller implementation',
    'Set PostgreSQL migration and Redis cache conventions per platform-governance/database-rules.md',
    'Coordinate middleware-specialist and api-gateway-bootstrap-agent on cross-cutting edge policies',
    'Review new services/ entries for deduplication against existing auth, user, gateway, realtime catalog',
    'Escalate scaling concerns to postgres-architect, redis-cache-specialist, and socketio-architect',
  ],
  'ai-agents/core-engineering/realtime/socketio-architect.md': [
    'Design Socket.IO namespace and room topology for livestream, social presence, and notifications',
    'Plan Redis adapter horizontal scale for multi-node NestJS realtime-service (port 3009)',
    'Define reconnect, heartbeat, and backpressure policies for poor connectivity on Indian mobile networks',
    'Coordinate livestream-agent and live-comment-agent on event schemas and fan-out patterns',
    'Align Agora/Zego signaling hooks with in-app Socket.IO without duplicating media transport logic',
    'Document room lifecycle: join auth, viewer counts, graceful disconnect, and moderation hooks',
    'Escalate production incident patterns to rollback-coordinator and observability agents',
  ],
  'ai-agents/phase-1/phase-1-service-bootstrap-agent.md': [
    'Kill stale processes on ports 3000, 3001, 3002, 3009 before starting Phase 1 NestJS dev services',
    'Start Docker postgres/redis via docker compose or honor -SkipDocker when containers already healthy',
    'Copy .env.example to .env for auth, user, gateway, and realtime services when files are missing',
    'Launch all four services via phase1-start-services.ps1 and poll /health endpoints until HTTP 200',
    'Run scripts/smoke-test-phase1.ps1 with OTP log capture; retry up to three times on transient failures',
    'Report PASS/FAIL with health JSON and smoke output; leave services running in logs/dev-*.log',
    'Escalate compile or migration failures to phase-1-remediation-agent; full validation to phase-1-autonomous-completion-agent',
  ],
  'apps/livestream-app/agents/core/livestream-agent.md': [
    'Own /v1/livestream/* contract lifecycle: room create/list/start/join/leave/end and viewer counts',
    'Drive services/livestream-service NestJS room state transitions with deterministic idempotency keys',
    'Maintain Agora token bootstrap contract using AGORA_APP_ID env templates only — no secrets in repo',
    'Configure api-gateway proxy routes and JWT-derived headers for livestream endpoints',
    'Emit foundational events (livestream.room.started, livestream.viewer.joined, livestream.room.ended) with schema owners',
    'Coordinate room-lifecycle-manager and viewer-session-agent on join/leave edge cases',
    'Hand off gifts, PK battles, and wallet ledger extensions to Phase 3 agents with backward-compatible contracts',
  ],
  'apps/social-app/agents/social-feed-agent.md': [
    'Own /v1/social/* contracts for posts, feed cursor pagination, comments, follows, and moderation hooks',
    'Guide services/social-service CRUD-lite post flow, comment creation, follow mutation, and report/block stubs',
    'Ensure api-gateway proxies social routes with JWT-derived X-User-Id headers and request-id propagation',
    'Coordinate feed-ranking-agent and feed-architect on ordering inputs for low-bandwidth Android clients',
    'Validate moderation pathways (/social/reports, /social/blocks) and escalate policy changes to trust-safety-agent',
    'Keep packages/shared-contracts, NestJS service behavior, and Flutter feed UI aligned through contract validation gates',
    'Optimize Redis-backed feed hot paths and PostgreSQL pagination for intermittent connectivity',
  ],
  'ai-agents/orchestration/handoff-manager.md': [
    'Track agent-to-agent handoff state: artifacts produced, blockers, and quality-gate sign-off status',
    'Validate handoff packages include governance references, tests, and shared-contracts diffs when applicable',
    'Block merges when downstream agent prerequisites are missing from Dependencies section paths',
    'Coordinate quality-gate and senior-code-review-agent before code enters main branch',
    'Format handoff summaries with explicit owner agent, phase, and escalation path for reviewers',
    'Retry failed handoffs with task-router reassignment when ownership was incorrect',
    'Escalate repeated gate bypass attempts to rollback-coordinator and governance-compliance-agent',
  ],
  'ai-agents/testing/integration-smoke-test-agent.md': [
    'Maintain Phase 1 smoke suite: gateway aggregate health, auth OTP flow, profile CRUD, realtime ping',
    'Define smoke test scripts in scripts/ with exit codes suitable for CI and local-dev-bootstrap-agent',
    'Validate NestJS services on ports 3000–3002 and 3009 respond within SLO during smoke runs',
    'Capture auth OTP from dev logs for automated verify flow without committing secrets',
    'Coordinate phase-1-service-bootstrap-agent on post-start verification checklist',
    'Report FAIL with structured logs pointing to failing service, endpoint, and remediation agent',
    'Escalate contract mismatches to openapi-contract-validation-agent before widening smoke scope',
  ],
  'ai-agents/governance/governance-compliance-agent.md': [
    'Map each task to required platform-governance/ docs (security, API, database, deployment, testing, AI usage)',
    'Block work that duplicates services, bypasses api-gateway, or violates contract-first shared-contracts rules',
    'Produce compliance checklist with pass/fail per governance file before merge or agent invocation',
    'Coordinate agent-skill-validator-agent when agent markdown lacks governance references or boilerplate sections',
    'Escalate architecture forks to docs/adr/ via chief-architect or cto-platform-advisor',
    'Audit services/, apps/, and packages/ scope for secrets, duplicate microservices, and phase ordering',
    'Hand off safe-to-proceed recommendations with explicit blockers for implementation agents',
  ],

  'ai-agents/executive/chief-growth-officer.md': [
    'Own DAU/MAU growth strategy across Social, Livestream, Astro, and Media apps with phase-gated milestones',
    'Design viral loops: referrals, share-deeplink, WhatsApp incentives, and cross-app discovery surfaces',
    'Coordinate growth-ai agents on onboarding experiments, push optimization, and regional campaigns',
    'Set acquisition channel mix (ASO, influencer, paid) with budget-allocation-agent guardrails',
    'Define creator recruitment and content seeding plans for cold-start markets in India',
    'Align retention-funnel-agent and churn-prediction-agent on cohort targets before feature spend',
    'Escalate regulatory or store-policy risks to governance-compliance-agent before campaign launch',
  ],
  'ai-agents/orchestration/quality-gate.md': [
    'Define per-artifact gate checklists: NestJS service, Flutter feature, OpenAPI diff, agent .md update',
    'Block handoffs missing governance refs, tests, shared-contracts updates, or validate-agents pass',
    'Run validate-agents.mjs, validate-agent-skills.mjs, and golden tests on agent catalog PRs',
    'Coordinate openapi-contract-validation-agent before any /v1/* contract merge to main',
    'Trigger integration-smoke-test-agent on Phase 1 service or gateway routing changes',
    'Publish pass/fail reports with blocking reasons and owner agent for remediation',
    'Escalate repeated bypass attempts to rollback-coordinator and governance-compliance-agent',
  ],
  'ai-agents/phase-1/phase-1-autonomous-completion-agent.md': [
    'Orchestrate end-to-end Phase 1 validation: Docker, four NestJS services, smoke, contract checks',
    'Verify auth → gateway → profile → realtime chain with OTP log capture and health JSON evidence',
    'Run validate-agents, validate-agent-skills, validate-all-agent-skills, and golden-agent suite',
    'Produce FINAL-READINESS-REPORT.md deltas with explicit PASS/FAIL per Phase 1 exit criterion',
    'Coordinate phase-1-service-bootstrap-agent and phase-1-remediation-agent on flaky failures',
    'Block Phase 2a Flutter bootstrap until all Phase 1 gates green twice consecutively',
    'Hand off residual blockers to cto-agent and platform-orchestrator with prioritized fix list',
  ],
  'ai-agents/phase-1/phase-1-remediation-agent.md': [
    'Diagnose Phase 1 bootstrap failures: port conflicts, Docker health, NestJS compile, migration errors',
    'Fix gateway proxy misroutes, JWT middleware gaps, and auth OTP dev-log capture issues',
    'Repair Redis session schema mismatches and Postgres migration ordering problems',
    'Patch setup-phase1.ps1 and phase1-start-services.ps1 without breaking Windows dev parity',
    'Document root cause and minimal diff; avoid scope creep into Phase 2 features',
    'Re-run smoke-test-phase1.ps1 after each fix until PASS or explicit escalation',
    'Escalate architectural blockers to phase-1-autonomous-completion-agent and nestjs-architect',
  ],
  'ai-agents/core-engineering/backend/api-gateway-agent.md': [
    'Own production api-gateway policies beyond Phase 1 bootstrap: routing tables, WAF, canary deploys',
    'Govern /v1/* path namespaces, upstream timeouts, circuit breakers, and correlation ID propagation',
    'Standardize JWT validation, rate limits, and public route allowlists across all microservices',
    'Coordinate api-gateway-bootstrap-agent on dev/staging/prod parity and env-specific upstream URLs',
    'Define blue/green and canary rollout checklists with observability-agent dashboards',
    'Review new service registrations for duplicate paths and gateway bypass anti-patterns',
    'Escalate DDoS and bot spikes to enterprise-security agents with emergency rate-limit runbooks',
  ],
  'ai-agents/core-engineering/realtime/realtime-systems-agent.md': [
    'Own platform-wide realtime architecture: Socket.IO, Redis pub/sub, presence, and notification fan-out',
    'Set SLOs for message latency, reconnect success, and concurrent connection ceilings per app',
    'Coordinate socketio-architect on namespace design and livestream-agent on hot-room sharding',
    'Plan Kafka/Pulsar adoption path for analytics events without blocking Phase 1 Socket.IO MVP',
    'Define chaos tests: Redis adapter partition, reconnect storms, and backpressure degradation',
    'Align games-socket-sync-agent and social presence on shared realtime-service (port 3009)',
    'Escalate production realtime incidents to incident-commander-agent with rollback playbooks',
  ],
  'ai-agents/core-engineering/database/postgres-architect.md': [
    'Own PostgreSQL schema strategy: migrations, indexing, partitioning, and read-replica lag policies',
    'Review wallet, social graph, and livestream tables for transactional integrity and hot-row contention',
    'Define migration-manager conventions: reversible migrations, zero-downtime expand-contract patterns',
    'Set connection pool sizing per service and environment per database-rules.md',
    'Coordinate query-optimization-agent on EXPLAIN plans for feed, wallet, and room list queries',
    'Plan multi-region read replicas and failover RPO/RTO with chief-architect ADR sign-off',
    'Escalate data corruption or migration failures to rollback-coordinator and incident-commander-agent',
  ],
  'ai-agents/core-engineering/database/redis-cache-specialist.md': [
    'Own Redis key naming, TTL policies, and memory eviction strategy across auth, feed, and presence',
    'Design session, OTP cooldown, rate-limit, and feed cache schemas with cluster hash-tag rules',
    'Coordinate auth-service-agent on refresh token families and session invalidation storms',
    'Prevent cache stampede with probabilistic early expiration and request coalescing patterns',
    'Monitor memory pressure, hit ratio, and slowlog; alert before OOM on festival traffic spikes',
    'Align Socket.IO Redis adapter slot distribution with horizontal realtime scale plan',
    'Escalate cluster failover drills to realtime-systems-agent and chaos-engineering-agent',
  ],
  'ai-agents/economy/wallet-agent.md': [
    'Own virtual wallet ledger: idempotent credit/debit, balance snapshots, and audit trail in PostgreSQL',
    'Define packages/shared-contracts/wallet/v1 for balance, transfer, hold, and payout stubs',
    'Integrate Razorpay/Stripe webhooks via NestJS with secrets in AWS Secrets Manager only',
    'Implement velocity limits, fraud holds, and reconciliation jobs with wallet-ledger-agent',
    'Coordinate gift-conversion-agent and livestream tipping without duplicate economy microservices',
    'Support cross-app wallet sync per cross-app-wallet-sync governance patterns',
    'Escalate PCI, KYC, and RBI compliance questions to governance-compliance-agent and tax-compliance-agent',
  ],
  'ai-agents/safety/trust-safety-agent.md': [
    'Own platform trust & safety policy across Social, Livestream, Astro, and Media surfaces',
    'Define report/block flows, escalation tiers, and shadow-ban coordination with community-governance agents',
    'Integrate ai-moderation-agent hooks for NSFW, harassment, and spam classifiers on UGC pipelines',
    'Coordinate csam-detection-agent and deepfake-detection-agent on media upload and livestream frames',
    'Publish creator and host reputation scores with appeal-review-agent workflows',
    'Align regional compliance (India IT Rules) with content-policy-agent and age-gate-agent',
    'Escalate law-enforcement or child-safety incidents to chief-safety-officer and incident-commander-agent',
  ],
  'apps/livestream-app/agents/multi-guest/pk-battle-agent.md': [
    'Own PK battle state machine: challenge, accept, countdown, score window, forfeit, and rematch flows',
    'Define /v1/livestream/pk/* contracts extending room lifecycle without breaking v1 livestream APIs',
    'Sync dual-room viewer counts and gift-weighted scores via Socket.IO with idempotent event keys',
    'Coordinate co-host-manager and seat-management-agent on guest slot transitions during PK',
    'Handle tie-breakers, disconnect grace periods, and anti-cheat score validation server-side',
    'Integrate wallet-agent for PK wagers and gift multipliers with saga rollback on payout failure',
    'Load test hot PK finals at 2x expected concurrent viewers; escalate to livestream-scaling-agent',
  ],
  'apps/social-app/agents/dm-messaging-agent.md': [
    'Own /v1/social/dm/* contracts: thread list, send message, read receipts, and block enforcement',
    'Design E2E-ready message schema with server-side encryption hooks and media attachment refs (S3 keys)',
    'Implement typing indicators and delivery acks via socketio-architect DM namespaces',
    'Enforce block/mute graph checks on every send; propagate trust-safety-agent policy updates',
    'Optimize offline queue and sync for poor connectivity on Indian Android devices',
    'Paginate thread history with cursor keys; Redis cache hot threads with short TTL',
    'Coordinate notification-agent on push for new DM without leaking message content in payload',
  ],
  'apps/astro-app/consultation-agent.md': [
    'Own paid consultation booking: astrologer availability, session slots, and Razorpay checkout flow',
    'Define /v1/astro/consultations/* contracts with disclaimer, recording consent, and refund policy fields',
    'Integrate Agora audio/video rooms for live consultations with session timer and auto-end rules',
    'Coordinate astrologer-ranking-agent and session-booking-agent on discovery and calendar sync',
    'Apply sensitive-conversation-agent and astro-disclaimer-compliance copy on every booking screen',
    'Store consultation metadata in PostgreSQL; never log birth chart PII in application logs',
    'Escalate medical/financial advice boundary violations to trust-safety-agent and content-policy-agent',
  ],
  'apps/media-app/ott-streaming-agent.md': [
    'Own HLS/DASH adaptive playback in Flutter Media app with offline download quota enforcement',
    'Define /v1/media/stream/* entitlement checks tied to subscription-tier-agent and wallet credits',
    'Integrate Cloudflare CDN signed URLs and S3 origin failover per media-cdn-optimizer patterns',
    'Coordinate transcoding-pipeline-agent on ladder generation and thumbnail sprite reuse',
    'Implement continue-watching and watch-history-agent hooks with privacy-preserving progress events',
    'Support parental-controls-agent and drm-protection-agent stubs before premium content GA',
    'Load test concurrent VOD starts during campaign launches; escalate to media-cdn-optimizer',
  ],
  'ai-agents/games/ludo-agent.md': [
    'Own server-authoritative Ludo rules engine: dice RNG audit log, turn order, and win detection',
    'Define /v1/games/ludo/* matchmaking, move, and forfeit contracts in packages/shared-contracts',
    'Build Flutter board UI with CustomPainter optimized for 320dp width and one-hand play',
    'Integrate games-socket-sync-agent for move broadcast and reconnect state recovery',
    'Support optional coin-table entry via wallet-agent with idempotent match settlement',
    'Coordinate games-fair-play-agent on dice distribution audits and bot detection',
    'Load test 10k concurrent quick-match queues; hand off tournament mode to games-tournament-agent',
  ],
  'ai-agents/meta/agent-registry-auditor-agent.md': [
    'Audit ai-agents/AGENT-REGISTRY.md for stale paths, duplicate slugs, and missing @-mention targets',
    'Run validate-agents.mjs and golden-agent tests after bulk agent catalog changes',
    'Detect orphan agent .md files not listed in registry and propose registry or deletion ADR',
    'Verify ## Dependencies paths resolve to existing agent files across ai-agents/ and apps/',
    'Coordinate agent-skill-validator-agent on Skills section paths and boilerplate Responsibilities',
    'Report catalog health score and top 20 agents needing responsibility or skill enrichment',
    'Escalate registry schema changes to governance-compliance-agent and platform-orchestrator',
  ],
  'ai-agents/meta/agent-catalog-maintenance-agent.md': [
    'Run generate-agent-skills.mjs and enrich-agent-responsibilities.mjs after catalog edits',
    'Hand-enrich priority agents when advanced SKILL.md competency sections fall below 500 chars',
    'Execute validate-agents, validate-agent-skills, and validate-all-agent-skills before commits',
    'Stage only catalog paths: ai-agents/, apps/**/agents/, .cursor/skills/stream-heaven/, agent scripts',
    'Exclude phase1-runtime-log.txt, apps/mobile/**, and unrelated bootstrap .ps1 from commits',
    'Update agent-skill-enrichments.mjs and agent-responsibility-templates.mjs for golden agents',
    'Regenerate agent-skill-manifest.mjs via generate-agent-skills.mjs --manifest --force',
    'Coordinate agent-registry-auditor-agent on registry drift after new agent registration',
  ],
  'ai-agents/orchestration/senior-code-review-agent.md': [
    'Review PRs for NestJS, Flutter, and shared-contracts changes against platform-governance standards',
    'Block merges with duplicate services, secrets in code, or undocumented API surface changes',
    'Require ADR links for architecture forks and quality-gate sign-off for production paths',
    'Check test coverage on auth, wallet, and realtime critical paths before approval',
    'Coordinate system-design-reviewer-agent on cross-service dependency and scaling concerns',
    'Enforce smallest correct diff; reject drive-by refactors unrelated to PR scope',
    'Escalate repeated quality regressions to rollback-coordinator and cto-agent',
  ],
};

const KEYWORD_GENERATORS = [
  {
    test: (ctx) => /auth|otp|jwt|firebase|login|session|identity|sso/.test(ctx.slug),
    gen: (ctx) => authBullets(ctx),
  },
  {
    test: (ctx) => /gateway|proxy|edge|routing|bootstrap/.test(ctx.slug) && !/feed|routing-specialist/.test(ctx.slug),
    gen: (ctx) => gatewayBullets(ctx),
  },
  {
    test: (ctx) => /profile|user-service|users/.test(ctx.slug),
    gen: (ctx) => profileBullets(ctx),
  },
  {
    test: (ctx) => /flutter|riverpod|widget|routing-specialist|go-router/.test(ctx.slug),
    gen: (ctx) => flutterBullets(ctx),
  },
  {
    test: (ctx) => /nestjs|middleware|backend/.test(ctx.slug),
    gen: (ctx) => nestjsBullets(ctx),
  },
  {
    test: (ctx) => /socket|realtime|websocket|presence/.test(ctx.slug),
    gen: (ctx) => realtimeBullets(ctx),
  },
  {
    test: (ctx) => /postgres|database|redis|cache|migration|sql/.test(ctx.slug),
    gen: (ctx) => databaseBullets(ctx),
  },
  {
    test: (ctx) => /test|smoke|qa|validation|e2e|contract/.test(ctx.slug),
    gen: (ctx) => testingBullets(ctx),
  },
  {
    test: (ctx) => /livestream|live-|stream-|agora|zego|encoder|bitrate|video-buffer|watch-session/.test(ctx.slug),
    gen: (ctx) => livestreamBullets(ctx),
  },
  {
    test: (ctx) => /social|feed|post|comment|follow|share/.test(ctx.slug),
    gen: (ctx) => socialBullets(ctx),
  },
  {
    test: (ctx) => /game|tournament|leaderboard|matchmaking/.test(ctx.slug),
    gen: (ctx) => gamesBullets(ctx),
  },
  {
    test: (ctx) => /wallet|payment|payout|ledger|billing|token-economy/.test(ctx.slug),
    gen: (ctx) => paymentsBullets(ctx),
  },
  {
    test: (ctx) => /safety|trust|moderation|content-safety|abuse/.test(ctx.slug),
    gen: (ctx) => safetyBullets(ctx),
  },
  {
    test: (ctx) => /security|ddos|zero-trust|penetration|waf/.test(ctx.slug),
    gen: (ctx) => securityBullets(ctx),
  },
  {
    test: (ctx) => /ml|embedding|recommend|ranking|inference|model/.test(ctx.slug),
    gen: (ctx) => mlBullets(ctx),
  },
  {
    test: (ctx) => /growth|seo|campaign|referral|incentive|store/.test(ctx.slug),
    gen: (ctx) => growthBullets(ctx),
  },
  {
    test: (ctx) => /astro|horoscope|chart|panchang/.test(ctx.slug),
    gen: (ctx) => astroBullets(ctx),
  },
  {
    test: (ctx) => /media|ott|vod|transcode|cdn/.test(ctx.slug),
    gen: (ctx) => mediaBullets(ctx),
  },
  {
    test: (ctx) => /web3|wallet-connect|nft|blockchain|crypto/.test(ctx.slug),
    gen: (ctx) => web3Bullets(ctx),
  },
  {
    test: (ctx) => /ad-|ads|monetization|sponsor/.test(ctx.slug),
    gen: (ctx) => adsBullets(ctx),
  },
  {
    test: (ctx) => /observability|monitor|metric|log|trace|slo/.test(ctx.slug),
    gen: (ctx) => observabilityBullets(ctx),
  },
  {
    test: (ctx) => /k8s|kubernetes|infra|deploy|terraform|aws|cloudflare/.test(ctx.slug),
    gen: (ctx) => infrastructureBullets(ctx),
  },
  {
    test: (ctx) => /orchestr|workflow|handoff|pipeline|scheduler|router|quality-gate|rollback/.test(ctx.slug),
    gen: (ctx) => orchestrationBullets(ctx),
  },
  {
    test: (ctx) => /executive|chief-|ceo-|cto-|cpo-|cfo-|coo-|board-|okr|strategy|vision/.test(ctx.slug),
    gen: (ctx) => executiveBullets(ctx),
  },
  {
    test: (ctx) => /governance|compliance|policy|legal/.test(ctx.slug),
    gen: (ctx) => governanceBullets(ctx),
  },
];

const DOMAIN_GENERATORS = {
  executive: executiveBullets,
  orchestration: orchestrationBullets,
  'master-brain': masterBrainBullets,
  'phase-1': phase1Bullets,
  'phase-2': phaseBullets,
  'phase-2a': phaseBullets,
  frontend: flutterBullets,
  backend: nestjsBullets,
  realtime: realtimeBullets,
  database: databaseBullets,
  infrastructure: infrastructureBullets,
  testing: testingBullets,
  games: gamesBullets,
  social: socialBullets,
  livestream: livestreamBullets,
  media: mediaBullets,
  astro: astroBullets,
  safety: safetyBullets,
  security: securityBullets,
  governance: governanceBullets,
  growth: growthBullets,
  ml: mlBullets,
  web3: web3Bullets,
  ads: adsBullets,
  observability: observabilityBullets,
  reliability: observabilityBullets,
  identity: authBullets,
  payments: paymentsBullets,
  content: mediaBullets,
  analytics: analyticsBullets,
  search: mlBullets,
  compliance: governanceBullets,
  data: databaseBullets,
  ai: mlBullets,
  ux: flutterBullets,
  apps: appsBullets,
  general: fallbackBullets,
};

function baseCtx(ctx) {
  const tokens = slugTokens(ctx.slug);
  return {
    ...ctx,
    tokens,
    focus: humanize(tokens) || ctx.title,
    phaseLabel: ctx.phase && ctx.phase !== '—' ? `Phase ${ctx.phase}` : 'active phase',
    escalation: pickDependencyEscalation(ctx),
  };
}

function authBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Implement ${c.focus} flows in NestJS auth-service with Firebase Admin SDK verification`,
    `Define OTP, JWT access/refresh, and Redis session rotation in packages/shared-contracts/auth/v1`,
    `Wire api-gateway JWT guards and rate limits on /auth/* per security-rules.md`,
    `Support Indian +E.164 phone OTP with provider abstraction; no secrets in repo — env templates only`,
    `Coordinate unified-auth-agent for SSO Phase 2 without breaking v1 contracts`,
    `Document brute-force mitigation, device trust hooks, and audit log requirements`,
    c.escalation,
  ];
}

function gatewayBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Bootstrap NestJS api-gateway (port 3000) routing for ${c.focus} and Phase 1 service prefixes`,
    `Configure JWT validation middleware using auth-service public keys before upstream proxy calls`,
    `Add Redis-backed rate limiting per IP and authenticated user tier with 429 Retry-After responses`,
    `Propagate trace IDs and X-User-Id headers to downstream NestJS services`,
    `Aggregate OpenAPI from packages/shared-contracts for gateway route map documentation`,
    `Keep gateway free of business logic — proxy, guards, and cross-cutting concerns only`,
    c.escalation,
  ];
}

function profileBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Scaffold NestJS user-service (port 3002) PostgreSQL schema for profiles, handles, and privacy flags`,
    `Expose profile CRUD consumed by social-app and livestream-app via packages/shared-contracts/users/v1`,
    `Implement S3 presigned avatar upload flow with Cloudflare CDN URL variants`,
    `Cache hot profile reads in Redis; link records to auth JWT sub claim without duplicate auth logic`,
    `Enforce handle regex, PII encryption at rest, and soft-delete per database-rules.md`,
    `Coordinate content-safety-agent on avatar and bio moderation hooks`,
    c.escalation,
  ];
}

function flutterBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Implement ${c.focus} in Flutter using Riverpod state and GoRouter navigation per flutter-ui-rules.md`,
    `Optimize list scrolling, image caching, and offline-first UX for low-end Android and poor connectivity`,
    `Consume generated API clients from packages/shared-contracts for NestJS backend types`,
    `Apply regional language support (English, Hindi, Telugu, Tamil, and south/north Indian locales)`,
    `Coordinate design-system tokens and widget-library-curator for consistent four-app UI patterns`,
    `Integrate Firebase Auth session and Socket.IO realtime without duplicating platform-channel code`,
    c.escalation,
  ];
}

function nestjsBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Scaffold or extend NestJS modules for ${c.focus} with health checks and structured logging`,
    `Publish OpenAPI contracts in packages/shared-contracts before controller implementation`,
    `Use PostgreSQL for durable state and Redis for cache, sessions, or rate limits as appropriate`,
    `Apply guards, validation pipes, and idempotency keys on mutation endpoints`,
    `Align with api-gateway routing and inter-service JWT propagation standards`,
    `Avoid duplicate services/ entries — extend existing auth, user, gateway, or realtime catalog first`,
    c.escalation,
  ];
}

function realtimeBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Design Socket.IO namespaces and Redis adapter scale plan for ${c.focus}`,
    `Define reconnect, heartbeat, and backpressure handling for intermittent mobile connectivity`,
    `Align event schemas with packages/shared-contracts and livestream/social domain owners`,
    `Separate signaling (Socket.IO) from Agora/Zego media transport responsibilities`,
    `Implement room join auth, presence, and moderation hooks on NestJS realtime-service (port 3009)`,
    `Load-test concurrent joins and fan-out against scaling-playbook targets`,
    c.escalation,
  ];
}

function databaseBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Design PostgreSQL schemas, indexes, and migrations for ${c.focus} with rollback plans`,
    `Define Redis key patterns, TTL policies, and cache invalidation for hot read paths`,
    `Enforce database-rules.md: FK integrity, soft-delete, and PII encryption where required`,
    `Review query plans for feed, live room, and wallet ledger access patterns`,
    `Coordinate postgres-architect and redis-cache-specialist on cluster sizing and failover`,
    `Document migration handoff for NestJS services consuming shared-contracts types`,
    c.escalation,
  ];
}

function testingBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Define automated tests for ${c.focus}: unit, integration, contract, and smoke layers`,
    `Maintain scripts/ test entry points with CI-friendly exit codes and structured failure output`,
    `Validate NestJS, Flutter, PostgreSQL, and Redis behavior against acceptance criteria`,
    `Run openapi-contract-validation-agent gates before approving API merges`,
    `Coordinate integration-smoke-test-agent on Phase 1 gateway → auth → profile chains`,
    `Report FAIL with owner agent, endpoint, and remediation steps — no silent skips`,
    c.escalation,
  ];
}

function livestreamBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Own livestream domain contracts and NestJS livestream-service behavior for ${c.focus}`,
    `Manage room lifecycle, viewer counts, and Agora/Zego token bootstrap via env templates only`,
    `Configure api-gateway /v1/livestream/* proxy routes with JWT header propagation`,
    `Emit versioned events (room.started, viewer.joined, room.ended) for Socket.IO and analytics pipelines`,
    `Optimize adaptive bitrate and buffering for low-end Android on poor Indian networks`,
    `Coordinate gift, PK battle, and wallet agents without breaking backward-compatible contracts`,
    c.escalation,
  ];
}

function socialBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Define /v1/social/* OpenAPI contracts for ${c.focus} with cursor pagination and moderation hooks`,
    `Guide services/social-service NestJS implementation aligned with packages/shared-contracts`,
    `Ensure api-gateway proxies social routes with JWT-derived identity headers`,
    `Coordinate feed-ranking and recommendation agents for low-bandwidth feed composition`,
    `Validate report/block pathways and escalate policy changes to trust-safety-agent`,
    `Keep Flutter social-app UI, Redis hot paths, and PostgreSQL storage consistent through contract tests`,
    c.escalation,
  ];
}

function gamesBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Implement ${c.focus} game logic with NestJS APIs and Flutter client flows per games domain standards`,
    `Define anti-cheat hooks, matchmaking fairness, and leaderboard idempotency in shared-contracts`,
    `Use Redis for real-time match state and PostgreSQL for durable progression and audit trails`,
    `Apply rate limits and Socket.IO event schemas for tournament and live room crossover features`,
    `Coordinate wallet and gift agents on reward payouts without duplicate ledger services`,
    `Load-test tournament finals and escalate abuse patterns to safety agents`,
    c.escalation,
  ];
}

function paymentsBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Design ${c.focus} flows with idempotent ledger entries and PostgreSQL transactional integrity`,
    `Define wallet, payout, and billing contracts in packages/shared-contracts with audit trails`,
    `Integrate payment provider webhooks via NestJS with secrets in AWS Secrets Manager only`,
    `Apply fraud checks, velocity limits, and reconciliation jobs per security-rules.md`,
    `Coordinate creator-economy and gift agents without duplicating wallet microservices`,
    `Escalate PCI, KYC, and regulatory questions to governance-compliance-agent and platform-finance agents`,
    c.escalation,
  ];
}

function safetyBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Define moderation policies and enforcement hooks for ${c.focus} across social and livestream surfaces`,
    `Implement report, block, and trust-score pathways in NestJS with PostgreSQL audit logs`,
    `Coordinate ML moderation agents with human-in-the-loop review queues per ai-usage-rules.md`,
    `Block content distribution via Redis flag propagation and Socket.IO room moderation events`,
    `Align with incident-severity-rules.md for escalation timelines and user communication templates`,
    `Hand off legal and compliance edge cases to governance-compliance-agent with evidence packages`,
    c.escalation,
  ];
}

function securityBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Threat-model ${c.focus} attack surfaces across NestJS APIs, Flutter clients, and Socket.IO channels`,
    `Define WAF, rate limit, and zero-trust policies coordinated with api-gateway and auth-service`,
    `Mandate dependency scanning, SBOM, and penetration-test gates before wallet or payout GA`,
    `Review secrets handling: AWS Secrets Manager and env templates — never commit credentials`,
    `Coordinate enterprise-security agents on DDoS, bot mitigation, and internal service auth`,
    `Document security incidents with rollback-coordinator and incident-commander-agent runbooks`,
    c.escalation,
  ];
}

function mlBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Design ${c.focus} ML pipelines: feature store, training jobs, inference endpoints, and fallbacks`,
    `Define event ingestion from PostgreSQL and Redis streams into embedding and ranking services`,
    `Set inference cost budgets, caching, and model distillation per cost-control-rules.md`,
    `Coordinate human-in-the-loop review for recommendations, moderation, and Astro insights`,
    `Publish model versioning, rollback, and A/B flag plans aligned with decision-engine`,
    `Validate offline/online metric gates before production rollout on Indian market traffic`,
    c.escalation,
  ];
}

function growthBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Design ${c.focus} growth loops: referrals, campaigns, store ASO, and share incentives with measurable KPIs`,
    `Implement NestJS growth APIs and Flutter surfaces optimized for low-data first launches`,
    `Track funnel events into analytics pipelines without PII leakage per security-rules.md`,
    `Coordinate store-growth and social-share agents on cross-app attribution and deep links`,
    `Run experiments with feature flags and statistical guardrails before full rollout`,
    `Escalate policy-sensitive campaigns to governance-compliance-agent and chief-growth-officer`,
    c.escalation,
  ];
}

function astroBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Implement ${c.focus} features in Flutter astro-app with regional language chart copy and UX`,
    `Define NestJS astro APIs and packages/shared-contracts schemas for horoscope, chart, and panchang data`,
    `Cache computed chart outputs in Redis; store user preferences in PostgreSQL with privacy controls`,
    `Coordinate content curators on culturally accurate copy for Indian languages and festivals`,
    `Apply disclaimer and safety copy for non-medical, non-financial guidance per feature-approval-rules.md`,
    `Integrate shared identity from auth-service without duplicating profile microservices`,
    c.escalation,
  ];
}

function mediaBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Own ${c.focus} media pipeline: ingest, transcode, CDN delivery, and playback in Media (OTT) app`,
    `Define contracts for VOD catalogs, entitlements, and adaptive streaming via Cloudflare and AWS S3`,
    `Optimize transcoding cost and thumbnail reuse per cost-control-rules.md and scaling-playbook.md`,
    `Coordinate livestream recording agents without duplicating object storage services`,
    `Implement Flutter playback with offline download limits for low-end Android storage constraints`,
    `Validate DRM, geo, and parental control hooks with governance-compliance-agent when applicable`,
    c.escalation,
  ];
}

function web3Bullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Design ${c.focus} web3 integrations with wallet-connect flows and explicit user consent UX`,
    `Define token economy contracts in packages/shared-contracts with audit trails and rollback plans`,
    `Keep private keys and chain RPC secrets out of repo; use env templates and HSM patterns`,
    `Coordinate wallet-service and creator-economy agents without duplicate ledger microservices`,
    `Apply fraud, sybil, and smart-contract risk review before enabling withdraw or trade features`,
    `Escalate regulatory uncertainty to governance-compliance-agent and cfo-finance-advisor`,
    c.escalation,
  ];
}

function adsBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Implement ${c.focus} ad insertion, targeting, and measurement with NestJS ad-network services`,
    `Define ad slot contracts for social feed, livestream overlays, and media pre-roll in shared-contracts`,
    `Enforce brand safety, frequency caps, and child-audience rules per security and feature-approval docs`,
    `Track impressions and spend in PostgreSQL with Redis real-time counters for pacing`,
    `Coordinate monetization agents without degrading low-end Android scroll or live latency SLOs`,
    `Escalate policy exceptions to chief-growth-officer and governance-compliance-agent`,
    c.escalation,
  ];
}

function observabilityBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Define RED metrics, structured logs, and distributed traces for ${c.focus} across NestJS and Flutter`,
    `Build dashboards and alerts aligned with SLO targets in scaling-playbook and incident-severity-rules.md`,
    `Instrument api-gateway, auth, realtime Socket.IO, and PostgreSQL slow-query paths`,
    `Coordinate rollback-coordinator and incident-commander-agent on production alert runbooks`,
    `Validate observability hooks are present before quality-gate approves service GA`,
    `Post-incident review templates with action items tracked in ADRs or engineering tickets`,
    c.escalation,
  ];
}

function infrastructureBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Design AWS and Cloudflare topology for ${c.focus}: compute, CDN, WAF, and Secrets Manager usage`,
    `Maintain IaC manifests and GitOps flows for NestJS services on EKS/ECS with zero-downtime deploys`,
    `Plan PostgreSQL (Neon) and Redis cluster strategy per environment with disaster recovery RPO/RTO`,
    `Coordinate kubernetes-agent and local-dev-bootstrap-agent on dev/staging/prod parity`,
    `Enforce deployment-rules.md and production-readiness-checklist.md before traffic cutover`,
    `Document rollback paths with rollback-coordinator for gateway and realtime deploys`,
    c.escalation,
  ];
}

function orchestrationBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Orchestrate ${c.focus} workflows across ai-agents/ with explicit task ownership and phase gates`,
    `Route tasks via AGENT-REGISTRY.md; block duplicate agent assignments and governance violations`,
    `Run quality-gate checks before handoff-manager merges deliverables into the monorepo`,
    `Track dependency chains across NestJS services, shared-contracts, and Flutter feature work`,
    `Support rollback-coordinator paths when gate failures affect production or release scope`,
    `Document workflow state, blockers, and escalation paths for downstream reviewers`,
    `Coordinate platform-orchestrator on ambiguous cross-domain ownership conflicts`,
  ];
}

function executiveBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Provide executive guidance for ${c.focus} across Social, Livestream, Astro, and Media strategic priorities`,
    `Review phase gates, resource allocation, and OKR alignment before major platform investments`,
    `Arbitrate cross-functional tradeoffs: velocity, cost, safety, and Indian market reach`,
    `Mandate platform-governance compliance and ADR review for architecture or vendor forks`,
    `Coordinate chief-architect, cto-platform-advisor, and platform-orchestrator on platform-wide initiatives`,
    `Define risk escalation to chief-safety-officer, cfo-finance-advisor, and enterprise-security agents`,
    `Publish decision memos, handoff artifacts, and board-ready summaries for downstream agents`,
  ];
}

function masterBrainBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Synthesize cross-domain context for ${c.focus} from AGENT-REGISTRY.md, governance, and active roadmaps`,
    `Decompose ambiguous goals into phased agent task graphs with decision-engine conflict resolution`,
    `Prioritize foundation phases before feature expansion in social, livestream, games, or web3 domains`,
    `Route work through task-router with governance-compliance-agent gates on services/ and contracts/`,
    `Maintain priority queues and dependency awareness across hundreds of domain agents`,
    `Report master-plan status with explicit blockers and recommended owner agents`,
    `Escalate executive decisions to cto-platform-advisor and chief-architect when scope crosses phases`,
  ];
}

function governanceBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Audit ${c.focus} work against platform-governance/ docs before implementation or merge approval`,
    `Produce compliance matrices mapping tasks to security, API, database, deployment, and AI usage rules`,
    `Block duplicate services, missing shared-contracts updates, and secrets committed to the repo`,
    `Coordinate agent-skill-validator-agent on agent markdown quality and governance reference coverage`,
    `Recommend ADR paths via chief-architect when policies cannot be met without exception`,
    `Hand off remediation steps to domain implementation agents with explicit safe-to-proceed status`,
    c.escalation,
  ];
}

function phase1Bullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Deliver Phase 1 foundation for ${c.focus}: auth, profile, gateway, and realtime bootstrap readiness`,
    `Scaffold NestJS services with packages/shared-contracts OpenAPI before business logic expansion`,
    `Wire api-gateway routes, JWT validation, Redis sessions, and PostgreSQL migrations in order`,
    `Run integration-smoke-test-agent suites after service health checks pass on Windows dev flows`,
    `Coordinate governance-compliance-agent before merging any services/ or contracts/ changes`,
    `Document handoff checklists for downstream Phase 2 agents without duplicating microservices`,
    c.escalation,
  ];
}

function phaseBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Execute ${c.phaseLabel} deliverables for ${c.focus} aligned with platform roadmap milestones`,
    `Define contracts in packages/shared-contracts before NestJS or Flutter implementation begins`,
    `Validate dependencies against existing services/ catalog to prevent duplicate microservices`,
    `Apply platform-governance standards for API, security, database, and Flutter UI surfaces`,
    `Produce integration notes, test strategy, and observability hooks for quality-gate review`,
    `Optimize for Indian market constraints: low-end Android, regional languages, poor connectivity`,
    c.escalation,
  ];
}

function analyticsBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Design ${c.focus} event pipelines from NestJS, Flutter, and Socket.IO into PostgreSQL analytics stores`,
    `Define schema contracts for impressions, retention, live minutes, and revenue metrics in shared-contracts`,
    `Apply PII minimization, sampling, and cost controls per cost-control-rules.md on high-volume events`,
    `Build dashboards and batch jobs with Redis caching for near-real-time product metrics`,
    `Coordinate data-platform agents on warehouse exports without duplicating ingestion services`,
    `Validate data quality gates before executive and growth agents consume metrics for decisions`,
    c.escalation,
  ];
}

function appsBullets(ctx) {
  const c = baseCtx(ctx);
  const app = c.domain.includes('social')
    ? 'social-app'
    : c.domain.includes('livestream')
      ? 'livestream-app'
      : c.domain.includes('astro')
        ? 'astro-app'
        : c.domain.includes('media')
          ? 'media-app'
          : 'apps/mobile';
  return [
    `Own ${c.focus} features in ${app} Flutter client and coordinating NestJS backend contracts`,
    `Implement Riverpod state, GoRouter navigation, and offline-first UX per flutter-ui-rules.md`,
    `Consume packages/shared-contracts APIs via api-gateway with Firebase Auth session integration`,
    `Coordinate domain agents under apps/${app}/agents/ without duplicating services/ microservices`,
    `Apply regional language, low-end Android performance, and intermittent connectivity optimizations`,
    `Validate moderation, safety, and analytics hooks before feature GA in Indian market rollout`,
    c.escalation,
  ];
}

function fallbackBullets(ctx) {
  const c = baseCtx(ctx);
  return [
    `Own ${c.focus} deliverables in ${c.domainLabel} domain for Stream Heaven ${c.phaseLabel}`,
    `Define or update packages/shared-contracts schemas before NestJS, Flutter, or Socket.IO implementation`,
    `Apply platform-governance standards for API, security, database, deployment, and testing surfaces`,
    `Integrate with PostgreSQL durable state, Redis cache/session layers, and AWS/Cloudflare where applicable`,
    `Produce implementation plans, test strategy, acceptance criteria, and observability hooks for quality-gate`,
    `Optimize for Indian market: low-end Android devices, regional languages, and intermittent connectivity`,
    c.escalation,
  ];
}

/**
 * Generate 5–8 domain-specific responsibility bullets for an agent.
 * @param {object} ctx - { agentRel, slug, title, domain, domainLabel, category, phase, role, content }
 * @returns {string[]}
 */
export function generateResponsibilities(ctx) {
  if (SLUG_OVERRIDES[ctx.agentRel]) {
    return SLUG_OVERRIDES[ctx.agentRel].slice(0, 8);
  }

  for (const rule of KEYWORD_GENERATORS) {
    if (rule.test(ctx)) {
      return rule.gen(ctx).slice(0, 8);
    }
  }

  const domainGen = DOMAIN_GENERATORS[ctx.category] ?? DOMAIN_GENERATORS.general;
  return domainGen(ctx).slice(0, 8);
}
