import { Model } from 'objection';
export default class Category extends Model {
  id!: number;
  categoryName!: string;

  brandNameId!: number;

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

  // This object defines the relations to other models. The relationMappings
  // property can be a thunk to prevent circular dependencies.
  //   static relationMappings = () => ({
  //     owner: {
  //       relation: Model.BelongsToOneRelation,
  //       // The related model.
  //       modelClass: Person,

  //       join: {
  //         from: 'animals.ownerId',
  //         to: 'persons.id',
  //       },
  //     },
  //   });
}
