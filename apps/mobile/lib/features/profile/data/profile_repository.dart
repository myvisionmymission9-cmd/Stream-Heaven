import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/api/api_client.dart';
import '../../auth/domain/models/auth_models.dart';

final profileRepositoryProvider = Provider<ProfileRepository>(
  (ref) => ProfileRepository(ref),
);

class ProfileRepository {
  ProfileRepository(this._ref);

  final Ref _ref;

  Future<UserProfile> getMyProfile() async {
    return guardApi(() async {
      final response =
          await _ref.read(dioProvider).get<Map<String, dynamic>>('/v1/users/me');
      return UserProfile.fromJson(response.data!);
    });
  }

  Future<UserProfile> updateDisplayName(String displayName) async {
    return guardApi(() async {
      final response = await _ref
          .read(dioProvider)
          .patch<Map<String, dynamic>>(
            '/v1/users/me',
            data: {'displayName': displayName},
          );
      return UserProfile.fromJson(response.data!);
    });
  }
}
