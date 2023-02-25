import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection/dist';
import { User } from '../entities/user.entity';
import { UserSignUpDTO } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private readonly UserModel: typeof User) {}
  async signup(user: UserSignUpDTO) {
    /**Check if user exists */
    const userExists = await this.UserModel.query().where({
      email: user.email,
    });

    if (userExists)
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'User already exists',
        },
        HttpStatus.CONFLICT,
      );

    /**hash password */

    /**create user */
    await this.UserModel.query().insert(user);
    /**create a jwt token and send it back  */
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
