#!/usr/bin/env node
/**
 * Stream Heaven Agent & Scaffold Generator
 * Generates agent .md files, directory structure, and AGENT-REGISTRY.md
 */

import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const GOVERNANCE_MAP = {
  executive: ['platform-vision.md', 'platform-roadmap.md', 'feature-approval-rules.md'],
  'master-brain': ['architecture-principles.md', 'ai-usage-rules.md'],
  orchestration: ['engineering-rules.md', 'deployment-rules.md'],
  frontend: ['flutter-ui-rules.md', 'engineering-rules.md'],
  backend: ['api-standards.md', 'engineering-rules.md'],
  database: ['database-rules.md', 'engineering-rules.md'],
  realtime: ['architecture-principles.md', 'scaling-playbook.md'],
  infrastructure: ['deployment-rules.md', 'disaster-recovery-rules.md'],
  reliability: ['incident-severity-rules.md', 'production-readiness-checklist.md'],
  'design-system': ['flutter-ui-rules.md', 'architecture-principles.md'],
  'user-experience-intelligence': ['flutter-ui-rules.md', 'feature-approval-rules.md'],
  'social-app': ['flutter-ui-rules.md', 'api-standards.md', 'security-rules.md'],
  'livestream-app': ['scaling-playbook.md', 'api-standards.md', 'cost-control-rules.md'],
  'gift-effects': ['flutter-ui-rules.md', 'cost-control-rules.md'],
  cosmetics: ['flutter-ui-rules.md', 'feature-approval-rules.md'],
  'creator-economy': ['api-standards.md', 'security-rules.md', 'cost-control-rules.md'],
  economy: ['database-rules.md', 'security-rules.md', 'cost-control-rules.md'],
  'data-science': ['database-rules.md', 'ai-usage-rules.md'],
  'growth-ai': ['feature-approval-rules.md', 'ai-usage-rules.md', 'prompt-engineering-rules.md'],
  'astro-app': ['flutter-ui-rules.md', 'api-standards.md', 'security-rules.md'],
  'media-app': ['scaling-playbook.md', 'cost-control-rules.md', 'api-standards.md'],
  'identity-platform': ['security-rules.md', 'api-standards.md'],
  'event-system': ['architecture-principles.md', 'api-standards.md'],
  'agent-memory': ['ai-usage-rules.md', 'prompt-engineering-rules.md'],
  'api-platform': ['api-standards.md', 'security-rules.md'],
  'analytics-platform': ['database-rules.md', 'cost-control-rules.md'],
  'store-growth': ['feature-approval-rules.md', 'growth-ai'],
  safety: ['security-rules.md', 'incident-severity-rules.md'],
  'community-governance': ['security-rules.md', 'feature-approval-rules.md'],
  testing: ['testing-rules.md', 'release-checklist.md'],
  'incident-command': ['incident-severity-rules.md', 'disaster-recovery-rules.md'],
  'support-ecosystem': ['bug-priority-rules.md', 'incident-severity-rules.md'],
  'platform-finance': ['cost-control-rules.md', 'vendor-management-rules.md'],
  'product-labs': ['feature-approval-rules.md', 'technical-debt-rules.md'],
  'cross-platform': ['flutter-ui-rules.md', 'engineering-rules.md'],
  'founder-war-room': ['platform-vision.md', 'platform-roadmap.md'],
  'media-pipeline': ['scaling-playbook.md', 'cost-control-rules.md'],
  internationalization: ['flutter-ui-rules.md', 'api-standards.md'],
  'platform-knowledge': ['ai-usage-rules.md', 'prompt-engineering-rules.md'],
  'enterprise-security': ['security-rules.md', 'disaster-recovery-rules.md'],
  'ml-platform': ['ai-usage-rules.md', 'cost-control-rules.md'],
  'search-infrastructure': ['database-rules.md', 'scaling-playbook.md'],
  'ad-network': ['security-rules.md', 'cost-control-rules.md'],
  web3: ['security-rules.md', 'feature-approval-rules.md'],
  'future-systems': ['architecture-principles.md', 'platform-roadmap.md'],
  rendering: ['flutter-ui-rules.md', 'cost-control-rules.md'],
  audio: ['flutter-ui-rules.md', 'engineering-rules.md'],
  fx: ['flutter-ui-rules.md', 'cost-control-rules.md'],
  core: ['architecture-principles.md', 'scaling-playbook.md'],
  'video-systems': ['scaling-playbook.md', 'cost-control-rules.md'],
  'multi-guest': ['scaling-playbook.md', 'api-standards.md'],
  operations: ['incident-severity-rules.md', 'production-readiness-checklist.md'],
  'economy-psychology': ['feature-approval-rules.md', 'creator-economy'],
  games: ['security-rules.md', 'api-standards.md', 'scaling-playbook.md'],
};

