import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumberRepository } from './phone-number.repository';
import { StoreInfoController } from './store-info.controller';
import { StoreInfoService } from './store-info.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([PhoneNumberRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [StoreInfoController],
  providers: [StoreInfoService],
})
export class StoreInfoModule {}
