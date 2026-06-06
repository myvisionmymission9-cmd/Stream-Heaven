import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { Request, Response, NextFunction } from 'express';
import { ProxyController } from './proxy.controller';

const PUBLIC_AUTH_PATHS = new Set([
  '/v1/auth/otp/send',
  '/v1/auth/otp/verify',
  '/v1/auth/firebase/exchange',
  '/v1/auth/token/refresh',
]);

@Module({
  imports: [JwtModule.register({})],
  controllers: [ProxyController],
})
export class ProxyModule implements NestModule {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  private attachUserHeaders(req: Request) {
    const auth = req.headers.authorization;
    if (!auth?.startsWith('Bearer ')) return;

    try {
      const payload = this.jwt.verify<{
        userId: string;
        roles: string[];
        appAccess: string[];
        type: string;
      }>(auth.slice(7), {
        secret: this.config.get<string>('app.jwtAccessSecret'),
      });
      if (payload.type === 'access') {
        req.headers['x-user-id'] = payload.userId;
        req.headers['x-user-roles'] = payload.roles.join(',');
        req.headers['x-user-apps'] = payload.appAccess.join(',');
      }
    } catch {
      // Protected routes without valid token handled by upstream middleware
    }
  }

  configure(consumer: MiddlewareConsumer) {
    const authUrl = this.config.get<string>('app.authServiceUrl')!;
    const userUrl = this.config.get<string>('app.userServiceUrl')!;
    const socialUrl = this.config.get<string>('app.socialServiceUrl')!;
    const livestreamUrl = this.config.get<string>('app.livestreamServiceUrl')!;
    const attach = this.attachUserHeaders.bind(this);

    consumer
      .apply(
        (req: Request, res: Response, next: NextFunction) => {
          if (!PUBLIC_AUTH_PATHS.has(req.path) && req.path.startsWith('/v1/auth')) {
            attach(req);
          }
          next();
        },
        createProxyMiddleware({
          target: authUrl,
          changeOrigin: true,
          pathFilter: '/v1/auth/**',
          on: { proxyReq: fixRequestBody },
        }),
      )
      .forRoutes({ path: 'v1/auth/*', method: RequestMethod.ALL });

    consumer
      .apply(
        (req: Request, res: Response, next: NextFunction) => {
          attach(req);
          if (!req.headers['x-user-id']) {
            res.status(401).json({
              statusCode: 401,
              code: 'AUTH_MISSING_TOKEN',
              message: 'Bearer token required',
              timestamp: new Date().toISOString(),
              path: req.path,
              requestId: req.headers['x-request-id'],
            });
            return;
          }
          next();
        },
        createProxyMiddleware({
          target: userUrl,
          changeOrigin: true,
          pathFilter: '/v1/users/**',
          on: { proxyReq: fixRequestBody },
        }),
      )
      .forRoutes({ path: 'v1/users/*', method: RequestMethod.ALL });

    consumer
      .apply(
        (req: Request, res: Response, next: NextFunction) => {
          attach(req);
          if (!req.headers['x-user-id']) {
            res.status(401).json({
              statusCode: 401,
              code: 'AUTH_MISSING_TOKEN',
              message: 'Bearer token required',
              timestamp: new Date().toISOString(),
              path: req.path,
              requestId: req.headers['x-request-id'],
            });
            return;
          }
          next();
        },
        createProxyMiddleware({
          target: socialUrl,
          changeOrigin: true,
          pathFilter: '/v1/social/**',
          on: { proxyReq: fixRequestBody },
        }),
      )
      .forRoutes({ path: 'v1/social/*', method: RequestMethod.ALL });

    consumer
      .apply(
        (req: Request, res: Response, next: NextFunction) => {
          attach(req);
          if (!req.headers['x-user-id']) {
            res.status(401).json({
              statusCode: 401,
              code: 'AUTH_MISSING_TOKEN',
              message: 'Bearer token required',
              timestamp: new Date().toISOString(),
              path: req.path,
              requestId: req.headers['x-request-id'],
            });
            return;
          }
          next();
        },
        createProxyMiddleware({
          target: livestreamUrl,
          changeOrigin: true,
          pathFilter: '/v1/livestream/**',
          on: { proxyReq: fixRequestBody },
        }),
      )
      .forRoutes({ path: 'v1/livestream/*', method: RequestMethod.ALL });
  }
}
