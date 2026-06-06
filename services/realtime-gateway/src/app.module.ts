import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PresenceGateway } from './gateways/presence.gateway';
import { HealthController } from './health.controller';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    JwtModule.register({}),
  ],
  controllers: [HealthController],
  providers: [PresenceGateway],
})
export class AppModule {}
