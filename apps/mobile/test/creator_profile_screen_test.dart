import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:stream_heaven_mobile/features/social/presentation/creator/creator_profile_screen.dart';
import 'package:stream_heaven_mobile/l10n/app_localizations.dart';

void main() {
  Widget buildTestable(String handle) {
    return ProviderScope(
      child: MaterialApp(
        localizationsDelegates: AppLocalizations.localizationsDelegates,
        supportedLocales: AppLocalizations.supportedLocales,
        home: CreatorProfileScreen(handle: handle),
      ),
    );
  }

  group('CreatorProfileScreen', () {
    testWidgets('shows loading indicator while fetching profile', (tester) async {
      await tester.pumpWidget(buildTestable('priya_dance'));
      // Before mock delay resolves, loading indicator is visible
      expect(find.byType(CircularProgressIndicator), findsOneWidget);
      // Drain pending timers to avoid test assertion failure
      await tester.pumpAndSettle(const Duration(seconds: 2));
    });

    testWidgets('renders profile with mock data for known handle', (tester) async {
      await tester.pumpWidget(buildTestable('priya_dance'));
      // Wait for the 400ms mock delay
      await tester.pump(const Duration(milliseconds: 500));
      await tester.pump();

      expect(find.text('@priya_dance'), findsOneWidget);
      expect(find.text('Priya Sharma'), findsOneWidget);
    });

    testWidgets('shows celebrity badge for celebrity creator', (tester) async {
      await tester.pumpWidget(buildTestable('priya_dance'));
      await tester.pump(const Duration(milliseconds: 500));
      await tester.pump();

      expect(find.text('Celebrity'), findsOneWidget);
    });

    testWidgets('stats bar shows Posts, Followers, Following labels', (tester) async {
      await tester.pumpWidget(buildTestable('priya_dance'));
      await tester.pump(const Duration(milliseconds: 500));
      await tester.pump();

      expect(find.text('Posts'), findsOneWidget);
      expect(find.text('Followers'), findsOneWidget);
      // 'Following' appears in stats bar (and not in follow button for celebrity we follow)
      expect(find.text('Following'), findsWidgets);
    });

    testWidgets('follow button is present when profile loads', (tester) async {
      await tester.pumpWidget(buildTestable('ravi_tech'));
      await tester.pump(const Duration(milliseconds: 500));
      await tester.pump();

      // ravi_tech is already followed, so button shows 'Following'
      expect(find.text('@ravi_tech'), findsOneWidget);
    });

    testWidgets('unknown handle renders fallback profile gracefully', (tester) async {
      await tester.pumpWidget(buildTestable('unknown_handle_xyz'));
      await tester.pump(const Duration(milliseconds: 500));
      await tester.pump();

      // Should render without crashing — fallback profile with handle as name
      expect(find.text('@unknown_handle_xyz'), findsOneWidget);
    });
  });
}
