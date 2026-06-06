import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('user_devices')
@Index('idx_user_devices_user_id', ['userId'])
export class UserDeviceEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @Column({ type: 'varchar', length: 16 })
  platform!: string;

  @Column({ name: 'push_token', type: 'text' })
  pushToken!: string;

  @Column({ name: 'app_version', type: 'varchar', length: 32, nullable: true })
  appVersion!: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
