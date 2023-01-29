import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  categoryName: string;

  @IsNotEmpty()
  @IsNumber()
  brandNameId: number;
}
