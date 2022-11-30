import { Cat } from "../schema/fotografias.schema";

export class CreateCatDto extends Cat{
    public path:string;
}