import { Module } from '@nestjs/common';
import { GeneratedocController } from './generatedoc/generatedoc.controller';
import { PanelFotograficoService } from './services/basedocx.service';

@Module({
  controllers: [GeneratedocController],
  providers: [PanelFotograficoService],
  
})
export class ManagerdocxModule {}
