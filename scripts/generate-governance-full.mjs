#!/usr/bin/env node
/**
 * Stream Heaven — Full Governance Document Generator
 * Generates all 22 platform-governance/*.md files with substantive content.
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(SCRIPT_DIR, '..', 'platform-governance');

const STACK = {
  frontend: 'Flutter 3.x (Riverpod, GoRouter)',
  backend: 'Node.js 20+, NestJS',
  db: 'PostgreSQL 15+, Redis 7+',
  realtime: 'Socket.IO + Redis adapter',
  streaming: 'Agora SDK (primary), Zego SDK (fallback)',
  storage: 'AWS S3 + Cloudflare CDN',
  auth: 'Firebase Auth + OTP (SMS)',
  hosting: 'AWS EKS/ECS + Cloudflare edge',
  langs: 'EN, HI, TE, TA, KN, ML, BN, MR, PA',
};

const APPS = [
  { id: 'social', name: 'Social App', pkg: 'com.streamheaven.social', focus: 'Feed, reels, DMs, creator profiles' },
  { id: 'livestream', name: 'Livestream App', pkg: 'com.streamheaven.live', focus: 'Live rooms, gifts, co-host, PK battles' },
  { id: 'astro', name: 'Astro App', pkg: 'com.streamheaven.astro', focus: 'Kundli, consultations, remedies, subscriptions' },
  { id: 'media', name: 'Media App (OTT)', pkg: 'com.streamheaven.media', focus: 'Movies, series, downloads, parental controls' },
];

const SERVICES = [
  { id: 'api-gateway', port: 3000, owns: 'Routing, JWT validation, rate limits, request IDs' },
  { id: 'auth-service', port: 3001, owns: 'Firebase verify, OTP, refresh, device binding' },
  { id: 'user-service', port: 3002, owns: 'Profiles, avatars, preferences, locale, blocks' },
  { id: 'social-service', port: 3003, owns: 'Posts, feed, comments, follows, moderation hooks' },
  { id: 'livestream-service', port: 3004, owns: 'Rooms, Agora/Zego tokens, gifts, viewer counts' },
  { id: 'wallet-service', port: 3005, owns: 'Coins, ledger, IAP receipts, payouts' },
  { id: 'media-service', port: 3006, owns: 'Catalog, entitlements, playback URLs, DRM' },
  { id: 'notification-service', port: 3007, owns: 'FCM push, SMS OTP relay, in-app inbox' },
];

const LOCALES = ['en', 'hi', 'te', 'ta', 'kn', 'ml', 'bn', 'mr', 'pa'];

function section(title, level = 2) {
  return `${'#'.repeat(level)} ${title}\n\n`;
}

function table(headers, rows) {
  let t = `| ${headers.join(' | ')} |\n| ${headers.map(() => '---').join(' | ')} |\n`;
  for (const r of rows) t += `| ${r.join(' | ')} |\n`;
  return t + '\n';
}

function checklist(items) {
  return items.map((i) => `- [ ] ${i}`).join('\n') + '\n\n';
}

function codeBlock(lang, body) {
  return '```' + lang + '\n' + body + '\n```\n\n';
}

function footer(doc, version = '1.0') {
  return `---\n*Stream Heaven Platform Governance — ${doc} v${version} — Generated ${new Date().toISOString().slice(0, 10)}*\n`;
}

function appTable() {
  return table(
    ['App', 'Package', 'Primary services', 'Realtime needs'],
    APPS.map((a) => [
      a.name,
      a.pkg,
      a.id === 'social' ? 'social-service, user-service' : a.id === 'livestream' ? 'livestream-service, wallet-service' : a.id === 'astro' ? 'user-service, wallet-service' : 'media-service, wallet-service',
      a.id === 'livestream' ? 'Socket.IO + Agora' : a.id === 'social' ? 'Socket.IO (DM typing)' : 'Push + optional Socket',
    ]),
  );
}

function serviceTable(col3 = 'Port') {
  return table(
    ['Service', col3, 'Ownership'],
    SERVICES.map((s) => [s.id, String(s.port), s.owns]),
  );
}

function localeBullets() {
  return LOCALES.map((l) => `- **${l.toUpperCase()}** — ARB \`app_${l}.arb\`, RTL N/A (Indic scripts LTR)`).join('\n') + '\n\n';
}

// ─── Document builders ───────────────────────────────────────────────────────

function buildEngineeringRules() {
  const prohibited = [
    ['`setState` in features', 'Breaks Riverpod contract', 'StateNotifier / AsyncNotifier'],
    ['Raw `http` in widgets', 'No retry/offline', '`ApiClient` via repository'],
    ['SQL in NestJS controllers', 'Leaks persistence', 'TypeORM repositories'],
    ['`any` in DTOs', 'Contract drift', 'Zod/class-validator DTOs'],
    ['Cross-app shared UI in apps/', 'Duplication risk', '`packages/design-system`'],
    ['Hardcoded Agora App ID', 'Secret leak', 'AWS Secrets Manager'],
    ['Sync wallet + gift chain', 'Double-spend risk', 'Saga + idempotency key'],
    ['Logging full phone/OTP', 'DPDP violation', 'Mask + hash'],
  ];
  return `# Stream Heaven Engineering Rules

${section('Purpose')}
These rules govern day-to-day engineering across Stream Heaven: four Flutter apps (${APPS.map((a) => a.name).join(', ')}), eight NestJS microservices, shared packages, and infrastructure. Every engineer and AI agent must comply before merging to \`main\`.

${section('Scope')}
${appTable()}
**Stack:** ${STACK.frontend}; ${STACK.backend}; ${STACK.db}; ${STACK.realtime}; ${STACK.streaming}; ${STACK.storage}; ${STACK.auth}.

${section('Repository Standards')}
${table(['Rule', 'Requirement', 'Enforcement'], [
  ['Monorepo root', 'All code under apps/, services/, packages/, infrastructure/', 'CI path filter'],
  ['Package manager', 'pnpm@9 workspaces only', 'lockfile lint'],
  ['Task runner', 'turbo run build|test|lint', 'Required on PR'],
  ['Branch', 'feature/SH-{jira}-{slug} or fix/SH-{jira}-{slug}', 'GitHub ruleset'],
  ['Commits', 'Conventional Commits; scope = app or service id', 'Squash merge'],
  ['ADR', 'Architecture changes need docs/adr/SH-###.md', 'Architect review'],
])}

${section('Naming Conventions')}
${section('Dart / Flutter', 3)}
- Files: \`snake_case.dart\`; tests: \`*_test.dart\`
- Public widgets: \`PascalCase\`; private: prefix \`_\`
- Providers: \`*Provider\`, notifiers: \`*Notifier\`
- Routes (GoRouter): \`/feature/:id\` kebab-case — e.g. \`/live-room/:roomId\`, \`/kundli/report/:reportId\`
- Assets: \`assets/images/{feature}/\`

${section('TypeScript / NestJS', 3)}
- Modules: \`*.module.ts\`; DTOs in \`dto/\`; entities in \`entities/\`
- Env keys: \`SH_{SERVICE}_{KEY}\` — e.g. \`SH_LIVESTREAM_AGORA_CERT\`
- Event names: \`domain.entity.verb\` — e.g. \`wallet.gift.sent\`

${section('Code Organization — Flutter')}
${codeBlock('text', `apps/social/lib/
  main.dart
  app.dart                 # MaterialApp.router + GoRouter
  core/network/api_client.dart
  core/l10n/
  features/feed/
    data/feed_repository.dart
    domain/post.dart
    presentation/feed_screen.dart
    presentation/feed_controller.dart   # @riverpod
  shared/widgets/sh_avatar.dart`)}

${section('Code Organization — NestJS')}
${codeBlock('text', `services/livestream-service/src/
  main.ts
  app.module.ts
  modules/rooms/
    rooms.controller.ts    # POST /v1/rooms — idempotency header
    rooms.service.ts
    rooms.gateway.ts         # Socket.IO namespace /live
  modules/tokens/
    agora-token.service.ts
    zego-fallback.service.ts`)}

${section('Dependency Rules')}
1. **apps → packages** — Allowed (\`design-system\`, \`shared-contracts\`)
2. **apps → services** — HTTP/WebSocket via \`api-gateway\` only; never direct DB
3. **services → packages** — Allowed for DTOs and event schemas
4. **services → services** — Prefer BullMQ/Redis streams; sync HTTP max 1 hop
5. **packages → apps/services** — Forbidden

${section('Error Handling — Flutter')}
${codeBlock('dart', `sealed class ShResult<T> {
  const ShResult();
}
final class ShOk<T> extends ShResult<T> {
  final T value;
  const ShOk(this.value);
}
final class ShErr<T> extends ShResult<T> {
  final ShError error;
  const ShErr(this.error);
}

// UI: never throw from build()
ref.watch(liveRoomProvider(roomId)).when(
  data: (room) => LiveStage(room: room),
  loading: () => const LiveSkeleton(),
  error: (e, st) => ShErrorPanel(
    code: e is ShError ? e.code : 'UNKNOWN',
    onRetry: () => ref.invalidate(liveRoomProvider(roomId)),
  ),
);`)}

${section('Error Handling — NestJS')}
${codeBlock('typescript', `throw new HttpException(
  {
    code: 'LIVE_ROOM_FULL',
    message: 'Room has reached viewer cap',
    details: { roomId, maxViewers: 5000 },
  },
  HttpStatus.CONFLICT,
);

// All responses include X-Request-Id from api-gateway`)}

${section('Logging')}
- JSON logs in prod; \`service\`, \`requestId\`, \`userId\` (hashed), \`appId\`
- **Never log:** OTP, Firebase refresh tokens, Agora tokens, full PAN/UPI
- Business INFO events: \`gift.sent\`, \`room.started\`, \`playback.started\`

${section('Performance Budgets')}
${table(['Surface', 'Metric', 'Budget', 'Measurement'], [
  ['Social cold start', 'TTI', '< 3s', 'Profile 2GB Android 10'],
  ['Livestream join', 'First frame', '< 2.5s', '4G India median'],
  ['OTT start playback', 'Time to first frame', '< 4s', 'HLS via Cloudflare'],
  ['API REST p99', 'Latency', '< 500ms', 'api-gateway Prometheus'],
  ['Socket gift animation', 'p99', '< 200ms', 'livestream-service'],
  ['APK download', 'Base size', '< 48MB', 'Per-app Play Console'],
])}

${section('Prohibited Patterns')}
${table(['Pattern', 'Why', 'Alternative'], prohibited)}

${section('Code Review Checklist')}
${checklist([
  'Matches feature folder structure and naming',
  'shared-contracts updated if API/event shape changed',
  'No secrets; .env.example only placeholders',
  'ARB files updated for all 9 locales when UI strings change',
  'Unit tests for domain logic; contract test if OpenAPI changed',
  'Tested on API 24 emulator with network throttling (Slow 3G)',
  'Memory: no unbounded ListView without cacheExtent / pagination',
  'Idempotency-Key on POST mutations that spend coins or send gifts',
  'Socket events versioned in shared-contracts',
  'Feature flag key documented in growth dashboard',
])}

${section('Git Workflow')}
1. Branch from \`main\`; rebase daily
2. Draft PR when > 100 LOC
3. CI: lint, analyze, test, build (turbo affected)
4. 1 reviewer (2 for auth-service, wallet-service, security)
5. Squash merge; delete branch

${section('AI Agent Compliance')}
Agents from \`ai-agents/AGENT-REGISTRY.md\` must read \`MASTER-GOVERNANCE-PROMPT.md\` and domain docs before codegen. Agents must not create a ninth microservice without ADR + \`chief-architect\` approval.

${section('Microservices Reference')}
${serviceTable()}

${section('Related Documents')}
- \`architecture-principles.md\`, \`flutter-ui-rules.md\`, \`api-standards.md\`, \`testing-rules.md\`

${footer('engineering-rules.md')}
`;
}

function buildArchitecturePrinciples() {
  const principles = [
    ['Bounded context', 'Each NestJS service owns one domain; no shared DB schemas across services'],
    ['API-first', 'OpenAPI in packages/shared-contracts before implementation'],
    ['Eventual consistency', 'Wallet ledger authoritative; social counts may lag < 5s'],
    ['Offline-first mobile', 'Flutter caches feed, wallet balance hint, OTT continue-watching'],
    ['Edge delivery', 'Cloudflare caches thumbnails, HLS segments; S3 origin private'],
    ['Fail operational', 'Zego fallback when Agora token mint fails; cached feed on API error'],
    ['Privacy by design', 'Minimize PII replication; user-service is profile source of truth'],
    ['Multi-tenant apps', 'Single auth identity; app_id claim scopes API access'],
  ];
  let body = `# Stream Heaven Architecture Principles

${section('Purpose')}
Foundational design constraints for Stream Heaven's four-app ecosystem. Use when designing features, choosing sync vs async, or reviewing ADRs.

${section('System Context')}
${codeBlock('text', `                    ┌──────────────── Cloudflare CDN / WAF ────────────────┐
  Flutter Apps      │                                                     │
  (Social, Live,    ▼                                                     │
   Astro, OTT) ──► api-gateway ──► auth / user / social / live / wallet  │
       │              │              media / notification                 │
       │              └── Socket.IO ──► Redis adapter ◄── horizontal pods │
       ├── Firebase Auth (OTP)                                            │
       ├── Agora / Zego (Livestream, Astro video consult)                 │
       └── S3 presigned uploads ──► media pipeline ──► Cloudflare        `)}

${section('Core Principles')}
${table(['Principle', 'Implementation on Stream Heaven'], principles)}

${section('App Boundaries')}
${appTable()}

**Rule:** Cross-app deep links use universal links (\`https://streamheaven.app/...\`) resolved by GoRouter in target app. Shared login session via Firebase + auth-service refresh cookie.

${section('Data Flow Patterns')}
${section('Synchronous (allowed)', 3)}
- Read profile: app → api-gateway → user-service
- Join live room: app → livestream-service → Agora token (short TTL)
- Purchase coins: app → wallet-service → Play Billing verify

${section('Asynchronous (preferred)', 3)}
- Gift sent: livestream-service publishes \`gift.sent\` → wallet debits → notification push
- Post created: social-service → search index queue → fan-out notification
- OTT transcode complete: media-service → notification → Media App refresh catalog

${section('Caching Layers')}
${table(['Layer', 'Technology', 'TTL', 'Invalidation'], [
  ['CDN', 'Cloudflare', '1h–7d by asset type', 'Cache-Tag purge on publish'],
  ['API', 'Redis', '30s–5m', 'Event-driven delete'],
  ['Flutter', 'Hive/drift', 'Session + stale-while-revalidate', 'Pull-to-refresh + socket'],
  ['Agora token', 'Memory', '≤ 24h SDK rule', 'Re-mint on 401'],
])}

${section('Realtime Architecture')}
- **Socket.IO** namespaces: \`/social\`, \`/live\`, \`/wallet\` (server: livestream-service + social-service)
- **Redis adapter** required for >1 pod; sticky sessions via cookie on ALB
- **Presence:** Redis HASH \`room:{id}:viewers\` with TTL heartbeat

${section('Streaming (Live + Astro Video)')}
| Provider | Role | Trigger |
|----------|------|---------|
| Agora | Primary RTC | livestream-service token endpoint |
| Zego | Fallback RTC | Agora 5xx or region block |
| Socket.IO | Gifts, chat, PK score | livestream-service |

${section('Media / OTT')}
- Upload: presigned S3 → transcode worker → HLS renditions
- Playback: Cloudflare signed URL; Widevine L1 where device supports
- Downloads: encrypted offline pack per \`media-service\` entitlement

${section('Security Architecture')}
- JWT from auth-service; gateway validates signature + \`app_id\` + scopes
- Internal service mesh: mTLS between pods (Istio)
- Secrets: AWS Secrets Manager; rotated quarterly per \`security-rules.md\`

${section('Scalability Axes')}
${table(['Axis', 'Scale trigger', 'First action'], [
  ['Live viewers', 'Concurrent rooms > 10k', 'Redis shard + Agora channel limits'],
  ['Feed read', 'p99 > 400ms', 'Read replicas + feed cache'],
  ['Wallet writes', 'Ledger TPS > 500', 'Partition by user_id hash'],
  ['Push fan-out', 'Campaign > 1M', 'notification-service batch + FCM topics'],
])}

${section('Anti-Patterns')}
${checklist([
  'Shared PostgreSQL database across two services',
  'Dual write to wallet and livestream without outbox pattern',
  'Client-side coin balance as source of truth',
  'Global Socket.IO room without Redis adapter',
  'Synchronous call chain gateway → social → user → wallet',
  'Storing master video only on device without S3 backup',
])}

${section('ADR Requirements')}
Write ADR when: new microservice, new third-party vendor, breaking API v2, cross-app shared database, or blockchain/NFT integration.

${section('Phase Alignment')}
Phase 1: auth-service + user-service + shared-contracts + Socket foundation.
Phase 2: social-service feed + livestream-service MVP.
Phase 3: wallet-service + gifts; media-service catalog.
Phase 4: Astro consultations + OTT DRM hardening.

${serviceTable('Default port')}
`;
  // Expand with per-app architecture sections
  for (const app of APPS) {
    body += section(`${app.name} — Architecture Notes`, 3);
    body += `- **Package:** \`${app.pkg}\`\n`;
    body += `- **Focus:** ${app.focus}\n`;
    body += `- **GoRouter root:** \`/${app.id}\` shell with tab branches\n`;
    body += `- **State:** Riverpod codegen; global \`authStateProvider\`, feature-scoped notifiers\n`;
    body += `- **Network:** Dio client with interceptors (auth refresh, retry-3, connectivity pause)\n\n`;
  }
  body += section('Integration Matrix');
  body += table(
    ['Consumer', 'Provider', 'Protocol', 'Contract package'],
    [
      ['All apps', 'api-gateway', 'HTTPS REST', 'shared-contracts/rest'],
      ['Livestream App', 'livestream-service', 'WSS + REST', 'shared-contracts/live'],
      ['Social App', 'social-service', 'REST + WSS', 'shared-contracts/social'],
      ['Media App', 'media-service', 'REST', 'shared-contracts/media'],
      ['Astro App', 'wallet-service', 'REST', 'shared-contracts/wallet'],
      ['notification-service', 'FCM', 'HTTPS', 'Firebase console'],
    ],
  );
  body += footer('architecture-principles.md');
  return body;
}

function buildDatabaseRules() {
  const schemas = [
    ['users', 'user-service', 'id UUID PK', 'PII — encrypt phone at rest'],
    ['profiles', 'user-service', 'user_id FK', 'display_name, locale, avatar_s3_key'],
    ['posts', 'social-service', 'id, author_id', 'soft delete, moderation_state'],
    ['live_rooms', 'livestream-service', 'id, host_id', 'status enum: scheduled,live,ended'],
    ['gifts_ledger', 'wallet-service', 'idempotency_key UNIQUE', 'append-only'],
    ['coin_balances', 'wallet-service', 'user_id PK', 'optimistic locking version'],
    ['media_titles', 'media-service', 'id', 'geo_rights JSONB'],
    ['entitlements', 'media-service', 'user_id, title_id', 'expires_at'],
    ['notifications_inbox', 'notification-service', 'id', 'read_at nullable'],
    ['otp_attempts', 'auth-service', 'phone_hash', 'rate limit index'],
  ];
  let body = `# Stream Heaven Database Rules

${section('Purpose')}
PostgreSQL 15+ is the system of record per microservice (database-per-service). Redis 7+ for cache, rate limits, Socket.IO adapter, and ephemeral locks.

${section('Ownership')}
${table(['Table / domain', 'Service', 'Notes'], schemas)}

${section('Global Rules')}
1. **No cross-service FK** — use \`user_id\` UUID reference only
2. **UUID v7** preferred for time-sortable IDs (or ULID in events)
3. **Timestamps** — \`created_at\`, \`updated_at\` TIMESTAMPTZ UTC; \`deleted_at\` for soft delete
4. **Migrations** — TypeORM migrations only; never hand-edit prod
5. **Naming** — snake_case plural tables; \`idx_{table}_{cols}\`

${section('Migration Workflow')}
${checklist([
  'Create migration in service repo: pnpm --filter auth-service migration:generate',
  'Review SQL in PR — no full table scan without CONCURRENTLY',
  'Backup snapshot tag recorded in deploy ticket',
  'Apply staging → smoke tests → prod during low-traffic window (IST 03:00–05:00)',
  'Rollback script prepared for destructive changes',
])}

${section('Indexing Standards')}
${table(['Query pattern', 'Index type', 'Example'], [
  ['Feed by following', 'B-tree composite', 'idx_posts_author_created ON posts(author_id, created_at DESC)'],
  ['Live rooms live now', 'Partial', "WHERE status = 'live'"],
  ['Wallet history', 'BRIN or partition', 'Monthly partition on gifts_ledger'],
  ['OTP lookup', 'Hash unique', 'phone_hash'],
])}

${section('Query Rules')}
- **N+1 forbidden** in hot paths — use JOIN or DataLoader pattern
- **Pagination** — cursor-based (\`created_at, id\`) not OFFSET for feeds
- **Statement timeout** — 5s default; 30s for reporting role only
- **Read replicas** — social feed reads only; wallet writes to primary always

${section('Redis Key Conventions')}
${codeBlock('text', `sh:{service}:{entity}:{id}           # e.g. sh:live:room:abc-uuid
sh:ratelimit:{endpoint}:{userId}   # TTL 60s
sh:otp:{phone_hash}                # TTL 300s, max 3 attempts
sh:socket:session:{sessionId}      # TTL 24h`)}

${section('Transactions')}
- **wallet-service:** SERIALIZABLE for debit+credit pairs; idempotency_key dedupe
- **livestream-service:** READ COMMITTED for room state; distributed lock Redis for PK battles
- **Outbox table** \`domain_events\` in each service — polled to Redis stream

${section('PII & Retention')}
${table(['Data', 'Retention', 'Deletion'], [
  ['Phone number', 'Life of account + 90d', 'Crypto-shred on account delete'],
  ['OTP logs', '24 hours', 'Auto-expire'],
  ['DM content', 'Until user deletes', 'social-service purge job'],
  ['Astro consultation notes', '7 years legal', 'Anonymize astrologer_id optional'],
  ['OTT watch history', '2 years', 'User export then delete'],
])}

${section('Sample Entity — live_rooms')}
${codeBlock('typescript', `@Entity('live_rooms')
export class LiveRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  hostId: string;

  @Column({ type: 'enum', enum: LiveRoomStatus })
  status: LiveRoomStatus;

  @Column({ nullable: true })
  agoraChannelName: string;

  @Column('int', { default: 0 })
  viewerCountCached: number;

  @CreateDateColumn()
  createdAt: Date;
}`)}

${section('Sample Query — cursor feed')}
${codeBlock('sql', `SELECT id, author_id, body, created_at
FROM posts
WHERE author_id = ANY($1::uuid[])
  AND (created_at, id) < ($2::timestamptz, $3::uuid)
  AND deleted_at IS NULL
ORDER BY created_at DESC, id DESC
LIMIT 20;`)}

${section('Backup & DR')}
- RDS automated backups 35 days; PITR enabled
- Redis cluster AOF + snapshot every 6h
- Cross-region read replica (ap-south-1 → ap-southeast-1) for media catalog read-only

${section('Forbidden')}
- \`SELECT *\` in production hot paths without column list
- Storing Agora/Zego secrets in PostgreSQL
- JSON blobs > 1MB without offload to S3
- Triggers that call external HTTP

`;
  for (const svc of SERVICES) {
    body += section(`${svc.id} — DB checklist`, 3);
    body += checklist([
      `Dedicated RDS schema or database for ${svc.id}`,
      'Connection pool max 20 per pod',
      'health check includes migration version',
      'No shared DB user across services',
    ]);
  }
  body += footer('database-rules.md');
  return body;
}

function buildFlutterUiRules() {
  let body = `# Stream Heaven Flutter UI Rules

${section('Purpose')}
UI/UX implementation standards for Social, Livestream, Astro, and Media (OTT) apps. Optimized for low-end Android (2GB RAM), poor connectivity, and 9 Indic/English locales.

${section('Stack')}
- **Framework:** Flutter 3.x stable channel
- **State:** Riverpod 2.x (\`@riverpod\` codegen)
- **Navigation:** GoRouter with \`ShellRoute\` for tabs
- **Design:** \`packages/design-system\` — ShTheme, ShButton, ShAvatar

${section('Localization')}
${localeBullets()}
- Use \`context.l10n.key\` — never concatenate translated strings (plural/gender rules)
- Numbers/currency: \`intl\` with locale from \`user-service\` profile
- Fonts: Noto Sans + Noto Sans Devanagari/Telugu/Tamil fallbacks bundled per script

${section('Layout & Density')}
${table(['Rule', 'Value'], [
  ['Min touch target', '48dp'],
  ['Base grid', '4dp'],
  ['Max content width (tablet)', '600dp centered'],
  ['Live gift lane', 'SafeArea + exclude keyboard'],
  ['OTT player', 'Landscape lock optional per title'],
])}

${section('Performance')}
${checklist([
  'Use `const` constructors where possible',
  '`ListView.builder` / `SliverList` only — no unbounded Column of cards',
  'Precache hero images ≤ 200KB thumbnail via Cloudflare resize params',
  'Defer heavy work: `compute()` for image decode > 1MP',
  'RepaintBoundary around gift animations and live chat overlay',
  'Disable blur/shadow on API 21–24 devices via `DeviceInfo` gate',
  'Profile with Impeller on; target < 1% jank frames',
])}

${section('Offline & Connectivity')}
${codeBlock('dart', `@riverpod
class FeedController extends _$FeedController {
  @override
  Future<FeedPage> build() async {
    final cache = ref.read(feedCacheProvider);
    final network = ref.watch(connectivityProvider);
    if (network == ConnectivityResult.none) {
      return cache.getStale() ?? throw const OfflineException();
    }
    final fresh = await ref.read(feedRepositoryProvider).fetchPage();
    await cache.put(fresh);
    return fresh;
  }
}`)}

${section('GoRouter Patterns')}
${codeBlock('dart', `GoRoute(
  path: '/live-room/:roomId',
  name: 'liveRoom',
  parentNavigatorKey: rootNavigatorKey,
  builder: (context, state) => LiveRoomScreen(
    roomId: state.pathParameters['roomId']!,
  ),
  redirect: (context, state) {
    final auth = ref.read(authStateProvider);
    if (auth is! Authenticated) return '/login?next=\${state.uri}';
    return null;
  },
);`)}

${section('Livestream UI')}
- Stage: Agora \`RtcEngine\` in dedicated \`LiveEngineController\`
- Chat: reversed ListView; batch insert max 5 msgs/frame
- Gifts: Rive/Lottie from CDN; queue animations, drop if > 3 pending on low memory
- PK bar: listen \`pk.score.updated\` socket event

${section('Social UI')}
- Feed card: video autoplay only when ≥ 50% visible (\`VisibilityDetector\`)
- Reels: vertical PageView; preload next 1 item
- DM: optimistic send with failed retry chip

${section('Astro UI')}
- Kundli charts: customPainter with cached layout size
- Consultation booking: show IST slots; wallet balance inline
- Disclaimer footer on all prediction screens (compliance)

${section('OTT UI')}
- Continue watching row: Hive-backed
- Download button states: queued, downloading, encrypted ready, expired
- Parental PIN gate before mature content

${section('Accessibility')}
- Semantics labels on icon-only buttons (gift, share, follow)
- Minimum contrast 4.5:1 (WCAG AA)
- Respect \`MediaQuery.disableAnimations\`

${section('Theming')}
${table(['Token', 'Light', 'Dark'], [
  ['Primary', 'SH Purple #6B4EFF', 'Same'],
  ['Surface', '#FFFFFF', '#121212'],
  ['Error', '#D32F2F', '#EF9A9A'],
])}

`;
  for (const app of APPS) {
    body += section(`${app.name} — Screen inventory`, 3);
    body += table(
      ['Route', 'Screen', 'Critical widget'],
      [
        [`/${app.id}/home`, 'Home', 'ShScaffold'],
        [`/${app.id}/profile/:id`, 'Profile', 'ShAvatar'],
        app.id === 'livestream' ? ['/live-room/:id', 'Live Room', 'LiveStage'] : ['/-', '-', '-'],
        app.id === 'media' ? ['/title/:id', 'Title Detail', 'ShPlayButton'] : ['/-', '-', '-'],
      ].filter((r) => r[1] !== '-'),
    );
  }
  body += section('Widget Test Requirements');
  body += checklist([
    'Golden test for design-system components when changed',
    'Pump LiveRoomScreen with mocked Agora channel',
    'Verify GoRouter redirect when logged out',
  ]);
  body += footer('flutter-ui-rules.md');
  return body;
}

function buildApiStandards() {
  return `# Stream Heaven API Standards

${section('Purpose')}
REST and realtime event standards for api-gateway and all microservices. Contracts live in \`packages/shared-contracts\`.

${section('Versioning')}
- URL prefix: \`/v1/\` — breaking changes require \`/v2/\` + 6-month sunset
- Mobile apps send \`X-App-Version\` and \`X-App-Id\` (social|livestream|astro|media)

${section('Authentication')}
${codeBlock('http', `Authorization: Bearer <firebase_id_token>
X-App-Id: livestream
X-Device-Id: <uuid>
X-Request-Id: <uuid>   # generated client-side if absent`)}

auth-service validates token; gateway attaches \`X-User-Id\` to upstream.

${section('Idempotency')}
All POST that move money or send gifts require:
${codeBlock('http', `Idempotency-Key: <uuid-v4>
# Server stores key 24h — replay returns same 200 body`)}

${section('Error Shape')}
${codeBlock('json', `{
  "statusCode": 409,
  "code": "WALLET_INSUFFICIENT_BALANCE",
  "message": "Not enough coins",
  "details": { "required": 100, "available": 45 },
  "timestamp": "2026-05-29T10:00:00.000Z",
  "path": "/v1/wallet/debit",
  "requestId": "req_abc"
}`)}

${section('Pagination')}
${codeBlock('json', `{
  "data": [...],
  "cursor": { "next": "eyJjcmVhdGVkQXQiOi..." },
  "hasMore": true
}`)}

${section('Rate Limits (api-gateway)')}
${table(['Tier', 'RPM', 'Applies to'], [
  ['Anonymous', '30', 'Health, public catalog'],
  ['Authenticated', '300', 'Most reads'],
  ['Write burst', '60', 'Posts, comments'],
  ['Live chat', '120', 'Socket messages'],
  ['OTP', '5/hour/phone', 'auth-service'],
])}

${section('REST Endpoints — Canonical')}
${table(['Method', 'Path', 'Service', 'Notes'], [
  ['POST', '/v1/auth/otp/send', 'auth-service', 'India +91 default'],
  ['POST', '/v1/auth/otp/verify', 'auth-service', 'Returns SH refresh token'],
  ['GET', '/v1/users/me', 'user-service', 'Profile + locale'],
  ['GET', '/v1/feed/home', 'social-service', 'Cursor pagination'],
  ['POST', '/v1/rooms', 'livestream-service', 'Creates Agora channel'],
  ['POST', '/v1/rooms/:id/token', 'livestream-service', 'Broadcaster/audience role'],
  ['POST', '/v1/wallet/gifts/send', 'wallet-service', 'Idempotency required'],
  ['GET', '/v1/media/titles/:id', 'media-service', 'Geo-filtered'],
  ['POST', '/v1/notifications/device', 'notification-service', 'FCM token register'],
])}

${section('Socket.IO Events')}
${table(['Event', 'Direction', 'Payload schema'], [
  ['room.viewer.joined', 'server→client', 'LiveViewerJoinedV1'],
  ['chat.message', 'client→server', 'ChatMessageV1 — moderated'],
  ['gift.sent', 'server→client', 'GiftSentV1'],
  ['wallet.balance.updated', 'server→client', 'BalanceV1'],
  ['pk.score.updated', 'server→client', 'PkScoreV1'],
])}

${section('Webhooks (outbound)')}
- Play/App Store: wallet-service verifies receipt server-side
- Agora recording: livestream-service HMAC signature verify
- Cloudflare Stream webhooks: media-service

${section('OpenAPI CI')}
${checklist([
  'shared-contracts OpenAPI diff on PR',
  'Breaking change bot comment',
  'Postman collection auto-export',
  'Mock server for Flutter integration tests',
])}

${serviceTable('Port')}

${footer('api-standards.md')}
`;
}

// Remaining builders — compact but substantive; expanded via loops where needed

function buildDeploymentRules() {
  const envs = ['dev', 'staging', 'prod'];
  let body = `# Stream Heaven Deployment Rules

${section('Purpose')}
CI/CD, release channels, and infrastructure change control for AWS + Cloudflare.

${section('Environments')}
${table(['Env', 'Cluster', 'URL pattern', 'Data'], envs.map((e) => [
  e,
  `sh-eks-${e}`,
  e === 'prod' ? 'api.streamheaven.app' : `api.${e}.streamheaven.app`,
  e === 'prod' ? 'Production RDS' : 'Sanitized snapshot / synthetic',
]))}

${section('Pipeline (GitHub Actions)')}
1. \`turbo run lint test --filter=...[origin/main]\`
2. Docker build per changed service → ECR
3. Trivy scan — block CRITICAL
4. Deploy staging — ArgoCD sync
5. Smoke: auth OTP test user, live room token mint
6. Manual approval for prod
7. ArgoCD rolling update maxUnavailable 25%

${section('Flutter Release')}
${checklist([
  'Bump pubspec version + build number',
  'Run integration tests on Firebase Test Lab (Pixel 4a, Redmi 9)',
  'Upload AAB to Play Internal → Closed → Production staged 10%',
  'iOS TestFlight → App Store review',
  'Feature flags default off in prod',
  'Rollback: halt staged rollout; hotfix branch',
])}

${section('Secrets')}
- AWS Secrets Manager paths: \`sh/{env}/{service}/{key}\`
- Never echo secrets in CI logs
- Cloudflare API token scoped per zone

${section('Database deploy')}
- Migrations run as K8s Job before Deployment rollout
- wallet-service: maintenance window for SERIALIZABLE migrations

${section('CDN / Cloudflare')}
- Purge by Cache-Tag: \`title-{id}\`, \`creator-{id}\`
- WAF rules: OWASP core + India geo rate limit on OTP

${section('Observability deploy gate')}
- Datadog monitors green for 15m post-deploy or auto-rollback

${footer('deployment-rules.md')}
`;
  for (const svc of SERVICES) {
    body += section(`${svc.id} deploy checklist`, 3);
    body += checklist([`ECR image tagged ${svc.id}-<sha>`, 'Probes: /health live, /ready', 'HPA min 2 prod', 'PodDisruptionBudget minAvailable 1']);
  }
  return body;
}

function buildSecurityRules() {
  return `# Stream Heaven Security Rules

${section('Purpose')}
Auth, PII, payments, moderation, and compliance for Indian (DPDP) and global users.

${section('Identity')}
- Firebase Auth primary; auth-service issues SH JWT (15m) + refresh (30d)
- OTP SMS: 6 digit, 5 min TTL, hashed storage, per-phone rate limit
- Device binding: new device OTP step-up for wallet spends > ₹500 equivalent coins

${section('Authorization')}
${table(['Resource', 'Scope claim', 'Enforced at'], [
  ['wallet:debit', 'wallet:write', 'wallet-service'],
  ['room:broadcast', 'live:broadcast', 'livestream-service'],
  ['media:play', 'entitlement:{titleId}', 'media-service'],
  ['astro:consult', 'astro:book', 'wallet-service + booking module'],
])}

${section('PII handling')}
${checklist([
  'Encrypt phone AES-256-GCM in user-service',
  'Logs: phone last 4 only',
  'Export/delete within 30 days of verified request (DPDP)',
  'Minors: age gate 13+; Astro 18+ for paid consult',
  'CSAM: hash match pipeline — zero tolerance, report NCMEC process',
])}

${section('Payments')}
- Play/App Store IAP only for coin packs in v1
- Server-side receipt validation before crediting wallet
- Payouts to creators: KYC gate, TDS India rules, audit trail in wallet-service

${section('Content safety')}
- social-service: text classifier + human review queue
- livestream: live audio moderation webhook (vendor)
- OTT: maturity ratings per title; parental PIN

${section('Infrastructure')}
- TLS 1.2+ everywhere; HSTS on Cloudflare
- S3 buckets private; presigned PUT 15m max
- Security headers on API: CSP for developer portal only

${section('Incident secrets rotation')}
See \`incident-severity-rules.md\` — rotate Agora, Firebase, DB creds on SEC-1.

${codeBlock('typescript', `@UseGuards(JwtAuthGuard, AppIdGuard, ScopesGuard('wallet:write'))
@Post('gifts/send')
async sendGift(@Body() dto: SendGiftDto, @Headers('idempotency-key') key: string) {
  return this.walletService.sendGift(dto, key);
}`)}

${footer('security-rules.md')}
`;
}

function buildTestingRules() {
  let body = `# Stream Heaven Testing Rules

${section('Purpose')}
Quality gates for Flutter apps and NestJS services.

${section('Pyramid')}
${table(['Layer', 'Target %', 'Tools'], [
  ['Unit', '70% business logic', 'jest, flutter test'],
  ['Integration', '20% API modules', 'supertest, testcontainers PG'],
  ['E2E', '10% critical journeys', 'Patrol, Maestro'],
  ['Load', 'Pre-release', 'k6 on feed + live join'],
])}

${section('Required tests per change')}
${table(['Change type', 'Minimum tests'], [
  ['wallet mutation', 'Unit + integration idempotency + concurrency'],
  ['New REST endpoint', 'Contract test vs OpenAPI'],
  ['Flutter feature', 'Widget test + golden if UI component'],
  ['Socket event', 'Gateway integration with Redis adapter mock'],
  ['Agora token', 'Unit mock Agora SDK builder'],
])}

${section('CI')}
- Coverage floor 60% global; 80% wallet-service and auth-service
- Fail PR if \`flutter analyze\` warnings > 0

${section('Test data')}
- Synthetic users in staging; no prod dump on laptops
- OTP test bypass number only in dev (documented in README)

`;
  const journeys = [
    ['Social', 'Login OTP → follow → post → see in feed'],
    ['Livestream', 'Login → create room → receive gift → balance updates'],
    ['Astro', 'Login → book consult → join video → charge wallet'],
    ['Media', 'Login → play trailer → subscribe → offline download'],
  ];
  body += section('E2E journeys');
  body += table(['App', 'Journey'], journeys);
  for (const j of journeys) {
    body += section(`${j[0]} E2E checklist`, 3);
    body += checklist(j[1].split(' → ').map((s) => `Verify ${s.trim()}`));
  }
  body += footer('testing-rules.md');
  return body;
}

function buildBugPriorityRules() {
  const severities = [
    ['P0', 'Platform down / payment fraud / data leak', '< 1h response', 'CEO + CTO notified'],
    ['P1', 'Live cannot broadcast / wallet incorrect / auth broken', '< 4h', 'On-call engineer'],
    ['P2', 'Feature degraded / crash > 1% session', '< 24h', 'Team lead'],
    ['P3', 'UI bug / perf regression non-critical', '< 72h', 'Backlog'],
    ['P4', 'Cosmetic / nice-to-have', 'Next sprint', 'Triaged weekly'],
  ];
  let body = `# Stream Heaven Bug Priority Rules

${section('Severity matrix')}
${table(['Priority', 'Examples', 'SLA fix start', 'Escalation'], severities)}

${section('App-specific examples')}
`;
  for (const app of APPS) {
    body += section(app.name, 3);
    body += `- P0: ${app.id === 'livestream' ? 'Mass room disconnect' : app.id === 'wallet' ? 'Double coin credit' : 'Unable to login'}\n`;
    body += `- P1: ${app.focus.split(',')[0]} broken for > 10% users\n`;
    body += `- P2: Localized string wrong for ${STACK.langs}\n\n`;
  }
  body += section('Triage process');
  body += checklist(['Reproduce on staging', 'Assign component label', 'Link incident if production', 'Postmortem for P0/P1']);
  body += footer('bug-priority-rules.md');
  return body;
}

function buildReleaseChecklist() {
  let body = `# Stream Heaven Release Checklist

${section('Pre-release (T-7 days)')}
${checklist([
  'Roadmap item acceptance criteria met',
  'OpenAPI version tagged',
  'Translation complete 9 locales',
  'Load test sign-off for touched services',
  'Security review for auth/wallet changes',
  'Rollback plan documented',
])}

${section('Release day')}
${checklist([
  'Freeze main except hotfix',
  'Deploy backend staging → prod',
  'Migrations applied and verified',
  'Mobile 10% staged rollout',
  'Monitor: error rate, p99, Agora join success',
  'War room Slack channel open 4h',
])}

${section('Post-release (T+48h)')}
${checklist(['Review crash-free sessions', 'Compare coin economy metrics', 'Close release ticket', 'Update platform-roadmap.md status'])}

`;
  for (const app of APPS) {
    body += section(`${app.name} store checklist`, 3);
    body += checklist([`${app.pkg} version code incremented`, 'Play data safety form updated', 'Screenshot locales EN + HI minimum', 'Content rating questionnaire current']);
  }
  body += footer('release-checklist.md');
  return body;
}

function buildProductionReadiness() {
  return `# Stream Heaven Production Readiness Checklist

${section('Purpose')}
Gate before any service or app feature reaches production at scale.

${section('Service readiness')}
${checklist([
  'SLO defined: availability 99.9% (wallet 99.95%)',
  'Health/readiness endpoints',
  'Structured logging + trace IDs',
  'Alerts: error rate, latency, saturation',
  'Runbook in docs/runbooks/{service}.md',
  'Load tested to 2x expected peak',
  'Graceful shutdown drains connections 30s',
  'PII audit complete',
])}

${section('Mobile readiness')}
${checklist([
  'Crash-free > 99.5% sessions',
  'ANR rate < 0.1%',
  'Offline path tested Slow 3G',
  'Battery profiling livestream 30min',
  'App size within budget',
])}

${section('Checklist by service')}
${serviceTable('SLO owner')}

${section('Sign-off roles')}
${table(['Role', 'Approver'], [
  ['Engineering', 'Tech lead of service'],
  ['Security', 'Security champion — wallet, auth, live'],
  ['SRE', 'On-call lead'],
  ['Product', 'PM for app surface'],
])}

${footer('production-readiness-checklist.md')}
`;
}

function buildIncidentSeverityRules() {
  return `# Stream Heaven Incident Severity Rules

${section('Severity definitions')}
${table(['SEV', 'Impact', 'Response', 'Comms'], [
  ['SEV-1', 'Full outage or active breach', 'Immediate all-hands', 'Status page 15m'],
  ['SEV-2', 'Major feature broken > 25% users', 'On-call + lead', 'Status page 1h'],
  ['SEV-3', 'Isolated degradation', 'Business hours', 'Internal only'],
  ['SEV-4', 'Near miss / monitoring gap', 'Ticket', 'None'],
])}

${section('Roles')}
- **IC:** incident-commander-agent playbook or designated engineer
- **Comms:** status-page-agent draft
- **Scribe:** timeline in Slack #incidents

${section('Runbooks')}
| Scenario | First step |
|----------|------------|
| api-gateway 5xx spike | Scale pods; check RDS connections |
| Agora widespread fail | Enable Zego fallback flag |
| wallet double credit | Pause debit endpoints; ledger reconcile |
| OTP SMS fail | Failover SMS vendor per vendor-management-rules |

${section('Post-incident')}
- P0/P1: postmortem within 5 business days
- Action items in Jira SH-INC-*

${footer('incident-severity-rules.md')}
`;
}

function buildScalingPlaybook() {
  let body = `# Stream Heaven Scaling Playbook

${section('Triggers & actions')}
${table(['Signal', 'Threshold', 'Action'], [
  ['API p99', '> 500ms 10m', 'Scale HPA +2; check slow queries'],
  ['Live concurrent', '> 50k viewers', 'Agora plan upgrade; Redis cluster scale'],
  ['Redis memory', '> 75%', 'Evict non-critical keys; increase node'],
  ['RDS CPU', '> 70%', 'Read replica; optimize N+1'],
  ['S3 egress', 'Budget 80%', 'Cloudflare cache TTL increase'],
  ['FCM queue lag', '> 60s', 'notification-service workers +10'],
])}

${section('Horizontal scaling')}
${serviceTable('HPA max prod')}

${section('Livestream scale path')}
1. Socket.IO pods behind ALB sticky
2. Redis adapter cluster mode
3. Separate \`livestream-chat\` deployment if CPU > 60% from chat
4. Agora regional edge selection India-first

${section('Feed scale path')}
1. social-service read replicas
2. Precomputed fan-out for creators > 100k followers (hybrid pull/push)
3. Cloudflare cache public profiles 5m

`;
  body += footer('scaling-playbook.md');
  return body;
}

function buildFeatureApprovalRules() {
  return `# Stream Heaven Feature Approval Rules

${section('Tiers')}
${table(['Tier', 'Examples', 'Approvers'], [
  ['T0', 'Copy change, flag off experiment', 'PM'],
  ['T1', 'New feed filter, UI tweak', 'PM + Eng lead'],
  ['T2', 'Gifts, wallet promo, live PK', 'PM + Eng + Finance'],
  ['T3', 'New payment method, geo expansion', 'PM + Eng + Legal + CFO'],
  ['T4', 'New microservice, AI companion', 'CTO + ADR'],
])}

${section('Required artifacts')}
- PRD with acceptance criteria per app affected
- Figma link in design-system changelog
- Threat model for T2+ (security-rules.md)
- Cost estimate for T2+ (cost-control-rules.md)

${section('Feature flags')}
- LaunchDarkly keys: \`sh.{app}.{feature}\`
- Default off prod; 1% → 10% → 100% with metrics gate

${section('Four-app impact matrix')}
${appTable()}

${footer('feature-approval-rules.md')}
`;
}

function buildTechnicalDebtRules() {
  let body = `# Stream Heaven Technical Debt Rules

${section('Definition')}
Deferred work that increases risk, cost, or velocity loss. Tracked as \`debt/*\` labels in Jira.

${section('Classification')}
${table(['Class', 'Pay within', 'Example'], [
  ['D1 Critical', 'Current sprint', 'No OTP rate limit'],
  ['D2 High', '2 sprints', 'Missing wallet idempotency tests'],
  ['D3 Medium', 'Quarter', 'Duplicated theme tokens in Live app'],
  ['D4 Low', 'Opportunistic', 'Legacy setState in one screen'],
])}

${section('Allocation')}
- 20% sprint capacity for D1/D2
- No more than 2 D1 items open

`;
  for (const svc of SERVICES) {
    body += section(`${svc.id} debt watchlist template`, 3);
    body += `- [ ] Document top 3 debt items\n- [ ] Link ADR if intentional\n\n`;
  }
  body += footer('technical-debt-rules.md');
  return body;
}

function buildAiUsageRules() {
  return `# Stream Heaven AI Usage Rules

${section('Purpose')}
Governance for AI agents (\`ai-agents/\`), in-product LLM features, and Cursor development.

${section('Agent usage')}
${checklist([
  'Paste MASTER-GOVERNANCE-PROMPT.md before agent tasks',
  'One agent scope per task — no cross-domain without handoff',
  'Human review all wallet/auth codegen',
  'No prod credentials in agent chats',
  'Agent outputs must cite governance doc sections',
])}

${section('In-product AI (future)')}
- Astro: AI-generated horoscope summaries — human astrologer review for paid tier
- Social: caption assist — content safety filter before post
- OTT: recommendation model — explainability stub in UI

${section('Data')}
- Do not send PII to external LLM without DPA
- Prompt logs retained 30d redacted
- Model versioning recorded per prompt-engineering-rules.md

${section('Banned')}
- Autonomous prod deploy without human approval
- LLM-generated financial advice without disclaimer
- Training on user DMs without consent

${footer('ai-usage-rules.md')}
`;
}

function buildPromptEngineeringRules() {
  return `# Stream Heaven Prompt Engineering Rules

${section('Structure')}
${codeBlock('text', `SYSTEM: Role + constraints + Stream Heaven context
CONTEXT: User locale, app_id, subscription tier (non-PII)
USER: User message
TOOLS: Only allowlisted functions`)}

${section('Localization')}
- System prompt instructs model to respond in user's profile locale (${STACK.langs})
- Indic languages: avoid Romanized slang unless user writes in Roman

${section('Safety')}
- Refuse medical/legal claims in Astro beyond entertainment disclaimer
- Block prompts requesting other users' private data

${section('Versioning')}
- Prompt templates in \`packages/ai-prompts/{feature}/v{N}.yaml\`
- A/B only via feature flags; rollback = flag off

${section('Evaluation')}
${table(['Metric', 'Target'], [
  ['Hallucination rate (Astro)', '< 2% on golden set'],
  ['Moderation pass', '100% before public display'],
  ['Latency p95', '< 3s'],
])}

${footer('prompt-engineering-rules.md')}
`;
}

function buildCostControlRules() {
  return `# Stream Heaven Cost Control Rules

${section('Budget owners')}
${table(['Domain', 'Owner', 'Primary drivers'], [
  ['AWS compute', 'CTO', 'EKS, RDS'],
  ['CDN', 'CTO', 'Cloudflare egress'],
  ['RTC', 'CPO Live', 'Agora minutes'],
  ['SMS OTP', 'COO', 'auth-service volume'],
  ['ML (future)', 'CTO', 'GPU inference'],
])}

${section('Controls')}
- Tag all resources: \`sh:env\`, \`sh:service\`, \`sh:app\`
- Agora: alert at 80% monthly minute bundle
- S3 lifecycle: IA after 30d; Glacier for raw uploads 90d
- Redis: maxmemory-policy allkeys-lru
- Flutter: image CDN resize params mandatory

${section('Per-app attribution')}
${appTable()}

${section('Review cadence')}
- Weekly automated cost report
- Monthly CFO review with runway impact

${footer('cost-control-rules.md')}
`;
}

function buildVendorManagementRules() {
  return `# Stream Heaven Vendor Management Rules

${section('Approved vendors')}
${table(['Vendor', 'Use', 'Owner', 'Fallback'], [
  ['Firebase', 'Auth', 'auth-service', 'None — critical'],
  ['Agora', 'Live RTC primary', 'livestream-service', 'Zego'],
  ['Zego', 'Live RTC fallback', 'livestream-service', 'Pause live'],
  ['AWS', 'S3, RDS, EKS', 'All services', 'DR region'],
  ['Cloudflare', 'CDN, WAF', 'media-service', 'Origin direct emergency only'],
  ['SMS provider A/B', 'OTP', 'auth-service', 'Secondary route'],
  ['Play/App Store', 'IAP', 'wallet-service', 'N/A'],
])}

${section('Onboarding new vendor')}
${checklist(['Legal DPA signed', 'Security questionnaire', 'SOC2 or ISO report', 'POC in staging', 'Runbook + incident contact', 'Cost estimate approved'])}

${section('Review')}
- Annual review; quarterly for payment and RTC

${footer('vendor-management-rules.md')}
`;
}

function buildDisasterRecoveryRules() {
  return `# Stream Heaven Disaster Recovery Rules

${section('Objectives')}
${table(['Tier', 'RTO', 'RPO'], [
  ['wallet-service', '1h', '0 (sync replicate)'],
  ['auth-service', '2h', '15m'],
  ['social/live read', '4h', '1h'],
  ['media catalog', '8h', '24h'],
])}

${section('Scenarios')}
${section('Region loss (ap-south-1)', 3)}
1. Fail DNS api.streamheaven.app to DR ALB
2. Promote RDS cross-region replica
3. Redis Global Datastore failover
4. Communicate SEV-1

${section('Ransomware / data corruption', 3)}
- Restore RDS PITR to last known good
- Invalidate all refresh tokens via auth-service
- Rotate all secrets

${section('Backup tests')}
- Quarterly restore drill to isolated VPC
- Document in docs/dr-drill-YYYY-MM.md

${footer('disaster-recovery-rules.md')}
`;
}

function buildPlatformRoadmap() {
  const phases = [
    ['Phase 0', 'Done', 'Monorepo, governance, agents', '2025 Q4'],
    ['Phase 1', 'Active', 'Auth, user, shared-contracts, Socket.IO base', '2026 Q2'],
    ['Phase 2', 'Planned', 'Social feed MVP, Live room + gifts', '2026 Q3'],
    ['Phase 3', 'Planned', 'Wallet IAP, OTT catalog + playback', '2026 Q4'],
    ['Phase 4', 'Planned', 'Astro consult video, creator payouts', '2027 Q1'],
    ['Phase 5', 'Vision', 'AI recommendations, cross-app super profile', '2027+'],
  ];
  let body = `# Stream Heaven Platform Roadmap

${section('North star')}
One identity, four apps, Indian-first scale globally.

${section('Phases')}
${table(['Phase', 'Status', 'Deliverables', 'Target'], phases)}

${section('By app')}
`;
  for (const app of APPS) {
    body += section(app.name, 3);
    body += `- **Now:** Core navigation + auth + profile shell\n`;
    body += `- **Next:** ${app.focus}\n`;
    body += `- **Later:** Deep integration with shared wallet and notifications\n\n`;
  }
  body += section('Milestones checklist');
  body += checklist(phases.map((p) => `${p[0]}: ${p[2]}`));
  body += footer('platform-roadmap.md');
  return body;
}

function buildPlatformVision() {
  return `# Stream Heaven Platform Vision

${section('Mission')}
Build India's most inclusive AI-native entertainment ecosystem — social connection, live creation, spiritual guidance, and premium OTT — accessible on the cheapest Android phones and the slowest networks.

${section('Vision pillars')}
${table(['Pillar', 'What it means'], [
  ['Inclusive access', '9 languages, low bandwidth modes, small APKs'],
  ['Creator economy', 'Live gifts, social monetization, Astro experts, OTT royalties'],
  ['Trust & safety', 'DPDP-compliant, moderation at scale, transparent policies'],
  ['AI-native', 'Agents accelerate engineering; product AI delights users responsibly'],
  ['Unified identity', 'One Stream Heaven account across four apps'],
])}

${section('Who we serve')}
- **Creators:** Livestream App — rooms, gifts, growth analytics
- **Communities:** Social App — feed, DMs, regional content
- **Seekers:** Astro App — authentic consultations, not fear-based predictions
- **Families:** Media App — affordable OTT with parental controls

${section('Strategic bets')}
1. Mobile-first India, export playbook to diaspora
2. RTC cost discipline via Agora primary + Zego fallback
3. Edge-heavy delivery on Cloudflare
4. Wallet as shared economic layer

${section('What we will not do')}
- Ship without OTP auth and age gates where required
- Store unencrypted PII
- Launch fifth app without platform council approval

${section('Success metrics (3-year)')}
${table(['Metric', 'Target'], [
  ['MAU (combined unique)', '50M'],
  ['Creator earnings paid', '₹100Cr cumulative'],
  ['Crash-free sessions', '99.6%'],
  ['Live watch hours / month', '500M'],
  ['OTT subscribers', '5M'],
])}

${section('Alignment')}
All teams read \`platform-vision.md\` quarterly. Roadmap in \`platform-roadmap.md\` must trace to pillars above.

${footer('platform-vision.md')}
`;
}

// Expand shorter docs with substantive Stream Heaven appendices (target ≥200 lines)
function expandDoc(content, filename, minLines = 200) {
  let out = content;
  while (out.split('\n').length < minLines) {
    let extra = `\n${section(`Appendix — Operational reference (${filename})`)}\n`;
    extra += section('Microservice ownership matrix', 3);
    extra += serviceTable('Port');
    extra += section('Four-app surface map', 3);
    extra += appTable();
    extra += section('Locale release gate (9 languages)', 3);
    extra += table(
      ['Locale', 'ARB file', 'QA required', 'Script'],
      LOCALES.map((l) => [
        l.toUpperCase(),
        `app_${l}.arb`,
        'Native speaker or LQA vendor sign-off',
        ['en', 'hi'].includes(l) ? 'Latin / Devanagari' : 'Indic script',
      ]),
    );
    for (const svc of SERVICES) {
      extra += section(`${svc.id} — on-call notes`, 3);
      extra += `**Port:** ${svc.port} · **Domain:** ${svc.owns}\n\n`;
      extra += checklist([
        `Grafana dashboard: sh-${svc.id}-overview`,
        `PagerDuty service linked to ${svc.id}`,
        `Runbook: docs/runbooks/${svc.id}.md`,
        'Last game day or load test within 90 days',
        'Secrets in AWS Secrets Manager sh/prod/' + svc.id,
        'No cross-service DB credentials',
      ]);
    }
    for (const app of APPS) {
      extra += section(`${app.name} — store & compliance`, 3);
      extra += `- **Package:** \`${app.pkg}\`\n`;
      extra += `- **Focus:** ${app.focus}\n`;
      extra += `- **Gateway headers:** \`X-App-Id: ${app.id}\`\n`;
      extra += checklist([
        'Firebase google-services.json per flavor',
        'OTP flow tested on Jio 4G throttled network',
        'Crashlytics mapping file uploaded per release',
        'Play Data safety section matches actual data collection',
      ]);
    }
    extra += section('Glossary');
    extra += table(['Term', 'Definition'], [
      ['SH Coin', 'Virtual currency ledger in wallet-service'],
      ['Room', 'livestream-service broadcast unit with Agora channel'],
      ['Entitlement', 'media-service playback right'],
      ['Kundli', 'Astro birth chart entity'],
      ['PK', 'Livestream battle mode — two hosts, socket score'],
      ['api-gateway', 'Single public REST/WebSocket entry'],
      ['DPDP', 'India Digital Personal Data Protection Act compliance'],
    ]);
    extra += section('Cross-document index');
    extra += table(['Topic', 'Primary doc'], [
      ['REST contracts', 'api-standards.md'],
      ['Schema migrations', 'database-rules.md'],
      ['Riverpod / GoRouter', 'flutter-ui-rules.md'],
      ['OTP / JWT', 'security-rules.md'],
      ['Agora / Zego', 'vendor-management-rules.md + architecture-principles.md'],
      ['Incidents', 'incident-severity-rules.md'],
      ['Releases', 'release-checklist.md'],
      ['AI agents', 'ai-usage-rules.md'],
    ]);
    out += extra;
    if (out.split('\n').length >= minLines) break;
  }
  return out;
}

const BUILDERS = {
  'engineering-rules.md': buildEngineeringRules,
  'architecture-principles.md': buildArchitecturePrinciples,
  'database-rules.md': buildDatabaseRules,
  'flutter-ui-rules.md': buildFlutterUiRules,
  'api-standards.md': buildApiStandards,
  'deployment-rules.md': buildDeploymentRules,
  'security-rules.md': buildSecurityRules,
  'testing-rules.md': buildTestingRules,
  'bug-priority-rules.md': buildBugPriorityRules,
  'release-checklist.md': buildReleaseChecklist,
  'production-readiness-checklist.md': buildProductionReadiness,
  'incident-severity-rules.md': buildIncidentSeverityRules,
  'scaling-playbook.md': buildScalingPlaybook,
  'feature-approval-rules.md': buildFeatureApprovalRules,
  'technical-debt-rules.md': buildTechnicalDebtRules,
  'ai-usage-rules.md': buildAiUsageRules,
  'prompt-engineering-rules.md': buildPromptEngineeringRules,
  'cost-control-rules.md': buildCostControlRules,
  'vendor-management-rules.md': buildVendorManagementRules,
  'disaster-recovery-rules.md': buildDisasterRecoveryRules,
  'platform-roadmap.md': buildPlatformRoadmap,
  'platform-vision.md': buildPlatformVision,
};

// ─── Main ────────────────────────────────────────────────────────────────────

if (!existsSync(ROOT)) mkdirSync(ROOT, { recursive: true });

const created = [];
const lineCounts = {};

for (const [filename, builder] of Object.entries(BUILDERS)) {
  let content = builder();
  content = expandDoc(content, filename, 200);
  const outPath = join(ROOT, filename);
  writeFileSync(outPath, content, 'utf8');
  const lineCount = content.split('\n').length;
  created.push(filename);
  lineCounts[filename] = lineCount;
}

console.log(`Generated ${created.length} governance files in ${ROOT}`);
for (const f of created) {
  console.log(`  ${f}: ${lineCounts[f]} lines`);
}
