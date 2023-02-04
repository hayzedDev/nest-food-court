import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto } from '../dtos/categoriesdto/create-category.dto';
import { UpdateCategoryDto } from '../dtos/categoriesdto/update-category.dto';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('/brands/:brandId/addon-categories')
  async createCategory(
    @Param('brandId') brandId: string,
    @Res({ passthrough: true }) response: Response,
    createCategoryDto: CreateCategoryDto,
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
    // check if the addon is not found
    if (res.addonNotFound) {
      response.status(404).send({
        success: false,
        message: `The specified addon is not found. Hence, it can not be updated`,
      });
      return;
    }

    response.status(204).send();
    return;
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

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
