import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ProfileEntity } from '../../database/entities/profile.entity';
import { UserDeviceEntity } from '../../database/entities/user-device.entity';
import { GatewayAuthGuard } from '../../common/guards/gateway-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity, UserDeviceEntity])],
  controllers: [ProfileController],
  providers: [ProfileService, GatewayAuthGuard],
})
export class ProfileModule {}
