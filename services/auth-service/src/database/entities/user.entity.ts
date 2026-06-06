import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole, AppId } from '../../common/enums';
import { DeviceEntity } from './device.entity';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'firebase_uid', type: 'varchar', length: 128, nullable: true, unique: true })
  firebaseUid!: string | null;

  @Column({ name: 'phone_hash', type: 'varchar', length: 64, nullable: true, unique: true })
  phoneHash!: string | null;

  @Column({ name: 'phone_encrypted', type: 'text', nullable: true })
  phoneEncrypted!: string | null;

  @Column({ type: 'enum', enum: UserRole, array: true, default: [UserRole.USER] })
  roles!: UserRole[];

  @Column({ name: 'app_access', type: 'enum', enum: AppId, array: true, default: [AppId.SOCIAL] })
  appAccess!: AppId[];

  @Column({ default: 'en', length: 5 })
  locale!: string;

  @Column({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt!: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @OneToMany(() => DeviceEntity, (d) => d.user)
  devices!: DeviceEntity[];

  @OneToMany(() => RefreshTokenEntity, (r) => r.user)
  refreshTokens!: RefreshTokenEntity[];
}
