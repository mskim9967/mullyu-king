import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/category.entity';
import { CategoryRepository } from 'src/categories/category.repository';
import { ItemImgRepository } from 'src/static/itemImg.repository';
import { Like } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './item.entity';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemRepository) private itemRepository: ItemRepository,
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
    @InjectRepository(ItemImgRepository)
    private itemImgRepository: ItemImgRepository,
  ) {}

  async getAllItem(): Promise<Item[]> {
    return await this.itemRepository.find({
      relations: ['category', 'imgs', 'primaryImg'],
      order: {
        orderNum: 'ASC',
      },
    });
  }

  async getItemById(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['category', 'imgs', 'primaryImg'],
    });
    if (!item) throw new NotFoundException(`item ${id} not found`);
    return item;
  }

  async getSaleItemsByCategory(categoryId: number): Promise<Item[]> {
    const category: Category = await this.categoryRepository.findOne({
      id: categoryId,
    });
    if (!category) throw new BadRequestException(`category is not valid`);

    return await this.itemRepository.find({
      where: { category: categoryId, onSale: true },
      relations: ['category', 'imgs', 'primaryImg'],
      order: {
        orderNum: 'ASC',
      },
    });
  }

  async getSaleItems(): Promise<Item[]> {
    return await this.itemRepository.find({
      where: { onSale: true },
      relations: ['category', 'imgs', 'primaryImg'],
      order: {
        orderNum: 'ASC',
      },
    });
  }

  async searchSaleItemsByName(name: string): Promise<Item[]> {
    return await this.itemRepository.find({
      where: { onSale: true, name: Like(`%${name}%`) },
      relations: ['category', 'imgs', 'primaryImg'],
      order: {
        orderNum: 'ASC',
      },
    });
  }

  async getSaleDiscountItems(): Promise<Item[]> {
    return await this.itemRepository.find({
      where: { onSale: true, onDiscount: true },
      relations: ['category', 'imgs', 'primaryImg'],
      order: {
        orderNum: 'ASC',
      },
    });
  }

  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    const { name, description, price, categoryId } = createItemDto;

    const category: Category = await this.categoryRepository.findOne({
      id: categoryId,
    });
    if (!category) throw new BadRequestException(`category is not valid`);

    const item = this.itemRepository.create({
      name,
      description,
      price,
    });
    item.category = category;
    await this.itemRepository.save(item);

    return item;
  }

  async patchItem(id, body): Promise<Item> {
    const { name, description, price, categoryId, primaryImgKey } = body;
    const item = await this.getItemById(id);

    if (name !== undefined) item.name = name;
    if (description !== undefined) item.description = description;
    if (price !== undefined) item.price = price;
    if (primaryImgKey !== undefined) {
      const itemImg = await this.itemImgRepository.findOne({
        key: primaryImgKey,
      });
      item.primaryImg = itemImg;
    }
    if (categoryId !== undefined) {
      const category: Category = await this.categoryRepository.findOne({
        id: categoryId,
      });
      item.category = category;
    }

    await this.itemRepository.save(item);
    return item;
  }

  async patchItemSaleStatus(id: number, status: boolean): Promise<Item> {
    const item = await this.getItemById(id);
    item.onSale = status;
    await this.itemRepository.save(item);
    return item;
  }

  async patchItemDiscountStatus(
    id: number,
    status: boolean,
    price: number,
  ): Promise<Item> {
    const item = await this.getItemById(id);
    item.onDiscount = status;
    item.discountPrice = status ? price : null;
    await this.itemRepository.save(item);
    return item;
  }

  async deleteItem(id: number): Promise<void> {
    const result = await this.itemRepository.delete({ id });
    if (!result.affected)
      throw new NotFoundException(`can't find item id:${id}`);
  }

  async swapItemOrder(item1Id: number, item2Id: number): Promise<void> {
    const item1 = await this.getItemById(item1Id);
    const item2 = await this.getItemById(item2Id);

    const temp = item1.orderNum;
    item1.orderNum = item2.orderNum;
    item2.orderNum = temp;

    await this.itemRepository.save(item1);
    await this.itemRepository.save(item2);
  }
}
