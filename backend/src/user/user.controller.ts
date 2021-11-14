import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) { }

  @Post('test')
  async auth(@Req() req: Request) {
    const res = await this.service.verify(req.body.token);
    console.log(res)

    if(!(res instanceof Error)) {
      return 'ok'
    } else {
      return 'ng';
    }
  }
}
