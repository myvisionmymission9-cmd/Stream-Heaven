#!/usr/bin/env node
/** Builds scripts/agent-gap-definitions.json for fill-agent-gaps.mjs */
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), 'agent-gap-definitions.json');

function b(topic, lines) {
  return lines.map((t) => t.replace(/\{topic\}/g, topic));
}

function mk(file, phase, domain, role, responsibilities, dependencies = [], extra = {}) {
  return { file, phase, domain, role, responsibilities, dependencies, ...extra };
}

const specs = [];
const L = (f, d) => `apps/livestream-app/agents/${f}`;
const G = (f) => `ai-agents/gift-effects/${f}`;
const I = (f) => `ai-agents/identity-platform/${f}`;
const E = (f) => `ai-agents/event-system/${f}`;
const M = (f) => `ai-agents/agent-memory/${f}`;
const S = (f) => `ai-agents/safety/${f}`;
const T = (f) => `ai-agents/testing/${f}`;
const C = (f) => `ai-agents/core-engineering/${f}`;

function addBatch(base, phase, domain, entries, bulletLines, deps) {
  for (const [slug, role] of entries) {
    specs.push(mk(`${base}/${slug}.md`, phase, domain, role + '.', b(slug, bulletLines), deps));
  }
}

// Phase 9 core (detailed roles)
const coreAgents = [
  [
    L('core/livestream-agent.md'),
    9,
    'livestream-app',
    'Owns end-to-end live room lifecycle — go-live, viewer join, graceful end, and cross-app handoff.',
    [
      'Define room state machine (scheduled, live, paused, ended) with NestJS and Redis locks',
      'Wire Agora/Zego channel lifecycle with auth-service token minting',
      'Expose OpenAPI for host start/stop and viewer counts',
      'Coordinate viewer-session-agent for presence on flaky networks',
      'Alert stream-health-monitor on encoder stalls',
      'Route monetization to creator-monetization-agent',
    ],
    [L('core/room-lifecycle-manager.md'), L('core/viewer-session-agent.md')],
  ],
  [
    L('core/audio-room-agent.md'),
    9,
    'livestream-app',
    'Audio-only live rooms with seat maps, mute policies, and low-bandwidth profiles.',
    [
      'Model speaker/listener seats separate from video stage',
      'RTC audio-only profiles with Bluetooth routing on Flutter',
      'Raise-hand flows with seat-management-agent',
      'Throttle speakers via audio-mix-coordinator',
      'Redis discovery metadata with idle TTL',
      'Enforce age-gate before join',
    ],
    [L('multi-guest/seat-management-agent.md'), 'ai-agents/safety/age-gate-agent.md'],
  ],
  [
    L('core/creator-monetization-agent.md'),
    9,
    'livestream-app',
    'Creator earnings — gifts, tips, subscriptions, and payout reconciliation.',
    [
      'Idempotent gift/tip ledger to wallet-service',
      'Regional revenue share and tax hooks',
      'Real-time earnings UI off RTC thread',
      'Coordinate high-spender-agent policies',
      'Fraud signals to fraud-detection-agent',
      'Contracts in shared-contracts/live/monetization/v1',
    ],
    [L('economy-psychology/gift-conversion-agent.md'), S('fraud-detection-agent.md')],
  ],
  [
    L('core/livestream-scaling-agent.md'),
    9,
    'livestream-app',
    'Horizontal scale for viewers, chat fanout, and regional CDN/RTC capacity.',
    [
      'Capacity models for festival and PK peaks',
      'Shard Socket.IO by region; Redis pub/sub chat',
      'Coordinate cdn-stream-distributor',
      'Autoscaling with autoscaling-agent',
      'Game-day drills with chaos-engineering-agent',
      'Degrade mode runbooks (low FX, chat-only)',
    ],
    [L('video-systems/cdn-stream-distributor.md'), C('infrastructure/autoscaling-agent.md')],
  ],
  [
    L('video-systems/live-comment-agent.md'),
    9,
    'livestream-app',
    'Realtime live comment pipeline with moderation and translations.',
    [
      'Socket.IO comment schema in shared-contracts',
      'Redis rate limits per user and room',
      'Backpressure fanout for 10k+ viewers',
      'ai-moderation-agent pre-broadcast screening',
      'Indic font/RTL safe overlays',
      'Premium styles via floating-comment-agent',
    ],
    [S('ai-moderation-agent.md'), G('fx/floating-comment-agent.md')],
  ],
  [
    L('video-systems/live-reaction-agent.md'),
    9,
    'livestream-app',
    'Mass live reactions without choking RTC or socket throughput.',
    [
      'Client-side burst aggregation before emit',
      'Server sampling caps events/sec in viral rooms',
      'Sync counts to fan-engagement-agent',
      'emoji-burst-agent and reaction-animation-agent FX',
      'Offline reaction queue on reconnect',
      'A/B placement with gift-conversion-agent',
    ],
    [G('fx/emoji-burst-agent.md'), L('operations/fan-engagement-agent.md')],
  ],
  [
    L('video-systems/low-latency-stream-agent.md'),
    9,
    'livestream-app',
    'Ultra-low-latency paths for PK and host-viewer sync.',
    [
      'Agora interactive vs HLS latency budgets',
      'Encoder presets for sub-second glass-to-glass',
      'Coordinate ultra-low-latency-agent and rtc-quality-agent',
      'Auto-fallback on jitter spikes',
      'ADR for global low-latency rollout',
      'Alert latency-monitor-agent on regressions',
    ],
    [C('realtime/ultra-low-latency-agent.md'), C('realtime/latency-monitor-agent.md')],
  ],
  [
    L('multi-guest/seat-management-agent.md'),
    9,
    'livestream-app',
    'Speaker seats, locks, promotions, and layout slots.',
    [
      'Seat graph per room tier in PostgreSQL',
      'Atomic Redis seat claim/release',
      'Flutter grids via layout-compositor',
      'guest-request-agent queue integration',
      'Mute/kick propagated to RTC <200ms target',
      'Seat audit trail for disputes',
    ],
    [L('multi-guest/guest-request-agent.md'), L('multi-guest/live-stage-agent.md')],
  ],
  [
    L('multi-guest/guest-request-agent.md'),
    9,
    'livestream-app',
    'Viewer requests to join stage — apply, approve, deny, timeout.',
    [
      'FIFO queue with host overrides',
      'Firebase push on pending requests',
      'Auto-expire stale requests',
      'ban-kick-moderator block list enforcement',
      'Outcomes feed host-ranking-agent',
      'Host tool APIs in shared-contracts',
    ],
    [L('multi-guest/seat-management-agent.md'), L('operations/ban-kick-moderator.md')],
  ],
  [
    L('multi-guest/live-stage-agent.md'),
    9,
    'livestream-app',
    'Multi-guest stage modes — grid, spotlight, PK split.',
    [
      'Stage mode state machine over Socket.IO',
      'Transitions without breaking RTC subs',
      'PK handoff to livestream-battle-agent',
      'co-host-manager persistent slots',
      'Thermal degrade to single-host',
      'Stage API docs for future host SDK',
    ],
    [L('multi-guest/pk-battle-agent.md'), L('operations/livestream-battle-agent.md')],
  ],
];
for (const [file, phase, domain, role, resp, deps] of coreAgents) {
  specs.push(mk(file, phase, domain, role, resp, deps));
}

