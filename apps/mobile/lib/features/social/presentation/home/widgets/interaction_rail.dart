import 'package:flutter/material.dart';

import '../../../../../l10n/l10n_context.dart';
import '../domain/home_feed_models.dart';

class InteractionRail extends StatefulWidget {
  const InteractionRail({
    super.key,
    required this.item,
    required this.onLike,
    required this.onFollow,
    this.onSave,
  });

  final HomeFeedItem item;
  final VoidCallback onLike;
  final VoidCallback onFollow;
  final VoidCallback? onSave;

  @override
  State<InteractionRail> createState() => _InteractionRailState();
}

class _InteractionRailState extends State<InteractionRail>
    with SingleTickerProviderStateMixin {
  late final AnimationController _discController;

  @override
  void initState() {
    super.initState();
    _discController = AnimationController(vsync: this, duration: const Duration(seconds: 4))
      ..repeat();
  }

  @override
  void dispose() {
    _discController.dispose();
    super.dispose();
  }

  String _formatCount(int n) {
    if (n >= 1000000) return '${(n / 1000000).toStringAsFixed(1)}M';
    if (n >= 1000) return '${(n / 1000).toStringAsFixed(1)}K';
    return '$n';
  }

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    final item = widget.item;

    return Positioned(
      right: 12,
      bottom: 96,
      child: Column(
        children: [
          GestureDetector(
            onTap: widget.onFollow,
            child: Stack(
              clipBehavior: Clip.none,
              children: [
                CircleAvatar(
                  radius: 24,
                  backgroundColor: Colors.grey.shade800,
                  child: Text(
                    item.author.displayName.isNotEmpty
                        ? item.author.displayName[0].toUpperCase()
                        : '?',
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                  ),
                ),
                if (!item.author.isFollowing)
                  Positioned(
                    bottom: -6,
                    left: 0,
                    right: 0,
                    child: Center(
                      child: Container(
                        width: 20,
                        height: 20,
                        decoration: const BoxDecoration(
                          color: Colors.pinkAccent,
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(Icons.add, color: Colors.white, size: 14),
                      ),
                    ),
                  ),
              ],
            ),
          ),
          const SizedBox(height: 20),
          _RailAction(
            icon: Icons.card_giftcard,
            label: _formatCount(item.giftCount),
            onTap: () => ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text(l10n.feedGiftComingSoon)),
            ),
          ),
          const SizedBox(height: 16),
          _RailAction(
            icon: item.isLiked ? Icons.favorite : Icons.favorite_border,
            iconColor: item.isLiked ? Colors.pinkAccent : Colors.white,
            label: _formatCount(item.likeCount),
            onTap: widget.onLike,
          ),
          const SizedBox(height: 16),
          _RailAction(
            icon: Icons.chat_bubble_outline,
            label: _formatCount(item.commentCount),
            onTap: () => ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text(l10n.feedCommentsComingSoon)),
            ),
          ),
          const SizedBox(height: 16),
          _RailAction(
            icon: Icons.share,
            label: _formatCount(item.shareCount),
            onTap: () => ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text(l10n.feedShareComingSoon)),
            ),
          ),
          const SizedBox(height: 16),
          _RailAction(
            icon: item.isSaved ? Icons.bookmark : Icons.bookmark_border,
            iconColor: item.isSaved ? Colors.amberAccent : Colors.white,
            label: _formatCount(item.saveCount),
            onTap: widget.onSave ??
                () => ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text(l10n.feedSaveComingSoon)),
                    ),
          ),
          const SizedBox(height: 16),
          RotationTransition(
            turns: _discController,
            child: Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: Colors.white24, width: 6),
                gradient: const LinearGradient(
                  colors: [Colors.grey, Colors.black87],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _RailAction extends StatelessWidget {
  const _RailAction({
    required this.icon,
    required this.label,
    required this.onTap,
    this.iconColor = Colors.white,
  });

  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final Color iconColor;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        children: [
          Icon(icon, color: iconColor, size: 32),
          const SizedBox(height: 4),
          Text(
            label,
            style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w500),
          ),
        ],
      ),
    );
  }
}
