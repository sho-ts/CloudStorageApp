import {
  Controller, Query, Req,
  Get, Post, Put, Delete, UseGuards
} from '@nestjs/common';
import { Request } from 'express';
import { DirectoryService } from '@/directory/directory.service';
import { AuthGuard } from '@/auth/auth.guard';
import { GuardResponse } from '@/utils';

@Controller('directory')
@UseGuards(AuthGuard)
export class DirectoryController {
  constructor(private readonly service: DirectoryService) { }

  @Post()
  create(@GuardResponse() user, @Req() { body }: Request<{}, {}, {
    dirName: string
  }>) {
    return this.service.create(user.sub, body.dirName);
  }

  @Get()
  read(@GuardResponse() user, @Query() { id }: { id: number }) {
    return this.service.read(user.sub, id);
  }

  @Get('all')
  readAll(@GuardResponse() user) {
    return this.service.readAll(user.sub);
  }

  @Put()
  update(@GuardResponse() user, @Req() { body }: Request<{}, {}, {
    dirName: string
  }>, @Query() { id }: { id: number }) {
    return this.service.update(user.sub, body.dirName, id);
  }

  @Delete()
  delete(@GuardResponse() user, @Query() { id }: { id: number }) {
    return this.service.delete(user.sub, id);
  }
}
