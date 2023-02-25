import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { userSignInType } from '../../return.types';
import { AuthService } from './auth.service';
import { UserSignUpDTO } from './dto/create-auth.dto';
import { LoginDTO } from './dto/login.to';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async singup(@Body() body: UserSignUpDTO): Promise<userSignInType> {
    return await this.authService.signup(body);
  }

  @Post('login')
  async loginUser(@Body() loginDTO: LoginDTO): Promise<userSignInType> {
    return await this.authService.loginUser(loginDTO);
  }

  @Post('signout')
  async signOut(@Headers('authorization') token: string) {
    return { token: '' };
  }
}
