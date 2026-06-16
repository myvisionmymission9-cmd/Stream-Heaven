import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/config/env_config.dart';
import '../../../../core/realtime/socket_service.dart';
import '../../../profile/data/profile_repository.dart';
import '../../data/auth_repository.dart';
import '../../domain/auth_state.dart';
import '../../domain/models/auth_models.dart';

export '../../domain/auth_state.dart';

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
      await _ref.read(authRepositoryProvider).restoreFirebaseSession();
      final profile =
          await _ref.read(profileRepositoryProvider).getMyProfile();
      await _ref.read(socketServiceProvider).connectIfAuthenticated();
      state = AuthState.authenticated(
        userId: profile.userId,
        phoneNumber: _ref.read(authRepositoryProvider).currentPhoneNumber,
      );
    } catch (_) {
      await _ref.read(authRepositoryProvider).logout();
      state = const AuthState.unauthenticated();
    }
  }

  Future<OtpSendResult> sendOtp(
    String phone, {
    int? forceResendingToken,
  }) async {
    final result = await _ref.read(authRepositoryProvider).sendOtp(
          phone,
          forceResendingToken: forceResendingToken,
        );
    if (result.autoSignedIn && result.userId != null) {
      state = AuthState.authenticated(
        userId: result.userId!,
        phoneNumber: _ref.read(authRepositoryProvider).currentPhoneNumber,
      );
    }
    return result;
  }

  Future<void> verifyOtp({
    required String verificationId,
    required String code,
  }) async {
    final session = await _ref.read(authRepositoryProvider).verifyOtp(
          verificationId: verificationId,
          code: code,
        );
    state = AuthState.authenticated(
      userId: session.userId,
      phoneNumber: _ref.read(authRepositoryProvider).currentPhoneNumber,
    );
  }

  Future<void> logout() async {
    await _ref.read(authRepositoryProvider).logout();
    state = const AuthState.unauthenticated();
  }

  void markUnauthenticated() {
    state = const AuthState.unauthenticated();
  }
}
