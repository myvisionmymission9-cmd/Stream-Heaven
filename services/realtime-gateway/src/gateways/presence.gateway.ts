import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  appId?: string;
}

@WebSocketGateway({ namespace: '/presence', path: '/socket.io' })
export class PresenceGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(PresenceGateway.name);

  @WebSocketServer()
  server!: Server;

  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async handleConnection(client: AuthenticatedSocket) {
    const token =
      (client.handshake.auth?.token as string | undefined) ??
      (client.handshake.headers.authorization?.replace('Bearer ', ''));

    if (!token) {
      client.disconnect(true);
      return;
    }

    try {
      const payload = this.jwt.verify<{ userId: string; type: string }>(token, {
        secret: this.config.get<string>('app.jwtAccessSecret'),
      });
      if (payload.type !== 'access') throw new Error('Invalid token type');
      client.userId = payload.userId;
      client.appId = (client.handshake.auth?.appId as string) ?? 'social';
      client.join(`user:${client.userId}`);

      this.server.emit('presence.online', {
        eventId: uuidv4(),
        eventType: 'presence.online',
        eventVersion: '1',
        occurredAt: new Date().toISOString(),
        producer: 'realtime-gateway',
        payload: {
          userId: client.userId,
          appId: client.appId,
          deviceId: client.handshake.auth?.deviceId,
        },
      });
    } catch {
      client.disconnect(true);
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    if (!client.userId) return;
    this.server.emit('presence.offline', {
      eventId: uuidv4(),
      eventType: 'presence.offline',
      eventVersion: '1',
      occurredAt: new Date().toISOString(),
      producer: 'realtime-gateway',
      payload: {
        userId: client.userId,
        lastSeenAt: new Date().toISOString(),
      },
    });
  }

  @SubscribeMessage('client.ping')
  handlePing(
    @ConnectedSocket() _client: AuthenticatedSocket,
    @MessageBody() data: { ts: number },
  ) {
    return {
      eventType: 'server.pong',
      payload: { ts: data.ts, serverTs: Date.now() },
    };
  }
}
