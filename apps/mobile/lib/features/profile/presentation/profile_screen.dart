import 'package:design_system/design_system.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/errors/app_exception.dart';
import '../../../l10n/l10n_context.dart';
import '../../auth/presentation/providers/auth_providers.dart';
import 'providers/profile_providers.dart';

class ProfileScreen extends ConsumerStatefulWidget {
  const ProfileScreen({super.key});

  @override
  ConsumerState<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends ConsumerState<ProfileScreen> {
  final _nameController = TextEditingController();
  bool _isSaving = false;
  String? _loadedUserId;

  @override
  void dispose() {
    _nameController.dispose();
    super.dispose();
  }

  Future<void> _saveDisplayName() async {
    final name = _nameController.text.trim();
    if (name.isEmpty) return;

    setState(() => _isSaving = true);
    try {
      await ref
          .read(profileControllerProvider.notifier)
          .updateDisplayName(name);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(context.l10n.profileUpdated)),
        );
      }
    } on AppException catch (error) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(error.message)),
        );
      }
    } finally {
      if (mounted) {
        setState(() => _isSaving = false);
      }
    }
  }

  Future<void> _logout() async {
    await ref.read(authStateProvider.notifier).logout();
    if (mounted) {
      context.goNamed('login');
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    final profileAsync = ref.watch(profileControllerProvider);

    return Scaffold(
      appBar: AppBar(title: Text(l10n.profileTitle)),
      body: SafeArea(
        child: profileAsync.when(
          loading: () => const Center(child: CircularProgressIndicator()),
          error: (error, _) => Center(
            child: Padding(
              padding: const EdgeInsets.all(ShSpacing.lg),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    error is AppException
                        ? error.message
                        : l10n.errorGeneric,
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: ShSpacing.md),
                  ShButton(
                    label: 'Retry',
                    onPressed: () =>
                        ref.read(profileControllerProvider.notifier).refresh(),
                  ),
                ],
              ),
            ),
          ),
          data: (profile) {
            if (_loadedUserId != profile.userId) {
              _loadedUserId = profile.userId;
              _nameController.text = profile.displayName;
            }

            return ListView(
              padding: const EdgeInsets.all(ShSpacing.lg),
              children: [
                CircleAvatar(
                  radius: 40,
                  backgroundColor: Theme.of(context).colorScheme.primary,
                  child: Text(
                    profile.displayName.isNotEmpty
                        ? profile.displayName[0].toUpperCase()
                        : '?',
                    style: Theme.of(context).textTheme.headlineMedium,
                  ),
                ),
                const SizedBox(height: ShSpacing.lg),
                Text('User ID', style: Theme.of(context).textTheme.bodyMedium),
                Text(profile.userId,
                    style: Theme.of(context).textTheme.bodyLarge),
                if (profile.handle != null) ...[
                  const SizedBox(height: ShSpacing.md),
                  Text('@${profile.handle}',
                      style: Theme.of(context).textTheme.bodyLarge),
                ],
                const SizedBox(height: ShSpacing.xl),
                ShTextField(
                  controller: _nameController,
                  label: l10n.displayNameLabel,
                  textInputAction: TextInputAction.done,
                  onSubmitted: (_) => _saveDisplayName(),
                ),
                const SizedBox(height: ShSpacing.lg),
                ShButton(
                  label: l10n.saveProfile,
                  isLoading: _isSaving,
                  onPressed: _isSaving ? null : _saveDisplayName,
                ),
                const SizedBox(height: ShSpacing.xl),
                ShButton(
                  label: l10n.logout,
                  variant: ShButtonVariant.secondary,
                  onPressed: _logout,
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
