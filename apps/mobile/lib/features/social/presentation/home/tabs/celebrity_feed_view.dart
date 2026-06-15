import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../providers/social_home_providers.dart';
import '../widgets/social_feed_scaffold.dart';

class CelebrityFeedView extends ConsumerWidget {
  const CelebrityFeedView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    ref.watch(socialHomeFeedTabProvider);
    return const SocialFeedScaffold();
  }
}
