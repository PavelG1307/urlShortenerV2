import { Controller, Get, Param } from '@nestjs/common';
import { GetAnalyticsResponseDto } from './dto/get-analytics.dto';
import { AnalyticService } from './analytic.service';

@Controller('analytics')
export class AnalyticController {
  constructor(private readonly analyticService: AnalyticService) {}

  @Get('/:key')
  async createShortUrl(
    @Param('key') key: string,
  ): Promise<GetAnalyticsResponseDto> {
    const [clickCount, lastIps] = await Promise.all([
      this.analyticService.getUrlClickCount(key),
      this.analyticService.getLastIps(key),
    ]);

    return {
      clickCount,
      lastIps,
    };
  }
}
