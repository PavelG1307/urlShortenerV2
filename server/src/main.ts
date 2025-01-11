import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import compression from 'compression';
import helmet from 'helmet';
import { initSwagger } from './core/lib/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
    }),
  );

  app.enableCors({
    origin: configService.get<string[]>('cors.origins'),
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  });

  app.use(compression());
  app.use(helmet());

  initSwagger(app);

  const port = configService.get<number>('port') || 3000;
  await app.listen(port);
}

bootstrap();
