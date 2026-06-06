import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitUserSchema1730000000001 implements MigrationInterface {
  name = 'InitUserSchema1730000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE app_id AS ENUM ('social', 'livestream', 'astro', 'media');
      CREATE TYPE user_role AS ENUM ('USER', 'CREATOR', 'MODERATOR', 'ADMIN');
      CREATE TYPE privacy_level AS ENUM ('public', 'followers', 'private');
    `);

    await queryRunner.query(`
      CREATE TABLE profiles (
        user_id UUID PRIMARY KEY,
        display_name VARCHAR(64) NOT NULL,
        handle VARCHAR(30) UNIQUE,
        bio VARCHAR(500),
        avatar_url TEXT,
        locale VARCHAR(5) NOT NULL DEFAULT 'en',
        apps app_id[] NOT NULL DEFAULT '{social}',
        roles user_role[] NOT NULL DEFAULT '{USER}',
        privacy_level privacy_level NOT NULL DEFAULT 'public',
        deleted_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE UNIQUE INDEX idx_profiles_handle ON profiles(handle) WHERE handle IS NOT NULL;
    `);

    await queryRunner.query(`
      CREATE TABLE user_devices (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL,
        platform VARCHAR(16) NOT NULL,
        push_token TEXT NOT NULL,
        app_version VARCHAR(32),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX idx_user_devices_user_id ON user_devices(user_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS user_devices`);
    await queryRunner.query(`DROP TABLE IF EXISTS profiles`);
    await queryRunner.query(`DROP TYPE IF EXISTS privacy_level`);
    await queryRunner.query(`DROP TYPE IF EXISTS user_role`);
    await queryRunner.query(`DROP TYPE IF EXISTS app_id`);
  }
}
