#!/usr/bin/env node
/**
 * One-shot generator for Global Creator Ecosystem agents + Cursor skills.
 * Covers: creator profile, video pipeline, audio rooms, notifications,
 *         admin panel, community, and analytics stubs.
 *
 * Run: node scripts/bootstrap-creator-ecosystem-agents.mjs
 *
 * Pattern mirrors: scripts/bootstrap-home-feed-agents.mjs
 */
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKILL_ROOT = join(ROOT, '.cursor/skills/stream-heaven');

// ─── Agent definitions ──────────────────────────────────────────────────────

const CREATOR_AGENTS = [
  {
    slug: 'creator-public-profile-agent',
    dir: 'apps/social-app/agents/creator',
    skillDir: 'apps/social-app/creator-public-profile-agent',
    title: 'Creator Public Profile Agent',
    phase: '12',
    domain: 'social-app (Creator Profile)',
    role: 'Instagram-style public creator profile page — avatar, bio, follower counts, post grid, follow/unfollow, celebrity badge.',
    mission: 'Build the public creator profile Flutter screen and wire profile API contract (Phase 12).',
    responsibilities: [
      'Define CreatorProfileModel with userId, handle, displayName, avatarUrl, bio, followerCount, followingCount, postCount, isCelebrity',
      'Implement GET /users/{handle} resolution and mock data provider via Riverpod',
      'Build CreatorProfileScreen: avatar hero, stats bar, follow button, post thumbnail grid',
      'Handle celebrity badge overlay (isCelebrity flag from user.v1.yaml)',
      'Wire router route /creator/:handle in GoRouter with deep-link support',
      'i18n all user strings via app_en.arb',
      'Add widget test: profile renders with mock data, follow button present',
    ],
    deliverables: [
      'apps/mobile/lib/features/social/presentation/creator/creator_profile_screen.dart',
      'apps/mobile/lib/features/social/presentation/creator/domain/creator_profile_models.dart',
      'apps/mobile/lib/features/social/presentation/creator/data/creator_profile_mock_data.dart',
      'apps/mobile/lib/features/social/presentation/creator/providers/creator_profile_providers.dart',
      'apps/mobile/lib/features/social/presentation/creator/widgets/creator_stats_bar.dart',
      'apps/mobile/lib/features/social/presentation/creator/widgets/creator_post_grid.dart',
      'Route /creator/:handle in app_router.dart',
    ],
    deps: [
      'packages/shared-contracts/openapi/user.v1.yaml',
      'apps/social-app/agents/home-feed/celebrity-feed-agent.md',
      'ai-agents/creator-economy/creator-dashboard-agent.md',
    ],
    skills: ['Public profile Flutter screen', 'Follow/unfollow mutation', 'Celebrity badge display'],
    inputs: [
      'packages/shared-contracts/openapi/user.v1.yaml',
      'apps/mobile/lib/features/profile/presentation/profile_screen.dart (account settings reference)',
      'apps/mobile/lib/features/social/presentation/home/ (home feed reference)',
      'docs/GLOBAL-CREATOR-ECOSYSTEM-ARCHITECTURE.md',
    ],
  },
  {
    slug: 'creator-post-composer-agent',
    dir: 'apps/social-app/agents/creator',
    skillDir: 'apps/social-app/creator-post-composer-agent',
    title: 'Creator Post Composer Agent',
    phase: '8',
    domain: 'social-app (Creator Post)',
    role: 'Create Post entry flow — text/image/video/audio picker, caption editor, draft sync, upload stub.',
    mission: 'Design and implement the Create Post composer route (Phase 8 stub, Phase 12 full).',
    responsibilities: [
      'Wire Create Post from Home Feed top-tab and bottom-nav long-press',
      'Post type picker: video, image, audio, text, community, crypto',
      'Caption editor with hashtag and @mention highlighting',
      'Image/video picker via file_picker or image_picker Flutter packages',
      'Upload stub: presign via GET /media/upload-intent (media.v1.yaml)',
      'Draft auto-save to local storage (Hive or shared_preferences)',
      'i18n all composer labels via ARB',
    ],
    deliverables: [
      'apps/mobile/lib/features/social/presentation/composer/post_composer_screen.dart',
      'apps/mobile/lib/features/social/presentation/composer/widgets/post_type_picker.dart',
      'Route /compose in app_router.dart',
      'Upload intent integration notes',
    ],
    deps: [
      'apps/social-app/agents/home-feed/create-post-entry-agent.md',
      'packages/shared-contracts/openapi/media.v1.yaml',
      'packages/shared-contracts/openapi/social.v1.yaml',
    ],
    skills: ['Post composer UI', 'Media picker integration', 'Upload intent stub'],
    inputs: [
      'packages/shared-contracts/openapi/social.v1.yaml (createPost endpoint)',
      'packages/shared-contracts/openapi/media.v1.yaml (upload-intent)',
      'apps/social-app/agents/home-feed/create-post-entry-agent.md',
    ],
  },
  {
    slug: 'creator-stats-dashboard-agent',
    dir: 'apps/social-app/agents/creator',
    skillDir: 'apps/social-app/creator-stats-dashboard-agent',
    title: 'Creator Stats Dashboard Agent',
    phase: '12',
    domain: 'social-app (Creator Dashboard)',
    role: 'Creator-facing dashboard: views, followers gained, watch time, earnings, and content performance.',
    mission: 'Build creator stats dashboard Flutter screen backed by analytics read API (Phase 12 stub).',
    responsibilities: [
      'Fetch creator stats: total views, 7-day views, followers gained, earnings balance',
      'Display chart stubs (fl_chart or charts_flutter) with placeholder data',
      'Top-performing posts list with thumbnail and engagement counts',
      'Earnings section: coinBalance, earningsBalance from wallet.v1.yaml',
      'Withdrawal request CTA (Phase 11+ live; stub modal for now)',
      'i18n dashboard labels',
    ],
    deliverables: [
      'apps/mobile/lib/features/social/presentation/creator/creator_dashboard_screen.dart',
      'Route /creator/dashboard in app_router.dart',
      'Creator stats mock data',
    ],
    deps: [
      'apps/social-app/agents/creator/creator-public-profile-agent.md',
      'packages/shared-contracts/openapi/wallet.v1.yaml',
      'ai-agents/creator-economy/creator-analytics-agent.md',
    ],
    skills: ['Dashboard Flutter screen', 'Earnings display', 'Stats chart stubs'],
    inputs: [
      'packages/shared-contracts/openapi/wallet.v1.yaml',
      'ai-agents/creator-economy/creator-analytics-agent.md',
    ],
  },
];

