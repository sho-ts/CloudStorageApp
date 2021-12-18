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
    dir?: number,
    disclosureRange: number,
  }>) {
    const {
      description, fileSize, filePath, dir,
      allowedEmail, password, disclosureRange
    } = req.body;

    return this.service.create({
      description,
      fileSize,
      filePath,
      disclosureRange,
      allowedEmail,
      password,
      dir,
      uid: user.sub
    });
  }

  @Get()
  read(@GuardResponse() user, @Query() { id }: { id: number }) {
    return this.service.read(user, id);
  }

  @Get('all')
  readAll(@GuardResponse() user, @Query() { page, s, dir }: { page: number, s: string, dir?: number }) {
    return this.service.readAll(user.sub, page, s, dir);
  }

  @Put()
  update(@GuardResponse() user, @Req() req: Request<{}, {}, {
    description: string,
    dir: number,
    disclosureRange: number
  }>, @Query() { id }: { id: number }) {
    const { description, dir, disclosureRange } = req.body;

    return this.service.update({
      id,
      uid: user.sub,
      description,
      dir,
      disclosureRange,
    });
  }

  @Delete()
  delete(@GuardResponse() user, @Query() { id }: { id: number }) {
    return this.service.delete(user.sub, id);
  }
}
