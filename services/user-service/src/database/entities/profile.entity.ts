import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { AppId, UserRole, PrivacyLevel } from '../../common/enums';

@Entity('profiles')
export class ProfileEntity {
  @PrimaryColumn('uuid', { name: 'user_id' })
  userId!: string;

  @Column({ name: 'display_name', length: 64 })
  displayName!: string;

  @Index('idx_profiles_handle', { unique: true, where: 'handle IS NOT NULL' })
  @Column({ type: 'varchar', length: 30, nullable: true })
  handle!: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  bio!: string | null;

  @Column({ name: 'avatar_url', type: 'text', nullable: true })
  avatarUrl!: string | null;

  @Column({ length: 5, default: 'en' })
  locale!: string;

  @Column({ type: 'enum', enum: AppId, array: true, default: [AppId.SOCIAL] })
  apps!: AppId[];

  @Column({ type: 'enum', enum: UserRole, array: true, default: [UserRole.USER] })
  roles!: UserRole[];

  @Column({ name: 'privacy_level', type: 'enum', enum: PrivacyLevel, default: PrivacyLevel.PUBLIC })
  privacyLevel!: PrivacyLevel;

  @Column({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt!: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