const VIDEO_PIPELINE_AGENTS = [
  {
    slug: 'video-upload-pipeline-agent',
    dir: 'apps/social-app/agents/video-pipeline',
    skillDir: 'apps/social-app/video-upload-pipeline-agent',
    title: 'Video Upload Pipeline Agent',
    phase: '17',
    domain: 'social-app (Media Pipeline)',
    role: 'Client-side video upload orchestration — presigned S3 intent, chunked upload, transcode polling.',
    mission: 'Implement the Flutter video upload flow from picker to CDN-ready playback URL (Phase 17).',
    responsibilities: [
      'Request presigned PUT URL via POST /media/upload-intent (media.v1.yaml)',
      'Chunked upload to S3 with retry and progress reporting',
      'Poll GET /media/{assetId} for status: PROCESSING → READY',
      'Attach assetId to createPost request once READY',
      'Upload progress UI (circular progress + cancel button)',
      'Network-aware: pause on poor connectivity; resume on reconnect',
    ],
    deliverables: [
      'Video upload Riverpod provider',
      'Upload progress widget',
      'media.v1.yaml integration notes',
      'Retry + cancel policy doc',
    ],
    deps: [
      'packages/shared-contracts/openapi/media.v1.yaml',
      'apps/social-app/agents/creator/creator-post-composer-agent.md',
      'ai-agents/media-pipeline/upload-ingest-agent.md',
    ],
    skills: ['Presigned S3 upload', 'Transcode polling', 'Upload progress UI'],
    inputs: [
      'packages/shared-contracts/openapi/media.v1.yaml',
      'ai-agents/media-pipeline/upload-ingest-agent.md',
    ],
  },
  {
    slug: 'hls-playback-agent',
    dir: 'apps/social-app/agents/video-pipeline',
    skillDir: 'apps/social-app/hls-playback-agent',
    title: 'HLS Playback Agent',
    phase: '17',
    domain: 'social-app (Media Pipeline)',
    role: 'HLS video player integration — adaptive bitrate, thumbnail first-frame, offline caching hints.',
    mission: 'Implement HLS video playback in Flutter using video_player or better_player (Phase 17).',
    responsibilities: [
      'HLS manifest consumption via video_player + better_player package',
      'Adaptive bitrate: WiFi → 1080p, 4G → 720p, 2G/3G → 480p',
      'Thumbnail-first loading: show thumbnail until first-frame decoded',
      'Memory budget: max 2 players initialized in background (vertical scroll)',
      'Error fallback: CDN miss → retry with lower quality tier',
      'Analytics: emit watch-start, watch-progress, completion, rewatch events',
    ],
    deliverables: [
      'HlsVideoPlayer widget',
      'Bitrate policy config table',
      'Watch event schema doc',
    ],
    deps: [
      'apps/social-app/agents/home-feed/feed-preload-buffer-agent.md',
      'apps/social-app/agents/video-pipeline/video-upload-pipeline-agent.md',
      'ai-agents/media-pipeline/cdn-routing-agent.md',
    ],
    skills: ['HLS adaptive playback', 'Memory-efficient player', 'Watch analytics events'],
    inputs: [
      'packages/shared-contracts/openapi/media.v1.yaml',
      'apps/social-app/agents/home-feed/feed-preload-buffer-agent.md',
    ],
  },
];

