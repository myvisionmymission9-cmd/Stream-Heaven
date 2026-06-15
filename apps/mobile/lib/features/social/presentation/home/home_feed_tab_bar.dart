import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../l10n/l10n_context.dart';
import 'providers/social_home_providers.dart';

class HomeFeedTabBar extends ConsumerWidget {
  const HomeFeedTabBar({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final activeTab = ref.watch(socialHomeFeedTabProvider);

    final tabs = <({SocialHomeFeedTab tab, String label, IconData icon})>[
      (tab: SocialHomeFeedTab.trending, label: l10n.feedTabTrending, icon: Icons.local_fire_department),
      (tab: SocialHomeFeedTab.videos, label: l10n.feedTabVideos, icon: Icons.movie_creation_outlined),
      (tab: SocialHomeFeedTab.following, label: l10n.feedTabFollowing, icon: Icons.people_outline),
      (tab: SocialHomeFeedTab.celebrity, label: l10n.feedTabCelebrity, icon: Icons.star_outline),
    ];

    return SafeArea(
      bottom: false,
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
        child: Row(
          children: [
            for (var i = 0; i < tabs.length; i++) ...[
              _TabChip(
                label: tabs[i].label,
                icon: tabs[i].icon,
                isActive: tabs[i].tab == activeTab,
                onTap: () {
                  ref.read(socialHomeFeedTabProvider.notifier).state = tabs[i].tab;
                  ref.read(socialHomeFeedIndexProvider.notifier).state = 0;
                },
              ),
              if (i < tabs.length - 1) const SizedBox(width: 4),
            ],
            const SizedBox(width: 12),
            _TabChip(
              label: l10n.feedTabCreatePost,
              icon: Icons.add_circle_outline,
              isActive: false,
              isCreatePost: true,
              onTap: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text(l10n.feedCreatePostComingSoon)),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

class _TabChip extends StatelessWidget {
  const _TabChip({
    required this.label,
    required this.icon,
    required this.isActive,
    required this.onTap,
    this.isCreatePost = false,
  });

  final String label;
  final IconData icon;
  final bool isActive;
  final VoidCallback onTap;
  final bool isCreatePost;

  @override
  Widget build(BuildContext context) {
    final color = isActive ? Colors.white : Colors.white70;
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: isCreatePost ? 10 : 8, vertical: 6),
        decoration: isActive
            ? BoxDecoration(
                color: Colors.white.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(20),
              )
            : null,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 16, color: color),
            const SizedBox(width: 4),
            Text(
              label,
              style: TextStyle(
                color: color,
                fontWeight: isActive ? FontWeight.w600 : FontWeight.w400,
                fontSize: 13,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
