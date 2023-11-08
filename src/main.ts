import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // Increase the payload limit for JSON bodies
  app.use(bodyParser.json({ limit: configService.get('MAX_PAYLOAD_SIZE') }));

  // Increase the payload limit for URL-encoded bodies
  app.use(
    bodyParser.urlencoded({
      limit: configService.get('MAX_PAYLOAD_SIZE'),
      extended: true,
    }),
  );

  await app.listen(configService.get('PORT'));
}
bootstrap();