addBatch(
  'apps/livestream-app/agents/operations',
  9,
  'livestream-app',
  [
    ['pk-tournament-agent', 'PK tournament brackets, scoring, and prizes'],
    ['festival-event-agent', 'Multi-day festival schedules and sponsor zones'],
    ['fan-engagement-agent', 'Fan quests, streaks, and engagement loops'],
    ['live-event-agent', 'One-off live events — reminders and go-live'],
    ['host-ranking-agent', 'Host leaderboards with fair-play anti-cheat'],
    ['community-event-agent', 'Community watch parties and shared rooms'],
    ['live-campaign-agent', 'Live campaigns tied to marketing calendar'],
    ['seasonal-campaign-agent', 'Seasonal skins and gift themes'],
    ['global-ranking-event-agent', 'Cross-region rankings with timezone fairness'],
    ['host-competition-agent', 'Host competitions with judging and appeals'],
    ['livestream-battle-agent', 'Battle timers, win rules, and rematches'],
  ],
  [
    'Define {topic} models in PostgreSQL; hot leaderboards in Redis',
    'NestJS + Socket.IO APIs in shared-contracts/live/ops',
    'Coordinate live-ops-dashboard-agent tooling',
    'Fan metrics tie to fan-engagement-agent',
    'Load-test with livestream-scaling-agent pre-launch',
    'Escalate bots to fraud-detection-agent',
  ],
  [L('core/livestream-agent.md')]
);

