import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  brandName: string;
}
