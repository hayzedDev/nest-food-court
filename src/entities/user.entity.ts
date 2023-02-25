import {
  Model,
  Column,
  Relation,
  Table,
  relationTypes,
  columnTypes,
} from 'nestjs-objection';
import { SharedEntity } from '../common/model/sharedEntity';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({ type: columnTypes.increments })
  id: number;
  @Column({ type: columnTypes.string })
  name: string;
  @Column({ type: columnTypes.string })
  email: string;

  @Column({ type: columnTypes.string })
  username: string;

  @Column({ type: columnTypes.string })
  role: string;

  @Column({ type: columnTypes.string })
  password: string;

  @Column({ type: columnTypes.date })
  created_at: Date;

  @Column({ type: columnTypes.date })
  updated_at: Date;
}
