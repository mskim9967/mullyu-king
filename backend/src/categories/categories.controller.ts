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
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(AuthGuard())
  createItemCategory(@Body('name') name: string): Promise<Category> {
    return this.categoriesService.createItemCategory(name);
  }

  @Post()
  @UseGuards(AuthGuard())
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Patch('/:id/rename')
  @UseGuards(AuthGuard())
  renameCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
  ): Promise<Category> {
    return this.categoriesService.renameCategory(id, name);
  }

  @Patch('/swap')
  @UseGuards(AuthGuard())
  swapCategoryOrder(
    @Body('category1Id') category1Id: number,
    @Body('category2Id') category2Id: number,
  ): Promise<void> {
    return this.categoriesService.swapCategoryOrder(category1Id, category2Id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categoriesService.deleteCategory(id);
  }
}
