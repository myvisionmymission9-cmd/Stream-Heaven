import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:socket_io_client/socket_io_client.dart' as io;

import '../config/env_config.dart';
import '../storage/token_storage.dart';

/// Optional Socket.IO stub — connects when a token exists; no feature handlers yet.
final socketServiceProvider = Provider<SocketService>(
  (ref) => SocketService(ref),
);

class SocketService {
  SocketService(this._ref);

  final Ref _ref;
  io.Socket? _socket;

  bool get isConnected => _socket?.connected ?? false;

  Future<void> connectIfAuthenticated() async {
    final token = await _ref.read(tokenStorageProvider).readAccessToken();
    if (token == null || token.isEmpty) {
      return;
    }

    disconnect();

    _socket = io.io(
      '${EnvConfig.realtimeBaseUrl}/presence',
      io.OptionBuilder()
          .setTransports(['websocket'])
          .setPath('/socket.io')
          .disableAutoConnect()
          .setAuth({'token': token})
          .build(),
    );

    _socket!
      ..onConnect((_) {
        _socket?.emitWithAck('client.ping', {'ts': DateTime.now().millisecondsSinceEpoch});
      })
      ..connect();
  }

  void disconnect() {
    _socket?.dispose();
    _socket = null;
  }
}
