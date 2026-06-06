import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('devices')
@Index('idx_devices_user_id', ['userId'])
export class DeviceEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @Column({ name: 'device_fingerprint', type: 'varchar', length: 128, nullable: true })
  deviceFingerprint!: string | null;

  @Column({ type: 'varchar', length: 16 })
  platform!: string;

  @Column({ name: 'push_token', type: 'text', nullable: true })
  pushToken!: string | null;

  @Column({ name: 'last_seen_at', type: 'timestamptz', nullable: true })
  lastSeenAt!: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne(() => UserEntity, (u) => u.devices, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;
}
