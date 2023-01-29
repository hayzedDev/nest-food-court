"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_knex_1 = require("nestjs-knex");
let CategoriesService = class CategoriesService {
    knex;
    constructor(knex) {
        this.knex = knex;
    }
    // static knex: Knex =
    // static async getKnex() {
    //   return await this.knex.table;
    // }
    create(createCategoryDto) {
        return 'This action adds a new category';
    }
    findAll() {
        return `This action returns all categories`;
    }
    findOne(id) {
        return `This action returns a #${id} category`;
    }
    update(id, updateCategoryDto) {
        return `This action updates a #${id} category`;
    }
    remove(id) {
        return `This action removes a #${id} category`;
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_knex_1.InjectKnex)())
], CategoriesService);
exports.CategoriesService = CategoriesService;
