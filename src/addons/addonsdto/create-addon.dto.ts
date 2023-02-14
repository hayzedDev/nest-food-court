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
  name: string;

  ///

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
