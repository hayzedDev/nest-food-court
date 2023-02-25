import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
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
    example: 'hayzedDev.foodcourt.io',
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
  @IsNotEmpty({ message: '$property can not be empty' })
  @ApiProperty({
    example: 'admin',
    description: 'The role of the user signing up',
  })
  role: UserRole;

  @IsString()
  @IsNotEmpty({ message: '$property can not be empty' })
  @MinLength(8, {
    message:
      'The password provided is too short, Minimal length is $constraint1, but you provided $value',
  })
  @MaxLength(22, { message: 'Password exceeds Maximal length of $constraint1' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$/)
  password: string;
}
