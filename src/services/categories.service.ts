import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nestjs-objection';

import { CreateCategoryDto } from '../dtos/categoriesdto/create-category.dto';
import { UpdateCategoryDto } from '../dtos/categoriesdto/update-category.dto';
import { Addon } from '../entities/addons.models';
import { Brand } from '../entities/brands.models';
import { Category } from '../entities/categories.models';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Addon) private readonly AddonModel: typeof Addon,
    @InjectModel(Category) private readonly categoryModel: typeof Category,
    @InjectModel(Brand) private readonly BrandModel: typeof Brand,
  ) {}

  // static knex: Knex =

  // static async getKnex() {
  //   return await this.knex.table;
  // }

  async createCategory(brandId: string, createCategoryDto: CreateCategoryDto) {
    // 1. check if brand exist
    if ((await this.BrandModel.query().where('id', brandId)).length === 0)
      return { brandNotFound: true };

    // 2. create the new category
    const categoryObj = { brandId, categoryName: createCategoryDto.name };
    const newCategory = await this.categoryModel.query().insert(categoryObj);
    return { newCategory };
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
