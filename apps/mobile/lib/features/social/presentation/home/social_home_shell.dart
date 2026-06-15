import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../../l10n/l10n_context.dart';
import 'home_feed_tab_bar.dart';
import 'providers/social_home_providers.dart';
import 'tabs/celebrity_feed_view.dart';
import 'tabs/following_feed_view.dart';
import 'tabs/trending_feed_view.dart';
import 'tabs/videos_feed_view.dart';

class SocialHomeShell extends ConsumerWidget {
  const SocialHomeShell({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final feedTab = ref.watch(socialHomeFeedTabProvider);
    final shellTab = ref.watch(socialShellTabProvider);

    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        fit: StackFit.expand,
        children: [
          _FeedBody(tab: feedTab),
          const Positioned(top: 0, left: 0, right: 0, child: HomeFeedTabBar()),
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: _SocialBottomNav(active: shellTab),
          ),
        ],
      ),
    );
  }
}

class _FeedBody extends StatelessWidget {
  const _FeedBody({required this.tab});

  final SocialHomeFeedTab tab;

  @override
  Widget build(BuildContext context) {
    return switch (tab) {
      SocialHomeFeedTab.trending => const TrendingFeedView(),
      SocialHomeFeedTab.videos => const VideosFeedView(),
      SocialHomeFeedTab.following => const FollowingFeedView(),
      SocialHomeFeedTab.celebrity => const CelebrityFeedView(),
    };
  }
}

class _SocialBottomNav extends ConsumerWidget {
  const _SocialBottomNav({required this.active});

  final SocialShellTab active;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;

    final items = <({SocialShellTab tab, String label, IconData icon, String? route})>[
      (tab: SocialShellTab.home, label: l10n.navHome, icon: Icons.home_filled, route: null),
      (tab: SocialShellTab.live, label: l10n.navLive, icon: Icons.videocam, route: 'liveRooms'),
      (tab: SocialShellTab.audio, label: l10n.navAudio, icon: Icons.headphones, route: null),
      (tab: SocialShellTab.astro, label: l10n.navAstro, icon: Icons.auto_awesome, route: null),
      (tab: SocialShellTab.tv, label: l10n.navTv, icon: Icons.live_tv, route: null),
    ];

    return Container(
      decoration: BoxDecoration(
        color: Colors.black.withValues(alpha: 0.92),
        border: Border(top: BorderSide(color: Colors.white.withValues(alpha: 0.08))),
      ),
      child: SafeArea(
        top: false,
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              for (final item in items)
                _NavItem(
                  label: item.label,
                  icon: item.icon,
                  isActive: item.tab == active,
                  activeColor: item.tab == SocialShellTab.home ? Colors.redAccent : Colors.white,
                  onTap: () {
                    ref.read(socialShellTabProvider.notifier).state = item.tab;
                    if (item.route != null) {
                      context.pushNamed(item.route!);
                      return;
                    }
                    if (item.tab != SocialShellTab.home) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text(l10n.feedFeatureComingSoon)),
                      );
                    }
                  },
                ),
            ],
          ),
        ),
      ),
    );
  }
}

class _NavItem extends StatelessWidget {
  const _NavItem({
    required this.label,
    required this.icon,
    required this.isActive,
    required this.onTap,
    required this.activeColor,
  });

  final String label;
  final IconData icon;
  final bool isActive;
  final VoidCallback onTap;
  final Color activeColor;

  @override
  Widget build(BuildContext context) {
    final color = isActive ? activeColor : Colors.white54;
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, color: color, size: 24),
            const SizedBox(height: 2),
            Text(label, style: TextStyle(color: color, fontSize: 11, fontWeight: isActive ? FontWeight.w600 : FontWeight.w400)),
          ],
        ),
      ),
    );
  }
}
