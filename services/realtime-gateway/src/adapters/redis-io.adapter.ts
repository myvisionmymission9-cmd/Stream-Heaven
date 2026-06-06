import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplication, Logger } from '@nestjs/common';
import { createAdapter } from '@socket.io/redis-adapter';
import { ServerOptions } from 'socket.io';
import Redis from 'ioredis';

export class RedisIoAdapter extends IoAdapter {
  private readonly logger = new Logger(RedisIoAdapter.name);
  private adapterConstructor!: ReturnType<typeof createAdapter>;

  constructor(private readonly app: INestApplication) {
    super(app);
  }

  async connectToRedis(): Promise<void> {
    const url = process.env.REDIS_URL ?? 'redis://localhost:6379';
    const pubClient = new Redis(url);
    const subClient = pubClient.duplicate();
    this.adapterConstructor = createAdapter(pubClient, subClient);
    this.logger.log('Socket.IO Redis adapter configured');
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, {
      ...options,
      cors: { origin: true, credentials: true },
      transports: ['websocket', 'polling'],
    });
    server.adapter(this.adapterConstructor);
    return server;
  }
}
