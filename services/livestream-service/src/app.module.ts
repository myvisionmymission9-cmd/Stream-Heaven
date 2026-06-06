import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { HealthModule } from './modules/health/health.module';
import { LivestreamModule } from './modules/livestream/livestream.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    HealthModule,
    LivestreamModule,
  ],
})
export class AppModule {}
