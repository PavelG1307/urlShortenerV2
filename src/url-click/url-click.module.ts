import { Module } from '@nestjs/common';
import { UrlClickService } from './url-click.service';

@Module({
  providers: [UrlClickService],
  exports: [UrlClickService],
})
export class UrlClickModule {}
