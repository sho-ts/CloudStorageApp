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
  fileUpload(@UploadedFile() file: Express.Multer.File, @Body() body) {
    this.service.s3upload(file).then(res => {
      console.log(res)
    }).catch((e: Error) => {
      console.log(e.name);
      console.log(e.message);
    })


    return JSON.stringify(file.buffer);
  }

  @Post()
  create(@Req() req: Request) {
    const { description, fileSize } = req.body;

    return this.service.create({
      description,
      fileSize
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
