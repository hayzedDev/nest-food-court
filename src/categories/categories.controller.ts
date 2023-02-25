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
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Categories')
@Controller()
export class CategoriesController {
  constructor(
    @Inject(forwardRef(() => CategoriesService))
    private readonly categoriesService: CategoriesService,
  ) {}
  @Post('/brands/:brandId/addon-categories')
  @ApiOperation({
    summary: `Create a new category for meal addons for the specified
brand`,
  })
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
}
