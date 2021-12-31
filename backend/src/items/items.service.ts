import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/category.entity';
import { CategoryRepository } from 'src/categories/category.repository';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './item.entity';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemRepository) private itemRepository: ItemRepository,
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async getAllItem(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async getItemById(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({ id });
    if (!item) throw new NotFoundException(`item ${id} not found`);
    return item;
  }

  async getItemsByCategory(categoryId: number): Promise<Item[]> {
    const category: Category = await this.categoryRepository.findOne({
      id: categoryId,
    });
    if (!category) throw new BadRequestException(`category is not valid`);

    return await this.itemRepository.find({
      where: { category: categoryId },
      relations: ['category'],
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
}
