import {
  Controller,
  Post,
  Body,
  Headers,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import {
  OtpSendDto,
  OtpVerifyDto,
  FirebaseExchangeDto,
  RefreshTokenDto,
  LogoutDto,
} from './dto/auth.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { JwtPayload } from './jwt.service';
import { AppId } from '../../common/enums';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('otp/send')
  sendOtp(@Body() dto: OtpSendDto) {
    return this.auth.sendOtp(dto.phone);
  }

  @Post('otp/verify')
  verifyOtp(
    @Body() dto: OtpVerifyDto,
    @Headers('x-device-id') deviceId?: string,
    @Headers('x-app-id') appId?: AppId,
  ) {
    return this.auth.verifyOtp(dto.phone, dto.code, dto.requestId, deviceId, appId);
  }

  @Post('firebase/exchange')
  exchangeFirebase(
    @Body() dto: FirebaseExchangeDto,
    @Headers('x-device-id') deviceId?: string,
    @Headers('x-app-id') appId?: AppId,
  ) {
    return this.auth.exchangeFirebase(dto.firebaseIdToken, deviceId, appId);
  }

  @Post('token/refresh')
  refresh(@Body() dto: RefreshTokenDto) {
    return this.auth.refresh(dto.refreshToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async logout(
    @Req() req: Request & { user: JwtPayload },
    @Body() dto: LogoutDto,
  ) {
    await this.auth.logout(req.user.userId, dto.refreshToken);
  }
}
