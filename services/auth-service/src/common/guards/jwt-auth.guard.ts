import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtPayload } from '../../modules/auth/jwt.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request & { user?: JwtPayload }>();
    const auth = req.headers.authorization;
    if (!auth?.startsWith('Bearer ')) {
      throw new UnauthorizedException({ code: 'AUTH_MISSING_TOKEN', message: 'Bearer token required' });
    }
    const token = auth.slice(7);
    try {
      req.user = this.jwtService.verify<JwtPayload>(token, {
        secret: this.config.get<string>('app.jwtAccessSecret'),
      });
      return true;
    } catch {
      throw new UnauthorizedException({ code: 'AUTH_INVALID_TOKEN', message: 'Invalid or expired token' });
    }
  }
}
