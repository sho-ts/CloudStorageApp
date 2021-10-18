import { Controller, Get, Query } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly service: PostService) {}

  @Get()
  read(@Query() query: { id: number }) {
    return this.service.read(query.id);
  }
}
