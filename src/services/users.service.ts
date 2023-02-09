import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection/dist';
import { CreateUserDto } from '../dtos/usersdto/create-user.dto';
import { UpdateUserDto } from '../dtos/usersdto/update-user.dto';
import { User } from '../entities/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}
  async create(createUserDto: CreateUserDto) {
    return await this.userModel.query().insert({
      name: createUserDto.name,
      email: createUserDto.email,
      role: createUserDto.role,
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
