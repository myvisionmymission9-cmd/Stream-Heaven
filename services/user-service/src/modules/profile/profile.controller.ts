import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  Param,
  Headers,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ProfileService } from './profile.service';
import { UpdateProfileDto, RegisterDeviceDto } from './dto/profile.dto';
import { GatewayAuthGuard } from '../../common/guards/gateway-auth.guard';

@Controller('users')
@UseGuards(GatewayAuthGuard)
export class ProfileController {
  constructor(private readonly profiles: ProfileService) {}

  @Get('me')
  getMe(
    @Req() req: Request & { userId?: string },
    @Headers('x-user-roles') roles?: string,
    @Headers('x-user-apps') apps?: string,
  ) {
    return this.profiles.getOrCreateProfile(req.userId!, roles, apps);
  }

  @Patch('me')
  updateMe(@Req() req: Request & { userId?: string }, @Body() dto: UpdateProfileDto) {
    return this.profiles.updateProfile(req.userId!, dto);
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    return this.profiles.getPublicProfile(userId);
  }

  @Post('me/devices')
  registerDevice(
    @Req() req: Request & { userId?: string },
    @Headers('x-device-id') deviceId: string | undefined,
    @Body() dto: RegisterDeviceDto,
  ) {
    return this.profiles.registerDevice(req.userId!, deviceId, dto);
  }
}
