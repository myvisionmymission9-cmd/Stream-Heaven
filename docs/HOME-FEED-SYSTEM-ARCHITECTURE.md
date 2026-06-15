# Home Feed System Architecture

Scoped architecture for Stream Heaven **Home Feed only** (Phase 8 social-app). Not wallet, admin, or full live streaming.

## Surfaces

| Layer | Path | Role |
|-------|------|------|
| Flutter UI | `apps/mobile/lib/features/home_feed/` | TikTok-style vertical feed shell |
| Contracts | `packages/shared-contracts/openapi/feed.v1.yaml` | `GET /feed/home`, trending debug |
| Agents | `apps/social-app/agents/home-feed/` | 15 specialized agents + Cursor skills |
| Legacy social API | `packages/shared-contracts/openapi/social.v1.yaml` | Tabbed feed, watch events (extend later) |

## Top tabs

- **Trending** — global + regional boost
- **Videos** — short-form video bias
- **Following** — graph-constrained feed
- **Celebrity** — verified creators only
- **Create Post** — entry to composer (placeholder in UI)

## Content union (`HomeFeedItemType`)

`short_video` · `image_post` · `audio_post` · `live_stream` · `audio_room` · `community_post` · `crypto_post`

## Client layout

```
┌─────────────────────────────────────┐
│ Top tabs (SafeArea)                 │
├─────────────────────────────────────┤
│                                     │
│   Vertical PageView (full bleed)    │
│   + creator overlay (bottom-left)   │
│   + engagement rail (right)           │
│                                     │
├─────────────────────────────────────┤
│ Bottom nav: Home · Live · Audio ·   │
│ Astro · TV                          │
└─────────────────────────────────────┘
```

State: Riverpod (`homeFeedTabProvider`, `homeFeedItemsNotifierProvider`, `homeFeedItemIndexProvider`).

Routing: authenticated users land on `/home` → `HomeFeedScreen` (`app_router.dart`).

## Recommendation signals (spec)

Ranking inputs (server-side; client emits watch events later):

- Watch time, completion rate, rewatch
- Likes, shares, follows, gifts
- Regional / locale (`locale`, `regionCode` query params on `GET /feed/home`)
- Trending decay (see `trending-algorithm-agent`)

## Trending formula (placeholder)

```
trending_score = (w1 * watch_time_norm + w2 * completion + w3 * rewatch
                  + w4 * shares + w5 * likes) * recency_decay(hours)
```

Weights and decay constants live in ranking service config — not hardcoded in Flutter.

## Phase boundaries

- **In scope:** feed UI, tab routing, mock/repository hook, OpenAPI stubs, agents
- **Out of scope:** payment, full RTC, admin moderation console, wallet ledger

## Next implementation steps

1. Wire `HomeFeedRepository` to `GET /feed/home` when social-service is ready
2. Video player + HLS preload (`feed-preload-buffer-agent`)
3. Watch-event batching to analytics pipeline
4. i18n for hi/te/ta regional strings
