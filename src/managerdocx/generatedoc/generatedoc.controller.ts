import { Controller, Post } from '@nestjs/common';
import { PanelFotograficoService } from '../services/basedocx.service';

export interface avatar{
    data: Buffer,
    width: 6,
    height: 6,
    extension: ".png",


}
export interface user{
   name:string;
   avatar:avatar;
    
}

@Controller('generatedoc')
export class GeneratedocController {
    constructor(private readonly panelFotograico:PanelFotograficoService){}

    @Post('generadocx')
    async generaDocumento(){
        this.panelFotograico.panelFotografico()
        return "data1"
    }
}
