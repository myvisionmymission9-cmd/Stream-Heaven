enum AuthStatus {
  unknown,
  unauthenticated,
  authenticated,
}

class AuthState {
  const AuthState({
    required this.status,
    this.userId,
    this.phoneNumber,
  });

  const AuthState.unknown() : this(status: AuthStatus.unknown);

  const AuthState.unauthenticated() : this(status: AuthStatus.unauthenticated);

  const AuthState.authenticated({
    required String userId,
    String? phoneNumber,
  }) : this(
          status: AuthStatus.authenticated,
          userId: userId,
          phoneNumber: phoneNumber,
        );

  final AuthStatus status;
  final String? userId;
  final String? phoneNumber;

  bool get isAuthenticated => status == AuthStatus.authenticated;
}
