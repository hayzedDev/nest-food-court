"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class Category extends objection_1.Model {
    id;
    categoryName;
    brandNameId;
    // Table name is the only required property.
    static get tableName() {
        return 'categories';
    }
    // Optional JSON schema. This is not the database schema! Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.
    static jsonSchema = {
        type: 'object',
        required: ['categoryName', 'brandNameId'],
        properties: {
            id: { type: 'integer' },
            categoryName: { type: 'string' },
            brandNameId: { type: 'integer' },
        },
    };
}
exports.default = Category;
