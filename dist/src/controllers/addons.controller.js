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
exports.AddonsController = void 0;
const common_1 = require("@nestjs/common");
const addons_service_1 = require("../services/addons.service");
let AddonsController = class AddonsController {
    addonsService;
    constructor(addonsService) {
        this.addonsService = addonsService;
    }
    async create(createAddonDto, brandId) {
        console.log('hey');
        // console.log(this, 'line 24');
        await this.addonsService.create(createAddonDto, brandId);
        // return await this.addonsService.create(createAddonDto, brandId);
    }
    findAll() {
        return this.addonsService.findAll();
    }
    findOne(id) {
        return this.addonsService.findOne(+id);
    }
    update(id, updateAddonDto) {
        return this.addonsService.update(+id, updateAddonDto);
    }
    remove(id) {
        return this.addonsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)('brands/:brandId/addons'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('brandId'))
], AddonsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)()
], AddonsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id'))
], AddonsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)())
], AddonsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id'))
], AddonsController.prototype, "remove", null);
AddonsController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => addons_service_1.AddonsService)))
], AddonsController);
exports.AddonsController = AddonsController;
