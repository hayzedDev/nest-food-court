"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class AddonMeal extends objection_1.Model {
    id;
    categoryNameId;
    addonMealName;
    // Table name is the only required property.
    static get tableName() {
        return 'addon-meals';
    }
    // Optional JSON schema. This is not the database schema! Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.
    static jsonSchema = {
        type: 'object',
        required: ['categoryNameId', 'addonMealName'],
        properties: {
            id: { type: 'integer' },
            categoryNameId: { type: ['string'] },
            addonMealName: { type: 'string' },
        },
    };
}
exports.default = AddonMeal;
