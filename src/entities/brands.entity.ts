import {
  Model,
  Column,
  Relation,
  Table,
  relationTypes,
  columnTypes,
} from 'nestjs-objection';
import { Category } from './categories.entity';
import { Addon } from './addons.entity';

@Table({ tableName: 'brands' })
export class Brand extends Model {
  @Column({ type: columnTypes.increments })
  id: number;
  @Column({ type: columnTypes.string })
  brandName: string;
  @Column({ type: columnTypes.date })
  created_at: Date;
  @Column({ type: columnTypes.date })
  updated_at: Date;
  // @Column({ type: columnTypes.number })
  // @Relation({
  //   modelName: Category,
  //   relation: relationTypes.HasManyRelation,
  // })
  // categoryId: number;

  // @Relation({
  //   modelClass: Addon,
  //   relation: relationTypes.HasManyRelation,
  //   // join: { from: 'addon-meals.id', to: 'brand.id' },
  // })
  // addonMealId: number;
}
