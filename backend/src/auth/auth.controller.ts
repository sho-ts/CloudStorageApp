import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '@/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) { }

  @Post('test')
  async auth(@Req() req: Request) {
    try {
      console.log(req.headers.authorization);
      const res = await this.service.verify(req.headers.authorization.split(' ')[1]);
      console.log(res);
      return 'ok';
    } catch (e) {
      return 'ng';
    }
  }
}
