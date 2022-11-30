import { Injectable } from '@nestjs/common';
import createReport from 'docx-templates';
import * as fs from 'fs'

export interface foto{
    data: Buffer,
    width: 6,
    height: 6,
    extension: ".png",


}
export interface user{
   name:string;
   avatar:foto;
    
}

export interface IEvidenciaFotografica{
    descripcion:string;
    foto:foto;
}

export interface joder{
    valores:IEvidenciaFotografica[]
}

@Injectable()
export class PanelFotograficoService {

    async panelFotografico(){
        
        const data1 = await fs.promises.readFile('D:/addinexcel/sistema/backendv1/src/managerdocx/assets/icon-128.png');
        const data2 = await fs.promises.readFile('D:/addinexcel/sistema/backendv1/src/managerdocx/assets/icon-fillet.png');
        const data3:joder = 
        {
            valores:[{
                descripcion:"descripcion01",
                foto:{
                    data:data1,
                    extension:'.png',
                    height:6,
                    width:6
                }

            },
            {
                descripcion:"descripcion02",
                foto:{
                    data:data2,
                    extension:'.png',
                    height:6,
                    width:6
                }
            }]
        }
        
        
        
        const template = fs.readFileSync(`D:/addinexcel/sistema/backendv1/src/managerdocx/assets/doc1.docx`);
        const buffer = await createReport({
            template,
            data:data3
    
        })
            
          
        fs.writeFileSync('D:/addinexcel/sistema/backendv1/src/managerdocx/assets/report.docx', buffer)
        console.log(data3)
        return data3


    }
    
}
