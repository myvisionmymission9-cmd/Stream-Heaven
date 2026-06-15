import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:stream_heaven_mobile/features/social/presentation/home/social_home_shell.dart';
import 'package:stream_heaven_mobile/l10n/app_localizations.dart';

void main() {
  testWidgets('SocialHomeShell shows trending tab and feed overlay', (tester) async {
    await tester.pumpWidget(
      ProviderScope(
        child: MaterialApp(
          localizationsDelegates: AppLocalizations.localizationsDelegates,
          supportedLocales: AppLocalizations.supportedLocales,
          home: const SocialHomeShell(),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 100));

    expect(find.text('Trending 🔥'), findsOneWidget);
    expect(find.text('@telugu_creator'), findsOneWidget);
    expect(find.text('Follow'), findsWidgets);
    expect(find.byIcon(Icons.favorite_border), findsOneWidget);
  });
}
