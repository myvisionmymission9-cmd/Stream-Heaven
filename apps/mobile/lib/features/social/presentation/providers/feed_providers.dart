import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/social_repository.dart';
import '../../domain/social_models.dart';

final socialFeedProvider = FutureProvider.autoDispose<FeedPage>((ref) async {
  return ref.watch(socialRepositoryProvider).getFeed(limit: 20);
});
