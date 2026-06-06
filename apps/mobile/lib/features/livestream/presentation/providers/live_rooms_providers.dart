import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/livestream_repository.dart';
import '../../domain/livestream_models.dart';

final liveRoomsProvider = FutureProvider.autoDispose<List<LiveRoomSummary>>((ref) async {
  return ref.watch(livestreamRepositoryProvider).getRooms(limit: 20);
});