const TECH_STACKS = {
  flutter: 'Flutter (Riverpod, GoRouter)',
  nestjs: 'Node.js, NestJS',
  postgres: 'PostgreSQL, Redis',
  realtime: 'Socket.IO, Redis',
  streaming: 'Agora SDK / Zego SDK',
  aws: 'AWS, Cloudflare CDN',
  ai: 'LLM APIs, Cursor Agents',
  analytics: 'PostgreSQL, Redis, Event pipelines',
  default: 'Flutter, NestJS, PostgreSQL, Redis, Socket.IO, AWS, Cloudflare',
};

function ensureDir(p) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

function slugToTitle(slug) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getGovernance(domain) {
  const refs = GOVERNANCE_MAP[domain] || ['engineering-rules.md', 'architecture-principles.md'];
  return refs.filter((r) => r.endsWith('.md')).map((r) => `platform-governance/${r}`);
}

function getTechStack(domain, phase) {
  if (domain.includes('flutter') || domain.includes('social') || domain.includes('astro') || domain.includes('media') || domain.includes('design') || domain.includes('cosmetic') || domain.includes('gift') || domain.includes('cross-platform')) {
    return `${TECH_STACKS.flutter}, ${TECH_STACKS.nestjs}, ${TECH_STACKS.realtime}`;
  }
  if (domain.includes('backend') || domain.includes('api') || domain.includes('auth')) return TECH_STACKS.nestjs;
  if (domain.includes('database') || domain.includes('data-science')) return TECH_STACKS.postgres;
  if (domain.includes('realtime') || domain.includes('livestream') || domain.includes('video')) return `${TECH_STACKS.streaming}, ${TECH_STACKS.realtime}`;
  if (domain.includes('infrastructure') || domain.includes('media-pipeline')) return TECH_STACKS.aws;
  if (domain.includes('growth') || domain.includes('ml') || domain.includes('ai') || domain.includes('memory')) return TECH_STACKS.ai;
  if (domain.includes('analytics')) return TECH_STACKS.analytics;
  return TECH_STACKS.default;
}

function generateAgentContent(name, config) {
  const title = slugToTitle(name);
  const { phase, domain, role, responsibilities, inputs, outputs, dependencies, promptFocus } = config;
  const governance = getGovernance(domain);

  return `# ${title}

## Role
${role}

## Responsibilities
${responsibilities.map((r) => `- ${r}`).join('\n')}

## Inputs
${inputs.map((i) => `- ${i}`).join('\n')}

## Outputs
${outputs.map((o) => `- ${o}`).join('\n')}

## Dependencies
${dependencies.map((d) => `- ${d}`).join('\n')}

## Governance References
${governance.map((g) => `- ${g}`).join('\n')}

## Execution Context
- Phase: ${phase}
- Domain: ${domain}
- Tech Stack: ${getTechStack(domain, phase)}

## Prompt Template

\`\`\`
You are the ${title} agent for Stream Heaven — an AI-native entertainment super ecosystem.

Context:
- Platform: Social App, Livestream App, Astro App, Media App (OTT)
- Stack: Flutter (Riverpod, GoRouter), NestJS, PostgreSQL, Redis, Socket.IO, Agora/Zego, AWS S3, Cloudflare CDN, Firebase Auth
- Audience: Indian + global users, low-end Android, poor connectivity
- Languages: English, Hindi, Telugu, Tamil, Kannada, Malayalam, Bengali, Marathi, Punjabi

Governance (must follow):
${governance.map((g) => `- ${g}`).join('\n')}

Your mission: ${promptFocus}

Deliverables:
${outputs.map((o) => `- ${o}`).join('\n')}

Constraints:
- Do not violate platform-governance rules
- Optimize for low-end devices and intermittent connectivity
- Use shared packages in packages/ for contracts and types
- Reference existing services in services/ before creating duplicates

Begin by stating your plan, then execute.
\`\`\`
`;
}

