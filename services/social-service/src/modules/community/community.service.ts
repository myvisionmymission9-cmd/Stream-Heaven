import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateCommunityDto } from './dto/community.dto';

type CommunityRecord = {
  communityId: string;
  name: string;
  description?: string;
  visibility: string;
  memberCount: number;
  ownerUserId: string;
  createdAt: string;
};

@Injectable()
export class CommunityService {
  private readonly communities = new Map<string, CommunityRecord>();

  listCommunities(q?: string, limit = 20) {
    const capped = Math.max(1, Math.min(limit, 50));
    let items = [...this.communities.values()];
    if (q?.trim()) {
      const needle = q.trim().toLowerCase();
      items = items.filter(
        (c) =>
          c.name.toLowerCase().includes(needle) ||
          (c.description?.toLowerCase().includes(needle) ?? false),
      );
    }
    return {
      items: items.slice(0, capped).map((c) => this.toSummary(c)),
      pagination: { nextCursor: null, hasMore: false, limit: capped },
    };
  }

  createCommunity(ownerUserId: string, dto: CreateCommunityDto) {
    const communityId = randomUUID();
    const record: CommunityRecord = {
      communityId,
      name: dto.name,
      description: dto.description,
      visibility: dto.visibility,
      memberCount: 1,
      ownerUserId,
      createdAt: new Date().toISOString(),
    };
    this.communities.set(communityId, record);
    return this.toDetail(record);
  }

  getCommunity(communityId: string) {
    const record = this.communities.get(communityId);
    if (!record) {
      throw new NotFoundException({
        code: 'COMMUNITY_NOT_FOUND',
        message: 'Community not found',
      });
    }
    return this.toDetail(record);
  }

  joinCommunity(communityId: string, userId: string) {
    const record = this.communities.get(communityId);
    if (!record) {
      throw new NotFoundException({
        code: 'COMMUNITY_NOT_FOUND',
        message: 'Community not found',
      });
    }
    record.memberCount += 1;
    this.communities.set(communityId, record);
    return {
      communityId,
      userId,
      role: 'MEMBER',
      joinedAt: new Date().toISOString(),
    };
  }

  private toSummary(record: CommunityRecord) {
    return {
      communityId: record.communityId,
      name: record.name,
      description: record.description,
      visibility: record.visibility,
      memberCount: record.memberCount,
    };
  }

  private toDetail(record: CommunityRecord) {
    return {
      ...this.toSummary(record),
      ownerUserId: record.ownerUserId,
      createdAt: record.createdAt,
    };
  }
}
