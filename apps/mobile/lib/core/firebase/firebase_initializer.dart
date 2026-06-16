import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';

import 'firebase_options.dart';

Future<void> initializeFirebase() async {
  if (Firebase.apps.isNotEmpty) {
    return;
  }

  if (!DefaultFirebaseOptions.isConfigured) {
    throw StateError(
      'Firebase is not configured. Run flutterfire configure — '
      'see docs/day-2-firebase-setup.md.',
    );
  }

  try {
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );
  } on FirebaseException catch (error) {
    debugPrint('Firebase initialization failed: ${error.code} ${error.message}');
    rethrow;
  }
}
