import 'package:flutter/material.dart';

import '../theme/sh_colors.dart';
import '../theme/sh_spacing.dart';

enum ShButtonVariant { primary, secondary, text }

class ShButton extends StatelessWidget {
  const ShButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.isLoading = false,
    this.variant = ShButtonVariant.primary,
    this.expand = true,
  });

  final String label;
  final VoidCallback? onPressed;
  final bool isLoading;
  final ShButtonVariant variant;
  final bool expand;

  @override
  Widget build(BuildContext context) {
    final enabled = onPressed != null && !isLoading;
    final child = isLoading
        ? const SizedBox(
            height: 20,
            width: 20,
            child: CircularProgressIndicator(strokeWidth: 2),
          )
        : Text(label);

    final button = switch (variant) {
      ShButtonVariant.primary => ElevatedButton(
          onPressed: enabled ? onPressed : null,
          child: child,
        ),
      ShButtonVariant.secondary => OutlinedButton(
          onPressed: enabled ? onPressed : null,
          style: OutlinedButton.styleFrom(
            minimumSize: const Size.fromHeight(ShSpacing.minTouchTarget),
            side: const BorderSide(color: ShColors.outlineDark),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
          child: child,
        ),
      ShButtonVariant.text => TextButton(
          onPressed: enabled ? onPressed : null,
          child: child,
        ),
    };

    if (!expand) return button;
    return SizedBox(width: double.infinity, child: button);
  }
}
