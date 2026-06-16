import 'package:design_system/design_system.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/errors/app_exception.dart';
import '../../../l10n/l10n_context.dart';
import 'otp_screen.dart';
import 'providers/auth_providers.dart';
import 'widgets/country_code_picker.dart';
import 'widgets/country_codes.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _phoneController = TextEditingController();
  bool _isLoading = false;
  String? _error;
  CountryDialCode _country = kDefaultCountryDialCode;

  @override
  void dispose() {
    _phoneController.dispose();
    super.dispose();
  }

  Future<void> _sendOtp() async {
    final localDigits = _phoneController.text.trim();
    if (!isValidLocalPhone(_country, localDigits)) {
      setState(() => _error = context.l10n.authInvalidPhone);
      return;
    }

    final phone = buildE164Phone(_country, localDigits);

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final result =
          await ref.read(authStateProvider.notifier).sendOtp(phone);
      if (!mounted) return;
      if (result.autoSignedIn) {
        return;
      }
      context.pushNamed(
        'loginVerify',
        extra: OtpVerifyArgs(
          phone: phone,
          verificationId: result.verificationId,
          maskedPhone: result.maskedPhone,
          resendToken: result.resendToken,
          expiresInSeconds: result.expiresInSeconds,
        ),
      );
    } on AppException catch (error) {
      setState(() => _error = error.message);
    } catch (error) {
      setState(
        () => _error = userFacingMessage(
          error,
          fallback: context.l10n.errorGeneric,
        ),
      );
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
            Text(l10n.countryCodeLabel, style: Theme.of(context).textTheme.labelLarge),
            const SizedBox(height: ShSpacing.xs),
            CountryCodePicker(
              selected: _country,
              onChanged: (country) => setState(() => _country = country),
            ),
            const SizedBox(height: ShSpacing.md),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.only(top: 28),
                  child: Text(
                    _country.dialCode,
                    style: Theme.of(context).textTheme.bodyLarge,
                  ),
                ),
                const SizedBox(width: ShSpacing.sm),
                Expanded(
                  child: ShTextField(
                    controller: _phoneController,
                    label: l10n.phoneLabel,
                    hint: l10n.phoneHint,
                    keyboardType: TextInputType.phone,
                    textInputAction: TextInputAction.done,
                    inputFormatters: [
                      FilteringTextInputFormatter.digitsOnly,
                      LengthLimitingTextInputFormatter(_country.maxDigits),
                    ],
                    errorText: _error,
                    onSubmitted: (_) => _sendOtp(),
                  ),
                ),
              ],
            ),
            const SizedBox(height: ShSpacing.lg),
            ShButton(
              label: l10n.continueButton,
              isLoading: _isLoading,
              onPressed: _isLoading ? null : _sendOtp,
            ),
          ],
        ),
      ),
    );
  }
}
