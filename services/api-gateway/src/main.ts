import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';
import { CorrelationIdMiddleware } from './common/middleware/correlation-id.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = new Logger('ApiGateway');

  const corsOrigins = (process.env.CORS_ORIGINS ?? '*').split(',');
  app.enableCors({
    origin: corsOrigins.includes('*') ? true : corsOrigins,
    credentials: true,
    allowedHeaders: [
      'Authorization',
      'Content-Type',
      'X-App-Id',
      'X-App-Version',
      'X-Device-Id',
      'X-Request-Id',
      'X-Correlation-Id',
      'Idempotency-Key',
    ],
    exposedHeaders: ['X-Request-Id', 'X-Correlation-Id', 'Retry-After'],
  });

  app.use(RequestIdMiddleware);
  app.use(CorrelationIdMiddleware);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`api-gateway listening on :${port}`);
}

bootstrap();
