import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('otp_codes')
@Index('idx_otp_phone_hash', ['phoneHash'], { unique: true })
export class OtpCodeEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'request_id', type: 'uuid', unique: true })
  requestId!: string;

  @Column({ name: 'phone_hash', type: 'varchar', length: 64 })
  phoneHash!: string;

  @Column({ name: 'code_hash', type: 'varchar', length: 128 })
  codeHash!: string;

  @Column({ type: 'int', default: 0 })
  attempts!: number;

  @Column({ name: 'expires_at', type: 'timestamptz' })
  expiresAt!: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
