import { Module } from '@nestjs/common';
import { BrandsService } from './brands/brands.service';
import { AddonsController } from './addons/addons.controller';
import { BrandsController } from './brands/brands.controller';
import { CategoriesController } from './categories/categories.controller';
import { AddonsService } from './addons/addons.service';

// import { KnexModule } from 'nest-knexjs';
import { KnexModule } from 'nestjs-knex';

import { dbConfig } from './../database/dbConfig';
import { CategoriesService } from './categories/categories.service';
import { ObjectionModule, Model } from 'nestjs-objection';
import { Addon } from './entities/addons.models';
import { Brand } from './entities/brands.models';
import { Category } from './categories/categoryEntities/categories.models';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User } from './entities/user.model';

require('dotenv').config();

const nodeEnv = process.env.NODE_ENV;
console.log(nodeEnv);
console.log(dbConfig[nodeEnv]);
@Module({
  imports: [
    // KnexModule.forRoot({ config: dbConfig[nodeEnv] }),
    ObjectionModule.forRoot({
      Model,
      config: dbConfig[nodeEnv],
      // {
      //   client: 'pg',
      //   useNullAsDefault: true,
      //   connection: ':memory:',
      // }
    }),
    ObjectionModule.forFeature([Addon, Brand, Category, User]),
    // UsersModule,
  ],
  controllers: [
    AddonsController,
    BrandsController,
    CategoriesController,
    UsersController,
  ],
  providers: [AddonsService, BrandsService, CategoriesService, UsersService],
})
export class AppModule {}
