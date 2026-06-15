import '../domain/home_feed_models.dart';
import '../providers/social_home_providers.dart';

/// Demo feed items for the social home shell (replace with repository + API).
///
/// Trending scores are pre-computed via [computeTrendingScore] in providers.
/// Feed scores use [computeFeedScore]. Both are stubs until ranking service is live.
List<HomeFeedItem> mockSocialHomeFeedItems(SocialHomeFeedTab tab) {
  switch (tab) {
    case SocialHomeFeedTab.videos:
      return _videoItems;
    case SocialHomeFeedTab.following:
      return _followingItems;
    case SocialHomeFeedTab.celebrity:
      return _celebrityItems;
    case SocialHomeFeedTab.trending:
      return _trendingItems;
  }
}

// ---------------------------------------------------------------------------
// Trending tab — mixed content, all with rankScore badges
// ---------------------------------------------------------------------------

final _trendingItems = <HomeFeedItem>[
  const HomeFeedItem(
    itemId: 't1',
    itemType: HomeFeedItemType.shortVideo,
    author: HomeFeedAuthor(
      userId: 'u1',
      handle: 'telugu_creator',
      displayName: 'Telugu Creator',
      isVerified: true,
    ),
    caption: 'Trending reel from Hyderabad 🔥',
    likeCount: 12400,
    commentCount: 892,
    shareCount: 456,
    giftCount: 23,
    saveCount: 310,
    soundTitle: 'Original Sound — Telugu Beat',
    regionCode: 'IN-TG',
    regionLabel: 'Hyderabad',
    rankScore: 87.4,
  ),
  const HomeFeedItem(
    itemId: 't2',
    itemType: HomeFeedItemType.cryptoPost,
    author: HomeFeedAuthor(
      userId: 'u2',
      handle: 'crypto_pulse',
      displayName: 'Crypto Pulse',
      isVerified: true,
    ),
    caption: 'BTC breaks resistance — watching this zone closely. Market analysis thread.',
    cryptoSymbol: 'BTC',
    cryptoChangePct: 2.4,
    likeCount: 3200,
    commentCount: 410,
    shareCount: 120,
    saveCount: 89,
    rankScore: 72.1,
  ),
  const HomeFeedItem(
    itemId: 't3',
    itemType: HomeFeedItemType.liveStream,
    author: HomeFeedAuthor(
      userId: 'u3',
      handle: 'star_host',
      displayName: 'Star Host',
      isCelebrity: true,
      isVerified: true,
    ),
    caption: 'Live now — join the room!',
    likeCount: 8900,
    commentCount: 1200,
    shareCount: 300,
    giftCount: 88,
    saveCount: 45,
    soundTitle: 'Live Room Audio',
    rankScore: 95.0,
  ),
  const HomeFeedItem(
    itemId: 't4',
    itemType: HomeFeedItemType.shortVideo,
    author: HomeFeedAuthor(
      userId: 'u6',
      handle: 'dance_queen',
      displayName: 'Dance Queen',
    ),
    caption: 'New choreography — try this at home!',
    likeCount: 45200,
    commentCount: 2100,
    shareCount: 890,
    giftCount: 56,
    saveCount: 1200,
    soundTitle: 'Original Sound — Bass Drop',
    rankScore: 91.7,
  ),
  const HomeFeedItem(
    itemId: 't5',
    itemType: HomeFeedItemType.audioPost,
    author: HomeFeedAuthor(
      userId: 'u4',
      handle: 'pocket_fm_style',
      displayName: 'Audio Stories',
    ),
    caption: 'Episode 12 — cliffhanger audio drop',
    durationMs: 180000,
    likeCount: 5600,
    commentCount: 220,
    shareCount: 90,
    saveCount: 440,
    soundTitle: 'Original Audio — Episode 12',
    rankScore: 68.3,
  ),
  const HomeFeedItem(
    itemId: 't6',
    itemType: HomeFeedItemType.communityPost,
    author: HomeFeedAuthor(
      userId: 'u5',
      handle: 'community_hub',
      displayName: 'Community Hub',
    ),
    caption: 'ShareChat-style community thread — vote your favourite! 🗳️',
    likeCount: 2100,
    commentCount: 540,
    shareCount: 67,
    saveCount: 32,
    rankScore: 55.8,
  ),
];

