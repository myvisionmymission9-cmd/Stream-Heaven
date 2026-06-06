import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:uuid/uuid.dart';

const _accessTokenKey = 'sh_access_token';
const _refreshTokenKey = 'sh_refresh_token';
const _deviceIdKey = 'sh_device_id';

final secureStorageProvider = Provider<FlutterSecureStorage>(
  (_) => const FlutterSecureStorage(
    aOptions: AndroidOptions(encryptedSharedPreferences: true),
  ),
);

final tokenStorageProvider = Provider<TokenStorage>(
  (ref) => TokenStorage(ref.watch(secureStorageProvider)),
);

final deviceIdProvider = FutureProvider<String>((ref) async {
  final storage = ref.watch(tokenStorageProvider);
  return storage.getOrCreateDeviceId();
});

class TokenStorage {
  TokenStorage(this._storage);

  final FlutterSecureStorage _storage;
  static const _uuid = Uuid();

  Future<String?> readAccessToken() => _storage.read(key: _accessTokenKey);

  Future<String?> readRefreshToken() => _storage.read(key: _refreshTokenKey);

  Future<void> saveTokens({
    required String accessToken,
    required String refreshToken,
  }) async {
    await _storage.write(key: _accessTokenKey, value: accessToken);
    await _storage.write(key: _refreshTokenKey, value: refreshToken);
  }

  Future<void> clearTokens() async {
    await _storage.delete(key: _accessTokenKey);
    await _storage.delete(key: _refreshTokenKey);
  }

  Future<String> getOrCreateDeviceId() async {
    final existing = await _storage.read(key: _deviceIdKey);
    if (existing != null && existing.isNotEmpty) {
      return existing;
    }
    final id = _uuid.v4();
    await _storage.write(key: _deviceIdKey, value: id);
    return id;
  }
}
