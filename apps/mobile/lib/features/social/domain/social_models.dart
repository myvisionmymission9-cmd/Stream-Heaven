class SocialPostItem {
  const SocialPostItem({
    required this.postId,
    required this.authorId,
    required this.text,
    required this.likeCount,
    required this.commentCount,
    this.mediaUrl,
  });

  factory SocialPostItem.fromJson(Map<String, dynamic> json) {
    return SocialPostItem(
      postId: json['postId'] as String,
      authorId: json['authorId'] as String,
      text: json['text'] as String,
      likeCount: (json['likeCount'] as num?)?.toInt() ?? 0,
      commentCount: (json['commentCount'] as num?)?.toInt() ?? 0,
      mediaUrl: json['mediaUrl'] as String?,
    );
  }

  final String postId;
  final String authorId;
  final String text;
  final int likeCount;
  final int commentCount;
  final String? mediaUrl;
}

class FeedPage {
  const FeedPage({
    required this.items,
    required this.hasMore,
    required this.nextCursor,
  });

  factory FeedPage.fromJson(Map<String, dynamic> json) {
    final page = json['page'] as Map<String, dynamic>?;
    final cursor = page?['cursor'] as Map<String, dynamic>?;
    return FeedPage(
      items: ((json['items'] as List<dynamic>? ?? const <dynamic>[])
          .map((item) => SocialPostItem.fromJson(item as Map<String, dynamic>))
          .toList()),
      hasMore: page?['hasMore'] as bool? ?? false,
      nextCursor: cursor?['next'] as String?,
    );
  }

  final List<SocialPostItem> items;
  final bool hasMore;
  final String? nextCursor;
}