// ---------------------------------------------------------------------------
// Videos tab — short video only
// ---------------------------------------------------------------------------

final _videoItems = <HomeFeedItem>[
  const HomeFeedItem(
    itemId: 'v1',
    itemType: HomeFeedItemType.shortVideo,
    author: HomeFeedAuthor(
      userId: 'u1',
      handle: 'telugu_creator',
      displayName: 'Telugu Creator',
      isVerified: true,
    ),
    caption: 'Trending reel from Hyderabad 🔥',
    likeCount: 12400,
    commentCount: 892,
    shareCount: 456,
    giftCount: 23,
    saveCount: 310,
    soundTitle: 'Original Sound — Telugu Beat',
    regionCode: 'IN-TG',
    regionLabel: 'Hyderabad',
  ),
  const HomeFeedItem(
    itemId: 'v2',
    itemType: HomeFeedItemType.shortVideo,
    author: HomeFeedAuthor(
      userId: 'u6',
      handle: 'dance_queen',
      displayName: 'Dance Queen',
    ),
    caption: 'New choreography — try this at home!',
    likeCount: 45200,
    commentCount: 2100,
    shareCount: 890,
    giftCount: 56,
    saveCount: 1200,
    soundTitle: 'Original Sound — Bass Drop',
  ),
  const HomeFeedItem(
    itemId: 'v3',
    itemType: HomeFeedItemType.shortVideo,
    author: HomeFeedAuthor(
      userId: 'u7',
      handle: 'comedy_clips',
      displayName: 'Comedy Clips',
    ),
    caption: 'POV: Monday morning energy 😂',
    likeCount: 9800,
    commentCount: 640,
    shareCount: 1200,
    giftCount: 8,
    saveCount: 220,
    soundTitle: 'Original Sound — Laugh Track',
  ),
  const HomeFeedItem(
    itemId: 'v4',
    itemType: HomeFeedItemType.shortVideo,
    author: HomeFeedAuthor(
      userId: 'u8',
      handle: 'hindi_vibes',
      displayName: 'Hindi Vibes',
      isVerified: true,
    ),
    caption: 'Desi beats never get old 🎵',
    likeCount: 18700,
    commentCount: 1340,
    shareCount: 780,
    giftCount: 34,
    saveCount: 560,
    soundTitle: 'Original Sound — Desi Mix',
    regionCode: 'IN-MH',
    regionLabel: 'Mumbai',
  ),
  const HomeFeedItem(
    itemId: 'v5',
    itemType: HomeFeedItemType.shortVideo,
    author: HomeFeedAuthor(
      userId: 'u9',
      handle: 'tech_creator',
      displayName: 'Tech Creator',
    ),
    caption: 'Flutter animations in 60 seconds ⚡',
    likeCount: 6200,
    commentCount: 390,
    shareCount: 410,
    giftCount: 12,
    saveCount: 890,
    soundTitle: 'Original Sound — Tech Intro',
  ),
];

// ---------------------------------------------------------------------------
// Following tab — content from creators the user follows, with regional mix
// ---------------------------------------------------------------------------

