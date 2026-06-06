import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './adapters/redis-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const redisAdapter = new RedisIoAdapter(app);
  await redisAdapter.connectToRedis();
  app.useWebSocketAdapter(redisAdapter);

  app.enableCors({ origin: true, credentials: true });

  const port = process.env.PORT ?? 3009;
  await app.listen(port);
  new Logger('RealtimeGateway').log(`realtime-gateway listening on :${port}`);
}

bootstrap();
