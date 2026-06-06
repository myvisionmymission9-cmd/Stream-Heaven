import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../config/env_config.dart';
import '../errors/app_exception.dart';
import '../storage/token_storage.dart';

final dioProvider = Provider<Dio>((ref) {
  final dio = Dio(
    BaseOptions(
      baseUrl: EnvConfig.apiBaseUrl,
      connectTimeout: EnvConfig.connectTimeout,
      receiveTimeout: EnvConfig.receiveTimeout,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-App-Id': EnvConfig.appId,
      },
    ),
  );

  dio.interceptors.add(AuthInterceptor(ref));
  if (kDebugMode) {
    dio.interceptors.add(LogInterceptor(requestBody: true, responseBody: true));
  }
  return dio;
});

class AuthInterceptor extends Interceptor {
  AuthInterceptor(this._ref);

  final Ref _ref;

  @override
  Future<void> onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) async {
    final deviceId = await _ref.read(deviceIdProvider.future);
    options.headers['X-Device-Id'] = deviceId;

    final token = await _ref.read(tokenStorageProvider).readAccessToken();
    if (token != null && token.isNotEmpty) {
      options.headers['Authorization'] = 'Bearer $token';
    }

    handler.next(options);
  }
}

AppException mapDioError(DioException error) {
  final response = error.response;
  if (response?.data is Map<String, dynamic>) {
    final data = response!.data as Map<String, dynamic>;
    return AppException(
      data['message'] as String? ?? 'Request failed',
      code: data['code'] as String?,
      statusCode: response.statusCode,
    );
  }

  switch (error.type) {
    case DioExceptionType.connectionTimeout:
    case DioExceptionType.receiveTimeout:
    case DioExceptionType.sendTimeout:
    case DioExceptionType.connectionError:
      return const NetworkException('Unable to reach the server.');
    default:
      return AppException(
        error.message ?? 'Request failed',
        statusCode: response?.statusCode,
      );
  }
}

Future<T> guardApi<T>(Future<T> Function() call) async {
  try {
    return await call();
  } on DioException catch (error) {
    throw mapDioError(error);
  }
}
