class CountryDialCode {
  const CountryDialCode({
    required this.name,
    required this.dialCode,
    required this.flag,
    required this.minDigits,
    required this.maxDigits,
  });

  final String name;
  final String dialCode;
  final String flag;
  final int minDigits;
  final int maxDigits;
}

const kDefaultCountryDialCode = CountryDialCode(
  name: 'India',
  dialCode: '+91',
  flag: '🇮🇳',
  minDigits: 10,
  maxDigits: 10,
);

const kSupportedCountryCodes = <CountryDialCode>[
  kDefaultCountryDialCode,
  const CountryDialCode(
    name: 'United States',
    dialCode: '+1',
    flag: '🇺🇸',
    minDigits: 10,
    maxDigits: 10,
  ),
  const CountryDialCode(
    name: 'United Kingdom',
    dialCode: '+44',
    flag: '🇬🇧',
    minDigits: 10,
    maxDigits: 11,
  ),
  const CountryDialCode(
    name: 'United Arab Emirates',
    dialCode: '+971',
    flag: '🇦🇪',
    minDigits: 9,
    maxDigits: 9,
  ),
  const CountryDialCode(
    name: 'Singapore',
    dialCode: '+65',
    flag: '🇸🇬',
    minDigits: 8,
    maxDigits: 8,
  ),
];

String normalizeLocalPhoneDigits(CountryDialCode country, String localDigits) {
  var digits = localDigits.replaceAll(RegExp(r'\D'), '');
  if (country.dialCode == '+91' &&
      digits.length == 11 &&
      digits.startsWith('0')) {
    digits = digits.substring(1);
  }
  return digits;
}

bool isValidLocalPhone(CountryDialCode country, String localDigits) {
  final digits = normalizeLocalPhoneDigits(country, localDigits);
  if (digits.length < country.minDigits || digits.length > country.maxDigits) {
    return false;
  }
  if (country.dialCode == '+91') {
    return RegExp(r'^[6-9]\d{9}$').hasMatch(digits);
  }
  return true;
}

String buildE164Phone(CountryDialCode country, String localDigits) {
  final digits = normalizeLocalPhoneDigits(country, localDigits);
  return '${country.dialCode}$digits';
}
