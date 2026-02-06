// Load env vars before anything else
import * as dotenv from 'dotenv';
import fs from 'fs';
dotenv.config({ path: `./.env.${process.env.NODE_ENV || 'development'}` });

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { swagger } from './modules/common/docs/swagger';
import path from 'path';
import { isSQLite } from './data/database.config';

// garante que /data exista no Fly
if (isSQLite) {
  const dataDir = process.env.DATA_PATH || path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

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
    origin: [/http:\/\/localhost:\d+/],
    credentials: true,
  });

  swagger(app, process.env.NODE_ENV || 'development');
  await app.listen(process.env.PORT ?? 4000, '0.0.0.0');
}

void bootstrap();
