import 'dart:io' show Platform;

import 'package:flutter/foundation.dart';

/// Runtime configuration for API gateway and app identity.
abstract final class EnvConfig {
  /// Override via `--dart-define=API_BASE_URL=http://192.168.1.10:3000`
  static const String apiBaseUrlOverride = String.fromEnvironment('API_BASE_URL');

  /// Override via `--dart-define=APP_ID=social`
  static const String appId = String.fromEnvironment('APP_ID', defaultValue: 'social');

  /// Skip OTP login in debug builds — Home Feed mock data only.
  /// Run: `flutter run -d chrome --dart-define=DEV_SKIP_AUTH=true`
  static const bool devSkipAuth =
      bool.fromEnvironment('DEV_SKIP_AUTH', defaultValue: false);

  /// Realtime gateway (stub — optional connect in Phase 2a).
  static const String realtimeBaseUrlOverride =
      String.fromEnvironment('REALTIME_BASE_URL');

  static String get apiBaseUrl {
    if (apiBaseUrlOverride.isNotEmpty) {
      return apiBaseUrlOverride;
    }
    if (kIsWeb) {
      return 'http://127.0.0.1:3000';
    }
    if (Platform.isAndroid) {
      return 'http://10.0.2.2:3000';
    }
    return 'http://127.0.0.1:3000';
  }

  static String get realtimeBaseUrl {
    if (realtimeBaseUrlOverride.isNotEmpty) {
      return realtimeBaseUrlOverride;
    }
    if (kIsWeb) {
      return 'http://127.0.0.1:3009';
    }
    if (Platform.isAndroid) {
      return 'http://10.0.2.2:3009';
    }
    return 'http://127.0.0.1:3009';
  }

  static const Duration connectTimeout = Duration(seconds: 15);
  static const Duration receiveTimeout = Duration(seconds: 30);
}
