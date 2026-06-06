import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { UserEntity } from '../../database/entities/user.entity';
import { RefreshTokenEntity } from '../../database/entities/refresh-token.entity';
import { DeviceEntity } from '../../database/entities/device.entity';
import { OtpService } from './otp.service';
import { ShJwtService } from './jwt.service';
import { FirebaseVerifierService } from './firebase-verifier.service';
import { SessionService } from '../session/session.service';
import { ConfigService } from '@nestjs/config';
import { AppId, UserRole } from '../../common/enums';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly users: Repository<UserEntity>,
    @InjectRepository(RefreshTokenEntity) private readonly refreshTokens: Repository<RefreshTokenEntity>,
    @InjectRepository(DeviceEntity) private readonly devices: Repository<DeviceEntity>,
    private readonly otp: OtpService,
    private readonly jwt: ShJwtService,
    private readonly firebase: FirebaseVerifierService,
    private readonly session: SessionService,
    private readonly config: ConfigService,
  ) {}

  async sendOtp(phone: string) {
    return this.otp.sendOtp(phone);
  }

  async verifyOtp(phone: string, code: string, requestId: string, deviceId?: string, appId?: AppId) {
    await this.otp.verifyOtp(phone, code, requestId);
    const phoneHash = this.otp.hashPhone(phone);
    let user = await this.users.findOne({ where: { phoneHash } });
    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      user = this.users.create({
        phoneHash,
        phoneEncrypted: this.otp.encryptPhone(phone),
        roles: [UserRole.USER],
        appAccess: appId ? [appId] : [AppId.SOCIAL],
        locale: 'en',
      });
      user = await this.users.save(user);
    } else if (appId && !user.appAccess.includes(appId)) {
      user.appAccess = [...user.appAccess, appId];
      user = await this.users.save(user);
    }

    return this.issueSession(user, deviceId, isNewUser);
  }

  async exchangeFirebase(firebaseIdToken: string, deviceId?: string, appId?: AppId) {
    let firebaseUser;
    try {
      firebaseUser = await this.firebase.verifyIdToken(firebaseIdToken);
    } catch {
      throw new UnauthorizedException({ code: 'AUTH_FIREBASE_INVALID', message: 'Invalid Firebase token' });
    }

    let user = await this.users.findOne({ where: { firebaseUid: firebaseUser.uid } });
    let isNewUser = false;

    if (!user && firebaseUser.phone) {
      const phoneHash = this.otp.hashPhone(firebaseUser.phone);
      user = await this.users.findOne({ where: { phoneHash } });
      if (user) {
        user.firebaseUid = firebaseUser.uid;
        user = await this.users.save(user);
      }
    }

    if (!user) {
      isNewUser = true;
      user = this.users.create({
        firebaseUid: firebaseUser.uid,
        phoneHash: firebaseUser.phone ? this.otp.hashPhone(firebaseUser.phone) : null,
        phoneEncrypted: firebaseUser.phone ? this.otp.encryptPhone(firebaseUser.phone) : null,
        roles: [UserRole.USER],
        appAccess: appId ? [appId] : [AppId.SOCIAL],
        locale: 'en',
      });
      user = await this.users.save(user);
    }

    return this.issueSession(user, deviceId, isNewUser);
  }

  async refresh(refreshToken: string) {
    let payload;
    try {
      payload = this.jwt.verifyRefreshToken(refreshToken);
    } catch {
      throw new UnauthorizedException({ code: 'AUTH_REFRESH_INVALID', message: 'Invalid refresh token' });
    }

    const tokenHash = this.jwt.hashToken(refreshToken);
    const stored = await this.refreshTokens.findOne({
      where: { tokenHash, userId: payload.userId },
    });

    if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
      throw new UnauthorizedException({ code: 'AUTH_REFRESH_REVOKED', message: 'Refresh token revoked or expired' });
    }

    stored.revokedAt = new Date();
    await this.refreshTokens.save(stored);

    const user = await this.users.findOne({ where: { id: payload.userId } });
    if (!user) {
      throw new HttpException({ code: 'AUTH_USER_NOT_FOUND', message: 'User not found' }, HttpStatus.NOT_FOUND);
    }

    return this.issueSession(user, stored.deviceId ?? undefined, false);
  }

  async logout(userId: string, refreshToken?: string) {
    if (refreshToken) {
      const tokenHash = this.jwt.hashToken(refreshToken);
      await this.refreshTokens.update({ tokenHash, userId }, { revokedAt: new Date() });
    } else {
      await this.refreshTokens.update({ userId, revokedAt: IsNull() }, { revokedAt: new Date() });
    }
    await this.session.deleteSession(userId);
  }

  private async issueSession(user: UserEntity, deviceId?: string, isNewUser = false) {
    const tokens = this.jwt.issueTokens(user);
    const refreshTtl = this.config.get<number>('app.jwtRefreshTtlSeconds') ?? 2592000;

    await this.refreshTokens.save({
      userId: user.id,
      deviceId: deviceId ?? null,
      tokenHash: this.jwt.hashToken(tokens.refreshToken),
      expiresAt: new Date(Date.now() + refreshTtl * 1000),
      revokedAt: null,
    });

    if (deviceId) {
      let device = await this.devices.findOne({ where: { id: deviceId, userId: user.id } });
      if (!device) {
        device = this.devices.create({
          id: deviceId,
          userId: user.id,
          platform: 'unknown',
          lastSeenAt: new Date(),
        });
      } else {
        device.lastSeenAt = new Date();
      }
      await this.devices.save(device);
    }

    await this.session.setSession(
      user.id,
      deviceId,
      { userId: user.id, issuedAt: String(Date.now()) },
      refreshTtl,
    );

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: tokens.expiresIn,
      tokenType: 'Bearer' as const,
      user: {
        userId: user.id,
        roles: user.roles,
        appAccess: user.appAccess,
        isNewUser,
      },
    };
  }
}
