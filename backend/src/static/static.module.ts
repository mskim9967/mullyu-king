import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemRepository } from 'src/items/item.repository';
import { ItemImgRepository } from './itemImg.repository';
import { StaticController } from './static.controller';
import { StaticService } from './static.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemRepository, ItemImgRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigService,
  ],
  controllers: [StaticController],
  providers: [StaticService],
})
export class StaticModule {}
