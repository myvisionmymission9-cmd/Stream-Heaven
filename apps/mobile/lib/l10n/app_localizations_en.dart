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
  String get countryCodeLabel => 'Country / region';

  @override
  String get continueButton => 'Continue';

  @override
  String get authInvalidPhone =>
      'Enter a valid phone number for the selected country.';

  @override
  String get authInvalidOtp => 'Enter the 6-digit verification code.';

  @override
  String authResendIn(int seconds) {
    return 'Resend in ${seconds}s';
  }

  @override
  String homeWelcomeUser(String user) {
    return 'Welcome, $user';
  }

  @override
  String get homeTabDescription =>
      'Your Stream Heaven hub. Open the social feed or explore more tabs.';

  @override
  String get openSocialFeed => 'Open social feed';

  @override
  String get navReels => 'Reels';

  @override
  String get editProfile => 'Edit profile';

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

  @override
  String get creatorPosts => 'Posts';

  @override
  String get creatorFollowers => 'Followers';

  @override
  String get creatorFollowing => 'Following';

  @override
  String get creatorProfileTitle => 'Profile';

  @override
  String get creatorShareProfile => 'Share profile';

  @override
  String get creatorBlock => 'Block';

  @override
  String get creatorNoPostsYet => 'No posts yet';

  @override
  String get creatorPostsComingSoon => 'Post detail coming soon';

  @override
  String get creatorDashboardTitle => 'Dashboard';

  @override
  String get creatorTotalViews => 'Total views';

  @override
  String get creatorFollowersGained => 'New followers';

  @override
  String get creatorEarnings => 'Earnings';

  @override
  String get creatorWithdraw => 'Withdraw';

  @override
  String get creatorWithdrawComingSoon => 'Withdrawals coming soon';

  @override
  String get composerTitle => 'Create post';

  @override
  String get composerVideo => 'Video';

  @override
  String get composerImage => 'Image';

  @override
  String get composerAudio => 'Audio';

  @override
  String get composerText => 'Text';

  @override
  String get composerCommunity => 'Community';

  @override
  String get composerCrypto => 'Crypto';

  @override
  String get composerCaptionHint => 'Add a caption…';

  @override
  String get composerPost => 'Post';

  @override
  String get composerDraft => 'Save draft';
}