addBatch(
  'apps/livestream-app/agents/economy-psychology',
  9,
  'livestream-app',
  [
    ['high-spender-agent', 'Whale detection and VIP treatment'],
    ['gift-conversion-agent', 'Gift funnel analytics and nudges'],
    ['vip-retention-agent', 'VIP tiers, churn, and win-back'],
    ['creator-battle-agent', 'Creator battle psychology and pacing'],
    ['live-economy-balancer-agent', 'Virtual economy sinks/sources balance'],
    ['emotional-engagement-agent', 'Emotional hooks in live UX timing'],
    ['spender-segmentation-agent', 'RFM segmentation for live spenders'],
    ['fan-loyalty-agent', 'Loyalty points, badges, retention'],
  ],
  [
    'PostgreSQL rules + Redis aggregates for {topic}',
    'Feature flags via product-labs experiments',
    'Payout-safe tests with creator-monetization-agent',
    'No predatory mechanics; security-rules compliance',
    'Privacy-safe segmentation without raw PII logs',
    'Anomalies to fraud-detection-agent',
  ],
  [L('core/creator-monetization-agent.md')]
);

addBatch(
  'ai-agents/gift-effects/rendering',
  10,
  'gift-effects',
  [
    ['gift-trigger-agent', 'Gift triggers — validation and dispatch'],
    ['gift-sync-agent', 'Cross-client gift sync and ordering'],
    ['gift-economy-agent', 'Catalog pricing and wallet debits'],
    ['gift-animation-agent', 'Lottie/Rive pipelines and assets'],
    ['gift-rendering-agent', 'GPU/CPU render path per device'],
    ['gift-priority-agent', 'Priority when FX budget saturated'],
  ],
  [
    '{topic} in shared-contracts/gifts/v1',
    'Idempotent wallet debits',
    'gift-queue-manager + effect-budget-optimizer',
    'Lightweight FX fallback on thermal/FPS drop',
    'Socket.IO room sync with livestream-agent',
    'Abuse audit with fraud-detection-agent',
  ],
  [G('fx/gift-queue-manager.md')]
);

addBatch(
  'ai-agents/gift-effects/audio',
  10,
  'gift-effects',
  [
    ['spatial-audio-agent', 'Spatial audio for multi-guest stages'],
    ['voice-enhancement-agent', 'Voice clarity and noise suppression'],
    ['background-audio-agent', 'Background music licensing and ducking'],
    ['live-audio-mixer-agent', 'Live bus mixing host/guest/music'],
    ['audio-reaction-agent', 'Audio stingers for reactions'],
    ['sound-effects-agent', 'SFX library and CDN prefetch'],
    ['gift-sound-agent', 'Per-gift sounds and play limits'],
    ['reaction-sound-agent', 'Reaction packs with normalization'],
  ],
  [
    '{topic} audio graph in Flutter + platform channels',
    'audio-mix-priority-agent overlap rules',
    'Prefetch on WiFi; degrade on 2G/3G',
    'haptic-feedback-agent paired cues',
    'Peak limiter for low-end speakers',
    'Coordinate live-audio-mixer-agent in battles',
  ],
  [G('audio/audio-mix-priority-agent.md')]
);

addBatch(
  'ai-agents/gift-effects/fx',
  10,
  'gift-effects',
  [
    ['particle-effects-agent', 'Particle gifts with GPU caps'],
    ['heart-rain-agent', 'Heart-rain with client aggregation'],
    ['shader-effects-agent', 'Shader gifts and fallbacks'],
    ['3d-animation-agent', '3D gift LOD per device'],
    ['screen-overlay-agent', 'Overlays without blocking touches'],
    ['emoji-burst-agent', 'Emoji bursts on reactions'],
    ['dynamic-lighting-agent', 'Lighting accents on host video'],
    ['motion-graphics-agent', 'Campaign motion templates'],
    ['gpu-effects-agent', 'GPU scheduling and crash guards'],
    ['floating-comment-agent', 'Premium floating comments'],
    ['animated-chat-agent', 'Animated subscriber chat'],
    ['sticker-effects-agent', 'Sticker overlays live/replay'],
    ['reaction-animation-agent', 'Reaction choreography'],
  ],
  [
    '{topic} gated by effect-budget-optimizer',
    'gift-queue-manager concurrent FX queue',
    'fullscreen-overlay-agent layering',
    'low-end-device-agent test matrix',
    'memory-optimization-agent GPU budgets',
    'Degrade ladders in livestream-scaling-agent',
  ],
  [G('fx/effect-budget-optimizer.md')]
);

