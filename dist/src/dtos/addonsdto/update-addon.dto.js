"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAddonDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_addon_dto_1 = require("./create-addon.dto");
class UpdateAddonDto extends (0, mapped_types_1.PartialType)(create_addon_dto_1.CreateAddonDto) {
}
exports.UpdateAddonDto = UpdateAddonDto;
