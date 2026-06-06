import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { createHash, randomBytes } from 'crypto';
import { UserRole, AppId } from '../../common/enums';

export interface JwtPayload {
  sub: string;
  userId: string;
  roles: UserRole[];
  appAccess: AppId[];
  type: 'access' | 'refresh';
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

@Injectable()
export class ShJwtService {
  constructor(
    private readonly jwt: NestJwtService,
    private readonly config: ConfigService,
  ) {}

  issueTokens(user: {
    id: string;
    roles: UserRole[];
    appAccess: AppId[];
  }): TokenPair {
    const accessTtl = this.config.get<number>('app.jwtAccessTtlSeconds') ?? 900;
    const refreshTtl = this.config.get<number>('app.jwtRefreshTtlSeconds') ?? 2592000;

    const accessPayload: JwtPayload = {
      sub: user.id,
      userId: user.id,
      roles: user.roles,
      appAccess: user.appAccess,
      type: 'access',
    };

    const refreshPayload: JwtPayload = {
      ...accessPayload,
      type: 'refresh',
    };

    const accessToken = this.jwt.sign(accessPayload, {
      secret: this.config.get<string>('app.jwtAccessSecret'),
      expiresIn: accessTtl,
    });

    const refreshToken = this.jwt.sign(refreshPayload, {
      secret: this.config.get<string>('app.jwtRefreshSecret'),
      expiresIn: refreshTtl,
    });

    return { accessToken, refreshToken, expiresIn: accessTtl };
  }

  verifyAccessToken(token: string): JwtPayload {
    const payload = this.jwt.verify<JwtPayload>(token, {
      secret: this.config.get<string>('app.jwtAccessSecret'),
    });
    if (payload.type !== 'access') {
      throw new Error('Invalid token type');
    }
    return payload;
  }

  verifyRefreshToken(token: string): JwtPayload {
    const payload = this.jwt.verify<JwtPayload>(token, {
      secret: this.config.get<string>('app.jwtRefreshSecret'),
    });
    if (payload.type !== 'refresh') {
      throw new Error('Invalid token type');
    }
    return payload;
  }

  hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  generateRefreshTokenRaw(): string {
    return randomBytes(32).toString('hex');
  }
}
