import {
  Controller, Query, Req,
  Get, Post, Put, Delete, UseGuards
} from '@nestjs/common';
import { Request } from 'express';
import { PostService } from './post.service';
import { AuthGuard } from './../auth/auth.guard';

@Controller('post')
// @UseGuards(AuthGuard)
export class PostController {
  constructor(private readonly service: PostService) { }

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
  readAll(@Query() { page }: { page: number }) {
    return this.service.readAll(page);
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
