import * as request from 'supertest';
//import * as sinon from 'sinon';
import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { ShortUrlService } from '../../src/short-url/short-url.service';
import { ShortUrlRepository } from '../../src/short-url/short-url.repository';
import { ShortUrl } from '../../src/short-url/short-url.entity';
import { FakeShortUrl } from '../util/fake-short-url';

//let sandbox: sinon.SinonSandbox;
let shortUrlRequestDto, shortUrl;

const mockShortUrlRepository = () => ({
  save: jest.fn(),
  findOne: jest.fn(),
  createShortUrl: jest.fn(),
});

describe('User', () => {
  let app: INestApplication;

  const fakeShortUrl = new FakeShortUrl();

  let shortUrlRepository;
  let service;
  const shortUrl = fakeShortUrl.createFakeShortUrl();
  const shortUrlRequestDto = fakeShortUrl.createFakeShortUrlRequestDto();

  beforeAll(async () => {
    // sandbox = sinon.createSandbox();
    // testUtil = new TestUtil(sandbox);

    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [
        ShortUrlService,
        {
          provide: ShortUrlRepository,
          useFactory: mockShortUrlRepository,
        },
      ],
    }).compile();

    shortUrlRepository = module.get<ShortUrlRepository>(ShortUrlRepository);
    service = module.get<ShortUrlService>(ShortUrlService);

    app = await NestFactory.create(AppModule);
    await app.listen(3000);
  });

  it(`/POST Create ShortURL`, () => {
    shortUrlRepository.createShortUrl.mockResolvedValue(shortUrl);
    return request(app.getHttpServer())
      .post('/short-url')
      .send(shortUrlRequestDto)
      .expect(201);
  });

  it(`/GET a original url and redirect`, () => {
    shortUrlRepository.createShortUrl.mockResolvedValue(shortUrl);
    return request(app.getHttpServer())
      .get(`/${shortUrl.shortUrlCode}`)
      .expect(302);
  });

  afterAll(async () => {
    await app.close();
  });
});
