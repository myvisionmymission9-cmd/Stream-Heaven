import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ShJwtService } from './jwt.service';
import { OtpService } from './otp.service';
import { FirebaseVerifierService } from './firebase-verifier.service';
import { UserEntity } from '../../database/entities/user.entity';
import { RefreshTokenEntity } from '../../database/entities/refresh-token.entity';
import { DeviceEntity } from '../../database/entities/device.entity';
import { OtpCodeEntity } from '../../database/entities/otp-code.entity';
import { MockSmsProvider, TwilioSmsProvider, SMS_PROVIDER } from './sms.provider';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity, DeviceEntity, OtpCodeEntity]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ShJwtService,
    OtpService,
    FirebaseVerifierService,
    JwtAuthGuard,
    MockSmsProvider,
    TwilioSmsProvider,
    {
      provide: SMS_PROVIDER,
      inject: [ConfigService, MockSmsProvider, TwilioSmsProvider],
      useFactory: (
        config: ConfigService,
        mock: MockSmsProvider,
        twilio: TwilioSmsProvider,
      ) => (config.get<string>('app.smsProvider', 'mock') === 'twilio' ? twilio : mock),
    },
  ],
  exports: [ShJwtService, JwtAuthGuard],
})
export class AuthModule {}
