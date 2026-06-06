import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HealthService {
  constructor(private readonly config: ConfigService) {}

  check() {
    return { status: 'ok', service: 'api-gateway' };
  }

  async aggregate() {
    const services = [
      { name: 'auth-service', url: this.config.get('app.authServiceUrl') },
      { name: 'user-service', url: this.config.get('app.userServiceUrl') },
    ];

    const results = await Promise.allSettled(
      services.map(async (s) => {
        const res = await axios.get(`${s.url}/v1/health`, { timeout: 3000 });
        return { name: s.name, status: res.data.status ?? 'ok' };
      }),
    );

    const downstream = results.map((r, i) =>
      r.status === 'fulfilled'
        ? r.value
        : { name: services[i].name, status: 'unreachable' },
    );

    const allOk = downstream.every((d) => d.status === 'ok' || d.status === 'ready');
    return {
      status: allOk ? 'ready' : 'degraded',
      gateway: 'ok',
      services: downstream,
    };
  }
}
