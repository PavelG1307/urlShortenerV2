import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString, IsUrl } from 'class-validator';
import { IsDateInFuture } from 'src/decorators/is-date-in-future.decorator';

export class CreateShortUrlResponseDto {
  shortUrl: string;
}

export class CreateShortUrlRequestBodyDto {
  @ApiProperty({
    description: 'Оригинальный URL',
    example: 'https://ya.ru',
  })
  @IsUrl()
  readonly originalUrl: string;

  @ApiProperty({
    description: 'Дата окончания действия ссылки',
    example: '2025-01-10T17:20:39.219Z',
    required: false,
  })
  @Transform(({ value }) => (value ? new Date(value) : null))
  @IsDate()
  @IsOptional()
  @IsDateInFuture()
  readonly expiresAt?: Date;

  @ApiProperty({
    description: 'Кастомный alias',
    example: 'my-custom-alias',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly alias?: string;
}
