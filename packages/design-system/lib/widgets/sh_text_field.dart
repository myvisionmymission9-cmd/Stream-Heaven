import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../theme/sh_spacing.dart';

class ShTextField extends StatelessWidget {
  const ShTextField({
    super.key,
    required this.controller,
    this.label,
    this.hint,
    this.keyboardType,
    this.textInputAction,
    this.obscureText = false,
    this.prefixText,
    this.prefixIcon,
    this.maxLength,
    this.inputFormatters,
    this.onSubmitted,
    this.errorText,
    this.autofocus = false,
  });

  final TextEditingController controller;
  final String? label;
  final String? hint;
  final TextInputType? keyboardType;
  final TextInputAction? textInputAction;
  final bool obscureText;
  final String? prefixText;
  final Widget? prefixIcon;
  final int? maxLength;
  final List<TextInputFormatter>? inputFormatters;
  final ValueChanged<String>? onSubmitted;
  final String? errorText;
  final bool autofocus;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (label != null) ...[
          Text(label!, style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: ShSpacing.xs),
        ],
        TextField(
          controller: controller,
          keyboardType: keyboardType,
          textInputAction: textInputAction,
          obscureText: obscureText,
          maxLength: maxLength,
          inputFormatters: inputFormatters,
          onSubmitted: onSubmitted,
          autofocus: autofocus,
          decoration: InputDecoration(
            hintText: hint,
            prefixText: prefixText,
            prefixIcon: prefixIcon,
            errorText: errorText,
            counterText: maxLength != null ? '' : null,
          ),
        ),
      ],
    );
  }
}
