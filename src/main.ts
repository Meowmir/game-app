import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppGuard } from './app.guard';
import { SERVER_PORT } from './global.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new AppGuard());
  await app.listen(SERVER_PORT);
}
bootstrap();
