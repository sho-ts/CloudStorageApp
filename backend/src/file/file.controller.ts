import {
  Controller, Query, Res, UploadedFile,
  Get, Post, UseInterceptors, UseGuards
} from '@nestjs/common';
import {
  FileInterceptor
} from '@nestjs/platform-express'
import { AuthGuard } from './../auth/auth.guard';
import { FileService } from './file.service';
import { GuardResponse } from './../utils';

@Controller('file')
@UseGuards(AuthGuard)
export class FileController {
  constructor(private readonly service: FileService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async fileUpload(@GuardResponse() user, @UploadedFile() file: Express.Multer.File) {
    try {
      const res = await this.service.s3upload({
        file,
        cognitoId: user.sub
      });

      return JSON.stringify(res);
    } catch (e) {
      console.log(e)
      return e;
    }
  }

  @Get('download')
  async fileDownload(@Query() { key }: { key: string }) {
    try {
      const url = await this.service.s3download(key);

      return url;
    } catch (e) {
      console.log('error');
      return e;
    }
  }
}
