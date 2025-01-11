import { Injectable } from '@nestjs/common';
import { UrlClick } from '../models/url-click.model';

@Injectable()
export class AnalyticService {
  async getUrlClickCount(key: string): Promise<number> {
    const count = await UrlClick.count({ where: { key } });

    return count;
  }

  async getLastIps(key: string, limit: number = 5): Promise<string[]> {
    const urlClicks = await UrlClick.findAll({
      attributes: ['ip'],
      where: { key },
      order: [['created_at', 'DESC']],
      limit,
    });

    return urlClicks.map((uc) => uc.ip);
  }
}