final _followingItems = <HomeFeedItem>[
  const HomeFeedItem(
    itemId: 'f1',
    itemType: HomeFeedItemType.shortVideo,
    author: HomeFeedAuthor(
      userId: 'u1',
      handle: 'telugu_creator',
      displayName: 'Telugu Creator',
      isVerified: true,
      isFollowing: true,
    ),
    caption: 'Behind the scenes — Hyderabad studio tour',
    likeCount: 7800,
    commentCount: 540,
    shareCount: 230,
    giftCount: 15,
    saveCount: 180,
    soundTitle: 'Original Sound — Telugu Beat',
    regionCode: 'IN-TG',
    regionLabel: 'Hyderabad',
  ),
  const HomeFeedItem(
    itemId: 'f2',
    itemType: HomeFeedItemType.imagePost,
    author: HomeFeedAuthor(
      userId: 'u8',
      handle: 'hindi_vibes',
      displayName: 'Hindi Vibes',
      isVerified: true,
      isFollowing: true,
    ),
    caption: 'New look, same vibes ✨',
    likeCount: 5600,
    commentCount: 320,
    shareCount: 110,
    saveCount: 430,
    regionCode: 'IN-MH',
    regionLabel: 'Mumbai',
  ),
  const HomeFeedItem(
    itemId: 'f3',
    itemType: HomeFeedItemType.audioPost,
    author: HomeFeedAuthor(
      userId: 'u4',
      handle: 'pocket_fm_style',
      displayName: 'Audio Stories',
      isFollowing: true,
    ),
    caption: 'New episode drops midnight — set your alarm!',
    durationMs: 120000,
    likeCount: 3100,
    commentCount: 180,
    shareCount: 55,
    saveCount: 620,
    soundTitle: 'Original Audio — Teaser',
  ),
];

// ---------------------------------------------------------------------------
// Celebrity tab — verified celebrity creators only
// ---------------------------------------------------------------------------

final _celebrityItems = <HomeFeedItem>[
  const HomeFeedItem(
    itemId: 'c1',
    itemType: HomeFeedItemType.liveStream,
    author: HomeFeedAuthor(
      userId: 'u3',
      handle: 'star_host',
      displayName: 'Star Host',
      isCelebrity: true,
      isVerified: true,
    ),
    caption: 'Live Q&A — ask me anything! 🎤',
    likeCount: 42000,
    commentCount: 8800,
    shareCount: 1200,
    giftCount: 340,
    saveCount: 560,
    soundTitle: 'Live Room Audio',
    rankScore: 98.2,
  ),
  const HomeFeedItem(
    itemId: 'c2',
    itemType: HomeFeedItemType.shortVideo,
    author: HomeFeedAuthor(
      userId: 'u10',
      handle: 'bollywood_star',
      displayName: 'Bollywood Star',
      isCelebrity: true,
      isVerified: true,
    ),
    caption: 'New song teaser — releasing Friday! 🎬',
    likeCount: 186000,
    commentCount: 24000,
    shareCount: 9800,
    giftCount: 1200,
    saveCount: 34000,
    soundTitle: 'Original Sound — Unreleased Track',
    rankScore: 99.5,
  ),
  const HomeFeedItem(
    itemId: 'c3',
    itemType: HomeFeedItemType.shortVideo,
    author: HomeFeedAuthor(
      userId: 'u11',
      handle: 'cricket_legend',
      displayName: 'Cricket Legend',
      isCelebrity: true,
      isVerified: true,
    ),
    caption: 'Training hard for the next series 💪',
    likeCount: 94000,
    commentCount: 11200,
    shareCount: 4600,
    giftCount: 820,
    saveCount: 15000,
    soundTitle: 'Original Sound — Motivation',
    rankScore: 96.1,
  ),
  const HomeFeedItem(
    itemId: 'c4',
    itemType: HomeFeedItemType.communityPost,
    author: HomeFeedAuthor(
      userId: 'u12',
      handle: 'music_producer',
      displayName: 'Music Producer',
      isCelebrity: true,
      isVerified: true,
    ),
    caption: 'Dropping my collab EP next week. Who should I feature next? 🎧',
    likeCount: 38000,
    commentCount: 6700,
    shareCount: 2100,
    saveCount: 8900,
    rankScore: 89.3,
  ),
];
