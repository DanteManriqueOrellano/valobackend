import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(3031,'192.168.1.86',()=>{//ip de la maquiandonde esta el aplicativo, se usa ifconfig
    console.log(`on port: ${3031}`)
  });
}
bootstrap();
