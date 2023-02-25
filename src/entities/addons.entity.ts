import {
  Model,
  Column,
  Relation,
  Table,
  relationTypes,
  columnTypes,
} from 'nestjs-objection';
import { Brand } from './brands.entity';
import { Category } from '../categories/entities/categories.models';

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
    // join: { from: 'brands.id', to: 'addon-meals.id' },
    join: { from: 'addon-meals.brandId', to: 'brands.id' },
  })
  brandId: number;

  @Relation({
    modelClass: Category,
    relation: relationTypes.HasOneRelation, //category hasMany addons (To my understanding for now)
    // join: { from: 'categories.id', to: 'addon-meals.id' },
    join: { from: 'addon-meals.categoryId', to: 'categories.id' },
  })
  categoryId: number;
  @Column({ type: columnTypes.string })
  addonMealName: string;
  @Column({ type: columnTypes.date })
  created_at: Date;
  @Column({ type: columnTypes.date, default: true })
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
