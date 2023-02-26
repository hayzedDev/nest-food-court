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
import { Addon } from './entities/addons.entity';
import { Brand } from './entities/brands.entity';
import { Category } from './entities/categories.entity';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { AuthenticationGuard } from './guards/authentication.guard';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
require('dotenv').config();

import { ConfigService } from '@nestjs/config';

const nodeEnv = process.env.NODE_ENV;

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
    AuthModule,
    // UsersModule,
  ],
  controllers: [
    AddonsController,
    BrandsController,
    CategoriesController,
    UsersController,
  ],
  providers: [
    AddonsService,
    BrandsService,
    CategoriesService,
    UsersService,
    JwtService,
    ConfigService,
    Reflector,
    User,
  ],
})
export class AppModule {}
