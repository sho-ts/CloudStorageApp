import {
  Controller, Query, Req,
  Get, Post, Put, Delete, UseGuards
} from '@nestjs/common';
import { Request } from 'express';
import { PostService } from './post.service';
import { AuthGuard } from './../auth/auth.guard';
import { GuardResponse } from './../utils';

@Controller('post')
@UseGuards(AuthGuard)
export class PostController {
  constructor(private readonly service: PostService) { }

  @Post()
  create(@GuardResponse() user, @Req() req: Request<{}, {}, {
    description: string,
    fileSize: string,
    filePath: string,
    allowedEmail?: string,
    password?: string,
    disclosureRange: number,
  }>) {
    const {
      description, fileSize, filePath,
      allowedEmail, password, disclosureRange
    } = req.body;

    return this.service.create({
      description,
      fileSize,
      filePath,
      disclosureRange,
      allowedEmail,
      password,
      uid: user.sub
    });
  }

  @Get()
  read(@GuardResponse() user, @Query() { id }: { id: number }) {
    return this.service.read(user, id);
  }

  @Get('all')
  readAll(@GuardResponse() user, @Query() { page, s }: { page: number, s: string }) {
    return this.service.readAll(user.sub, page, s);
  }

  @Put()
  update(@GuardResponse() user, @Req() req: Request<{}, {}, {
    description: string
  }>, @Query() { id }: { id: number }) {
    const { description } = req.body;

    return this.service.update(user.sub, description, id);
  }

  @Delete()
  delete(@GuardResponse() user, @Query() { id }: { id: number }) {
    return this.service.delete(user.sub, id);
  }
}
