import { Module } from '@nestjs/common';
import { HashModule } from 'src/hash/hash.module';
import { UrlEntryService } from './url-entry.service';
import { UrlEntryController } from './url-entry.controller';
import { UrlClickModule } from 'src/url-click/url-click.module';

@Module({
  controllers: [UrlEntryController],
  providers: [UrlEntryService],
  imports: [HashModule, UrlClickModule],
})
export class UrlEntryModule {}
