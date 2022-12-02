import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCatDto  } from '../dtos/create.cat.DTO';
import { FotografiasService } from '../services/fotografias.service';
import { diskStorage } from 'multer';
import { Cat } from '../schema/fotografias.schema';
import { Response } from 'express';

@Controller('fotografias')
export class FotografiasController{
    
    constructor(
        private fotografiasService:FotografiasService,
        
        ){}
    
    @Get('cats')
    async getPhotos(): Promise<any> 
    {
        
        const photos = this.fotografiasService.findAll();
        return photos;
    }
    /*metodo que captura la imagen, captura los inputs y luego los acomoda segun el dto que se enviará por los schemas */
    @UseInterceptors(
        FileInterceptor('file', {
          storage: diskStorage({
            destination: `./uploads`,
            filename: ( req, file, cb)=>{
                const name = file.mimetype.split("/");
                const fileExtention =   name[name.length - 1];
                const newFileName = name[0].split(" ").join("_")+Date.now()+"."+fileExtention;
              cb(null, newFileName)
            },
          }),
         fileFilter: (req,file,cb)=>{
            if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
                return cb(null,false)
            }
            cb(null,true)
         },
        }),
      )
    @Post('creacat')
    async createPhoto(
        @UploadedFile() file:Express.Multer.File,
        @Body() cat:Cat)//: Promise<CreateCatDto>
     {
        console.log(file.filename)
        if(!file){
            throw new BadRequestException("file is not a imagen")
        }
        const response = {
            filePath:`http://192.168.1.86:3033/fotografias/pictures/${file.filename}`
        };
            
        
        
       
        const catDTO = new CreateCatDto()
        catDTO.description = cat.description
        catDTO.title = cat.title
        catDTO.path = response.filePath
        
        return await this.fotografiasService.create(catDTO)
        
    }
    /**necesario para mostrar la imagen en el clinte 
     * llama automaticamente cuando se hace la referencia [src] =192.168.1.86:30333 . . .. 
    */
    @Get('pictures/:filename')
    async getPicture(@Param('filename') filename, @Res() res:Response){
        res.sendFile(filename,{root:'./uploads'})

    }
    @Get(':id')
    async getPhoto(@Param() id:any)//: Promise<Response>
    {
       /// console.log(id)
        
        return this.fotografiasService.findOne(id)
        /*const { id } = req.params;
        const photo = await Photo.findById(id);
        return res.json(photo);*/
    }
    
    @Delete(':id')
    async deletePhoto(@Param() id:string): Promise<CreateCatDto>
    {
        return this.fotografiasService.deleteCat(id)
        
    }
    @Put(':id')
    @UseInterceptors(
        FileInterceptor('file', {
          storage: diskStorage({
            destination: `./uploads`,
            filename: ( req, file, cb)=>{
                
                const name = file.mimetype.split("/");
                
                const fileExtention =   name[name.length - 1];
                
                const newFileName = name[0].split(" ").join("_")+Date.now()+"."+fileExtention;
                
              cb(null, newFileName)
            },
          }),
         fileFilter: (req,file,cb)=>{
            if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
                return cb(null,false)
            }
            cb(null,true)
         },
        }),
      )
    async updatePhoto(
        @UploadedFile() file:Express.Multer.File,
        @Param('id') id:string, 
        @Body() cat:CreateCatDto): Promise<CreateCatDto> 
        {
            console.log({"file":file})

            if(!file){
                throw new BadRequestException("desde el servidor el archivo no s una imagen")
            }
            const response = {
                filePath:`http://192.168.1.86:3033/fotografias/pictures/${file.filename}`
            };
            const catDTO = {
                description : cat.description,
                title : cat.title,
                path : response.filePath
            }
            
        return this.fotografiasService.updateCat(id,catDTO)
    }
}
