import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty({ message: 'Please provide  an $property' })
  @IsString({ message: '$property can only be a string' })
  @ApiProperty({
    example: 'hayzedDev@foodcourt.io',
    description: 'The email of the user signing up',
  })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Please provide a $property' })
  @ApiProperty({
    example: 'Admin$1111111',
    description: 'The password of the user signing in',
  })
  password: string;
}
