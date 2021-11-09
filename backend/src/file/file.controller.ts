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
  async fileDownload(@Query() { key }: { key: string }, @Res({ passthrough: true }) res) {
    try {
      const file = await this.service.s3download(key);

      if (file instanceof Error) throw new Error;

      const body = file.Body as Buffer;

      res.set({
        'Content-Type': file.ContentType,
        'Content-Disposition': 'attachment; filename="' + key + '"',
      });

      return new StreamableFile(body);
    } catch (e) {
      console.log('error');
      return e;
    }
  }
}
