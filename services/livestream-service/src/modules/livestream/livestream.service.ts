import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { CreateRoomDto } from './dto/livestream.dto';

type RoomStatus = 'scheduled' | 'live' | 'ended';

type LiveRoom = {
  roomId: string;
  hostUserId: string;
  title: string;
  status: RoomStatus;
  viewerCount: number;
  startedAt: string | null;
  endedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

@Injectable()
export class LivestreamService {
  private readonly rooms = new Map<string, LiveRoom>();

  constructor(private readonly config: ConfigService) {}

  createRoom(hostUserId: string, dto: CreateRoomDto) {
    const now = new Date().toISOString();
    const room: LiveRoom = {
      roomId: randomUUID(),
      hostUserId,
      title: dto.title,
      status: 'scheduled',
      viewerCount: 0,
      startedAt: null,
      endedAt: null,
      createdAt: now,
      updatedAt: now,
    };

    this.rooms.set(room.roomId, room);
    return room;
  }

  listActiveRooms(limit = 20) {
    const capped = Math.max(1, Math.min(limit, 50));
    const items = [...this.rooms.values()]
      .filter((room) => room.status !== 'ended')
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, capped);
    return { items };
  }

  startRoom(roomId: string, userId: string) {
    const room = this.requireRoom(roomId);
    const now = new Date().toISOString();
    room.status = 'live';
    room.startedAt = room.startedAt ?? now;
    room.endedAt = null;
    room.updatedAt = now;
    room.hostUserId = room.hostUserId || userId;
    this.rooms.set(roomId, room);
    return room;
  }

  joinRoom(roomId: string) {
    const room = this.requireRoom(roomId);
    room.viewerCount += 1;
    room.updatedAt = new Date().toISOString();
    this.rooms.set(roomId, room);
    return { roomId: room.roomId, viewerCount: room.viewerCount };
  }

  leaveRoom(roomId: string) {
    const room = this.requireRoom(roomId);
    room.viewerCount = Math.max(0, room.viewerCount - 1);
    room.updatedAt = new Date().toISOString();
    this.rooms.set(roomId, room);
    return { roomId: room.roomId, viewerCount: room.viewerCount };
  }

  endRoom(roomId: string) {
    const room = this.requireRoom(roomId);
    const now = new Date().toISOString();
    room.status = 'ended';
    room.viewerCount = 0;
    room.endedAt = now;
    room.updatedAt = now;
    this.rooms.set(roomId, room);
    return room;
  }

  viewerCount(roomId: string) {
    const room = this.requireRoom(roomId);
    return { roomId: room.roomId, viewerCount: room.viewerCount };
  }

  mintToken(roomId: string, role: 'host' | 'audience') {
    const room = this.requireRoom(roomId);
    const appId = this.config.get<string>('app.agoraAppId') ?? 'dev-agora-app-id';
    return {
      provider: 'agora',
      appId,
      channelName: room.roomId,
      token: `stub-${role}-${randomUUID()}`,
      expiresInSeconds: 3600,
    };
  }

  private requireRoom(roomId: string) {
    const room = this.rooms.get(roomId);
    if (!room) {
      throw new NotFoundException({
        code: 'ROOM_NOT_FOUND',
        message: `Room ${roomId} was not found`,
      });
    }
    return room;
  }
}
