/// Mock data for creator profile — used until social-service creator API is live.
library;

import '../domain/creator_profile_models.dart';

final _mockProfiles = <String, CreatorProfile>{
  'priya_dance': const CreatorProfile(
    userId: 'usr_mock_001',
    handle: 'priya_dance',
    displayName: 'Priya Sharma',
    followerCount: 1250000,
    followingCount: 342,
    postCount: 487,
    isFollowedByMe: false,
    isCelebrity: true,
    isVerified: true,
    bio: 'Classical & Bollywood dancer | Mumbai\nDance videos every Tuesday & Friday',
    avatarUrl: null,
  ),
  'ravi_tech': const CreatorProfile(
    userId: 'usr_mock_002',
    handle: 'ravi_tech',
    displayName: 'Ravi Kumar',
    followerCount: 89400,
    followingCount: 512,
    postCount: 203,
    isFollowedByMe: true,
    isCelebrity: false,
    isVerified: false,
    bio: 'Tech reviews in Telugu & Hindi\nBudget phones & tips',
    avatarUrl: null,
  ),
  'meera_food': const CreatorProfile(
    userId: 'usr_mock_003',
    handle: 'meera_food',
    displayName: 'Meera Nair',
    followerCount: 320000,
    followingCount: 218,
    postCount: 1102,
    isFollowedByMe: false,
    isCelebrity: false,
    isVerified: false,
    bio: 'Kerala home cooking | Simple recipes\nFood for the soul',
    avatarUrl: null,
  ),
};

final _mockThumbs = <String, List<CreatorPostThumb>>{
  'usr_mock_001': List.generate(
    12,
    (i) => CreatorPostThumb(
      postId: 'post_mock_001_$i',
      thumbUrl: '',
      likeCount: 10000 + i * 3500,
      viewCount: 250000 + i * 50000,
      isVideo: i % 3 != 0,
      durationSeconds: i % 3 != 0 ? 15.0 + i * 2 : null,
    ),
  ),
  'usr_mock_002': List.generate(
    9,
    (i) => CreatorPostThumb(
      postId: 'post_mock_002_$i',
      thumbUrl: '',
      likeCount: 1500 + i * 400,
      viewCount: 40000 + i * 8000,
      isVideo: i % 2 == 0,
      durationSeconds: i % 2 == 0 ? 60.0 + i * 30 : null,
    ),
  ),
  'usr_mock_003': List.generate(
    15,
    (i) => CreatorPostThumb(
      postId: 'post_mock_003_$i',
      thumbUrl: '',
      likeCount: 5000 + i * 1200,
      viewCount: 80000 + i * 15000,
      isVideo: i % 4 != 0,
      durationSeconds: i % 4 != 0 ? 30.0 + i * 5 : null,
    ),
  ),
};

/// Returns mock profile for a given handle.
/// Returns null to simulate 404 for unknown handles.
CreatorProfile? mockProfileByHandle(String handle) => _mockProfiles[handle];

/// Returns first profile as a fallback for any unknown handle (dev convenience).
CreatorProfile mockFallbackProfile(String handle) {
  return CreatorProfile(
    userId: 'usr_mock_unknown',
    handle: handle,
    displayName: handle,
    followerCount: 0,
    followingCount: 0,
    postCount: 0,
    isFollowedByMe: false,
    isCelebrity: false,
    bio: null,
    avatarUrl: null,
  );
}

List<CreatorPostThumb> mockPostsForUser(String userId) =>
    _mockThumbs[userId] ?? const [];
