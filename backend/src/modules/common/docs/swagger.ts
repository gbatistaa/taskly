import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swagger(app: INestApplication, enviroment: string) {
  if (enviroment !== 'development') {
    return;
  }

  const docOptions = new DocumentBuilder()
    .setTitle('Taskly App API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, docOptions);

  SwaggerModule.setup('api', app, document);
}
