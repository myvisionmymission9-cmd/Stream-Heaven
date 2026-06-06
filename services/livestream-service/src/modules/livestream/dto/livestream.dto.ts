import { IsIn, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  title!: string;
}

export class TokenRequestDto {
  @IsIn(['host', 'audience'])
  role!: 'host' | 'audience';
}

export class LimitQueryDto {
  @IsOptional()
  limit?: number;
}

export class RoomParamDto {
  @IsUUID()
  roomId!: string;
}
