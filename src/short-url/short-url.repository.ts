import { EntityRepository, Repository } from 'typeorm';
import { ShortUrl } from './short-url.entity';
import { ShortUrlRequestDto } from './short-url-dto.interface';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as shortid from 'shortid';

@EntityRepository(ShortUrl)
export class ShortUrlRepository extends Repository<ShortUrl> {
  async createShortUrl(shortUrlDto: ShortUrlRequestDto): Promise<ShortUrl> {
    const {
      url,
      customerEmail,
      customerIpAddress,
      customerUserAgent,
    } = shortUrlDto;

    shortid.characters(
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_',
    );

    const shortUrl = this.create();
    shortUrl.shortUrlCode = shortid.generate().replace(/[^A-Za-z0-9]/g, '');
    shortUrl.originalUrl = url;
    shortUrl.customerEmail = customerEmail;
    shortUrl.customerIpAddress = customerIpAddress;
    shortUrl.customerUserAgent = customerUserAgent;

    const expDate = new Date();
    expDate.setMinutes(expDate.getMinutes() + Number(process.env.EXP_TIME));
    console.log(expDate);
    shortUrl.expireAt = new Date(expDate);

    try {
      await shortUrl.save();
      return shortUrl;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('ShortUrlCode já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário no banco de dados ' + error.toString(),
        );
      }
    }
  }
}
