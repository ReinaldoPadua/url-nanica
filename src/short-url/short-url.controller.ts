import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Req,
  Res,
  Get,
  Param,
} from '@nestjs/common';
import { ShortUrlRequestDto } from './short-url-dto.interface';
import { ShortUrlService } from './short-url.service';
import { Request, Response } from 'express';

@Controller()
export class ShortUrlController {
  constructor(private readonly urlShortService: ShortUrlService) {}

  @Get(':id')
  async getUrlOriginalByShortUrlCode(
    @Param('id') shortUrlCode: string,
    @Res() res: Response,
  ) {
    try {
      const originalUrl = await this.urlShortService.getOriginalUrlByShortUrlCode(
        shortUrlCode,
      );
      return res.redirect(originalUrl);
    } catch (error) {
      res.status(404).send('Not found');
    }
  }

  @Post('short-url')
  async createShortUrl(
    @Body() urlShortRequestDto: ShortUrlRequestDto,
    @Req() request: Request,
  ) {
    try {
      urlShortRequestDto.customerUserAgent = request.headers['user-agent'];
      urlShortRequestDto.customerIpAddress = (
        request.headers['x-forwarded-for'] || request.socket.remoteAddress
      ).toString();
      return await this.urlShortService.create(urlShortRequestDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
