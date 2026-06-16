import 'package:design_system/design_system.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../l10n/l10n_context.dart';
import '../../auth/presentation/providers/auth_providers.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    final authState = ref.watch(authStateProvider);
    final userLabel = authState.phoneNumber ?? authState.userId ?? '';

    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.homeWelcomeUser(userLabel)),
      ),
      body: IndexedStack(
        index: _selectedIndex,
        children: [
          _HomeTab(onOpenSocialFeed: () => context.pushNamed('socialFeed')),
          _PlaceholderTab(title: l10n.navReels, icon: Icons.movie_outlined),
          _PlaceholderTab(title: l10n.navLive, icon: Icons.videocam_outlined),
          _ProfileTab(
            onOpenProfile: () => context.pushNamed('profile'),
            onLogout: () async {
              await ref.read(authStateProvider.notifier).logout();
              if (context.mounted) {
                context.goNamed('login');
              }
            },
          ),
        ],
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (index) => setState(() => _selectedIndex = index),
        destinations: [
          NavigationDestination(
            icon: const Icon(Icons.home_outlined),
            selectedIcon: const Icon(Icons.home),
            label: l10n.navHome,
          ),
          NavigationDestination(
            icon: const Icon(Icons.movie_outlined),
            selectedIcon: const Icon(Icons.movie),
            label: l10n.navReels,
          ),
          NavigationDestination(
            icon: const Icon(Icons.videocam_outlined),
            selectedIcon: const Icon(Icons.videocam),
            label: l10n.navLive,
          ),
          NavigationDestination(
            icon: const Icon(Icons.person_outline),
            selectedIcon: const Icon(Icons.person),
            label: l10n.profileTitle,
          ),
        ],
      ),
    );
  }
}

class _HomeTab extends StatelessWidget {
  const _HomeTab({required this.onOpenSocialFeed});

  final VoidCallback onOpenSocialFeed;

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;

    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(ShSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              l10n.homeTitle,
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: ShSpacing.sm),
            Text(
              l10n.homeTabDescription,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const Spacer(),
            ShButton(
              label: l10n.openSocialFeed,
              onPressed: onOpenSocialFeed,
            ),
          ],
        ),
      ),
    );
  }
}

class _PlaceholderTab extends StatelessWidget {
  const _PlaceholderTab({
    required this.title,
    required this.icon,
  });

  final String title;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;

    return Center(
      child: Padding(
        padding: const EdgeInsets.all(ShSpacing.lg),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 48, color: Theme.of(context).colorScheme.primary),
            const SizedBox(height: ShSpacing.md),
            Text(title, style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: ShSpacing.xs),
            Text(
              l10n.feedFeatureComingSoon,
              style: Theme.of(context).textTheme.bodyMedium,
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}

class _ProfileTab extends StatelessWidget {
  const _ProfileTab({
    required this.onOpenProfile,
    required this.onLogout,
  });

  final VoidCallback onOpenProfile;
  final VoidCallback onLogout;

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;

    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(ShSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              l10n.profileTitle,
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: ShSpacing.lg),
            ShButton(
              label: l10n.editProfile,
              onPressed: onOpenProfile,
            ),
            const Spacer(),
            ShButton(
              label: l10n.logout,
              variant: ShButtonVariant.secondary,
              onPressed: onLogout,
            ),
          ],
        ),
      ),
    );
  }
}
