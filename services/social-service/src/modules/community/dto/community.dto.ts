import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCommunityDto {
  @IsString()
  @MaxLength(80)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsEnum(['PUBLIC', 'PRIVATE', 'FAN_CLUB'])
  visibility!: 'PUBLIC' | 'PRIVATE' | 'FAN_CLUB';
}
