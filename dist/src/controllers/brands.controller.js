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
exports.BrandsController = void 0;
const common_1 = require("@nestjs/common");
let BrandsController = class BrandsController {
    brandsService;
    constructor(brandsService) {
        this.brandsService = brandsService;
    }
    // @Post()
    // create(@Body() createBrandDto: CreateBrandDto) {
    //   return this.brandsService.create(createBrandDto);
    // }
    create(createBrandDto) {
        return this.brandsService.create(createBrandDto);
    }
    findAll() {
        return this.brandsService.findAll();
    }
    // @Get('addons')
    // findOne(@Param() id: string) {
    //   return this.brandsService.findOne(+id);
    // }
    findOne(addonId) {
        return this.brandsService.findOne(+addonId);
    }
    update(addonId, updateBrandDto) {
        return this.brandsService.update(+addonId, updateBrandDto);
    }
    remove(id) {
        return this.brandsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)('addon-categories'),
    __param(0, (0, common_1.Body)())
], BrandsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)()
], BrandsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('addons/:addonId'),
    __param(0, (0, common_1.Param)(':addonId'))
], BrandsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('addons/:addonId'),
    __param(0, (0, common_1.Param)('addonId')),
    __param(1, (0, common_1.Body)())
], BrandsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('addons/:addonId'),
    __param(0, (0, common_1.Param)('id'))
], BrandsController.prototype, "remove", null);
BrandsController = __decorate([
    (0, common_1.Controller)()
], BrandsController);
exports.BrandsController = BrandsController;
