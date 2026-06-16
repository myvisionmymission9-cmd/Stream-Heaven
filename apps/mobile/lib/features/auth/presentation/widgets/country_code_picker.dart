import 'package:design_system/design_system.dart';
import 'package:flutter/material.dart';

import 'country_codes.dart';

class CountryCodePicker extends StatelessWidget {
  const CountryCodePicker({
    super.key,
    required this.selected,
    required this.onChanged,
  });

  final CountryDialCode selected;
  final ValueChanged<CountryDialCode> onChanged;

  Future<void> _openPicker(BuildContext context) async {
    final picked = await showModalBottomSheet<CountryDialCode>(
      context: context,
      showDragHandle: true,
      builder: (context) {
        return SafeArea(
          child: ListView.separated(
            shrinkWrap: true,
            itemCount: kSupportedCountryCodes.length,
            separatorBuilder: (_, __) => const Divider(height: 1),
            itemBuilder: (context, index) {
              final country = kSupportedCountryCodes[index];
              return ListTile(
                leading: Text(country.flag, style: const TextStyle(fontSize: 24)),
                title: Text(country.name),
                trailing: Text(country.dialCode),
                onTap: () => Navigator.of(context).pop(country),
              );
            },
          ),
        );
      },
    );

    if (picked != null) {
      onChanged(picked);
    }
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => _openPicker(context),
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(
          horizontal: ShSpacing.md,
          vertical: ShSpacing.sm,
        ),
        decoration: BoxDecoration(
          border: Border.all(color: Theme.of(context).dividerColor),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(selected.flag, style: const TextStyle(fontSize: 20)),
            const SizedBox(width: ShSpacing.xs),
            Text(
              selected.dialCode,
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(width: ShSpacing.xs),
            Icon(
              Icons.arrow_drop_down,
              color: Theme.of(context).colorScheme.onSurface,
            ),
          ],
        ),
      ),
    );
  }
}
