import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument  } from 'mongoose';


export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {

  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  path:string
  
}

export const CatSchema = SchemaFactory.createForClass(Cat);

