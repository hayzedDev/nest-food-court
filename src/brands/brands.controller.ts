import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller()
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  // @Post()
  // create(@Body() createBrandDto: CreateBrandDto) {
  //   return this.brandsService.create(createBrandDto);
  // }
  @Post('addon-categories')
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  // @Get('addons')
  // findOne(@Param() id: string) {
  //   return this.brandsService.findOne(+id);
  // }
  @Get('addons/:addonId')
  findOne(@Param(':addonId') addonId: string) {
    return this.brandsService.findOne(+addonId);
  }

  @Patch('addons/:addonId')
  update(
    @Param('addonId') addonId: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandsService.update(+addonId, updateBrandDto);
  }

  @Delete('addons/:addonId')
  remove(@Param('id') id: string) {
    return this.brandsService.remove(+id);
  }
}
