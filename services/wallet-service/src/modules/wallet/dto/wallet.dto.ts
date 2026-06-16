import { IsEnum, IsInt, IsObject, IsOptional, IsString, IsUUID, MaxLength, Min } from 'class-validator';

export class SendGiftDto {
  @IsUUID()
  giftId!: string;

  @IsUUID()
  recipientUserId!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;

  @IsObject()
  context!: {
    surface: 'livestream' | 'feed_video' | 'profile';
    roomId?: string;
    postId?: string;
  };

  @IsOptional()
  @IsString()
  @MaxLength(140)
  message?: string;
}