function makeAgent(name, phase, domain, overrides = {}) {
  const title = slugToTitle(name);
  return {
    name,
    phase,
    domain,
    role: overrides.role || `${title} specialist for Stream Heaven's ${domain.replace(/-/g, ' ')} domain, ensuring alignment with platform governance and the four-app ecosystem.`,
    responsibilities: overrides.responsibilities || [
      `Design and implement ${domain.replace(/-/g, ' ')} capabilities for Stream Heaven`,
      'Follow platform-governance standards for all outputs',
      'Coordinate with dependent agents and shared packages',
      'Optimize for Indian market: low-end Android and poor connectivity',
      'Document decisions and handoff artifacts for downstream agents',
    ],
    inputs: overrides.inputs || [
      'Platform governance documents',
      'Agent registry and dependency map',
      'Product requirements and feature specs',
      'Existing codebase in apps/, services/, packages/',
    ],
    outputs: overrides.outputs || [
      'Implementation plans and technical specifications',
      'Code scaffolds, configs, or documentation as appropriate',
      'Integration notes for dependent systems',
      'Test strategy and acceptance criteria',
    ],
    dependencies: overrides.dependencies || [
      'platform-governance/*',
      'packages/shared-contracts',
      'packages/shared-types',
      'Orchestration agents for task routing',
    ],
    promptFocus: overrides.promptFocus || `Execute ${title} responsibilities for the ${domain} domain within Stream Heaven Phase ${phase}.`,
  };
}

// Agent definitions by phase
const AGENT_DEFINITIONS = [];

function addAgents(phase, domain, basePath, names, domainOverrides = {}) {
  names.forEach((name) => {
    const config = makeAgent(name, phase, domain, domainOverrides[name] || domainOverrides.default || {});
    AGENT_DEFINITIONS.push({ ...config, path: join(basePath, `${name}.md`) });
  });
}

// Phase 2: Executive (13)
addAgents(2, 'executive', join(ROOT, 'ai-agents/executive'), [
  'ceo-strategic-advisor', 'cto-platform-advisor', 'cpo-product-advisor', 'cfo-finance-advisor',
  'coo-operations-advisor', 'chief-architect', 'chief-growth-officer', 'chief-safety-officer',
  'board-reporting-agent', 'okr-tracker', 'resource-allocator', 'vision-keeper', 'strategy-planner',
]);

// Phase 3: Master Brain (7)
addAgents(3, 'master-brain', join(ROOT, 'ai-agents/master-brain'), [
  'platform-orchestrator', 'decision-engine', 'context-synthesizer', 'knowledge-router',
  'priority-resolver', 'cross-domain-coordinator', 'master-planner',
]);

// Phase 4: Orchestration (9)
addAgents(4, 'orchestration', join(ROOT, 'ai-agents/orchestration'), [
  'task-router', 'workflow-engine', 'agent-scheduler', 'dependency-resolver',
  'pipeline-builder', 'chat-coordinator', 'handoff-manager', 'quality-gate', 'rollback-coordinator',
]);

