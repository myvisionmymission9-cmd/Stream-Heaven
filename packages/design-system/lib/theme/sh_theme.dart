import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import 'sh_colors.dart';
import 'sh_typography.dart';

abstract final class ShTheme {
  static ThemeData dark() {
    const colorScheme = ColorScheme.dark(
      primary: ShColors.primary,
      onPrimary: ShColors.onPrimary,
      surface: ShColors.surfaceDark,
      onSurface: ShColors.onSurfaceDark,
      error: ShColors.errorDark,
      outline: ShColors.outlineDark,
    );

    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: ShColors.surfaceDark,
      textTheme: ShTypography.darkTextTheme,
      appBarTheme: const AppBarTheme(
        backgroundColor: ShColors.surfaceDark,
        foregroundColor: ShColors.onSurfaceDark,
        elevation: 0,
        centerTitle: true,
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: ShColors.surfaceContainerDark,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: ShColors.outlineDark),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: ShColors.outlineDark),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: ShColors.primary, width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: ShColors.errorDark),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: ShColors.primary,
          foregroundColor: ShColors.onPrimary,
          minimumSize: const Size.fromHeight(48),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          elevation: 0,
        ),
      ),
      pageTransitionsTheme: const PageTransitionsTheme(
        builders: {
          TargetPlatform.android: FadeUpwardsPageTransitionsBuilder(),
          TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
        },
      ),
    );
  }
}
