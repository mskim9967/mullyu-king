import { BadRequestException, Injectable } from '@nestjs/common';
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
    const { name, description, categoryId } = createItemDto;

    const category: Category = await this.categoryRepository.findOne({
      id: categoryId,
    });
    if (!category) throw new BadRequestException(`category is not valid`);

    const item = this.itemRepository.create({ name, description });
    item.category = category;
    await this.itemRepository.save(item);

    return item;
  }
}
