import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './modules/profile/profile.module';
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
    ProfileModule,
    HealthModule,
  ],
})
export class AppModule {}
