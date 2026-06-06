import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { ProfileEntity } from '../../database/entities/profile.entity';
import { UserDeviceEntity } from '../../database/entities/user-device.entity';
import { UpdateProfileDto, RegisterDeviceDto } from './dto/profile.dto';
import { AppId, UserRole } from '../../common/enums';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity) private readonly profiles: Repository<ProfileEntity>,
    @InjectRepository(UserDeviceEntity) private readonly devices: Repository<UserDeviceEntity>,
  ) {}

  private toResponse(profile: ProfileEntity) {
    return {
      userId: profile.userId,
      displayName: profile.displayName,
      handle: profile.handle,
      bio: profile.bio,
      avatarUrl: profile.avatarUrl,
      locale: profile.locale,
      apps: profile.apps,
      roles: profile.roles,
      createdAt: profile.createdAt.toISOString(),
      updatedAt: profile.updatedAt.toISOString(),
    };
  }

  async getOrCreateProfile(userId: string, rolesHeader?: string, appsHeader?: string) {
    let profile = await this.profiles.findOne({
      where: { userId, deletedAt: IsNull() },
    });

    if (!profile) {
      const roles = rolesHeader
        ? (rolesHeader.split(',') as UserRole[])
        : [UserRole.USER];
      const apps = appsHeader
        ? (appsHeader.split(',') as AppId[])
        : [AppId.SOCIAL];

      profile = this.profiles.create({
        userId,
        displayName: `User_${userId.slice(0, 8)}`,
        roles,
        apps,
        locale: 'en',
      });
      profile = await this.profiles.save(profile);
    }

    return this.toResponse(profile);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const profile = await this.profiles.findOne({ where: { userId, deletedAt: IsNull() } });
    if (!profile) {
      throw new NotFoundException({ code: 'PROFILE_NOT_FOUND', message: 'Profile not found' });
    }

    if (dto.handle && dto.handle !== profile.handle) {
      const existing = await this.profiles.findOne({ where: { handle: dto.handle } });
      if (existing) {
        throw new ConflictException({ code: 'HANDLE_TAKEN', message: 'Handle already in use' });
      }
    }

    Object.assign(profile, dto);
    const saved = await this.profiles.save(profile);
    return this.toResponse(saved);
  }

  async getPublicProfile(userId: string) {
    const profile = await this.profiles.findOne({ where: { userId, deletedAt: IsNull() } });
    if (!profile) {
      throw new NotFoundException({ code: 'PROFILE_NOT_FOUND', message: 'Profile not found' });
    }
    return {
      userId: profile.userId,
      displayName: profile.displayName,
      handle: profile.handle,
      avatarUrl: profile.avatarUrl,
    };
  }

  async registerDevice(userId: string, deviceId: string | undefined, dto: RegisterDeviceDto) {
    let device: UserDeviceEntity;
    if (deviceId) {
      device = await this.devices.findOne({ where: { id: deviceId, userId } }) ?? this.devices.create({ id: deviceId, userId });
    } else {
      device = this.devices.create({ userId });
    }
    device.platform = dto.platform;
    device.pushToken = dto.pushToken;
    device.appVersion = dto.appVersion ?? null;
    const saved = await this.devices.save(device);
    return {
      deviceId: saved.id,
      registeredAt: saved.updatedAt.toISOString(),
    };
  }
}
