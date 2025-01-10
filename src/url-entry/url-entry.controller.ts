import {
  Body,
  Controller,
  Delete,
  Get,
  GoneException,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UrlEntryService } from './url-entry.service';
import {
  CreateShortUrlRequestBodyDto,
  CreateShortUrlResponseDto,
} from './dto/create-short-url.dto';
import { Response } from 'express';

@Controller()
export class UrlEntryController {
  constructor(private readonly urlEntryService: UrlEntryService) {}

  @Post('/shorten')
  async createShortUrl(
    @Body() body: CreateShortUrlRequestBodyDto,
  ): Promise<CreateShortUrlResponseDto> {
    const sameEntry = await this.urlEntryService.getSameUrlEntry(
      body.originalUrl,
      body.expiresAt,
    );

    if (sameEntry) {
      const shortUrl = this.urlEntryService.makeShortUrl(sameEntry.key);
      return { shortUrl };
    }

    return this.urlEntryService.createShortUrl(
      body.originalUrl,
      body.expiresAt,
    );
  }

  @Get('/:key')
  async handleRedirect(@Param('key') key: string, @Res() res: Response) {
    const entry = await this.urlEntryService.getUrlEntry(key);
    if (!entry || entry.isDeleted()) {
      throw new NotFoundException('URL not found');
    }

    if (entry.isExpired()) {
      throw new GoneException('URL expired');
    }

    // TODO: аналитика

    res.redirect(entry.originalUrl);
  }

  @Delete('/:key')
  async deleteUrlEntry(@Param('key') key: string) {
    const entry = await this.urlEntryService.getUrlEntry(key);
    if (!entry || entry.isDeleted()) {
      throw new NotFoundException('URL not found');
    }

    await this.urlEntryService.deleteUrlEntry(entry);
  }
}
