import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/common';
import { ShortUrlRepository } from '../../src/short-url/short-url.repository';
import { ShortUrlService } from '../../src/short-url/short-url.service';
import { ShortUrlRequestDto } from '../../src/short-url/short-url-dto.interface';
import { FakeShortUrl } from '../util/fake-short-url';

const mockShortUrlRepository = () => ({
  save: jest.fn(),
  findOne: jest.fn(),
  createShortUrl: jest.fn(),
});

describe('ShortUrlService', () => {
  let shortUrlRepository;
  let service;
  let shortUrl;

  beforeEach(async () => {
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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(shortUrlRepository).toBeDefined();
  });

  describe('createShortUrl', () => {
    let shortUrlRequestDto: ShortUrlRequestDto;

    beforeEach(() => {
      const fakeShortUrl = new FakeShortUrl();

      shortUrlRequestDto = fakeShortUrl.createFakeShortUrlRequestDto();

      shortUrl = fakeShortUrl.createFakeShortUrl();
    });

    it('should create a shorturl', async () => {
      shortUrlRepository.createShortUrl.mockResolvedValue(shortUrl);
      const result = await service.create(shortUrlRequestDto);
      expect(result).toHaveProperty('expireAt');
      expect(result).toHaveProperty('newUrl');
      expect(result.expireAt).toBe(shortUrl.expireAt);
      expect(result.newUrl.includes(shortUrl.shortUrlCode)).toBe(true);
    });

    it('should return a original url', async () => {
      shortUrlRepository.findOne.mockResolvedValue(shortUrl);
      const result = await service.getOriginalUrlByShortUrlCode(
        shortUrl.shortUrlCode,
      );
      expect(result).toBeDefined();
      expect(result).toBe(shortUrl.originalUrl);
    });
  });
});
