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
    required this.requestId,
    required this.maskedPhone,
    this.mockOtpCode,
  });

  final String phone;
  final String requestId;
  final String maskedPhone;
  final String? mockOtpCode;
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
  late String _requestId;

  @override
  void initState() {
    super.initState();
    _requestId = widget.args.requestId;
    final devCode = widget.args.mockOtpCode;
    if (devCode != null && devCode.length == 6) {
      _otpController.text = devCode;
    }
  }

  @override
  void dispose() {
    _otpController.dispose();
    super.dispose();
  }

  Future<void> _verify() async {
    final code = _otpController.text.trim();
    if (code.length != 6) {
      setState(() => _error = 'Enter the 6-digit code.');
      return;
    }

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      await ref.read(authStateProvider.notifier).verifyOtp(
            phone: widget.args.phone,
            code: code,
            requestId: _requestId,
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

  Future<void> _resend() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final result =
          await ref.read(authStateProvider.notifier).sendOtp(widget.args.phone);
      setState(() {
        _requestId = result.requestId;
        if (result.mockOtpCode != null) {
          _otpController.text = result.mockOtpCode!;
        }
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(context.l10n.sendOtp)),
        );
      }
    } on AppException catch (error) {
      setState(() => _error = error.message);
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
      appBar: AppBar(title: Text(l10n.verifyOtpTitle)),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(ShSpacing.lg),
          children: [
            Text(l10n.verifyOtpTitle,
                style: Theme.of(context).textTheme.displaySmall),
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
              label: l10n.resendOtp,
              variant: ShButtonVariant.text,
              onPressed: _isLoading ? null : _resend,
            ),
          ],
        ),
      ),
    );
  }
}
