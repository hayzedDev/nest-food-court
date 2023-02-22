import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './categoriesdto/create-category.dto';
import { UpdateCategoryDto } from './categoriesdto/update-category.dto';
import { Response } from 'express';

@Controller()
export class CategoriesController {
  constructor(
    @Inject(forwardRef(() => CategoriesService))
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post('/brands/:brandId/addon-categories')
  async createCategory(
    @Param('brandId') brandId: string,
    @Res({ passthrough: true }) response: Response,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    const res = await this.categoriesService.createCategory(
      brandId,
      createCategoryDto,
    );

    // check if the brand is not found
    if (res.brandNotFound) {
      response.status(404).send({
        success: false,
        message: `The specified brand is not found. Please create the brand first`,
      });
      return;
    }

    return res.newCategory;
  }

  // @Post()
  // create(@Body() createCategoryDto: CreateCategoryDto) {
  //   return this.categoriesService.create(createCategoryDto);
  // }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}

// create a new