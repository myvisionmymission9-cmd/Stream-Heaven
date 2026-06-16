import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { GatewayAuthGuard } from '../../common/guards/gateway-auth.guard';
import { UploadIntentDto } from './dto/media.dto';
import { MediaService } from './media.service';

@Controller('media')
@UseGuards(GatewayAuthGuard)
export class MediaController {
  constructor(private readonly media: MediaService) {}

  @Post('upload-intent')
  createUploadIntent(@Body() dto: UploadIntentDto) {
    return this.media.createUploadIntent(dto);
  }

  @Get(':assetId')
  getAsset(@Param('assetId') assetId: string) {
    return this.media.getAsset(assetId);
  }

  @Get(':assetId/thumbnail')
  getThumbnail(
    @Param('assetId') assetId: string,
    @Query('size') size?: 'sm' | 'md' | 'lg',
  ) {
    return this.media.getThumbnail(assetId, size ?? 'md');
  }
}
