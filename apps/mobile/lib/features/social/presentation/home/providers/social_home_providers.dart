import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../domain/home_feed_models.dart';
import '../data/social_home_mock_data.dart';

final socialHomeFeedTabProvider =
    StateProvider<SocialHomeFeedTab>((ref) => SocialHomeFeedTab.trending);

final socialHomeFeedIndexProvider = StateProvider<int>((ref) => 0);

final socialHomeFeedItemsProvider =
    StateNotifierProvider.autoDispose<SocialHomeFeedItemsNotifier, List<HomeFeedItem>>((ref) {
  final tab = ref.watch(socialHomeFeedTabProvider);
  return SocialHomeFeedItemsNotifier(mockSocialHomeFeedItems(tab));
});

class SocialHomeFeedItemsNotifier extends StateNotifier<List<HomeFeedItem>> {
  SocialHomeFeedItemsNotifier(super.initial);

  void toggleLike(int index) {
    if (index < 0 || index >= state.length) return;
    final item = state[index];
    final liked = !item.isLiked;
    state = [
      ...state.sublist(0, index),
      item.copyWith(
        isLiked: liked,
        likeCount: item.likeCount + (liked ? 1 : -1),
      ),
      ...state.sublist(index + 1),
    ];
  }

  void toggleFollow(int index) {
    if (index < 0 || index >= state.length) return;
    final item = state[index];
    state = [
      ...state.sublist(0, index),
      item.copyWith(isFollowing: !item.author.isFollowing),
      ...state.sublist(index + 1),
    ];
  }

  void toggleSave(int index) {
    if (index < 0 || index >= state.length) return;
    final item = state[index];
    final saved = !item.isSaved;
    state = [
      ...state.sublist(0, index),
      item.copyWith(
        isSaved: saved,
        saveCount: item.saveCount + (saved ? 1 : -1),
      ),
      ...state.sublist(index + 1),
    ];
  }

  void reload(SocialHomeFeedTab tab) {
    state = mockSocialHomeFeedItems(tab);
  }
}

// ---------------------------------------------------------------------------
// Recommendation scoring stubs
// ---------------------------------------------------------------------------
//
// Trending Score = Engagement×0.30 + Velocity×0.25 + WatchTime×0.25
//                + Completion×0.10 + Recency×0.10
//
// Each signal is normalised to [0, 1] before weighting.
// Stub: signals are mocked via item counts until the ranking service is live.
double computeTrendingScore({
  required double engagement,
  required double velocity,
  required double watchTime,
  required double completion,
  required double recency,
}) {
  return engagement * 0.30 +
      velocity * 0.25 +
      watchTime * 0.25 +
      completion * 0.10 +
      recency * 0.10;
}

// Feed Score = Interest×0.40 + Quality×0.25 + WatchTime×0.20
//            + Recency×0.10 + Diversity×0.05
//
// Diversity bonus penalises consecutive items from same author or type.
double computeFeedScore({
  required double interest,
  required double quality,
  required double watchTime,
  required double recency,
  required double diversity,
}) {
  return interest * 0.40 +
      quality * 0.25 +
      watchTime * 0.20 +
      recency * 0.10 +
      diversity * 0.05;
}

// ---------------------------------------------------------------------------

enum SocialHomeFeedTab { trending, videos, following, celebrity }

enum SocialShellTab { home, live, audio, astro, tv }

final socialShellTabProvider = StateProvider<SocialShellTab>((ref) => SocialShellTab.home);
