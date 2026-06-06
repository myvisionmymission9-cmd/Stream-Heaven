import 'package:design_system/design_system.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/errors/app_exception.dart';
import '../../../l10n/l10n_context.dart';
import 'providers/auth_providers.dart';
import 'otp_verify_screen.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _phoneController = TextEditingController();
  bool _isLoading = false;
  String? _error;

  static const _defaultCountryCode = '+91';

  @override
  void dispose() {
    _phoneController.dispose();
    super.dispose();
  }

  String _normalizePhone(String input) {
    final digits = input.replaceAll(RegExp(r'\D'), '');
    if (digits.startsWith('91') && digits.length == 12) {
      return '+$digits';
    }
    if (digits.length == 10) {
      return '$_defaultCountryCode$digits';
    }
    if (input.startsWith('+')) {
      return input;
    }
    return '$_defaultCountryCode$digits';
  }

  Future<void> _sendOtp() async {
    final phone = _normalizePhone(_phoneController.text.trim());
    if (phone.length < 12) {
      setState(() => _error = 'Enter a valid 10-digit phone number.');
      return;
    }

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final result =
          await ref.read(authStateProvider.notifier).sendOtp(phone);
      if (!mounted) return;
      context.pushNamed(
        'loginVerify',
        extra: OtpVerifyArgs(
          phone: phone,
          requestId: result.requestId,
          maskedPhone: result.maskedPhone,
          mockOtpCode: result.mockOtpCode,
        ),
      );
    } on AppException catch (error) {
      setState(() => _error = error.message);
    } catch (_) {
      setState(() => _error = context.l10n.errorGeneric);
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;

    return Scaffold(
      appBar: AppBar(title: Text(l10n.appTitle)),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(ShSpacing.lg),
          children: [
            Text(l10n.loginTitle, style: Theme.of(context).textTheme.displaySmall),
            const SizedBox(height: ShSpacing.xs),
            Text(l10n.loginSubtitle, style: Theme.of(context).textTheme.bodyMedium),
            const SizedBox(height: ShSpacing.xl),
            ShTextField(
              controller: _phoneController,
              label: l10n.phoneLabel,
              hint: l10n.phoneHint,
              keyboardType: TextInputType.phone,
              textInputAction: TextInputAction.done,
              prefixText: '$_defaultCountryCode ',
              inputFormatters: [
                FilteringTextInputFormatter.digitsOnly,
                LengthLimitingTextInputFormatter(10),
              ],
              errorText: _error,
              onSubmitted: (_) => _sendOtp(),
            ),
            const SizedBox(height: ShSpacing.lg),
            ShButton(
              label: l10n.sendOtp,
              isLoading: _isLoading,
              onPressed: _isLoading ? null : _sendOtp,
            ),
          ],
        ),
      ),
    );
  }
}
