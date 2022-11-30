import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto } from '../dtos/create.cat.DTO';
import { Cat, CatDocument } from '../schema/fotografias.schema';

@Injectable()
export class FotografiasService {
    constructor(@InjectModel(Cat.name) private catModule:Model<CatDocument> ){ }

    async create(createcatdto:CreateCatDto){
        const catCreated = await this.catModule.create(createcatdto)
        return catCreated;

    }
    async findAll(){
        const list = await this.catModule.find({});
        return list;

    }
    async findOne(_id:any){

        const one = await this.catModule.findById({"_id":_id.id})
       
        return one;
    }
    async deleteCat(_id:any){
        const deleteOne = await this.catModule.findOneAndRemove({"_id":_id.id});
        return deleteOne;
    }
    async updateCat(_id:any,data:any){

        /*const name = data.file.originalname.split(".")[0];
        const fileExtention = data.file.originalname.split(".")[1];
        const newFileName = name.split(" ").join("_")+Date.now()+"."+fileExtention;*/
        console.log(data)
        const updateOne = await this.catModule.findByIdAndUpdate(_id,data,{new:true}).setOptions({overwrite:true,new:true}).populate('description').populate('title');
        return updateOne
    }
}
