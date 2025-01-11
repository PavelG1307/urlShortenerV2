import { Module } from '@nestjs/common';
import { UrlEntryModule } from './url-entry/url-entry.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UrlEntry } from './models/url-entry.model';
import { HashId } from './models/hash-id.model';
import { UrlClick } from './models/url-click.model';
import { AnalyticModule } from './analytic/analytic.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [UrlEntry, HashId, UrlClick],
      autoLoadModels: true,
      synchronize: true,
      logging: process.env.NODE_ENV === 'dev' ? console.log : false,
    }),
    UrlEntryModule,
    AnalyticModule,
  ],
})
export class AppModule {}
