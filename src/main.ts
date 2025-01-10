import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { corsOptions } from './core/config/cors';
import compression from 'compression';
import helmet from 'helmet';
import { initSwagger } from './core/lib/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
    }),
  );
  app.enableCors(corsOptions);
  app.use(compression());
  app.use(helmet());

  initSwagger(app);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
