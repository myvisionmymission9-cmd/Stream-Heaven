import { Module } from '@nestjs/common';
import { SocialController } from './social.controller';
import { SocialService } from './social.service';
import { GatewayAuthGuard } from '../../common/guards/gateway-auth.guard';

@Module({
  controllers: [SocialController],
  providers: [SocialService, GatewayAuthGuard],
})
export class SocialModule {}
