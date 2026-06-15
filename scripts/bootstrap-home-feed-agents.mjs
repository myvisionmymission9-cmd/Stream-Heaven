#!/usr/bin/env node
/**
 * One-shot generator for Home Feed System agents + Cursor skills.
 * Run: node scripts/bootstrap-home-feed-agents.mjs
 */
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const AGENT_DIR = join(ROOT, 'apps/social-app/agents/home-feed');
const SKILL_ROOT = join(ROOT, '.cursor/skills/stream-heaven/apps/social-app');

const AGENTS = [
  {
    slug: 'home-feed-architect-agent',
    title: 'Home Feed Architect Agent',
    role: 'Overall Home Feed system design — TikTok-style vertical surfaces, tab model, content union, and integration boundaries.',
    responsibilities: [
      'Define Home Feed scope: tabs (Trending, Videos, Following, Celebrity) and Create Post entry',
      'Specify FeedItem union for short video, image, audio, live, audio room, community, crypto posts',
      'Coordinate vertical scroll architecture with preload, autoplay, and engagement rail',
      'Document handoffs to feed-recommendation-engine and trending-algorithm agents',
      'Align Flutter `apps/mobile/lib/features/home_feed/` with OpenAPI in packages/shared-contracts',
    ],
    mission: 'Architect the scoped Home Feed system — tabs, content types, vertical player, ranking hooks, and mobile shell.',
    deliverables: [
      'docs/HOME-FEED-SYSTEM-ARCHITECTURE.md updates',
      'Feed tab routing and content-type matrix',
      'Integration map to social-service and ranking pipelines',
    ],
    deps: [
      'apps/social-app/agents/feed-architect.md',
      'apps/social-app/agents/home-feed/home-feed-tab-orchestrator-agent.md',
      'apps/social-app/agents/home-feed/feed-recommendation-engine-agent.md',
    ],
    skills: ['Home feed architecture', 'Tab + content union design', 'Vertical feed UX contracts'],
  },
  {
    slug: 'home-feed-tab-orchestrator-agent',
    title: 'Home Feed Tab Orchestrator Agent',
    role: 'Tab routing for Trending, Videos, Following, Celebrity — cursor pagination per tab and cache isolation.',
    responsibilities: [
      'Map FeedTab enum to API query params and Riverpod providers',
      'Isolate feed caches per tab with stale-while-revalidate',
      'Handle Create Post tab as navigation action, not feed fetch',
      'Debounce tab switches to avoid player thrash on vertical PageView',
      'Emit analytics events per tab impression and swipe depth',
    ],
    mission: 'Orchestrate Home Feed top tabs — routing, state, and pagination per surface.',
    deliverables: ['Tab provider graph', 'Per-tab cursor pagination spec', 'Tab switch analytics events'],
    deps: [
      'apps/social-app/agents/home-feed/home-feed-architect-agent.md',
      'apps/social-app/agents/home-feed/vertical-video-feed-agent.md',
    ],
    skills: ['FeedTab routing', 'Per-tab Riverpod state', 'Tab analytics'],
  },
  {
    slug: 'vertical-video-feed-agent',
    title: 'Vertical Video Feed Agent',
    role: 'TikTok-style vertical infinite scroll player — PageView, autoplay, mute policy, and completion tracking.',
    responsibilities: [
      'Implement vertical PageView with one item per viewport height',
      'Autoplay active item; pause off-screen; respect low-end device caps',
      'Track watch time and completion for ranking signal batch upload',
      'Support image and live card fallbacks in same scroll surface',
      'Integrate with feed-preload-buffer-agent for next-item warm-up',
    ],
    mission: 'Build the vertical video feed scroll experience with autoplay and watch signals.',
    deliverables: ['PageView controller lifecycle', 'Watch event batching client', 'Autoplay policy doc'],
    deps: [
      'apps/social-app/agents/home-feed/feed-preload-buffer-agent.md',
      'apps/social-app/agents/reels-short-video-agent.md',
    ],
    skills: ['Vertical PageView', 'Autoplay lifecycle', 'Watch event ingestion'],
  },
  {
    slug: 'feed-recommendation-engine-agent',
    title: 'Feed Recommendation Engine Agent',
    role: 'Scoring formula spec for personalized feed — watch time, completion, rewatch, shares, follows, likes.',
    responsibilities: [
      'Document rank score: engagement blend + recency + diversity penalties',
      'Define client signal schema matching /social/engagement/watch-events',
      'Specify cold-start and following-tab vs trending-tab ranker differences',
      'Coordinate A/B rankingVersion header from FeedResponse',
      'Escalate ML ranker forks to ADR when replacing rule-based v1',
    ],
    mission: 'Specify feed recommendation scoring and signal contracts (Home Feed scope only).',
    deliverables: ['Ranking formula doc', 'Signal weight table', 'rankingVersion rollout notes'],
    deps: [
      'apps/social-app/agents/feed-ranking-agent.md',
      'apps/social-app/agents/home-feed/trending-algorithm-agent.md',
    ],
    skills: ['Rank score formula', 'Watch signal weights', 'A/B ranker versioning'],
  },
  {
    slug: 'trending-algorithm-agent',
    title: 'Trending Algorithm Agent',
    role: 'Trending tab score formula — velocity, engagement rate, recency decay, and regional boosts.',
    responsibilities: [
      'Define trendingScore = f(velocity, engagementRate, recency, shareRate, creatorTrust)',
      'Apply time-window aggregation (1h, 24h) with Redis counters',
      'Boost verified celebrity content within policy caps on Celebrity tab',
      'Anti-gaming: cap single-user like velocity and bot detection hooks',
      'Expose debug rankScore when X-Rank-Debug enabled',
    ],
    mission: 'Design and document the Trending tab ranking formula and anti-abuse guardrails.',
    deliverables: ['Trending formula spec', 'Velocity window config', 'Celebrity boost policy'],
    deps: [
      'apps/social-app/agents/hashtag-trending-agent.md',
      'apps/social-app/agents/home-feed/feed-recommendation-engine-agent.md',
    ],
    skills: ['Trending velocity formula', 'Recency decay', 'Anti-gaming caps'],
  },
  {
    slug: 'celebrity-feed-agent',
    title: 'Celebrity Feed Agent',
    role: 'Verified celebrity tab — filter to isCelebrity creators, badge UI, and trust-weighted ordering.',
    responsibilities: [
      'Filter feed items where author.isCelebrity is true',
      'Coordinate verification badge with creator-verification policies',
      'Apply celebrity-specific ranking boosts without crowding out new creators on other tabs',
      'Support follow CTA and exclusive sound attribution in overlay',
      'Placeholder hooks for brand-safe ad slots (no full ad network build)',
    ],
    mission: 'Curate the Celebrity tab feed surface and verified creator presentation.',
    deliverables: ['Celebrity filter API params', 'Badge UI spec', 'Trust-weight tuning doc'],
    deps: [
      'apps/social-app/agents/creator-profile-enhancer.md',
      'apps/social-app/agents/home-feed/home-feed-tab-orchestrator-agent.md',
    ],
    skills: ['Celebrity verification filter', 'Badge UI', 'Trust-weighted ranking'],
  },
  {
    slug: 'create-post-entry-agent',
    title: 'Create Post Entry Agent',
    role: 'Create Post top-tab entry — composer route, media picker hooks, and draft sync placeholder.',
    responsibilities: [
      'Wire Create Post tab to composer navigation (not a feed fetch tab)',
      'Define entry points: video, image, audio, community, crypto post types',
      'Stub upload flow via media-service presign contracts',
      'Deep link from bottom nav long-press if product adds later',
      'i18n strings for composer labels via ARB files',
    ],
    mission: 'Design Create Post entry flow from Home Feed top bar (UI + route only in Phase 8).',
    deliverables: ['Composer route map', 'Post type picker spec', 'Upload stub integration notes'],
    deps: ['apps/social-app/agents/home-feed/home-feed-architect-agent.md'],
    skills: ['Composer navigation', 'Post type entry', 'Media upload stubs'],
  },
  {
    slug: 'feed-creator-overlay-agent',
    title: 'Feed Creator Overlay Agent',
    role: 'Instagram/TikTok-style creator overlay — handle, follow button, original sound, caption.',
    responsibilities: [
      'Bottom-left overlay: @handle, Follow/Following, sound attribution line',
      'Safe-area and thumb-zone layout for one-hand use',
      'Follow mutation via /social/users/{id}/follow with optimistic UI',
      'Sound disc spin animation synced to playback state (visual only in v1)',
      'Accessibility: screen reader order for handle and follow action',
    ],
    mission: 'Implement creator metadata overlay on feed items.',
    deliverables: ['CreatorOverlay widget spec', 'Follow optimistic update', 'Sound attribution UI'],
    deps: [
      'apps/social-app/agents/follow-system-agent.md',
      'apps/social-app/agents/home-feed/vertical-video-feed-agent.md',
    ],
    skills: ['Creator overlay layout', 'Follow mutation UX', 'Sound attribution'],
  },
  {
    slug: 'feed-engagement-rail-agent',
    title: 'Feed Engagement Rail Agent',
    role: 'Right-side action rail — avatar+follow, gift, like, comment, share counts and tap handlers.',
    responsibilities: [
      'Vertical rail: creator avatar, gift, like+count, comment+count, share+count, spinning disc',
      'Wire like toggle to POST /social/posts/{id}/like',
      'Gift button opens wallet gift-intent placeholder (no full wallet UI)',
      'Share invokes sharePost contract; comment opens sheet placeholder',
      'Haptic feedback on like; animate count changes',
    ],
    mission: 'Build the right-side engagement rail for Home Feed items.',
    deliverables: ['EngagementRail widget', 'API hook map', 'Placeholder sheets for comment/gift'],
    deps: [
      'apps/social-app/agents/reaction-system-agent.md',
      'apps/social-app/agents/home-feed/feed-creator-overlay-agent.md',
    ],
    skills: ['Engagement rail UI', 'Like/share API hooks', 'Gift intent placeholder'],
  },
  {
    slug: 'feed-preload-buffer-agent',
    title: 'Feed Preload Buffer Agent',
    role: 'Smart preload and adaptive bitrate hints for vertical feed — next N items, thumbnail-first.',
    responsibilities: [
      'Preload next 1–2 video manifests/thumbnails based on network quality',
      'Adaptive policy: WiFi vs cellular bitrate ceilings',
      'Cancel preload when user swipes away quickly (skip signal)',
      'Memory budget for decoded frames on low-RAM devices',
      'Coordinate with video player agent for buffer health metrics',
    ],
    mission: 'Optimize Home Feed preload and adaptive playback client behavior.',
    deliverables: ['Preload queue spec', 'Network-aware policy table', 'Memory cap guidelines'],
    deps: ['apps/social-app/agents/home-feed/vertical-video-feed-agent.md'],
    skills: ['Video preload queue', 'Adaptive bitrate policy', 'Low-RAM caps'],
  },
  {
    slug: 'feed-crypto-content-agent',
    title: 'Feed Crypto Content Agent',
    role: 'Crypto post card type in feed — token ticker, price delta, disclaimer, and deep link stub.',
    responsibilities: [
      'Define crypto_post FeedItem variant in feed.v1.yaml extension',
      'Render crypto card with ticker, 24h change, and “Not financial advice” disclaimer',
      'No wallet/trading execution in feed scope — link-out placeholder only',
      'Moderation flag for unverified token promotions',
      'Regional compliance copy via i18n',
    ],
    mission: 'Add crypto-content post support to Home Feed cards (display + contract stub).',
    deliverables: ['CryptoFeedItem schema', 'Crypto card widget', 'Compliance disclaimer strings'],
    deps: ['apps/social-app/agents/home-feed/home-feed-architect-agent.md'],
    skills: ['Crypto feed card', 'Disclaimer compliance', 'OpenAPI crypto_post variant'],
  },
  {
    slug: 'feed-regional-discovery-agent',
    title: 'Feed Regional Discovery Agent',
    role: 'Moj/ShareChat-style vernacular and regional discovery hooks — language tags, state boosts.',
    responsibilities: [
      'Pass X-Locale and preferred language list on feed requests',
      'Boost content matching viewer region/state when tab is Trending or Videos',
      'Hashtag and audio trend hooks for Telugu, Hindi, Tamil, Kannada, etc.',
      'Avoid filter bubbles via diversity injection every N items',
      'Document regional ranking weights for feed-recommendation-engine',
    ],
    mission: 'Design regional/vernacular discovery hooks for Home Feed ranking and client headers.',
    deliverables: ['Locale header spec', 'Regional boost weights', 'Diversity injection rule'],
    deps: [
      'apps/social-app/agents/home-feed/feed-recommendation-engine-agent.md',
      'ai-agents/growth-ai/regional-language-growth.md',
    ],
    skills: ['Locale feed headers', 'Vernacular boost hooks', 'Diversity injection'],
  },
  {
    slug: 'home-feed-api-contract-agent',
    title: 'Home Feed API Contract Agent',
    role: 'OpenAPI for Home Feed endpoints — extend social.v1 and feed.v1 stubs with full FeedItem union.',
    responsibilities: [
      'Maintain packages/shared-contracts/openapi/feed.v1.yaml and social.v1.yaml alignment',
      'Add missing item types: audio_post, audio_room, community_post, crypto_post, image_post',
      'Document watch-events batch and engagement endpoints for feed rankers',
      'Ensure contract-first before NestJS social-service implementation',
      'Run openapi lint and contract validation scripts',
    ],
    mission: 'Author and maintain Home Feed OpenAPI contracts (contract-first).',
    deliverables: ['feed.v1.yaml', 'social.v1.yaml sync notes', 'Schema changelog'],
    deps: ['ai-agents/core-engineering/backend/api-contract-author.md'],
    skills: ['OpenAPI feed schemas', 'FeedItem union', 'Contract validation'],
  },
  {
    slug: 'home-feed-flutter-ui-agent',
    title: 'Home Feed Flutter UI Agent',
    role: 'Flutter Home Feed screens/widgets — TikTok layout, tabs, bottom nav, Riverpod, GoRouter.',
    responsibilities: [
      'Implement apps/mobile/lib/features/home_feed/ production UI',
      'Top TabBar with icons; bottom nav: Home, Live, Audio, Astro, TV',
      'Integrate vertical PageView, engagement rail, creator overlay',
      'All user strings via app_en.arb / l10n; no hardcoded secrets',
      'Match design_system ShTheme dark theme',
    ],
    mission: 'Build Home Feed Flutter UI matching TikTok-style reference (scoped to feed shell).',
    deliverables: ['HomeFeedScreen', 'Widget library under home_feed/', 'Router integration'],
    deps: [
      'apps/social-app/agents/home-feed/vertical-video-feed-agent.md',
      'apps/social-app/agents/home-feed/feed-engagement-rail-agent.md',
    ],
    skills: ['Flutter home feed UI', 'Riverpod providers', 'GoRouter routes'],
  },
  {
    slug: 'home-feed-qa-agent',
    title: 'Home Feed QA Agent',
    role: 'Smoke and widget tests for Home Feed — tab switch, overlay presence, rail taps.',
    responsibilities: [
      'Widget tests for HomeFeedScreen tab bar and engagement rail',
      'Golden-test critical layouts on small phone viewport',
      'Integration smoke: mock feed provider renders 3 vertical items',
      'Validate l10n keys exist for all feed strings',
      'Run flutter test and document CI gate for home_feed feature',
    ],
    mission: 'QA Home Feed Flutter UI and contract alignment (tests + checklists).',
    deliverables: ['test/home_feed_screen_test.dart', 'Smoke test checklist', 'CI notes'],
    deps: ['apps/social-app/agents/home-feed/home-feed-flutter-ui-agent.md'],
    skills: ['Widget tests', 'Feed smoke tests', 'L10n validation'],
  },
];

