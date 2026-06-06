import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/api/api_client.dart';
import '../domain/livestream_models.dart';

final livestreamRepositoryProvider = Provider<LivestreamRepository>(
  (ref) => LivestreamRepository(ref),
);

class LivestreamRepository {
  LivestreamRepository(this._ref);

  final Ref _ref;

  Future<List<LiveRoomSummary>> getRooms({int limit = 20}) async {
    return guardApi(() async {
      final response = await _ref.read(dioProvider).get<Map<String, dynamic>>(
            '/v1/livestream/rooms',
            queryParameters: {'limit': limit},
          );
      final items = response.data?['items'] as List<dynamic>? ?? const <dynamic>[];
      return items
          .map((item) => LiveRoomSummary.fromJson(item as Map<String, dynamic>))
          .toList();
    });
  }
}
