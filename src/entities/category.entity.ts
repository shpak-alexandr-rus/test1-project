import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity('categories')
export class CategoryEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @AutoMap()
  @Column({ type: 'varchar' })
  public slug: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  public name: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  public description: string;

  @AutoMap()
  @Column({
    name: 'createdDate',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdDate: string;

  @AutoMap()
  @Column({ type: 'boolean' })
  public active: boolean;
}
