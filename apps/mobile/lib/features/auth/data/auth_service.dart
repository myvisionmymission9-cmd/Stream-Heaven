import 'dart:async';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_auth_platform_interface/firebase_auth_platform_interface.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/errors/app_exception.dart';

final authServiceProvider = Provider<AuthService>((ref) => AuthService());

/// Sentinel [PhoneOtpSession.verificationId] for web [ConfirmationResult] flow.
const kWebPhoneVerificationId = '__web_phone_confirmation__';

class PhoneOtpSession {
  const PhoneOtpSession({
    required this.verificationId,
    required this.maskedPhone,
    this.resendToken,
    this.expiresInSeconds = 60,
    this.autoSignedIn = false,
  });

  final String verificationId;
  final String maskedPhone;
  final int? resendToken;
  final int expiresInSeconds;
  final bool autoSignedIn;
}

class AuthService {
  AuthService({FirebaseAuth? auth}) : _auth = auth ?? FirebaseAuth.instance;

  final FirebaseAuth _auth;

  ConfirmationResult? _webConfirmationResult;
  RecaptchaVerifier? _webRecaptchaVerifier;

  User? get currentUser => _auth.currentUser;

  Stream<User?> authStateChanges() => _auth.authStateChanges();

  Future<String?> getIdToken({bool forceRefresh = false}) async {
    final user = _auth.currentUser;
    if (user == null) {
      return null;
    }
    return user.getIdToken(forceRefresh);
  }

  Future<PhoneOtpSession> sendOtp({
    required String phoneNumber,
    int? forceResendingToken,
  }) async {
    if (Firebase.apps.isEmpty) {
      throw const AuthException(
        'Firebase is not initialized. Restart the app after flutterfire configure.',
        code: 'firebase-not-initialized',
      );
    }

    if (kIsWeb) {
      return _sendOtpWeb(phoneNumber);
    }

    return _sendOtpMobile(
      phoneNumber: phoneNumber,
      forceResendingToken: forceResendingToken,
    );
  }

  Future<PhoneOtpSession> _sendOtpWeb(String phoneNumber) async {
    _clearWebPhoneSession();

    final platformAuth = FirebaseAuthPlatform.instanceFor(
      app: Firebase.app(),
      pluginConstants: const {},
    );

    _webRecaptchaVerifier = RecaptchaVerifier(
      auth: platformAuth,
      container: 'recaptcha-container',
      size: RecaptchaVerifierSize.normal,
      theme: RecaptchaVerifierTheme.light,
    );

    try {
      _webConfirmationResult = await _auth.signInWithPhoneNumber(
        phoneNumber,
        _webRecaptchaVerifier,
      );

      return PhoneOtpSession(
        verificationId: kWebPhoneVerificationId,
        maskedPhone: _maskPhone(phoneNumber),
      );
    } on FirebaseAuthException catch (error) {
      _clearWebPhoneSession();
      throw mapFirebaseAuthException(error);
    }
  }

  Future<PhoneOtpSession> _sendOtpMobile({
    required String phoneNumber,
    int? forceResendingToken,
  }) async {
    final completer = Completer<PhoneOtpSession>();

    await _auth.verifyPhoneNumber(
      phoneNumber: phoneNumber,
      forceResendingToken: forceResendingToken,
      timeout: const Duration(seconds: 60),
      verificationCompleted: (PhoneAuthCredential credential) async {
        if (completer.isCompleted) {
          return;
        }
        try {
          await _auth.signInWithCredential(credential);
          completer.complete(
            PhoneOtpSession(
              verificationId: '',
              maskedPhone: _maskPhone(phoneNumber),
              autoSignedIn: true,
            ),
          );
        } on FirebaseAuthException catch (error) {
          completer.completeError(mapFirebaseAuthException(error));
        }
      },
      verificationFailed: (FirebaseAuthException error) {
        if (!completer.isCompleted) {
          completer.completeError(mapFirebaseAuthException(error));
        }
      },
      codeSent: (String verificationId, int? resendToken) {
        if (!completer.isCompleted) {
          completer.complete(
            PhoneOtpSession(
              verificationId: verificationId,
              maskedPhone: _maskPhone(phoneNumber),
              resendToken: resendToken,
            ),
          );
        }
      },
      codeAutoRetrievalTimeout: (_) {},
    );

    return completer.future.timeout(
      const Duration(seconds: 90),
      onTimeout: () => throw const NetworkException(
        'SMS verification timed out. Check your number and try again.',
        code: 'phone-auth-timeout',
      ),
    );
  }

  Future<UserCredential> verifyOtp({
    required String verificationId,
    required String smsCode,
  }) async {
    if (kIsWeb && verificationId == kWebPhoneVerificationId) {
      return _verifyOtpWeb(smsCode);
    }

    try {
      final credential = PhoneAuthProvider.credential(
        verificationId: verificationId,
        smsCode: smsCode,
      );
      return await _auth.signInWithCredential(credential);
    } on FirebaseAuthException catch (error) {
      throw mapFirebaseAuthException(error);
    }
  }

  Future<UserCredential> _verifyOtpWeb(String smsCode) async {
    final confirmation = _webConfirmationResult;
    if (confirmation == null) {
      throw const AuthException(
        'Phone verification session expired. Request a new code.',
        code: 'session-expired',
      );
    }

    try {
      final credential = await confirmation.confirm(smsCode);
      _clearWebPhoneSession();
      return credential;
    } on FirebaseAuthException catch (error) {
      throw mapFirebaseAuthException(error);
    }
  }

  Future<void> signOut() async {
    _clearWebPhoneSession();
    await _auth.signOut();
  }

  void _clearWebPhoneSession() {
    _webConfirmationResult = null;
    _webRecaptchaVerifier?.clear();
    _webRecaptchaVerifier = null;
  }

  String _maskPhone(String phone) {
    final digits = phone.replaceAll(RegExp(r'\D'), '');
    if (digits.length < 4) {
      return phone;
    }
    final lastFour = digits.substring(digits.length - 4);
    return '***$lastFour';
  }
}
