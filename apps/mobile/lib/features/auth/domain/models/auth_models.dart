class OtpSendResult {
  const OtpSendResult({
    required this.verificationId,
    required this.expiresInSeconds,
    required this.maskedPhone,
    this.resendToken,
    this.autoSignedIn = false,
    this.userId,
  });

  final String verificationId;
  final int expiresInSeconds;
  final String maskedPhone;
  final int? resendToken;
  final bool autoSignedIn;
  final String? userId;
}

class AuthSession {
  const AuthSession({
    required this.accessToken,
    required this.refreshToken,
    required this.expiresIn,
    required this.userId,
    required this.isNewUser,
  });

  factory AuthSession.fromJson(Map<String, dynamic> json) {
    final user = json['user'] as Map<String, dynamic>;
    return AuthSession(
      accessToken: json['accessToken'] as String,
      refreshToken: json['refreshToken'] as String,
      expiresIn: json['expiresIn'] as int,
      userId: user['userId'] as String,
      isNewUser: user['isNewUser'] as bool? ?? false,
    );
  }

  final String accessToken;
  final String refreshToken;
  final int expiresIn;
  final String userId;
  final bool isNewUser;
}

class UserProfile {
  const UserProfile({
    required this.userId,
    required this.displayName,
    required this.locale,
    required this.apps,
    this.handle,
    this.bio,
    this.avatarUrl,
    this.createdAt,
    this.updatedAt,
  });

  factory UserProfile.fromJson(Map<String, dynamic> json) {
    return UserProfile(
      userId: json['userId'] as String,
      displayName: json['displayName'] as String,
      locale: json['locale'] as String,
      apps: (json['apps'] as List<dynamic>).cast<String>(),
      handle: json['handle'] as String?,
      bio: json['bio'] as String?,
      avatarUrl: json['avatarUrl'] as String?,
      createdAt: json['createdAt'] as String?,
      updatedAt: json['updatedAt'] as String?,
    );
  }

  UserProfile copyWith({String? displayName}) {
    return UserProfile(
      userId: userId,
      displayName: displayName ?? this.displayName,
      locale: locale,
      apps: apps,
      handle: handle,
      bio: bio,
      avatarUrl: avatarUrl,
      createdAt: createdAt,
      updatedAt: updatedAt,
    );
  }

  final String userId;
  final String displayName;
  final String locale;
  final List<String> apps;
  final String? handle;
  final String? bio;
  final String? avatarUrl;
  final String? createdAt;
  final String? updatedAt;
}
