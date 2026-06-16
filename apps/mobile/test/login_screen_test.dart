import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:stream_heaven_mobile/features/auth/presentation/login_screen.dart';
import 'package:stream_heaven_mobile/l10n/app_localizations.dart';

void main() {
  Widget buildLoginScreen() {
    return ProviderScope(
      child: MaterialApp(
        localizationsDelegates: AppLocalizations.localizationsDelegates,
        supportedLocales: AppLocalizations.supportedLocales,
        home: const LoginScreen(),
      ),
    );
  }

  group('LoginScreen', () {
    testWidgets('renders phone login UI', (tester) async {
      await tester.pumpWidget(buildLoginScreen());
      await tester.pumpAndSettle();

      final l10n = lookupAppLocalizations(const Locale('en'));

      expect(find.text(l10n.loginTitle), findsOneWidget);
      expect(find.text(l10n.loginSubtitle), findsOneWidget);
      expect(find.text(l10n.countryCodeLabel), findsOneWidget);
      expect(find.text(l10n.continueButton), findsOneWidget);
      expect(find.text('+91'), findsWidgets);
    });

    testWidgets('shows validation error for invalid phone', (tester) async {
      await tester.pumpWidget(buildLoginScreen());
      await tester.pumpAndSettle();

      final l10n = lookupAppLocalizations(const Locale('en'));

      await tester.enterText(find.byType(TextField), '123');
      await tester.tap(find.text(l10n.continueButton));
      await tester.pump();

      expect(find.text(l10n.authInvalidPhone), findsOneWidget);
    });

    testWidgets('country picker lists supported regions', (tester) async {
      await tester.pumpWidget(buildLoginScreen());
      await tester.pumpAndSettle();

      await tester.tap(find.byIcon(Icons.arrow_drop_down));
      await tester.pumpAndSettle();

      expect(find.text('United States'), findsOneWidget);
      expect(find.text('Singapore'), findsOneWidget);
    });
  });
}
