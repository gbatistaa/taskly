// Load env vars before anything else
import * as dotenv from 'dotenv';
import fs from 'fs';
dotenv.config({ path: './.env' });

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { swagger } from './modules/common/docs/swagger';

// garante que /data exista no Fly
const dataDir = '/data';
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
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
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}

void bootstrap();
