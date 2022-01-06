import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './item.entity';
import { ItemsService } from './items.service';

@Controller('api/items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  getAllItem(): Promise<Item[]> {
    return this.itemsService.getAllItem();
  }

  @Post()
  createItem(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.createItem(createItemDto);
  }

  @Get('/onSale')
  getSaleItems(): Promise<Item[]> {
    return this.itemsService.getSaleItems();
  }

  @Get('/onSale/search')
  searchSaleItemsByName(@Query('name') name: string): Promise<Item[]> {
    return this.itemsService.searchSaleItemsByName(name);
  }

  @Get('/onDiscount')
  getDiscountItems(): Promise<Item[]> {
    return this.itemsService.getDiscountItems();
  }

  @Get('/category')
  getItemsByCategory(
    @Query('id', ParseIntPipe) categoryId: number,
  ): Promise<Item[]> {
    return this.itemsService.getItemsByCategory(categoryId);
  }

  @Get('/:id')
  getItem(@Param('id', ParseIntPipe) id: number): Promise<Item> {
    return this.itemsService.getItemById(id);
  }

  @Patch('/:id/onSale')
  patchItemSaleStatus(
    @Param('id', ParseIntPipe) id: number,
    @Query('status', ParseBoolPipe) status: boolean,
  ): Promise<Item> {
    return this.itemsService.patchItemSaleStatus(id, status);
  }

  @Patch('/:id/onDiscount')
  patchItemDiscountStatus(
    @Param('id', ParseIntPipe) id: number,
    @Query('status', ParseBoolPipe) status: boolean,
    @Query('price') price: number,
  ): Promise<Item> {
    return this.itemsService.patchItemDiscountStatus(id, status, price);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.itemsService.deleteItem(id);
  }

  @Patch('/swap')
  swapItemOrder(
    @Body('item1Id') item1Id: number,
    @Body('item2Id') item2Id: number,
  ): Promise<void> {
    return this.itemsService.swapItemOrder(item1Id, item2Id);
  }
}
