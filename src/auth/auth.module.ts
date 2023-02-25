import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { ObjectionModule } from 'nestjs-objection/dist';
import { User } from '../entities/user.entity';
import { JWTHelpersService } from './jwthelpers.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JWTHelpersService],
  imports: [
    ConfigModule.forRoot(),
    ObjectionModule.forFeature([User, JWTHelpersService, JwtService]),
    JwtModule.register({}),
  ],
})
export class AuthModule {}
