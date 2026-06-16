import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/api/api_client.dart';
import '../../../core/errors/app_exception.dart';
import '../../../core/realtime/socket_service.dart';
import '../../../core/storage/token_storage.dart';
import '../domain/models/auth_models.dart';
import 'auth_service.dart';

final authRepositoryProvider = Provider<AuthRepository>(
  (ref) => AuthRepository(ref),
);

class AuthRepository {
  AuthRepository(this._ref);

  final Ref _ref;

  AuthService get _authService => _ref.read(authServiceProvider);

  Future<OtpSendResult> sendOtp(
    String phone, {
    int? forceResendingToken,
  }) async {
    final session = await _authService.sendOtp(
      phoneNumber: phone,
      forceResendingToken: forceResendingToken,
    );
    if (session.autoSignedIn) {
      final authSession = await _exchangeFirebaseSession();
      return OtpSendResult(
        verificationId: session.verificationId,
        maskedPhone: session.maskedPhone,
        expiresInSeconds: session.expiresInSeconds,
        resendToken: session.resendToken,
        autoSignedIn: true,
        userId: authSession.userId,
      );
    }

    return OtpSendResult(
      verificationId: session.verificationId,
      maskedPhone: session.maskedPhone,
      expiresInSeconds: session.expiresInSeconds,
      resendToken: session.resendToken,
    );
  }

  Future<AuthSession> verifyOtp({
    required String verificationId,
    required String code,
  }) async {
    await _authService.verifyOtp(
      verificationId: verificationId,
      smsCode: code,
    );
    return _exchangeFirebaseSession();
  }

  Future<AuthSession> restoreFirebaseSession() async {
    final idToken = await _authService.getIdToken(forceRefresh: true);
    if (idToken == null || idToken.isEmpty) {
      throw const AuthException('No Firebase session found.');
    }
    return _exchangeFirebaseToken(idToken);
  }

  Future<AuthSession> _exchangeFirebaseSession() async {
    final idToken = await _authService.getIdToken(forceRefresh: true);
    if (idToken == null || idToken.isEmpty) {
      throw const AuthException('Failed to obtain Firebase ID token.');
    }
    return _exchangeFirebaseToken(idToken);
  }

  Future<AuthSession> _exchangeFirebaseToken(String idToken) async {
    return guardApi(() async {
      final response =
          await _ref.read(dioProvider).post<Map<String, dynamic>>(
                '/v1/auth/firebase/exchange',
                data: {'firebaseIdToken': idToken},
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
      await _authService.signOut();
    }
  }

  Future<bool> hasStoredSession() async {
    final firebaseUser = _authService.currentUser;
    final token = await _ref.read(tokenStorageProvider).readAccessToken();
    return firebaseUser != null && token != null && token.isNotEmpty;
  }

  String? get currentPhoneNumber => _authService.currentUser?.phoneNumber;
}