// Phase 5: Core Engineering
addAgents(5, 'frontend', join(ROOT, 'ai-agents/core-engineering/frontend'), [
  'flutter-architect', 'riverpod-specialist', 'routing-specialist', 'performance-optimizer',
  'widget-library-curator', 'platform-channel-specialist',
]);
addAgents(5, 'backend', join(ROOT, 'ai-agents/core-engineering/backend'), [
  'nestjs-architect', 'microservice-designer', 'api-contract-author', 'graphql-rest-specialist',
  'middleware-specialist', 'service-mesh-coordinator',
]);
addAgents(5, 'database', join(ROOT, 'ai-agents/core-engineering/database'), [
  'postgres-architect', 'redis-cache-specialist', 'migration-manager', 'query-optimizer', 'data-modeling-specialist',
]);
addAgents(5, 'realtime', join(ROOT, 'ai-agents/core-engineering/realtime'), [
  'socketio-architect', 'presence-manager', 'room-coordinator', 'websocket-scaler', 'event-broadcaster',
]);
addAgents(5, 'infrastructure', join(ROOT, 'ai-agents/core-engineering/infrastructure'), [
  'aws-architect', 'cloudflare-cdn-specialist', 'k8s-operator', 'terraform-specialist', 'observability-engineer',
]);
addAgents(5, 'reliability', join(ROOT, 'ai-agents/core-engineering/reliability'), [
  'sre-lead', 'chaos-engineer', 'incident-responder', 'sla-monitor', 'capacity-planner',
]);

// Phase 6: Design System (14)
addAgents(6, 'design-system', join(ROOT, 'ai-agents/design-system'), [
  'design-tokens-architect', 'component-library-lead', 'typography-specialist', 'color-system-curator',
  'iconography-specialist', 'motion-design-lead', 'accessibility-auditor', 'dark-mode-specialist',
  'localization-ui-specialist', 'responsive-layout-architect', 'brand-consistency-guardian',
  'figma-sync-coordinator', 'design-qa-reviewer', 'flutter-theme-engineer',
]);

// Phase 7: UX Intelligence (13)
addAgents(7, 'user-experience-intelligence', join(ROOT, 'ai-agents/user-experience-intelligence'), [
  'ux-research-lead', 'behavioral-analyst', 'funnel-optimizer', 'onboarding-specialist',
  'retention-strategist', 'personalization-engine', 'journey-mapper', 'heatmap-analyst',
  'nudge-designer', 'accessibility-ux-specialist', 'low-bandwidth-ux-specialist',
  'regional-ux-specialist', 'ux-experiment-designer',
]);

// Phase 8: Social App (28)
addAgents(8, 'social-app', join(ROOT, 'apps/social-app/agents'), [
  'feed-architect', 'story-system-designer', 'reels-short-video-agent', 'comment-thread-specialist',
  'reaction-system-agent', 'follow-graph-manager', 'profile-page-designer', 'dm-messaging-agent',
  'group-chat-coordinator', 'community-moderator-agent', 'hashtag-trending-agent', 'mention-notification-agent',
  'content-discovery-engine', 'social-graph-analyst', 'privacy-controls-specialist', 'block-report-agent',
  'social-search-agent', 'share-deeplink-agent', 'social-notification-orchestrator', 'feed-ranking-agent',
  'content-moderation-pipeline', 'social-analytics-agent', 'creator-profile-enhancer', 'social-onboarding-flow',
  'social-settings-agent', 'social-api-integration', 'social-offline-sync-agent', 'social-accessibility-agent',
]);

