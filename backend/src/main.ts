// Load env vars before anything else
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './modules/common/docs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  swagger(app, process.env.NODE_ENV || 'development');
  await app.listen(process.env.PORT || 3000);
}

void bootstrap();
