import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';
import { ConfigModuleLocal } from './config/config.module';
import { ShortUrlModule } from './short-url/short-url.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: process.env.ENV === 'PRD' ? false : true,
    }),
    TypeOrmModule.forRoot(new ConfigService().getTypeORMConfig()),
    ConfigModuleLocal,
    ShortUrlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
