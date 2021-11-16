import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard(new AuthService())).toBeDefined();
  });
});
