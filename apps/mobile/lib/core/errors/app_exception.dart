import 'package:firebase_auth/firebase_auth.dart';

class AppException implements Exception {
  const AppException(this.message, {this.code, this.statusCode});

  final String message;
  final String? code;
  final int? statusCode;

  @override
  String toString() => 'AppException($code, $statusCode): $message';
}

/// Maps any thrown value to a user-visible auth/API message.
String userFacingMessage(Object error, {required String fallback}) {
  if (error is AppException) {
    return error.message;
  }
  if (error is FirebaseAuthException) {
    return mapFirebaseAuthException(error).message;
  }
  if (error is FirebaseException) {
    return error.message ?? fallback;
  }
  if (error is StateError) {
    return error.message;
  }
  return fallback;
}

class AuthException extends AppException {
  const AuthException(super.message, {super.code, super.statusCode});
}

class NetworkException extends AppException {
  const NetworkException(super.message, {super.code, super.statusCode});
}

AppException mapFirebaseAuthException(FirebaseAuthException error) {
  switch (error.code) {
    case 'invalid-phone-number':
      return const AuthException(
        'Enter a valid phone number with country code.',
        code: 'invalid-phone-number',
      );
    case 'invalid-verification-code':
      return const AuthException(
        'Invalid verification code. Check the code and try again.',
        code: 'invalid-verification-code',
      );
    case 'session-expired':
      return const AuthException(
        'Verification code expired. Request a new code.',
        code: 'session-expired',
      );
    case 'too-many-requests':
      return const AuthException(
        'Too many attempts. Please wait and try again.',
        code: 'too-many-requests',
      );
    case 'network-request-failed':
      return const NetworkException(
        'No internet connection. Check your network and try again.',
        code: 'network-request-failed',
      );
    case 'quota-exceeded':
      return const AuthException(
        'SMS quota exceeded. Try again later or use a test number.',
        code: 'quota-exceeded',
      );
    case 'user-disabled':
      return const AuthException(
        'This account has been disabled.',
        code: 'user-disabled',
      );
    case 'operation-not-allowed':
      return const AuthException(
        'Phone sign-in is not enabled for this Firebase project.',
        code: 'operation-not-allowed',
      );
    case 'captcha-check-failed':
      return const AuthException(
        'reCAPTCHA verification failed. Refresh and try again.',
        code: 'captcha-check-failed',
      );
    case 'invalid-app-credential':
    case 'missing-client-identifier':
      return AuthException(
        'Phone sign-in failed: this app is not authorized for Firebase Auth on '
        'web. In Firebase Console → Authentication → Settings → Authorized '
        'domains, add localhost and 127.0.0.1, then retry.',
        code: error.code,
      );
    case 'unauthorized-domain':
      return const AuthException(
        'This domain is not authorized for Firebase Auth. Add it under '
        'Authentication → Settings → Authorized domains in Firebase Console.',
        code: 'unauthorized-domain',
      );
    case 'invalid-api-key':
      return const AuthException(
        'Firebase API key is invalid or restricted for web. Check API key '
        'restrictions in Google Cloud Console and flutterfire configure.',
        code: 'invalid-api-key',
      );
    case 'app-not-authorized':
      return const AuthException(
        'This Firebase app is not authorized for phone sign-in on web. Verify '
        'authorized domains and Phone provider settings in Firebase Console.',
        code: 'app-not-authorized',
      );
    case 'web-context-cancelled':
      return const AuthException(
        'Phone verification was cancelled. Try again.',
        code: 'web-context-cancelled',
      );
    default:
      return AuthException(
        _actionableFirebaseAuthMessage(error),
        code: error.code,
      );
  }
}

/// Firebase web phone auth often returns message `"Error"` with a useful [code].
String _actionableFirebaseAuthMessage(FirebaseAuthException error) {
  final raw = error.message?.trim();
  if (raw != null &&
      raw.isNotEmpty &&
      raw.toLowerCase() != 'error' &&
      raw.toLowerCase() != 'internal error') {
    return raw;
  }

  if (error.code.isNotEmpty) {
    return 'Authentication failed (${error.code}). Check Firebase Phone Auth '
        'and authorized domains, then try again.';
  }

  return 'Authentication failed. Please try again.';
}
