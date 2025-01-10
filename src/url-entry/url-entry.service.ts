import { Injectable } from '@nestjs/common';
import { HashService } from 'src/hash/hash.service';
import { UrlEntry } from 'src/models/url-entry.model';
import {
  CreateShortUrlRequestBodyDto,
  CreateShortUrlResponseDto,
} from './dto/create-short-url.dto';
import { Op } from 'sequelize';

@Injectable()
export class UrlEntryService {
  constructor(private readonly hashService: HashService) {}

  async createShortUrl(
    originalUrl: string,
    expiresAt?: Date,
  ): Promise<CreateShortUrlResponseDto> {
    const trx = await UrlEntry.sequelize.transaction();
    try {
      const key = await this.hashService.createUniqueHash({ trx });
      await UrlEntry.create(
        { key, originalUrl, expiresAt },
        { transaction: trx },
      );
      await trx.commit();

      // TODO: взять из конфига
      return { shortUrl: this.makeShortUrl(key) };
    } catch (e) {
      await trx.rollback();

      throw e;
    }
  }

  public makeShortUrl(key: string): string {
    // TODO: взять из конфига
    return `http://localhost:3000/${key}`;
  }

  public isSameUrlEntry(
    entry: UrlEntry,
    requestBody: CreateShortUrlRequestBodyDto,
  ) {
    console.log(entry);
    if (Boolean(entry.expiresAt) !== Boolean(requestBody.expiresAt)) {
      return false;
    }

    if (!Boolean(entry.expiresAt)) {
      return true;
    }

    console.log(requestBody.expiresAt);
    return entry.expiresAt === requestBody.expiresAt;
  }

  async getUrlEntry(key: string): Promise<UrlEntry | null> {
    return UrlEntry.findByPk(key);
  }

  getSameUrlEntry(originalUrl: string, expiresAt: Date) {
    return UrlEntry.findOne({
      where: {
        originalUrl,
        deletedAt: {
          [Op.is]: null,
        },
        expiresAt: expiresAt || { [Op.is]: null },
      },
    });
  }

  async deleteUrlEntry(entry: UrlEntry): Promise<void> {
    entry.deletedAt = new Date();

    await entry.save();
  }
}
