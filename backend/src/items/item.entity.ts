import { Category } from 'src/categories/category.entity';
import { ItemImg } from 'src/static/itemImg.entity';
import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @Column()
  @Generated('increment')
  orderNum: number;

  @ManyToOne(() => Category, (category) => category.items)
  category: Category;

  @OneToOne(() => ItemImg, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn()
  primaryImg: ItemImg;

  @OneToMany(() => ItemImg, (itemImg) => itemImg.item, { onDelete: 'CASCADE' })
  imgs: ItemImg[];
}
