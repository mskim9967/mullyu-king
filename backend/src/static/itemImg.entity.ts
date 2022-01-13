import { Item } from 'src/items/item.entity';
import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ItemImg extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column({ nullable: true })
  thumbKey: string;

  @ManyToOne(() => Item, (item) => item.imgs, { onDelete: 'CASCADE' })
  item: Item;
}