addBatch(
  'ai-agents/identity-platform',
  18,
  'identity-platform',
  [
    ['universal-user-agent', 'Canonical user across all four apps'],
    ['identity-resolution-agent', 'Duplicate identity resolution'],
    ['cross-app-profile-agent', 'Cross-app profile sync'],
    ['single-sign-on-agent', 'SSO across apps'],
    ['device-identity-agent', 'Trusted device registry'],
    ['session-identity-agent', 'Session tokens and revocation'],
    ['multi-device-sync-agent', 'Multi-device login sync'],
    ['identity-merge-agent', 'Account merge with consent'],
    ['account-recovery-agent', 'Recovery via OTP and backups'],
    ['account-linking-agent', 'Link phone, email, OAuth'],
  ],
  [
    '{topic} in user-service + shared-contracts/identity/v1',
    'Firebase Auth + OTP per security-rules',
    'Outbox via event-stream-agent',
    'No secrets in client repos',
    'Short-TTL cross-app handoff tokens',
    'Disputes to trust-safety-agent',
  ],
  ['ai-agents/phase-1/auth-service-agent.md', I('unified-auth-agent.md')]
);

addBatch(
  'ai-agents/event-system',
  18,
  'event-system',
  [
    ['event-stream-agent', 'Event streaming backbone'],
    ['kafka-agent', 'Kafka topics and retention'],
    ['queue-orchestration-agent', 'Queue topology and retries'],
    ['event-routing-agent', 'Consumer routing by type/region'],
    ['async-processing-agent', 'Async workers and idempotency'],
    ['realtime-event-agent', 'Bridge to Socket.IO fanout'],
    ['message-broker-agent', 'Broker health and abstraction'],
    ['pubsub-agent', 'Pub/sub cross-service notify'],
    ['stream-processing-agent', 'Windowed stream aggregates'],
    ['event-replay-agent', 'Controlled replay and backfill'],
    ['dead-letter-queue-agent', 'DLQ inspect, replay, alert'],
  ],
  [
    '{topic} validated by event-schema-guardian',
    'Contracts in shared-contracts/events/v1',
    'Outbox + Kafka when ordering required',
    'DLQ depth alerts to incident-commander-agent',
    'PII encryption and log redaction',
    'Heavy consumers via async-processing-agent',
  ],
  [E('event-bus-architect.md')]
);

addBatch(
  'ai-agents/agent-memory',
  18,
  'agent-memory',
  [
    ['memory-coordination-agent', 'Coordinate agent memory writes'],
    ['context-memory-agent', 'Short-term session context'],
    ['long-term-memory-agent', 'Durable memory retention'],
    ['conversation-memory-agent', 'Thread memory for support'],
    ['agent-state-agent', 'Resumable agent state snapshots'],
    ['semantic-memory-agent', 'Semantic embeddings store'],
    ['vector-memory-agent', 'Vector index sharding'],
    ['memory-indexing-agent', 'Memory search indexing'],
    ['cross-agent-memory-agent', 'Shared memory across agents'],
    ['memory-retrieval-agent', 'Retrieval ranking for prompts'],
  ],
  [
    '{topic}: Redis hot, PostgreSQL cold, vector tier',
    'PII scrub per security-rules',
    'TTL via memory-pruning-agent',
    'knowledge-router.md consumption APIs',
    'Schema migrations with event-replay-agent',
    'Access audit via event-audit-agent',
  ],
  [M('context-store-agent.md')]
);

addBatch(
  'ai-agents/safety',
  20,
  'safety',
  [
    ['trust-safety-agent', 'Trust & safety program enforcement'],
    ['ai-moderation-agent', 'AI classifiers for UGC and live'],
    ['anti-spam-agent', 'Spam in DM, comments, live chat'],
    ['content-policy-agent', 'Policy matrices per app/locale'],
    ['fraud-detection-agent', 'Payments and gift fraud scoring'],
    ['security-agent', 'AppSec standards and threat models'],
    ['compliance-agent', 'Regulatory and store compliance'],
    ['trust-score-agent', 'Trust scores for feature gating'],
    ['host-reputation-agent', 'Host strikes and reputation'],
    ['creator-verification-agent', 'Creator KYC and badges'],
    ['identity-verification-agent', 'ID and liveness verification'],
    ['community-reputation-agent', 'Community karma weights'],
    ['review-rating-agent', 'Review fraud and integrity'],
    ['anti-fake-profile-agent', 'Fake profiles and bot nets'],
    ['deepfake-detection-agent', 'Deepfake on upload/live'],
  ],
  [
    '{topic} with human appeals via appeal-review-agent',
    'Audit IDs; minimal biometric retention',
    'Escalate to csam-detection-agent when required',
    'Indic-language classifier coverage',
    'Admin APIs behind enterprise-security',
    'Publish-time gates with content-safety-agent',
  ],
  ['ai-agents/safety/content-safety-agent.md'],
  { governance: ['platform-governance/security-rules.md', 'platform-governance/api-standards.md'] }
);

