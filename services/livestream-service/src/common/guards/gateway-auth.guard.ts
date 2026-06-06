import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class GatewayAuthGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request & { userId?: string }>();

    const userId = req.headers['x-user-id'] as string | undefined;
    if (userId) {
      req.userId = userId;
      return true;
    }

    const serviceToken = req.headers['x-service-token'] as string | undefined;
    const expected = this.config.get<string>('app.internalServiceToken');
    if (serviceToken && serviceToken === expected) {
      return true;
    }

    throw new UnauthorizedException({
      code: 'AUTH_MISSING_GATEWAY_HEADERS',
      message: 'X-User-Id header required (set by api-gateway)',
    });
  }
}
