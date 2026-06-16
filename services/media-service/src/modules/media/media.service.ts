import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UploadIntentDto } from './dto/media.dto';

type MediaAssetRecord = {
  assetId: string;
  status: 'UPLOADING' | 'PROCESSING' | 'READY' | 'FAILED';
  mimeType: string;
  createdAt: string;
  readyAt?: string;
  playbackUrl?: string;
  thumbnailUrl?: string;
  durationSeconds?: number;
  fileSizeBytes?: number;
};

@Injectable()
export class MediaService {
  private readonly assets = new Map<string, MediaAssetRecord>();

  createUploadIntent(dto: UploadIntentDto) {
    const assetId = randomUUID();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    const record: MediaAssetRecord = {
      assetId,
      status: 'UPLOADING',
      mimeType: dto.mimeType,
      createdAt: new Date().toISOString(),
      fileSizeBytes: dto.fileSizeBytes,
      durationSeconds: dto.durationSeconds,
    };
    this.assets.set(assetId, record);

    return {
      assetId,
      uploadUrl: `https://uploads.dev.streamheaven.app/stub/${assetId}?expires=${encodeURIComponent(expiresAt)}`,
      uploadMethod: 'PUT',
      expiresAt,
      maxFileSizeBytes: dto.fileSizeBytes,
    };
  }

  getAsset(assetId: string) {
    const asset = this.assets.get(assetId);
    if (!asset) {
      throw new NotFoundException({
        code: 'MEDIA_ASSET_NOT_FOUND',
        message: 'Media asset not found',
      });
    }

    if (asset.status === 'UPLOADING') {
      asset.status = 'READY';
      asset.readyAt = new Date().toISOString();
      asset.playbackUrl = `https://cdn.dev.streamheaven.app/hls/${assetId}/master.m3u8`;
      asset.thumbnailUrl = `https://cdn.dev.streamheaven.app/thumbnails/${assetId}/md.jpg`;
      this.assets.set(assetId, asset);
    }

    return {
      assetId: asset.assetId,
      status: asset.status,
      mimeType: asset.mimeType,
      playbackUrl: asset.playbackUrl,
      hlsVariants: asset.playbackUrl
        ? [
            { resolution: '480p', bandwidth: 1200000, url: asset.playbackUrl },
            { resolution: '720p', bandwidth: 2500000, url: asset.playbackUrl.replace('master.m3u8', '720p.m3u8') },
          ]
        : undefined,
      thumbnailUrl: asset.thumbnailUrl,
      durationSeconds: asset.durationSeconds,
      fileSizeBytes: asset.fileSizeBytes,
      createdAt: asset.createdAt,
      readyAt: asset.readyAt,
    };
  }

  getThumbnail(assetId: string, size: 'sm' | 'md' | 'lg' = 'md') {
    const asset = this.assets.get(assetId);
    if (!asset) {
      throw new NotFoundException({
        code: 'MEDIA_ASSET_NOT_FOUND',
        message: 'Media asset not found',
      });
    }

    return {
      assetId,
      thumbnailUrl: `https://cdn.dev.streamheaven.app/thumbnails/${assetId}/${size}.jpg`,
      size,
    };
  }
}
