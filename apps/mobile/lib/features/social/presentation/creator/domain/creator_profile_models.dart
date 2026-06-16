/// Creator public profile domain models.
/// Maps to user.v1.yaml CreatorProfile schema and GET /users/{handle} response.
library;

class CreatorProfile {
  const CreatorProfile({
    required this.userId,
    required this.handle,
    required this.displayName,
    required this.followerCount,
    required this.followingCount,
    required this.postCount,
    required this.isFollowedByMe,
    required this.isCelebrity,
    this.avatarUrl,
    this.bio,
    this.isVerified = false,
  });

  final String userId;
  final String handle;
  final String displayName;
  final int followerCount;
  final int followingCount;
  final int postCount;
  final bool isFollowedByMe;
  final bool isCelebrity;
  final String? avatarUrl;
  final String? bio;
  final bool isVerified;

  CreatorProfile copyWith({
    bool? isFollowedByMe,
    int? followerCount,
  }) {
    return CreatorProfile(
      userId: userId,
      handle: handle,
      displayName: displayName,
      followerCount: followerCount ?? this.followerCount,
      followingCount: followingCount,
      postCount: postCount,
      isFollowedByMe: isFollowedByMe ?? this.isFollowedByMe,
      isCelebrity: isCelebrity,
      avatarUrl: avatarUrl,
      bio: bio,
      isVerified: isVerified,
    );
  }
}

/// Thumbnail representation of a post for the creator grid.
class CreatorPostThumb {
  const CreatorPostThumb({
    required this.postId,
    required this.thumbUrl,
    required this.likeCount,
    required this.viewCount,
    this.isVideo = false,
    this.durationSeconds,
  });

  final String postId;
  final String thumbUrl;
  final int likeCount;
  final int viewCount;
  final bool isVideo;
  final double? durationSeconds;
}

/// Combined state for the creator profile page.
class CreatorProfileState {
  const CreatorProfileState({
    required this.profile,
    required this.posts,
    this.isFollowLoading = false,
  });

  final CreatorProfile profile;
  final List<CreatorPostThumb> posts;
  final bool isFollowLoading;

  CreatorProfileState copyWith({
    CreatorProfile? profile,
    List<CreatorPostThumb>? posts,
    bool? isFollowLoading,
  }) {
    return CreatorProfileState(
      profile: profile ?? this.profile,
      posts: posts ?? this.posts,
      isFollowLoading: isFollowLoading ?? this.isFollowLoading,
    );
  }
}
