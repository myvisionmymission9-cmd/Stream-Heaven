import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '../session/session.constants';

@Injectable()
export class HealthService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
  ) {}

  check() {
    return { status: 'ok', service: 'auth-service' };
  }

  async ready() {
    const checks: Record<string, string> = {};
    try {
      await this.dataSource.query('SELECT 1');
      checks.postgres = 'ok';
    } catch {
      checks.postgres = 'error';
    }
    try {
      await this.redis.ping();
      checks.redis = 'ok';
    } catch {
      checks.redis = 'error';
    }
    const healthy = Object.values(checks).every((v) => v === 'ok');
    return { status: healthy ? 'ready' : 'degraded', checks };
  }
}
