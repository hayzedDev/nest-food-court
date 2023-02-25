import { PartialType } from '@nestjs/swagger';
import { UserSignUpDTO } from './user-signup.dto';

export class UpdateAuthDto extends PartialType(UserSignUpDTO) {}