const AUDIO_ROOM_AGENTS = [
  {
    slug: 'audio-room-seat-agent',
    dir: 'apps/social-app/agents/audio-rooms',
    skillDir: 'apps/social-app/audio-room-seat-agent',
    title: 'Audio Room Seat Agent',
    phase: '9',
    domain: 'social-app (Audio Rooms)',
    role: 'Audio room seat model — speaker slots (8/16/24), audience rows, raise-hand, mute, kick.',
    mission: 'Design and implement the audio room seat grid UI and seat state management (Phase 9).',
    responsibilities: [
      'Define seat model: seatIndex, userId, role (SPEAKER|LISTENER), muted, handRaised',
      'Seat grid widget: hex/linear layout for 8, 16, or 24 speaker slots',
      'Raise-hand queue: audience taps raise-hand; host approves/rejects',
      'Seat mutations via Socket.IO events: seat.filled, seat.vacated, seat.muted',
      'RBAC: only MODERATOR/host can forcibly mute or kick',
      'Connect to livestream.v1.yaml audio-room endpoints',
    ],
    deliverables: [
      'AudioRoomSeatGrid widget',
      'Seat state Riverpod provider',
      'Socket event contracts for seat operations',
    ],
    deps: [
      'apps/livestream-app/agents/core/audio-room-agent.md',
      'apps/livestream-app/agents/multi-guest/seat-management-agent.md',
      'packages/shared-contracts/openapi/livestream.v1.yaml',
    ],
    skills: ['Seat grid UI', 'Raise-hand flow', 'Socket seat events'],
    inputs: [
      'packages/shared-contracts/openapi/livestream.v1.yaml',
      'apps/livestream-app/agents/core/audio-room-agent.md',
    ],
  },
  {
    slug: 'audio-room-gifting-agent',
    dir: 'apps/social-app/agents/audio-rooms',
    skillDir: 'apps/social-app/audio-room-gifting-agent',
    title: 'Audio Room Gifting Agent',
    phase: '10',
    domain: 'social-app (Audio Rooms)',
    role: 'Gift send surface inside audio rooms — bottom sheet, leaderboard, gift animation overlay.',
    mission: 'Wire gift sending from audio room surface via wallet.v1.yaml (Phase 10).',
    responsibilities: [
      'Gift picker bottom sheet triggered from audio room engagement bar',
      'Send gift with context.surface=livestream and roomId',
      'Gift animation overlay on room screen (confetti for basic, fullscreen for legendary)',
      'Room gift leaderboard: top 3 gifters by coinTotal with avatars',
      'Connect POST /wallet/gifts/send with Idempotency-Key',
      'Insufficient coins → navigate to wallet coin purchase stub',
    ],
    deliverables: [
      'AudioRoomGiftSheet widget',
      'Room leaderboard widget',
      'Gift animation overlay (basic tier)',
    ],
    deps: [
      'apps/social-app/agents/audio-rooms/audio-room-seat-agent.md',
      'packages/shared-contracts/openapi/wallet.v1.yaml',
      'ai-agents/gift-effects/rendering/gift-animation-agent.md',
    ],
    skills: ['Gift picker sheet', 'Wallet gift API', 'Room leaderboard'],
    inputs: [
      'packages/shared-contracts/openapi/wallet.v1.yaml',
      'ai-agents/gift-effects/rendering/gift-animation-agent.md',
    ],
  },
];

