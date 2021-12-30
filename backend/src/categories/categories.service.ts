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

  async getCategories(rootCategoryName: string): Promise<Category[]> {
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

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name, isRoot, parentId } = createCategoryDto;
    console.log(parentId);
    const category = this.categoryRepository.create({ name, isRoot, parentId });
    await this.categoryRepository.save(category);

    return category;
  }
}
