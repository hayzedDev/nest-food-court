import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const config = new DocumentBuilder()
    .setTitle('NESTJS Food-court')
    .setDescription('A food-court RESTful API for personal practise')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'apiKey',
        name: 'x-food-court-token',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'food court token',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, () => console.log(`Server listening on ${port}`));
  console.log(`Server listening on ${await app.getUrl()}`);
}
bootstrap();
