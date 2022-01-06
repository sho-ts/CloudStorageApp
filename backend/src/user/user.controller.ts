import {
  Controller, Query, Req,
  Get, Post, Put, Delete, UseGuards
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { AuthGuard } from './../auth/auth.guard';
import { GuardResponse } from './../utils';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly service: UserService) { }

  @Post()
  async create(@GuardResponse() user, @Req() req: Request<{}, {}, {
    name: string
  }>) {
    return await this.service.create({
      cognitoId: user.sub,
      name: req.body.name
    })
  }

  @Get()
  async read(@Req() req: Request<{}, {}, {
    uid: number
  }>) {
    return await this.service.read(req.body.uid);
  }

  @Put()
  async updateProfile(@GuardResponse() user, @Req() req: Request<{}, {}, {
    name: string
  }>) {
    return await this.service.updateProfile({
      cognitoId: user.sub,
      name: req.body.name
    })
  }

  @Put('plan')
  async updatePlan(@GuardResponse() user, @Req() req: Request<{}, {}, {
    plan: number
  }>) {
    return await this.service.updatePlan({
      cognitoId: user.sub,
      plan: req.body.plan
    })
  }

  @Put('storage')
  async updateStorage(@GuardResponse() user, @Req() req: Request<{}, {}, {
    fileSize: number,
    type: 'inc' | 'dec'
  }>) {
    return await this.service.updateStorage({
      cognitoId: user.sub,
      fileSize: req.body.fileSize,
      type: req.body.type
    })
  }

  @Delete()
  async delete(@GuardResponse() user) {
    return await this.service.delete({
      cognitoId: user.sub
    })
  }
}
