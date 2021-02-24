import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ShortUrl } from '../short-url/short-url.entity';

@Injectable()
export class ConfigService {
  public getTypeORMConfig(): TypeOrmModuleOptions {
    const type: any = process.env.DATABASE_TYPE;
    return {
      type,
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [ShortUrl],
      synchronize: true,
    };
  }
}
