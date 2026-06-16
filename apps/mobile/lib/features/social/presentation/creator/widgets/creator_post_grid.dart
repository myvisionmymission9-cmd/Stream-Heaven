/// 3-column post thumbnail grid for creator public profile.
library;

import 'package:flutter/material.dart';

import '../domain/creator_profile_models.dart';

class CreatorPostGrid extends StatelessWidget {
  const CreatorPostGrid({
    super.key,
    required this.posts,
    this.onPostTap,
  });

  final List<CreatorPostThumb> posts;
  final void Function(String postId)? onPostTap;

  @override
  Widget build(BuildContext context) {
    if (posts.isEmpty) {
      return SliverToBoxAdapter(
        child: SizedBox(
          height: 200,
          child: Center(
            child: Text(
              'No posts yet',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Colors.white54,
                  ),
            ),
          ),
        ),
      );
    }

    return SliverGrid(
      delegate: SliverChildBuilderDelegate(
        (context, index) {
          final post = posts[index];
          return _PostThumbCell(
            post: post,
            onTap: onPostTap != null ? () => onPostTap!(post.postId) : null,
          );
        },
        childCount: posts.length,
      ),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 3,
        mainAxisSpacing: 1.5,
        crossAxisSpacing: 1.5,
        childAspectRatio: 9 / 16,
      ),
    );
  }
}

class _PostThumbCell extends StatelessWidget {
  const _PostThumbCell({required this.post, this.onTap});

  final CreatorPostThumb post;
  final VoidCallback? onTap;

  String _formatCount(int n) {
    if (n >= 1000000) return '${(n / 1000000).toStringAsFixed(1)}M';
    if (n >= 1000) return '${(n / 1000).toStringAsFixed(0)}K';
    return '$n';
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        color: Colors.grey[900],
        child: Stack(
          fit: StackFit.expand,
          children: [
            if (post.thumbUrl.isNotEmpty)
              Image.network(
                post.thumbUrl,
                fit: BoxFit.cover,
                errorBuilder: (_, __, ___) => const _PlaceholderThumb(),
              )
            else
              const _PlaceholderThumb(),

            // Video indicator
            if (post.isVideo)
              Positioned(
                top: 6,
                right: 6,
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.play_arrow, color: Colors.white, size: 14),
                    if (post.durationSeconds != null)
                      Text(
                        _formatDuration(post.durationSeconds!),
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 10,
                          fontWeight: FontWeight.w600,
                          shadows: [Shadow(blurRadius: 2)],
                        ),
                      ),
                  ],
                ),
              ),

            // View count
            Positioned(
              bottom: 6,
              left: 6,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.play_circle_outline,
                      color: Colors.white70, size: 12),
                  const SizedBox(width: 2),
                  Text(
                    _formatCount(post.viewCount),
                    style: const TextStyle(
                      color: Colors.white70,
                      fontSize: 10,
                      shadows: [Shadow(blurRadius: 2)],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _formatDuration(double secs) {
    final m = secs ~/ 60;
    final s = (secs % 60).toInt();
    return m > 0 ? '${m}m${s}s' : '${s}s';
  }
}

class _PlaceholderThumb extends StatelessWidget {
  const _PlaceholderThumb();

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.grey[850],
      child: const Icon(Icons.image, color: Colors.white24, size: 32),
    );
  }
}
