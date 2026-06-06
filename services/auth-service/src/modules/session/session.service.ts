import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './session.constants';

@Injectable()
export class SessionService {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  sessionKey(userId: string, deviceId?: string): string {
    return deviceId
      ? `sh:auth:session:${userId}:${deviceId}`
      : `sh:auth:session:${userId}`;
  }

  async setSession(
    userId: string,
    deviceId: string | undefined,
    data: Record<string, string>,
    ttlSeconds: number,
  ): Promise<void> {
    const key = this.sessionKey(userId, deviceId);
    await this.redis.hset(key, data);
    await this.redis.expire(key, ttlSeconds);
  }

  async deleteSession(userId: string, deviceId?: string): Promise<void> {
    await this.redis.del(this.sessionKey(userId, deviceId));
  }

  otpRateKey(phoneHash: string): string {
    return `sh:otp:rate:${phoneHash}`;
  }

  async incrementOtpRate(phoneHash: string, windowSeconds = 3600): Promise<number> {
    const key = this.otpRateKey(phoneHash);
    const count = await this.redis.incr(key);
    if (count === 1) {
      await this.redis.expire(key, windowSeconds);
    }
    return count;
  }
}
