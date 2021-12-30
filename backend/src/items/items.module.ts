import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/categories/category.repository';
import { ItemRepository } from './item.repository';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemRepository, CategoryRepository])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
