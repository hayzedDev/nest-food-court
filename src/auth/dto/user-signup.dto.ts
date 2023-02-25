import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../common/enums/userRole.enum';

export class UserSignUpDTO {
  @IsString()
  @IsNotEmpty({ message: '$property can not be empty' })
  @ApiProperty({
    example: 'Azeez Abdulsalam',
    description: 'The name of the user signing up',
  })
  name: string;

  @IsEmail()
  @IsString({ message: '$property can only be a string' })
  @ApiProperty({
    example: 'hayzedDev.foodcourt@gmail.com',
    description: 'The email of the user signing up',
  })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '$property can not be empty' })
  @ApiProperty({
    example: 'HayzedDev',
    description: 'The username of the user signing up',
  })
  username: string;

  @IsString()
  @IsEnum(UserRole)
  @IsNotEmpty({ message: '$property can not be empty' })
  @ApiProperty({
    example: 'admin',
    description: 'The role of the user signing up',
  })
  role: UserRole;

  @ApiProperty({
    example: 'Admin$1111111',
    description: 'The role of the user signing up',
  })
  @IsString()
  @IsNotEmpty({ message: '$property can not be empty' })
  @MinLength(8, {
    message:
      'The password provided is too short, Minimal length is $constraint1',
  })
  @MaxLength(22, { message: 'Password exceeds Maximal length of $constraint1' })
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$/)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,22}$/, {
    message:
      'password must contain the following: a capital letter, a small letter, and a number',
  })
  password: string;
}
