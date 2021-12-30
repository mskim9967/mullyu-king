import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './item.entity';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  getAllItem(): Promise<Item[]> {
    return this.itemsService.getAllItem();
  }

  @Get('/category')
  getItemsByCategory(@Query('id') categoryId: number): Promise<Item[]> {
    return this.itemsService.getItemsByCategory(categoryId);
  }

  @Post()
  createItem(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.createItem(createItemDto);
  }
}
