import {
  Controller, Query, Res, UploadedFile, StreamableFile,
  Get, Post, UseInterceptors,
} from '@nestjs/common';
import {
  FileInterceptor
} from '@nestjs/platform-express'
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly service: FileService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async fileUpload(@UploadedFile() file: Express.Multer.File) {
    try {
      const res = await this.service.s3upload(file);

      if (res instanceof Error) throw new Error;

      return JSON.stringify(res);
    } catch (e) {
      return e.message;
    }
  }

  @Get('download')
  async fileDownload(@Query() { key }: { key: string }) {
    try {
      const url = await this.service.s3download(key);

      if (url instanceof Error) throw new Error;

      return url;
    } catch (e) {
      console.log('error');
      return e;
    }
  }
}
