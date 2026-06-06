import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? 'dev-access-secret-change-in-prod',
  authServiceUrl: process.env.AUTH_SERVICE_URL ?? 'http://localhost:3001',
  userServiceUrl: process.env.USER_SERVICE_URL ?? 'http://localhost:3002',
  socialServiceUrl: process.env.SOCIAL_SERVICE_URL ?? 'http://localhost:3003',
  livestreamServiceUrl: process.env.LIVESTREAM_SERVICE_URL ?? 'http://localhost:3004',
  realtimeGatewayUrl: process.env.REALTIME_GATEWAY_URL ?? 'http://localhost:3009',
  redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
  rateLimitAnonymous: parseInt(process.env.RATE_LIMIT_ANONYMOUS ?? '30', 10),
  rateLimitAuthenticated: parseInt(process.env.RATE_LIMIT_AUTHENTICATED ?? '300', 10),
}));
