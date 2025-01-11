import { Controller, Get, Param } from '@nestjs/common';
import { GetAnalyticsResponseDto } from './dto/get-analytics.dto';
import { AnalyticService } from './analytic.service';

@Controller('analytics')
export class AnalyticController {
  constructor(private readonly analyticService: AnalyticService) {}

  @Get('/:alias')
  async createShortUrl(
    @Param('alias') alias: string,
  ): Promise<GetAnalyticsResponseDto> {
    const [clickCount, lastIps] = await Promise.all([
      this.analyticService.getUrlClickCount(alias),
      this.analyticService.getLastIps(alias),
    ]);

    return {
      clickCount,
      lastIps,
    };
  }
}
