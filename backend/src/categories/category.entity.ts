import { Item } from 'src/items/item.entity';
import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isRoot: boolean;

  @Column({ nullable: true })
  parentId: number;

  @Column({ nullable: true })
  @Generated('increment')
  orderNum: number;

  @OneToMany(() => Item, (item) => item.category)
  items: Item[];
}
