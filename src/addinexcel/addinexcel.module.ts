import { Module } from '@nestjs/common';
import { AddinexcelController } from './addinexcel/addinexcel.controller';

@Module({
  controllers: [AddinexcelController]
})
export class AddinexcelModule {}
