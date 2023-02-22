import {
  Model,
  Column,
  Relation,
  Table,
  relationTypes,
  columnTypes,
} from 'nestjs-objection';
// import Brand from '../../models/brands';

import { Brand } from '../../entities/brands.models';

@Table({ tableName: 'categories' })
export class Category extends Model {
  @Column({ type: columnTypes.increments })
  id: number;
  @Column({ type: columnTypes.string })
  categoryName: string;

  @Relation({
    modelClass: Brand,
    relation: relationTypes.HasManyRelation,
    join: { from: 'categories.brandId', to: 'brands.id' },
  })
  brand: Brand;

  @Column({ type: columnTypes.date })
  created_at: Date;
  @Column({ type: columnTypes.date })
  updated_at: Date;
}
