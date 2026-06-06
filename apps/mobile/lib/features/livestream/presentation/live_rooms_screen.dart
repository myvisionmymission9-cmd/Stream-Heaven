import 'package:design_system/design_system.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/errors/app_exception.dart';
import 'providers/live_rooms_providers.dart';

class LiveRoomsScreen extends ConsumerWidget {
  const LiveRoomsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final roomsAsync = ref.watch(liveRoomsProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Live Rooms')),
      body: SafeArea(
        child: roomsAsync.when(
          loading: () => const Center(child: CircularProgressIndicator()),
          error: (error, _) => _ErrorView(
            message: error is AppException ? error.message : 'Failed to load live rooms.',
            onRetry: () => ref.invalidate(liveRoomsProvider),
          ),
          data: (rooms) {
            if (rooms.isEmpty) {
              return const Center(
                child: Text('No active rooms. Start one from livestream-service.'),
              );
            }

            return RefreshIndicator(
              onRefresh: () async => ref.refresh(liveRoomsProvider.future),
              child: ListView.separated(
                padding: const EdgeInsets.all(ShSpacing.lg),
                itemCount: rooms.length,
                separatorBuilder: (_, __) => const SizedBox(height: ShSpacing.md),
                itemBuilder: (context, index) {
                  final room = rooms[index];
                  return ListTile(
                    tileColor: Theme.of(context).colorScheme.surface,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    title: Text(room.title),
                    subtitle: Text('Status ${room.status} • ${room.viewerCount} viewers'),
                    trailing: const Icon(Icons.play_circle_outline),
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
