import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port: string = process.env.PORT;
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  await app.listen(port);

  console.log('NestJS app listening on port', port);
}
bootstrap();