// Phase 9: Livestream App
addAgents(9, 'core', join(ROOT, 'apps/livestream-app/agents/core'), [
  'livestream-architect', 'room-lifecycle-manager', 'viewer-session-agent', 'stream-quality-adaptor',
  'livestream-navigation-agent', 'livestream-auth-guard',
]);
addAgents(9, 'video-systems', join(ROOT, 'apps/livestream-app/agents/video-systems'), [
  'agora-integration-agent', 'zego-fallback-agent', 'bitrate-adaptation-agent', 'encoder-config-specialist',
  'cdn-stream-distributor', 'recording-playback-agent',
]);
addAgents(9, 'multi-guest', join(ROOT, 'apps/livestream-app/agents/multi-guest'), [
  'co-host-manager', 'guest-invite-agent', 'layout-compositor', 'audio-mix-coordinator', 'pk-battle-agent',
]);
addAgents(9, 'operations', join(ROOT, 'apps/livestream-app/agents/operations'), [
  'stream-health-monitor', 'live-ops-dashboard-agent', 'ban-kick-moderator', 'stream-scheduling-agent',
]);
addAgents(9, 'economy-psychology', join(ROOT, 'apps/livestream-app/agents/economy-psychology'), [
  'gift-trigger-psychology', 'whale-retention-agent', 'fomo-mechanics-designer', 'tip-goal-agent',
]);

// Phase 9 add-on: Games Platform (BIGO-style casual games)
addAgents(9, 'games', join(ROOT, 'ai-agents/games'), [
  'games-platform-architect', 'teen-patti-agent', 'ludo-agent', 'rummy-agent', 'carrom-agent',
  'games-matchmaking-agent', 'games-economy-agent', 'games-fair-play-agent', 'games-socket-sync-agent',
  'games-ui-agent', 'games-leaderboard-agent', 'games-tournament-agent',
]);

// Phase 10: Gift Effects
addAgents(10, 'rendering', join(ROOT, 'ai-agents/gift-effects/rendering'), [
  'gift-animation-renderer', 'particle-system-agent', 'lottie-gift-agent', 'gpu-shader-specialist',
]);
addAgents(10, 'audio', join(ROOT, 'ai-agents/gift-effects/audio'), [
  'gift-sound-designer', 'audio-mix-priority-agent', 'haptic-feedback-agent',
]);
addAgents(10, 'fx', join(ROOT, 'ai-agents/gift-effects/fx'), [
  'combo-effect-chainer', 'fullscreen-overlay-agent', 'gift-queue-manager', 'effect-budget-optimizer',
]);

// Phase 11: Cosmetics (28)
addAgents(11, 'cosmetics', join(ROOT, 'ai-agents/cosmetics'), [
  'avatar-frame-designer', 'profile-badge-agent', 'chat-bubble-themer', 'entrance-effect-agent',
  'profile-skin-designer', 'vip-tier-visual-agent', 'seasonal-cosmetic-curator', 'cosmetic-rarity-system',
  'cosmetic-preview-agent', 'cosmetic-shop-ui-agent', 'cosmetic-inventory-manager', 'cosmetic-gift-agent',
  'cosmetic-animation-lead', 'cosmetic-asset-pipeline', 'cosmetic-pricing-agent', 'cosmetic-limited-drop-agent',
  'cosmetic-collection-set-agent', 'cosmetic-trade-agent', 'cosmetic-audit-agent', 'cosmetic-localization-agent',
  'cosmetic-performance-optimizer', 'cosmetic-ab-test-agent', 'cosmetic-analytics-agent', 'cosmetic-api-designer',
  'cosmetic-moderation-agent', 'cosmetic-cross-app-sync', 'cosmetic-nft-bridge-agent', 'cosmetic-accessibility-agent',
]);

// Phase 12: Creator Economy (19)
addAgents(12, 'creator-economy', join(ROOT, 'ai-agents/creator-economy'), [
  'creator-monetization-architect', 'subscription-tier-agent', 'tip-jar-agent', 'revenue-share-calculator',
  'creator-dashboard-agent', 'payout-scheduler', 'tax-compliance-agent', 'creator-verification-agent',
  'brand-deal-marketplace', 'sponsor-matching-agent', 'creator-analytics-agent', 'creator-support-agent',
  'creator-onboarding-agent', 'creator-tier-progression', 'creator-contract-agent', 'creator-dispute-resolver',
  'creator-content-licensing', 'creator-collab-agent', 'creator-retention-agent',
]);

