import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT ?? '3001', 10),
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? 'dev-access-secret-change-in-prod',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? 'dev-refresh-secret-change-in-prod',
  jwtAccessTtlSeconds: parseInt(process.env.JWT_ACCESS_TTL_SECONDS ?? '900', 10),
  jwtRefreshTtlSeconds: parseInt(process.env.JWT_REFRESH_TTL_SECONDS ?? '2592000', 10),
  redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
  otpTtlSeconds: parseInt(process.env.OTP_TTL_SECONDS ?? '300', 10),
  otpMaxAttempts: parseInt(process.env.OTP_MAX_ATTEMPTS ?? '3', 10),
  otpRateLimitPerHour: parseInt(process.env.OTP_RATE_LIMIT_PER_HOUR ?? '5', 10),
  phoneEncryptionKey:
    process.env.PHONE_ENCRYPTION_KEY ??
    '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
  firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  smsProvider: process.env.SMS_PROVIDER ?? 'mock',
}));
