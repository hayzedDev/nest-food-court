import { pbkdf2Sync, randomBytes } from 'crypto';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-objection/dist';
import { JwtService } from '@nestjs/jwt';

import { User } from '../entities/user.entity';
import { UserSignUpDTO } from './dto/user-signup.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ConfigService } from '@nestjs/config/dist';

@Injectable()
export class JWTHelpersService {
  constructor(
    @InjectModel(User) private readonly UserModel: typeof User,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

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

  async signToken(payload: { id: string }): Promise<string> {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN'),
      expiresIn: this.configService.get('EXPIRES_IN'),
    });
  }
  async verifyToken() {}
}
