import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('refresh_tokens')
@Index('idx_refresh_tokens_user_id', ['userId'])
@Index('idx_refresh_tokens_token_hash', ['tokenHash'], { unique: true })
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @Column({ name: 'device_id', type: 'uuid', nullable: true })
  deviceId!: string | null;

  @Column({ name: 'token_hash', type: 'varchar', length: 128 })
  tokenHash!: string;

  @Column({ name: 'expires_at', type: 'timestamptz' })
  expiresAt!: Date;

  @Column({ name: 'revoked_at', type: 'timestamptz', nullable: true })
  revokedAt!: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @ManyToOne(() => UserEntity, (u) => u.refreshTokens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;
}
