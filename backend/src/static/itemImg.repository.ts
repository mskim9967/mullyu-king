import { EntityRepository, Repository } from 'typeorm';
import { ItemImg } from './itemImg.entity';

@EntityRepository(ItemImg)
export class ItemImgRepository extends Repository<ItemImg> {}
