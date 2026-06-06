import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { RateLimitService } from './rate-limit.service';
import { RateLimitMiddleware } from '../../common/middleware/rate-limit.middleware';
import { REDIS_CLIENT } from './rate-limit.constants';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        new Redis(config.get<string>('app.redisUrl') ?? 'redis://localhost:6379'),
    },
    RateLimitService,
    RateLimitMiddleware,
  ],
  exports: [REDIS_CLIENT, RateLimitService, RateLimitMiddleware],
})
export class RateLimitModule {}
