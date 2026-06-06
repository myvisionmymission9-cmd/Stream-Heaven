import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

export interface GatewayJwtPayload {
  sub: string;
  userId: string;
  roles: string[];
  appAccess: string[];
  type: string;
}

@Injectable()
export class JwtValidationGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const auth = req.headers.authorization;
    if (!auth?.startsWith('Bearer ')) {
      throw new UnauthorizedException({ code: 'AUTH_MISSING_TOKEN', message: 'Bearer token required' });
    }

    try {
      const payload = this.jwt.verify<GatewayJwtPayload>(auth.slice(7), {
        secret: this.config.get<string>('app.jwtAccessSecret'),
      });
      if (payload.type !== 'access') {
        throw new Error('Invalid token type');
      }
      req.headers['x-user-id'] = payload.userId;
      (req as Request & { user: GatewayJwtPayload }).user = payload;
      return true;
    } catch {
      throw new UnauthorizedException({ code: 'AUTH_INVALID_TOKEN', message: 'Invalid or expired token' });
    }
  }
}
