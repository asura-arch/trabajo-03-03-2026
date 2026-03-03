import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  await app.listen(8000, '0.0.0.0');
  console.log('Backend running on http://0.0.0.0:8000');
}
bootstrap();
