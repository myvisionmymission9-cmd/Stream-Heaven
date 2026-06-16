/// Stats bar widget for creator public profile: posts, followers, following counts.
library;

import 'package:flutter/material.dart';

class CreatorStatsBar extends StatelessWidget {
  const CreatorStatsBar({
    super.key,
    required this.postCount,
    required this.followerCount,
    required this.followingCount,
    required this.postsLabel,
    required this.followersLabel,
    required this.followingLabel,
  });

  final int postCount;
  final int followerCount;
  final int followingCount;
  final String postsLabel;
  final String followersLabel;
  final String followingLabel;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        _StatItem(count: postCount, label: postsLabel),
        _StatItem(count: followerCount, label: followersLabel),
        _StatItem(count: followingCount, label: followingLabel),
      ],
    );
  }
}

class _StatItem extends StatelessWidget {
  const _StatItem({required this.count, required this.label});

  final int count;
  final String label;

  String _format(int n) {
    if (n >= 1000000) return '${(n / 1000000).toStringAsFixed(1)}M';
    if (n >= 1000) return '${(n / 1000).toStringAsFixed(1)}K';
    return '$n';
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          _format(count),
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
        ),
        const SizedBox(height: 2),
        Text(
          label,
          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: Colors.white70,
              ),
        ),
      ],
    );
  }
}