function agentMd(a) {
  const resp = a.responsibilities.map((r) => `- ${r}`).join('\n');
  const del = a.deliverables.map((d) => `- ${d}`).join('\n');
  const dep = a.deps.map((d) => `- ${d}`).join('\n');
  const relPath = `apps/social-app/agents/home-feed/${a.slug}.md`;
  return `# ${a.title}

## Role
${a.role}

## Responsibilities
${resp}

## Inputs
- packages/shared-contracts/openapi/feed.v1.yaml and social.v1.yaml
- docs/HOME-FEED-SYSTEM-ARCHITECTURE.md
- apps/mobile/lib/features/home_feed/
- platform-governance/flutter-ui-rules.md

## Outputs
${del}

## Dependencies
${dep}

## Governance References
- platform-governance/MASTER-AI-OPERATING-SYSTEM.md
- platform-governance/flutter-ui-rules.md
- platform-governance/api-standards.md
- platform-governance/security-rules.md

## Execution Context
- Phase: 8
- Domain: social-app (Home Feed scoped)
- Tech Stack: Flutter (Riverpod, GoRouter), NestJS, PostgreSQL, Redis, Socket.IO, AWS

## Scope Boundary
Home Feed ONLY — no full wallet, admin, or live streaming backend. UI placeholders and contract hooks only where noted.

## Skills
- Basic: \`.cursor/skills/stream-heaven/apps/social-app/${a.slug}/basic/SKILL.md\`
- Advanced: \`.cursor/skills/stream-heaven/apps/social-app/${a.slug}/advanced/SKILL.md\`

## Prompt Template

\`\`\`
You are the ${a.title} for Stream Heaven — Home Feed System (scoped).

Context:
- Surface: Home tab vertical feed with top tabs Trending, Videos, Following, Celebrity, Create Post
- Content: short video, image, audio, live, audio room, community, crypto posts
- Stack: Flutter (Riverpod, GoRouter), NestJS, PostgreSQL, Redis, Socket.IO, AWS
- Audience: Indian + global; low-end Android; vernacular (Telugu, Hindi, Tamil, etc.)

Governance:
- platform-governance/MASTER-AI-OPERATING-SYSTEM.md
- platform-governance/flutter-ui-rules.md
- platform-governance/api-standards.md

Your mission: ${a.mission}

Deliverables:
${del}

Constraints:
- Home Feed scope ONLY; contract-first in packages/shared-contracts/
- No secrets in repo; coordinate with Dependencies agents — no duplicate services
- Escalate architecture forks via docs/adr/SH-000-template.md

Begin by stating your plan, then execute.
\`\`\`
`;
}

