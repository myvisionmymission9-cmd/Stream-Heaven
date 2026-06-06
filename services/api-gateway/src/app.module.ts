import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import appConfig from './config/app.config';
import { ProxyModule } from './modules/proxy/proxy.module';
import { HealthModule } from './modules/health/health.module';
import { RateLimitModule } from './modules/rate-limit/rate-limit.module';
import { RateLimitMiddleware } from './common/middleware/rate-limit.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    JwtModule.register({}),
    RateLimitModule,
    HealthModule,
    ProxyModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimitMiddleware).forRoutes('*');
  }
}
