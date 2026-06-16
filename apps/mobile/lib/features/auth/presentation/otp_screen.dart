import 'dart:async';

import 'package:design_system/design_system.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/errors/app_exception.dart';
import '../../../l10n/l10n_context.dart';
import 'providers/auth_providers.dart';

class OtpVerifyArgs {
  const OtpVerifyArgs({
    required this.phone,
    required this.verificationId,
    required this.maskedPhone,
    this.resendToken,
    this.expiresInSeconds = 60,
  });

  final String phone;
  final String verificationId;
  final String maskedPhone;
  final int? resendToken;
  final int expiresInSeconds;
}

class OtpVerifyScreen extends ConsumerStatefulWidget {
  const OtpVerifyScreen({super.key, required this.args});

  final OtpVerifyArgs args;

  @override
  ConsumerState<OtpVerifyScreen> createState() => _OtpVerifyScreenState();
}

class _OtpVerifyScreenState extends ConsumerState<OtpVerifyScreen> {
  final _otpController = TextEditingController();
  bool _isLoading = false;
  String? _error;
  late String _verificationId;
  int? _resendToken;
  late int _secondsRemaining;
  Timer? _countdownTimer;

  @override
  void initState() {
    super.initState();
    _verificationId = widget.args.verificationId;
    _resendToken = widget.args.resendToken;
    _secondsRemaining = widget.args.expiresInSeconds;
    _startCountdown();
  }

  @override
  void dispose() {
    _countdownTimer?.cancel();
    _otpController.dispose();
    super.dispose();
  }

  void _startCountdown() {
    _countdownTimer?.cancel();
    _countdownTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (!mounted) {
        timer.cancel();
        return;
      }
      if (_secondsRemaining <= 1) {
        setState(() => _secondsRemaining = 0);
        timer.cancel();
      } else {
        setState(() => _secondsRemaining -= 1);
      }
    });
  }

  Future<void> _verify() async {
    final code = _otpController.text.trim();
    if (code.length != 6) {
      setState(() => _error = context.l10n.authInvalidOtp);
      return;
    }

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      await ref.read(authStateProvider.notifier).verifyOtp(
            verificationId: _verificationId,
            code: code,
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

  Future<void> _resend() async {
    if (_secondsRemaining > 0) {
      return;
    }

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final result = await ref.read(authStateProvider.notifier).sendOtp(
            widget.args.phone,
            forceResendingToken: _resendToken,
          );
      setState(() {
        _verificationId = result.verificationId;
        _resendToken = result.resendToken;
        _secondsRemaining = result.expiresInSeconds;
      });
      _startCountdown();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(context.l10n.resendOtp)),
        );
      }
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
    final canResend = _secondsRemaining == 0 && !_isLoading;

    return Scaffold(
      appBar: AppBar(title: Text(l10n.verifyOtpTitle)),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(ShSpacing.lg),
          children: [
            Text(
              l10n.verifyOtpTitle,
              style: Theme.of(context).textTheme.displaySmall,
            ),
            const SizedBox(height: ShSpacing.xs),
            Text(
              l10n.verifyOtpSubtitle(widget.args.maskedPhone),
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: ShSpacing.xl),
            ShTextField(
              controller: _otpController,
              label: l10n.otpLabel,
              keyboardType: TextInputType.number,
              textInputAction: TextInputAction.done,
              maxLength: 6,
              autofocus: true,
              inputFormatters: [FilteringTextInputFormatter.digitsOnly],
              errorText: _error,
              onSubmitted: (_) => _verify(),
            ),
            const SizedBox(height: ShSpacing.lg),
            ShButton(
              label: l10n.verifyOtp,
              isLoading: _isLoading,
              onPressed: _isLoading ? null : _verify,
            ),
            const SizedBox(height: ShSpacing.md),
            ShButton(
              label: canResend
                  ? l10n.resendOtp
                  : l10n.authResendIn(_secondsRemaining),
              variant: ShButtonVariant.text,
              onPressed: canResend ? _resend : null,
            ),
          ],
        ),
      ),
    );
  }
}
