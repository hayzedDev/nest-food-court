import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  isString,
} from 'class-validator';

export class CreateAddonDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Rice', description: 'The name of the meal addon' })
  name: string;

  ///

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Nice food',
    description: 'A description of the meal addon',
  })
  description: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'legumes',
    description: 'The category of the meal addon',
  })
  category: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 25, description: 'The price of the meal addon ' })
  price: number;
}