// Phase 20 testing
const testingEntries = [
  ['qa-automation-agent', 'QA automation frameworks and CI gates'],
  ['integration-testing-agent', 'Service integration test suites'],
  ['regression-testing-agent', 'Regression suites on release branches'],
  ['end-to-end-testing-agent', 'E2E flows across four apps'],
  ['bug-reproduction-agent', 'Minimal repro scripts from tickets'],
  ['crash-monitoring-agent', 'Crashlytics/Sentry triage'],
  ['app-performance-agent', 'Mobile app performance budgets'],
  ['flutter-performance-agent', 'Flutter frame timing and jank'],
  ['memory-leak-detection-agent', 'Leak detection in long sessions'],
  ['network-resilience-agent', 'Network chaos on 2G/3G profiles'],
  ['load-testing-agent', 'Load tests for live and API peaks'],
  ['device-compatibility-agent', 'Device matrix compatibility'],
  ['accessibility-testing-agent', 'a11y audits WCAG mobile'],
  ['chaos-engineering-agent', 'Chaos experiments in staging'],
  ['low-end-device-agent', 'Low-end Android soak tests'],
  ['battery-optimization-agent', 'Battery drain profiling'],
  ['network-optimization-agent', 'Payload and retry optimization'],
  ['offline-sync-agent', 'Offline queue sync validation'],
  ['memory-optimization-agent', 'Heap/GPU memory optimization'],
  ['startup-time-agent', 'Cold start and TTI budgets'],
];
addBatch('ai-agents/testing', 20, 'testing', testingEntries, [
  '{topic} test plans in CI with flake controls',
  'Contract tests via openapi-contract-validation-agent',
  'NestJS testcontainers for integration-testing-agent',
  'Flutter integration_test for widget flows',
  'Publish dashboards to observability-engineer',
  'Block release on P0 regressions',
], [T('e2e-test-architect.md')]);

// incident-command (3)
addBatch(
  'ai-agents/incident-command',
  20,
  'incident-command',
  [
    ['on-call-rotation-agent', 'On-call schedules and escalation policies'],
    ['runbook-automation-agent', 'Automated runbooks for known failures'],
    ['customer-comms-agent', 'Customer comms during incidents'],
  ],
  [
    '{topic} integrated with PagerDuty/webhook stubs',
    'Link status-page-agent updates',
    'postmortem-writer.md templates after SEVs',
    'Severity matrix with incident-commander-agent',
    'Blameless RCA storage in platform-knowledge',
    'Game-day calendar with chaos-engineering-agent',
  ],
  ['ai-agents/incident-command/incident-commander-agent.md']
);

// enterprise-security (5)
addBatch(
  'ai-agents/enterprise-security',
  20,
  'enterprise-security',
  [
    ['zero-trust-network-agent', 'Zero-trust network policies'],
    ['iam-policy-agent', 'IAM least-privilege policies'],
    ['data-loss-prevention-agent', 'DLP for exports and logs'],
    ['breach-response-agent', 'Breach playbooks and forensics'],
    ['security-audit-agent', 'Continuous security audits'],
  ],
  [
    '{topic} aligned with soc2-compliance-agent controls',
    'secrets-rotation-agent schedules',
    'vulnerability-scanner-agent findings triage',
    'No credentials in git; Secrets Manager only',
    'Audit trails to event-audit-agent',
    'Escalate critical CVEs to incident-commander-agent',
  ],
  ['ai-agents/enterprise-security/soc2-compliance-agent.md']
);