// Phase 13: Economy (16)
addAgents(13, 'economy', join(ROOT, 'ai-agents/economy'), [
  'virtual-currency-architect', 'wallet-ledger-agent', 'coin-pack-pricing-agent', 'iap-integration-agent',
  'refund-policy-agent', 'fraud-detection-agent', 'economy-balance-simulator', 'inflation-control-agent',
  'reward-distribution-agent', 'daily-bonus-agent', 'economy-audit-agent', 'cross-app-wallet-sync',
  'economy-reporting-agent', 'promo-code-agent', 'economy-ab-test-agent', 'economy-compliance-agent',
]);

// Phase 14: Data Science (14)
addAgents(14, 'data-science', join(ROOT, 'ai-agents/data-science'), [
  'recommendation-engine-agent', 'churn-prediction-agent', 'ltv-modeling-agent', 'segmentation-agent',
  'anomaly-detection-agent', 'ab-test-analyst', 'funnel-analytics-agent', 'cohort-analysis-agent',
  'feature-store-manager', 'ml-pipeline-architect', 'embedding-search-agent', 'ranking-model-agent',
  'data-quality-guardian', 'experiment-platform-agent',
]);

// Phase 15: Growth AI (35)
addAgents(15, 'growth-ai', join(ROOT, 'ai-agents/growth-ai'), [
  'acquisition-strategist', 'referral-program-agent', 'viral-loop-designer', 'push-notification-optimizer',
  'email-campaign-agent', 'sms-otp-growth-agent', 'deep-link-attribution-agent', 'aso-keywords-agent',
  'social-share-incentive-agent', 'influencer-outreach-agent', 'regional-campaign-agent', 'festive-campaign-agent',
  'retargeting-agent', 'winback-campaign-agent', 'onboarding-experiment-agent', 'paywall-optimizer',
  'pricing-experiment-agent', 'content-seeding-agent', 'community-growth-agent', 'creator-recruitment-agent',
  'cross-app-promotion-agent', 'gamification-growth-agent', 'streak-mechanics-agent', 'leaderboard-growth-agent',
  'notification-fatigue-agent', 'growth-dashboard-agent', 'channel-mix-optimizer', 'budget-allocation-agent',
  'growth-forecast-agent', 'competitive-intel-agent', 'partnership-growth-agent', 'offline-growth-agent',
  'whatsapp-share-agent', 'regional-language-growth', 'growth-compliance-agent',
]);

// Phase 16: Astro App (14)
addAgents(16, 'astro-app', join(ROOT, 'apps/astro-app/agents'), [
  'kundli-chart-agent', 'horoscope-daily-agent', 'panchang-agent', 'matchmaking-compatibility-agent',
  'live-consultation-agent', 'astro-chat-agent', 'remedy-recommendation-agent', 'astro-payment-agent',
  'astro-creator-onboarding', 'astro-content-moderator', 'astro-notification-agent', 'astro-offline-agent',
  'astro-regional-calendar', 'astro-disclaimer-compliance',
]);

// Phase 17: Media App (19)
addAgents(17, 'media-app', join(ROOT, 'apps/media-app/agents'), [
  'ott-catalog-agent', 'video-player-agent', 'drm-protection-agent', 'subtitle-cdn-agent',
  'continue-watching-agent', 'recommendation-row-agent', 'media-search-agent', 'download-offline-agent',
  'parental-controls-agent', 'media-billing-agent', 'series-episode-manager', 'live-tv-agent',
  'media-analytics-agent', 'content-ingestion-agent', 'transcoding-pipeline-agent', 'media-cdn-optimizer',
  'media-accessibility-agent', 'media-regional-content', 'media-rights-manager',
]);

