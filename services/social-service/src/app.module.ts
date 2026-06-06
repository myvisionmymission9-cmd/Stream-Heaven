import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { HealthModule } from './modules/health/health.module';
import { SocialModule } from './modules/social/social.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    HealthModule,
    SocialModule,
  ],
})
export class AppModule {}