// store-growth (5)
addBatch(
  'ai-agents/store-growth',
  20,
  'store-growth',
  [
    ['aso-agent', 'App store optimization strategy'],
    ['conversion-rate-agent', 'Store listing conversion experiments'],
    ['store-screenshot-agent', 'Screenshot/localized creative pipeline'],
    ['keyword-ranking-agent', 'Keyword tracking and ASO iterations'],
    ['app-preview-video-agent', 'Preview video storyboards and specs'],
  ],
  [
    '{topic} per locale store guidelines',
    'Experiments via store-experiment-agent',
    'play-store-listing-agent + app-store-optimization-agent parity',
    'Indic screenshot copy review',
    'Track keyword-ranking-agent weekly',
    'Hand creatives to growth marketing agents',
  ],
  ['ai-agents/store-growth/app-store-optimization-agent.md']
);

// Phase 5 core-engineering
const phase5 = [
  [C('frontend/design-token-sync-agent.md'), 5, 'frontend', 'Design token sync Figma → Flutter theme extensions'],
  [C('backend/queue-processing-agent.md'), 5, 'backend', 'Queue workers for NestJS background jobs'],
  [C('backend/background-jobs-agent.md'), 5, 'backend', 'Scheduled jobs, cron, and job dashboards'],
  [C('database/replication-agent.md'), 5, 'database', 'Postgres replication, lag monitoring, failover'],
  [C('database/sharding-agent.md'), 5, 'database', 'Sharding strategy for hot social/live tables'],
  [C('realtime/rtc-quality-agent.md'), 5, 'realtime', 'RTC quality scoring and provider failover'],
  [C('realtime/latency-monitor-agent.md'), 5, 'realtime', 'Latency SLO monitors for Socket.IO and RTC'],
  [C('realtime/voice-sync-agent.md'), 5, 'realtime', 'Voice sync lip-alignment for co-hosts'],
  [C('realtime/ultra-low-latency-agent.md'), 5, 'realtime', 'Ultra-low-latency RTC tuning guides'],
  [C('infrastructure/autoscaling-agent.md'), 5, 'infrastructure', 'HPA/cluster autoscaling policies'],
  [C('infrastructure/serverless-agent.md'), 5, 'infrastructure', 'Lambda/serverless for burst workloads'],
  [C('infrastructure/geo-routing-agent.md'), 5, 'infrastructure', 'Geo DNS and traffic routing'],
  [C('reliability/uptime-agent.md'), 5, 'reliability', 'Uptime SLOs, error budgets, status comms'],
  [C('reliability/chaos-engineering-agent.md'), 5, 'reliability', 'Platform chaos experiments (infra plane)'],
];
for (const [file, phase, sub, role] of phase5) {
  specs.push(
    mk(
      file,
      phase,
      `core-engineering-${sub}`,
      role + '.',
      b(file, [
        'Document {topic} standards in platform-governance and ADRs',
        'Implement with NestJS/Flutter patterns from nestjs-architect.md',
        'Observability hooks for aws-architect and observability-engineer',
        'Coordinate socketio-architect.md for realtime subsystems',
        'Load/chaos validation before production enable',
        'No duplicate microservices — check services/ first',
      ]),
      [C(`${sub === 'frontend' ? 'frontend/flutter-architect.md' : sub === 'backend' ? 'backend/nestjs-architect.md' : 'realtime/socketio-architect.md'}`)]
    )
  );
}

// Phase 8 social
specs.push(
  mk(
    'apps/social-app/agents/social-feed-agent.md',
    8,
    'social-app',
    'Home feed composition — following, For You, and ads insertion.',
    [
      'Feed mixer service with cursor pagination in PostgreSQL',
      'Redis cache for hot feeds; stale-while-revalidate on 3G',
      'Coordinate feed-ranking-agent and feed-architect.md',
      'Insert sponsored slots per ad-serving-agent policy',
      'Offline feed pack for social-offline-sync-agent',
      'Report bad recommendations to content-moderation-pipeline',
    ],
    ['apps/social-app/agents/feed-architect.md', 'apps/social-app/agents/feed-ranking-agent.md']
  ),
  mk(
    'apps/social-app/agents/follow-system-agent.md',
    8,
    'social-app',
    'Follow graph — requests, mutual follows, blocks, and counts.',
    [
      'Follow edge model with soft-delete and block symmetry',
      'Counts in Redis; reconcile jobs nightly',
      'Private account follow requests with notifications',
      'Integrate follow-graph-manager patterns without breaking APIs',
      'Anti-spam rate limits with anti-spam-agent',
      'Contracts in shared-contracts/social/graph/v1',
    ],
    ['apps/social-app/agents/follow-graph-manager.md', 'ai-agents/safety/anti-spam-agent.md']
  )
);

writeFileSync(OUT, JSON.stringify(specs, null, 2));
console.log('Wrote', specs.length, 'definitions');
