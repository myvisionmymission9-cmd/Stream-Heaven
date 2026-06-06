import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/api/api_client.dart';
import '../../auth/domain/models/auth_models.dart';
import '../domain/social_models.dart';

final socialRepositoryProvider = Provider<SocialRepository>(
  (ref) => SocialRepository(ref),
);

class SocialRepository {
  SocialRepository(this._ref);

  final Ref _ref;

  Future<FeedPage> getFeed({String? cursor, int limit = 20}) async {
    return guardApi(() async {
      final response = await _ref.read(dioProvider).get<Map<String, dynamic>>(
            '/v1/social/feed',
            queryParameters: {
              'limit': limit,
              if (cursor != null && cursor.isNotEmpty) 'cursor': cursor,
            },
          );
      return FeedPage.fromJson(response.data!);
    });
  }
}
