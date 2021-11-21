import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly service: AuthService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    return new Promise<boolean>(async (resolve) => {
      if (!req.headers.authorization) resolve(false);

      try {
        const verified = await this.service.verify(req.headers.authorization.split(' ')[1]);
        req.guard = verified;

        if (verified) return resolve(true);
      } catch (e) {
        resolve(false);
      }
    });
  }
}