function basicSkill(a) {
  const skills = a.skills.map((s) => `- ${s}`).join('\n');
  return `---
name: stream-heaven-apps-social-app-${a.slug}-basic
description: >-
  Basic Cursor skill for Stream Heaven ${a.title.replace(' Agent', '')} (phase 8).
  Home Feed scoped — single-agent execution with governance prefix.
---

# ${a.title.replace(' Agent', '')} — Basic

## When to use

- User invokes **${a.title.replace(' Agent', '')}** or Home Feed work in **apps/mobile/lib/features/home_feed/**
- Phase 8 social-app; scope limited to Home Feed (not full platform)

## Agent

- **Path:** \`apps/social-app/agents/home-feed/${a.slug}.md\`
- **Role:** ${a.role}

## Scope (basic)

- Load \`platform-governance/MASTER-AI-OPERATING-SYSTEM.md\`
- Open agent markdown and copy its \`## Prompt Template\` block
- Contract-first: \`packages/shared-contracts/openapi/feed.v1.yaml\`
- Run \`node scripts/validate-agents.mjs\` after agent edits

## Role-specific focus

${skills}

## Key paths

| Resource | Path |
|----------|------|
| Architecture | \`docs/HOME-FEED-SYSTEM-ARCHITECTURE.md\` |
| Flutter feature | \`apps/mobile/lib/features/home_feed/\` |
| OpenAPI | \`packages/shared-contracts/openapi/feed.v1.yaml\` |
| Validate agents | \`node scripts/validate-agents.mjs\` |

## Validation

\`\`\`powershell
node scripts/validate-agents.mjs
flutter analyze apps/mobile
flutter test apps/mobile/test/home_feed
\`\`\`
`;
}

