import { Module } from '@nestjs/common';
import { GatewayAuthGuard } from '../../common/guards/gateway-auth.guard';
import { LivestreamController } from './livestream.controller';
import { LivestreamService } from './livestream.service';

@Module({
  controllers: [LivestreamController],
  providers: [LivestreamService, GatewayAuthGuard],
})
export class LivestreamModule {}
