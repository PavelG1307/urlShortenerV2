import { Injectable } from '@nestjs/common';
import { HashService } from '../hash/hash.service';
import { UrlEntry } from '../models/url-entry.model';
import {
  CreateShortUrlRequestBodyDto,
  CreateShortUrlResponseDto,
} from './dto/create-short-url.dto';
import { Op, WhereOptions } from 'sequelize';
import { UrlClick } from '../models/url-click.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UrlEntryService {
  constructor(
    private readonly hashService: HashService,
    private readonly configService: ConfigService,
  ) {}

  async createShortUrl(params: {
    originalUrl: string;
    expiresAt?: Date;
    alias?: string;
  }): Promise<CreateShortUrlResponseDto> {
    const { originalUrl, expiresAt, alias } = params;

    const trx = await UrlEntry.sequelize.transaction();
    try {
      const key = alias || (await this.hashService.createUniqueHash({ trx }));
      await UrlEntry.create(
        { key, originalUrl, expiresAt },
        { transaction: trx },
      );
      await trx.commit();

      return { shortUrl: this.makeShortUrl(key) };
    } catch (e) {
      await trx.rollback();

      throw e;
    }
  }

  public makeShortUrl(key: string): string {
    const apiUrl = this.configService.get<string>('apiUrl');
    return `${apiUrl}/${key}`;
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

  async getLastUrlClicks(key: string): Promise<UrlEntry | null> {
    return UrlEntry.findByPk(key);
  }

  getSameUrlEntry(params: {
    originalUrl: string;
    expiresAt?: Date;
    alias?: string;
  }) {
    const { originalUrl, expiresAt, alias } = params;

    const whereCondition: WhereOptions<UrlEntry> = {
      originalUrl,
      deletedAt: { [Op.is]: null },
      expiresAt: expiresAt || { [Op.is]: null },
    };

    if (alias) {
      whereCondition.key = alias;
    }

    return UrlEntry.findOne({
      where: whereCondition,
    });
  }

  async deleteUrlEntry(entry: UrlEntry): Promise<void> {
    entry.deletedAt = new Date();

    await entry.save();
  }

  async getUrlClickCount(key: string): Promise<number> {
    const count = await UrlClick.count({ where: { key } });

    return count;
  }
}
