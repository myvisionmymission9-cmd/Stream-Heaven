import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { HealthService } from './health.service';
import appConfig from '../../config/app.config';

describe('HealthService', () => {
  let healthService: HealthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [appConfig] })],
      providers: [HealthService],
    }).compile();

    healthService = module.get(HealthService);
  });

  it('returns ok status for gateway health check', () => {
    expect(healthService.check()).toEqual({ status: 'ok', service: 'api-gateway' });
  });
});
