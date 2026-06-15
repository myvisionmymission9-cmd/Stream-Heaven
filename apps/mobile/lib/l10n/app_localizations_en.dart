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

  @override
  String get feedTabTrending => 'Trending 🔥';

  @override
  String get feedTabVideos => 'Videos 🎬';

  @override
  String get feedTabFollowing => 'Following';

  @override
  String get feedTabCelebrity => 'Celebrity ⭐';

  @override
  String get feedTabCreatePost => 'Create Post';

  @override
  String get feedFollow => 'Follow';

  @override
  String get feedFollowing => 'Following';

  @override
  String get feedCreatePostComingSoon => 'Create post flow coming soon';

  @override
  String get feedFeatureComingSoon => 'Coming soon';

  @override
  String get feedGiftComingSoon => 'Gifts coming soon';

  @override
  String get feedCommentsComingSoon => 'Comments coming soon';

  @override
  String get feedShareComingSoon => 'Share coming soon';

  @override
  String get feedSaveComingSoon => 'Save coming soon';

  @override
  String get feedCryptoDisclaimer => 'Not financial advice';

  @override
  String get navHome => 'Home';

  @override
  String get navLive => 'Live';

  @override
  String get navAudio => 'Audio';

  @override
  String get navAstro => 'Astro';

  @override
  String get navTv => 'TV';
}
