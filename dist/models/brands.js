"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class Brand extends objection_1.Model {
    id;
    brandName;
    // Table name is the only required property.
    static get tableName() {
        return 'brands';
    }
    // Optional JSON schema. This is not the database schema! Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.
    static jsonSchema = {
        type: 'object',
        required: ['brandName'],
        properties: {
            id: { type: 'integer' },
            brandName: { type: 'string' },
        },
    };
}
exports.default = Brand;
