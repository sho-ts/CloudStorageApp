import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // corsのdoc 👉 https://docs.nestjs.com/security/cors
  await app.listen(3000);
}
bootstrap();
