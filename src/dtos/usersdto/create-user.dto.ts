import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  isString,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  role: string;
}
