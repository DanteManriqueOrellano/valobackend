import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddinexcelModule } from './addinexcel/addinexcel.module';

@Module({
  imports: [AddinexcelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
