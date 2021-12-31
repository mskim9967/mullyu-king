import { Injectable, NotFoundException } from '@nestjs/common';
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
      parentId: rootCategory.id,
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

  async renameCategory(id: number, name: string): Promise<Category> {
    const category = await this.getCategoryById(id);
    category.name = name;
    await this.categoryRepository.save(category);
    return category;
  }

  async deleteCategory(id: number): Promise<void> {
    const result = await this.categoryRepository.delete({ id });
    if (!result.affected)
      throw new NotFoundException(`can't find item id:${id}`);
  }
}
