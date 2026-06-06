import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../auth/domain/models/auth_models.dart';
import '../../data/profile_repository.dart';

final profileProvider = FutureProvider.autoDispose<UserProfile>((ref) async {
  return ref.watch(profileRepositoryProvider).getMyProfile();
});

final profileControllerProvider =
    StateNotifierProvider.autoDispose<ProfileController, AsyncValue<UserProfile>>(
  (ref) => ProfileController(ref),
);

class ProfileController extends StateNotifier<AsyncValue<UserProfile>> {
  ProfileController(this._ref) : super(const AsyncValue.loading()) {
    _load();
  }

  final Ref _ref;

  Future<void> _load() async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(
      () => _ref.read(profileRepositoryProvider).getMyProfile(),
    );
  }

  Future<void> refresh() => _load();

  Future<void> updateDisplayName(String displayName) async {
    final current = state.valueOrNull;
    if (current == null) return;

    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      return _ref
          .read(profileRepositoryProvider)
          .updateDisplayName(displayName);
    });
  }
}