// Phase 18
addAgents(18, 'identity-platform', join(ROOT, 'ai-agents/identity-platform'), [
  'unified-auth-agent', 'sso-federation-agent', 'device-trust-agent', 'session-manager-agent', 'identity-graph-agent',
]);
addAgents(18, 'event-system', join(ROOT, 'ai-agents/event-system'), [
  'event-bus-architect', 'event-schema-guardian', 'event-replay-agent', 'dead-letter-handler', 'event-audit-agent',
]);
addAgents(18, 'agent-memory', join(ROOT, 'ai-agents/agent-memory'), [
  'context-store-agent', 'memory-retrieval-agent', 'memory-pruning-agent', 'cross-chat-sync-agent',
]);

// Phase 19
addAgents(19, 'api-platform', join(ROOT, 'api-platform/agents'), [
  'public-api-gateway-agent', 'api-versioning-agent', 'rate-limit-agent', 'developer-portal-agent', 'webhook-manager-agent',
]);
addAgents(19, 'analytics-platform', join(ROOT, 'analytics-platform/agents'), [
  'event-tracking-agent', 'dashboard-builder-agent', 'realtime-metrics-agent', 'data-warehouse-agent', 'privacy-analytics-agent',
]);
addAgents(19, 'store-growth', join(ROOT, 'ai-agents/store-growth'), [
  'app-store-optimization-agent', 'play-store-listing-agent', 'review-response-agent', 'store-experiment-agent',
]);

// Phase 20
const phase20 = [
  ['safety', ['content-safety-agent', 'csam-detection-agent', 'harassment-detection-agent', 'age-gate-agent', 'trust-safety-reviewer']],
  ['community-governance', ['community-guidelines-agent', 'appeal-review-agent', 'shadow-ban-agent', 'community-leader-agent']],
  ['testing', ['e2e-test-architect', 'load-test-agent', 'flutter-widget-test-agent', 'api-contract-test-agent', 'chaos-test-agent']],
  ['incident-command', ['incident-commander-agent', 'status-page-agent', 'postmortem-writer', 'escalation-router']],
  ['support-ecosystem', ['ticket-triage-agent', 'faq-generator-agent', 'chatbot-support-agent', 'creator-support-escalation']],
  ['platform-finance', ['billing-reconciliation-agent', 'invoice-generator', 'cost-attribution-agent', 'vendor-invoice-agent']],
  ['product-labs', ['prototype-spike-agent', 'feature-flag-experimenter', 'user-interview-synthesizer', 'competitive-feature-analyst']],
  ['cross-platform', ['ios-parity-agent', 'android-parity-agent', 'web-flutter-agent', 'desktop-strategy-agent']],
  ['founder-war-room', ['metrics-pulse-agent', 'runway-calculator', 'fundraise-deck-agent', 'competitive-landscape-agent']],
  ['media-pipeline', ['upload-ingest-agent', 'transcode-scheduler', 'thumbnail-generator', 'media-qc-agent']],
  ['internationalization', ['translation-pipeline-agent', 'rtl-layout-agent', 'locale-format-agent', 'regional-payment-agent']],
  ['platform-knowledge', ['doc-generator-agent', 'adr-writer-agent', 'onboarding-doc-agent', 'api-doc-sync-agent']],
  ['enterprise-security', ['pen-test-coordinator', 'soc2-compliance-agent', 'secrets-rotation-agent', 'vulnerability-scanner-agent']],
  ['ml-platform', ['model-registry-agent', 'feature-serving-agent', 'model-monitoring-agent', 'gpu-scheduler-agent']],
  ['search-infrastructure', ['elasticsearch-admin-agent', 'search-ranking-agent', 'autocomplete-agent', 'search-analytics-agent']],
  ['ad-network', ['ad-serving-agent', 'ad-targeting-agent', 'ad-fraud-agent', 'ad-revenue-agent']],
  ['web3', ['wallet-connect-agent', 'nft-minting-agent', 'token-economy-agent']],
  ['future-systems', ['ar-filter-agent', 'vr-experience-agent', 'ai-companion-agent', 'metaverse-bridge-agent']],
];
phase20.forEach(([domain, names]) => {
  addAgents(20, domain, join(ROOT, `ai-agents/${domain}`), names);
});

