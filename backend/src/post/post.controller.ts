import {
  Controller, Query, Req,
  Get, Post, Put,
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
  read(@Query() query: { id: number }) {
    return this.service.read(query.id);
  }

  @Get('all')
  readAll() {
    return this.service.readAll();
  }

  @Put()
  update(@Req() req: Request, @Query() query: { id: number }) {
    const { description } = req.body;
    const { id } = query;

    return this.service.update(description, id);
  }
}
