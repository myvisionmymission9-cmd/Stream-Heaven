import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  BlockDto,
  CreateCommentDto,
  CreatePostDto,
  ReportDto,
} from './dto/social.dto';

type SocialPost = {
  postId: string;
  authorId: string;
  text: string;
  mediaUrl: string | null;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
};

@Injectable()
export class SocialService {
  createPost(userId: string, dto: CreatePostDto) {
    const now = new Date().toISOString();
    const post: SocialPost = {
      postId: randomUUID(),
      authorId: userId,
      text: dto.text,
      mediaUrl: dto.mediaUrl ?? null,
      likeCount: 0,
      commentCount: 0,
      createdAt: now,
      updatedAt: now,
    };

    return post;
  }

  getFeed(userId: string, cursor?: string, limit = 20) {
    return {
      items: [],
      page: {
        cursor: { next: null },
        hasMore: false,
      },
      meta: {
        viewerUserId: userId,
        requestCursor: cursor ?? null,
        requestLimit: limit,
      },
    };
  }

  createComment(userId: string, postId: string, dto: CreateCommentDto) {
    const now = new Date().toISOString();
    return {
      commentId: randomUUID(),
      postId,
      authorId: userId,
      text: dto.text,
      createdAt: now,
      updatedAt: now,
    };
  }

  followUser(targetUserId: string) {
    return {
      targetUserId,
      following: true,
    };
  }

  reportContent(userId: string, dto: ReportDto) {
    return {
      reportId: randomUUID(),
      status: 'queued',
      reporterUserId: userId,
      entityType: dto.entityType,
      entityId: dto.entityId,
      reason: dto.reason,
    };
  }

  blockUser(userId: string, dto: BlockDto) {
    return {
      targetUserId: dto.targetUserId,
      blocked: true,
      blockedBy: userId,
      blockedAt: new Date().toISOString(),
    };
  }
}
