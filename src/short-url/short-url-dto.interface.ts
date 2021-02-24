export interface ShortUrlRequestDto {
  url: string;
  customerEmail: string;
  customerIpAddress: string;
  customerUserAgent: string;
}

export interface ShortUrlResponseDto {
  newUrl: string;
  expireAt: Date;
}
