import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { DeviceEntity } from './entities/device.entity';
import { OtpCodeEntity } from './entities/otp-code.entity';
import { RefreshTokenEntity } from './entities/refresh-token.entity';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [UserEntity, DeviceEntity, OtpCodeEntity, RefreshTokenEntity],
  migrations: ['src/database/migrations/*.ts'],
});
