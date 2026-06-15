enum HomeFeedTab { trending, videos, following, celebrity }

enum HomeFeedItemType {
  shortVideo,
  imagePost,
  audioPost,
  liveStream,
  audioRoom,
  communityPost,
  cryptoPost,
}

class HomeFeedAuthor {
  const HomeFeedAuthor({
    required this.userId,
    required this.handle,
    required this.displayName,
    this.avatarUrl,
    this.isCelebrity = false,
    this.isFollowing = false,
    this.isVerified = false,
  });

  final String userId;
  final String handle;
  final String displayName;
  final String? avatarUrl;
  final bool isCelebrity;
  final bool isFollowing;
  final bool isVerified;
}

class HomeFeedItem {
  const HomeFeedItem({
    required this.itemId,
    required this.itemType,
    required this.author,
    required this.caption,
    this.mediaUrl,
    this.thumbnailUrl,
    this.durationMs = 0,
    this.likeCount = 0,
    this.commentCount = 0,
    this.shareCount = 0,
    this.giftCount = 0,
    this.saveCount = 0,
    this.isLiked = false,
    this.isSaved = false,
    this.soundTitle,
    this.cryptoSymbol,
    this.cryptoChangePct,
    this.regionCode,
    this.regionLabel,
    this.rankScore,
  });

  final String itemId;
  final HomeFeedItemType itemType;
  final HomeFeedAuthor author;
  final String caption;
  final String? mediaUrl;
  final String? thumbnailUrl;
  final int durationMs;
  final int likeCount;
  final int commentCount;
  final int shareCount;
  final int giftCount;
  final int saveCount;
  final bool isLiked;
  final bool isSaved;
  final String? soundTitle;
  final String? cryptoSymbol;
  final double? cryptoChangePct;
  /// BCP-47 region code for regional discovery boost (e.g. "IN-TG").
  final String? regionCode;
  /// Human-readable region label shown in feed overlay (e.g. "Hyderabad").
  final String? regionLabel;
  /// Pre-computed rank score for display (see scoring formulas in providers).
  final double? rankScore;

  HomeFeedItem copyWith({
    bool? isLiked,
    int? likeCount,
    bool? isFollowing,
    bool? isSaved,
    int? saveCount,
  }) {
    return HomeFeedItem(
      itemId: itemId,
      itemType: itemType,
      author: isFollowing != null
          ? HomeFeedAuthor(
              userId: author.userId,
              handle: author.handle,
              displayName: author.displayName,
              avatarUrl: author.avatarUrl,
              isCelebrity: author.isCelebrity,
              isFollowing: isFollowing,
              isVerified: author.isVerified,
            )
          : author,
      caption: caption,
      mediaUrl: mediaUrl,
      thumbnailUrl: thumbnailUrl,
      durationMs: durationMs,
      likeCount: likeCount ?? this.likeCount,
      commentCount: commentCount,
      shareCount: shareCount,
      giftCount: giftCount,
      saveCount: saveCount ?? this.saveCount,
      isLiked: isLiked ?? this.isLiked,
      isSaved: isSaved ?? this.isSaved,
      soundTitle: soundTitle,
      cryptoSymbol: cryptoSymbol,
      cryptoChangePct: cryptoChangePct,
      regionCode: regionCode,
      regionLabel: regionLabel,
      rankScore: rankScore,
    );
  }
}

class HomeFeedPage {
  const HomeFeedPage({required this.tab, required this.items, this.hasMore = true});

  final HomeFeedTab tab;
  final List<HomeFeedItem> items;
  final bool hasMore;
}
