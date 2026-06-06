import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { SessionModule } from './modules/session/session.module';
import { HealthModule } from './modules/health/health.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres' as const,
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV === 'development',
        logging: process.env.NODE_ENV === 'development',
      }),
    }),
    AuthModule,
    SessionModule,
    HealthModule,
  ],
})
export class AppModule {}
