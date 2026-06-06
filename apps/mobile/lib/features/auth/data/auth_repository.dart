import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/api/api_client.dart';
import '../../../core/realtime/socket_service.dart';
import '../../../core/storage/token_storage.dart';
import '../domain/models/auth_models.dart';

final authRepositoryProvider = Provider<AuthRepository>(
  (ref) => AuthRepository(ref),
);

class AuthRepository {
  AuthRepository(this._ref);

  final Ref _ref;

  Future<OtpSendResult> sendOtp(String phone) async {
    return guardApi(() async {
      final response = await _ref.read(dioProvider).post<Map<String, dynamic>>(
            '/v1/auth/otp/send',
            data: {'phone': phone},
          );
      return OtpSendResult.fromJson(response.data!);
    });
  }

  Future<AuthSession> verifyOtp({
    required String phone,
    required String code,
    required String requestId,
  }) async {
    return guardApi(() async {
      final response =
          await _ref.read(dioProvider).post<Map<String, dynamic>>(
                '/v1/auth/otp/verify',
                data: {
                  'phone': phone,
                  'code': code,
                  'requestId': requestId,
                },
              );
      final session = AuthSession.fromJson(response.data!);
      await _ref.read(tokenStorageProvider).saveTokens(
            accessToken: session.accessToken,
            refreshToken: session.refreshToken,
          );
      await _ref.read(socketServiceProvider).connectIfAuthenticated();
      return session;
    });
  }

  Future<void> logout() async {
    try {
      await _ref.read(dioProvider).post<void>('/v1/auth/logout');
    } catch (_) {
      // Best-effort server logout; always clear local session.
    } finally {
      _ref.read(socketServiceProvider).disconnect();
      await _ref.read(tokenStorageProvider).clearTokens();
    }
  }

  Future<bool> hasStoredSession() async {
    final token = await _ref.read(tokenStorageProvider).readAccessToken();
    return token != null && token.isNotEmpty;
  }
}
