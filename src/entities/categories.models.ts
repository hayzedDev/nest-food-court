import {
  Model,
  Column,
  Relation,
  Table,
  relationTypes,
  columnTypes,
} from 'nestjs-objection';
// import Brand from '../../models/brands';

import { Brand } from './brands.models';

@Table({ tableName: 'categories' })
export class Category extends Model {
  @Column({ type: columnTypes.increments })
  id: number;
  @Column({ type: columnTypes.string })
  categoryName: string;

  @Relation({
    modelClass: Brand,
    relation: relationTypes.HasManyRelation,
  })
  brandId: number;

  @Column({ type: columnTypes.date })
  created_at: Date;
  @Column({ type: columnTypes.date })
  updated_at: Date;
}
