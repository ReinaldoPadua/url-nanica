import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrlRepository } from './short-url.repository';
import { ShortUrlController } from './short-url.controller';
import { ShortUrlService } from './short-url.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShortUrlRepository]),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_URL || 'localhost',
      port: Number(process.env.REDIS_PORT),
    }),
  ],
  controllers: [ShortUrlController],
  providers: [ShortUrlService],
})
export class ShortUrlModule {}
