import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ShortUrlRequestDto,
  ShortUrlResponseDto,
} from './short-url-dto.interface';
import * as validator from 'url';
import { ShortUrlRepository } from './short-url.repository';
import { ShortUrl } from './short-url.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class ShortUrlService {
  constructor(
    @InjectRepository(ShortUrlRepository)
    private shortUrlRepository: ShortUrlRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(shortUrlDto: ShortUrlRequestDto) {
    try {
      new validator.URL(shortUrlDto.url);
      const shortUrl: ShortUrl = await this.shortUrlRepository.createShortUrl(
        shortUrlDto,
      );
      this.addShortUrlToCache(shortUrl);
      return this.getShortUrlResponseDto(shortUrl);
    } catch (error) {
      throw new Error(error.toString());
    }
  }

  private getShortUrlResponseDto(shortUrl: ShortUrl): ShortUrlResponseDto {
    return {
      newUrl: `${process.env.RESPONSE_URL}/${shortUrl.shortUrlCode}`,
      expireAt: shortUrl.expireAt,
    };
  }

  async getOriginalUrlByShortUrlCode(shortUrlCode: string) {
    let shortUrl;

    try {
      shortUrl = JSON.parse(await this.cacheManager.get(shortUrlCode));
    } catch (error) {
      console.log(error);
    }

    if (!shortUrl) {
      shortUrl = await this.findShortUrl(shortUrlCode);

      if (shortUrl) this.addShortUrlToCache(shortUrl);
    }

    if (!shortUrl) throw new Error('ShortUrl não localizada!');
    if (new Date() > shortUrl.expireAt) throw new Error('URL Expirada!');

    return shortUrl.originalUrl;
  }

  private async findShortUrl(shortUrlCode: string) {
    const shortUrl = await this.shortUrlRepository.findOne({
      where: { shortUrlCode },
    });
    return {
      expireAt: shortUrl.expireAt,
      originalUrl: shortUrl.originalUrl,
    };
  }

  private findShortUrlInCache(shortUrlCode: string) {
    return shortUrlCode;
  }

  private async addShortUrlToCache(shortUrl: ShortUrl) {
    const shortUrlStringValue = JSON.stringify({
      expireAt: shortUrl.expireAt,
      originalUrl: shortUrl.originalUrl,
    });
    await this.cacheManager.set(shortUrl.shortUrlCode, shortUrlStringValue, {
      ttl: 60000,
    });
  }
}
