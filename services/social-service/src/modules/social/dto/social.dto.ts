import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsUrl,
  IsUUID,
  IsIn,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(1)
  @MaxLength(2200)
  text!: string;

  @IsOptional()
  @IsUrl()
  mediaUrl?: string;
}

export class CreateCommentDto {
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  text!: string;
}

export class FollowDto {
  @IsUUID()
  targetUserId!: string;
}

export class ReportDto {
  @IsIn(['post', 'user'])
  entityType!: 'post' | 'user';

  @IsString()
  @MinLength(1)
  entityId!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(200)
  reason!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  details?: string;
}

export class BlockDto {
  @IsUUID()
  targetUserId!: string;
}
