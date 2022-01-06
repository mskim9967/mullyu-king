import { Injectable, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async getCategoriesByName(rootCategoryName: string): Promise<Category[]> {
    const rootCategory: Category = await this.categoryRepository.findOne({
      name: rootCategoryName,
    });

    if (!rootCategory)
      throw new NotFoundException(`category ${rootCategoryName} not exist`);

    const categories: Category[] = await this.categoryRepository.find({
      where: { parentId: rootCategory.id },
      relations: ['items'],
      order: {
        orderNum: 'ASC',
      },
    });

    return categories;
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ id });
    if (!category) throw new NotFoundException(`category ${id} not found`);
    return category;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name, isRoot, parentId } = createCategoryDto;
    const category = this.categoryRepository.create({ name, isRoot, parentId });
    await this.categoryRepository.save(category);

    return category;
  }

  async createItemCategory(name: string): Promise<Category> {
    const itemCategory = await this.categoryRepository.findOne({
      name: 'item',
    });
    const category = this.categoryRepository.create({
      name,
      isRoot: false,
      parentId: itemCategory.id,
    });
    await this.categoryRepository.save(category);

    return category;
  }

  async renameCategory(id: number, name: string): Promise<Category> {
    const category = await this.getCategoryById(id);
    category.name = name;
    await this.categoryRepository.save(category);
    return category;
  }

  async swapCategoryOrder(
    category1Id: number,
    category2Id: number,
  ): Promise<void> {
    const category1 = await this.getCategoryById(category1Id);
    const category2 = await this.getCategoryById(category2Id);

    const temp = category1.orderNum;
    category1.orderNum = category2.orderNum;
    category2.orderNum = temp;

    await this.categoryRepository.save(category1);
    await this.categoryRepository.save(category2);
  }

  async deleteCategory(id: number): Promise<void> {
    const result = await this.categoryRepository.delete({ id });
    if (!result.affected)
      throw new NotFoundException(`can't find item id:${id}`);
  }
}
