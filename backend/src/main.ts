// Load env vars before anything else
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { swagger } from './modules/common/docs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: /http:\/\/localhost:\d+/,
    credentials: true,
  });

  swagger(app, process.env.NODE_ENV || 'development');
  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
}

void bootstrap();
