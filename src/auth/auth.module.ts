import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

export const jwtConstants = {
  secret:'mysemilla'
} 

@Module({
  imports: [
    MongooseModule.forFeature([{
      name:User.name,
      schema:UserSchema
    }]),
    JwtModule.register({
      secret:jwtConstants.secret,
      signOptions:{expiresIn:'60s'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}

