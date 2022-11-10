import { Controller, Get, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { generateRouterForValorizacion, IElemento } from 'src/toolsExcel/toolsForValorizacion';
import { Response } from 'express';
import { generateFoldersInFolderProjects, generateTemplateFromIndex, compressIntereFolder } from 'src/toolsBox/toolBoxGenerics';
import { diskStorage } from 'multer';
import * as exceljs from 'exceljs';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('addinexcel')
export class AddinexcelController {
    @Get('/creacarpetas')
  createFoldersInWindows(){
    
    

const datos:IElemento[] = 
    [
        { nombreCarpeta: 'a',   columna: 0 },//0
        { nombreCarpeta: 'aa',  columna: 1 },
        { nombreCarpeta: 'ab', columna: 1 },
        { nombreCarpeta: 'ac',  columna: 1 },
        { nombreCarpeta: 'aca', columna: 2 },
        { nombreCarpeta: 'b',columna: 0 },
        { nombreCarpeta: 'ba',  columna: 1 },
        { nombreCarpeta: 'c',  columna: 0 }//7
    ]
    
    
    const rutas = {
      pathAbsolute:generateRouterForValorizacion(datos),
      nickNameProject:"joder tio"
    }
    const plantilla = {
      dirFont:"",
      dirTemplate:"",
      nickNameProject:"joder tio",
      typePage:"A4",
      pathAbsolute:generateRouterForValorizacion(datos)
    }

    generateFoldersInFolderProjects(rutas)
    generateTemplateFromIndex(plantilla)
    compressIntereFolder.nickNameProject = "joder tio"
    compressIntereFolder.main()



return "correcto"

  }
  @Get('/downloadIntereProject')
  downlodIntereProjectZip(@Res() response:Response){
    const nickNameProject ="joder tio"
    response.download(`${__dirname}/projects/${nickNameProject}.zip`)

  }
  @Get('/prueba')
  async prueba(){
    
    const openWorkbook = new exceljs.Workbook();
    const libro = await openWorkbook.xlsx.readFile(`${__dirname}/assets/plantilla.xlsx`)
    await libro.xlsx.writeFile(`${__dirname}/assets/joder.xlsx`)

  }
 /*@Get('/leerpresupuesto')//para que coloque las partidas en la plantilla
  leerPreseupuesto(){}*/
  @Post('uploadv2')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `${__dirname}/uploads`,
        filename: function( req, file, cb){
          cb(null, `${Date.now()}-${file.originalname}`)
        },
      }),
     // fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file:Express.Multer.File) {
    /*const response = {
      originalname: file.originalname,
      filename: file.filename,
    };*/
    console.log(file)
    return file;
  }
  @Get('lasrutas')
  async lasrutas(){
    const openWorkbook = new exceljs.Workbook();
    const libro = await openWorkbook.xlsx.readFile(`/assets/plantilla.xlsx`)
    return libro 
  }


}