const NOTIFICATION_AGENTS = [
  {
    slug: 'push-notification-agent',
    dir: 'ai-agents/notifications',
    skillDir: 'notifications/push-notification-agent',
    title: 'Push Notification Agent',
    phase: '18',
    domain: 'notifications',
    role: 'FCM push notification dispatch — templates, device token management, per-user preferences.',
    mission: 'Design and implement push notification service with FCM (Phase 18).',
    responsibilities: [
      'Device token registration via POST /users/me/devices (user.v1.yaml)',
      'Notification templates: new_follower, gift_received, live_started, comment, mention',
      'Per-user mute preferences: DND hours, topic subscriptions',
      'Fanout: single notification → batch FCM dispatch for large follower counts',
      'Delivery receipts: track open rate per template for analytics',
      'Deep-link payload: navigate to post/profile/live room on tap',
    ],
    deliverables: [
      'notification-service scaffold (NestJS module stub)',
      'FCM template definitions',
      'Device token registration flow',
      'notification.v1.yaml stub (Phase 18)',
    ],
    deps: [
      'packages/shared-contracts/openapi/user.v1.yaml',
      'services/notification-service (Phase 18)',
      'ai-agents/growth-ai/push-notification-growth.md',
    ],
    skills: ['FCM dispatch', 'Notification templates', 'Deep-link payloads'],
    inputs: [
      'packages/shared-contracts/openapi/user.v1.yaml',
      'platform-governance/api-standards.md',
    ],
  },
  {
    slug: 'in-app-notification-agent',
    dir: 'ai-agents/notifications',
    skillDir: 'notifications/in-app-notification-agent',
    title: 'In-App Notification Agent',
    phase: '18',
    domain: 'notifications',
    role: 'In-app notification inbox — bell icon, unread badge, read/mark-all, notification list.',
    mission: 'Build Flutter in-app notification inbox with real-time badge updates via Socket.IO (Phase 18).',
    responsibilities: [
      'Bell icon in app bar with unread count badge (Socket.IO presence update)',
      'Notification list: grouped by day, avatar + action text + timestamp',
      'Read state: tap marks single read; swipe-to-dismiss; mark all read CTA',
      'Infinite scroll with cursor pagination from GET /notifications/inbox',
      'Empty state illustration',
      'i18n all notification action strings',
    ],
    deliverables: [
      'NotificationInboxScreen Flutter widget',
      'Unread badge provider (Riverpod)',
      'GET /notifications/inbox contract stub',
    ],
    deps: [
      'ai-agents/notifications/push-notification-agent.md',
      'ai-agents/notifications/notification-dispatch-agent.md',
      'packages/shared-contracts/openapi/user.v1.yaml',
    ],
    skills: ['Notification inbox Flutter', 'Unread badge Socket', 'Cursor paginated list'],
    inputs: [
      'apps/mobile/lib/features/social/presentation/home/social_home_shell.dart',
      'platform-governance/flutter-ui-rules.md',
    ],
  },
  {
    slug: 'notification-dispatch-agent',
    dir: 'ai-agents/notifications',
    skillDir: 'notifications/notification-dispatch-agent',
    title: 'Notification Dispatch Agent',
    phase: '18',
    domain: 'notifications',
    role: 'Fan-out orchestration — consume domain events, resolve recipients, dispatch push + in-app.',
    mission: 'Design the notification fan-out pipeline from domain events to multi-channel dispatch (Phase 18).',
    responsibilities: [
      'Consume Kafka/Redis events: user.followed, gift.sent, post.commented, live.started',
      'Resolve recipient list (single or fan-out to all followers)',
      'Deduplicate: avoid notification flood for high-follower celebrities',
      'Route to FCM push and Socket.IO in-app concurrently',
      'Rate-limit: max 10 push/hour per user per sender',
      'Dead-letter queue for failed dispatches with retry backoff',
    ],
    deliverables: [
      'Dispatch pipeline design doc',
      'Event → notification template mapping table',
      'Rate-limit and dedup policy spec',
    ],
    deps: [
      'ai-agents/notifications/push-notification-agent.md',
      'ai-agents/event-system/event-stream-agent.md',
      'ai-agents/event-system/dead-letter-queue-agent.md',
    ],
    skills: ['Event-driven fan-out', 'Rate limiting', 'Multi-channel dispatch'],
    inputs: [
      'packages/shared-contracts/openapi/user.v1.yaml',
      'ai-agents/event-system/event-stream-agent.md',
    ],
  },
];

