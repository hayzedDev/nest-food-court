"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const brands_service_1 = require("./services/brands.service");
const addons_controller_1 = require("./controllers/addons.controller");
const brands_controller_1 = require("./controllers/brands.controller");
const categories_controller_1 = require("./controllers/categories.controller");
const addons_service_1 = require("./services/addons.service");
// import { KnexModule } from 'nest-knexjs';
const nestjs_knex_1 = require("nestjs-knex");
const dbConfig_1 = require("./../database/dbConfig");
const categories_service_1 = require("./services/categories.service");
require('dotenv').config();
const { DB_DEVELOPMENT_PORT, DB_DEVELOPMENT_PASSWORD, DB_HOST } = process.env;
console.log(DB_DEVELOPMENT_PORT, DB_DEVELOPMENT_PASSWORD, DB_HOST);
// console.log(process.env.DB_HOST);
const nodeEnv = process.env.NODE_ENV;
// console.log(nodeEnv);
console.log(dbConfig_1.dbConfig[nodeEnv]);
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [nestjs_knex_1.KnexModule.forRoot({ config: dbConfig_1.dbConfig[nodeEnv] })],
        controllers: [addons_controller_1.AddonsController, brands_controller_1.BrandsController, categories_controller_1.CategoriesController],
        providers: [addons_service_1.AddonsService, brands_service_1.BrandsService, categories_service_1.CategoriesService],
    })
], AppModule);
exports.AppModule = AppModule;
