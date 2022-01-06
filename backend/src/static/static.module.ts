import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemRepository } from 'src/items/item.repository';
import { ItemImgRepository } from './itemImg.repository';
import { StaticController } from './static.controller';
import { StaticService } from './static.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemRepository, ItemImgRepository]),
    ConfigService,
  ],
  controllers: [StaticController],
  providers: [StaticService],
})
export class StaticModule {}
