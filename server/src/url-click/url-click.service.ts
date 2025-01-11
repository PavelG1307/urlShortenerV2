import { Injectable } from '@nestjs/common';
import { UrlClick } from '../models/url-click.model';

@Injectable()
export class UrlClickService {
  async createUrlClickEntry(alias: string, ip: string) {
    await UrlClick.create({ alias, ip });
  }
}
