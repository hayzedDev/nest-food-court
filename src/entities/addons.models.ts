import {
  Model,
  Column,
  Relation,
  Table,
  relationTypes,
  columnTypes,
} from 'nestjs-objection';
import {Brand} from './brands.models';
import { Category } from './categories.models';

@Table({ tableName: 'addon-meals' })
export class Addon extends Model {
  @Column({ type: columnTypes.increments })
  id: number;
  @Column({ type: columnTypes.integer })
  price: number;
  @Column({ type: columnTypes.string })
  description: string;

  @Relation({
    modelClass: Brand,
    relation: relationTypes.HasManyRelation,
    // join: { from: 'addon-meals.id', to: 'brand.id' },
  })
  brandId: number;
  @Relation({
    modelClass: Category,
    relation: relationTypes.HasManyRelation, //category hasMany addons (To my understanding for now)
    // join: { from: 'addon-meals.id', to: 'brand.id' },
  })
  categoryId: number;
  @Column({ type: columnTypes.string })
  addonMealName: string;
  @Column({ type: columnTypes.date })
  created_at: Date;
  @Column({ type: columnTypes.date })
  updated_at: Date;
}

/////

////

// @Table({ tableName: 'users' })
// export class User extends Model {
//   @Column({ type: columnTypes.increments })
//   id: number;
//   @Column({ type: columnTypes.string })
//   name: string;
//   @Relation({
//     modelClass: Addons,
//     relation: relationTypes.HasManyRelation,
//     join: { from: 'users.id', to: 'posts.userId' },
//   })
//   posts: Addons[];
// }
