import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddinexcelModule } from './addinexcel/addinexcel.module';
import { ManagerdocxModule } from './managerdocx/managerdocx.module';
import { ManagerfotografiasModule } from './managerfotografias/managerfotografias.module';
import { MongooseModule } from '@nestjs/mongoose';



@Module({
  imports: [
    AddinexcelModule,
    ManagerdocxModule,
    ManagerfotografiasModule,
    MongooseModule.forRoot('mongodb://localhost/documentos'),
      
  ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
