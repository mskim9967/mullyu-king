import {
  Req,
  Res,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3-transform';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemImgRepository } from './itemImg.repository';
import { ItemRepository } from 'src/items/item.repository';
import { Item } from 'src/items/item.entity';
import { ItemImg } from './itemImg.entity';
import * as sharp from 'sharp';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard())
  async uploadItemImage(@Req() req, @Res() res, itemId: number) {
    const item: Item = await this.itemRepository.findOne({
      where: { id: itemId },
      relations: ['primaryImg'],
    });
    if (!item) return res.status(404).json({ status: 'not found' });
    else {
      this.multerUpload(req, res, async () => {
        let itemImg: ItemImg = this.itemImgRepository.create({
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

  @UseGuards(AuthGuard())
  async uploadItemThumbImage(@Req() req, @Res() res, key: string) {
    this.multerUploadThumb(req, res, async () => {
      const itemImg = await this.itemImgRepository.findOne({
        key,
      });
      itemImg.thumbKey = req.files[0].transforms[0].key;

      await this.itemImgRepository.save(itemImg);
      return res.status(201).json(itemImg);
    });
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

  multerUploadThumb = multer({
    storage: multerS3({
      s3: s3,
      bucket: AWS_S3_BUCKET_NAME,
      ACL: 'public-read',
      shouldTransform: true,
      transforms: [
        {
          key: (req, file, cb) => {
            cb(null, `${Date.now().toString()}`);
          },
          transform: function (req, file, cb) {
            cb(null, sharp().resize(70, 70));
          },
        },
      ],
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

  @UseGuards(AuthGuard())
  async deleteImageByKey(key: string) {
    const result = await this.itemImgRepository.delete({ key });
    if (!result.affected)
      throw new NotFoundException(`can't find image key:${key}`);
  }
}
