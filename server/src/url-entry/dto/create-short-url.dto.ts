import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsAlphanumeric,
  IsDate,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { IsDateInFuture } from '../../decorators/is-date-in-future.decorator';
import { MAX_ALIAS_LENGTH } from '../../core/constants/alias';

export class CreateShortUrlResponseDto {
  shortUrl: string;
}

export class CreateShortUrlRequestBodyDto {
  @ApiProperty({
    description: 'Оригинальный URL',
    example: 'https://ya.ru',
  })
  @IsUrl()
  @Transform(({ value }) =>
    value.includes('http') ? value : `https://${value}`,
  )
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
  @MaxLength(MAX_ALIAS_LENGTH)
  @IsAlphanumeric()
  @IsOptional()
  readonly alias?: string;
}
