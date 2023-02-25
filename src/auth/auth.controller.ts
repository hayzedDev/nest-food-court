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
import { UserSignUpDTO } from './dto/user-signup.dto';
import { LoginDTO } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up a new user' })
  @Post('signup')
  async singup(@Body() body: UserSignUpDTO): Promise<userSignInType> {
    return await this.authService.signup(body);
  }

  @ApiOperation({ summary: 'Sign in a user' })
  @Post('login')
  async loginUser(@Body() loginDTO: LoginDTO): Promise<userSignInType> {
    return await this.authService.loginUser(loginDTO);
  }

  @ApiOperation({ summary: 'Sign out a user' })
  @Post('signout')
  async signOut(@Headers('authorization') token: string) {
    return { token: '' };
  }
}
