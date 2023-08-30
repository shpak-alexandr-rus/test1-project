import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONSTANTS } from './constants/swagger/swagger';
import logger from './logger/logger';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentBuilder = new DocumentBuilder()
    .setTitle(SWAGGER_CONSTANTS.TITLE)
    .setDescription(SWAGGER_CONSTANTS.DESCRIPTION)
    .setVersion(SWAGGER_CONSTANTS.VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup(SWAGGER_CONSTANTS.PATH, app, document);

  await app
    .listen(+process.env.PORT)
    .then(() => {
      logger.info(`Server started on ${process.env.PORT} port!`);
    })
    .catch((e) => {
      logger.error(e.message);
    });
}

bootstrap();
