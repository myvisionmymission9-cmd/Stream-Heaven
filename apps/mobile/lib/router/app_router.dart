import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../features/auth/presentation/providers/auth_providers.dart';
import '../../features/auth/presentation/login_screen.dart';
import '../../features/auth/presentation/otp_verify_screen.dart';
import '../../features/home/presentation/home_screen.dart';
import '../../features/livestream/presentation/live_rooms_screen.dart';
import '../../features/social/presentation/home/social_home_shell.dart';
import '../../features/profile/presentation/profile_screen.dart';
import '../../features/social/presentation/feed_screen.dart';
import '../../features/social/presentation/creator/creator_profile_screen.dart';
import '../../features/splash/splash_screen.dart';

final rootNavigatorKey = GlobalKey<NavigatorState>();

final routerRefreshProvider = Provider<ValueNotifier<AuthState>>((ref) {
  final notifier = ValueNotifier(ref.read(authStateProvider));
  ref.listen(authStateProvider, (_, next) {
    notifier.value = next;
  });
  ref.onDispose(notifier.dispose);
  return notifier;
});

final appRouterProvider = Provider<GoRouter>((ref) {
  final refreshListenable = ref.watch(routerRefreshProvider);
  final authState = ref.watch(authStateProvider);

  return GoRouter(
    navigatorKey: rootNavigatorKey,
    initialLocation: '/splash',
    refreshListenable: refreshListenable,
    redirect: (context, state) {
      final location = state.matchedLocation;
      final isSplash = location == '/splash';
      final isLoginFlow =
          location.startsWith('/login') || location == '/login/verify';

      if (authState.status == AuthStatus.unknown) {
        return isSplash ? null : '/splash';
      }

      if (authState.status == AuthStatus.unauthenticated) {
        if (isLoginFlow) return null;
        return '/login';
      }

      if (authState.status == AuthStatus.authenticated) {
        if (isSplash || isLoginFlow || location == '/login') {
          return '/home';
        }
      }

      return null;
    },
    routes: [
      GoRoute(
        path: '/splash',
        name: 'splash',
        builder: (context, state) => const SplashScreen(),
      ),
      GoRoute(
        path: '/login',
        name: 'login',
        builder: (context, state) => const LoginScreen(),
        routes: [
          GoRoute(
            path: 'verify',
            name: 'loginVerify',
            builder: (context, state) {
              final extra = state.extra as OtpVerifyArgs?;
              if (extra == null) {
                return const LoginScreen();
              }
              return OtpVerifyScreen(args: extra);
            },
          ),
        ],
      ),
      GoRoute(
        path: '/home',
        name: 'home',
        builder: (context, state) => const HomeScreen(),
      ),
      GoRoute(
        path: '/social-feed',
        name: 'socialFeed',
        builder: (context, state) => const SocialHomeShell(),
      ),
      GoRoute(
        path: '/profile',
        name: 'profile',
        builder: (context, state) => const ProfileScreen(),
      ),
      GoRoute(
        path: '/feed',
        name: 'feed',
        builder: (context, state) => const FeedScreen(),
      ),
      GoRoute(
        path: '/live-rooms',
        name: 'liveRooms',
        builder: (context, state) => const LiveRoomsScreen(),
      ),
      GoRoute(
        path: '/creator/:handle',
        name: 'creatorProfile',
        builder: (context, state) {
          final handle = state.pathParameters['handle'] ?? '';
          return CreatorProfileScreen(handle: handle);
        },
      ),
    ],
  );
});
