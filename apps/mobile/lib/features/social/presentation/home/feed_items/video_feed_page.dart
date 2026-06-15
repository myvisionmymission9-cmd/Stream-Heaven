import 'package:flutter/material.dart';

import '../domain/home_feed_models.dart';
import '../widgets/creator_metadata_overlay.dart';
import '../widgets/interaction_rail.dart';

class VideoFeedPage extends StatelessWidget {
  const VideoFeedPage({
    super.key,
    required this.item,
    required this.isActive,
    required this.onLike,
    required this.onFollow,
    this.onSave,
  });

  final HomeFeedItem item;
  final bool isActive;
  final VoidCallback onLike;
  final VoidCallback onFollow;
  final VoidCallback? onSave;

  @override
  Widget build(BuildContext context) {
    return Stack(
      fit: StackFit.expand,
      children: [
        _FeedBackground(item: item, isActive: isActive),
        CreatorMetadataOverlay(item: item, onFollow: onFollow),
        InteractionRail(item: item, onLike: onLike, onFollow: onFollow, onSave: onSave),
        // LIVE badge
        if (item.itemType == HomeFeedItemType.liveStream)
          Positioned(
            top: 120,
            left: 16,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: Colors.red,
                borderRadius: BorderRadius.circular(4),
              ),
              child: const Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.circle, color: Colors.white, size: 8),
                  SizedBox(width: 4),
                  Text(
                    'LIVE',
                    style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
          ),
        // Trending rank score badge
        if (item.rankScore != null)
          Positioned(
            top: 120,
            right: 68,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: Colors.deepOrange.withValues(alpha: 0.85),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Text('🔥', style: TextStyle(fontSize: 11)),
                  const SizedBox(width: 3),
                  Text(
                    item.rankScore!.toStringAsFixed(1),
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ),
        // Regional discovery badge
        if (item.regionLabel != null)
          Positioned(
            bottom: 200,
            left: 12,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(
                color: Colors.teal.withValues(alpha: 0.80),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.location_on, color: Colors.white, size: 12),
                  const SizedBox(width: 3),
                  Text(
                    item.regionLabel!,
                    style: const TextStyle(color: Colors.white, fontSize: 11),
                  ),
                ],
              ),
            ),
          ),
      ],
    );
  }
}

class _FeedBackground extends StatelessWidget {
  const _FeedBackground({required this.item, required this.isActive});

  final HomeFeedItem item;
  final bool isActive;

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: _gradientForType(item.itemType),
        ),
      ),
      child: Center(
        child: Icon(
          _iconForType(item.itemType),
          size: 80,
          color: Colors.white.withValues(alpha: isActive ? 0.35 : 0.2),
        ),
      ),
    );
  }

  List<Color> _gradientForType(HomeFeedItemType type) {
    switch (type) {
      case HomeFeedItemType.shortVideo:
        return [const Color(0xFF1a1a2e), const Color(0xFF16213e)];
      case HomeFeedItemType.cryptoPost:
        return [const Color(0xFF0f2027), const Color(0xFF203a43)];
      case HomeFeedItemType.liveStream:
        return [const Color(0xFF2c003e), const Color(0xFF512b58)];
      case HomeFeedItemType.audioPost:
        return [const Color(0xFF141E30), const Color(0xFF243B55)];
      case HomeFeedItemType.audioRoom:
        return [const Color(0xFF232526), const Color(0xFF414345)];
      case HomeFeedItemType.communityPost:
        return [const Color(0xFF373B44), const Color(0xFF4286f4)];
      case HomeFeedItemType.imagePost:
        return [const Color(0xFF000428), const Color(0xFF004e92)];
    }
  }

  IconData _iconForType(HomeFeedItemType type) {
    switch (type) {
      case HomeFeedItemType.shortVideo:
        return Icons.play_circle_fill;
      case HomeFeedItemType.imagePost:
        return Icons.image;
      case HomeFeedItemType.audioPost:
        return Icons.audiotrack;
      case HomeFeedItemType.liveStream:
        return Icons.live_tv;
      case HomeFeedItemType.audioRoom:
        return Icons.mic;
      case HomeFeedItemType.communityPost:
        return Icons.groups;
      case HomeFeedItemType.cryptoPost:
        return Icons.currency_bitcoin;
    }
  }
}
