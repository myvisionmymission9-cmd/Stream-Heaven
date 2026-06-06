import { IsOptional, IsString, Matches, MaxLength, MinLength, IsUrl, IsEnum } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  displayName?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9_]{3,30}$/)
  handle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string;

  @IsOptional()
  @IsString()
  locale?: string;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}

export class RegisterDeviceDto {
  @IsEnum(['ios', 'android', 'web'])
  platform!: 'ios' | 'android' | 'web';

  @IsString()
  pushToken!: string;

  @IsOptional()
  @IsString()
  appVersion?: string;
}
