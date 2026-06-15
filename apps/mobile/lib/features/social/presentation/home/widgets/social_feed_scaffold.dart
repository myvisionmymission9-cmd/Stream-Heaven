import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../feed_items/video_feed_page.dart';
import '../providers/social_home_providers.dart';

/// Shared vertical feed scaffold used by each top tab.
class SocialFeedScaffold extends ConsumerStatefulWidget {
  const SocialFeedScaffold({super.key});

  @override
  ConsumerState<SocialFeedScaffold> createState() => _SocialFeedScaffoldState();
}

class _SocialFeedScaffoldState extends ConsumerState<SocialFeedScaffold> {
  late final PageController _pageController;

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final items = ref.watch(socialHomeFeedItemsProvider);
    final currentIndex = ref.watch(socialHomeFeedIndexProvider);

    ref.listen(socialHomeFeedTabProvider, (_, __) {
      if (_pageController.hasClients) {
        _pageController.jumpToPage(0);
      }
    });

    if (items.isEmpty) {
      return const Center(child: CircularProgressIndicator(color: Colors.white));
    }

    return PageView.builder(
      controller: _pageController,
      scrollDirection: Axis.vertical,
      itemCount: items.length,
      onPageChanged: (index) {
        ref.read(socialHomeFeedIndexProvider.notifier).state = index;
      },
      itemBuilder: (context, index) {
        final item = items[index];
        return VideoFeedPage(
          item: item,
          isActive: index == currentIndex,
          onLike: () => ref.read(socialHomeFeedItemsProvider.notifier).toggleLike(index),
          onFollow: () => ref.read(socialHomeFeedItemsProvider.notifier).toggleFollow(index),
          onSave: () => ref.read(socialHomeFeedItemsProvider.notifier).toggleSave(index),
        );
      },
    );
  }
}
