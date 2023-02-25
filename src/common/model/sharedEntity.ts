import { Column, columnTypes } from 'nestjs-objection/dist';

export abstract class SharedEntity {
  @Column({ type: columnTypes.increments })
  id: number;
  @Column({ type: columnTypes.date })
  created_at: Date;
  @Column({ type: columnTypes.date })
  updated_at: Date;
}
