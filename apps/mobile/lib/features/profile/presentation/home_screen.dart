import 'package:design_system/design_system.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../l10n/l10n_context.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;

    return Scaffold(
      appBar: AppBar(title: Text(l10n.homeTitle)),
      body: SafeArea(
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
                'Phase 2a shell — feed, reels, and chat coming in later phases.',
                style: Theme.of(context).textTheme.bodyMedium,
              ),
              const Spacer(),
              ShButton(
                label: 'Open Feed',
                onPressed: () => context.pushNamed('feed'),
              ),
              const SizedBox(height: ShSpacing.sm),
              ShButton(
                label: 'Open Live Rooms',
                onPressed: () => context.pushNamed('liveRooms'),
              ),
              const SizedBox(height: ShSpacing.sm),
              ShButton(
                label: l10n.profileTitle,
                onPressed: () => context.pushNamed('profile'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
