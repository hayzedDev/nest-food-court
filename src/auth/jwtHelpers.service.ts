import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection/dist';
import { User } from '../entities/user.entity';
import { UserSignUpDTO } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class JWTHelpersService {
  constructor(@InjectModel(User) private readonly UserModel: typeof User) {}

  async hashPassword(password: string, salt?: string): Promise<string> {
    try {
    } catch (error) {}
    return '';
  }
}
