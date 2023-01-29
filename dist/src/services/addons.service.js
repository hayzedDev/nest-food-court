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
exports.AddonsService = void 0;
const common_1 = require("@nestjs/common");
// import { Knex } from 'knex';
const nestjs_knex_1 = require("nestjs-knex");
let AddonsService = class AddonsService {
    knex;
    constructor(knex) {
        this.knex = knex;
    }
    async create(createAddonDto, brandId) {
        console.log(createAddonDto);
        console.log(brandId, typeof brandId);
        const addonMeal = await this.knex.table('addon-meals').insert({
            categoryNameId: 2,
            addonMealName: createAddonDto.name,
            price: createAddonDto.price,
        });
        return { addonMeal };
    }
    async findAll() {
        return `This action returns all addons`;
    }
    async findOne(id) {
        return `This action returns a #${id} addon`;
    }
    async update(id, updateAddonDto) {
        return `This action updates a #${id} addon`;
    }
    async remove(id) {
        return `This action removes a #${id} addon`;
    }
};
AddonsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_knex_1.InjectKnex)())
], AddonsService);
exports.AddonsService = AddonsService;
