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
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './item.entity';
import { ItemsService } from './items.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  getAllItem(@Req() req): Promise<Item[]> {
    return this.itemsService.getAllItem();
  }

  @Post()
  @UseGuards(AuthGuard())
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

  @Get('/onSale/onDiscount')
  getSaleDiscountItems(): Promise<Item[]> {
    return this.itemsService.getSaleDiscountItems();
  }

  @Get('/onSale/category')
  getSaleItemsByCategory(
    @Query('id', ParseIntPipe) categoryId: number,
  ): Promise<Item[]> {
    return this.itemsService.getSaleItemsByCategory(categoryId);
  }

  @Get('/:id')
  getItem(@Param('id', ParseIntPipe) id: number): Promise<Item> {
    return this.itemsService.getItemById(id);
  }

  @Patch('/swap')
  @UseGuards(AuthGuard())
  swapItemOrder(
    @Body('item1Id', ParseIntPipe) item1Id: number,
    @Body('item2Id', ParseIntPipe) item2Id: number,
  ): Promise<void> {
    return this.itemsService.swapItemOrder(item1Id, item2Id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  patchItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() body,
  ): Promise<Item> {
    return this.itemsService.patchItem(id, body);
  }

  @Patch('/:id/onSale')
  @UseGuards(AuthGuard())
  patchItemSaleStatus(
    @Param('id', ParseIntPipe) id: number,
    @Query('status', ParseBoolPipe) status: boolean,
  ): Promise<Item> {
    return this.itemsService.patchItemSaleStatus(id, status);
  }

  @Patch('/:id/onDiscount')
  @UseGuards(AuthGuard())
  patchItemDiscountStatus(
    @Param('id', ParseIntPipe) id: number,
    @Query('status', ParseBoolPipe) status: boolean,
    @Query('price') price: number,
  ): Promise<Item> {
    return this.itemsService.patchItemDiscountStatus(id, status, price);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.itemsService.deleteItem(id);
  }
}
