import { Req, Res, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemImgRepository } from './itemImg.repository';
import { ItemRepository } from 'src/items/item.repository';
import { Item } from 'src/items/item.entity';
import { ItemImg } from './itemImg.entity';

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

@Injectable()
export class StaticService {
  constructor(
    @InjectRepository(ItemImgRepository)
    private itemImgRepository: ItemImgRepository,
    @InjectRepository(ItemRepository) private itemRepository: ItemRepository,
    private readonly config: ConfigService,
  ) {}

  async uploadItemImage(@Req() req, @Res() res, itemId: number) {
    const item: Item = await this.itemRepository.findOne({
      where: { id: itemId },
      relations: ['primaryImg'],
    });
    if (!item) return res.status(404).json({ status: 'not found' });
    else {
      this.multerUpload(req, res, async () => {
        console.log(req.files);

        const itemImg: ItemImg = this.itemImgRepository.create({
          key: req.files[0].key,
        });
        itemImg.item = item;
        await this.itemImgRepository.save(itemImg);

        const getItemImg = await this.itemImgRepository.findOne({
          id: itemImg.id,
        });

        if (!item.primaryImg) {
          item.primaryImg = getItemImg;
          await this.itemRepository.save(item);
        }

        return res.status(201).json(itemImg);
      });
    }
  }

  multerUpload = multer({
    storage: multerS3({
      s3: s3,
      bucket: AWS_S3_BUCKET_NAME,
      ACL: 'public-read',
      key: (req, file, cb) => {
        cb(null, `${Date.now().toString()}`);
      },
    }),
  }).array('image', 1);

  async getImageByKey(@Req() req, @Res() res, key: string) {
    s3.getObject(
      { Bucket: AWS_S3_BUCKET_NAME, Key: key },
      function (err, data) {
        if (err) {
          res.status(404).json({ status: 'not found' });
        } else {
          res.writeHead(200, { 'Content-Type': 'image/jpeg' });
          res.write(data.Body, 'binary');
          res.end(null, 'binary');
        }
      },
    );
  }

  async deleteImageByKey(key: string) {
    const result = await this.itemImgRepository.delete({ key });
    if (!result.affected)
      throw new NotFoundException(`can't find image key:${key}`);
  }
}
