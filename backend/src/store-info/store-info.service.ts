import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { of } from 'rxjs';
import { PhoneNumber } from './phone-number.entity';
import { PhoneNumberRepository } from './phone-number.repository';

@Injectable()
export class StoreInfoService {
  constructor(
    @InjectRepository(PhoneNumberRepository)
    private phoneNumberRepository: PhoneNumberRepository,
  ) {}

  async getPhoneNumber(): Promise<PhoneNumber> {
    const phoneNumber = await this.phoneNumberRepository.findOne({
      order: { id: 'DESC' },
    });
    return phoneNumber;
  }

  async postPhoneNumber(phoneNumber: string) {
    const phoneNumberRow = await this.phoneNumberRepository.create({
      phoneNumber,
    });
    await this.phoneNumberRepository.save(phoneNumberRow);
    return phoneNumberRow;
  }
}
