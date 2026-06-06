import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

typedef AppRunner = FutureOr<void> Function();

Future<void> bootstrap(AppRunner runApp) async {
  WidgetsFlutterBinding.ensureInitialized();

  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  await runApp();
}
