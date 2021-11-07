import {
  Controller, Query, Req, UploadedFile, Body,
  Get, Post, Put, Delete, UseInterceptors,
} from '@nestjs/common';
import {
  FileInterceptor
} from '@nestjs/platform-express'
import { Request } from 'express';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly service: PostService) { }

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

  @Post()
  create(@Req() req: Request) {
    const { description, fileSize, filePath } = req.body;

    return this.service.create({
      description,
      fileSize,
      filePath,
    });
  }

  @Get()
  read(@Query() { id }: { id: number }) {
    return this.service.read(id);
  }

  @Get('all')
  readAll() {
    return this.service.readAll();
  }

  @Put()
  update(@Req() req: Request, @Query() { id }: { id: number }) {
    const { description } = req.body;

    return this.service.update(description, id);
  }

  @Delete()
  delete(@Query() { id }: { id: number }) {
    return this.service.delete(id);
  }
}
