import { Controller, Param, Post, Get, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('/:rootCategoryName')
  getCategories(
    @Param('rootCategoryName') rootCategoryName: string,
  ): Promise<Category[]> {
    return this.categoriesService.getCategories(rootCategoryName);
  }

  @Post()
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.createCategory(createCategoryDto);
  }
}
