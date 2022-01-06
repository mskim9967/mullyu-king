import {
  Controller,
  Param,
  Post,
  Get,
  Body,
  ParseIntPipe,
  Patch,
  Query,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('api/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('/:rootCategoryName')
  getCategoriesByName(
    @Param('rootCategoryName') rootCategoryName: string,
  ): Promise<Category[]> {
    return this.categoriesService.getCategoriesByName(rootCategoryName);
  }

  @Post('/item')
  createItemCategory(@Body('name') name: string): Promise<Category> {
    return this.categoriesService.createItemCategory(name);
  }

  @Post()
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Patch('/:id/rename')
  renameCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
  ): Promise<Category> {
    return this.categoriesService.renameCategory(id, name);
  }

  @Patch('/swap')
  swapCategoryOrder(
    @Body('category1Id') category1Id: number,
    @Body('category2Id') category2Id: number,
  ): Promise<void> {
    return this.categoriesService.swapCategoryOrder(category1Id, category2Id);
  }

  @Delete('/:id')
  deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categoriesService.deleteCategory(id);
  }
}
