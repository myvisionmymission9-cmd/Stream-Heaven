// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get appTitle => 'Stream Heaven';

  @override
  String get splashLoading => 'Loading…';

  @override
  String get loginTitle => 'Welcome to Stream Heaven';

  @override
  String get loginSubtitle => 'Sign in with your phone number';

  @override
  String get phoneLabel => 'Phone number';

  @override
  String get phoneHint => '9876543210';

  @override
  String get sendOtp => 'Send OTP';

  @override
  String get verifyOtpTitle => 'Enter verification code';

  @override
  String verifyOtpSubtitle(String phone) {
    return 'We sent a 6-digit code to $phone';
  }

  @override
  String get otpLabel => 'OTP code';

  @override
  String get verifyOtp => 'Verify & continue';

  @override
  String get resendOtp => 'Resend code';

  @override
  String get homeTitle => 'Home';

  @override
  String get profileTitle => 'Profile';

  @override
  String get displayNameLabel => 'Display name';

  @override
  String get saveProfile => 'Save changes';

  @override
  String get logout => 'Log out';

  @override
  String get errorGeneric => 'Something went wrong. Please try again.';

  @override
  String get errorOffline => 'No internet connection.';

  @override
  String get profileUpdated => 'Profile updated';
}
