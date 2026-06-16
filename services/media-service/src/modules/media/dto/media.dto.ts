import { IsEnum, IsInt, IsObject, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class UploadIntentDto {
  @IsEnum(['video/mp4', 'video/quicktime', 'video/webm', 'image/jpeg', 'image/png', 'image/webp', 'audio/mpeg', 'audio/aac'])
  mimeType!: string;

  @IsInt()
  @Min(1)
  @Max(5368709120)
  fileSizeBytes!: number;

  @IsObject()
  context!: {
    surface: 'social_post' | 'reel' | 'live_thumbnail' | 'profile_avatar' | 'audio_room_cover';
    postId?: string;
  };

  @IsOptional()
  @IsNumber()
  durationSeconds?: number;
}