const ADMIN_AGENTS = [
  {
    slug: 'admin-panel-bff-agent',
    dir: 'ai-agents/admin',
    skillDir: 'admin/admin-panel-bff-agent',
    title: 'Admin Panel BFF Agent',
    phase: '20',
    domain: 'admin',
    role: 'Admin backend-for-frontend — role-gated read models for ops console (celebrity, withdrawals, reports).',
    mission: 'Design the admin BFF API boundaries and RBAC enforcement for all ops actions (Phase 20).',
    responsibilities: [
      'RBAC: only ADMIN role accesses /admin/* routes via api-gateway',
      'Celebrity verification queue: list candidates, approve/reject with reason',
      'Withdrawal queue: list pending, approve/reject, audit trail',
      'Content reports: list, assign moderator, close with action taken',
      'User lookup: profile, ban, suspend, reset password',
      'Audit log: every admin action persisted with adminUserId + timestamp',
    ],
    deliverables: [
      'Admin BFF API design doc',
      'RBAC admin route guards spec',
      'Admin audit log schema',
      'Celebrity + withdrawal + report endpoint stubs',
    ],
    deps: [
      'ai-agents/admin/celebrity-approval-agent.md',
      'ai-agents/admin/withdrawal-approval-agent.md',
      'ai-agents/safety/trust-safety-agent.md',
      'packages/shared-contracts/openapi/user.v1.yaml',
    ],
    skills: ['Admin BFF design', 'RBAC guards', 'Audit log spec'],
    inputs: [
      'platform-governance/MASTER-AI-OPERATING-SYSTEM.md',
      'platform-governance/security-rules.md',
    ],
  },
  {
    slug: 'celebrity-approval-agent',
    dir: 'ai-agents/admin',
    skillDir: 'admin/celebrity-approval-agent',
    title: 'Celebrity Approval Agent',
    phase: '20',
    domain: 'admin',
    role: 'Celebrity verification review — evidence package, admin decision, APPROVED/REJECTED with audit.',
    mission: 'Implement celebrity verification workflow: candidate → admin review → badge grant (Phase 20).',
    responsibilities: [
      'Verification candidate: creator submits linked IG/YT/X profiles + face photo',
      'Automated checks: follower threshold, engagement rate, link validity, face match score',
      'Evidence package: display in admin panel with check results and scores',
      'Admin decision: APPROVE → set isCelebrity=true + emit user.celebrity.verified event',
      'Rejection: REJECT with reason → notify creator via push notification',
      'Priority feed boost: after approval, feed-ranking pipeline applies 1.2× celebrity weight',
    ],
    deliverables: [
      'Celebrity verification candidate flow spec',
      'Automated check criteria table (scores + thresholds)',
      'PATCH /users/{id}/celebrity-status admin endpoint spec',
      'Feed boost policy after verification',
    ],
    deps: [
      'ai-agents/admin/admin-panel-bff-agent.md',
      'ai-agents/creator-economy/creator-verification-agent.md',
      'ai-agents/safety/identity-verification-agent.md',
    ],
    skills: ['Celebrity verification flow', 'Admin approval workflow', 'Feed boost policy'],
    inputs: [
      'docs/GLOBAL-CREATOR-ECOSYSTEM-ROADMAP.md (celebrity verification sequence diagram)',
      'packages/shared-contracts/openapi/user.v1.yaml',
    ],
  },
  {
    slug: 'withdrawal-approval-agent',
    dir: 'ai-agents/admin',
    skillDir: 'admin/withdrawal-approval-agent',
    title: 'Withdrawal Approval Agent',
    phase: '20',
    domain: 'admin',
    role: 'Creator withdrawal review — pending queue, tax compliance check, approve/reject with payout rail.',
    mission: 'Design creator withdrawal approval workflow from request to payout (Phase 20).',
    responsibilities: [
      'Creator requests withdrawal via POST /wallet/withdrawals (wallet.v1.yaml)',
      'Admin queue: list pending withdrawals with creator KYC status and tax docs',
      'Tax compliance: TDS deduction calc (India: 10% TDS on earnings > ₹50k/year)',
      'Admin decision: APPROVE → trigger payout rail (UPI/NEFT stub)',
      'Rejection: REJECT with reason → unhold creator earnings',
      'Settlement confirmation: payout-rail webhook → mark SETTLED + notify creator',
      'Fraud check: flag if withdrawal velocity spikes',
    ],
    deliverables: [
      'Withdrawal workflow state machine spec',
      'Tax compliance calculation notes',
      'Payout rail integration contract stub',
      'PATCH /wallet/withdrawals/{id}/status admin endpoint spec',
    ],
    deps: [
      'ai-agents/admin/admin-panel-bff-agent.md',
      'ai-agents/creator-economy/creator-payout-agent.md',
      'ai-agents/economy/tax-compliance-agent.md',
      'packages/shared-contracts/openapi/wallet.v1.yaml',
    ],
    skills: ['Withdrawal state machine', 'Tax compliance calc', 'Payout rail stub'],
    inputs: [
      'docs/GLOBAL-CREATOR-ECOSYSTEM-ROADMAP.md (wallet withdrawal sequence diagram)',
      'packages/shared-contracts/openapi/wallet.v1.yaml',
    ],
  },
];

