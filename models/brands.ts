import { Model } from 'objection';

export default class Brand extends Model {
  id!: number;
  brandName!: string;

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

  // This object defines the relations to other models. The relationMappings
  //   // property can be a thunk to prevent circular dependencies.
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
