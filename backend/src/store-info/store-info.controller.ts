import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PhoneNumber } from './phone-number.entity';
import { StoreInfoService } from './store-info.service';

@Controller('api/storeInfo')
export class StoreInfoController {
  constructor(private readonly storeInfoService: StoreInfoService) {}

  @Get('/phoneNumber')
  getPhoneNumber(): Promise<PhoneNumber> {
    return this.storeInfoService.getPhoneNumber();
  }

  @UseGuards(AuthGuard())
  @Post('/phoneNumber')
  postPhoneNumber(@Body('phoneNumber') phoneNumber: string) {
    return this.storeInfoService.postPhoneNumber(phoneNumber);
  }
}
