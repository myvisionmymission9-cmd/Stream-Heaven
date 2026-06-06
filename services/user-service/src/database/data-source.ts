import { DataSource } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { UserDeviceEntity } from './entities/user-device.entity';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [ProfileEntity, UserDeviceEntity],
  migrations: ['src/database/migrations/*.ts'],
});
