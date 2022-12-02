import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private readonly userModel:Model<UserDocument>,
    private jwtService: JwtService
    
    ){}

  async login(userObjectLogin:LoginDto){
    const {email, password} = userObjectLogin
    const findUser = await this.userModel.findOne({email})

    if(!findUser) throw new HttpException('USER_NOT_FOUND',404);
    const checkPaswword = await bcrypt.compare(password,findUser.password);
    if(!checkPaswword) throw new HttpException('PASSWORD_INVALID',403);
    const payload = {
      id:findUser._id,
      name:findUser.name
    }
    const token =  this.jwtService.sign(payload)
    const data = {
      user : findUser,
      token

    }
    findUser

    return data


  }
  
  
  async create(createAuthDto: CreateAuthDto) {
    const {password} = createAuthDto;
    const plainToHash = await bcrypt.hash(password,10);
    createAuthDto  = {...createAuthDto, password:plainToHash}
    return this.userModel.create(createAuthDto);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
