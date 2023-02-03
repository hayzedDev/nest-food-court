import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import {
  InjectModel,
  synchronize,
  InjectConnection,
  Connection,
} from 'nestjs-objection';

// import { Knex } from 'knex';
import { InjectKnex, Knex } from 'nestjs-knex';

// import { InjectModel } from 'nest-knexjs';
import { CreateAddonDto } from '../dtos/addonsdto/create-addon.dto';
import { UpdateAddonDto } from '../dtos/addonsdto/update-addon.dto';
import { Addon } from '../entities/addons.models';
import { Category } from '../entities/categories.models';
import { Brand } from '../entities/brands.models';

@Injectable()
export class AddonsService {
  constructor(
    @InjectModel(Addon) private readonly AddonModel: typeof Addon,
    @InjectModel(Category) private readonly categoryModel: typeof Category,
    @InjectModel(Brand) private readonly BrandModel: typeof Brand,
  ) {}

  async createNewMealAddon(createAddonDto: CreateAddonDto, brandId: string) {
    console.log(createAddonDto);
    console.log(brandId, typeof brandId);

    const brand = await this.BrandModel.query().where('id', brandId);

    console.log(brand);

    if (brand.length === 0) return { brandNotFound: true };

    let category;

    if (createAddonDto.category)
      category = await this.categoryModel
        .query()
        .where('categoryName', `${createAddonDto.category}`);

    // Check if category exists and determine the value of category(number | undefined)
    const categoryId = Array.isArray(category)
      ? category.length !== 0
        ? category[0].id
        : undefined
      : undefined;

    console.log(category, categoryId);
    // return;

    const object = {
      categoryId,
      addonMealName: createAddonDto.name,
      price: createAddonDto.price,
      description: createAddonDto.description,
      brandId: +brandId,
    };

    console.log(object);
    const result = await this.AddonModel.query().insert(object);

    // console.log(result, 'line 68');

    // const addonMeal = await this.knex.table('addon-meals').insert({
    //   categoryNameId: 2,
    //   addonMealName: createAddonDto.name,
    //   price: createAddonDto.price,
    //   description: createAddonDto.description,
    // });

    return {};
  }

  async getMealAddons(brandId: string) {
    const brandIds = await this.AddonModel.query().where({
      // brandId,
      brandId: +brandId,
    });
    console.log(brandIds);

    return brandIds;
    // return `This action returns all addons`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} addon`;
  }

  async update(id: number, updateAddonDto: UpdateAddonDto) {
    return `This action updates a #${id} addon`;
  }

  async remove(id: number) {
    return `This action removes a #${id} addon`;
  }
}