// Scaffold empty directories
const EMPTY_DIRS = [
  'apps/mobile',
  'services/api-gateway', 'services/auth-service', 'services/user-service', 'services/social-service',
  'services/livestream-service', 'services/wallet-service', 'services/media-service', 'services/notification-service',
  'services/games-service',
  'packages/shared-contracts', 'packages/shared-types', 'packages/shared-utils', 'packages/design-system',
  'infrastructure', 'docs/adr',
  'apps/social-app', 'apps/livestream-app', 'apps/astro-app', 'apps/media-app',
];
EMPTY_DIRS.forEach((d) => ensureDir(join(ROOT, d)));

// Write .gitkeep for empty service/package dirs
EMPTY_DIRS.forEach((d) => {
  const p = join(ROOT, d, '.gitkeep');
  if (!existsSync(p)) writeFileSync(p, '');
});

// Generate all agent files
let fileCount = 0;
AGENT_DEFINITIONS.forEach((agent) => {
  ensureDir(dirname(agent.path));
  const content = generateAgentContent(agent.name, agent);
  writeFileSync(agent.path, content);
  fileCount++;
});

// Generate AGENT-REGISTRY.md
const byPhase = {};
AGENT_DEFINITIONS.forEach((a) => {
  if (!byPhase[a.phase]) byPhase[a.phase] = [];
  byPhase[a.phase].push(a);
});

let registry = `# Stream Heaven Agent Registry

> Master catalog of all AI agents organized by phase, domain, and purpose.
> Generated: ${new Date().toISOString().split('T')[0]}

## Quick Reference

| Metric | Count |
|--------|-------|
| Total Agents | ${AGENT_DEFINITIONS.length} |
| Phases Covered | 2–20 |
| Domains | ${[...new Set(AGENT_DEFINITIONS.map((a) => a.domain))].length} |

## How to Use

1. Find your phase and domain below
2. Open the agent \`.md\` file
3. Copy the **Prompt Template** section into a new Cursor chat
4. Prefix with \`platform-governance/MASTER-GOVERNANCE-PROMPT.md\`

## Tech Stack (All Agents)

- **Frontend:** Flutter (Riverpod, GoRouter)
- **Backend:** Node.js, NestJS
- **Database:** PostgreSQL, Redis
- **Realtime:** Socket.IO
- **Streaming:** Agora SDK / Zego SDK
- **Storage:** AWS S3, CDN: Cloudflare
- **Auth:** Firebase Auth, OTP
- **Hosting:** AWS
- **Languages:** English, Hindi, Telugu, Tamil, Kannada, Malayalam, Bengali, Marathi, Punjabi

---

`;

Object.keys(byPhase).sort((a, b) => Number(a) - Number(b)).forEach((phase) => {
  registry += `## Phase ${phase}\n\n`;
  const domains = {};
  byPhase[phase].forEach((a) => {
    if (!domains[a.domain]) domains[a.domain] = [];
    domains[a.domain].push(a);
  });
  Object.keys(domains).sort().forEach((domain) => {
    registry += `### ${slugToTitle(domain)}\n\n`;
    registry += `| Agent | Path | Purpose |\n|-------|------|--------|\n`;
    domains[domain].forEach((a) => {
      const relPath = a.path.replace(ROOT + '/', '').replace(/\\/g, '/');
      registry += `| ${slugToTitle(a.name)} | \`${relPath}\` | ${a.role.split('.')[0]} |\n`;
    });
    registry += '\n';
  });
});

writeFileSync(join(ROOT, 'ai-agents/AGENT-REGISTRY.md'), registry);
fileCount++;

console.log(`Generated ${AGENT_DEFINITIONS.length} agent files + AGENT-REGISTRY.md`);
console.log(`Total agent-related files: ${fileCount}`);

export { AGENT_DEFINITIONS, fileCount };