const COMMUNITY_AGENTS = [
  {
    slug: 'community-api-agent',
    dir: 'apps/social-app/agents/community',
    skillDir: 'apps/social-app/community-api-agent',
    title: 'Community API Agent',
    phase: '20',
    domain: 'social-app (Community)',
    role: 'Community CRUD API — create/join/leave communities, roles, polls, events.',
    mission: 'Design community.v1.yaml contract and social-service community namespace (Phase 20).',
    responsibilities: [
      'Community entity: id, name, slug, description, avatarUrl, memberCount, isPublic, rules',
      'Membership: join (public), request (private), roles: OWNER, MOD, MEMBER',
      'Polls: create poll, cast vote, results after voting or deadline',
      'Events: create event, RSVP, reminder notification',
      'Community feed: posts filtered to community context',
      'Moderation: community mods can pin, delete, ban members',
    ],
    deliverables: [
      'packages/shared-contracts/openapi/community.v1.yaml extensions (Phase 20)',
      'Community NestJS module spec',
      'Membership role RBAC table',
      'Poll and event schema',
    ],
    deps: [
      'packages/shared-contracts/openapi/community.v1.yaml',
      'packages/shared-contracts/openapi/social.v1.yaml',
      'ai-agents/community-governance/community-health-agent.md',
    ],
    skills: ['Community CRUD API', 'Membership roles', 'Poll and event schemas'],
    inputs: [
      'packages/shared-contracts/openapi/social.v1.yaml',
      'packages/shared-contracts/openapi/community.v1.yaml',
    ],
  },
  {
    slug: 'fan-club-agent',
    dir: 'apps/social-app/agents/community',
    skillDir: 'apps/social-app/fan-club-agent',
    title: 'Fan Club Agent',
    phase: '20',
    domain: 'social-app (Community)',
    role: 'Creator fan club — tiers (Fan, VIP Fan, Super Fan), exclusive content, gifting perks.',
    mission: 'Design fan club tier system, exclusive content gating, and perks (Phase 20).',
    responsibilities: [
      'Fan club tiers: Fan (free), VIP Fan (coin subscription), Super Fan (premium)',
      'Exclusive posts: visibility gated by fan tier',
      'Perks: exclusive badge color, priority gift display, voice chat access',
      'Tier progression: gifting milestones unlock higher tier',
      'Creator earns from fan subscriptions (coin ledger credit)',
      'Fan club leaderboard: top gifters, total coin given, rank badge',
    ],
    deliverables: [
      'Fan club tier schema',
      'Exclusive content gating spec',
      'Perk table per tier',
      'Fan club subscription ledger flow',
    ],
    deps: [
      'apps/social-app/agents/community/community-api-agent.md',
      'packages/shared-contracts/openapi/wallet.v1.yaml',
      'ai-agents/community-governance/fan-community-agent.md',
    ],
    skills: ['Fan club tier design', 'Content gating', 'Fan leaderboard'],
    inputs: [
      'packages/shared-contracts/openapi/wallet.v1.yaml',
      'ai-agents/community-governance/fan-community-agent.md',
    ],
  },
];

const ANALYTICS_AGENTS = [
  {
    slug: 'creator-analytics-dashboard-agent',
    dir: 'apps/social-app/agents/analytics',
    skillDir: 'apps/social-app/creator-analytics-dashboard-agent',
    title: 'Creator Analytics Dashboard Agent',
    phase: '19',
    domain: 'social-app (Analytics)',
    role: 'Flutter creator analytics dashboard — view trends, watch-time charts, follower growth, earnings.',
    mission: 'Build creator analytics dashboard Flutter screen with chart stubs (Phase 12 stub, Phase 19 real data).',
    responsibilities: [
      'View metrics: total views, 7-day views, top-performing posts',
      'Audience: follower growth chart (7/30/90 days), demographics stub',
      'Engagement: avg watch time, completion rate, like/comment rate',
      'Earnings: total, current month, last 3 months (wallet.v1.yaml)',
      'fl_chart line + bar charts with loading skeletons',
      'Date range picker: 7D / 30D / 90D',
      'i18n analytics labels',
    ],
    deliverables: [
      'CreatorAnalyticsDashboardScreen Flutter widget',
      'Analytics mock data model',
      'Date range filter provider',
      'Chart skeleton loading widget',
    ],
    deps: [
      'apps/social-app/agents/creator/creator-stats-dashboard-agent.md',
      'packages/shared-contracts/openapi/wallet.v1.yaml',
      'ai-agents/creator-economy/creator-analytics-agent.md',
    ],
    skills: ['Analytics dashboard Flutter', 'fl_chart integration', 'Date range filter'],
    inputs: [
      'packages/shared-contracts/openapi/wallet.v1.yaml',
      'ai-agents/analytics-platform/dashboard-builder-agent.md',
    ],
  },
];

