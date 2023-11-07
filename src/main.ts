import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Increase the payload limit for JSON bodies
  app.use(bodyParser.json({ limit: '50mb' }));

  // Increase the payload limit for URL-encoded bodies
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(3000);
}
bootstrap();
