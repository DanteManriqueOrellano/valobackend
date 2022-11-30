import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FotografiasController } from './fotografias/fotografias.controller';
import { Cat, CatSchema } from './schema/fotografias.schema';
import { FotografiasService } from './services/fotografias.service';

@Module({
  controllers: [FotografiasController],
  imports: [MongooseModule.forFeature([{
    name:Cat.name,
    schema:CatSchema
  }])
    
  ],
  providers:[FotografiasService]
})
export class ManagerfotografiasModule {}
