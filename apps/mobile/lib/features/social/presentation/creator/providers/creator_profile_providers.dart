/// Riverpod providers for creator public profile.
/// Backed by mock data until social-service creator API is live.
library;

import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../data/creator_profile_mock_data.dart';
import '../domain/creator_profile_models.dart';

/// Loads a creator profile by handle.
/// Returns [AsyncValue<CreatorProfileState>].
final creatorProfileProvider =
    AsyncNotifierProviderFamily<CreatorProfileNotifier, CreatorProfileState, String>(
  CreatorProfileNotifier.new,
);

class CreatorProfileNotifier
    extends FamilyAsyncNotifier<CreatorProfileState, String> {
  @override
  Future<CreatorProfileState> build(String handle) async {
    return _fetchProfile(handle);
  }

  Future<CreatorProfileState> _fetchProfile(String handle) async {
    // TODO(phase-12): replace with real GET /users/{handle} via social-service
    await Future.delayed(const Duration(milliseconds: 400));

    final profile =
        mockProfileByHandle(handle) ?? mockFallbackProfile(handle);
    final posts = mockPostsForUser(profile.userId);

    return CreatorProfileState(profile: profile, posts: posts);
  }

  /// Optimistic follow/unfollow toggle.
  Future<void> toggleFollow() async {
    final current = state.valueOrNull;
    if (current == null) return;

    final wasFollowing = current.profile.isFollowedByMe;
    final delta = wasFollowing ? -1 : 1;

    // Optimistic update
    state = AsyncData(
      current.copyWith(
        profile: current.profile.copyWith(
          isFollowedByMe: !wasFollowing,
          followerCount: current.profile.followerCount + delta,
        ),
        isFollowLoading: true,
      ),
    );

    try {
      // TODO(phase-12): POST /social/users/{userId}/follow or DELETE
      await Future.delayed(const Duration(milliseconds: 300));
      final updated = state.valueOrNull;
      if (updated != null) {
        state = AsyncData(updated.copyWith(isFollowLoading: false));
      }
    } catch (_) {
      // Revert on error
      state = AsyncData(
        current.copyWith(
          profile: current.profile.copyWith(
            isFollowedByMe: wasFollowing,
            followerCount: current.profile.followerCount,
          ),
          isFollowLoading: false,
        ),
      );
    }
  }

  Future<void> refresh() async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() => _fetchProfile(arg));
  }
}
