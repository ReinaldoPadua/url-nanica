import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';
import { ConfigModuleLocal } from './config/config.module';
import { ShortUrlModule } from './short-url/short-url.module';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './config/winston.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: process.env.ENV === 'PRD' ? false : true,
    }),
    TypeOrmModule.forRoot(new ConfigService().getTypeORMConfig()),
    ConfigModuleLocal,
    ShortUrlModule,
    WinstonModule.forRoot(winstonConfig),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
