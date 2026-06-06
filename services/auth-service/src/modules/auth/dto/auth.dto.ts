import { IsString, Matches, IsOptional, IsUUID } from 'class-validator';

export class OtpSendDto {
  @IsString()
  @Matches(/^\+[1-9]\d{6,14}$/)
  phone!: string;

  @IsOptional()
  @IsString()
  locale?: string;
}

export class OtpVerifyDto {
  @IsString()
  phone!: string;

  @IsString()
  @Matches(/^[0-9]{6}$/)
  code!: string;

  @IsUUID()
  requestId!: string;
}

export class FirebaseExchangeDto {
  @IsString()
  firebaseIdToken!: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken!: string;
}

export class LogoutDto {
  @IsOptional()
  @IsString()
  refreshToken?: string;
}
