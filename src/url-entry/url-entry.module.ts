import { Module } from '@nestjs/common';
import { HashModule } from 'src/hash/hash.module';
import { UrlEntryService } from './url-entry.service';
import { UrlEntryController } from './url-entry.controller';

@Module({
  controllers: [UrlEntryController],
  providers: [UrlEntryService],
  imports: [HashModule],
})
export class UrlEntryModule {}
