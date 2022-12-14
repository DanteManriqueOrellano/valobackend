import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddinexcelModule } from './addinexcel/addinexcel.module';
import { ManagerdocxModule } from './managerdocx/managerdocx.module';
import { ManagerfotografiasModule } from './managerfotografias/managerfotografias.module';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';




@Module({
  imports: [
    AddinexcelModule,
    ManagerdocxModule,
    ManagerfotografiasModule,
    MongooseModule.forRoot('mongodb://localhost/documentos'),
    
    UsersModule,
    
    AuthModule,
    
    
      
  ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
