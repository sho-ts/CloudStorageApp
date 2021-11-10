import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) { }

  @Post('signup')
  signup(@Req() req: Request) {
    const { email, password } = req.body;

    return JSON.stringify({
      email,
      password
    });
  }

  @Post('signin')
  signin(@Req() req: Request) {
    const { email, password } = req.body;

    return JSON.stringify({
      email,
      password
    });
  }
}
