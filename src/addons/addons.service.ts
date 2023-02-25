import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from 'nestjs-objection';

// import { Knex } from 'knex';
import { InjectKnex, Knex } from 'nestjs-knex';

// import { InjectModel } from 'nest-knexjs';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import { Addon } from '../entities/addons.entity';
import { Category } from '../categories/entities/categories.models';
import { Brand } from '../entities/brands.entity';

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

    // Check if the brand exist
    if ((await this.BrandModel.query().where('id', brandId)).length === 0)
      return { brandNotFound: true };

    let category;

    // Check if category is supplied in the body of the endpoint
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

    const result = await this.AddonModel.query().insert(object);

    return { result };
  }

  async getMealAddons(brandId: string) {
    // check if the specified brand exists
    if ((await this.BrandModel.query().where('id', brandId)).length === 0)
      return { brandNotFound: true };

    const mealAddons = await this.AddonModel.query().where({
      brandId,
      // brandId: +brandId,
    });
    console.log(mealAddons);

    return { mealAddons };
    // return `This action returns all addons`;
  }

  async getMealAddon(brandId: string, addonId: string) {
    // check if the specified brand exists
    if ((await this.BrandModel.query().where('id', brandId)).length === 0)
      return { brandNotFound: true };

    // get the addon meals for that brand
    const addons = await this.AddonModel.query().where({
      // brandId,
      brandId,
      id: addonId,
    });
    console.log(addons);

    return { addons };
  }

  async updateAddon(
    brandId: string,
    addonId: string,
    updateAddonDto: UpdateAddonDto,
  ) {
    // check if the specified brand exists
    if ((await this.BrandModel.query().where('id', brandId)).length === 0)
      return { brandNotFound: true };

    // get the addon in the db
    const addons = await this.AddonModel.query().where({
      // brandId,
      brandId,
      id: addonId,
    });
    console.log(addons);

    // check if the addon exist
    if (addons.length === 0) return { addonNotFound: true };

    let category;

    // Check if category is supplied in the body of the endpoint
    if (updateAddonDto.category)
      category = await this.categoryModel
        .query()
        .where('categoryName', `${updateAddonDto.category}`);

    // Check if category exists and determine the value of category(number | undefined)
    const categoryId = Array.isArray(category)
      ? category.length !== 0
        ? category[0].id
        : undefined
      : undefined;

    //
    console.log(categoryId);

    // delete the meal addon
    await this.AddonModel.query()
      .where({
        // brandId,
        brandId,
        id: addonId,
      })
      .del();
    // create a new meal addon of the same id
    const obj = {
      id: +addons[0].id,
      categoryId: categoryId || +addons[0]?.categoryId,
      addonMealName: updateAddonDto.name || addons[0].addonMealName,
      price: updateAddonDto.price,
      description: updateAddonDto.description,
      brandId: +brandId,
    };
    const mealAddon = await this.AddonModel.query().insert(obj);

    // update the addon in the DB
    console.log(mealAddon);
    // .update({
    //   categoryId: categoryId ? categoryId : 'null',
    //   addonMealName: updateAddonDto.name,
    //   price: updateAddonDto.price,
    //   description: updateAddonDto.description,
    //   brandId: +brandId,
    // });

    return { mealAddon };
  }

  async deleteAddon(brandId: string, addonId: string) {
    // 1. check if brand exist
    if ((await this.BrandModel.query().where('id', brandId)).length === 0)
      return { brandNotFound: true };

    // 2. check if addon exist for that brand
    if (
      (await this.AddonModel.query().where({ brandId, id: addonId })).length ===
      0
    )
      return { addonNotFound: true };

    // 3. delete the addon

    const deleted = await this.AddonModel.query()
      .where({ brandId, id: addonId })
      .del();

    return { deleted };
  }
}
