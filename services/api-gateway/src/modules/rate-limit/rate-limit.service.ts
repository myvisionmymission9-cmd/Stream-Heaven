import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './rate-limit.constants';

@Injectable()
export class RateLimitService {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async check(
    key: string,
    limit: number,
    windowSeconds: number,
  ): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
    const redisKey = `sh:ratelimit:gateway:${key}`;
    const count = await this.redis.incr(redisKey);
    if (count === 1) {
      await this.redis.expire(redisKey, windowSeconds);
    }
    const ttl = await this.redis.ttl(redisKey);
    const resetAt = Date.now() + ttl * 1000;
    return {
      allowed: count <= limit,
      remaining: Math.max(0, limit - count),
      resetAt,
    };
  }
}
