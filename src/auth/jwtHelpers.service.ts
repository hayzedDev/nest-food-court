import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { InjectModel } from 'nestjs-objection/dist';
import { User } from '../entities/user.entity';
import { UserSignUpDTO } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class JWTHelpersService {
  constructor(@InjectModel(User) private readonly UserModel: typeof User) {}

  async hashPassword(password: string, salt?: string) {
    try {
      if (!salt) {
        // generate salt
        salt = randomBytes(32).toString('hex');
      }

      // generate hash of the password
      let hash = pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
      let hashedPassword = `${hash}:${salt}`;
      return hashedPassword;
    } catch (error) {
      throw new HttpException(
        'General server error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