const ALL_AGENT_GROUPS = [
  { agents: CREATOR_AGENTS, govRef: 'Creator Profile scope — no full admin or wallet backend in Flutter' },
  { agents: VIDEO_PIPELINE_AGENTS, govRef: 'Video Pipeline scope — contract-first media.v1.yaml before NestJS workers' },
  { agents: AUDIO_ROOM_AGENTS, govRef: 'Audio Room scope — socket events via realtime-gateway; gift debit via wallet-service' },
  { agents: NOTIFICATION_AGENTS, govRef: 'Notification scope — FCM via notification-service; deep-links via GoRouter' },
  { agents: ADMIN_AGENTS, govRef: 'Admin scope — ADMIN RBAC only; no admin UI in mobile app; web admin panel Phase 20' },
  { agents: COMMUNITY_AGENTS, govRef: 'Community scope — extends social.v1 namespace; no separate service until Phase 20' },
  { agents: ANALYTICS_AGENTS, govRef: 'Analytics scope — Flutter dashboard reads analytics API; no Kafka/warehouse in Phase 12' },
];

// ─── Template functions ──────────────────────────────────────────────────────

function agentMd(a, govRef) {
  const resp = a.responsibilities.map((r) => `- ${r}`).join('\n');
  const del = a.deliverables.map((d) => `- ${d}`).join('\n');
  const dep = a.deps.map((d) => `- ${d}`).join('\n');
  const inp = a.inputs.map((i) => `- ${i}`).join('\n');
  return `# ${a.title}

## Role
${a.role}

## Responsibilities
${resp}

## Inputs
${inp}

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
- Phase: ${a.phase}
- Domain: ${a.domain}
- Tech Stack: Flutter (Riverpod, GoRouter), NestJS, PostgreSQL, Redis, Socket.IO, AWS

## Scope Boundary
${govRef}

## Skills
- Basic: \`.cursor/skills/stream-heaven/${a.skillDir}/basic/SKILL.md\`
- Advanced: \`.cursor/skills/stream-heaven/${a.skillDir}/advanced/SKILL.md\`

## Prompt Template

\`\`\`
You are the ${a.title} for Stream Heaven — Global Creator Ecosystem.

Context:
- Platform: Multi-app entertainment ecosystem (Social, Livestream, Astro, OTT)
- Stack: Flutter (Riverpod, GoRouter), NestJS, PostgreSQL, Redis, Socket.IO, AWS
- Audience: Indian + global; low-end Android; multilingual (Telugu, Hindi, Tamil, etc.)
- Phase: ${a.phase}

Governance:
- platform-governance/MASTER-AI-OPERATING-SYSTEM.md
- platform-governance/flutter-ui-rules.md
- platform-governance/api-standards.md

Your mission: ${a.mission}

Deliverables:
${del}

Constraints:
- ${a.domain} scope ONLY; contract-first in packages/shared-contracts/
- No secrets in repo; coordinate with Dependencies — no duplicate services
- Escalate architecture forks via docs/adr/SH-000-template.md
- English in code; all user strings via app_en.arb i18n

Begin by stating your plan, then execute.
\`\`\`
`;
}

