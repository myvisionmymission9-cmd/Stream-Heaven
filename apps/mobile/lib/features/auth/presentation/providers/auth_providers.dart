import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/config/env_config.dart';
import '../../../../core/realtime/socket_service.dart';
import '../../../profile/data/profile_repository.dart';
import '../../data/auth_repository.dart';
import '../../domain/models/auth_models.dart';

enum AuthStatus {
  unknown,
  unauthenticated,
  authenticated,
}

class AuthState {
  const AuthState({
    required this.status,
    this.userId,
  });

  const AuthState.unknown() : this(status: AuthStatus.unknown);

  const AuthState.unauthenticated()
      : this(status: AuthStatus.unauthenticated);

  const AuthState.authenticated({required String userId})
      : this(status: AuthStatus.authenticated, userId: userId);

  final AuthStatus status;
  final String? userId;

  bool get isAuthenticated => status == AuthStatus.authenticated;
}

final authStateProvider =
    StateNotifierProvider<AuthStateNotifier, AuthState>(
  (ref) => AuthStateNotifier(ref),
);

class AuthStateNotifier extends StateNotifier<AuthState> {
  AuthStateNotifier(this._ref) : super(const AuthState.unknown());

  final Ref _ref;

  Future<void> restoreSession() async {
    if (EnvConfig.devSkipAuth) {
      state = const AuthState.authenticated(userId: 'dev-skip-auth');
      return;
    }

    final hasSession =
        await _ref.read(authRepositoryProvider).hasStoredSession();
    if (!hasSession) {
      state = const AuthState.unauthenticated();
      return;
    }

    try {
      final profile =
          await _ref.read(profileRepositoryProvider).getMyProfile();
      await _ref.read(socketServiceProvider).connectIfAuthenticated();
      state = AuthState.authenticated(userId: profile.userId);
    } catch (_) {
      await _ref.read(authRepositoryProvider).logout();
      state = const AuthState.unauthenticated();
    }
  }

  Future<OtpSendResult> sendOtp(String phone) {
    return _ref.read(authRepositoryProvider).sendOtp(phone);
  }

  Future<void> verifyOtp({
    required String phone,
    required String code,
    required String requestId,
  }) async {
    final session = await _ref.read(authRepositoryProvider).verifyOtp(
          phone: phone,
          code: code,
          requestId: requestId,
        );
    state = AuthState.authenticated(userId: session.userId);
  }

  Future<void> logout() async {
    await _ref.read(authRepositoryProvider).logout();
    state = const AuthState.unauthenticated();
  }

  void markUnauthenticated() {
    state = const AuthState.unauthenticated();
  }
}
