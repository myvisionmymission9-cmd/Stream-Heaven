import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT ?? '3009', 10),
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? 'dev-access-secret-change-in-prod',
  redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
}));
