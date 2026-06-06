import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { SessionService } from './session.service';
import { REDIS_CLIENT } from './session.constants';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return new Redis(config.get<string>('app.redisUrl') ?? 'redis://localhost:6379');
      },
    },
    SessionService,
  ],
  exports: [REDIS_CLIENT, SessionService],
})
export class SessionModule {}