function basicSkillMd(a) {
  const skills = a.skills.map((s) => `- ${s}`).join('\n');
  return `---
name: stream-heaven-${a.skillDir.replace(/\//g, '-')}-basic
description: >-
  Basic Cursor skill for Stream Heaven ${a.title.replace(' Agent', '')} (Phase ${a.phase}).
  ${a.domain} — single-agent execution with governance prefix.
---

# ${a.title.replace(' Agent', '')} — Basic

## When to use

- User invokes **${a.title.replace(' Agent', '')}** or related ${a.domain} work
- Phase ${a.phase}; scope limited to: ${a.domain}

## Agent

- **Path:** \`${a.dir}/${a.slug}.md\`
- **Role:** ${a.role}

## Scope (basic)

- Load \`platform-governance/MASTER-AI-OPERATING-SYSTEM.md\`
- Open agent markdown and copy its \`## Prompt Template\` block
- Contract-first: check \`packages/shared-contracts/openapi/\` first
- Run \`node scripts/validate-agents.mjs\` after agent edits

## Role-specific focus

${skills}

## Key paths

| Resource | Path |
|----------|------|
| Architecture | \`docs/GLOBAL-CREATOR-ECOSYSTEM-ARCHITECTURE.md\` |
| Roadmap | \`docs/GLOBAL-CREATOR-ECOSYSTEM-ROADMAP.md\` |
| OpenAPI | \`packages/shared-contracts/openapi/\` |
| Validate agents | \`node scripts/validate-agents.mjs\` |

## Validation

\`\`\`powershell
node scripts/validate-agents.mjs
flutter analyze apps/mobile
\`\`\`
`;
}

function advancedSkillMd(a) {
  return `---
name: stream-heaven-${a.skillDir.replace(/\//g, '-')}-advanced
description: >-
  Advanced Cursor skill for Stream Heaven ${a.title.replace(' Agent', '')} (Phase ${a.phase}).
  Cross-agent orchestration, ADRs, production validation.
---

# ${a.title.replace(' Agent', '')} — Advanced

## When to use

- Cross-agent features, production readiness, or multi-chat orchestration
- Architecture decisions touching multiple services or contracts
- Phase ${a.phase}+ changes to ${a.domain}

## Agent

- **Path:** \`${a.dir}/${a.slug}.md\`

## Scope (advanced)

- Coordinate via \`ai-agents/orchestration/task-router.md\` and \`quality-gate.md\`
- ADR for architecture forks: \`docs/adr/SH-000-template.md\`
- Run \`node scripts/test-golden-agents.mjs\` after bulk agent changes
- Enforce ${a.domain} boundary — defer wallet/live backend to their domain agents

## Orchestration

- **Architecture:** \`docs/GLOBAL-CREATOR-ECOSYSTEM-ARCHITECTURE.md\`
- **Roadmap:** \`docs/GLOBAL-CREATOR-ECOSYSTEM-ROADMAP.md\`
- **Contracts:** \`packages/shared-contracts/openapi/\`
- **Registry:** \`ai-agents/AGENT-REGISTRY.md\`

## Validation

\`\`\`powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
flutter test apps/mobile
\`\`\`
`;
}

// ─── Write files ─────────────────────────────────────────────────────────────

let totalAgents = 0;
let totalSkills = 0;

for (const { agents, govRef } of ALL_AGENT_GROUPS) {
  for (const a of agents) {
    const agentDir = join(ROOT, a.dir);
    mkdirSync(agentDir, { recursive: true });

    const agentPath = join(agentDir, `${a.slug}.md`);
    writeFileSync(agentPath, agentMd(a, govRef), 'utf8');
    totalAgents++;

    for (const tier of ['basic', 'advanced']) {
      const skillDir = join(SKILL_ROOT, a.skillDir, tier);
      mkdirSync(skillDir, { recursive: true });
      const content = tier === 'basic' ? basicSkillMd(a) : advancedSkillMd(a);
      writeFileSync(join(skillDir, 'SKILL.md'), content, 'utf8');
      totalSkills++;
    }
  }
}

console.log(`✅  Created ${totalAgents} creator ecosystem agents`);
console.log(`✅  Created ${totalSkills} skill files`);
console.log('');
console.log('Agent directories created:');
const dirs = [...new Set([
  ...CREATOR_AGENTS.map((a) => `  ${a.dir}/`),
  ...VIDEO_PIPELINE_AGENTS.map((a) => `  ${a.dir}/`),
  ...AUDIO_ROOM_AGENTS.map((a) => `  ${a.dir}/`),
  ...NOTIFICATION_AGENTS.map((a) => `  ${a.dir}/`),
  ...ADMIN_AGENTS.map((a) => `  ${a.dir}/`),
  ...COMMUNITY_AGENTS.map((a) => `  ${a.dir}/`),
  ...ANALYTICS_AGENTS.map((a) => `  ${a.dir}/`),
])];
dirs.forEach((d) => console.log(d));
console.log('');
console.log('Next step: node scripts/validate-agents.mjs');
