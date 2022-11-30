import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  /**
   * configura el cors correctamente desde el backend
   */
  const writelist = [
    "https://localhost:4200",
    "http://localhost:4200",
    "http://localhost:4200/*"
  ]
  const corsOptions = {
    origin: function(origin,callback){
      if(writelist.indexOf(origin) !== -1 || !origin ){
        callback(null,true);
      }else{
        callback(new Error("not alloe by corsw"))
      }
    }
  }
  app.enableCors(corsOptions)
  /**
   * configura una ruta statica
   */
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3033,'192.168.1.86',()=>{//ip de la maquiandonde esta el backend aplicativo, se usa ifconfig
    console.log(`on port: ${3033}`)
  });
}
bootstrap();
