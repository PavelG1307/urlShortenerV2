import { Injectable } from '@nestjs/common';
import { UrlClick } from 'src/models/url-click.model';

@Injectable()
export class UrlClickService {
  async createUrlClickEntry(key: string, ip: string) {
    await UrlClick.create({ key, ip });
  }
}