function advancedSkill(a) {
  return `---
name: stream-heaven-apps-social-app-${a.slug}-advanced
description: >-
  Advanced Cursor skill for Stream Heaven ${a.title.replace(' Agent', '')} (phase 8).
  Home Feed multi-agent orchestration, ADRs, production validation.
---

# ${a.title.replace(' Agent', '')} — Advanced

## When to use

- Cross-agent Home Feed features, production readiness, or multi-chat orchestration
- Ranking, preload, or regional discovery changes touching multiple services

## Agent

- **Path:** \`apps/social-app/agents/home-feed/${a.slug}.md\`

## Scope (advanced)

- Coordinate via \`ai-agents/orchestration/task-router.md\` and \`quality-gate.md\`
- ADR for architecture forks: \`docs/adr/SH-000-template.md\`
- Run \`node scripts/test-golden-agents.mjs\` after bulk agent changes
- Enforce Home Feed boundary — defer wallet/live backend to their domain agents

## Orchestration

- **Architect:** home-feed-architect-agent
- **Contracts:** home-feed-api-contract-agent
- **UI:** home-feed-flutter-ui-agent
- **QA:** home-feed-qa-agent

## Validation

\`\`\`powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
flutter test apps/mobile/test/home_feed
\`\`\`
`;
}

mkdirSync(AGENT_DIR, { recursive: true });

for (const a of AGENTS) {
  const agentPath = join(AGENT_DIR, `${a.slug}.md`);
  writeFileSync(agentPath, agentMd(a), 'utf8');

  for (const tier of ['basic', 'advanced']) {
    const skillDir = join(SKILL_ROOT, a.slug, tier);
    mkdirSync(skillDir, { recursive: true });
    const content = tier === 'basic' ? basicSkill(a) : advancedSkill(a);
    writeFileSync(join(skillDir, 'SKILL.md'), content, 'utf8');
  }
}

console.log(`Created ${AGENTS.length} agents in ${AGENT_DIR}`);
console.log(`Created ${AGENTS.length * 2} skills under ${SKILL_ROOT}`);
