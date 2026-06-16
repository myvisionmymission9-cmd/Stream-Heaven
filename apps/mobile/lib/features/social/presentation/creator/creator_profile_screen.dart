/// Creator public profile screen.
/// Route: /creator/:handle
/// Shows avatar, bio, stats bar (posts/followers/following), follow button,
/// celebrity badge, and post thumbnail grid.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../l10n/l10n_context.dart';
import 'domain/creator_profile_models.dart';
import 'providers/creator_profile_providers.dart';
import 'widgets/creator_post_grid.dart';
import 'widgets/creator_stats_bar.dart';

class CreatorProfileScreen extends ConsumerWidget {
  const CreatorProfileScreen({super.key, required this.handle});

  final String handle;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profileAsync = ref.watch(creatorProfileProvider(handle));
    final l10n = context.l10n;

    return Scaffold(
      backgroundColor: Colors.black,
      body: profileAsync.when(
        loading: () => const Center(
          child: CircularProgressIndicator(color: Colors.redAccent),
        ),
        error: (error, _) => _ErrorView(
          message: l10n.errorGeneric,
          onRetry: () =>
              ref.read(creatorProfileProvider(handle).notifier).refresh(),
        ),
        data: (state) => _ProfileBody(handle: handle, state: state),
      ),
    );
  }
}

class _ProfileBody extends ConsumerWidget {
  const _ProfileBody({required this.handle, required this.state});

  final String handle;
  final CreatorProfileState state;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = state.profile;
    final l10n = context.l10n;

    return CustomScrollView(
      slivers: [
        SliverAppBar(
          backgroundColor: Colors.black,
          foregroundColor: Colors.white,
          floating: true,
          title: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                '@${profile.handle}',
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
              if (profile.isCelebrity) ...[
                const SizedBox(width: 4),
                const _CelebrityBadge(),
              ],
            ],
          ),
          actions: [
            IconButton(
              icon: const Icon(Icons.more_vert, color: Colors.white),
              onPressed: () => _showOptionsSheet(context, profile),
            ),
          ],
        ),

        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Avatar + follow button row
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _Avatar(profile: profile),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          const SizedBox(height: 8),
                          CreatorStatsBar(
                            postCount: profile.postCount,
                            followerCount: profile.followerCount,
                            followingCount: profile.followingCount,
                            postsLabel: l10n.creatorPosts,
                            followersLabel: l10n.creatorFollowers,
                            followingLabel: l10n.creatorFollowing,
                          ),
                          const SizedBox(height: 12),
                          _FollowButton(handle: handle, state: state),
                        ],
                      ),
                    ),
                  ],
                ),

                const SizedBox(height: 12),

                // Display name
                Text(
                  profile.displayName,
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                  ),
                ),

                // Bio
                if (profile.bio != null && profile.bio!.isNotEmpty) ...[
                  const SizedBox(height: 4),
                  Text(
                    profile.bio!,
                    style: const TextStyle(
                      color: Colors.white70,
                      fontSize: 13,
                      height: 1.4,
                    ),
                    maxLines: 3,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],

                const SizedBox(height: 16),

                // Grid/Reels tab bar (stub — single grid tab for now)
                const Divider(color: Colors.white12, height: 1),
                const SizedBox(height: 8),
                const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    Icon(Icons.grid_on, color: Colors.white, size: 22),
                    Icon(Icons.play_circle_outline,
                        color: Colors.white38, size: 22),
                  ],
                ),
                const SizedBox(height: 8),
              ],
            ),
          ),
        ),

        // Post grid
        CreatorPostGrid(
          posts: state.posts,
          onPostTap: (postId) {
            // TODO(phase-12): navigate to post detail
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text(l10n.feedFeatureComingSoon),
                duration: const Duration(seconds: 1),
              ),
            );
          },
        ),

        const SliverToBoxAdapter(child: SizedBox(height: 80)),
      ],
    );
  }

  void _showOptionsSheet(BuildContext context, CreatorProfile profile) {
    showModalBottomSheet<void>(
      context: context,
      backgroundColor: const Color(0xFF1C1C1E),
      builder: (_) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.share, color: Colors.white),
              title: const Text('Share profile',
                  style: TextStyle(color: Colors.white)),
              onTap: () => Navigator.pop(context),
            ),
            ListTile(
              leading: const Icon(Icons.block, color: Colors.white54),
              title: const Text('Block', style: TextStyle(color: Colors.white54)),
              onTap: () => Navigator.pop(context),
            ),
          ],
        ),
      ),
    );
  }
}

class _Avatar extends StatelessWidget {
  const _Avatar({required this.profile});

  final CreatorProfile profile;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        CircleAvatar(
          radius: 44,
          backgroundColor: Colors.grey[800],
          backgroundImage: profile.avatarUrl != null
              ? NetworkImage(profile.avatarUrl!)
              : null,
          child: profile.avatarUrl == null
              ? Text(
                  profile.displayName.isNotEmpty
                      ? profile.displayName[0].toUpperCase()
                      : '?',
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                  ),
                )
              : null,
        ),
        if (profile.isCelebrity)
          const Positioned(
            bottom: 0,
            right: 0,
            child: _CelebrityAvatarBadge(),
          ),
      ],
    );
  }
}

class _FollowButton extends ConsumerWidget {
  const _FollowButton({required this.handle, required this.state});

  final String handle;
  final CreatorProfileState state;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final profile = state.profile;
    final isFollowing = profile.isFollowedByMe;
    final isLoading = state.isFollowLoading;

    return SizedBox(
      height: 34,
      child: ElevatedButton(
        onPressed: isLoading
            ? null
            : () => ref
                .read(creatorProfileProvider(handle).notifier)
                .toggleFollow(),
        style: ElevatedButton.styleFrom(
          backgroundColor: isFollowing ? const Color(0xFF2C2C2E) : Colors.redAccent,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 8),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
            side: isFollowing
                ? const BorderSide(color: Colors.white24)
                : BorderSide.none,
          ),
          elevation: 0,
        ),
        child: isLoading
            ? const SizedBox(
                width: 16,
                height: 16,
                child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
              )
            : Text(
                isFollowing ? l10n.feedFollowing : l10n.feedFollow,
                style: const TextStyle(
                    fontSize: 13, fontWeight: FontWeight.w600),
              ),
      ),
    );
  }
}

class _CelebrityBadge extends StatelessWidget {
  const _CelebrityBadge();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 2),
      decoration: BoxDecoration(
        color: Colors.redAccent,
        borderRadius: BorderRadius.circular(4),
      ),
      child: const Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.star, color: Colors.white, size: 10),
          SizedBox(width: 2),
          Text(
            'Celebrity',
            style: TextStyle(
              color: Colors.white,
              fontSize: 10,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}

class _CelebrityAvatarBadge extends StatelessWidget {
  const _CelebrityAvatarBadge();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 22,
      height: 22,
      decoration: const BoxDecoration(
        color: Colors.redAccent,
        shape: BoxShape.circle,
      ),
      child: const Icon(Icons.star, color: Colors.white, size: 14),
    );
  }
}

class _ErrorView extends StatelessWidget {
  const _ErrorView({required this.message, required this.onRetry});

  final String message;
  final VoidCallback onRetry;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.error_outline, color: Colors.white54, size: 48),
            const SizedBox(height: 16),
            Text(
              message,
              style: const TextStyle(color: Colors.white70),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: onRetry,
              child: const Text('Retry'),
            ),
          ],
        ),
      ),
    );
  }
}
