import { Injectable } from '@nestjs/common';
import { UrlClick } from '../models/url-click.model';

@Injectable()
export class AnalyticService {
  async getUrlClickCount(alias: string): Promise<number> {
    const count = await UrlClick.count({ where: { alias } });

    return count;
  }

  async getLastIps(alias: string, limit: number = 5): Promise<string[]> {
    const urlClicks = await UrlClick.findAll({
      attributes: ['ip'],
      where: { alias },
      order: [['created_at', 'DESC']],
      limit,
    });

    return urlClicks.map((uc) => uc.ip);
  }
}
