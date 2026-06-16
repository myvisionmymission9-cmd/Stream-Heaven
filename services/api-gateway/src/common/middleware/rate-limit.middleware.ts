import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { RateLimitService } from '../../modules/rate-limit/rate-limit.service';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  constructor(
    private readonly rateLimit: RateLimitService,
    private readonly config: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const requestPath = (req.originalUrl ?? req.url ?? req.path ?? '').split('?')[0];
    if (requestPath.startsWith('/health')) {
      return next();
    }

    const hasAuth = Boolean(req.headers.authorization?.startsWith('Bearer '));
    const key = hasAuth
      ? `user:${req.headers.authorization!.slice(-16)}`
      : `ip:${req.ip ?? 'unknown'}`;

    const limit = hasAuth
      ? this.config.get<number>('app.rateLimitAuthenticated') ?? 300
      : this.config.get<number>('app.rateLimitAnonymous') ?? 30;

    const { allowed, remaining, resetAt } = await this.rateLimit.check(key, limit, 60);

    res.setHeader('X-RateLimit-Limit', String(limit));
    res.setHeader('X-RateLimit-Remaining', String(remaining));

    if (!allowed) {
      const retryAfter = Math.ceil((resetAt - Date.now()) / 1000);
      res.setHeader('Retry-After', String(retryAfter));
      throw new HttpException(
        {
          statusCode: 429,
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests',
          timestamp: new Date().toISOString(),
          path: req.path,
          requestId: req.headers['x-request-id'],
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    next();
  }
}
