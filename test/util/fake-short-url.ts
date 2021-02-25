export class FakeShortUrl {
  createFakeShortUrlRequestDto() {
    return {
      customerEmail: 'mock@email.com',
      url: 'http://google.com',
      customerIpAddress: '192.168.0.1',
      customerUserAgent: 'PostmanRuntime/7.26.8',
    };
  }

  createFakeShortUrl() {
    return {
      shortUrlCode: 'j9Xv6BCFf',
      originalUrl: 'http://google.com',
      customerEmail: 'mock@email.com',
      customerIpAddress: '192.168.0.1',
      customerUserAgent: 'PostmanRuntime/7.26.8',
      expireAt: '2021-02-25T12:49:46.776Z',
      id: '48a1da16-39d6-4b60-a96b-4040f0570ceb',
      createdAt: '2021-02-25T15:39:46.793Z',
      updatedAt: '2021-02-25T15:39:46.793Z',
    };
  }
}
