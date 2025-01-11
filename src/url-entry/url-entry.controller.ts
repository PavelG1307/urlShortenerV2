import {
  BadRequestException,
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
import { UrlClickService } from 'src/url-click/url-click.service';
import { RealIp } from 'nestjs-real-ip';

@Controller()
export class UrlEntryController {
  constructor(
    private readonly urlEntryService: UrlEntryService,
    private readonly urlClickService: UrlClickService,
  ) {}

  @Post('/shorten')
  async createShortUrl(
    @Body() body: CreateShortUrlRequestBodyDto,
  ): Promise<CreateShortUrlResponseDto> {
    const { originalUrl, expiresAt, alias } = body;
    const sameEntry = await this.urlEntryService.getSameUrlEntry({
      originalUrl,
      expiresAt,
      alias,
    });

    if (sameEntry) {
      const shortUrl = this.urlEntryService.makeShortUrl(sameEntry.key);
      return { shortUrl };
    }

    if (alias) {
      const sameNamedEntry = await this.urlEntryService.getUrlEntry(alias);
      if (sameNamedEntry) {
        throw new BadRequestException('Alias is not available');
      }
    }

    return this.urlEntryService.createShortUrl({
      originalUrl,
      expiresAt,
      alias,
    });
  }

  @Get('/:key')
  async handleRedirect(
    @Param('key') key: string,
    @Res() res: Response,
    @RealIp() ip: string,
  ) {
    const entry = await this.urlEntryService.getUrlEntry(key);
    if (!entry || entry.isDeleted()) {
      throw new NotFoundException('URL not found');
    }

    if (entry.isExpired()) {
      throw new GoneException('URL expired');
    }

    await this.urlClickService.createUrlClickEntry(key, ip);

    res.redirect(entry.originalUrl);
  }

  @Get('/info/:key')
  async getUrlInfo(@Param('key') key: string) {
    const entry = await this.urlEntryService.getUrlEntry(key);
    if (!entry || entry.isDeleted()) {
      throw new NotFoundException('URL not found');
    }

    if (entry.isExpired()) {
      throw new GoneException('URL expired');
    }

    const clickCount = await this.urlEntryService.getUrlClickCount(key);

    return {
      originalUrl: entry.originalUrl,
      createdAt: entry.createdAt,
      clickCount,
    };
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
