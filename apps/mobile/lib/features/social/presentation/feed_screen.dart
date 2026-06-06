import 'package:design_system/design_system.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/errors/app_exception.dart';
import 'providers/feed_providers.dart';

class FeedScreen extends ConsumerWidget {
  const FeedScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final feedAsync = ref.watch(socialFeedProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Social Feed')),
      body: SafeArea(
        child: feedAsync.when(
          loading: () => const Center(child: CircularProgressIndicator()),
          error: (error, _) => _ErrorView(
            message: error is AppException ? error.message : 'Failed to load feed.',
            onRetry: () => ref.invalidate(socialFeedProvider),
          ),
          data: (feed) {
            if (feed.items.isEmpty) {
              return const Center(
                child: Text('No posts yet. Pull to refresh after seeding data.'),
              );
            }

            return RefreshIndicator(
              onRefresh: () async => ref.refresh(socialFeedProvider.future),
              child: ListView.separated(
                padding: const EdgeInsets.all(ShSpacing.lg),
                itemCount: feed.items.length,
                separatorBuilder: (_, __) => const SizedBox(height: ShSpacing.md),
                itemBuilder: (context, index) {
                  final post = feed.items[index];
                  return Card(
                    child: Padding(
                      padding: const EdgeInsets.all(ShSpacing.md),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            post.text,
                            style: Theme.of(context).textTheme.bodyLarge,
                          ),
                          const SizedBox(height: ShSpacing.sm),
                          Text(
                            'Likes ${post.likeCount}  Comments ${post.commentCount}',
                            style: Theme.of(context).textTheme.bodySmall,
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            );
          },
        ),
      ),
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
        padding: const EdgeInsets.all(ShSpacing.lg),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(message, textAlign: TextAlign.center),
            const SizedBox(height: ShSpacing.md),
            ShButton(label: 'Retry', onPressed: onRetry),
          ],
        ),
      ),
    );
  }
}
