import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { InjectKnex } from 'nestjs-knex';
import { CreateCategoryDto } from '../dtos/categoriesdto/create-category.dto';
import { UpdateCategoryDto } from '../dtos/categoriesdto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor() {}

  // static knex: Knex =

  // static async getKnex() {
  //   return await this.knex.table;
  // }

  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
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
