import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) { }

  @Post('test')
  async auth(@Req() req: Request) {
    try {
      const res = await this.service.verify(req.body.token);
      console.log(res);
      return 'ok';
    } catch (e) {
      return 'ng';
    }
  }
}
