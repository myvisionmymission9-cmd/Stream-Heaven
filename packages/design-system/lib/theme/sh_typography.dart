import 'package:flutter/material.dart';

import 'sh_colors.dart';

abstract final class ShTypography {
  static TextTheme darkTextTheme = const TextTheme(
    displaySmall: TextStyle(
      fontSize: 28,
      fontWeight: FontWeight.w700,
      color: ShColors.onSurfaceDark,
      height: 1.2,
    ),
    headlineMedium: TextStyle(
      fontSize: 22,
      fontWeight: FontWeight.w600,
      color: ShColors.onSurfaceDark,
      height: 1.25,
    ),
    titleLarge: TextStyle(
      fontSize: 18,
      fontWeight: FontWeight.w600,
      color: ShColors.onSurfaceDark,
    ),
    bodyLarge: TextStyle(
      fontSize: 16,
      fontWeight: FontWeight.w400,
      color: ShColors.onSurfaceDark,
      height: 1.4,
    ),
    bodyMedium: TextStyle(
      fontSize: 14,
      fontWeight: FontWeight.w400,
      color: ShColors.onSurfaceMutedDark,
      height: 1.4,
    ),
    labelLarge: TextStyle(
      fontSize: 14,
      fontWeight: FontWeight.w600,
      color: ShColors.onPrimary,
    ),
  );
}
