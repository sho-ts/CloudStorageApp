import {
  Controller, Query, Req,
  Get, Post, Put, Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly service: PostService) { }

  @Post()
  create(@Req() req: Request) {
    const { description } = req.body;
    
    return this.service.create(description);
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
