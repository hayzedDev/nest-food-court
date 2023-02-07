import { Module } from '@nestjs/common';
import { BrandsService } from './services/brands.service';
import { AddonsController } from './controllers/addons.controller';
import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { AddonsService } from './services/addons.service';

// import { KnexModule } from 'nest-knexjs';
import { KnexModule } from 'nestjs-knex';

import { dbConfig } from './../database/dbConfig';
import { CategoriesService } from './services/categories.service';
import { ObjectionModule, Model } from 'nestjs-objection';
import { Addon } from './entities/addons.models';
import { Brand } from './entities/brands.models';
import { Category } from './entities/categories.models';
import { UsersModule } from './users/users.module';

require('dotenv').config();

const { DB_DEVELOPMENT_PORT, DB_DEVELOPMENT_PASSWORD, DB_HOST } = process.env;
console.log(DB_DEVELOPMENT_PORT, DB_DEVELOPMENT_PASSWORD, DB_HOST);
// console.log(process.env.DB_HOST);
const nodeEnv = process.env.NODE_ENV;
// console.log(nodeEnv);
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
    ObjectionModule.forFeature([Addon, Brand, Category]),
    UsersModule,
  ],
  controllers: [AddonsController, BrandsController, CategoriesController],
  providers: [AddonsService, BrandsService, CategoriesService],
})
export class AppModule {}
