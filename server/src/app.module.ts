import { Module } from '@nestjs/common';
import { UrlEntryModule } from './url-entry/url-entry.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UrlEntry } from './models/url-entry.model';
import { HashId } from './models/hash-id.model';
import { UrlClick } from './models/url-click.model';
import { AnalyticModule } from './analytic/analytic.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        models: [UrlEntry, HashId, UrlClick],
        autoLoadModels: true,
        synchronize: true,
        logging: null,
      }),
    }),
    UrlEntryModule,
    AnalyticModule,
  ],
})
export class AppModule {}
