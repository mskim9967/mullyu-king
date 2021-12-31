import { Category } from 'src/categories/category.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;

  @Column({ default: true })
  onSale: boolean;

  @Column({ default: false })
  onDiscount: boolean;

  @Column({ nullable: true })
  discountPrice: number;

  @ManyToOne(() => Category, (category) => category.items)
  category: Category;
}
