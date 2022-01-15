import { EntityRepository, Repository } from 'typeorm';
import { PhoneNumber } from './phone-number.entity';

@EntityRepository(PhoneNumber)
export class PhoneNumberRepository extends Repository<PhoneNumber> {}
