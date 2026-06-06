import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitAuthSchema1730000000001 implements MigrationInterface {
  name = 'InitAuthSchema1730000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE user_role AS ENUM ('USER', 'CREATOR', 'MODERATOR', 'ADMIN');
      CREATE TYPE app_id AS ENUM ('social', 'livestream', 'astro', 'media');
    `);

    await queryRunner.query(`
      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        firebase_uid VARCHAR(128) UNIQUE,
        phone_hash VARCHAR(64) UNIQUE,
        phone_encrypted TEXT,
        roles user_role[] NOT NULL DEFAULT '{USER}',
        app_access app_id[] NOT NULL DEFAULT '{social}',
        locale VARCHAR(5) NOT NULL DEFAULT 'en',
        deleted_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE devices (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        device_fingerprint VARCHAR(128),
        platform VARCHAR(16) NOT NULL,
        push_token TEXT,
        last_seen_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX idx_devices_user_id ON devices(user_id);
    `);

    await queryRunner.query(`
      CREATE TABLE otp_codes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        request_id UUID NOT NULL UNIQUE,
        phone_hash VARCHAR(64) NOT NULL,
        code_hash VARCHAR(128) NOT NULL,
        attempts INT NOT NULL DEFAULT 0,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE UNIQUE INDEX idx_otp_phone_hash ON otp_codes(phone_hash);
    `);

    await queryRunner.query(`
      CREATE TABLE refresh_tokens (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        device_id UUID,
        token_hash VARCHAR(128) NOT NULL,
        expires_at TIMESTAMPTZ NOT NULL,
        revoked_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
      CREATE UNIQUE INDEX idx_refresh_tokens_token_hash ON refresh_tokens(token_hash);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS refresh_tokens`);
    await queryRunner.query(`DROP TABLE IF EXISTS otp_codes`);
    await queryRunner.query(`DROP TABLE IF EXISTS devices`);
    await queryRunner.query(`DROP TABLE IF EXISTS users`);
    await queryRunner.query(`DROP TYPE IF EXISTS app_id`);
    await queryRunner.query(`DROP TYPE IF EXISTS user_role`);
  }
}
