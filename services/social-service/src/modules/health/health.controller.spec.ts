import { Test } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get(HealthController);
  });

  it('returns ok status for social-service health check', () => {
    expect(controller.check()).toEqual({ status: 'ok', service: 'social-service' });
  });
});
