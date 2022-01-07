import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { StaticService } from './static.service';

@Controller('/api/static')
export class StaticController {
  constructor(private readonly staticService: StaticService) {}

  @Post('/item/:id')
  async uploadItemImage(
    @Req() req,
    @Res() res,
    @Param('id', ParseIntPipe) itemId: number,
  ) {
    await this.staticService.uploadItemImage(req, res, itemId);
  }

  @Get('/:key')
  async getImageByKey(@Req() req, @Res() res, @Param('key') key: string) {
    await this.staticService.getImageByKey(req, res, key);
  }

  @Delete('/:key')
  async deleteImageByKey(@Param('key') key: string) {
    await this.staticService.deleteImageByKey(key);
  }
}
